"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Mail, Globe } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const SECTIONS = [
  { id: "projects", label: "01 WORK"    },
  { id: "skills",   label: "02 SKILLS"  },
  { id: "about",    label: "03 ABOUT"   },
  { id: "contact",  label: "04 CONTACT" },
];

const GithubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
  </svg>
);
const LinkedinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const SOCIALS = [
  { href: "mailto:galichaitanya5@gmail.com",                      label: "Email",    Icon: () => <Mail size={20} strokeWidth={1.5} /> },
  { href: "https://www.linkedin.com/in/chaitanya-gali-a4b2a4325", label: "LinkedIn", Icon: LinkedinIcon },
  { href: "https://github.com/",                                  label: "GitHub",   Icon: GithubIcon  },
  { href: "https://dribbble.com/",                                label: "Dribbble", Icon: () => <Globe size={20} strokeWidth={1.5} /> },
];

// ── Charge-reactive blaster SVG ──────────────────────────────────────────────
// charge: 0 (empty) → 1 (fully charged)
function GunSVG({ charge }: { charge: number }) {
  // ─ Energy cell bars light up at thresholds
  const bar1 = charge > 0.15;
  const bar2 = charge > 0.45;
  const bar3 = charge > 0.75;
  const blazing = charge > 0.95;

  // ─ Cell color shifts as charge builds. If empty, keep it gray/dark.
  const cellColor =
    charge < 0.15 ? "#2A2A2A" :
    charge < 0.50 ? "#00ff88" :
    charge < 0.82 ? "#ffe033" :
                    "#E8C547";

  // ─ Cell glow only active when at least one bar is charged
  const cellGlow = charge > 0.15 ? 0.1 + charge * 0.3 : 0;

  // ─ Plasma emitter core grows
  const coreR     = 0.5 + charge * 2.2;   // 0.5 → 2.7
  const innerRing = 1.6 + charge * 1.0;   // 1.6 → 2.6
  const bloomOp   = charge > 0.1 ? 0.1 + charge * 0.55 : 0;

  // ── FIX: Bucket pulse speed so CSS animation doesn't restart every single scroll pixel
  let pulseSpeed = "2.5s";
  if (blazing) pulseSpeed = "0.2s";
  else if (bar3) pulseSpeed = "0.4s";
  else if (bar2) pulseSpeed = "0.8s";
  else if (bar1) pulseSpeed = "1.2s";

  // ─ Conduit / energy line brightness
  const conduit1 = charge > 0.15 ? 0.18 + charge * 0.7 : 0;
  const conduit2 = charge > 0.15 ? 0.12 + charge * 0.55 : 0;
  const conduitBar = charge > 0.15 ? 0.25 + charge * 0.6 : 0;

  // ─ Barrel vent heat color
  const ventColor = charge > 0.7 ? "#ffb347" : "#E8C547";
  const ventOp    = charge > 0.2 ? 0.2 + charge * 0.8 : 0.1;

  // ─ Scope lens
  const lensGlint = charge < 0.6 ? "#7ecfff" : `hsl(${48 - charge * 30}, 100%, 70%)`;

  return (
    <svg
      width="64" height="136"
      viewBox="0 0 44 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block" }}
    >
      {/* ── Collapsible stock ── */}
      <line x1="8"  y1="2"  x2="36" y2="2"  stroke="#E8C547" strokeWidth="1.6" strokeLinecap="round"/>
      <line x1="8"  y1="7"  x2="36" y2="7"  stroke="#E8C547" strokeWidth="1.6" strokeLinecap="round"/>
      <line x1="8"  y1="12" x2="36" y2="12" stroke="#E8C547" strokeWidth="1.6" strokeLinecap="round"/>
      <line x1="8"  y1="17" x2="36" y2="17" stroke="#E8C547" strokeWidth="1.6" strokeLinecap="round"/>
      <line x1="9"  y1="2"  x2="9"  y2="18" stroke="#E8C547" strokeWidth="1.2"/>
      <line x1="35" y1="2"  x2="35" y2="18" stroke="#E8C547" strokeWidth="1.2"/>
      {/* Stock glow bloom */}
      <line x1="8" y1="7" x2="36" y2="7" stroke="#E8C547" strokeWidth="3" strokeLinecap="round" opacity={charge > 0.1 ? 0.06 + charge * 0.28 : 0}/>

      {/* ── Buffer tube ── */}
      <rect x="17" y="18" width="10" height="11" rx="5" fill="#1F1F1F" stroke="#E8C547" strokeWidth="1"/>
      <line x1="22" y1="19" x2="22" y2="28" stroke={cellColor} strokeWidth="0.9" opacity={conduitBar}/>

      {/* ── Receiver ── */}
      <rect x="9" y="29" width="26" height="22" rx="2" fill="#1F1F1F" stroke="#E8C547" strokeWidth="1"/>
      <rect x="12" y="30" width="20" height="4" rx="1" fill="#2A2A2A" stroke="#E8C547" strokeWidth="0.7"/>
      <line x1="13" y1="32" x2="31" y2="32" stroke="#E8C547" strokeWidth="0.5" strokeDasharray="2 1.5"/>

      {/* ── Scope ── */}
      <rect x="14" y="23" width="16" height="8" rx="3" fill="#161616" stroke="#E8C547" strokeWidth="0.9"/>
      <circle cx="22" cy="27" r="2.8" fill="#0C0C0C" stroke="#E8C547" strokeWidth="0.8"/>
      <circle cx="22" cy="27" r="1.8" fill="#071820"/>
      <circle cx="21" cy="26" r="0.5" fill={lensGlint} opacity="0.85"/>
      <rect x="12" y="25" width="2" height="4" rx="1" fill="#2A2A2A" stroke="#E8C547" strokeWidth="0.6"/>
      <rect x="30" y="25" width="2" height="4" rx="1" fill="#2A2A2A" stroke="#E8C547" strokeWidth="0.6"/>

      {/* Charging handle & Ejection port */}
      <rect x="20" y="29" width="4" height="2.5" rx="0.5" fill="#E8C547"/>
      <rect x="10" y="37" width="9" height="6" rx="0.5" fill="#0C0C0C" stroke="#E8C547" strokeWidth="0.6"/>

      {/* ── ENERGY CONDUIT lines ── */}
      <line x1="11" y1="45" x2="33" y2="45" stroke={cellColor} strokeWidth="0.7" opacity={conduit1}/>
      <line x1="11" y1="47" x2="22" y2="47" stroke={cellColor} strokeWidth="0.5" opacity={conduit2}/>

      {/* Trigger & Pistol grip */}
      <path d="M23 48 Q28 52 23 56" stroke="#E8C547" strokeWidth="1" fill="none" strokeLinecap="round"/>
      <path d="M35 37 L40 42 L38 57 Q36 60 33 58 L32 49" fill="#1F1F1F" stroke="#E8C547" strokeWidth="1" strokeLinejoin="round"/>
      <line x1="34" y1="46" x2="38" y2="46" stroke="#E8C547" strokeWidth="0.5" opacity="0.6"/>
      <line x1="34" y1="50" x2="38" y2="50" stroke="#E8C547" strokeWidth="0.5" opacity="0.6"/>
      <line x1="34" y1="54" x2="38" y2="54" stroke="#E8C547" strokeWidth="0.5" opacity="0.6"/>

      {/* ── ENERGY POWER CELL ── */}
      <path d="M9 33 L4 37 L3 55 Q4 58 8 57 L9 50" fill="#0d1a14" stroke="#E8C547" strokeWidth="1" strokeLinejoin="round"/>
      <line x1="4.5" y1="40" x2="8" y2="40" stroke={bar3 ? cellColor : "#2A2A2A"} strokeWidth="1.1" strokeLinecap="round" opacity={bar3 ? 0.95 : 0.25}/>
      <line x1="4" y1="44" x2="8" y2="44" stroke={bar2 ? cellColor : "#2A2A2A"} strokeWidth="1.1" strokeLinecap="round" opacity={bar2 ? 0.85 : 0.25}/>
      <line x1="4" y1="48" x2="8" y2="48" stroke={bar1 ? cellColor : "#2A2A2A"} strokeWidth="1.1" strokeLinecap="round" opacity={bar1 ? 0.7 : 0.25}/>
      <circle cx="6" cy="53" r="1.2" fill={cellColor} opacity={bar1 ? 0.95 : 0.2}/>
      <path d="M9 33 L4 37 L3 55 Q4 58 8 57 L9 50" stroke={cellColor} strokeWidth="3" opacity={cellGlow} strokeLinejoin="round"/>

      {/* ── Handguard ── */}
      <rect x="15" y="51" width="14" height="26" rx="1" fill="#1F1F1F" stroke="#E8C547" strokeWidth="1"/>
      <line x1="15" y1="57" x2="29" y2="57" stroke="#E8C547" strokeWidth="0.5" strokeDasharray="2 2"/>
      <line x1="15" y1="63" x2="29" y2="63" stroke="#E8C547" strokeWidth="0.5" strokeDasharray="2 2"/>
      <line x1="15" y1="69" x2="29" y2="69" stroke="#E8C547" strokeWidth="0.5" strokeDasharray="2 2"/>
      <line x1="22" y1="53" x2="22" y2="75" stroke={cellColor} strokeWidth="0.7" opacity={conduitBar}/>

      {/* ── Barrel & Heat Vents ── */}
      <rect x="20" y="77" width="4" height="14" rx="1" fill="#1a1a1a" stroke="#E8C547" strokeWidth="1"/>
      <line x1="20" y1="80" x2="24" y2="80" stroke={ventColor} strokeWidth="0.8" strokeDasharray="1 1" opacity={ventOp}/>
      <line x1="20" y1="83" x2="24" y2="83" stroke={ventColor} strokeWidth="0.8" strokeDasharray="1 1" opacity={ventOp}/>
      <line x1="20" y1="86" x2="24" y2="86" stroke={ventColor} strokeWidth="0.8" strokeDasharray="1 1" opacity={ventOp}/>
      <line x1="20" y1="89" x2="24" y2="89" stroke={ventColor} strokeWidth="0.8" strokeDasharray="1 1" opacity={ventOp}/>

      {/* ── PLASMA EMITTER ── */}
      {/* Outer bloom */}
      <circle cx="22" cy="94" r={4 + charge * 3.5} fill={cellColor} opacity={bloomOp}
        style={{ animation: bar1 ? `plasmaCharge ${pulseSpeed} ease-in-out infinite alternate` : "none", transformOrigin: "22px 94px" }}
      />
      <circle cx="22" cy="94" r="4" fill="#0d0a00" stroke={blazing ? cellColor : "#E8C547"} strokeWidth={blazing ? 1.5 : 1}/>
      <circle cx="22" cy="94" r={innerRing} fill="none" stroke={cellColor} strokeWidth="1.1" opacity="0.9"/>
      
      {/* Core */}
      <circle cx="22" cy="94" r={coreR} fill={cellColor} opacity="1"
        style={{ animation: bar1 ? `plasmaCharge ${pulseSpeed} ease-in-out infinite alternate` : "none", transformOrigin: "22px 94px" }}
      />
      
      {/* Full-charge BLAZE extra ring */}
      {blazing && (
        <circle cx="22" cy="94" r="6" fill="none" stroke="#fff" strokeWidth="0.6" opacity="0.4"
          style={{ animation: `plasmaCharge 0.2s ease-in-out infinite alternate`, transformOrigin: "22px 94px" }}
        />
      )}
    </svg>
  );
}

const SPINE_HEIGHT = 180;

export default function SideDecorations() {
  const containerRef   = useRef<HTMLDivElement>(null);
  const bulletRef      = useRef<HTMLDivElement>(null);
  const labelRef       = useRef<HTMLSpanElement>(null);

  const [activeSection, setActiveSection] = useState("projects");
  const [scrollPct,     setScrollPct]     = useState(0);
  const [aboutCharge,   setAboutCharge]   = useState(0);
  const chargeTargetRef = useRef(0);
  const chargeRafRef    = useRef<number>(0);
  const prevSectionRef  = useRef("projects");

  const fireLabel = useCallback(() => {
    const el = labelRef.current;
    if (!el) return;
    gsap.fromTo(
      el,
      { x: -18, opacity: 0, scale: 0.85 },
      { x: 0, opacity: 1, scale: 1, duration: 0.38, ease: "back.out(2.5)" }
    );
    gsap.fromTo(
      bulletRef.current,
      { scale: 1.8, boxShadow: "0 0 18px 8px rgba(232,197,71,0.9)" },
      { scale: 1,   boxShadow: "0 0 10px 3px rgba(232,197,71,0.55)", duration: 0.45, ease: "power3.out" }
    );
  }, []);

  // Smooth lerp loop for the charge value
  useEffect(() => {
    let current = 0;
    const loop = () => {
      current += (chargeTargetRef.current - current) * 0.08;
      if (Math.abs(chargeTargetRef.current - current) < 0.001) current = chargeTargetRef.current;
      setAboutCharge(current);
      chargeRafRef.current = requestAnimationFrame(loop);
    };
    chargeRafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(chargeRafRef.current);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollPct(docHeight > 0 ? scrollTop / docHeight : 0);

      // ── Charge: track scroll progress within the #about section ──
      const aboutEl = document.getElementById("about");
      if (aboutEl) {
        const sectionTop    = aboutEl.offsetTop;
        const sectionHeight = aboutEl.offsetHeight;
        // Start charging when section top hits bottom of viewport, finish when section bottom leaves top
        const start = sectionTop - window.innerHeight * 0.85;
        const end   = sectionTop + sectionHeight - window.innerHeight * 0.15;
        const raw   = (scrollTop - start) / (end - start);
        chargeTargetRef.current = Math.min(1, Math.max(0, raw));
      }

      const mid = scrollTop + window.innerHeight * 0.4;
      let current = SECTIONS[0].id;
      for (const sec of SECTIONS) {
        const el = document.getElementById(sec.id);
        if (el && el.offsetTop <= mid) current = sec.id;
      }
      if (current !== prevSectionRef.current) {
        prevSectionRef.current = current;
        setActiveSection(current);
        fireLabel();
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [fireLabel]);

  useGSAP(() => {
    gsap.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.2, delay: 2.8, ease: "power2.out" }
    );
  }, { scope: containerRef });

  const bulletY    = scrollPct * SPINE_HEIGHT;
  const activeLabel = SECTIONS.find(s => s.id === activeSection)?.label ?? "";

  return (
    <div
      ref={containerRef}
      style={{ position: "fixed", inset: 0, zIndex: 40, pointerEvents: "none", opacity: 0 }}
    >
      {/* LEFT RAIL */}
      <div className="side-rail side-rail--left">
        <GunSVG charge={aboutCharge} />

        <div className="spine-track">
          <div className="spine-fill" style={{ height: `${scrollPct * 100}%` }} />
          <div ref={bulletRef} className="spine-dot" style={{ top: `${bulletY}px` }}>
            <span ref={labelRef} className="bullet-label">{activeLabel}</span>
          </div>
        </div>

        {/* Charging status — visible while scrolling through About section */}
        <div
          className="charge-status"
          style={{
            opacity: aboutCharge > 0.01 && aboutCharge < 0.99 ? 1 : 0,
            transition: "opacity 0.4s ease",
          }}
        >
          <div className="charge-status-label">
            <span className="charge-dot" />
            CHARGING
          </div>
          <div className="charge-bar-track">
            <div
              className="charge-bar-fill"
              style={{
                width: `${aboutCharge * 100}%`,
                background: aboutCharge < 0.5
                  ? "linear-gradient(90deg, #00ff88, #ffe033)"
                  : "linear-gradient(90deg, #ffe033, #E8C547)",
              }}
            />
          </div>
          <span className="charge-pct">{Math.round(aboutCharge * 100)}%</span>
        </div>
      </div>

      {/* RIGHT RAIL */}
      <div className="side-rail side-rail--right">
        <div className="social-col" style={{ pointerEvents: "all" }}>
          <div className="social-col-line" />
          {SOCIALS.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel="noreferrer"
              aria-label={label}
              className="social-col-icon"
              title={label}
            >
              <Icon />
            </a>
          ))}
          <div className="social-col-line" />
        </div>
      </div>
    </div>
  );
}
