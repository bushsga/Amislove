"use client";
import { useEffect, useRef, useState } from "react";
import { loveLetterParagraphs } from "@/data/love";

function TypewriterText({ text, delay = 0, onDone }: { text: string; delay?: number; onDone?: () => void }) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const clean = text.replace(/\*(.*?)\*/g, "$1");
    const interval = setInterval(() => {
      i++;
      setDisplayed(clean.slice(0, i));
      if (i >= clean.length) {
        clearInterval(interval);
        onDone?.();
      }
    }, 18);
    return () => clearInterval(interval);
  }, [started, text, onDone]);

  return <span className="inline">{displayed}</span>;
}

export default function LoveLetter() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [currentPara, setCurrentPara] = useState(0);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          ref.current?.classList.add("visible");
          setVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const handleParaDone = (i: number) => {
    setTimeout(() => setCurrentPara(i + 1), 300);
  };

  return (
    <section ref={ref} className="section-enter relative z-10 py-24 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-4xl">💌</span>
          <h2 className="font-display text-4xl md:text-5xl text-rose-500 mt-3">A letter for you</h2>
          <p className="font-body text-rose-300 mt-2">From Jamiu, with everything i have</p>
        </div>

        <div className="glass rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden">
          <span className="absolute top-4 left-4 text-2xl opacity-30">🌸</span>
          <span className="absolute top-4 right-4 text-2xl opacity-30">🌸</span>
          <span className="absolute bottom-4 left-4 text-2xl opacity-30">💛</span>
          <span className="absolute bottom-4 right-4 text-2xl opacity-30">💛</span>

          <div className="space-y-5">
            {loveLetterParagraphs.map((para, i) => {
              const isEmphasis = para.startsWith("You are not alone");
              const isSpecial = i === 0 || i >= loveLetterParagraphs.length - 2;
              return (
                <p
                  key={i}
                  className={`font-body leading-relaxed min-h-[1.5em] ${
                    isEmphasis
                      ? "text-xl md:text-2xl font-bold text-rose-500 text-center py-2"
                      : isSpecial
                      ? "text-rose-500 font-semibold text-center italic"
                      : "text-gray-600 text-base md:text-lg"
                  }`}
                >
                  {visible && i <= currentPara ? (
                    i < currentPara ? (
                      <span dangerouslySetInnerHTML={{ __html: para.replace(/\*(.*?)\*/g, "<em class='text-rose-400 not-italic font-bold'>$1</em>") }} />
                    ) : (
                      <>
                        <TypewriterText text={para} delay={0} onDone={() => handleParaDone(i)} />
                        <span className="inline-block w-0.5 h-4 bg-rose-400 ml-0.5 animate-pulse" />
                      </>
                    )
                  ) : null}
                </p>
              );
            })}
          </div>
        </div>

        <div className="mt-8 rounded-3xl p-6 text-center" style={{ background: "linear-gradient(135deg, #fef3c7, #fde68a)" }}>
          <p className="font-display text-2xl md:text-3xl text-amber-700 mb-2">🤲 Remember this always</p>
          <p className="font-body text-amber-800 text-lg leading-relaxed">
            You are not alone in this world, Aminat. <strong>Allah loves you</strong> — He sees every tear, every sacrifice, every prayer.
            Things <em>will</em> be okay. Do not give up. We have a beautiful future ahead of us. 💛
          </p>
        </div>
      </div>
    </section>
  );
}
