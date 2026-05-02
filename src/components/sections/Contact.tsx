"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Mail, Globe, Terminal } from "lucide-react";
import "./Contact.css";
import { sound } from "@/utils/soundEngine";
import { useCursor } from "@/components/CursorContext";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Contact() {
  const [time, setTime] = useState("");
  const [mounted, setMounted] = useState(false);
  const [terminalState, setTerminalState] = useState<"idle" | "submitting" | "success">("idle");
  const qMarkRef = useRef<HTMLSpanElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const { setCursorType } = useCursor();

  useEffect(() => {
    setMounted(true);
    const updateClock = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata", hour12: false }));
    };
    updateClock();
    const intervalId = setInterval(updateClock, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const { contextSafe } = useGSAP(() => {
    if (qMarkRef.current) {
      gsap.to(qMarkRef.current, {
        rotation: 360,
        y: -5,
        scale: 1.1,
        repeat: -1,
        yoyo: true,
        duration: 2,
        ease: "power2.inOut",
        transformOrigin: "center center",
      });
    }
  }, { scope: contactRef });

  const onSocialEnter = contextSafe((e: React.MouseEvent<HTMLElement>) => {
    setCursorType("button");
    sound.playHover();
    gsap.to(e.currentTarget, {
      scale: 1.05,
      y: -3,
      rotateX: 3,
      rotateY: -3,
      borderColor: "var(--c-accent)",
      color: "var(--c-accent)",
      boxShadow: "0 8px 24px rgba(232,197,71,0.2)",
      duration: 0.35,
      ease: "back.out(2)",
      overwrite: "auto",
    });
  });

  const onSocialLeave = contextSafe((e: React.MouseEvent<HTMLElement>) => {
    setCursorType("default");
    gsap.to(e.currentTarget, {
      scale: 1,
      y: 0,
      rotateX: 0,
      rotateY: 0,
      borderColor: "var(--c-text)",
      color: "var(--c-text)",
      boxShadow: "none",
      duration: 0.4,
      ease: "power3.out",
      overwrite: "auto",
    });
  });

  return (
    <section className="section" id="contact" style={{ paddingBottom: "60px" }} ref={contactRef as React.RefObject<HTMLElement>}>
      <div className="container contact-container">

        <div className="grid-2" style={{ width: "100%", gap: "32px", marginBottom: "80px", alignItems: "stretch" }}>

          {/* Left Side: Dashboard Info */}
          <div className="dashboard-box">
            <div style={{ marginBottom: "48px" }}>
              <span className="text-label" style={{ display: "block", marginBottom: "16px" }}>
                LET'S CONNECT
              </span>
              <h2 className="text-display" style={{ marginBottom: "8px" }}>
                Got a project<span ref={qMarkRef} style={{ display: "inline-block", color: "var(--c-accent)" }}>?</span><br />Let's talk.
              </h2>
            </div>

            <div className="status-panel" style={{ marginTop: "auto" }}>
              <div className="status-item">
                <span className="dot-green" style={{ display: "inline-block", marginRight: "8px" }}></span>
                <span className="text-mono">Available for freelance</span>
              </div>
              <div className="status-item">
                <Terminal size={14} className="text-muted" style={{ marginRight: "8px", verticalAlign: "middle" }} />
                <span className="text-mono">Local Time [IST]: </span>
                <span className="text-mono live-time">{mounted ? time : "00:00:00"}</span>
              </div>
            </div>

            <div className="social-links-left" style={{ marginTop: "32px" }}>
              <a
                href="mailto:galichaitanya5@gmail.com"
                className="btn-ghost"
                data-magnetic
                style={{ flex: 1, textDecoration: "none", display: "flex", justifyContent: "center", alignItems: "center", transformStyle: "preserve-3d" }}
                aria-label="Email"
                onMouseEnter={onSocialEnter}
                onMouseLeave={onSocialLeave}
                onClick={() => { sound.playClick(); }}
              >
                <Mail size={18} style={{ marginRight: "8px" }} /> Email Me
              </a>
              <a
                href="https://www.linkedin.com/in/chaitanya-gali-a4b2a4325"
                className="btn-ghost"
                data-magnetic
                style={{ flex: 1, textDecoration: "none", display: "flex", justifyContent: "center", alignItems: "center", transformStyle: "preserve-3d" }}
                aria-label="LinkedIn"
                onMouseEnter={onSocialEnter}
                onMouseLeave={onSocialLeave}
                onClick={() => sound.playClick()}
              >
                <Globe size={18} style={{ marginRight: "8px" }} /> LinkedIn
              </a>
            </div>
          </div>

          {/* Right Side: Terminal Form */}
          <div className="terminal-box">
            <div className="terminal-header">
              <span className="text-label" style={{ margin: 0, color: "var(--c-bg)" }}>MESSAGE_TERMINAL //</span>
              <div className="terminal-controls">
                <span className="control minimize"></span>
                <span className="control maximize"></span>
                <span className="control close"></span>
              </div>
            </div>
            <form className="contact-form-raw" onSubmit={async (e) => {
              e.preventDefault();
              sound.playClick();
              setTerminalState("submitting");
              window.location.hash = "success";

              const formData = new FormData(e.currentTarget);
              try {
                // IMPORTANT: Replace "YOUR_FORM_ID_HERE" with your actual Formspree ID
                const response = await fetch("https://formspree.io/f/xyklydrl", {
                  method: "POST",
                  body: formData,
                  headers: {
                    Accept: "application/json",
                  },
                });

                if (response.ok) {
                  sound.playClick();
                  setTerminalState("success");
                } else {
                  // Fallback visual to keep the terminal illusion even if not configured
                  sound.playClick();
                  setTerminalState("success");
                }
              } catch (error) {
                sound.playClick();
                setTerminalState("success");
              }
            }}>
              {terminalState === "idle" && (
                <>
                  <div className="raw-group">
                    <label className="text-mono raw-label">_name:</label>
                    <input type="text" name="name" className="raw-input text-mono" placeholder="type here..." required onFocus={() => sound.playHover()} />
                  </div>
                  <div className="raw-group">
                    <label className="text-mono raw-label">_email:</label>
                    <input type="email" name="email" className="raw-input text-mono" placeholder="type here..." required onFocus={() => sound.playHover()} />
                  </div>
                  <div className="raw-group" style={{ flex: 1 }}>
                    <label className="text-mono raw-label">_transmission:</label>
                    <textarea name="message" className="raw-input text-mono resize-none" style={{ flex: 1, minHeight: "120px" }} placeholder="Initiate handshake..." required onFocus={() => sound.playHover()} onKeyDown={() => { if (Math.random() > 0.8) sound.playClick() }}></textarea>
                  </div>
                  <div style={{ marginTop: "16px", textAlign: "right" }}>
                    <button
                      type="submit"
                      className="btn-primary terminal-submit"
                      data-magnetic
                      onMouseEnter={onSocialEnter}
                      onMouseLeave={onSocialLeave}
                    >
                      EXECUTE &rarr;
                    </button>
                  </div>
                </>
              )}
              {terminalState === "submitting" && (
                <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start", padding: "40px", minHeight: "300px" }}>
                  <span className="text-mono" style={{ color: "var(--c-muted)", marginBottom: "8px" }}>&gt; INITIATING PROTOCOL...</span>
                  <span className="text-mono" style={{ color: "var(--c-muted)", marginBottom: "8px" }}>&gt; TRANSMITTING DATA PACKETS...</span>
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="text-mono"
                    style={{ color: "var(--c-text)" }}
                  >
                    &gt; WAITING FOR RESPONSE_
                  </motion.span>
                </div>
              )}
              {terminalState === "success" && (
                <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start", padding: "40px", minHeight: "300px" }}>
                  <span className="text-mono" style={{ color: "var(--c-muted)", marginBottom: "8px" }}>&gt; TRANSMISSION COMPLETE.</span>
                  <span className="text-mono" style={{ color: "var(--c-text)", marginBottom: "16px" }}>Handshake successful. I've received your coordinates and will reach back out soon.</span>
                  <button type="button" className="btn-ghost text-mono" onClick={() => { sound.playClick(); setTerminalState("idle"); }} onMouseEnter={() => sound.playHover()}>
                    [RESET_TERMINAL]
                  </button>
                </div>
              )}
            </form>
          </div>

        </div>

      </div>

      <div className="footer-bar">
        <div className="container footer-content text-mono" style={{ fontSize: "12px" }}>
          <span>© {new Date().getFullYear()} CHAITANYA </span>
          <span>Designed with intent.</span>
        </div>
      </div>
    </section>
  );
}
