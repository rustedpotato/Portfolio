"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function SideDecorations() {
  const leftCanRef = useRef<HTMLImageElement>(null);
  const rightCanRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Initial hidden state: translated safely down below the screen
    gsap.set(leftCanRef.current, { y: 800, rotation: -30, opacity: 0 });
    gsap.set(rightCanRef.current, { y: 800, rotation: 30, opacity: 0 });

    ScrollTrigger.create({
      trigger: "#projects",
      start: "top center", // Triggers when the top of #projects hits the center of the viewport
      toggleActions: "play none none reverse",
      onEnter: () => {
        gsap.to(leftCanRef.current, {
          y: 0,
          opacity: 1,
          rotation: -10,
          duration: 1.2,
          ease: "elastic.out(1, 0.6)",
          overwrite: "auto"
        });
        gsap.to(rightCanRef.current, {
          y: 0,
          opacity: 1,
          rotation: 10,
          duration: 1.2,
          ease: "elastic.out(1, 0.6)",
          delay: 0.1, // Slight stagger for organic feel
          overwrite: "auto"
        });
      },
      onLeaveBack: () => {
        gsap.to(leftCanRef.current, {
          y: 800,
          opacity: 0,
          rotation: -30,
          duration: 0.6,
          ease: "power3.in",
          overwrite: "auto"
        });
        gsap.to(rightCanRef.current, {
          y: 800,
          opacity: 0,
          rotation: 30,
          duration: 0.6,
          ease: "power3.in",
          overwrite: "auto"
        });
      }
    });

    // Add a gentle floating animation after they pop up
    gsap.to(leftCanRef.current, {
      y: "-=15",
      rotation: "-=2",
      duration: 3,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut"
    });

    gsap.to(rightCanRef.current, {
      y: "-=15",
      rotation: "+=2",
      duration: 3.5,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut"
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} style={{ pointerEvents: "none", position: "fixed", inset: 0, zIndex: 40, overflow: "hidden" }}>
      {/* Diet Coke - Left */}
      <img
        ref={leftCanRef}
        src="/coke.png"
        alt="Diet Coke"
        style={{
          position: "absolute",
          left: "2vw",
          bottom: "10vh",
          width: "max(100px, 10vw)",
          height: "auto",
          filter: "drop-shadow(0 15px 25px rgba(0,0,0,0.3))",
          transformOrigin: "bottom center"
        }}
      />

      {/* Redbull - Right */}
      <img
        ref={rightCanRef}
        src="/redbull.png"
        alt="Red Bull"
        style={{
          position: "absolute",
          right: "2vw",
          bottom: "10vh",
          width: "max(80px, 8vw)",
          height: "auto",
          filter: "drop-shadow(0 15px 25px rgba(0,0,0,0.3))",
          transformOrigin: "bottom center"
        }}
      />
    </div>
  );
}
