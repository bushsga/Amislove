"use client";
import { useEffect, useRef, useState } from "react";
import { queenPhotos } from "@/data/photos";

export default function MyQueen() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState<string | null>(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) ref.current?.classList.add("visible"); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  // Auto-scroll the featured photo
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % queenPhotos.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section ref={ref} className="section-enter relative z-10 py-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-4xl">👑</span>
          <h2 className="font-display text-4xl md:text-5xl text-rose-500 mt-3">My Queen</h2>
          <p className="font-body text-rose-300 mt-2">
            She walks in beauty — my Amislove 🌸
          </p>
        </div>

        {/* Featured large photo */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl mb-6 aspect-[4/3] max-h-[500px]">
          {queenPhotos.map((p, i) => (
            <img
              key={i}
              src={p.src}
              alt={p.alt}
              onClick={() => setActive(p.src)}
              className={`absolute inset-0 w-full h-full object-cover object-top cursor-pointer transition-opacity duration-700 ${
                i === current ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
          {/* Gradient overlay */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-rose-100/60 to-transparent pointer-events-none" />
          {/* Dot indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {queenPhotos.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === current ? "bg-rose-500 w-4" : "bg-white/70"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Thumbnail grid */}
        <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
          {queenPhotos.map((p, i) => (
            <button
              key={i}
              onClick={() => { setCurrent(i); setActive(p.src); }}
              className={`relative rounded-xl overflow-hidden aspect-square transition-all hover:scale-105 ${
                i === current ? "ring-2 ring-rose-400 ring-offset-2" : ""
              }`}
            >
              <img src={p.src} alt={p.alt} className="w-full h-full object-cover object-top" />
            </button>
          ))}
        </div>

        {/* Caption */}
        <div className="text-center mt-8 glass rounded-2xl px-6 py-4 max-w-lg mx-auto">
          <p className="font-body text-gray-600 italic text-base leading-relaxed">
            "Every picture of you tells a story of a woman who is strong, beautiful, and full of grace. 
            I am so proud of you, Aminat." 💛
          </p>
        </div>
      </div>

      {/* Lightbox */}
      {active && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-6"
          onClick={() => setActive(null)}
        >
          <img src={active} alt="Aminat" className="max-w-full max-h-full rounded-2xl shadow-2xl object-contain" />
          <button
            className="absolute top-6 right-6 text-white text-3xl font-bold bg-black/40 w-10 h-10 rounded-full flex items-center justify-center"
            onClick={() => setActive(null)}
          >
            ✕
          </button>
        </div>
      )}
    </section>
  );
}
