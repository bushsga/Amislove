"use client";
import { useEffect, useRef, useState } from "react";
import { memoryPhotos } from "@/data/photos";

export default function PhotoGallery() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) ref.current?.classList.add("visible"); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const prev = () => setActive((a) => (a !== null ? (a - 1 + memoryPhotos.length) % memoryPhotos.length : null));
  const next = () => setActive((a) => (a !== null ? (a + 1) % memoryPhotos.length : null));

  return (
    <section ref={ref} className="section-enter relative z-10 py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-4">
          <span className="text-4xl">🎓</span>
          <h2 className="font-display text-4xl md:text-5xl text-rose-500 mt-3">Our Memories</h2>
        </div>
        <div className="text-center mb-12">
          <div className="inline-block glass rounded-2xl px-6 py-3">
            <p className="font-body text-rose-400 font-semibold text-sm">📍 University of Ilorin — Graduation Outing</p>
            <p className="font-body text-gray-500 text-xs mt-1">The day we celebrated her — my brilliant, beautiful graduate 🎀</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {memoryPhotos.map((p, i) => (
            <div
              key={i}
              onClick={() => setActive(i)}
              className="relative rounded-3xl overflow-hidden aspect-square shadow-md cursor-pointer transition-all hover:scale-105 hover:shadow-xl group"
            >
              <img src={p.src} alt={p.alt} className="w-full h-full object-cover object-top" />
              <div className="absolute inset-0 bg-rose-500/0 group-hover:bg-rose-500/20 transition-all flex items-center justify-center">
                <span className="text-white text-3xl opacity-0 group-hover:opacity-100 transition-all">🔍</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center glass rounded-3xl px-8 py-6 max-w-xl mx-auto">
          <p className="text-2xl mb-3">🎓💛</p>
          <p className="font-body text-gray-600 leading-relaxed italic">
            "Watching you graduate was one of the proudest moments of my life. BSc. Ed Physics — Unilorin. You did it, baby. And I was right there with you."
          </p>
          <p className="font-body text-rose-400 font-semibold mt-3 text-sm">— Jamiu</p>
        </div>
      </div>

      {active !== null && (
        <div className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center p-4" onClick={() => setActive(null)}>
          <button onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-4 md:left-10 text-white text-4xl bg-black/40 w-12 h-12 rounded-full flex items-center justify-center hover:bg-black/60 transition-all">‹</button>
          <img src={memoryPhotos[active].src} alt={memoryPhotos[active].alt} className="max-w-full max-h-[85vh] rounded-2xl shadow-2xl object-contain" onClick={(e) => e.stopPropagation()} />
          <button onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-4 md:right-10 text-white text-4xl bg-black/40 w-12 h-12 rounded-full flex items-center justify-center hover:bg-black/60 transition-all">›</button>
          <button className="absolute top-6 right-6 text-white text-2xl bg-black/40 w-10 h-10 rounded-full flex items-center justify-center" onClick={() => setActive(null)}>✕</button>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 font-body text-sm">{active + 1} / {memoryPhotos.length}</div>
        </div>
      )}
    </section>
  );
}
