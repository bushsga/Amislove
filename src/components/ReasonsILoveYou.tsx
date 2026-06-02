"use client";
import { useEffect, useRef, useState } from "react";
import { reasons } from "@/data/love";

const CARD_COLORS = [
  "from-rose-100 to-rose-200",
  "from-peach-100 to-orange-100",
  "from-mint-100 to-green-100",
  "from-lavender-100 to-purple-100",
  "from-yellow-100 to-amber-100",
  "from-sky-100 to-blue-100",
  "from-pink-100 to-fuchsia-100",
  "from-teal-100 to-cyan-100",
];

export default function ReasonsILoveYou() {
  const ref = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState<Set<number>>(new Set());
  const [all, setAll] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) ref.current?.classList.add("visible"); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const toggle = (i: number) => {
    setRevealed((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  const revealAll = () => {
    setAll(true);
    setRevealed(new Set(reasons.map((_, i) => i)));
  };

  return (
    <section ref={ref} className="section-enter relative z-10 py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-4xl">🌸</span>
          <h2 className="font-display text-4xl md:text-5xl text-rose-500 mt-3">
            {reasons.length} reasons I love you
          </h2>
          <p className="font-body text-rose-300 mt-2">Tap each card to reveal ✨</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {reasons.map((r, i) => {
            const open = revealed.has(i);
            return (
              <button
                key={i}
                onClick={() => toggle(i)}
                className={`group relative rounded-3xl p-6 text-left transition-all duration-500 hover:scale-105 active:scale-95 shadow-md bg-gradient-to-br ${CARD_COLORS[i % CARD_COLORS.length]} overflow-hidden`}
                style={{ minHeight: 180 }}
              >
                {/* Front */}
                <div className={`transition-all duration-500 ${open ? "opacity-0 scale-75 absolute inset-0" : "opacity-100"} flex flex-col items-center justify-center h-full text-center`}>
                  <span className="text-5xl mb-3 animate-float">{r.emoji}</span>
                  <p className="font-body font-bold text-gray-600 text-sm">Tap to see 💛</p>
                </div>

                {/* Back */}
                <div className={`transition-all duration-500 ${open ? "opacity-100" : "opacity-0 scale-75 absolute inset-0"} p-4 flex flex-col justify-center`}>
                  <p className="font-body font-bold text-gray-700 text-base mb-2">{r.title}</p>
                  <p className="font-body text-gray-600 text-sm leading-relaxed">{r.desc}</p>
                </div>

                {/* Sparkle decoration */}
                <span className="absolute top-2 right-2 text-lg opacity-40 animate-sparkle">✨</span>
              </button>
            );
          })}
        </div>

        {!all && (
          <div className="text-center mt-10">
            <button
              onClick={revealAll}
              className="bg-rose-400 hover:bg-rose-500 text-white font-body font-bold px-8 py-3 rounded-full shadow-lg transition-all hover:scale-105"
            >
              Reveal all 💖
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
