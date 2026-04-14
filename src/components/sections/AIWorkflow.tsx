"use client";

import { MessageCircle, Zap, Cpu, MousePointer2, Send } from "lucide-react";
import "./AIWorkflow.css";
import { useChat } from "@/hooks/useChat";
import data from "@/data/portfolio.json";

export default function AIWorkflow() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();

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
      <div className="container grid-2">
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

        <div className="ai-demo">
          <div className="inline-chat-card">
            <div className="chat-header">
              <span className="chat-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div className="dot-green" style={{ width: '6px', height: '6px' }}></div>
                Ask my AI Assistant
              </span>
            </div>

            <div className="chat-messages">
              {messages.map((msg, idx) => (
                <div key={idx} className={`chat-bubble ${msg.role}`}>
                  {msg.content}
                </div>
              ))}
              {isLoading && (
                <div className="chat-bubble ai typing">
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </div>
              )}
            </div>

            <form className="chat-input-area" onSubmit={handleSubmit}>
              <input
                type="text"
                className="chat-input"
                placeholder="Ask about my process..."
                value={input}
                onChange={handleInputChange}
                disabled={isLoading}
              />
              <button type="submit" className="chat-send" disabled={isLoading || !input.trim()}>
                <Send size={16} color="#0C0C0C" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
