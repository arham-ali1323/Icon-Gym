import React from "react";

const SubscribeBanner = () => {
  return (
    <div className="pb-16">
      {/* SUBSCRIBE BANNER */}
      <div className="mt-24 max-w-7xl mx-auto bg-orange-600 px-8 py-12 flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <p className="uppercase text-sm tracking-wider text-white/90 mb-2">
            Get to know about all exclusive offers
          </p>
          <h2 className="text-3xl text-white md:text-4xl font-bold uppercase">
            Subscribe to Hardkaur
          </h2>
        </div>

        <button className="relative overflow-hidden text-white text-xl px-8 py-4 border-x-4 border-white font-medium bg-white/20 transition focus:outline-none focus:ring-2 focus:ring-white before:absolute before:inset-0 before:bg-white before:-translate-x-full before:transition-transform before:duration-500 hover:before:translate-x-0 hover:text-orange-600">
          <span className="relative z-10">Subscribe Now +</span>
        </button>
      </div>
    </div>
  );
};

export default SubscribeBanner;
