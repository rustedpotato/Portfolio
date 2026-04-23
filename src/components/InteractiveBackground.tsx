"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false }); // optimize
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = width / 2;
    let targetMouseY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);
    
    // Fix resize lag bug by using a small repeating pattern
    const noiseCanvas = document.createElement("canvas");
    const noiseSize = 128;
    noiseCanvas.width = noiseSize;
    noiseCanvas.height = noiseSize;
    const noiseCtx = noiseCanvas.getContext("2d");
    
    let pattern: CanvasPattern | null = null;

    const generateNoise = () => {
      if (noiseCtx) {
        const imgData = noiseCtx.createImageData(noiseSize, noiseSize);
        const data = imgData.data;
        for (let i = 0; i < data.length; i += 4) {
          const val = Math.floor(Math.random() * 255); 
          data[i] = val;
          data[i + 1] = val;
          data[i + 2] = val;
          data[i + 3] = 4; // ultra low opacity static noise
        }
        noiseCtx.putImageData(imgData, 0, 0);
        pattern = ctx.createPattern(noiseCanvas, 'repeat');
      }
    };
    generateNoise();

    const render = () => {
      // Smooth interpolation
      mouseX += (targetMouseX - mouseX) * 0.1;
      mouseY += (targetMouseY - mouseY) * 0.1;

      // Use the theme background color to fill before drawing noise/glows
      const isLight = document.documentElement.getAttribute("data-theme") === "light";
      ctx.fillStyle = isLight ? "#FFFFFF" : "#0C0C0C";
      ctx.fillRect(0, 0, width, height);

      // Draw faint noise base
      if (pattern) {
        ctx.fillStyle = pattern;
        ctx.fillRect(0, 0, width, height);
      }

      const getGlowColor = () => isLight ? "rgba(0, 0, 0, 0.04)" : "rgba(255, 255, 255, 0.04)";

      const cx = width / 2;
      const cy = height / 2;
      const dx = mouseX - cx;
      const dy = mouseY - cy;

      const drawGlow = (x: number, y: number) => {
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, 500);
        gradient.addColorStop(0, getGlowColor());
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
        // Use composite operation relative to theme (lighter for dark mode, darken for light)
        ctx.globalCompositeOperation = isLight ? "darken" : "screen";
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      };

      // Increased Kaleidoscope effect (8-fold symmetry)
      drawGlow(cx + dx, cy + dy);
      drawGlow(cx - dx, cy + dy);
      drawGlow(cx + dx, cy - dy);
      drawGlow(cx - dx, cy - dy);
      
      // additional 4 for 8-fold reflection
      drawGlow(cx + dy, cy + dx);
      drawGlow(cx - dy, cy + dx);
      drawGlow(cx + dy, cy - dx);
      drawGlow(cx - dy, cy - dx);

      // reset composite mode
      ctx.globalCompositeOperation = "source-over";

      requestAnimationFrame(render);
    };

    const animReq = requestAnimationFrame(render);

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animReq);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: -1,
      }}
    />
  );
}
