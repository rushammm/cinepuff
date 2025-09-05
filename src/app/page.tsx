
'use client';


import React, { useRef, useEffect } from "react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const genres = ["Action", "Comedy", "Drama", "Romance", "Sci-Fi", "Horror", "Animation"];
const timelines = ["1980s", "1990s", "2000s", "2010s", "2020s"];
const types = ["Bollywood", "Hollywood", "Lollywood"];

export default function Home() {
  const hoverAudioRef = useRef<HTMLAudioElement>(null);
  const clickAudioRef = useRef<HTMLAudioElement>(null);

  const playHoverSound = () => {
    const audio = hoverAudioRef.current;
    if (audio) {
      audio.currentTime = 0;
      audio.play();
    }
  };

  // Play click sound on every click in the document
  useEffect(() => {
    const playClickSound = () => {
      const audio = clickAudioRef.current;
      if (audio) {
        audio.currentTime = 0;
        audio.play();
      }
    };
    document.addEventListener('click', playClickSound);
    return () => {
      document.removeEventListener('click', playClickSound);
    };
  }, []);
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#FDE2F3] via-[#E5D4F5] via-40% to-[#FFF6CC] px-4 py-12 font-pixel relative overflow-x-hidden">
      <audio ref={hoverAudioRef} src="/ui-sounds-pack-4-2-359741.mp3" preload="auto" />
      <audio ref={clickAudioRef} src="/computer-mouse-click-352734.mp3" preload="auto" />
      <div className="flex flex-col items-center w-full max-w-xl p-8 rounded-3xl shadow-xl border-4 border-[#FFCCE5] bg-white/60 backdrop-blur-md z-10">
        {/* App Title */}

        <h1
          className="text-4xl sm:text-5xl font-bold uppercase mb-8 bg-gradient-to-r from-[#F7A9C4] via-[#E5D4F5] to-[#D8B4E2] text-transparent bg-clip-text drop-shadow-pixel"
          style={{ letterSpacing: 2 }}
        >
          cinepuff
        </h1>


        {/* Input Fields */}
        <form className="w-full flex flex-col gap-6">
          {/* Genre Dropdown */}
          <label className="flex flex-col gap-2 font-bold text-[#5A3E85] uppercase tracking-widest">
            <Select>
              <SelectTrigger className="pixel-select-trigger" onMouseEnter={playHoverSound}>
                <SelectValue placeholder="Select Genre" />
              </SelectTrigger>
              <SelectContent className="pixel-select-content">
                {genres.map((g) => (
                  <SelectItem key={g} value={g} className="pixel-select-item">{g}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </label>

          {/* Timeline Selector */}
          <label className="flex flex-col gap-2 font-bold text-[#5A3E85] uppercase tracking-widest">
            Timeline
            <Select>
              <SelectTrigger className="pixel-select-trigger" onMouseEnter={playHoverSound}>
                <SelectValue placeholder="Select Timeline" />
              </SelectTrigger>
              <SelectContent className="pixel-select-content">
                {timelines.map((t) => (
                  <SelectItem key={t} value={t} className="pixel-select-item">{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </label>

          {/* Type Dropdown */}
          <label className="flex flex-col gap-2 font-bold text-[#5A3E85] uppercase tracking-widest">
            Type
            <Select>
              <SelectTrigger className="pixel-select-trigger" onMouseEnter={playHoverSound}>
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent className="pixel-select-content">
                {types.map((t) => (
                  <SelectItem key={t} value={t} className="pixel-select-item">{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </label>

          {/* Submit Button */}
          <Button
            type="submit"
            className="pixel-btn mt-4 px-8 py-3"
            onMouseEnter={playHoverSound}
          >
            Get Recommendations
          </Button>
        </form>
      </div>
      {/* Cute pixel clouds background - bigger and spread throughout the screen */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none opacity-60 z-0 flex flex-wrap items-end justify-between">
        <span className="text-[8rem] md:text-[12rem] lg:text-[16rem] absolute left-0 top-0 cloud-float">☁️</span>
        <span className="text-[7rem] md:text-[10rem] absolute right-0 top-10 cloud-drift-left">☁️</span>
        <span className="text-[10rem] md:text-[14rem] absolute left-1/4 top-1/2 cloud-float">☁️</span>
        <span className="text-[6rem] md:text-[9rem] absolute right-1/4 bottom-10 cloud-drift-right">☁️</span>
        <span className="text-[12rem] md:text-[18rem] absolute left-1/2 bottom-0 cloud-float">☁️</span>
      </div>
    </main>
  );
}
