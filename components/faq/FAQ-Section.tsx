"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What are your gym hours?",
      answer:
        "We're open Monday-Friday from 5:00 AM to 11:00 PM, Saturday from 6:00 AM to 9:00 PM, and Sunday from 7:00 AM to 8:00 PM.",
    },
    {
      question: "Do you offer personal training?",
      answer:
        "Yes! We have certified personal trainers available for one-on-one sessions. Contact us to schedule a consultation and discuss your fitness goals.",
    },
    {
      question: "What types of equipment do you have?",
      answer:
        "Our gym features state-of-the-art cardio machines, free weights, resistance training equipment, functional training area, and dedicated spaces for group classes.",
    },
    {
      question: "Can I freeze my membership?",
      answer:
        "Yes, you can freeze your membership for up to 3 months per year. Please visit the front desk or contact us at least 7 days before you want to freeze it.",
    },
    {
      question: "Do you offer group classes?",
      answer:
        "We offer a variety of group classes including yoga, HIIT, spinning, strength training, and more. Check our schedule for class times and availability.",
    },
    {
      question: "Is there a joining fee?",
      answer:
        "We occasionally have special promotions with no joining fee. Standard joining fees vary based on membership type. Contact us for current offers.",
    },
    {
      question: "Can I bring a guest?",
      answer:
        "Yes, members can bring guests for a day pass fee. Guests must sign a waiver and follow all gym rules and policies.",
    },
    {
      question: "Do you have parking available?",
      answer:
        "Yes, we have free parking available for all members and guests. Our parking lot is well-lit and monitored for your safety.",
    },
    {
      question: "What should I bring to my first visit?",
      answer:
        "Bring comfortable workout clothes, athletic shoes, a water bottle, and a towel. We provide lockers for your belongings (bring your own lock).",
    },
    {
      question: "Do you offer nutritional guidance?",
      answer:
        "Yes, our certified trainers can provide basic nutritional guidance. We also partner with nutritionists for more comprehensive meal planning services.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Frequently Asked <span className="text-orange-500">Questions</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Find answers to common questions about our gym, memberships, and
            services. Can't find what you're looking for? Feel free to contact
            us.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Image Column */}
          <div className="order-2 lg:order-1">
            <div className="relative rounded-lg overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=800&fit=crop"
                alt="Customer Support"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Got Questions?
                </h3>
                <p className="text-white/90">
                  We're here to help you start your fitness journey with
                  confidence.
                </p>
              </div>
            </div>
          </div>

          {/* FAQ Column */}
          <div className="order-1 lg:order-2">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="border border-gray-800 rounded-lg overflow-hidden transition-all duration-300 hover:border-orange-500"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="
                      w-full px-8 py-4 text-left flex items-center justify-between 
                      border border-orange-500
                      font-medium
                      bg-white/20
                      transition-all duration-500
                      focus:outline-none focus:ring-2 focus:ring-orange-500
                      relative overflow-hidden
                      hover:border-orange-500
                      group
                    "
                  >
                    <span className="text-white text-xl font-semibold relative z-10 group-hover:text-white">
                      {faq.question}
                    </span>
                    <span className="text-white text-xl transition-transform duration-200 relative z-10 group-hover:text-white">
                      {activeIndex === index ? (
                        <ChevronUp size={24} />
                      ) : (
                        <ChevronDown size={24} />
                      )}
                    </span>
                    <div className="absolute inset-0 bg-orange-500 -translate-x-full transition-transform duration-500 group-hover:translate-x-0"></div>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      activeIndex === index ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    <div className="px-6 py-4 bg-gray-950">
                      <p className="text-gray-300 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 border border-gray-700 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              Still have questions?
            </h3>
            <p className="text-white/90 mb-6">
              Our team is here to help you with any additional questions you
              might have.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="mailto:info@gmail.com"
                className="
 overflow-hidden
  text-orange-500 text-xl px-6 py-2
  font-medium
  bg-white rounded-lg
  transition
  focus:outline-none focus:ring-2 focus:ring-white
  relative

  before:absolute before:inset-0
  before:bg-orange-500
  before:-translate-x-full
  before:transition-transform before:duration-500
  hover:before:translate-x-0
  hover:text-white
  z-10
"
              >
                <span className="relative z-10">Contact Us</span>
              </Link>
              <Link
                href="tel:+00123456789"
                className="
  relative overflow-hidden
  rounded-lg
  text-orange-500 text-xl px-6 py-2
  font-medium
  bg-white
  transition
  focus:outline-none focus:ring-2 focus:ring-white

  before:absolute before:inset-0
  before:bg-orange-500
  before:-translate-x-full
  before:transition-transform before:duration-500
  hover:before:translate-x-0
  hover:text-white
  z-10
"
              >
                <span className="relative z-10">Call Us</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
