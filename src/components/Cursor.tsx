"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useCursor } from "@/components/CursorContext";

export default function Cursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { cursorType } = useCursor();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, [isVisible]);

  if (!isVisible && typeof window !== 'undefined') return null;

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      width: 32,
      height: 32,
      backgroundColor: "transparent",
      border: "1px solid var(--c-accent)",
      opacity: 1
    },
    button: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      width: 48,
      height: 48,
      backgroundColor: "var(--c-accent)",
      border: "none",
      opacity: 0.4
    },
    project: {
      x: mousePosition.x - 40,
      y: mousePosition.y - 40,
      width: 80,
      height: 80,
      backgroundColor: "var(--c-accent)",
      border: "none",
      opacity: 0.95
    }
  };

  return (
    <>
      <motion.div
        variants={variants}
        animate={cursorType}
        transition={{ type: "spring", stiffness: 300, damping: 28, mass: 0.5 }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        {cursorType === "project" && (
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ color: "#000", fontSize: "14px", fontWeight: "bold" }}
          >
            View
          </motion.span>
        )}
      </motion.div>
      <motion.div
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          opacity: cursorType === "project" ? 0 : 1
        }}
        transition={{ type: "spring", stiffness: 1000, damping: 50, mass: 0.1 }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          backgroundColor: "var(--c-accent)",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 10000
        }}
      />
    </>
  );
}
