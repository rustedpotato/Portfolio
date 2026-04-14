"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function SplashAnimation() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const hideTimer = setTimeout(() => {
      setShow(false);
    }, 2000); // Complete animation and hide overlay

    // Optionally lock body scroll while splashing
    document.body.style.overflow = "hidden";
    const scrollTimer = setTimeout(() => {
      document.body.style.overflow = "";
    }, 2500);

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(scrollTimer);
      document.body.style.overflow = "";
    };
  }, []);

  if (!show) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="splash"
          exit={{ opacity: 0, filter: "blur(10px)", scale: 1.05 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            backgroundColor: "var(--c-bg)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            pointerEvents: "none"
          }}
        >
          {/* Internal Content (e.g. Logo or loading text) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20, filter: "blur(5px)" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            style={{ zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center" }}
          >
            <div className="text-display" style={{ letterSpacing: "0.2em", fontSize: "clamp(24px, 4vw, 42px)", textAlign: "center" }}>
              INITIALIZING PEAK
            </div>
            
            <div style={{
              width: "100%",
              height: "2px",
              backgroundColor: "rgba(255,255,255,0.1)",
              marginTop: "16px",
              position: "relative",
              overflow: "hidden",
              borderRadius: "2px"
            }}>
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "200%" }}
                transition={{ duration: 1.5, delay: 0.4, ease: "easeInOut" }}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "50%",
                  height: "100%",
                  background: "linear-gradient(to right, transparent, var(--c-accent) 80%, #ffffff 100%)",
                  boxShadow: "2px 0 10px var(--c-accent)"
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
