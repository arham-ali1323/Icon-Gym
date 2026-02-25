'use client';

import { useState } from 'react';
import SubscribeBanner from './Subscribe-Banner';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here (e.g., send to API or email service)
    console.log({ name, email, subject, message });
  };
  return (
    <section className="bg-black text-white py-16 px-6 md:px-12 lg:px-24">
      {/* MAIN CONTACT */}
     <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-start">
          {/* Left Side - Text */}
          <div className="space-y-8">
            <h1 className="font-orbitron text-5xl md:text-6xl font-bold uppercase tracking-wider">
              Feel Free To Ask
              <br />
              Us Anything
            </h1>
            <p className="text-gray-400 leading-relaxed max-w-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              <br />
              Suspendisse interdum nulla eu posuere scelerisque.
              <br />
              Donec sagittis adipiscing elit.
            </p>
          </div>

          {/* Right Side - Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
              <input
                type="text"
                placeholder="Your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-gray-900 border border-gray-800 rounded-md px-6 py-4 text-gray-300 placeholder-white placeholder:text-lg text-lg focus:outline-none focus:border-orange-500 transition"
                required
              />
              <input
                type="email"
                placeholder="E-mail address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-900 border border-gray-800 rounded-md px-6 py-4 text-gray-300 placeholder-white placeholder:text-lg text-lg focus:outline-none focus:border-orange-500 transition"
                required
              />
            </div>

            <input
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full bg-gray-900 border border-gray-800 rounded-md px-6 py-4 text-gray-300 placeholder-white placeholder:text-lg focus:outline-none focus:border-orange-500 transition"
              required
            />

            <textarea
              placeholder="Your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={8}
              className="w-full bg-gray-900 border border-gray-800 rounded-md px-6 py-4 text-gray-300 placeholder-white placeholder:text-lg focus:outline-none focus:border-orange-500 transition resize-none"
              required
            />

            <button
              type="submit"
              className="relative overflow-hidden text-white text-xl px-8 py-4 border-none font-medium bg-orange-600 transition focus:outline-none focus:ring-2 focus:ring-white before:absolute before:inset-0 before:bg-white before:-translate-x-full before:transition-transform before:duration-500 hover:before:translate-x-0 hover:text-gray-900 group"
            >
              <span className="relative z-10">GET STARTED TODAY +</span>
            </button>
          </form>
        </div>
        <SubscribeBanner/>
      </section>
  );
}
