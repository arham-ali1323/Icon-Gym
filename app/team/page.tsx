"use client";

import { useState } from "react";
import BannerSection from "@/components/contact/Banner-section";
import trainersData from "@/data/trainers.json";
import ScrollToTopWaterFill from "@/components/ui/back-to-top";

export default function TeamGridPage() {
  const [hoveredMember, setHoveredMember] = useState<number | null>(null);
  return (
    <div className="min-h-screen bg-black text-white">
      <BannerSection />

      {/* Team Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trainersData.map((trainer) => (
            <div
              key={trainer.id}
              className="relative group cursor-pointer overflow-hidden bg-gray-900 border-2 border-gray-800 hover:border-orange-600 transition-all duration-300"
              onMouseEnter={() => setHoveredMember(trainer.id)}
              onMouseLeave={() => setHoveredMember(null)}
            >
              {/* Image Container */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={trainer.image}
                  alt={trainer.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>

                {/* Member Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-bold mb-1 transform transition-transform duration-300 group-hover:translate-y-0">
                    {trainer.name}
                  </h3>
                  <p className="text-orange-600 font-semibold mb-2">
                    {trainer.specialty}
                  </p>

                  {/* Additional Info - Shows on Hover */}
                  <div
                    className={`transition-all duration-300 ${
                      hoveredMember === trainer.id
                        ? "opacity-100 translate-y-0 max-h-40"
                        : "opacity-0 translate-y-4 max-h-0"
                    }`}
                  >
                    <p className="text-gray-300 text-sm mb-3">
                      {trainer.experience}
                    </p>
                    <button className="bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold py-2 px-6 transition-colors duration-300">
                      VIEW PROFILE
                    </button>
                  </div>
                </div>

                {/* Corner Accent */}
                <div
                  className={`absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-orange-600 transition-opacity duration-300 ${
                    hoveredMember === trainer.id ? "opacity-100" : "opacity-0"
                  }`}
                ></div>
                <div
                  className={`absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-orange-600 transition-opacity duration-300 ${
                    hoveredMember === trainer.id ? "opacity-100" : "opacity-0"
                  }`}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="bg-transparent border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white font-bold py-3 px-10 transition-all duration-300 transform hover:scale-105">
            LOAD MORE TRAINERS
          </button>
        </div>
      </div>

      <ScrollToTopWaterFill />
    </div>
  );
}
