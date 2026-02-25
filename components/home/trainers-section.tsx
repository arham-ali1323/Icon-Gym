"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function FitnessTrainers() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentSlide2, setCurrentSlide2] = useState(0);
  const [currentMobileSlide, setCurrentMobileSlide] = useState(0);
  const [trainers, setTrainers] = useState<any[]>([]);

  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/api/trainers')
      .then(res => res.json())
      .then(data => setTrainers(data))
      .catch(err => console.error('Failed to fetch trainers:', err));
  }, []);

  const row1Trainers = [...trainers.slice(0, 3), ...trainers.slice(0, 3)];
  const row2Trainers = [...trainers.slice(2, 6), ...trainers.slice(2, 6)];
  const mobileTrainers = [...trainers, ...trainers];

  // Auto carousel for desktop row 1
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => {
        if (prev >= 2) {
          // Reset to 0 instantly after reaching the duplicate
          setTimeout(() => {
            if (row1Ref.current) {
              row1Ref.current.style.transition = "none";
              setCurrentSlide(0);
              setTimeout(() => {
                if (row1Ref.current)
                  row1Ref.current.style.transition =
                    "transform 0.5s ease-in-out";
              }, 50);
            }
          }, 500);
          return prev + 1;
        }
        return prev + 1;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Auto carousel for desktop row 2
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide2((prev) => {
        if (prev >= 3) {
          // Reset to 0 instantly after reaching the duplicate
          setTimeout(() => {
            if (row2Ref.current) {
              row2Ref.current.style.transition = "none";
              setCurrentSlide2(0);
              setTimeout(() => {
                if (row2Ref.current)
                  row2Ref.current.style.transition =
                    "transform 0.5s ease-in-out";
              }, 50);
            }
          }, 500);
          return prev + 1;
        }
        return prev + 1;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Auto carousel for mobile
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMobileSlide((prev) => {
        if (prev >= 5) {
          // Reset to 0 instantly after reaching the duplicate
          setTimeout(() => {
            if (mobileRef.current) {
              mobileRef.current.style.transition = "none";
              setCurrentMobileSlide(0);
              setTimeout(() => {
                if (mobileRef.current)
                  mobileRef.current.style.transition =
                    "transform 0.5s ease-in-out";
              }, 50);
            }
          }, 500);
          return prev + 1;
        }
        return prev + 1;
      });
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-black text-white py-24">
      <div className="max-w-7xl mx-auto px-4 space-y-20">
        {/* ===================== DESKTOP ===================== */}
        <div className="hidden md:block space-y-16">
          {/* ROW 1 */}
          <div className="grid grid-cols-3 gap-6 items-center">
            {/* HEADING SPACE */}
            <div className="relative">
              <div className="absolute -top-16 -left-8 text-gray-800 text-8xl font-extrabold opacity-50 font-orbitron transform -rotate-6 select-none hidden lg:block">
                <span className="text-orange-600">///</span> TEAM
              </div>
              <h2 className="text-5xl md:text-6xl font-extrabold tracking-widest font-orbitron relative z-10">
                MEET OUR
              </h2>
              <h3 className="text-5xl md:text-6xl font-extrabold tracking-widest text-orange-600 font-orbitron relative z-10">
                FITNESS TRAINERS
              </h3>
            </div>

            {/* SLIDER */}
            <div className="col-span-2 relative overflow-hidden">
              <div
                ref={row1Ref}
                className="flex gap-6 transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 50}%)` }}
              >
                {row1Trainers.map((trainer, index) => (
                  <div
                    key={`${trainer.id}-${index}`}
                    className="min-w-[50%] lg:min-w-[45%] flex-shrink-0"
                  >
                    <TrainerCard trainer={trainer} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ROW 2 */}
          <div className="relative overflow-hidden">
            <div
              ref={row2Ref}
              className="flex gap-6 transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide2 * 33.33}%)` }}
            >
              {row2Trainers.map((trainer, index) => (
                <div
                  key={`${trainer.id}-${index}`}
                  className="min-w-[33%] lg:min-w-[30%] flex-shrink-0"
                >
                  <TrainerCard trainer={trainer} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ===================== MOBILE ===================== */}
        <div className="md:hidden">
          <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-6 font-orbitron">
            OUR TRAINERS
          </h2>

          <div className="relative overflow-hidden">
            <div
              ref={mobileRef}
              className="flex gap-4 transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentMobileSlide * 50}%)` }}
            >
              {mobileTrainers.map((trainer, index) => (
                <div
                  key={`${trainer.id}-${index}`}
                  className="min-w-[50%] flex-shrink-0"
                >
                  <TrainerCard trainer={trainer} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===================== CARD ===================== */
function TrainerCard({ trainer }: any) {
  return (
    <div className="relative overflow-hidden border border-gray-800 hover:border-orange-600 transition group">
      <div className="aspect-[3/4] relative">
        <img
          src={trainer.image}
          alt={trainer.name}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

        <div className="absolute bottom-0 p-5">
          <h3 className="text-xl font-bold">{trainer.name}</h3>
          <p className="text-orange-500 text-sm">{trainer.specialty}</p>
          <p className="text-gray-400 text-xs">{trainer.experience}</p>

          <Link href={`/trainers/${trainer.id}`} className="mt-3 bg-orange-600 hover:bg-orange-700 px-4 py-2 text-sm font-semibold transition inline-block">
            View Profile
          </Link>
        </div>
      </div>
    </div>
  );
}
