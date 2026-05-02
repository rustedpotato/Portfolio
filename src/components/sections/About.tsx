"use client";

import { useRef } from "react";
import { Camera, Map, Activity, Headphones } from "lucide-react";
import { motion } from "framer-motion";
import "./About.css";
import data from "@/data/portfolio.json";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const photoColRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {
      // Subtle vertical parallax on the photo (moves slower than scroll)
      gsap.fromTo(
        photoColRef.current,
        { y: -30 },
        {
          y: 30,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        }
      );

      // Content block slides in from right
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, x: 40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // Mobile: fade everything in
    mm.add("(max-width: 768px)", () => {
      gsap.fromTo(
        [photoColRef.current, contentRef.current],
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // Timeline items stagger in from left
    gsap.fromTo(
      ".about-timeline-item",
      { opacity: 0, x: -20 },
      {
        opacity: 1,
        x: 0,
        stagger: 0.12,
        duration: 0.55,
        ease: "power2.out",
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Hobby tags bounce in
    gsap.fromTo(
      ".hobby-tag",
      { opacity: 0, scale: 0.8, y: 10 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        stagger: 0.07,
        duration: 0.45,
        ease: "back.out(1.6)",
        scrollTrigger: {
          trigger: ".hobby-tags",
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      }
    );

    return () => mm.revert();
  }, { scope: sectionRef });

  return (
    <section className="section about-section" id="about" ref={sectionRef}>
      <div className="container about-grid">

        {/* Left: CSS sticky photo — reliable, no GSAP pin-spacer conflicts */}
        <div className="about-photo-col" ref={photoColRef}>
          <div className="about-photo-sticky">
            <div className="about-photo-frame">
              <div className="grain-overlay"></div>
              <img
                src="/profile.jpg"
                alt="Portrait"
                loading="lazy"
                className="about-photo"
              />
            </div>
          </div>
        </div>

        {/* Right: scrolling content */}
        <div className="about-content" ref={contentRef}>
          <span className="text-label" style={{ display: "block", marginBottom: "32px" }}>
            ABOUT
          </span>

          <div className="text-h3" style={{ color: "var(--c-text)", fontWeight: 500, marginBottom: "48px", display: "flex", flexDirection: "column", gap: "16px" }}>
            <p>
              I&apos;m Chaitanya Gali from Don Bosco Institute of Technology — a computer science major in 2nd year (2024–2028) who aspires to be a UI/UX designer and developer.
            </p>
          </div>

          <h3 className="text-h3" style={{ marginBottom: "24px" }}>Education</h3>
          <div className="about-timeline" ref={timelineRef}>
            {data.education.map((edu, idx) => (
              <div key={idx} className="about-timeline-item">
                <div className="about-timeline-node"></div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "16px", flexWrap: "wrap", width: "100%" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <span className="text-body" style={{ fontWeight: 500, color: "var(--c-text)" }}>{edu.degree}</span>
                    <span className="text-label" style={{ color: "var(--c-accent)" }}>{edu.school}</span>
                  </div>
                  <span className="text-mono" style={{ whiteSpace: "nowrap", paddingTop: "2px" }}>{edu.year}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="hobbies">
            <h3 className="text-h3" style={{ marginBottom: "16px", marginTop: "40px" }}>For fun I...</h3>
            <div className="hobby-tags" style={{ marginBottom: "24px" }}>
              <span className="hobby-tag">
                <motion.div animate={{ scale: [1, 1.25, 1] }} transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }} style={{ display: "flex" }}>
                  <Camera size={20} />
                </motion.div>
                Photography
              </span>
              <span className="hobby-tag">
                <motion.div animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }} style={{ display: "flex" }}>
                  <Map size={20} />
                </motion.div>
                Trekking
              </span>
              <span className="hobby-tag">
                <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }} style={{ display: "flex" }}>
                  <Activity size={20} />
                </motion.div>
                Running
              </span>
              <span className="hobby-tag">
                <motion.div animate={{ rotate: [-15, 15, -15] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }} style={{ display: "flex" }}>
                  <Headphones size={20} />
                </motion.div>
                Music
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
