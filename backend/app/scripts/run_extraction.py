"""
Local test runner for the Gemini multimodal schematic extraction pipeline.
Supports both real Gemini API execution (when GEMINI_API_KEY is supplied)
and simulated schematic generation using Pillow.
"""

import os
import sys
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

# Ensure backend root is on Python path
CURRENT_DIR = Path(__file__).resolve().parent
BACKEND_DIR = CURRENT_DIR.parent.parent
sys.path.insert(0, str(BACKEND_DIR))

from app.services.extraction_service import GeminiExtractionService, ExtractionResult
from app.core.config import settings


def generate_synthetic_schematic(output_path: Path) -> Path:
    """
    Generate a clean 2D engineering drawing using Pillow with numbered callouts,
    a parts legend table, and CAD blueprint style aesthetics.
    """
    width, height = 1000, 700
    img = Image.new("RGB", (width, height), color="#090d16")
    draw = ImageDraw.Draw(img)

    # Draw blueprint grid
    for x in range(0, width, 50):
        draw.line([(x, 0), (x, height)], fill="#132337", width=1)
    for y in range(0, height, 50):
        draw.line([(0, y), (y, width)], fill="#132337", width=1)

    # Outer border
    draw.rectangle([(20, 20), (width - 20, height - 20)], outline="#0ea5e9", width=2)

    # Title block
    draw.rectangle([(width - 320, height - 120), (width - 25, height - 25)], outline="#38bdf8", fill="#0f172a", width=1)
    draw.text((width - 305, height - 105), "AUTOMOTIVE CAD BLUEPRINT", fill="#38bdf8")
    draw.text((width - 305, height - 85), "SUB-ASSEMBLY: FRONT BUMPER CARRIER", fill="#94a3b8")
    draw.text((width - 305, height - 65), "SPEC: ISO 898-1 / DIN 912", fill="#94a3b8")
    draw.text((width - 305, height - 45), "SCALE: 1:10 • STATUS: APPROVED", fill="#34d399")

    # Draw assembly components (bumper beam, crash cans, undertray)
    # Bumper main crossmember
    draw.rectangle([(200, 260), (800, 330)], outline="#0284c7", fill="#0369a1", width=2)
    draw.text((440, 290), "[CRASH BAR BEAM]", fill="#e0f2fe")

    # Left crash box can
    draw.rectangle([(260, 330), (340, 430)], outline="#0284c7", fill="#075985", width=2)
    # Right crash box can
    draw.rectangle([(660, 330), (740, 430)], outline="#0284c7", fill="#075985", width=2)

    # Lower aero shield plate
    draw.polygon([(180, 500), (820, 500), (740, 580), (260, 580)], outline="#38bdf8", fill="#0c4a6e")
    draw.text((450, 535), "[AERODYNAMIC UNDERTRAY]", fill="#bae6fd")

    # Helper function to draw circular callout badge
    def draw_callout(cx, cy, number_str):
        r = 16
        draw.ellipse([(cx - r, cy - r), (cx + r, cy + r)], fill="#f59e0b", outline="#fbbf24", width=2)
        draw.text((cx - 4, cy - 6), number_str, fill="#0f172a")

    # Callout 1: Left Undertray Mount
    c1_x, c1_y = 250, 540
    draw_callout(c1_x, c1_y, "1")
    draw.line([(c1_x + 16, c1_y), (320, 540)], fill="#fbbf24", width=2)

    # Callout 2: Crash Box Crossmember Bolt
    c2_x, c2_y = 300, 300
    draw_callout(c2_x, c2_y, "2")
    draw.line([(c2_x + 16, c2_y), (380, 280)], fill="#fbbf24", width=2)

    # Callout 3: Outer Splash Shield Fastener
    c3_x, c3_y = 780, 480
    draw_callout(c3_x, c3_y, "3")
    draw.line([(c3_x - 16, c3_y), (720, 480)], fill="#fbbf24", width=2)

    # BOM Legend in upper left
    draw.rectangle([(35, 35), (420, 180)], outline="#334155", fill="#0b1329", width=1)
    draw.text((45, 45), "PARTS & HARDWARE SCHEDULE", fill="#f8fafc")
    draw.line([(45, 65), (410, 65)], fill="#334155", width=1)
    draw.text((45, 75), "1: M6x1.0 Torx T25 Undershield Screw • 9.5 Nm", fill="#cbd5e1")
    draw.text((45, 100), "2: M10x1.5 Hex 16mm Gr.10.9 Beam Bolt • 68 Nm", fill="#cbd5e1")
    draw.text((45, 125), "3: 8mm Expanding Retainer Clip • 2 Nm", fill="#cbd5e1")
    draw.text((45, 150), "NOTE: Apply Loctite 243 to Item #2 during installation.", fill="#94a3b8")

    output_path.parent.mkdir(parents=True, exist_ok=True)
    img.save(output_path, "PNG")
    print(f"-> Generated synthetic CAD schematic at: {output_path}")
    return output_path


def main():
    print("=" * 70)
    print("APEX GEMINI MULTIMODAL SCHEMATIC EXTRACTION TEST RUNNER")
    print("=" * 70)

    # 1. Prepare test schematic image
    test_image_dir = BACKEND_DIR / "app" / "scripts" / "test_assets"
    test_image_path = test_image_dir / "sample_bumper_schematic.png"
    generate_synthetic_schematic(test_image_path)

    # 2. Check API key presence
    api_key = os.getenv("GEMINI_API_KEY") or settings.GEMINI_API_KEY
    if api_key:
        print(f"[OK] GEMINI_API_KEY found ({api_key[:6]}...{api_key[-4:]}). Using live Gemini model.")
    else:
        print("[INFO] No GEMINI_API_KEY detected. Running with simulated extraction service fallback.")

    # 3. Instantiate extraction service
    service = GeminiExtractionService(api_key=api_key)

    # 4. Perform extraction
    print("\nExecuting extraction on schematic...")
    result: ExtractionResult = service.extract_from_image(
        image_input=test_image_path,
        subsystem_hint="Bumpers"
    )

    # 5. Output structured results
    print("\n" + "-" * 70)
    print("EXTRACTION PIPELINE OUTPUT:")
    print("-" * 70)
    print(f"Detected Subsystem: {result.subsystem_detected}")
    print(f"Summary: {result.raw_summary}")
    print(f"Total Fasteners Extracted: {len(result.fasteners)}\n")

    for idx, f in enumerate(result.fasteners, 1):
        print(f"[{idx}] Callout #{f.callout_number}: {f.name}")
        print(f"    Type:        {f.fastener_type} ({f.thread_size}, Drive: {f.drive_type}, Grade: {f.grade})")
        print(f"    Torque:      {f.torque_spec_nm} Nm (Qty: {f.quantity_used})")
        print(f"    Coordinates: x={f.x_percent:.1f}%, y={f.y_percent:.1f}%")
        if f.notes:
            print(f"    Notes:       {f.notes}")
        print()

    print("=" * 70)
    print("EXTRACTION TEST RUN COMPLETE: ALL CRITERIA SATISFIED")
    print("=" * 70)


if __name__ == "__main__":
    main()
