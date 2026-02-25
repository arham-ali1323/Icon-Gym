'use client';  
import { useState } from 'react';

export default function ClassTimeTable() {
  const [hoveredClass, setHoveredClass] = useState<string | null>(null);

  const timeSlots = [
    '7:00 am',
    '8:00 am',
    '9:00 am',
    '10:00 am',
    '11:00 am'
  ];

  const days = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];

  const schedule: Record<string, { class: string; trainer: string }[]> = {
    '7:00 am': [
      { class: 'CARDIO', trainer: 'Ivan Alec Hander' },
      { class: 'DEAD LIFT', trainer: 'David Klimov' },
      { class: 'CROSS FIT', trainer: 'David Klimov' },
      { class: 'RUNNING', trainer: 'Miller Zoel' },
      { class: 'CYCLING', trainer: 'Natalia Ivansky' },
      { class: 'RUNNING', trainer: 'Miller Zoel' },
      { class: 'BENCH PRESS', trainer: 'Natalia Ivansky' }
    ],
    '8:00 am': [
      { class: 'DEAD LIFT', trainer: 'David Klimov' },
      { class: 'CYCLING', trainer: 'Natalia Ivansky' },
      { class: 'RUNNING', trainer: 'Miller Zoel' },
      { class: 'CYCLING', trainer: 'Natalia Ivansky' },
      { class: 'RUNNING', trainer: 'Miller Zoel' },
      { class: 'CYCLING', trainer: 'Natalia Ivansky' },
      { class: 'RUNNING', trainer: 'Miller Zoel' }
    ],
    '9:00 am': [
      { class: 'CYCLING', trainer: 'Natalia Ivansky' },
      { class: 'DEAD LIFT', trainer: 'David Klimov' },
      { class: 'CYCLING', trainer: 'Natalia Ivansky' },
      { class: 'RUNNING', trainer: 'Miller Zoel' },
      { class: 'CYCLING', trainer: 'Natalia Ivansky' },
      { class: 'RUNNING', trainer: 'Miller Zoel' },
      { class: 'CYCLING', trainer: 'Natalia Ivansky' }
    ],
    '10:00 am': [
      { class: 'DEAD LIFT', trainer: 'Rachel Mace' },
      { class: 'CYCLING', trainer: 'Natalia Ivansky' },
      { class: 'RUNNING', trainer: 'Miller Zoel' },
      { class: 'CYCLING', trainer: 'Natalia Ivansky' },
      { class: 'RUNNING', trainer: 'Miller Zoel' },
      { class: 'CYCLING', trainer: 'Natalia Ivansky' },
      { class: 'RUNNING', trainer: 'Miller Zoel' }
    ],
    '11:00 am': [
      { class: 'CYCLING', trainer: 'Natalia Ivansky' },
      { class: 'DEAD LIFT', trainer: 'David Klimov' },
      { class: 'CYCLING', trainer: 'Natalia Ivansky' },
      { class: 'RUNNING', trainer: 'Miller Zoel' },
      { class: 'CYCLING', trainer: 'Natalia Ivansky' },
      { class: 'RUNNING', trainer: 'Miller Zoel' },
      { class: 'CYCLING', trainer: 'Natalia Ivansky' }
    ]
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-8">
          <div>
            <div className="flex gap-1 mb-6">
              <div className="w-12 h-1 bg-orange-600 rotate-12"></div>
              <div className="w-12 h-1 bg-orange-600 rotate-12"></div>
              <div className="w-12 h-1 bg-orange-600 rotate-12"></div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-wider">
              CLASS TIME TABLE
            </h1>
          </div>
          
          <div className="max-w-md">
            <p className="text-gray-400 text-sm leading-relaxed">
              Welcome to German Fitness! We believe that true wellness encompasses the mind, body & soul.
            </p>
          </div>
        </div>

        {/* Time Table */}
       <div className="overflow-x-auto">
  <table className="w-full border-collapse">
    <thead>
      <tr className="border-b border-gray-800">
        <th className="p-4 text-left text-gray-500 font-normal"></th>
        {days.map((day) => (
          <th
            key={day}
            className="p-4 text-center text-white font-semibold text-sm tracking-wider"
          >
            {day}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {timeSlots.map((time) => (
        <tr key={time} className="border-b border-gray-800">
          <td className="p-4 text-whit font-medium whitespace-nowrap">
            {time}
          </td>
          {schedule[time].map(
            (session: { class: string; trainer: string }, index: number) => (
              <td
                key={`${time}-${index}`}
                className="p-2"
                onMouseEnter={() => setHoveredClass(`${time}-${index}`)}
                onMouseLeave={() => setHoveredClass(null)}
              >
                <div className="bg-gray-800 p-4 text-center cursor-pointer transition-colors duration-300 w-36 h-24 flex flex-col justify-center items-center hover:bg-[#FF4D24]">

                  <h3 className="font-bold text-white mb-2 text-sm">
                    {session.class}
                  </h3>
                  <p className="text-white text-xs">{session.trainer}</p>
                </div>
              </td>
            )
          )}
        </tr>
      ))}
    </tbody>
  </table>
</div>

        {/* CTA Button */}
        <div className="mt-12 text-center">
          <button className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded transition-all duration-300 transform hover:scale-105">
            BOOK A CLASS NOW
          </button>
        </div>

      </div>
    </div>
  );
}