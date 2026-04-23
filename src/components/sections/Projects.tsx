"use client";

import { motion } from "framer-motion";
import "./Projects.css";
import data from "@/data/portfolio.json";
import { useCursor } from "@/components/CursorContext";

export default function Projects() {
  const { setCursorType } = useCursor();
  return (
    <section className="section" id="projects" style={{ paddingBottom: "40px" }}>
      <div className="container">
        <span className="text-label" style={{ display: "block", marginBottom: "16px" }}>
          SELECTED WORK · 2022–2025
        </span>
        <h2 className="text-display" style={{ marginBottom: "64px" }}>
          Projects & Case Studies
        </h2>

        <div className="grid-2">
          {data.projects.map((proj, idx) => (
            <motion.a
              href={proj.link}
              style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
              key={idx}
              className="project-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              whileHover="hover"
              onMouseEnter={() => setCursorType("project")}
              onMouseLeave={() => setCursorType("default")}
            >
              <div className="project-thumb-wrapper">
                <img src={proj.image} alt={proj.title} loading="lazy" className="project-thumb" />
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
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
}
