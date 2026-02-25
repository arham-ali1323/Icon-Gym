'use client';
import { useState } from 'react';

export default function TestimonialSection() {
  const testimonials = [
    {
      id: 1,
      name: "Helen Jordan",
      location: "CHICAGO",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      rating: 5,
      text: "GREAT GYM! A NEW GYM WITH MODERN EQUIPMENT AND FACILITIES MAKES TRAINING SO MUCH EASIER. ALWAYS WILLING TO HELP YOU WITH YOUR TRAINING"
    },
    {
      id: 2,
      name: "Michael Chen",
      location: "NEW YORK",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      rating: 5,
      text: "EXCEPTIONAL TRAINERS AND STATE-OF-THE-ART EQUIPMENT. THE COMMUNITY HERE IS INCREDIBLY SUPPORTIVE AND MOTIVATING. BEST DECISION I MADE FOR MY FITNESS JOURNEY"
    },
    {
      id: 3,
      name: "Sarah Williams",
      location: "LOS ANGELES",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      rating: 5,
      text: "TRANSFORMED MY LIFE COMPLETELY! THE PERSONAL TRAINERS ARE KNOWLEDGEABLE AND THE ATMOSPHERE IS AMAZING. HIGHLY RECOMMEND TO ANYONE SERIOUS ABOUT FITNESS"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index: number): void => {
    setCurrentIndex(index);
  };

  const current = testimonials[currentIndex];

  return (
    <section className="relative bg-gradient-to-br from-orange-900 via-gray-900 to-black overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-1/2 h-full">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,0 L100,0 L100,100 Z" fill="currentColor" className="text-orange-500" />
          </svg>
        </div>
      </div>

      {/* Geometric Lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-40 w-96 h-96 border border-orange-500 opacity-20 transform rotate-45"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 border border-orange-500 opacity-10"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="text-center mb-16 relative">
          <div className="absolute -top-[3rem] left-1/2 -translate-x-1/2 text-gray-600 text-8xl font-extrabold opacity-50 font-orbitron select-none hidden lg:block">
            REVIEW
          </div>
          <h2 className="font-orbitron text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-widest uppercase relative z-10">
            Client&apos;s Testimonial
          </h2>
        </div>

        {/* Testimonial Card */}
        <div className="max-w-6xl mx-auto bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 p-8 md:p-12">
            {/* Left Side - Image */}
            <div className="md:col-span-3 flex justify-center md:justify-start">
              <div className="relative">
                {/* Image Container with Border */}
                <div className="relative w-48 h-48 rounded-full border-4 border-gray-700 overflow-hidden">
                  <img 
                    src={current.image}
                    alt={current.name}
                    className="w-full h-full object-cover"
                  />
                  {/* Quote Mark Overlay */}
                  <div className="absolute bottom-2 right-2 bg-orange-500 rounded-full w-12 h-12 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Content */}
            <div className="md:col-span-9 flex flex-col justify-center space-y-6">
              {/* Star Rating */}
              <div className="flex gap-2">
                {[...Array(current.rating)].map((_, i) => (
                  <svg 
                    key={i}
                    className="w-8 h-8 text-orange-500" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-white text-xl md:text-2xl font-bold tracking-wide leading-relaxed">
                "{current.text}"
              </blockquote>

              {/* Client Info */}
              <div className="space-y-1">
                <h3 className="text-white text-2xl font-bold">{current.name}</h3>
                <p className="text-gray-400 text-sm tracking-widest">{current.location}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center items-center gap-4 mt-12">
          <button
            onClick={prevTestimonial}
            className="text-gray-500 hover:text-orange-500 transition"
            aria-label="Previous testimonial"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="flex gap-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`transition-all ${
                  index === currentIndex
                    ? 'w-12 h-3 bg-orange-500'
                    : 'w-3 h-3 bg-gray-600 hover:bg-gray-500'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextTestimonial}
            className="text-gray-500 hover:text-orange-500 transition"
            aria-label="Next testimonial"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}