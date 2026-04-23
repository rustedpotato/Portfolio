"use client";

import { motion } from "framer-motion";
import { Camera, Map, Activity, Headphones } from "lucide-react";
import "./About.css";
import data from "@/data/portfolio.json";

export default function About() {
  return (
    <section className="section" id="about">
      <div className="container grid-2" style={{ alignItems: "center" }}>
        <div className="about-photo-frame">
          <div className="grain-overlay"></div>
          <img 
            src="/profile.jpg" 
            alt="Portrait" 
            loading="lazy"
            className="about-photo" 
          />
        </div>

        <div className="about-content">
          <span className="text-label" style={{ display: "block", marginBottom: "32px" }}>
            ABOUT
          </span>
          
          <div className="text-h3" style={{ color: "var(--c-text)", fontWeight: 500, marginBottom: "48px", display: "flex", flexDirection: "column", gap: "16px" }}>
            <p>
              I'm Chaitanya Gali from Don bosco Institute of technology C a computer science major in 2nd year (2024-2028) aspires to be a UI/Ux designer and developer.
            </p>
          </div>

          <h3 className="text-h3" style={{ marginBottom: "24px" }}>Education</h3>
          <div className="about-timeline">
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
                <motion.div animate={{ scale: [1, 1.25, 1] }} transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }} style={{ display: 'flex' }}>
                  <Camera size={20} />
                </motion.div>
                Photography
              </span>
              <span className="hobby-tag">
                <motion.div animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }} style={{ display: 'flex' }}>
                  <Map size={20} />
                </motion.div>
                Trekking
              </span>
              <span className="hobby-tag">
                <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }} style={{ display: 'flex' }}>
                  <Activity size={20} />
                </motion.div>
                Running
              </span>
              <span className="hobby-tag">
                <motion.div animate={{ rotate: [-15, 15, -15] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }} style={{ display: 'flex' }}>
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
