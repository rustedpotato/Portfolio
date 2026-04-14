"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { sound } from "@/utils/soundEngine";

type SoundContextType = {
  isMuted: boolean;
  toggleMute: () => void;
};

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export function SoundProvider({ children }: { children: React.ReactNode }) {
  // Always default to unmuted
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    sound.enabled = !isMuted;
  }, [isMuted]);

  useEffect(() => {
    // Attempt to unlock AudioContext on first interaction
    const unlock = () => {
      sound.resumeContext();
      window.removeEventListener("click", unlock);
      window.removeEventListener("keydown", unlock);
    };
    window.addEventListener("click", unlock);
    window.addEventListener("keydown", unlock);
    return () => {
      window.removeEventListener("click", unlock);
      window.removeEventListener("keydown", unlock);
    };
  }, []);

  const toggleMute = () => {
    setIsMuted((prev) => {
      const nextMuted = !prev;
      sound.enabled = !nextMuted;
      if (!nextMuted) {
        // if we are unmuting, we should play a click to confirm
        setTimeout(() => sound.playClick(), 50);
      }
      return nextMuted;
    });
  };

  return (
    <SoundContext.Provider value={{ isMuted, toggleMute }}>
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  const context = useContext(SoundContext);
  if (context === undefined) {
    throw new Error("useSound must be used within a SoundProvider");
  }
  return context;
}
