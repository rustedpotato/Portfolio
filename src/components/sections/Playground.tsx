"use client";

import { useRef } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { useGSAP } from "@gsap/react";
import { Cloud } from "lucide-react";
import { sound } from "@/utils/soundEngine";
import { useCursor } from "@/components/CursorContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(Draggable, useGSAP);
}

export default function Playground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { setCursorType } = useCursor();

  useGSAP(() => {
    if (typeof window !== "undefined") {
      Draggable.create(".play-item", {
        bounds: containerRef.current,
        onPress: function() {
          sound.playClick();
          gsap.to(this.target, { scale: 1.15, duration: 0.2, ease: "back.out(1.5)" });
        },
        onRelease: function() {
          sound.playHover();
          gsap.to(this.target, { scale: 1, duration: 0.2, ease: "back.out(1.5)" });
        }
      });

      // ambient floating animation - target INNER wrapper so properties don't fight with Draggable x/y!
      gsap.to(".play-inner", {
        y: "random(-15, 15)",
        x: "random(-15, 15)",
        rotation: "random(-10, 10)",
        duration: "random(2, 4)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: {
          amount: 2,
          from: "random"
        }
      });
    }
  }, { scope: containerRef });

  const handleEnter = () => setCursorType("button");
  const handleLeave = () => setCursorType("default");

  return (
    <section className="section" id="playground" style={{ paddingBottom: "120px" }}>
      <div className="container">
        <span className="text-label" style={{ display: "block", marginBottom: "16px" }}>
          PLAYGROUND
        </span>
        <h2 className="text-display" style={{ marginBottom: "24px" }}>
          Drag to Play
        </h2>
        <p className="text-body" style={{ color: "var(--c-muted)", marginBottom: "48px" }}>
          A little sandbox with some of the tech stack and creative tools. Throw them around!
        </p>

        <div 
          ref={containerRef} 
          style={{ 
            height: "450px", 
            width: "100%", 
            border: "1px dashed var(--c-border)", 
            borderRadius: "var(--r-md)", 
            position: "relative",
            backgroundColor: "transparent",
            overflow: "hidden"
          }}
        >
          {/* Movable CUTE DOG in the center */}
          <div 
            className="play-item"
            onMouseEnter={handleEnter} onMouseLeave={handleLeave}
            style={{ position: "absolute", top: "50%", left: "50%", cursor: "grab", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", zIndex: 1, userSelect: "none" }}
          >
            <div className="play-inner" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
              <span style={{ fontSize: "80px", filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.1))" }}>🐶</span>
              <span className="text-mono" style={{ color: "var(--c-muted)", fontSize: "12px" }}>The good boy</span>
            </div>
          </div>

          {[
            { id: 'react', label: 'React', icon: <img src="https://api.iconify.design/logos:react.svg" width="32" height="32" alt="React" draggable="false" />, top: "15%", left: "15%" },
            { id: 'js', label: 'JS', icon: <img src="https://api.iconify.design/logos:javascript.svg" width="32" height="32" alt="JS" draggable="false" />, top: "55%", left: "75%" },
            { id: 'npm', label: 'npm', icon: <img src="https://api.iconify.design/logos:npm-icon.svg" width="32" height="32" alt="NPM" draggable="false" />, top: "15%", left: "80%" },
            { id: 'cloud', label: 'Cloud', icon: <Cloud size={32} color="#00a8ff" />, top: "70%", left: "20%" },
            { id: 'next', label: 'Next.js', icon: <img src="https://api.iconify.design/logos:nextjs-icon.svg" width="32" height="32" alt="Next.js" draggable="false" className="theme-icon-dynamic" />, top: "40%", left: "35%" },
            { id: 'gsap', label: 'GSAP', icon: <img src="https://api.iconify.design/logos:greensock-icon.svg" width="32" height="32" alt="GSAP" draggable="false" />, top: "75%", left: "55%" },
            { id: 'canva', label: 'Canva', icon: <img src="https://api.iconify.design/logos:canva.svg" width="32" height="32" alt="Canva" draggable="false" />, top: "30%", left: "65%" },
            { id: 'threads', label: 'Threads', icon: <img src="https://api.iconify.design/logos:threads.svg" width="32" height="32" alt="Threads" draggable="false" className="theme-icon-dynamic" />, top: "10%", left: "45%" },
            { id: 'pencil', label: 'Pencil', icon: <span style={{fontSize: "24px"}}>✏️</span>, top: "50%", left: "10%" },
            { id: 'brush', label: 'Brush', icon: <span style={{fontSize: "24px"}}>🖌️</span>, top: "80%", left: "85%" },
          ].map((item, idx) => (
            <div 
              key={item.id}
              className="play-item" 
              onMouseEnter={handleEnter} onMouseLeave={handleLeave}
              style={{ position: "absolute", top: item.top, left: item.left, cursor: "grab", zIndex: 10, userSelect: "none" }}
            >
              <div className="play-inner" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                <div style={{ background: "var(--c-surface)", padding: "14px", borderRadius: "50%", boxShadow: "0 8px 16px rgba(0,0,0,0.1)", border: "1px solid var(--c-border)", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  {item.icon}
                </div>
                <span className="text-mono" style={{ fontSize: "11px" }}>{item.label}</span>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
