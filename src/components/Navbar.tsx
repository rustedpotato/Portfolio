"use client";

import { useState, useRef } from "react";
import "./Navbar.css";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Briefcase, User, Mail } from "lucide-react";
import { useTheme } from "next-themes";
import { useCursor } from "@/components/CursorContext";
import { useSound } from "@/components/SoundContext";
import { sound } from "@/utils/soundEngine";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const { theme, setTheme } = useTheme();
  const { setCursorType } = useCursor();
  const navRef = useRef<HTMLDivElement>(null);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 80);
  });

  const { contextSafe } = useGSAP(() => {
    gsap.from(".gsap-nav-item", {
      y: -50,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: "power3.out",
      delay: 0.2
    });
  }, { scope: navRef });

  const onNavEnter = contextSafe((e: React.MouseEvent<HTMLElement>) => {
    setCursorType("button");
    sound.playHover();
    gsap.to(e.currentTarget, { 
      scale: 1.05, 
      y: -2,
      rotation: -3,
      color: "var(--c-surface)",
      backgroundColor: "var(--c-text)",
      boxShadow: "0 8px 16px rgba(0,0,0,0.15)",
      duration: 0.4, 
      ease: "back.out(2)",
      overwrite: "auto"
    });
  });

  const onNavLeave = contextSafe((e: React.MouseEvent<HTMLElement>) => {
    setCursorType("default");
    gsap.to(e.currentTarget, { 
      scale: 1, 
      y: 0,
      rotation: 0,
      color: "var(--c-text)",
      backgroundColor: "var(--c-surface2)",
      boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      duration: 0.4, 
      ease: "power3.out",
      overwrite: "auto"
    });
  });

  return (
    <nav
      ref={navRef}
      className={`navbar ${scrolled ? "scrolled" : ""}`}
    >
      <div className="nav-container">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            className="gsap-nav-item"
            style={{ background: 'none', border: 'none', color: 'inherit', padding: 0, cursor: 'pointer', display: 'flex' }}
            onMouseEnter={onNavEnter} 
            onMouseLeave={onNavLeave}
            onClick={() => {
              setTheme(theme === "dark" ? "light" : "dark");
              sound.playClick();
            }}
            aria-label="Toggle theme"
          >
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
              style={{ display: 'flex', transformOrigin: "center" }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="2" x2="12" y2="22" />
                <line x1="2" y1="12" x2="22" y2="12" />
              </svg>
            </motion.div>
          </button>
          <Link href="#work" className="logo gsap-nav-item" style={{ textDecoration: 'none', color: 'var(--c-text)', fontSize: '18px', fontWeight: 'bold' }} onMouseEnter={onNavEnter} onMouseLeave={onNavLeave}>
            CHAITANYA
          </Link>
        </div>
        <div className="nav-links">
          <Link href="#projects" className="nav-link text-label gsap-nav-item" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '15px' }} onMouseEnter={onNavEnter} onMouseLeave={onNavLeave} onClick={() => sound.playClick()}>
            <Briefcase size={16} /> Work
          </Link>
          <Link href="#about" className="nav-link text-label gsap-nav-item" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '15px' }} onMouseEnter={onNavEnter} onMouseLeave={onNavLeave} onClick={() => sound.playClick()}>
            <User size={16} /> About
          </Link>
          <Link href="#contact" className="nav-link text-label gsap-nav-item" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '15px' }} onMouseEnter={onNavEnter} onMouseLeave={onNavLeave} onClick={() => sound.playClick()}>
            <Mail size={16} /> Contact
          </Link>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* Sound button disabled / removed natively to keep code clean */}
          <Link 
            href="#contact"
            className="btn-ghost gsap-nav-item" 
            style={{ padding: "10px 20px", textDecoration: 'none', display: 'inline-flex', alignItems: 'center', fontSize: '15px', fontWeight: '500' }}
            onMouseEnter={onNavEnter}
            onMouseLeave={onNavLeave}
            onClick={() => sound.playClick()}
          >
            Hire Me
          </Link>
        </div>
      </div>
    </nav>
  );
}

