"use client";

import { Zap, Cpu, MousePointer2 } from "lucide-react";
import "./AIWorkflow.css";
import data from "@/data/portfolio.json";

export default function AIWorkflow() {

  const getIcon = (type: string) => {
    switch (type) {
      case "zap": return <Zap size={20} color="var(--c-accent)" />;
      case "message": return <MessageCircle size={20} color="var(--c-accent)" />;
      case "cpu": return <Cpu size={20} color="var(--c-accent)" />;
      case "pointer": return <MousePointer2 size={20} color="var(--c-accent)" />;
      default: return <Zap size={20} color="var(--c-accent)" />;
    }
  };

  return (
    <section className="section" id="ai">
      <div className="container">
        <div className="ai-content">
          <span className="text-label" style={{ display: "block", marginBottom: "16px" }}>
            AI-AUGMENTED DESIGN
          </span>
          <h2 className="text-display" style={{ marginBottom: "40px" }}>
            How I Use AI<br />to Design Faster
          </h2>

          <div className="ai-tools-list">
            {data.aiTools.map((tool, idx) => (
              <div key={idx} className="ai-tool-card">
                <div className="ai-tool-icon">
                  {getIcon(tool.iconType)}
                </div>
                <div>
                  <h3 className="text-h3" style={{ fontSize: "18px", marginBottom: "4px" }}>{tool.name}</h3>
                  <p className="text-body" style={{ color: "var(--c-muted)", fontSize: "15px" }}>{tool.usecase}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
