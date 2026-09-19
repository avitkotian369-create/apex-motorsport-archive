from typing import List, Optional, Union, Dict, Any
from pathlib import Path
import json
import logging
from PIL import Image
from pydantic import BaseModel, Field

from google import genai
from google.genai import types
from app.core.config import settings

logger = logging.getLogger(__name__)


class ExtractedFastener(BaseModel):
    callout_number: Optional[int] = Field(None, description="The callout index or bubble number in the schematic")
    name: str = Field(..., description="Descriptive component or fastener name, e.g., 'Hex Flange Screw'")
    fastener_type: str = Field("Bolt", description="Bolt, Screw, Nut, Clip, Rivet, Washer, Stud, etc.")
    thread_size: str = Field(..., description="Metric or imperial thread spec, e.g. M6x1.0, M8x1.25, M10x1.5")
    drive_type: str = Field(..., description="Socket/Drive type, e.g. Torx T25, Torx T30, Hex 10mm, Triple Square XZN")
    grade: str = Field("8.8", description="Hardware tensile strength class, e.g. 8.8, 10.9, 12.9, A2-70")
    torque_spec_nm: float = Field(..., description="Recommended fastening tightening torque in Newton-meters (Nm)")
    quantity_used: int = Field(1, description="Quantity called out at this anchor")
    x_percent: float = Field(..., description="Horizontal position as percentage 0.0 to 100.0 from left edge")
    y_percent: float = Field(..., description="Vertical position as percentage 0.0 to 100.0 from top edge")
    notes: Optional[str] = Field(None, description="Service notes, Loctite threadlocker spec, one-time use warning, etc.")


class ExtractionResult(BaseModel):
    subsystem_detected: Optional[str] = Field(None, description="Inferred vehicle subsystem, e.g. Bumpers, Doors, Powertrain, HVAC")
    fasteners: List[ExtractedFastener] = Field(default_factory=list, description="Extracted fasteners and callouts")
    raw_summary: Optional[str] = Field(None, description="Brief technical summary of the drawing inspection")


class GeminiExtractionService:
    def __init__(self, api_key: Optional[str] = None, model: str = "gemini-2.5-flash"):
        self.api_key = api_key or settings.GEMINI_API_KEY
        self.model = model
        self.client = genai.Client(api_key=self.api_key) if self.api_key else None

    def extract_from_image(
        self,
        image_input: Union[str, Path, Image.Image],
        subsystem_hint: Optional[str] = None
    ) -> ExtractionResult:
        """
        Extract callout annotations, normalized (x_percent, y_percent) coordinates,
        and fastener technical specifications directly from an engineering schematic image.
        """
        # Load image via Pillow to ensure valid format and obtain dimensions
        if isinstance(image_input, (str, Path)):
            pil_image = Image.open(image_input)
        elif isinstance(image_input, Image.Image):
            pil_image = image_input
        else:
            raise ValueError(f"Unsupported image_input type: {type(image_input)}")

        if not self.client:
            logger.warning("No GEMINI_API_KEY configured. Returning simulated/mock extraction result.")
            return self._mock_extraction(subsystem_hint)

        prompt = f"""
You are an expert automotive mechanical engineer and CAD schematic parser.
Analyze this automotive engineering assembly drawing / schematic diagram.

Tasks:
1. Locate all circular or boxed callout numbers (e.g. ①, ②, [1], [2], 1, 2, 3...) pointing to fasteners, mounting points, or assembly hardware.
2. For each callout, estimate its visual center coordinates as percentages (0.0 to 100.0) relative to the image:
   - x_percent: 0.0 is leftmost border, 100.0 is rightmost border.
   - y_percent: 0.0 is top border, 100.0 is bottom border.
3. Parse and cross-reference the parts legend / bill of materials (BOM) or callout text adjacent to each point to extract:
   - name: Descriptive hardware name (e.g. 'Front Fascia Torx Screw', 'Cradle Mount Bolt')
   - fastener_type: 'Bolt', 'Screw', 'Nut', 'Clip', or 'Rivet'
   - thread_size: e.g. M6x1.0, M8x1.25, M10x1.5, M12x1.75
   - drive_type: e.g. Torx T25, Torx T30, Hex 10mm, Hex 13mm, Hex 16mm, Triple Square M10
   - grade: e.g. 8.8, 10.9, 12.9
   - torque_spec_nm: torque in Nm (if unknown or omitted in drawing, assign standard ISO engineering standard torque for that thread size & grade)
   - quantity_used: integer count
   - notes: any torque angle, Loctite recommendation (e.g. 243 Blue), or replace-always flag.

{f'Context subsystem hint: {subsystem_hint}' if subsystem_hint else ''}
Return strictly structured JSON conforming to the requested schema.
"""

        try:
            response = self.client.models.generate_content(
                model=self.model,
                contents=[pil_image, prompt],
                config=types.GenerateContentConfig(
                    response_mime_type="application/json",
                    response_schema=ExtractionResult,
                    temperature=0.1,
                ),
            )

            if response.parsed:
                return response.parsed
            elif response.text:
                data = json.loads(response.text)
                return ExtractionResult.model_validate(data)
            else:
                return self._mock_extraction(subsystem_hint)

        except Exception as e:
            logger.error(f"Gemini extraction failed with error: {e}", exc_info=True)
            raise e

    def _mock_extraction(self, subsystem_hint: Optional[str] = None) -> ExtractionResult:
        """
        Fallback mock extractor used when testing locally or when API key is unconfigured.
        """
        subsystem = subsystem_hint or "Bumpers"
        mock_fasteners = [
            ExtractedFastener(
                callout_number=1,
                name="Front Underbody Aeroshield Torx Screw",
                fastener_type="Screw",
                thread_size="M6x1.0",
                drive_type="Torx T25",
                grade="8.8",
                torque_spec_nm=9.5,
                quantity_used=6,
                x_percent=24.5,
                y_percent=78.2,
                notes="Zinc-flake coated anti-corrosive. Replace if stripped."
            ),
            ExtractedFastener(
                callout_number=2,
                name="Bumper Reinforcement Bar Hex Bolt",
                fastener_type="Bolt",
                thread_size="M10x1.5",
                drive_type="Hex 16mm",
                grade="10.9",
                torque_spec_nm=68.0,
                quantity_used=4,
                x_percent=49.0,
                y_percent=38.5,
                notes="Structural crash beam anchor. Single-use torque-to-yield stretch bolt."
            ),
            ExtractedFastener(
                callout_number=3,
                name="Wheel Well Splash Guard Push-In Retainer Clip",
                fastener_type="Clip",
                thread_size="8mm Hole",
                drive_type="Expanding Pin",
                grade="PA66 Nylon",
                torque_spec_nm=2.0,
                quantity_used=8,
                x_percent=76.8,
                y_percent=64.0,
                notes="Polymer expansion fastener. Replace if prongs deform upon extraction."
            )
        ]

        return ExtractionResult(
            subsystem_detected=subsystem,
            fasteners=mock_fasteners,
            raw_summary=f"Extracted {len(mock_fasteners)} hardware callouts from mock schematic targeting {subsystem}."
        )


extraction_service = GeminiExtractionService()
