"use client";

import { useRef } from "react";
import Marquee from "../Marquee";
import "./Skills.css";
import data from "@/data/portfolio.json";
import { sound } from "@/utils/soundEngine";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // ─── Heading block parallax (moves slightly slower than scroll) ───
    gsap.fromTo(
      ".skills-heading-block",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".skills-heading-block",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Subtle depth parallax on the heading (continues while it stays in view)
    gsap.fromTo(
      ".skills-heading-block",
      { y: 0 },
      {
        y: -40,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "center top",
          scrub: 2,
        },
      }
    );

    // ─── Skill categories stagger in ───
    gsap.fromTo(
      ".skill-category",
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.12,
        duration: 0.65,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".skills-grid",
          start: "top 82%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // ─── Skill pills pop in ───
    gsap.fromTo(
      ".skill-pill",
      { opacity: 0, scale: 0.75 },
      {
        opacity: 1,
        scale: 1,
        stagger: 0.03,
        duration: 0.4,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".skills-grid",
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, { scope: sectionRef });

  return (
    <section className="section" id="skills" style={{ overflow: "hidden", paddingTop: "40px" }} ref={sectionRef}>
      <div className="container" style={{ marginBottom: "40px", maxWidth: "1000px" }}>
        <div className="skills-heading-block" style={{ marginBottom: "40px", opacity: 0 }}>
          <span className="text-label" style={{ display: "block", marginBottom: "16px" }}>
            CAPABILITIES
          </span>
          <h2 className="text-display">
            What I Bring to the Table
          </h2>
        </div>

        <div className="skills-grid">
          {data.capabilities.map((cat, idx) => (
            <div key={idx} className="skill-category" style={{ opacity: 0 }}>
              <h3 className="text-h3" style={{ marginBottom: "24px" }}>{cat.title}</h3>
              <div className="skill-pills">
                {cat.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="skill-pill"
                    style={{ opacity: 0 }}
                    onMouseEnter={() => sound.playHover()}
                    onClick={() => sound.playClick()}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="skills-marquee">
        <Marquee
          speed={50}
          items={[
            { name: "Figma", icon: <img src="https://api.iconify.design/logos:figma.svg" width="24" height="24" alt="Figma" /> },
            { name: "FigJam", icon: <img src="https://api.iconify.design/logos:figma.svg" width="24" height="24" alt="FigJam" style={{ filter: "hue-rotate(270deg) drop-shadow(0 0 2px rgba(255,100,50,0.5))" }} /> },
            { name: "After Effects", icon: <img src="https://api.iconify.design/logos:adobe-after-effects.svg" width="24" height="24" alt="After Effects" /> },
            { name: "Principle", icon: <img src="https://api.iconify.design/ph:bezier-curve.svg" width="24" height="24" alt="Principle" className="theme-icon-dynamic" /> },
            { name: "Framer", icon: <img src="https://api.iconify.design/simple-icons:framer.svg" width="24" height="24" alt="Framer" className="theme-icon-dynamic" /> },
            { name: "Midjourney", icon: <img src="https://api.iconify.design/simple-icons:midjourney.svg" width="24" height="24" alt="Midjourney" className="theme-icon-dynamic" /> },
            { name: "Lottie", icon: <img src="https://api.iconify.design/simple-icons:lottiefiles.svg?color=%2300c19a" width="24" height="24" alt="Lottie" /> },
            { name: "Zeplin", icon: <img src="https://api.iconify.design/logos:zeplin.svg" width="24" height="24" alt="Zeplin" /> },
            { name: "HTML / CSS", icon: <img src="https://api.iconify.design/logos:html-5.svg" width="24" height="24" alt="HTML / CSS" /> },
          ]}
        />
      </div>
    </section>
  );
}
