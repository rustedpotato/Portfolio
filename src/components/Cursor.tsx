"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { useCursor } from "@/components/CursorContext";

export default function Cursor() {
  const { cursorType, setCursorType } = useCursor();
  const [isVisible, setIsVisible] = useState(false);
  const [magnetTarget, setMagnetTarget] = useState<{ x: number; y: number } | null>(null);
  const rafRef = useRef<number | null>(null);
  const rawX = useRef(0);
  const rawY = useRef(0);

  // Inner dot — instant tracking via direct style mutation for performance
  const dotRef = useRef<HTMLDivElement>(null);

  // Outer ring — spring via framer-motion
  const springConfig = { stiffness: 150, damping: 20, mass: 0.8 };
  const ringX = useSpring(0, springConfig);
  const ringY = useSpring(0, springConfig);

  const scaleSpring = useSpring(1, { stiffness: 300, damping: 25 });

  // Animate inner dot with rAF for zero-lag tracking
  const animateDot = useCallback(function animateDot() {
    if (dotRef.current) {
      dotRef.current.style.transform = `translate(${rawX.current - 3}px, ${rawY.current - 3}px)`;
    }
    rafRef.current = requestAnimationFrame(animateDot);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      rawX.current = e.clientX;
      rawY.current = e.clientY;
      if (!isVisible) setIsVisible(true);

      // Update ring spring target
      if (magnetTarget) {
        // During magnetic: hold ring at element center
        ringX.set(magnetTarget.x - 28);
        ringY.set(magnetTarget.y - 28);
      } else {
        ringX.set(e.clientX - 22);
        ringY.set(e.clientY - 22);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    rafRef.current = requestAnimationFrame(animateDot);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isVisible, magnetTarget, ringX, ringY, animateDot]);

  // Magnetic detection — watch all [data-magnetic] elements
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-magnetic]");

    const onEnter = (el: HTMLElement) => () => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      setMagnetTarget({ x: cx, y: cy });
      setCursorType("magnetic");
      ringX.set(cx - 28);
      ringY.set(cy - 28);
      scaleSpring.set(1.4);
    };

    const onLeave = () => {
      setMagnetTarget(null);
      setCursorType("default");
      scaleSpring.set(1);
    };

    const listeners: Array<{ el: HTMLElement; enter: () => void; leave: () => void }> = [];

    elements.forEach((el) => {
      const enter = onEnter(el);
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", onLeave);
      listeners.push({ el, enter, leave: onLeave });
    });

    return () => {
      listeners.forEach(({ el, enter, leave }) => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
      });
    };
  }, [setCursorType, ringX, ringY, scaleSpring]);

  // Update ring target in real time during magnetic mode
  useEffect(() => {
    if (!magnetTarget) return;
    const update = () => {
      ringX.set(magnetTarget.x - 28);
      ringY.set(magnetTarget.y - 28);
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [magnetTarget, ringX, ringY]);

  // ---- Variant config ----
  const ringSize = cursorType === "project" ? 80 : cursorType === "button" ? 52 : cursorType === "magnetic" ? 56 : cursorType === "text" ? 3 : 44;
  const ringHeight = cursorType === "text" ? 26 : ringSize;
  const ringFill = cursorType === "project" ? "rgba(232,197,71,0.9)" : cursorType === "button" ? "rgba(232,197,71,0.35)" : cursorType === "magnetic" ? "rgba(232,197,71,0.2)" : "rgba(0,0,0,0)";
  const ringBorder = cursorType === "default" || cursorType === "text" ? "1.5px solid var(--c-accent)" : cursorType === "magnetic" ? "1.5px solid var(--c-accent)" : "none";
  const ringRadius = cursorType === "text" ? "2px" : "50%";

  const dotVisible = cursorType !== "project" && cursorType !== "button";
  const labelVisible = cursorType === "project";
  const arrowVisible = cursorType === "button";

  if (!isVisible) return null;

  return (
    <>
      {/* Outer ring — spring-lagged */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          scale: scaleSpring,
          width: ringSize,
          height: ringHeight,
          backgroundColor: ringFill,
          border: ringBorder,
          borderRadius: ringRadius,
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 9998,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          willChange: "transform",
        }}
        animate={{
          width: ringSize,
          height: ringHeight,
          backgroundColor: ringFill,
          border: ringBorder,
          borderRadius: ringRadius,
        }}
        transition={{ type: "spring", stiffness: 260, damping: 24, mass: 0.6 }}
      >
        {labelVisible && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            style={{ color: "#000", fontSize: "13px", fontWeight: "700", letterSpacing: "0.04em", userSelect: "none" }}
          >
            View
          </motion.span>
        )}
        {arrowVisible && (
          <motion.span
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            style={{ color: "var(--c-bg)", fontSize: "16px", fontWeight: "700", userSelect: "none" }}
          >
            →
          </motion.span>
        )}
      </motion.div>

      {/* Inner dot — zero-lag rAF tracked */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 6,
          height: 6,
          backgroundColor: "var(--c-accent)",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 10000,
          opacity: dotVisible ? 1 : 0,
          transition: "opacity 0.2s ease",
          willChange: "transform",
        }}
      />
    </>
  );
}
