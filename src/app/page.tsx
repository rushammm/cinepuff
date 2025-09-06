
'use client';


import React, { useRef, useEffect, useState } from "react";

interface Movie {
  title: string;
  overview: string;
  poster_url: string | null;
  release_date: string;
}

import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const genres = ["Action", "Comedy", "Drama", "Romance", "Sci-Fi", "Horror", "Animation"];
const timelines = ["1980s", "1990s", "2000s", "2010s", "2020s"];
const types = ["Bollywood", "Hollywood"];
export default function Home() {
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  // Removed searchTitle state
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedTimeline, setSelectedTimeline] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const hoverAudioRef = useRef<HTMLAudioElement>(null);
  const clickAudioRef = useRef<HTMLAudioElement>(null);
  const userInteractedRef = useRef(false);

  // Fetch recommendations automatically when filters change
  useEffect(() => {
    // Only fetch if at least one filter is selected
    if (!selectedGenre && !selectedTimeline && !selectedType) {
      setResults([]);
      return;
    }
    // Map timeline to start year of decade
    let decadeYear = "";
    if (selectedTimeline) {
      switch (selectedTimeline) {
        case "1980s": decadeYear = "1980"; break;
        case "1990s": decadeYear = "1990"; break;
        case "2000s": decadeYear = "2000"; break;
        case "2010s": decadeYear = "2010"; break;
        case "2020s": decadeYear = "2020"; break;
        default: decadeYear = "";
      }
    }
    const fetchRecommendations = async () => {
      setLoading(true);
      const params = new URLSearchParams();
      if (selectedGenre) params.append("genre", selectedGenre);
  if (decadeYear) params.append("year", decadeYear);
      if (selectedType) params.append("industry", selectedType);
      params.append("n", "10");
      try {
        const res = await fetch(`http://127.0.0.1:8000/search?${params.toString()}`);
        const data = await res.json();
        setResults(Array.isArray(data.results) ? data.results : []);
      } catch (e) {
        setResults([]);
      }
      setLoading(false);
    };
    fetchRecommendations();
  }, [selectedGenre, selectedTimeline, selectedType]);

  // Call /search endpoint
  const fetchSearch = async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (selectedGenre) params.append("genre", selectedGenre);
    if (selectedTimeline) params.append("year", selectedTimeline);
    if (selectedType) params.append("industry", selectedType);
    params.append("n", "10");
    try {
      const res = await fetch(`http://127.0.0.1:8000/search?${params.toString()}`);
      const data = await res.json();
  setResults(Array.isArray(data.results) ? data.results : []);
    } catch (e) {
      setResults([]);
    }
    setLoading(false);
  };

  const playHoverSound = () => {
    if (!userInteractedRef.current) return;
    const audio = hoverAudioRef.current;
    if (audio) {
      audio.currentTime = 0;
      audio.play();
    }
  };

  // Enable sound after first user interaction, and play click sound on click
  useEffect(() => {
    const enableSound = () => {
      userInteractedRef.current = true;
    };
    const playClickSound = () => {
      if (!userInteractedRef.current) return;
      const audio = clickAudioRef.current;
      if (audio) {
        audio.currentTime = 0;
        audio.play();
      }
    };
    window.addEventListener('pointerdown', enableSound, { once: true });
    document.addEventListener('click', playClickSound);
    return () => {
      window.removeEventListener('pointerdown', enableSound);
      document.removeEventListener('click', playClickSound);
    };
  }, []);
  return (
  <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#FDE2F3] via-[#E5D4F5] via-40% to-[#B4E2F5] px-4 py-12 font-pixel relative overflow-x-hidden">
      <audio ref={hoverAudioRef} src="/ui-sounds-pack-4-2-359741.mp3" preload="auto" />
      <audio ref={clickAudioRef} src="/computer-mouse-click-352734.mp3" preload="auto" />
  <div className="frosted-card flex flex-col items-center w-full max-w-2xl p-3 md:p-6 rounded-3xl shadow-xl border-4 border-[#FFCCE5] z-10 min-h-0">
        {/* App Title */}

        <h1
          className="pixel-h1 uppercase mb-4 bg-gradient-to-r from-[#F7A9C4] via-[#E5D4F5] to-[#D8B4E2] text-transparent bg-clip-text drop-shadow-pixel"
        >
          cinepuff
        </h1>


        {/* Recommendations by Filters (auto-fetch) */}
        <div className="w-full flex flex-row gap-4 justify-center items-end mb-2">
          <Select value={selectedGenre} onValueChange={v => setSelectedGenre(v)}>
            <SelectTrigger className="pixel-select-trigger pixel-label min-w-[120px]" onMouseEnter={playHoverSound}>
              <SelectValue placeholder="Genre" className="pixel-option" />
            </SelectTrigger>
            <SelectContent className="pixel-select-content">
              {genres.map((g) => (
                <SelectItem key={g} value={g} className="pixel-select-item pixel-option">{g}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedTimeline} onValueChange={v => setSelectedTimeline(v)}>
            <SelectTrigger className="pixel-select-trigger pixel-label min-w-[120px]" onMouseEnter={playHoverSound}>
              <SelectValue placeholder="Timeline" className="pixel-option" />
            </SelectTrigger>
            <SelectContent className="pixel-select-content">
              {timelines.map((t) => (
                <SelectItem key={t} value={t} className="pixel-select-item pixel-option">{t}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedType} onValueChange={v => setSelectedType(v)}>
            <SelectTrigger className="pixel-select-trigger pixel-label min-w-[120px]" onMouseEnter={playHoverSound}>
              <SelectValue placeholder="Type" className="pixel-option" />
            </SelectTrigger>
            <SelectContent className="pixel-select-content">
              {types.map((t) => (
                <SelectItem key={t} value={t} className="pixel-select-item pixel-option">{t}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* Results Section */}
        <div className="w-full mt-4 flex flex-col items-center">
          {loading && <div className="pixel-label text-[#A084CA] mb-2">Loading...</div>}
          {!loading && results.length === 0 && (
            <div className="pixel-label text-[#A084CA] mb-2">No results yet. Try searching!</div>
          )}
          {!loading && results.length > 0 && (
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {results.map((movie) => (
                <div
                  key={movie.title}
                  className="frosted-card flex flex-col items-center w-full rounded-3xl border-4 border-[#FFCCE5] shadow-xl p-4 min-h-[320px]"
                  style={{
                    background: 'linear-gradient(135deg, #fde2f3 0%, #e5d4f5 60%, #b4e2f5 100%)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                  }}
                >
                  {movie.poster_url ? (
                    <img src={movie.poster_url} alt={movie.title} width={120} height={180} className="rounded-lg mb-2 border border-[#FFCCE5] bg-[#FDE2F3] object-cover" />
                  ) : (
                    <div className="w-[120px] h-[180px] rounded-lg mb-2 border border-[#FFCCE5] bg-[#FDE2F3] flex items-center justify-center text-2xl text-[#E5D4F5]">?</div>
                  )}
                  <div
                    className="pixel-label text-center mb-1 mt-1"
                    style={{
                      fontWeight: 700,
                      fontSize: '7px',
                      color: '#5A3E85',
                      letterSpacing: '-0.5px',
                      fontFamily: 'var(--font-pixel)',
                      lineHeight: '1.1',
                      textShadow: '0 1px 0 #fff, 0 2px 2px #E5D4F5',
                    }}
                  >
                    {movie.title}
                  </div>
                  <div
                    className="pixel-option mb-1"
                    style={{
                      fontSize: '4px',
                      color: '#A084CA',
                      fontFamily: 'var(--font-pixel)',
                      lineHeight: '1.1',
                      textShadow: '0 1px 0 #fff',
                    }}
                  >
                    {movie.release_date}
                  </div>
                  <div
                    className="pixel-option text-center mb-2"
                    style={{
                      fontSize: '2px',
                      color: '#5A3E85',
                      fontFamily: 'var(--font-pixel)',
                      lineHeight: '1.2',
                      textShadow: '0 1px 0 #fff',
                    }}
                  >
                    {/* {movie.overview?.substring(0, 80)}{movie.overview && movie.overview.length > 80 ? '...' : ''} */}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* Cute pixel clouds background - bigger and spread throughout the screen */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none opacity-60 z-0 flex flex-wrap items-end justify-between">
        <span className="text-[8rem] md:text-[12rem] lg:text-[16rem] absolute left-0 top-0">☁️</span>
        <span className="text-[7rem] md:text-[10rem] absolute right-0 top-10">☁️</span>
        <span className="text-[10rem] md:text-[14rem] absolute left-1/4 top-1/2">☁️</span>
        <span className="text-[6rem] md:text-[9rem] absolute right-1/4 bottom-10">☁️</span>
        <span className="text-[12rem] md:text-[18rem] absolute left-1/2 bottom-0">☁️</span>
      </div>
    </main>
  );

