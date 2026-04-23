"use client";

import Marquee from "../Marquee";
import { Compass, Monitor, Layout, PenTool, Database, Hexagon, Code, Move } from "lucide-react";
import "./Skills.css";
import data from "@/data/portfolio.json";
import { sound } from "@/utils/soundEngine";

export default function Skills() {
  return (
    <section className="section" id="skills" style={{ overflow: "hidden", paddingTop: "40px" }}>
      <div className="container" style={{ marginBottom: "40px", maxWidth: "1000px" }}>
        <span className="text-label" style={{ display: "block", marginBottom: "16px" }}>
          CAPABILITIES
        </span>
        <h2 className="text-display" style={{ marginBottom: "40px" }}>
          What I Bring to the Table
        </h2>

        <div className="skills-grid">
          {data.capabilities.map((cat, idx) => (
            <div key={idx} className="skill-category">
              <h3 className="text-h3" style={{ marginBottom: "24px" }}>{cat.title}</h3>
              <div className="skill-pills">
                {cat.skills.map((skill, sIdx) => (
                  <span 
                    key={sIdx} 
                    className="skill-pill"
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
            { name: "HTML / CSS", icon: <img src="https://api.iconify.design/logos:html-5.svg" width="24" height="24" alt="HTML / CSS" /> }
          ]}
        />
      </div>
    </section>
  );
}
