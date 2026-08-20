import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";

import HeroSlide from "./HeroSlide";
import HeroNavigation from "./HeroNavigation";
import { heroSlides } from "./heroData";

const HeroSlider = () => {

  const [currentSlide, setCurrentSlide] = useState(0);
  const nextSlide = () => {
      setCurrentSlide((prev) =>
        prev === heroSlides.length - 1 ? 0 : prev + 1
      );
    };

    const prevSlide = () => {
      setCurrentSlide((prev) =>
        prev === 0 ? heroSlides.length - 1 : prev - 1
      );
    };

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentSlide((prev) =>
          prev === heroSlides.length - 1 ? 0 : prev + 1
        );
      }, 5000);

      return () => clearInterval(interval);
    }, []);

  return (
    <div className="relative overflow-hidden">
      
      <AnimatePresence mode="wait">
        <HeroSlide
          key={currentSlide}
          slide={heroSlides[currentSlide]}
        />
      </AnimatePresence>

      <HeroNavigation
        prevSlide={prevSlide}
        nextSlide={nextSlide}
      />

    </div>
  );
};

export default HeroSlider;