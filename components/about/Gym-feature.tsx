"use client";
import { useState } from "react";

export default function GymFeaturesSection() {
  const [activeFeature, setActiveFeature] = useState(1);

  const features = [
    { id: 1, title: "OUR MISSION &", subtitle: "APPROACH" },
    { id: 2, title: "STATE OF THE ART", subtitle: "EQUIPMENT" },
    { id: 3, title: "EDUCATION & TOP", subtitle: "TRAINERS" },
    { id: 4, title: "J SERIES RESULTS-", subtitle: "BASED TRAINING" },
  ];

  return (
    <section className="bg-black text-white py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative">

          {/* LEFT IMAGE */}
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=900"
              alt="Gym Training"
              className="w-full h-[600px] object-cover"
            />

            {/* FLIP CARD — ATTACHED TO IMAGE */}
            <div className="absolute top-1/2 right-[-120px] -translate-y-1/2 hidden lg:block perspective-1000 z-10">
              <div className="relative w-[340px] h-[340px] transition-transform duration-700 preserve-3d hover:rotate-y-180">

                {/* FRONT */}
                <div className="absolute inset-0 bg-zinc-900 p-8 border border-zinc-800 backface-hidden">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-orange-600 p-3">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16" />
                      </svg>
                    </div>
                    <span className="text-4xl font-bold">24/12</span>
                  </div>

                  <h4 className="text-xl font-bold">Our Mission &</h4>
                  <h4 className="text-xl font-bold mb-3">Approach</h4>

                  <p className="text-gray-400 text-sm leading-relaxed">
                    Take advantage of our spacious gym equipped with a wide range of fitness machines.
                  </p>
                </div>

                {/* BACK */}
                <div className="absolute inset-0 bg-orange-600 p-8 border border-orange-700 rotate-y-180 backface-hidden text-black">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-black p-3">
                      <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16" />
                      </svg>
                    </div>
                    <span className="text-4xl font-bold">24/12</span>
                  </div>

                  <h4 className="text-xl font-bold">Our Mission &</h4>
                  <h4 className="text-xl font-bold mb-3">Approach</h4>

                  <p className="text-sm leading-relaxed">
                    Train smarter, stronger, and faster with our expert-led programs.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT FEATURES */}
         <div className="pl-0 lg:pl-20">
  <div className="mb-12">
    <div className="flex gap-1 mb-6">
      <span className="w-12 h-1 bg-orange-600" />
      <span className="w-12 h-1 bg-orange-600" />
      <span className="w-12 h-1 bg-orange-600" />
    </div>

    <h2 className="text-4xl md:text-5xl font-bold mb-2">
      AMAZING FEATURES
    </h2>
    <h3 className="text-4xl md:text-5xl font-bold">
      OF GYM HADKAUR
    </h3>
  </div>

  {features.map((feature) => (
    <div
      key={feature.id}
      onMouseEnter={() => setActiveFeature(feature.id)}
      onClick={() => setActiveFeature(feature.id)}
      className={`flex gap-6 p-6 border-b border-zinc-800 cursor-pointer transition-all duration-300
        ${
          activeFeature === feature.id
            ? "bg-orange-600 border-l-4 border-orange-600 text-white"
            : "hover:bg-orange-600 hover:text-white"
        }`}
    >
      {/* SVG Icon instead of number */}
      <div
        className={`p-4 border border-zinc-700 rounded-full flex items-center justify-center transition-all duration-300
          ${activeFeature === feature.id ? "border-orange-600 text-white" : "border-zinc-700 text-zinc-400"}
        `}
      >
        {/* Example SVGs for each feature */}
        {feature.id === 1 && (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" />
          </svg>
        )}
        {feature.id === 2 && (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
        {feature.id === 3 && (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        )}
        {feature.id === 4 && (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M20 6L9 17l-5-5" />
          </svg>
        )}
      </div>

      <div>
        <h4 className="text-xl font-bold">{feature.title}</h4>
        <h4 className="text-xl font-bold">{feature.subtitle}</h4>
      </div>
    </div>
  ))}

  <a
    href="#"
    className="inline-flex items-center gap-2 mt-8 font-semibold hover:text-orange-600 transition"
  >
    Learn more about us →
  </a>
</div>


        </div>
      </div>
    </section>
  );
}
