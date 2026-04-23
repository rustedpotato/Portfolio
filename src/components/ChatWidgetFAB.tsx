"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";
import "./ChatWidgetFAB.css";

// This is a placeholder hook implementation.
// Let's create `useChat` hook later in `src/hooks/useChat.ts`
import { useChat } from "@/hooks/useChat";
import { useCursor } from "@/components/CursorContext";

export default function ChatWidgetFAB() {
  const [isOpen, setIsOpen] = useState(false);
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();
  const { setCursorType } = useCursor();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isLoading]);

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            key="fab"
            className="chat-fab"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setIsOpen(true)}
            aria-label="Open AI Chat"
            onMouseEnter={() => setCursorType("button")}
            onMouseLeave={() => setCursorType("default")}
          >
            <MessageCircle size={24} color="#0C0C0C" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="panel"
            className="chat-panel"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className="chat-header">
              <span className="chat-title">Ask me anything</span>
              <button className="chat-close" onClick={() => setIsOpen(false)}>
                <X size={20} />
              </button>
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
              <div ref={messagesEndRef} />
            </div>

            <form className="chat-input-area" onSubmit={handleSubmit}>
              <input
                type="text"
                className="chat-input"
                placeholder="Message AI..."
                value={input}
                onChange={handleInputChange}
                disabled={isLoading}
              />
              <button type="submit" className="chat-send" disabled={isLoading || !input.trim()}>
                <Send size={16} color="#0C0C0C" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
