"use client";

import { useState } from "react";

export default function ClassTimetable() {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  const schedule = [
    { day: "TUESDAY", time: "07:00 - 08:00", instructor: "DAVID BRANDON" },
    { day: "WEDNESDAY", time: "07:00 - 08:00", instructor: "NATALIA JACKSON" },
    { day: "THURSDAY", time: "07:00 - 08:00", instructor: "WILLIAM JASON" },
    { day: "FRIDAY", time: "07:00 - 08:00", instructor: "IVAN ALEXANDER" },
    { day: "SATURDAY", time: "07:00 - 08:00", instructor: "DAVID BRANDON" },
    { day: "MONDAY", time: "07:00 - 08:00", instructor: "NATALIA JACKSON" },
  ];

  return (
    <section className="relative min-h-screen bg-black py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex gap-1">
              <div className="w-8 h-1 bg-orange-500 transform -skew-x-12"></div>
              <div className="w-8 h-1 bg-orange-500 transform -skew-x-12"></div>
              <div className="w-8 h-1 bg-orange-500 transform -skew-x-12"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-wider">
              CLASS TIMETABLE
            </h2>
          </div>

          <p className="text-gray-400 text-base leading-relaxed max-w-5xl">
            A gym isn't just a place for exercise; it's the place you go to
            unwind, socialize & work out. The gym is a whole some experience.
            Some of the most successful facilities have several gym features
            that contribute to the kind of member experience that drives
            retention and sales.
          </p>
        </div>

        {/* Timetable */}
        <div className="mt-12 overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-900">
                <th className="text-white font-bold text-lg tracking-wider py-5 px-6 text-left border border-gray-800">
                  DAY
                </th>
                <th className="text-white font-bold text-lg tracking-wider py-5 px-6 text-left border border-gray-800">
                  TIME
                </th>
                <th className="text-white font-bold text-lg tracking-wider py-5 px-6 text-left border border-gray-800">
                  INSTRUCTOR
                </th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((item, index) => (
                <tr
                  key={index}
                  onMouseEnter={() => setHoveredRow(index)}
                  onMouseLeave={() => setHoveredRow(null)}
                  className={`transition-all duration-300 ${
                    hoveredRow === index
                      ? "bg-orange-500"
                      : "bg-black hover:bg-gray-900/50"
                  }`}
                >
                  <td
                    className={`py-5 px-6 border border-gray-800 font-semibold tracking-wide transition-colors ${
                      hoveredRow === index ? "text-black" : "text-gray-300"
                    }`}
                  >
                    {item.day}
                  </td>
                  <td
                    className={`py-5 px-6 border border-gray-800 font-medium tracking-wide transition-colors ${
                      hoveredRow === index ? "text-black" : "text-gray-400"
                    }`}
                  >
                    {item.time}
                  </td>
                  <td
                    className={`py-5 px-6 border border-gray-800 font-semibold tracking-wide transition-colors ${
                      hoveredRow === index ? "text-black" : "text-gray-300"
                    }`}
                  >
                    {item.instructor}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Additional Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 p-6 hover:border-orange-500 transition-colors group">
            <div className="flex items-start gap-4">
              <div className="bg-orange-500 p-3 rounded group-hover:scale-110 transition-transform">
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
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg mb-2">
                  Group Classes
                </h3>
                <p className="text-gray-400 text-sm">
                  Join our energizing group fitness sessions
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 p-6 hover:border-orange-500 transition-colors group">
            <div className="flex items-start gap-4">
              <div className="bg-orange-500 p-3 rounded group-hover:scale-110 transition-transform">
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
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg mb-2">
                  Expert Trainers
                </h3>
                <p className="text-gray-400 text-sm">
                  Learn from certified fitness professionals
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 p-6 hover:border-orange-500 transition-colors group">
            <div className="flex items-start gap-4">
              <div className="bg-orange-500 p-3 rounded group-hover:scale-110 transition-transform">
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
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg mb-2">
                  Flexible Schedule
                </h3>
                <p className="text-gray-400 text-sm">
                  Classes available throughout the week
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center mt-16">
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-12 tracking-widest transition-all transform hover:scale-105 duration-300">
            VIEW FULL SCHEDULE
          </button>
        </div>
      </div>
    </section>
  );
}
