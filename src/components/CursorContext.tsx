"use client";
import { createContext, useContext, useState, ReactNode } from "react";

export type CursorType = "default" | "project" | "button";

interface CursorContextProps {
  cursorType: CursorType;
  setCursorType: (type: CursorType) => void;
}

const CursorContext = createContext<CursorContextProps | undefined>(undefined);

export function CursorProvider({ children }: { children: ReactNode }) {
  const [cursorType, setCursorType] = useState<CursorType>("default");

  return (
    <CursorContext.Provider value={{ cursorType, setCursorType }}>
      {children}
    </CursorContext.Provider>
  );
}

export function useCursor() {
  const context = useContext(CursorContext);
  if (!context) throw new Error("useCursor must be used within CursorProvider");
  return context;
}
