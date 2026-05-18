"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

type PhotoStripItem = {
  src: string;
  alt: string;
  caption: string;
};

interface WhatWeDoCarouselProps {
  items: PhotoStripItem[];
}

export function WhatWeDoCarousel({ items }: WhatWeDoCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (items.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [items.length]);

  if (items.length === 0) return null;

  const currentItem = items[currentIndex];

  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            What We <span className="gradient-text">Do</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A quick visual snapshot of the work our companies deliver.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="glass rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300">
            <div className="relative aspect-[16/9] bg-black/20">
              <Image
                key={currentItem.src}
                src={currentItem.src}
                alt={currentItem.alt}
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover transition-opacity duration-700 ease-in-out"
                unoptimized={currentItem.src.endsWith(".svg")}
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-white font-semibold text-xl">
                  {currentItem.caption}
                </p>
              </div>
            </div>
          </div>

          {/* Carousel dots */}
          <div className="flex gap-2 justify-center mt-8">
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-green-400 w-8"
                    : "bg-gray-600 w-2 hover:bg-gray-500"
                }`}
                aria-label={`Go to photo ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
