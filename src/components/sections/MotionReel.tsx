"use client";

import { useRef, useEffect, useCallback } from "react";
import "./MotionReel.css";
import data from "@/data/portfolio.json";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useCursor } from "@/components/CursorContext";

gsap.registerPlugin(ScrollTrigger);

export default function MotionReel() {
  const sectionRef = useRef<HTMLElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const { setCursorType } = useCursor();

  // ─── Drag-to-scroll logic ───
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    if (!stripRef.current) return;
    isDragging.current = true;
    startX.current = e.pageX - stripRef.current.offsetLeft;
    scrollLeft.current = stripRef.current.scrollLeft;
    stripRef.current.classList.add("is-dragging");
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current || !stripRef.current) return;
    e.preventDefault();
    const x = e.pageX - stripRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.4;
    stripRef.current.scrollLeft = scrollLeft.current - walk;
  }, []);

  const stopDrag = useCallback(() => {
    isDragging.current = false;
    stripRef.current?.classList.remove("is-dragging");
  }, []);

  // ─── Sync progress bar with scroll position ───
  useEffect(() => {
    const strip = stripRef.current;
    const fill = progressRef.current;
    if (!strip || !fill) return;

    const update = () => {
      const max = strip.scrollWidth - strip.clientWidth;
      const pct = max > 0 ? (strip.scrollLeft / max) * 100 : 0;
      fill.style.width = `${pct}%`;
    };

    strip.addEventListener("scroll", update, { passive: true });
    return () => strip.removeEventListener("scroll", update);
  }, []);

  // ─── Scroll-triggered animations ───
  useGSAP(() => {
    // Header slides in
    gsap.fromTo(
      ".motion-header",
      { opacity: 0, y: 32 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 82%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Cards cascade in from the right
    gsap.fromTo(
      ".motion-card",
      { opacity: 0, x: 60, scale: 0.95 },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        stagger: 0.1,
        duration: 0.65,
        ease: "power3.out",
        scrollTrigger: {
          trigger: stripRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Progress bar fades in
    gsap.fromTo(
      ".motion-progress-bar",
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.6,
        delay: 0.4,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 82%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, { scope: sectionRef });

  return (
    <section className="motion-section" id="motion" ref={sectionRef}>

      {/* Header row */}
      <div className="motion-header" style={{ opacity: 0 }}>
        <div>
          <span className="text-label" style={{ display: "block", marginBottom: "12px" }}>
            MOTION & PROTOTYPES
          </span>
          <h2 className="text-display">Selected Reel</h2>
        </div>
        <div className="motion-scroll-hint">
          Drag to explore
          <span className="motion-scroll-hint-arrow">→</span>
        </div>
      </div>

      {/* Horizontal drag strip */}
      <div
        className="motion-strip"
        ref={stripRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={stopDrag}
        onMouseLeave={stopDrag}
        onMouseEnter={() => setCursorType("button")}
        onMouseOut={() => setCursorType("default")}
      >
        {data.motion.map((item, idx) => (
          <div
            key={idx}
            className="motion-card"
            style={{ opacity: 0 }}
          >
            <img
              src={item.image}
              alt={item.title}
              className="motion-card-img"
              draggable={false}
              loading="lazy"
            />
            <div className="motion-card-overlay" />
            <div className="motion-card-info">
              <div className="motion-card-title">{item.title}</div>
              <div className="motion-card-tool">{item.tool}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="motion-progress-bar" style={{ opacity: 0 }}>
        <div className="motion-progress-fill" ref={progressRef} />
      </div>

    </section>
  );
}
