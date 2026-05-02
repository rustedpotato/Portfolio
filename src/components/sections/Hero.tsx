"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Marquee from "../Marquee";
import "./Hero.css";
import { useCursor } from "@/components/CursorContext";
import { sound } from "@/utils/soundEngine";
import Link from "next/link";
import HeroGlassDistortion from "./HeroGlassDistortion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const yLeft = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const yRight = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const tagline = "Hey I'm · Chaitanya Gali ·".split(" · ");
  const { setCursorType } = useCursor();

  const { contextSafe } = useGSAP(() => {}, { scope: ctaRef });

  const onBtnEnter = contextSafe((e: React.MouseEvent<HTMLElement>) => {
    setCursorType("button");
    sound.playHover();
    gsap.to(e.currentTarget, {
      scale: 1.06,
      y: -4,
      boxShadow: "0 12px 32px rgba(232,197,71,0.35)",
      duration: 0.35,
      ease: "back.out(2)",
      overwrite: "auto",
    });
  });

  const onBtnLeave = contextSafe((e: React.MouseEvent<HTMLElement>) => {
    setCursorType("default");
    gsap.to(e.currentTarget, {
      scale: 1,
      y: 0,
      boxShadow: "none",
      duration: 0.4,
      ease: "power3.out",
      overwrite: "auto",
    });
  });

  return (
    <section className="hero-section" id="work" ref={containerRef} style={{ position: "relative" }}>
      {/* WebGL glass distortion overlay — covers the full hero, pointer-events: none */}
      <HeroGlassDistortion />

      <motion.div className="container hero-container grid-2" style={{ opacity, position: "relative", zIndex: 2 }}>
        <motion.div className="hero-left" style={{ y: yLeft }}>
          <div className="available-badge">
            <span className="dot-green"></span>
            <span className="text-label">Available for work</span>
          </div>

          <div className="hero-tagline" style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            {tagline.map((word, i) => (
              <motion.div
                key={i}
                className="text-hero"
                data-cursor="text"
                onMouseEnter={() => setCursorType("text")}
                onMouseLeave={() => setCursorType("default")}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15, duration: 0.8, ease: "easeOut" }}
              >
                {word}{i !== tagline.length - 1 ? " " : ""}
              </motion.div>
            ))}
          </div>

          <div className="hero-ctas" style={{ marginTop: "40px", display: "flex", gap: "16px" }} ref={ctaRef}>
            <Link
              href="#projects"
              className="btn-primary"
              data-magnetic
              style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", justifyContent: "center" }}
              onMouseEnter={onBtnEnter}
              onMouseLeave={onBtnLeave}
              onClick={() => sound.playClick()}
            >
              View My Work →
            </Link>
            <a
              href="/resume.pdf"
              download
              className="btn-ghost"
              data-magnetic
              style={{ textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center" }}
              onMouseEnter={onBtnEnter}
              onMouseLeave={onBtnLeave}
              onClick={() => sound.playClick()}
            >
              Download Resume
            </a>
          </div>
        </motion.div>

        <motion.div className="hero-right" style={{ y: yRight }}>
          <div className="hero-mockup-frame">
            <img src="/profile.jpg" alt="Chaitanya Gali" className="hero-photo" />
          </div>
        </motion.div>
      </motion.div>

      <div className="hero-marquee-wrapper" style={{ position: "relative", zIndex: 2 }}>
        <Marquee
          speed={40}
          items={[
            { name: "Figma", icon: <img src="https://api.iconify.design/logos:figma.svg" width="24" height="24" alt="Figma" /> },
            { name: "Design Systems", icon: <img src="https://api.iconify.design/lucide:layout-template.svg" width="24" height="24" alt="Design Systems" className="theme-icon-dynamic" /> },
            { name: "Prototyping", icon: <img src="https://api.iconify.design/lucide:monitor-smartphone.svg" width="24" height="24" alt="Prototyping" className="theme-icon-dynamic" /> },
            { name: "UX Research", icon: <img src="https://api.iconify.design/lucide:search-code.svg" width="24" height="24" alt="UX Research" className="theme-icon-dynamic" /> },
          ]}
        />
      </div>
    </section>
  );
}
