"use client";

import { motion } from "framer-motion";
import "./Experience.css";
import data from "@/data/portfolio.json";

export default function Experience() {
  return (
    <section className="section" id="experience">
      <div className="container" style={{ maxWidth: "800px", margin: "0 auto" }}>
        <span className="text-label" style={{ display: "block", marginBottom: "16px" }}>
          EXPERIENCE
        </span>
        <h2 className="text-display" style={{ marginBottom: "64px" }}>
          Where I&apos;ve Shipped<br />Real Products
        </h2>

        <div className="timeline">
          {data.experiences.map((exp, idx) => (
            <motion.div
              key={idx}
              className="timeline-item"
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
            >
              <div className="timeline-node"></div>
              <div className="timeline-content">
                <h3 className="text-h3" style={{ marginBottom: "8px" }}>{exp.role}</h3>
                <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "16px" }}>
                  <span className="text-label" style={{ color: "var(--c-accent)" }}>{exp.company}</span>
                  <span className="text-mono">{exp.period}</span>
                </div>
                <ul className="timeline-bullets">
                  {exp.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="text-body" style={{ color: "var(--c-muted)", marginBottom: "8px" }}>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
