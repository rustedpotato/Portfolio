"use client";

import { useState, useEffect } from "react";
import "./Navbar.css";
import { motion, useScroll, useMotionValueEvent, useTransform } from "framer-motion";
import { Sun, Moon, Briefcase, User, Mail, Volume2, VolumeX } from "lucide-react";
import { useTheme } from "next-themes";
import { useCursor } from "@/components/CursorContext";
import { useSound } from "@/components/SoundContext";
import { sound } from "@/utils/soundEngine";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { setCursorType } = useCursor();
  const { isMuted, toggleMute } = useSound();

  useEffect(() => {
    setMounted(true);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 80);
  });

  const handleHover = () => {
    setCursorType("button");
    sound.playHover();
  };

  const handleLeave = () => {
    setCursorType("default");
  };

  return (
    <motion.nav
      className={`navbar ${scrolled ? "scrolled" : ""}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="nav-container">
        <a href="#work" className="logo" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '10px' }} onMouseEnter={handleHover} onMouseLeave={handleLeave}>
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
          CHAITANYA
        </a>
        <div className="nav-links">
          <a href="#projects" className="nav-link text-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }} onMouseEnter={handleHover} onMouseLeave={handleLeave}>
            <Briefcase size={14} /> Work
          </a>
          <a href="#about" className="nav-link text-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }} onMouseEnter={handleHover} onMouseLeave={handleLeave}>
            <User size={14} /> About
          </a>
          <a href="#contact" className="nav-link text-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }} onMouseEnter={handleHover} onMouseLeave={handleLeave}>
            <Mail size={14} /> Contact
          </a>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {mounted && (
            <>
              <button 
                onClick={toggleMute} 
                className="theme-toggle"
                aria-label="Toggle Sound"
                onMouseEnter={handleHover}
                onMouseLeave={handleLeave}
              >
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
              <button 
                onClick={() => {
                  setTheme(theme === "dark" ? "light" : "dark");
                  sound.playClick();
                }} 
                className="theme-toggle"
                aria-label="Toggle theme"
                onMouseEnter={handleHover}
                onMouseLeave={handleLeave}
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </>
          )}
          <a 
            href="https://www.linkedin.com/in/chaitanya-gali-a4b2a4325"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost" 
            style={{ padding: "10px 20px", textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
            onClick={() => sound.playClick()}
          >
            Hire Me
          </a>
        </div>
      </div>
    </motion.nav>
  );
}
