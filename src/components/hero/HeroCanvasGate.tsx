"use client";

import { useEffect, useState, type ComponentType } from "react";

function HeroCanvasFallback() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-ink-muted via-ink to-ink" />
  );
}

/**
 * Loads R3F/Three only in the browser via dynamic import (no static import),
 * so the server bundle never executes react-three-fiber during prerender.
 * Avoids next/dynamic's extra Flight chunk that can trigger ChunkLoadError in dev.
 */
export function HeroCanvasGate() {
  const [Scene, setScene] = useState<ComponentType | null>(null);

  useEffect(() => {
    let cancelled = false;
    void import("./HeroScene").then((mod) => {
      if (!cancelled) {
        setScene(() => mod.HeroScene);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!Scene) {
    return <HeroCanvasFallback />;
  }

  return <Scene />;
}
