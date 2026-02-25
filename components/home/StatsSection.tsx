"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import athlete from "../../public/images/strength.png";

function NinjaStar({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`inline-block w-10 h-10 animate-ninja-star ${className}`}
      fill="currentColor"
    >
      <path d="M12 2l2.5 5 5 2.5-5 2.5-2.5 5-2.5-5-5-2.5 5-2.5z" />
    </svg>
  );
}


function Counter({ target }: { target: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1200;
    const stepTime = 20;
    const increment = Math.ceil(target / (duration / stepTime));

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [target]);

  return <>{count.toLocaleString()}+</>;
}

export default function StatsSection() {
  return (
    <section className="relative bg-black overflow-hidden py-32">
      {/* smoky background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,90,30,0.25),transparent_60%)]" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 grid xl:grid-cols-2 gap-20 items-center">
        {/* LEFT */}
        <div className="mb-24">
          <div className="relative">
            {/* Background text */}
            <span className="font-orbitron absolute top-0 left-0 w-full h-full text-[150px] md:text-[200px] font-extrabold text-white/10 uppercase select-none pointer-events-none">
              ABOUT
            </span>

            {/* Foreground main text */}
            <h2 className="font-orbitron uppercase font-extrabold text-orange-500 text-5xl md:text-6xl leading-[1.05] tracking-tight relative z-10">
              We are pushing <br />
              the limit  <br />
              <span className="text-orange-500">of your core strength</span>
            </h2>
          </div>

          <p className="mt-6 text-gray-400 font-semibold max-w-md">
            we understand that your lifestyle changes, that’s why we’ve made
            fitness straightforward and stress free. Join today on a no lock-in
            contract membership and start achieving your fitness goals. We value
            flexibility at Jetts, with unlimited 24/7 access.
          </p>

          <button className="mt-8 px-8 py-4 border-2 border-orange-500 text-sm font-bold uppercase text-white hover:bg-orange-500 hover:text-black transition shadow-[0_0_20px_rgba(255,90,30,0.4)]">
            Get started today +
          </button>
        </div>

        {/* RIGHT */}
        <div className="relative">
          {/* STAT CARDS */}
          <div className="space-y-6 sm:space-y-8 md:space-y-10 md:absolute md:top-40 xl:top-48 md:right-[-40px] xl:right-[-60px] md:z-0 mb-24 flex flex-col items-center md:items-end">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="relative w-full max-w-xs sm:max-w-sm md:w-80 bg-zinc-900/80 backdrop-blur-xl rounded-2xl px-6 sm:px-8 py-8 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/60"
              >
                {/* Accent Lines */}
                <span className="absolute top-4 right-4 w-10 h-[3px] bg-orange-500 rounded-full hidden md:block" />
                <span className="absolute top-7 right-4 w-6 h-[3px] bg-orange-500 rounded-full hidden md:block" />

                {/* Content */}
                <div className="flex flex-col items-center md:items-end justify-center text-center md:text-right gap-2">
                  {/* Label */}
                  <p className="text-xs sm:text-sm text-gray-400 uppercase tracking-widest">
                    Fitness Trainee
                  </p>

                  {/* Counter */}
                  <h3 className="font-extrabold text-white leading-none text-5xl sm:text-6xl md:text-4xl">
                    <Counter target={251} />
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* IMAGE */}
          <div className="relative z-20 transition-transform duration-500 ease-out hover:scale-105 hidden md:block">
            <Image
              src={athlete}
              alt="Athlete"
              width={400}
              priority
              className="relative z-10 scale-110"
            />
          </div>
        </div>
      </div>

     {/* BACK STRIP - DIAGONAL AT BOTTOM */}
<div className="absolute bottom-24 left-0 w-full bg-gray-900 text-neutral-600 uppercase font-bold tracking-widest py-6 transform skew-y-6 overflow-hidden z-10">
  <div className="flex w-max animate-marquee-right gap-10 whitespace-nowrap">

    {[1, 2].map((_, i) => (
      <div key={i} className="flex gap-10 flex-shrink-0">
        <span>Dead Lift <NinjaStar className="text-orange-500" /></span>
        <span>Pilates <NinjaStar className="text-orange-500" /></span>
        <span>Dumbbell <NinjaStar className="text-orange-500" /></span>
        <span>Plank <NinjaStar className="text-orange-500" /></span>
        <span>Cardio <NinjaStar className="text-orange-500" /></span>
        <span>Bench Press <NinjaStar className="text-orange-500" /></span>
      </div>
    ))}

  </div>
</div>

    {/* FRONT STRIP - DIAGONAL AT BOTTOM */}
<div className="absolute bottom-10 left-0 w-full bg-orange-500 text-black uppercase font-extrabold py-6 transform shadow-[0_0_30px_rgba(255,90,30,0.5)] overflow-hidden z-20">
  <div className="flex w-max animate-marquee-left gap-10 whitespace-nowrap text-xl">

    {[1, 2].map((_, i) => (
      <div key={i} className="flex gap-10 flex-shrink-0">
        <span>Dead Lift <NinjaStar className="text-black" /></span>
        <span>Pilates <NinjaStar className="text-black" /></span>
        <span>Dumbbell <NinjaStar className="text-black" /></span>
        <span>Plank <NinjaStar className="text-black" /></span>
        <span>Cardio <NinjaStar className="text-black" /></span>
        <span>Bench Press <NinjaStar className="text-black" /></span>
      </div>
    ))}

  </div>
</div>

    </section>
  );
}
