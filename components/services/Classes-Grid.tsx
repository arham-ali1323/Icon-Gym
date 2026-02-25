"use client";
import { useState } from 'react';

export default function ClassesGridSection() {
  const [hoveredClass, setHoveredClass] = useState<number | null>(null);

  const classes = [
    {
      id: 1,
      title: 'STRENGTH TRAINING',
      description: 'Build muscle and increase power',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop'
    },
    {
      id: 2,
      title: 'YOGA & FLEXIBILITY',
      description: 'Improve flexibility and balance',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop'
    },
    {
      id: 3,
      title: 'FUNCTIONAL FITNESS',
      description: 'Real-world movement training',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop'
    },
    {
      id: 4,
      title: 'ROWING CLASSES',
      description: 'Full-body cardio workout',
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&h=400&fit=crop'
    },
    {
      id: 5,
      title: 'WEIGHT TRAINING',
      description: 'Targeted muscle development',
      image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=600&h=400&fit=crop'
    },
    {
      id: 6,
      title: 'SPIN CLASSES',
      description: 'High-energy cycling sessions',
      image: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=600&h=400&fit=crop'
    }
  ];

  return (
    <div className="bg-black text-white py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex gap-1 mb-6">
            <div className="w-12 h-1 bg-orange-600"></div>
            <div className="w-12 h-1 bg-orange-600"></div>
            <div className="w-12 h-1 bg-orange-600"></div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-wider mb-6">
            LIST OF CLASSES INCLUDED
          </h2>
          <p className="text-gray-400 leading-relaxed max-w-4xl">
            A gym isn't just a place for exercise; it's the place you go to unwind, socialize & work out. The gym is a whole some experience. Some of the most successful facilities have several gym features that contribute to the kind of member experience that drives retention and sales. Our mission is to create a nurturing and empowering the environment where individuals of all ages, abilities, and fitness aspirations can thrive.
          </p>
        </div>

        {/* Classes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {classes.map((classItem) => (
            <div
              key={classItem.id}
              className="relative group overflow-hidden cursor-pointer h-80"
              onMouseEnter={() => setHoveredClass(classItem.id)}
              onMouseLeave={() => setHoveredClass(null)}
            >
              {/* Image */}
              <img
                src={classItem.image}
                alt={classItem.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <h3 className="text-xl font-bold mb-2 transform transition-transform duration-300 group-hover:translate-y-0">
                  {classItem.title}
                </h3>
                <p className={`text-gray-300 text-sm transition-all duration-300 ${
                  hoveredClass === classItem.id 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-4'
                }`}>
                  {classItem.description}
                </p>
              </div>

              {/* Hover Border */}
              <div className={`absolute inset-0 border-4 border-orange-600 pointer-events-none transition-opacity duration-300 ${
                hoveredClass === classItem.id ? 'opacity-100' : 'opacity-0'
              }`}></div>

              {/* Play Icon */}
              <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                hoveredClass === classItem.id ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
              }`}>
                <div className="bg-orange-600 rounded-full p-4">
                  <svg 
                    className="w-8 h-8 text-white" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <button className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 px-10 tracking-wider transition-all duration-300 transform hover:scale-105">
            VIEW ALL CLASSES
          </button>
        </div>
      </div>
    </div>
  );
}