"use client";
import { useEffect, useState } from "react";

export default function ScrollToTopWaterFill() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      const scrolled = (scrollTop / docHeight) * 100;
      setProgress(scrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full border border-orange-600 overflow-hidden bg-black hover:scale-110 transition-all duration-300"
      aria-label="Scroll to top"
    >
      {/* Water Fill */}
      <div
        className="absolute bottom-0 left-0 w-full bg-orange-600 transition-all duration-300"
        style={{ height: `${progress}%` }}
      >
        {/* Water Wave */}
        <div className="absolute -top-2 left-0 w-full h-4 bg-orange-500 rounded-full animate-pulse" />
      </div>

      {/* Arrow */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </div>
    </button>
  );
}
