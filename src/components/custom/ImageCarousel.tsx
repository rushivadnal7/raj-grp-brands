"use client";

import { useEffect, useState } from "react";

interface ImageCarouselProps {
  images: {
    src: string;
    alt: string;
  }[];
  interval?: number;
  autoplay?: boolean;
}

export function ImageCarousel({
  images,
  interval = 5000,
  autoplay = true,
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToNext = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      setIsTransitioning(false);
    }, 500); // Fade duration
  };

  const goToPrevious = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(
        (prevIndex) => (prevIndex - 1 + images.length) % images.length
      );
      setIsTransitioning(false);
    }, 500); // Fade duration
  };

  const goToSlide = (index: number) => {
    if (index === currentIndex) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsTransitioning(false);
    }, 500); // Fade duration
  };

  useEffect(() => {
    if (!autoplay) return;

    const timer = setInterval(() => {
      goToNext();
    }, interval);

    return () => clearInterval(timer);
  }, [autoplay, interval]);

  if (!images.length) return null;

  return (
    <div className="relative w-full h-full">
      {/* Image container */}
      <div className="relative w-full h-full overflow-hidden ">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-300 ease-in-out ${
              index === currentIndex
                ? isTransitioning
                  ? "opacity-50"
                  : "opacity-100"
                : "opacity-0"
            }`}
          >
            <img
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              className="w-full h-full object-contain"
            />
          </div>
        ))}
      </div>

      {/* Navigation dots - vertical on right side */}
      <div className="absolute top-1/2 md:-right-6 lg:right-4 -translate-y-1/2 flex flex-col space-y-2 max-sm:flex-row max-sm:space-y-0 max-sm:space-x-2 max-sm:bottom-20 max-sm:top-auto max-sm:left-24  max-sm:translate-y-0">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentIndex ? "bg-red-500" : "bg-gray-300"
            }`}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentIndex ? "true" : "false"}
          />
        ))}
      </div>
    </div>
  );
}
