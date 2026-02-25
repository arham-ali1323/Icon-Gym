"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Dumbbell, User, LogIn } from 'lucide-react';

// Import section components
import HeroSection from '@/components/home/hero-section';
import ProgramsSection from '@/components/home/latest-news';
import BMICalculator from '@/components/home/bmi-calculator';
import PricingSection from '@/components/home/pricing-section';
import TrainersSection from '@/components/home/trainers-section';

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <div className="bg-dark">
      {/* Header/Navigation */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 bg-dark/95 backdrop-blur-sm border-b border-orange/10"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.div
              className="flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-orange to-orange-light rounded-xl flex items-center justify-center">
                <Dumbbell className="w-7 h-7 text-white" />
              </div>
              <span className="text-2xl font-black text-white uppercase">
                FIT<span className="text-orange">ZONE</span>
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {['Home', 'Programs', 'Trainers', 'Schedule', 'Pricing', 'Contact'].map((item, i) => (
                <motion.a
                  key={i}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-300 hover:text-orange font-semibold uppercase text-sm tracking-wider transition-colors"
                  whileHover={{ y: -2 }}
                >
                  {item}
                </motion.a>
              ))}
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center gap-4">
              <motion.a
                href="/login"
                className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-orange transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <LogIn className="w-4 h-4" />
                <span className="font-semibold">Login</span>
              </motion.a>
              <motion.a
                href="/register"
                className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-orange to-orange-light text-white font-bold rounded-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <User className="w-4 h-4" />
                <span>Sign Up</span>
              </motion.a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <motion.div
              className="md:hidden py-4 border-t border-orange/10"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="flex flex-col gap-4">
                {['Home', 'Programs', 'Trainers', 'Schedule', 'Pricing', 'Contact'].map((item, i) => (
                  <a
                    key={i}
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-300 hover:text-orange font-semibold uppercase text-sm tracking-wider transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item}
                  </a>
                ))}
                <div className="flex flex-col gap-2 pt-4 border-t border-orange/10">
                  <a
                    href="/login"
                    className="px-4 py-2 text-center text-gray-300 hover:text-orange transition-colors font-semibold"
                  >
                    Login
                  </a>
                  <a
                    href="/register"
                    className="px-6 py-2 bg-gradient-to-r from-orange to-orange-light text-white font-bold rounded-lg text-center"
                  >
                    Sign Up
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </nav>
      </motion.header>

      {/* Main Content - Add all your sections here */}
      <main className="pt-20">
        {/* Hero Section */}
        <HeroSection />

        {/* Programs Section */}
        <section id="programs">
          <ProgramsSection />
        </section>

        {/* BMI Calculator Section */}
        <section id="bmi-calculator">
          <BMICalculator />
        </section>

        {/* Trainers Section */}
        <section id="trainers">
          <TrainersSection />
        </section>

        {/* Pricing Section */}
        <section id="pricing">
          <PricingSection />
        </section>

        {/* Add more sections here as needed */}
      </main>

      {/* Footer */}
      <footer className="bg-dark-100 border-t border-orange/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-orange to-orange-light rounded-lg flex items-center justify-center">
                  <Dumbbell className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-black text-white uppercase">
                  FIT<span className="text-orange">ZONE</span>
                </span>
              </div>
              <p className="text-gray-400 text-sm">
                Transform your body, transform your life. Join the fitness revolution today.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-black uppercase mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {['Programs', 'Trainers', 'Schedule', 'Pricing'].map((item, i) => (
                  <li key={i}>
                    <a href={`#${item.toLowerCase()}`} className="text-gray-400 hover:text-orange transition-colors text-sm">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-black uppercase mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>123 Fitness Street</li>
                <li>New York, NY 10001</li>
                <li>+1 (555) 123-4567</li>
                <li>info@fitzone.com</li>
              </ul>
            </div>

            {/* Hours */}
            <div>
              <h4 className="text-white font-black uppercase mb-4">Hours</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>Mon - Fri: 5:00 AM - 11:00 PM</li>
                <li>Saturday: 6:00 AM - 10:00 PM</li>
                <li>Sunday: 7:00 AM - 9:00 PM</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-orange/10 pt-8">
            <p className="text-center text-gray-500 text-sm">
              © 2024 FitZone. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
