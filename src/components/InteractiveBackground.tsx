"use client";

import { useEffect, useRef } from "react";

export default function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    let mouseX = width / 2;
    let mouseY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);
    
    const noiseCanvas = document.createElement("canvas");
    noiseCanvas.width = width;
    noiseCanvas.height = height;
    const noiseCtx = noiseCanvas.getContext("2d");
    
    const generateNoise = (w: number, h: number) => {
      if (noiseCtx) {
        noiseCanvas.width = w;
        noiseCanvas.height = h;
        const imgData = noiseCtx.createImageData(w, h);
        const data = imgData.data;
        for (let i = 0; i < data.length; i += 4) {
          const val = Math.random() * 255; 
          data[i] = val;
          data[i + 1] = val;
          data[i + 2] = val;
          data[i + 3] = 4; // ultra low opacity static noise
        }
        noiseCtx.putImageData(imgData, 0, 0);
      }
    };
    generateNoise(width, height);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw faint noise base
      ctx.drawImage(noiseCanvas, 0, 0);

      // Draw radial mouse glow
      const gradient = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 500);
      
      const isLight = document.documentElement.getAttribute("data-theme") === "light";
      const colorGlow = isLight ? "rgba(0, 0, 0, 0.05)" : "rgba(255, 255, 255, 0.03)";
      
      gradient.addColorStop(0, colorGlow);
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      requestAnimationFrame(render);
    };

    const animReq = requestAnimationFrame(render);

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      generateNoise(width, height);
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
