"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FaCoffee, FaLeaf, FaSeedling } from "react-icons/fa";
import blazikenImg from "@/public/blaziken-coffee.jpg";

// Skeleton simple
const Skeleton = ({ className }: { className?: string }) => (
  <div className={`animate-pulse bg-gray-300 dark:bg-gray-700 rounded ${className}`}></div>
);

export default function BlazikenCoffeePage() {
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);

  const handleSubscribe = () => {
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2500);
  };

  return (
    <main className="relative w-full py-12 bg-gradient-to-b from-[#FFF8F0] to-[#F8F4E3] dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10 dark:opacity-20 pointer-events-none"></div>
      <div className="relative z-10 px-4 mx-auto max-w-7xl sm:px-6">
        <section className="flex flex-col items-center gap-6 md:flex-row md:gap-12">
          <div className="w-full space-y-4 text-center md:w-1/2 md:text-left">
            <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl md:text-5xl dark:text-white">
              Blaziken Coffee
            </h1>
            <p className="text-base text-gray-700 sm:text-lg md:text-xl dark:text-gray-300">
              Welcome to Blaziken Coffee. Explore the story behind our premium coffee, its origins, and unique flavors that make every cup unforgettable.
            </p>
            <button
              onClick={handleSubscribe}
              className="px-6 py-3 mt-4 font-semibold text-white transition-transform bg-orange-500 rounded-lg shadow-lg hover:bg-orange-600 hover:scale-105"
            >
              Subscribe Now
            </button>
          </div>
          <div className="relative w-full h-64 overflow-hidden shadow-xl sm:h-80 md:w-1/2 md:h-96 rounded-xl">
            {!heroLoaded && <Skeleton className="w-full h-full" />}
            <Image
              src={blazikenImg}
              alt="Blaziken Coffee"
              fill
              className={`object-cover transition-opacity duration-500 ${heroLoaded ? "opacity-100" : "opacity-0"}`}
              onLoadingComplete={() => setHeroLoaded(true)}
            />
          </div>
        </section>
        <section className="mt-12 space-y-4 text-center md:text-left">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl md:text-3xl dark:text-white">
            Our Story
          </h2>
          <p className="text-base leading-relaxed text-gray-700 sm:text-lg dark:text-gray-300">
            Blaziken Coffee was born from the passion for premium coffee, cultivated in the finest regions and roasted with care to preserve its unique taste. Every cup tells a story of effort, tradition, and love for coffee.
          </p>
        </section>
        <section className="mt-12 space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">
            Origin & Features
          </h2>
          <p className="text-base leading-relaxed text-gray-700 sm:text-lg dark:text-gray-300">
            Our coffee comes from carefully selected farms in America, Europe, Asia, Oceania, and Africa, ensuring consistent and authentic flavors. We work directly with local producers to promote sustainability.
          </p>
          <div className="grid grid-cols-1 gap-4 mt-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 sm:gap-6">
            {[
              { icon: FaCoffee, title: "America", desc: "High-altitude coffee with fruity notes and medium body." },
              { icon: FaLeaf, title: "Europe", desc: "Coffee with chocolate hints and intense aroma." },
              { icon: FaSeedling, title: "Asia", desc: "Smooth, floral coffee with balanced acidity." },
              { icon: FaCoffee, title: "Oceania", desc: "Rich coffee with nutty notes and smooth body." },
              { icon: FaLeaf, title: "Africa", desc: "Bright coffee with citrus and floral notes." },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="flex flex-col items-center p-4 text-center transition-transform bg-white shadow-md sm:p-6 dark:bg-gray-800 rounded-2xl hover:-translate-y-1 hover:shadow-xl"
                >
                  <Icon className="w-8 h-8 mb-2 text-orange-500 sm:w-10 sm:h-10" />
                  <h3 className="mb-2 text-lg font-semibold text-gray-900 sm:text-xl dark:text-white">{item.title}</h3>
                  <p className="text-sm text-gray-600 sm:text-base dark:text-gray-300">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Featured Coffee */}
        <section className="mt-12 space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl md:text-3xl dark:text-white">Featured Coffee</h2>
          <div className="relative h-64 mt-4 overflow-hidden transition-shadow duration-500 shadow-2xl rounded-2xl group hover:shadow-3xl sm:h-80 md:h-96">
            <Image
              src={blazikenImg}
              alt="Featured Coffee"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white sm:p-6 bg-gradient-to-t from-black/70 to-transparent">
              <h3 className="text-lg font-semibold sm:text-xl">Blaziken Blend</h3>
              <p className="text-sm sm:text-base">Premium blend with notes of cocoa and caramel.</p>
            </div>
          </div>
        </section>
        <section className="px-4 py-8 mt-12 text-center shadow-inner sm:py-12 bg-orange-50 dark:bg-gray-900 rounded-2xl sm:px-6">
          <h2 className="mb-4 text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">
            Join Our Community
          </h2>
          <p className="mb-6 text-sm text-gray-700 sm:text-base dark:text-gray-300">
            Subscribe to receive news, promotions, and exclusive Blaziken Coffee recipes.
          </p>
          <button
            onClick={handleSubscribe}
            className="px-6 py-3 font-semibold text-white transition-transform bg-orange-500 rounded-lg shadow-lg sm:px-8 sm:py-4 hover:bg-orange-600 hover:scale-105"
          >
            Subscribe Now
          </button>
        </section>
      </div>
      {toastVisible && (
        <div className="fixed px-5 py-3 text-white shadow-lg bottom-5 right-5 rounded-xl bg-amber-700 dark:bg-amber-500 animate-fadeInOut">
          Subscribed!
        </div>
      )}
    </main>
  );
}