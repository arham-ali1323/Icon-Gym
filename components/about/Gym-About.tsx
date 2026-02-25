"use client";
import { useState, useEffect, useRef } from "react";

export default function GymAboutSection() {
  const [counts, setCounts] = useState({
    coaches: 0,
    members: 0,
    programs: 0,
    awards: 0,
  });
  const sectionRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;

    const targets = {
      coaches: 600,
      members: 1200,
      programs: 280,
      awards: 250,
    };
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    const timer = setInterval(() => {
      setCounts((prev) => ({
        coaches: Math.min(
          Math.ceil(prev.coaches + targets.coaches / steps),
          targets.coaches
        ),
        members: Math.min(
          Math.ceil(prev.members + targets.members / steps),
          targets.members
        ),
        programs: Math.min(
          Math.ceil(prev.programs + targets.programs / steps),
          targets.programs
        ),
        awards: Math.min(
          Math.ceil(prev.awards + targets.awards / steps),
          targets.awards
        ),
      }));
    }, interval);

    return () => clearInterval(timer);
  }, [hasAnimated]);

  return (
    <section
      ref={sectionRef}
      className="bg-black text-white py-16 px-4 md:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Main Content */}
        <div className="mb-12">
          {/*Image */}
          <div className="relative h-[600px] w-full mb-8">
            <img
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop"
              alt="Hardkaur Gym Team"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          {/* Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-wider mb-6">
              ABOUT HARDKAUR GYM
            </h2>

            <div className="space-y-4 text-gray-400 leading-relaxed">
              <p>
                Welcome to Hadkaur Fitness, where we believe in more than just
                physical transformation. Since our inception, we have been
                dedicated to creating a welcoming and motivating environment
                where individuals of all fitness levels can achieve their goals.
              </p>

              <p>
                At Hadkaur Fitness, we pride ourselves on offering
                state-of-the-art facilities, expert guidance from certified
                trainers, and a supportive community that encourages and
                uplifts. Whether you're looking to build strength, improve
                cardiovascular health, lose weight, or enhance flexibility, we
                have the resources and programs tailored to meet your needs.
              </p>

              <p>
                Our mission is simple: to inspire and empower you to lead a
                healthier, more active lifestyle. We understand that everyone's
                journey is unique, which is why we offer personalized training
                plans, diverse group classes, and nutritional counseling to
                help you succeed.
              </p>

              <p className="text-orange-600 font-semibold">
                JOIN HADKAUR FITNESS TODAY AND EXPERIENCE THE DIFFERENCE!
              </p>

              <p>
                Hadkaur Fitness is not just a gym; it's a community dedicated to
                helping you become the best version of yourself. With
                top-quality equipment, experienced trainers, and a variety of
                programs designed to challenge and motivate you, we provide
                everything you need to reach your fitness goals. Join us today
                and take the first step towards a healthier, stronger you!
              </p>
            </div>
          </div>
        </div>

        {/* Statistics Bar */}
        <div className="bg-orange-600 py-8 px-8 rounded-lg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-white">
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold mb-2">
                {counts.coaches}+
              </div>
              <div className="text-sm md:text-base font-semibold tracking-wider">
                EXPERT COACHES
              </div>
            </div>

            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold mb-2">
                {counts.members}+
              </div>
              <div className="text-sm md:text-base font-semibold tracking-wider">
                MEMBERS JOINED
              </div>
            </div>

            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold mb-2">
                {counts.programs}+
              </div>
              <div className="text-sm md:text-base font-semibold tracking-wider">
                FITNESS PROGRAMS
              </div>
            </div>

            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold mb-2">
                {counts.awards}+
              </div>
              <div className="text-sm md:text-base font-semibold tracking-wider">
                WINNING AWARDS
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
