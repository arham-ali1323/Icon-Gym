"use client";
import { useState } from "react";

export default function FitnessEvents() {
  const [hoveredEvent, setHoveredEvent] = useState<number | null>(null);

  const events = [
    {
      id: 1,
      number: "01",
      date: "AUGUST 24, 2023",
      title: "BENCHPRESS HACKATHON",
      image:
        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop",
      hasButton: true,
    },
    {
      id: 2,
      number: "02",
      date: "SEPTEMBER 24, 2023",
      title: "PRO BOXING CHAMPIONS LEAGUE",
      image: null,
      hasButton: false,
    },
    {
      id: 3,
      number: "03",
      date: "NOVEMBER 24, 2023",
      title: "DEAD LIFTING PRO STATE LEAGUE",
      image: null,
      hasButton: false,
    },
    {
      id: 4,
      number: "04",
      date: "DECEMBER 24, 2023",
      title: "WEIGHTLIFTING COMPETITION",
      image: null,
      hasButton: false,
    },
  ];

  return (
    <div className="bg-black text-white py-16 px-4 md:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Side - Header */}
          <div className="relative">
            <div className="flex gap-1 mb-6">
              <div className="w-12 h-1 bg-orange-600 rotate-12"></div>
              <div className="w-12 h-1 bg-orange-600 rotate-12"></div>
              <div className="w-12 h-1 bg-orange-600 rotate-12"></div>
            </div>
            <h1 className="font-orbitron text-5xl md:text-6xl font-bold tracking-wider leading-tight mb-8">
              JOIN TODAY
              <br />
              ON LATEST
              <br />
              EVENTS
            </h1>

            {/* Large "EVENT" Text Background */}
            <div className="absolute -left-8 top-32 text-gray-900/20 font-bold text-[180px] leading-none tracking-tighter pointer-events-none select-none hidden lg:block">
              EVENT
            </div>
          </div>

          {/* Right Side - Events List */}
          <div className="space-y-0">
            {events.map((event, index) => (
              <div
                key={event.id}
                className={`border-b border-gray-800 pb-8 pt-8 ${
                  index === 0 ? "border-t" : ""
                }`}
                onMouseEnter={() => setHoveredEvent(event.id)}
                onMouseLeave={() => setHoveredEvent(null)}
              >
                <div className="flex items-start gap-8">
                  {/* Event Number */}
                  <div className="flex-shrink-0">
                    <div className="text-gray-500 text-sm font-semibold mb-2">
                      EVENT
                    </div>
                    <div className="text-5xl font-bold">{event.number}</div>
                  </div>

                  {/* Event Details */}
                  <div className="flex-grow">
                    <div className="flex gap-1 mb-3">
                      <div className="w-8 h-0.5 bg-orange-600"></div>
                      <div className="w-8 h-0.5 bg-orange-600"></div>
                      <div className="w-8 h-0.5 bg-orange-600"></div>
                    </div>
                    <div className="text-gray-400 text-sm mb-3 tracking-wide">
                      {event.date}
                    </div>
                    <h3
                      className={`text-2xl md:text-3xl font-bold tracking-wide mb-4 transition-colors duration-300 ${
                        hoveredEvent === event.id
                          ? "text-orange-600"
                          : "text-white"
                      }`}
                    >
                      {event.title}
                    </h3>

                    <button
                      className={`border-2 border-orange-600 text-orange-600 font-semibold py-3 px-8 tracking-wide transition-all duration-300 ${
                        hoveredEvent === event.id
                          ? "opacity-100 translate-y-0 hover:bg-orange-600 hover:text-white"
                          : "opacity-0 translate-y-3 pointer-events-none"
                      }`}
                    >
                      REGISTER NOW
                    </button>
                  </div>

                  {/* Event Image (only for first event) */}
                  {event.image && (
                    <div className="flex-shrink-0 hidden md:block">
                      <div className="w-40 h-28 overflow-hidden">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-orange-600/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-orange-600/5 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
}
