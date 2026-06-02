"use client";
import { useEffect } from "react";

export default function HeartCursor() {
  useEffect(() => {
    const EMOJIS = ["❤️", "💛", "💖", "🌸", "✨", "💕"];
    let lastTime = 0;

    const handleMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastTime < 120) return;
      lastTime = now;

      const el = document.createElement("div");
      el.className = "heart-trail";
      el.textContent = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
      el.style.left = `${e.clientX - 10}px`;
      el.style.top = `${e.clientY - 10}px`;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 1500);
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return null;
}
