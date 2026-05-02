"use client";

import { useRef } from "react";
import "./Projects.css";
import data from "@/data/portfolio.json";
import { useCursor } from "@/components/CursorContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const { setCursorType } = useCursor();
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // ─── Heading reveal ───
    gsap.fromTo(
      ".projects-heading",
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".projects-heading",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // ─── Cards stagger in ───
    gsap.fromTo(
      ".project-card",
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".project-card",
          start: "top 88%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // ─── Parallax on each thumbnail image ───
    // Images scroll slightly slower than the page (move up -30px over the card's scroll range)
    document.querySelectorAll<HTMLElement>(".project-thumb").forEach((img) => {
      gsap.fromTo(
        img,
        { y: -20 },
        {
          y: 20,
          ease: "none",
          scrollTrigger: {
            trigger: img.closest(".project-card") as HTMLElement,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        }
      );
    });
  }, { scope: sectionRef });

  return (
    <section className="section" id="projects" style={{ paddingBottom: "40px" }} ref={sectionRef}>
      <div className="container">
        <span className="text-label projects-heading" style={{ display: "block", marginBottom: "16px", opacity: 0 }}>
          SELECTED WORK · 2022–2025
        </span>
        <h2 className="text-display projects-heading" style={{ marginBottom: "64px", opacity: 0 }}>
          Projects &amp; Case Studies
        </h2>

        <div className="grid-2">
          {data.projects.map((proj, idx) => (
            <a
              href={proj.link}
              style={{ textDecoration: "none", color: "inherit", display: "block", opacity: 0 }}
              key={idx}
              className="project-card"
              onMouseEnter={() => setCursorType("project")}
              onMouseLeave={() => setCursorType("default")}
            >
              <div className="project-thumb-wrapper">
                <img
                  src={proj.image}
                  alt={proj.title}
                  loading="lazy"
                  className="project-thumb"
                />
              </div>
              <div className="project-content">
                <h3 className="text-h3" style={{ marginBottom: "8px" }}>{proj.title}</h3>
                <p className="text-body" style={{ color: "var(--c-muted)", marginBottom: "20px" }}>
                  {proj.description}
                </p>
                <div className="project-tags">
                  {proj.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="tag-chip">{tag}</span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
