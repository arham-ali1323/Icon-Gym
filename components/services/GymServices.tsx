"use client";
export default function GymServicesSection() {
  const leftFeatures = [
    'Access to All CLUB4 Locations',
    'Fitness Floor & Cardio',
    'Studio Fitness & Les Mills Classes',
    'Tanning/Red-Light Therapy'
  ];

  const rightFeatures = [
    '30-Minute Fitness Consultation',
    'Club 360 Class Facility',
    'Tanning/Red-Light Therapy',
    'Guest Passes & Bottled Water'
  ];

  return (
    <section className="bg-black text-white py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Image */}
        <div className="relative h-[600px] w-full mb-8">
          <img
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop"
            alt="Hardkaur Gym Team"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        {/* Header */}
        <h2 className="text-4xl md:text-5xl font-bold tracking-wider mb-8">
          GROUP WORKOUT
        </h2>

        {/* Description Paragraphs */}
        <div className="space-y-6 mb-12">
          <p className="text-gray-400 leading-relaxed text-lg">
            A gym isn't just a place for exercise; it's the place you go to unwind, socialize & work out. The gym is a wholesome experience. Some of the most successful facilities have several gym features that contribute to the kind of member experience that drives retention and sales. Our mission is to create a nurturing and empowering environment where individuals of all ages, abilities, and fitness aspirations can thrive.
          </p>

          <p className="text-orange-600 font-bold text-lg tracking-wide leading-relaxed">
            WE UNDERSTAND THAT WELLBEING IS A MULTIFACETED CONCEPT, WHICH IS WHY WE OFFER HOLISTIC SOLUTIONS THAT INTEGRATE PHYSICAL, MENTAL, AND SPIRITUAL FITNESS.
          </p>

          <p className="text-gray-400 leading-relaxed text-lg">
            The gym is a whole experience. Some of the most successful facilities have several gym features that contribute to the kind of member experience that drives retention and sales. Our mission is to create a nurturing and empowering environment where individuals of all ages, abilities, and fitness aspirations can thrive.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6">
          {/* Left Column */}
          <div className="space-y-6">
            {leftFeatures.map((feature, index) => (
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
                <span className="text-white text-lg font-medium group-hover:text-orange-600 transition-colors duration-300">
                  {feature}
                </span>
              </div>
            ))}
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {rightFeatures.map((feature, index) => (
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
                <span className="text-white text-lg font-medium group-hover:text-orange-600 transition-colors duration-300">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}