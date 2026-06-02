"use client";
import { useEffect, useState } from "react";
import { coupleData } from "@/data/love";

function useDaysTogether() {
  const [days, setDays] = useState(0);
  useEffect(() => {
    const diff = Math.floor((Date.now() - coupleData.officialDate.getTime()) / 86400000);
    setDays(diff);
  }, []);
  return days;
}

export default function Hero() {
  const days = useDaysTogether();
  const [hearts, setHearts] = useState<number[]>([]);

  const spawnHearts = () => {
    const id = Date.now();
    setHearts((h) => [...h, id]);
    setTimeout(() => setHearts((h) => h.filter((x) => x !== id)), 1000);
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 py-20 z-10">
      {/* Top badge */}
      <div className="glass rounded-full px-5 py-2 mb-8 text-rose-500 font-body font-700 text-sm tracking-wide animate-fade-up">
        🌸 A little something just for you, Amislove 🌸
      </div>

      {/* Main names */}
      <h1 className="font-display text-6xl md:text-8xl text-rose-500 leading-tight mb-2 animate-fade-up" style={{ animationDelay: "0.1s" }}>
        Jamiu
      </h1>
      <div className="text-5xl md:text-7xl animate-heart-beat mb-2" style={{ animationDelay: "0.2s" }}>
        ❤️
      </div>
      <h1 className="font-display text-6xl md:text-8xl text-peach-400 leading-tight animate-fade-up" style={{ animationDelay: "0.3s", color: "#ff9f4a" }}>
        Aminat
      </h1>

      {/* Days counter */}
      <div className="mt-10 glass rounded-3xl px-8 py-5 animate-fade-up" style={{ animationDelay: "0.5s" }}>
        <p className="font-body text-rose-400 text-sm uppercase tracking-widest mb-1">Together for</p>
        <p className="font-display text-5xl text-rose-500">{days.toLocaleString()}</p>
        <p className="font-body text-rose-400 text-sm mt-1">beautiful days & counting 🎀</p>
      </div>

      {/* Since date */}
      <p className="mt-4 font-body text-rose-300 text-sm animate-fade-up" style={{ animationDelay: "0.6s" }}>
        Since Christmas Day, 25th December 2021 ✨
      </p>

      {/* Interactive heart button */}
      <button
        onClick={spawnHearts}
        className="mt-10 bg-rose-400 hover:bg-rose-500 text-white font-body font-bold text-lg px-8 py-4 rounded-full shadow-lg transition-all hover:scale-105 active:scale-95 animate-fade-up"
        style={{ animationDelay: "0.7s" }}
      >
        Click to send love 💌
      </button>

      {/* Spawned hearts */}
      {hearts.map((id) => (
        <span key={id} className="text-4xl absolute animate-float pointer-events-none" style={{ top: "50%", left: "50%" }}>
          ❤️
        </span>
      ))}

      {/* Scroll hint */}
      <div className="absolute bottom-8 animate-bounce text-rose-300 font-body text-sm flex flex-col items-center gap-1">
        <span>scroll down</span>
        <span>↓</span>
      </div>
    </section>
  );
}
