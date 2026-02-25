"use client";

import { usePathname } from "next/navigation";

export default function PageHero() {
  const pathname = usePathname();

  const pageName =
    pathname
      .split("/")
      .filter(Boolean)
      .map(
        (segment) =>
          segment.charAt(0).toUpperCase() + segment.slice(1)
      )
      .join(" ") || "Home";

  return (
    <section className="relative w-full h-[400px] flex items-center justify-center overflow-hidden">
      
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{
          backgroundImage:
            "url('https://demo.bravisthemes.com/hadkaur/wp-content/uploads/2023/08/Intro2.png')",
        }}
      />

      {/* Dark + Orange Glow Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,102,0,0.35)_0%,_rgba(30,10,5,0.8)_35%,_rgba(0,0,0,0.95)_70%)]" />

      {/* Extra Dark Layer for Contrast */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 text-center">
        <h1 className="font-orbitron text-white text-4xl md:text-6xl font-bold tracking-widest uppercase">
          {pageName}
        </h1>

        {/* Breadcrumb */}
        <div className="mt-4 flex items-center justify-center gap-2 text-sm tracking-widest uppercase">
          <a href="/" className="text-white hover:text-orange-400 transition">
            Home
          </a>

          {pathname !== "/" && (
            <>
              <span className="text-orange-500">•</span>
              <span className="text-orange-500 font-semibold">
                {pageName}
              </span>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
