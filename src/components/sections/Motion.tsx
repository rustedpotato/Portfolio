"use client";

import { motion } from "framer-motion";
import { PlayCircle } from "lucide-react";
import "./Motion.css";
import data from "@/data/portfolio.json";

export default function Motion() {
  return (
    <section className="section" id="motion">
      <div className="container">
        <span className="text-label" style={{ display: "block", marginBottom: "16px" }}>
          MOTION & ANIMATION
        </span>
        <h2 className="text-display" style={{ marginBottom: "64px" }}>
          Design That Moves
        </h2>

        <div className="motion-grid">
          {data.motion.map((vid, idx) => (
            <motion.div
              key={idx}
              className="motion-card"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
            >
              <div className="motion-thumb-wrapper">
                <img src={vid.image} alt={vid.title} className="motion-thumb" />
                <div className="play-overlay">
                  <PlayCircle size={48} color="var(--c-bg)" fill="var(--c-accent)" strokeWidth={1} />
                </div>
              </div>
              <div className="motion-info">
                <h3 className="text-h3" style={{ fontSize: "16px" }}>{vid.title}</h3>
                <span className="text-mono">{vid.tool}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
