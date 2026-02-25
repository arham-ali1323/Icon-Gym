"use client";
import { useEffect, useRef } from "react";

export default function LatestNewsSlider() {
  const newsArticles = [
    {
      id: 1,
      title: "MY JOURNEY OF CHAMPIONSHIP IN WEIGHT LIFTING",
      author: "RACHEL MOOR",
      image:
        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop",
      comments: 0,
      date: "AUGUST 27, 2025",
    },
    {
      id: 2,
      title: "HOW A GOOD PERSONAL TRAINER CAN CHANGE THE WAY OF YOUR LIFE",
      author: "RACHEL MOOR",
      image:
        "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=600&fit=crop",
      comments: 0,
      date: "AUGUST 27, 2025",
    },
    {
      id: 3,
      title: "NUTRITION TIPS FOR MAXIMUM MUSCLE GROWTH",
      author: "JOHN SMITH",
      image:
        "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=600&fit=crop",
      comments: 0,
      date: "AUGUST 25, 2025",
    },
    {
      id: 4,
      title: "TOP 10 EXERCISES FOR BUILDING CORE STRENGTH",
      author: "SARAH JOHNSON",
      image:
        "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&h=600&fit=crop",
      comments: 0,
      date: "AUGUST 23, 2025",
    },
  ];

  // Duplicate articles for infinite loop effect
  const duplicatedArticles = [...newsArticles, ...newsArticles, ...newsArticles];

  const sliderRef = useRef<HTMLDivElement>(null);
  const CARD_WIDTH = 380; // card + gap

  const next = () => {
    if (sliderRef.current) {
      const currentScroll = sliderRef.current.scrollLeft;
      const maxScroll = CARD_WIDTH * newsArticles.length;

      // If we're at the end of the first set, jump to the beginning of the middle set
      if (currentScroll >= maxScroll - CARD_WIDTH) {
        sliderRef.current.scrollTo({
          left: maxScroll,
          behavior: "auto", // instant jump
        });
      } else {
        sliderRef.current.scrollBy({
          left: CARD_WIDTH,
          behavior: "smooth",
        });
      }
    }
  };

  const prev = () => {
    sliderRef.current?.scrollBy({
      left: -CARD_WIDTH,
      behavior: "smooth",
    });
  };

  /* AUTO SLIDE */
  useEffect(() => {
    const interval = setInterval(next, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="font-orbitron relative bg-black py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-orange-900 opacity-20 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-900 opacity-10 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 relative">
          <div className="absolute -top-16 left-1/2 -translate-x-1/2 text-gray-800 text-8xl font-extrabold opacity-50 font-orbitron select-none hidden lg:block">BLOG
          </div>
          <h2 className="text-5xl md:text-7xl font-bold text-white tracking-widest relative z-10">
            LATEST NEWS
          </h2>
        </div>

        {/* SLIDER WRAPPER */}
        <div className="relative">
          {/* SLIDER */}
          <div
            ref={sliderRef}
            className="flex gap-8 overflow-hidden snap-x snap-mandatory"
          >
            {duplicatedArticles.map((article, index) => (
              <article
                key={`${article.id}-${index}`}
                className="snap-start flex-shrink-0 w-full md:w-[45%] lg:w-[30%] bg-gradient-to-br from-gray-900 to-black border border-gray-800 hover:border-orange-500 transition-all duration-300 group"
              >
                {/* Image */}
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Date */}
                  <div className="absolute top-4 right-4 bg-orange-500 text-white px-2 py-2 text-xs font-bold tracking-widest rounded-md">

                    <span className="block whitespace-nowrap ">
                      {article.date}
                    </span>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <h3 className="text-white text-xl font-bold group-hover:text-orange-500 transition">
                    {article.title}
                  </h3>

                  <div className="flex justify-between text-sm">
                    <span className="text-orange-500 font-semibold">
                      BY {article.author}
                    </span>
                    <span className="text-gray-400">
                      {article.comments} comments
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
