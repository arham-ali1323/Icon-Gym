"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import whyChooseUsImage from "@/public/images/why-choose-us.jpg";

interface FeatureCardProps {
  icon: string;
  iconAlt: string;
  title: string;
  description: string;
  variant: "orange" | "dark";
}

const featureCards: FeatureCardProps[] = [
  {
    icon: "/icons/dumbbell.svg",
    iconAlt: "Dumbbell",
    title: "22,000 Square Feet Gym",
    description:
      "Take advantage of our spacious gym equipped with a wide range of fitness machines to achieve maximum results.",
    variant: "orange",
  },
  {
    icon: "/icons/weight-loss.svg",
    iconAlt: "Professional Training",
    title: "Professional Training",
    description:
      "Expert trainers dedicated to helping you achieve your fitness goals with personalized guidance.",
    variant: "dark",
  },
  {
    icon: "/icons/weight-loss.svg",
    iconAlt: "Weight Loss Programs",
    title: "Programs for Weight Loss",
    description:
      "High-priority programs designed by professionals to help you reach your fitness goals.",
    variant: "dark",
  },
  {
    icon: "/icons/high-intensity.svg",
    iconAlt: "High Intensity Studios",
    title: "High Intensity Studios",
    description:
      "Studios designed for high-intensity classes with modern equipment.",
    variant: "orange",
  },
];

const FeatureCard = ({
  icon,
  iconAlt,
  title,
  description,
  variant,
}: FeatureCardProps) => {
  return (
    <div
      className={`relative w-full h-64 md:h-80 p-6 flex flex-col justify-center text-center transition-all shadow-xl
        ${
          variant === "orange"
            ? "bg-orange-500 hover:bg-black hover:text-orange-500 text-black"
            : "bg-zinc-900 hover:bg-orange-500 hover:text-black text-white"
        }`}
    >
      <div className="mb-4">
        <Image
          src={icon}
          alt={iconAlt}
          width={48}
          height={48}
          className="mx-auto transition-all duration-300"
          style={{ filter: variant === 'orange' ? 'brightness(0) invert(0)' : 'brightness(0) invert(1)' }}
        />
      </div>

      <h4 className="uppercase font-orbitron font-extrabold tracking-wide text-base md:text-lg mb-3 transition-colors duration-300">
        {title}
      </h4>

      <p className="text-sm leading-relaxed transition-colors duration-300">
        {description}
      </p>
    </div>
  );
};

export default function WhyChooseUs() {
  const handlePlayVideo = () => {
    console.log("Play video clicked");
  };

  return (
    <section className="relative bg-black py-24 overflow-hidden">
      {/* Background gradient */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900 to-black pointer-events-none"
        aria-hidden="true"
      />

      {/* Heading */}
      <header className="relative z-10 text-center mb-20">
        <span className="absolute inset-0 flex items-center justify-center text-[8rem] md:text-[12rem] font-bold text-white/5 font-orbitron uppercase tracking-widest">
          Feature
        </span>
        <h2 className="font-orbitron uppercase text-white text-3xl md:text-5xl font-extrabold tracking-widest relative z-10">
          Why Choose Us
        </h2>
      </header>

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-[1.2fr_1fr] items-center">
        {/* LEFT IMAGE */}
        <div className="relative hidden lg:block rounded-lg overflow-hidden shadow-2xl h-[672px]">
          <Image
            src={whyChooseUsImage}
            alt="Gym Training Session"
            className="object-cover w-full h-full"
            priority
          />

          {/* Play Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={handlePlayVideo}
              aria-label="Play gym training video"
              className="group focus:outline-none focus:ring-4 focus:ring-orange-500/50 rounded-full"
            >
              <span className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-xl transition-all group-hover:scale-110">
                <Play
                  className="w-6 h-6 md:w-8 md:h-8 text-black ml-1"
                  fill="currentColor"
                />
              </span>
            </button>
          </div>
        </div>

        {/* RIGHT FEATURES */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
          {featureCards.map((card, index) => (
            <FeatureCard key={index} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}
