"use client";
import { useState } from 'react';

export default function ContactInfoSection() {
  const [hoveredCard, setHoveredCard] = useState<null | number>(null);

  const contactInfo = [
    {
      id: 1,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      title: 'PHONE NO',
      label: 'CALL US ANYTIME',
      value: '+123 45677345',
      link: 'tel:+12345677345'
    },
    {
      id: 2,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: 'EMAIL ADDRESS',
      label: 'SEND US MAIL',
      value: 'HADKAUFITNESS@EMAIL.COM',
      link: 'mailto:hadkaufitness@email.com'
    },
    {
      id: 3,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: 'ADDRESS',
      label: 'VISIT OUR GYM',
      value: '17110 116TH AVE SE UNIT ARENTON, WA 98058-5055',
      link: 'https://maps.google.com/?q=17110+116TH+AVE+SE+UNIT+ARENTON+WA+98058-5055'
    }
  ];

  return (
    <div className="bg-black text-white py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {contactInfo.map((item, index) => (
            <div
              key={item.id}
              className={`relative border border-gray-800 p-8 transition-all duration-300 ${
                hoveredCard === item.id ? 'bg-gray-900 border-orange-600' : 'bg-black'
              } ${index === 0 ? 'md:border-r-0' : ''} ${index === 1 ? 'md:border-r-0' : ''}`}
              onMouseEnter={() => setHoveredCard(item.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Title with Icon */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex gap-1">
                  <div className="w-6 h-0.5 bg-orange-600"></div>
                  <div className="w-6 h-0.5 bg-orange-600"></div>
                  <div className="w-6 h-0.5 bg-orange-600"></div>
                </div>
                <h3 className="font-orbitron text-xl font-bold tracking-wider">
                  {item.title}
                </h3>
              </div>

              {/* Label */}
              <p className="text-gray-500 text-sm mb-3 tracking-wide">
                {item.label}
              </p>

              {/* Value */}
              <a
                href={item.link}
                className="text-white text-xl font-bold tracking-wide hover:text-orange-600 transition-colors duration-300 block"
              >
                {item.value}
              </a>

              {/* Decorative Icon */}
              <div className={`absolute bottom-8 right-8 text-gray-800 transition-all duration-300 ${
                hoveredCard === item.id ? 'text-orange-600/20 scale-110' : ''
              }`}>
                {item.icon}
              </div>

              {/* Hover Effect Line */}
              <div className={`absolute bottom-0 left-0 h-1 bg-orange-600 transition-all duration-300 ${
                hoveredCard === item.id ? 'w-full' : 'w-0'
              }`}></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}