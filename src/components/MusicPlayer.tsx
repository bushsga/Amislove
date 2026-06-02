"use client";
import { useEffect, useRef, useState } from "react";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.3;
    audio.loop = true;
    audio.addEventListener("canplaythrough", () => setLoaded(true));
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play();
      setPlaying(true);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/music.mp3"
        preload="auto"
      />
      <button
        onClick={toggle}
        title={playing ? "Pause music" : "Play music"}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-xl flex items-center justify-center text-2xl transition-all hover:scale-110 active:scale-95 ${
          playing
            ? "bg-rose-500 text-white animate-pulse"
            : "bg-white text-rose-500 border-2 border-rose-300"
        }`}
      >
        {!loaded ? "⏳" : playing ? "🎵" : "🎶"}
      </button>
    </>
  );
}