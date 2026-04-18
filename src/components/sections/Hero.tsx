"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Marquee from "../Marquee";
import { Compass, PenTool, Layout, Monitor } from "lucide-react";
import "./Hero.css";
import { useCursor } from "@/components/CursorContext";
import { sound } from "@/utils/soundEngine";
import Link from "next/link";

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const yLeft = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const yRight = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const tagline = "Hey I'm · Chaitanya Gali ·".split(" · ");
  const { setCursorType } = useCursor();

  const handleHover = () => {
    setCursorType("button");
    sound.playHover();
  };

  const handleLeave = () => {
    setCursorType("default");
  };

  return (
    <section className="hero-section" id="work" ref={containerRef}>
      <motion.div className="container hero-container grid-2" style={{ opacity }}>
        <motion.div className="hero-left" style={{ y: yLeft }}>
          <div className="available-badge">
            <span className="dot-green"></span>
            <span className="text-label">Available for work</span>
          </div>

          <div className="hero-tagline">
            {tagline.map((word, i) => (
              <div key={i} className="word-wrapper">
                <motion.div
                  className="text-hero word"
                  initial={{ opacity: 0, y: 80 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.12, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  {word}{i !== tagline.length - 1 ? " " : ""}
                </motion.div>
              </div>
            ))}
          </div>

          <p className="hero-subtext text-body" style={{ color: "var(--c-muted)", marginTop: "24px" }}>
            Computer Science major aspiring to be a UI/UX designer and developer.
          </p>

          <div className="hero-ctas" style={{ marginTop: "40px", display: "flex", gap: "16px" }}>
            <Link
              href="#projects"
              className="btn-primary"
              style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
              onMouseEnter={handleHover}
              onMouseLeave={handleLeave}
              onClick={() => sound.playClick()}
            >
              View My Work &rarr;
            </Link>
            <a
              href="/resume.pdf"
              download
              className="btn-ghost"
              style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              onMouseEnter={handleHover}
              onMouseLeave={handleLeave}
              onClick={() => sound.playClick()}
            >
              Download Resume
            </a>
          </div>
        </motion.div>

        <motion.div className="hero-right" style={{ y: yRight }}>
          {/* Mockup or subtle reel placeholder */}
          <div className="hero-mockup-frame">
            <img src="/profile.jpg" alt="Chaitanya Gali" className="hero-photo" />
          </div>
        </motion.div>
      </motion.div>

      <div className="hero-marquee-wrapper">
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
