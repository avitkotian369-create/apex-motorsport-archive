"use client";

import React, { useEffect, useRef } from "react";

interface StreamParticle {
  x: number;
  y: number;
  length: number;
  speed: number;
  color: string;
  opacity: number;
  thickness: number;
  waviness: number;
  phase: number;
}

export function WindTunnelStream() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    // Color palette matching MONOCOQUE obsidian theme: electric lime, cyan, papaya, white
    const colors = ["#D2FF00", "#38BDF8", "#FF8000", "#FFFFFF"];

    const particlesCount = 70;
    const particles: StreamParticle[] = Array.from({ length: particlesCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      length: 50 + Math.random() * 120,
      speed: 3 + Math.random() * 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: 0.15 + Math.random() * 0.45,
      thickness: 0.75 + Math.random() * 1.5,
      waviness: 0.8 + Math.random() * 2,
      phase: Math.random() * Math.PI * 2
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.speed;
        p.phase += 0.02;

        // Wrap around when exiting screen
        if (p.x - p.length > width) {
          p.x = -p.length;
          p.y = Math.random() * height;
        }

        // Draw aerodynamic streamline gradient trail
        const yOffset = Math.sin(p.phase) * p.waviness;
        const grad = ctx.createLinearGradient(p.x - p.length, p.y + yOffset, p.x, p.y + yOffset);
        grad.addColorStop(0, "transparent");
        grad.addColorStop(0.7, p.color);
        grad.addColorStop(1, "#FFFFFF");

        ctx.beginPath();
        ctx.strokeStyle = grad;
        ctx.globalAlpha = p.opacity;
        ctx.lineWidth = p.thickness;
        ctx.lineCap = "round";

        ctx.moveTo(p.x - p.length, p.y + yOffset);
        // Slight aerodynamic camber curve
        ctx.quadraticCurveTo(
          p.x - p.length * 0.4,
          p.y + yOffset + Math.sin(p.phase * 1.5) * 4,
          p.x,
          p.y + yOffset
        );
        ctx.stroke();

        // Tiny luminous stagnation head at particle tip
        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.min(1, p.opacity * 1.5);
        ctx.arc(p.x, p.y + yOffset, p.thickness * 1.2, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-80"
      style={{ mixBlendMode: "screen" }}
    />
  );
}

export default WindTunnelStream;
