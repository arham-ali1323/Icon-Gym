"use client";
import Image from "next/image";
import { useState } from "react";
import { Mail, Phone, MapPin, Menu, X, ChevronDown } from "lucide-react";
import {
  FaFacebookF,
  FaTwitter,
  FaGooglePlusG,
  FaInstagram,
} from "react-icons/fa";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [moreDropdown, setMoreDropdown] = useState(false);
  const [dropdownTimeout, setDropdownTimeout] = useState<NodeJS.Timeout | null>(
    null,
  );

  const handleMouseEnter = () => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
      setDropdownTimeout(null);
    }
    setMoreDropdown(true);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setMoreDropdown(false);
    }, 150);
    setDropdownTimeout(timeout);
  };

  return (
    <header className="w-full text-white relative z-50">
      {/* ================= TOP BAR ================= */}
      <div className="bg-gradient-to-r from-orange-900 to-orange-700 text-xs text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-10 flex justify-between items-center">
          {/* LEFT */}
          <div className="flex gap-4 items-center truncate">
            <Link href="mailto:hadkaurfitness@email.com">
              <span className="hidden lg:flex items-center gap-2 cursor-pointer transition-all duration-200 hover:text-orange-300 hover:scale-105">
                <Mail size={14} />
                hadkaurfitness@email.com
              </span>
            </Link>

            <Link href="tel:+98765432122">
              <span className="hidden lg:flex items-center gap-2 cursor-pointer transition-all duration-200 hover:text-orange-300 hover:scale-105">
                <Phone size={14} />
                +987 654 321 22
              </span>
            </Link>

            <Link href="https://www.google.com/maps">
              <span className="hidden lg:flex items-center gap-2 cursor-pointer transition-all duration-200 hover:text-orange-300 hover:scale-105">
                <MapPin size={14} />
                17110 116th Ave SE Unit A Renton
              </span>
            </Link>
          </div>

          {/* RIGHT */}
          <div className="flex gap-4 items-center">
            <FaFacebookF className="cursor-pointer text-lg transition-all duration-200 hover:text-blue-400 hover:scale-110" />
            <FaTwitter className="cursor-pointer text-lg transition-all duration-200 hover:text-sky-400 hover:scale-110" />
            <FaGooglePlusG className="cursor-pointer text-lg transition-all duration-200 hover:text-red-400 hover:scale-110" />
            <FaInstagram className="cursor-pointer text-lg transition-all duration-200 hover:text-pink-400 hover:scale-110" />
          </div>
        </div>
      </div>

      {/* ================= MAIN NAV ================= */}
      <div className="backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex justify-between items-center">
          {/* Logo */}
          <div className="text-orange-500 font-extrabold text-xl tracking-wide">
            <Link href="/">
              <Image
                src="/images/german-and-fitness.png"
                alt="Gym-logo"
                width={200}
                height={200}
                className="h-20 w-auto md:h-[6rem] lg:h-[10rem] transition-all duration-300"
              />
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex gap-10 text-sm text-gray-600 font-bold uppercase">
            {["Classes", "Services", "About", "Contact"].map((item) => (
              <Link
                key={item}
                href={item.toLowerCase()}
                className="hover:text-orange-500 transition"
              >
                {item}
              </Link>
            ))}

            {/* More Dropdown */}
            <div className="relative">
              <button
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="flex items-center gap-1 hover:text-orange-500 transition"
              >
                More
                <ChevronDown className="w-4 h-4" />
              </button>

              {moreDropdown && (
                <div
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  className="absolute top-full left-0 mt-2 w-48 bg-black border border-gray-700 rounded-lg shadow-lg"
                >
                  <div className="py-2">
                    <Link
                      href="/shop"
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-orange-600 hover:text-white transition"
                    >
                      Shop
                    </Link>
                    <Link
                      href="team"
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-orange-600 hover:text-white transition"
                    >
                      Team
                    </Link>
                    <Link
                      href="/pricing"
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-orange-600 hover:text-white transition"
                    >
                      Pricing
                    </Link>
                    <Link
                      href="/faq"
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-orange-600 hover:text-white transition"
                    >
                      FAQ
                    </Link>
                    <Link
                      href="/bmi-calculater"
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-orange-600 hover:text-white transition"
                    >
                      BMI Calculater
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button className="hidden lg:block bg-orange-500 px-6 py-3 text-sm font-bold text-white uppercase hover:bg-orange-400 transition">
              Join Us Today
            </button>

            {/* Mobile Toggle */}
            <button
              className="lg:hidden bg-orange-500 p-3"
              onClick={() => setOpen(!open)}
            >
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* ================= MOBILE MENU ================= */}
        <div
          className={`lg:hidden absolute left-0 w-full bg-black/95 backdrop-blur transition-all duration-300 ${
            open ? "top-20 opacity-100" : "top-14 opacity-0 pointer-events-none"
          }`}
        >
          <nav className="flex flex-col items-center gap-6 py-8 text-sm font-semibold uppercase">
            {["Classes", "Services", "About", "Contact"].map((item) => (
              <Link
                key={item}
                href={item.toLowerCase()}
                className="hover:text-orange-500 transition"
                onClick={() => setOpen(false)}
              >
                {item}
              </Link>
            ))}

            {/* Mobile More Dropdown */}
            <div className="flex flex-col items-center gap-2">
              <button
                onClick={() => setMoreDropdown(!moreDropdown)}
                className="flex items-center gap-1 hover:text-orange-500 transition"
              >
                More
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${moreDropdown ? "rotate-180" : ""}`}
                />
              </button>

              {moreDropdown && (
                <div className="flex flex-col items-center gap-2 mt-2">
                  <Link
                    href="/gallery"
                    className="text-sm text-gray-400 hover:text-orange-500 transition"
                    onClick={() => setOpen(false)}
                  >
                    Gallery
                  </Link>
                  <Link
                    href="/testimonials"
                    className="text-sm text-gray-400 hover:text-orange-500 transition"
                    onClick={() => setOpen(false)}
                  >
                    Testimonials
                  </Link>
                  <Link
                    href="/pricing"
                    className="text-sm text-gray-400 hover:text-orange-500 transition"
                    onClick={() => setOpen(false)}
                  >
                    Pricing
                  </Link>
                  <Link
                    href="/faq"
                    className="text-sm text-gray-400 hover:text-orange-500 transition"
                    onClick={() => setOpen(false)}
                  >
                    FAQ
                  </Link>
                  <Link
                    href="/blog"
                    className="text-sm text-gray-400 hover:text-orange-500 transition"
                    onClick={() => setOpen(false)}
                  >
                    Blog
                  </Link>
                </div>
              )}
            </div>

            <button className="mt-4 bg-orange-500 px-8 py-3 text-white text-sm font-bold uppercase">
              Join Us Today
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
