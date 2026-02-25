"use client";
import { useState } from "react";

export default function ClassesSection() {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  const features = [
    "Access to All CLUB4 Locations",
    "Fitness Floor & Cardio",
    "Studio Fitness & Les Mills Classes",
    "Tanning/Red-Light Therapy",
    "30-Minute Fitness Consultation",
    "Club 360 Class Facility",
    "Tanning/Red-Light Therapy",
    "Guest Passes & Bottled Water",
  ];

  const itemsToBring = [
    {
      id: 1,
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
          />
        </svg>
      ),
      title: "CLASS",
      subtitle: "PASS",
    },
    {
      id: 2,
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
      ),
      title: "WATER",
      subtitle: "BOTTLE",
    },
    {
      id: 3,
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
          />
        </svg>
      ),
      title: "SWEAT",
      subtitle: "TOWEL",
    },
    {
      id: 4,
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
          />
        </svg>
      ),
      title: "SPORTS",
      subtitle: "CLOTHS",
    },
    {
      id: 5,
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      ),
      title: "PROTEIN",
      subtitle: "BAR",
    },
    {
      id: 6,
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
          />
        </svg>
      ),
      title: "SPORTS",
      subtitle: "SHOES",
    },
  ];
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/*Image */}
        <div className="relative h-[600px] w-full mb-8">
          <img
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop"
            alt="Hardkaur Gym Team"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        {/* Hero Section */}
        <div className="max-w-7xl w-full">
          <h1 className="text-4xl md:text-5xl py-8 font-bold tracking-wider text-white">
            CARDIO WORKOUT & CROSS COMBAT
          </h1>
        </div>
        {/* Description */}
        <div className="mb-12">
          <p className="text-gray-400 leading-relaxed mb-6">
            Our workout isn't just a place for exercise; it's the place you go
            to unwind, socialize & work out. The workout is a whole some
            experience. Some of the most successful facilities have several
            workout features that contribute to the kind of member experience
            that drives retention and sales. Our mission is to create a
            nurturing and empowering the environment where individuals of all
            ages, abilities, and fitness aspirations can thrive.
          </p>

          <p className="text-orange-600 font-bold leading-relaxed mb-6">
            WE UNDERSTAND THAT WELL BEING IS A MULTIFACETED CONCEPT, WHICH IS
            WHY WE OFFER HOLISTIC SOLUTIONS THAT INTEGRATE PHYSICAL, MENTAL AND
            SPIRITUAL FITNESS.
          </p>

          <p className="text-gray-400 leading-relaxed">
            The workout is a whole experience. Some of the most successful
            facilities have several workout features that contribute to the kind
            of member experience that drives retention and sales. Our mission is
            to create a nurturing and empower ring environment where individuals
            of all ages, abilities, and fitness aspirations can thrive.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-4 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-4 group">
              <div className="flex-shrink-0 mt-1">
                <svg
                  className="w-6 h-6 text-orange-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-white font-medium group-hover:text-orange-600 transition-colors duration-300">
                {feature}
              </span>
            </div>
          ))}
        </div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-40 right-20 w-96 h-96 bg-orange-900 opacity-10 blur-3xl rounded-full"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-red-900 opacity-10 blur-3xl rounded-full"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex gap-1">
                <div className="w-8 h-1 bg-orange-500 transform -skew-x-12"></div>
                <div className="w-8 h-1 bg-orange-500 transform -skew-x-12"></div>
                <div className="w-8 h-1 bg-orange-500 transform -skew-x-12"></div>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white tracking-wider">
                THINGS TO BRING WITH YOU
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

          {/* Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {itemsToBring.map((item) => (
              <div
                key={item.id}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                className="flex items-center gap-6 group cursor-pointer"
              >
                {/* Icon Circle */}
                <div
                  className={`
    relative flex-shrink-0 w-24 h-24 rounded-full
    border-2 overflow-hidden
    flex items-center justify-center
    transition-all duration-300
    ${
      hoveredItem === item.id
        ? "border-orange-500 scale-110"
        : "border-gray-700"
    }
  `}
                >
                  {/* FILL LAYER (like back-to-top progress) */}
                  <span
                    className={`
      absolute bottom-0 left-0 w-full bg-orange-500/20
      transition-all duration-500
      ${hoveredItem === item.id ? "h-full" : "h-0"}
    `}
                  />

                  {/* ICON */}
                  <div
                    className={`
      relative z-10 transition-colors duration-300
      ${hoveredItem === item.id ? "text-orange-500" : "text-gray-400"}
    `}
                  >
                    {item.icon}
                  </div>
                </div>

                {/* Text */}
                <div className="flex flex-col">
                  <h3
                    className={`text-2xl font-bold tracking-wider transition-colors duration-300 ${
                      hoveredItem === item.id ? "text-orange-500" : "text-white"
                    }`}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={`text-2xl font-bold tracking-wider transition-colors duration-300 ${
                      hoveredItem === item.id ? "text-orange-500" : "text-white"
                    }`}
                  >
                    {item.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Tips Section */}
          <div className="mt-20 bg-gradient-to-br from-gray-900 to-black border border-gray-800 p-8 md:p-12">
            <h3 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <svg
                className="w-8 h-8 text-orange-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
              PRO TIPS
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-300">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                <p>Bring a lock to secure your belongings in the locker room</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                <p>Pack headphones for your favorite workout playlist</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                <p>
                  Consider bringing resistance bands for versatile exercises
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                <p>Don't forget your gym membership card or mobile app</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-12 text-center">
          <button className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 px-10 tracking-wider transition-all duration-300 transform hover:scale-105">
            JOIN THIS CLASS
          </button>
        </div>
      </div>
    </section>
  );
}
