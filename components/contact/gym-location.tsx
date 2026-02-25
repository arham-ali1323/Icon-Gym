"use client";

import { useState } from "react";

export default function MapWithTable() {
  const [hoveredDay, setHoveredDay] = useState<number | null>(null);

  const schedule = [
    { day: "Monday", hours: "9am – 7am", open: true },
    { day: "Tuesday", hours: "9am – 7am", open: true },
    { day: "Wednesday", hours: "9am – 7am", open: true },
    { day: "Thursday", hours: "9am – 7am", open: true },
    { day: "Friday", hours: "9am – 7am", open: true },
    { day: "Saturday", hours: "9am – 7am", open: true },
    { day: "Sunday", hours: "Closed", open: false },
  ];

  return (
    <section className="relative w-full">
      {/* MAP */}
      <div className="relative w-full h-[400px] md:h-[550px] lg:h-[650px]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4249.2765209855115!2d73.1087356!3d30.6736044!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3922b7ea7736d83d%3A0x8b7262e7acc8e9b3!2sGerman%20Fitness%20%26%20Sports%20%7C%20Best%20Gym%20In%20Sahiwal!5e1!3m2!1sen!2s!4v1767979333708!5m2!1sen!2s"
          className="absolute inset-0 w-full h-full border-0 contrast-125"
          loading="lazy"
        />
      </div>

      {/* OVERLAY SCHEDULE */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 w-[320px] bg-black border border-gray-800 shadow-2xl z-20 hidden md:block">
        {schedule.map((item, i) => {
          const isHovered = hoveredDay === i;
          return (
            <div
              key={i}
              onMouseEnter={() => setHoveredDay(i)}
              onMouseLeave={() => setHoveredDay(null)}
              className="flex justify-between px-6 py-4 border-b border-gray-800 transition hover:bg-orange-500/10"
            >
              <span className={`font-semibold tracking-wide transition-colors ${
                isHovered ? "text-orange-500" : "text-white"
              }`}>
                {item.day}
              </span>

              <span className={`font-semibold transition-colors ${
                item.open
                  ? isHovered
                    ? "text-orange-500"
                    : "text-white"
                  : "text-red-500"
              }`}>
                {item.hours}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}