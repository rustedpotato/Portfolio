"use client";

import React from "react";
import "./Marquee.css";

interface MarqueeProps {
  items: { icon: React.ReactNode; name: string }[];
  speed?: number; // duration in seconds
}

export default function Marquee({ items, speed = 30 }: MarqueeProps) {
  // We duplicate the items array to create the infinite scroll effect seamlessly
  const duplicatedItems = [...items, ...items, ...items];

  return (
    <div className="marquee-container">
      <div
        className="marquee-inner"
        style={{ animationDuration: `${speed}s` }}
      >
        {duplicatedItems.map((item, index) => (
          <div key={index} className="marquee-item">
            <span className="marquee-icon">{item.icon}</span>
            <span className="text-label">{item.name}</span>
            {/* Add separator if not the last item in the DOM, 
                though in infinite scroll we just add it to all */}
            <div className="marquee-separator" />
          </div>
        ))}
      </div>
    </div>
  );
}
