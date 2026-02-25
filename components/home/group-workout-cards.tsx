"use client";
import { useState, useEffect } from 'react';

export default function GroupWorkout() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);

  const services = [
    {
      id: 1,
      number: '01',
      title: 'GROUP',
      subtitle: 'WORKOUT',
      image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&h=600&fit=crop',
      features: ['Multiple Class Times', 'Expert Instructors', 'Community Support', 'Varied Programs']
    },
    {
      id: 2,
      number: '02',
      title: 'PERSONAL',
      subtitle: 'TRAINING',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
      features: ['Customized Plans', 'Individual Attention', 'Flexible Schedule', 'Goal-Oriented']
    },
    {
      id: 3,
      number: '03',
      title: 'MUSCLE',
      subtitle: 'BUILDING',
      image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&h=600&fit=crop',
      features: ['Strength Focus', 'Progressive Overload', 'Nutrition Guidance', 'Body Composition']
    },
    {
      id: 4,
      number: '04',
      title: 'CARDIO',
      subtitle: 'TRAINING',
      image: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=800&h=600&fit=crop',
      features: ['Heart Health', 'Fat Burning', 'Endurance Building', 'Energy Boost']
    },
    {
      id: 5,
      number: '05',
      title: 'FLEXIBILITY',
      subtitle: 'TRAINING',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop',
      features: ['Injury Prevention', 'Mobility Work', 'Stress Relief', 'Recovery Focus']
    }
  ];

  // Duplicate services for infinite loop effect
  const duplicatedServices = [...services, ...services, ...services];

  // Responsive cards per view
  useEffect(() => {
    const updateCardsPerView = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setCardsPerView(1);
      } else if (width < 1024) {
        setCardsPerView(2);
      } else {
        setCardsPerView(3);
      }
    };

    updateCardsPerView();
    window.addEventListener('resize', updateCardsPerView);
    return () => window.removeEventListener('resize', updateCardsPerView);
  }, []);

  const slidePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const slideNext = () => {
    setCurrentIndex((prev) => Math.min(services.length - cardsPerView, prev + 1));
  };

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const nextIndex = prev + 1;
        // Reset to middle copy for seamless infinite loop
        if (nextIndex >= services.length * 2) {
          return services.length;
        }
        return nextIndex;
      });
    }, 5000); // Auto-slide every 5 seconds

    return () => clearInterval(interval);
  }, [services.length]);

  return (
    <div className="bg-black text-white py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex gap-1 justify-center mb-6">
            <div className="w-12 h-1 bg-orange-600"></div>
            <div className="w-12 h-1 bg-orange-600"></div>
            <div className="w-12 h-1 bg-orange-600"></div>
          </div>
          <h2 className="font-orbitron text-4xl md:text-5xl font-bold tracking-wider mb-4">
            OUR SERVICES
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Choose from our comprehensive range of fitness programs designed to help you achieve your goals
          </p>
        </div>

        {/* Slider Container */}
        <div className="relative">
          {/* Cards Slider */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)` }}
            >
              {duplicatedServices.map((service, index) => (
                <div
                  key={`${service.id}-${index}`}
                  className={`flex-shrink-0 px-2 ${cardsPerView === 1 ? 'w-full' : cardsPerView === 2 ? 'w-1/2' : 'w-1/3'}`}
                >
                  <div
                    className="relative h-[250px] overflow-hidden cursor-pointer border-2 border-gray-800"
                  >
                    {/* Background Image */}
                    <div className="absolute inset-0">
                      <img
                        src={service.image}
                        alt={`${service.title} ${service.subtitle}`}
                        className="w-full h-full object-cover transition-transform duration-700"
                      />
                      {/* Dark Overlay */}
                      <div className="absolute inset-0 bg-black/40"></div>
                    </div>

                    {/* Content */}
                    <div className={`relative h-full flex flex-col justify-between ${cardsPerView === 1 ? 'p-4' : 'p-6'}`}>
                      {/* Top Section */}
                      <div>
                        <div className="flex gap-1 mb-4">
                          <div className="w-8 h-1 bg-orange-600"></div>
                          <div className="w-8 h-1 bg-orange-600"></div>
                          <div className="w-8 h-1 bg-orange-600"></div>
                        </div>

                        <h2 className={`font-bold tracking-wider mb-1 ${cardsPerView === 1 ? 'text-2xl' : 'text-3xl md:text-4xl'}`}>
                          {service.title}
                        </h2>
                        <h3 className={`font-bold tracking-wider mb-4 ${cardsPerView === 1 ? 'text-2xl' : 'text-3xl md:text-4xl'}`}>
                          {service.subtitle}
                        </h3>

                        {/* Large Number */}
                        <div className={`font-bold leading-none opacity-20 absolute pointer-events-none ${cardsPerView === 1 ? 'text-[80px] top-16 left-2' : 'text-[120px] top-24 left-4'}`}>
                          {service.number}
                        </div>
                      </div>

                      {/* Bottom Section - Always Visible */}
                      <div className="transition-all duration-500 opacity-100 translate-y-0">
                        <button className={`bg-orange-600 hover:bg-orange-700 text-white font-bold transition-all duration-300 transform hover:scale-105 ${cardsPerView === 1 ? 'py-2 px-4 text-xs' : 'py-2 px-6 text-sm'}`}>
                          LEARN MORE
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}