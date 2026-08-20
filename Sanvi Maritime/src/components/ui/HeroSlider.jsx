import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ShieldCheck, Anchor, ArrowRight, Award } from 'lucide-react';
import { Button } from '../common/Button';
import { useRfq } from '../../context/RfqContext';

export const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { openQuoteModalForProduct } = useRfq();

  const slides = [
    {
      id: 1,
      title: "WIDE RANGE OF MARINE SPARE PARTS",
      subtitle: "Brand New & Certified Reconditioned Spares Sourced Globally",
      description: "Leading global trader of high-grade marine main engine, generator, air compressor, and turbocharger spare parts in Kalyan (Mumbai).",
      bgImage: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=1600&auto=format&fit=crop&q=80",
      ctaText: "Explore Spares Catalog",
      ctaLink: "/products"
    },
    {
      id: 2,
      title: "EXPANSIVE ARRAY OF MARINE SPARES",
      subtitle: "Direct Sourcing from Alang Ship Recycling Yard",
      description: "Partnered with Asia's largest ship recycling facility in Alang, offering genuine inspected OEM parts at competitive prices.",
      bgImage: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1600&auto=format&fit=crop&q=80",
      ctaText: "Check New Arrivals",
      ctaLink: "/new-arrivals"
    },
    {
      id: 3,
      title: "ASIA'S LEADING SPARE PARTS PROVIDING COMPANY",
      subtitle: "Worldwide Express Port Delivery & Afloat Overhauling",
      description: "Fast turnaround custom clearance and port delivery to over 120 global maritime destinations with class inspection reports.",
      bgImage: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1600&auto=format&fit=crop&q=80",
      ctaText: "Our Services",
      ctaLink: "/services"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative bg-navy-950 text-white min-h-[540px] lg:min-h-[620px] flex items-center overflow-hidden">

      {/* Background Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
        >
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/80 to-navy-950/40 z-10" />
          <img
            src={slide.bgImage}
            alt={slide.title}
            className="w-full h-full object-cover object-center scale-105 transition-transform duration-10000"
          />
        </div>
      ))}

      {/* Foreground Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="max-w-2xl space-y-6 animate-fadeIn">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-400/20 text-amber-300 rounded-full border border-amber-400/30 text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
            <Anchor className="w-3.5 h-3.5" />
            <span>{slides[currentSlide].subtitle}</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-5xl font-black font-heading text-white tracking-tight leading-tight">
            {slides[currentSlide].title}
          </h1>

          {/* Description */}
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
            {slides[currentSlide].description}
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link to={slides[currentSlide].ctaLink}>
              <Button variant="gold" size="lg" icon={ArrowRight} iconPosition="right">
                {slides[currentSlide].ctaText}
              </Button>
            </Link>
          </div>

          {/* Key highlights pill bar */}
          <div className="pt-6 border-t border-slate-700/50 flex flex-wrap items-center gap-6 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>DNV & GL Certified Testing</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Alang Shipyard Partnership</span>
            </div>
          </div>

        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => setCurrentSlide((currentSlide - 1 + slides.length) % slides.length)}
        className="absolute left-4 z-30 p-3 rounded-full bg-navy-900/60 text-white hover:bg-amber-400 hover:text-navy-950 transition-colors backdrop-blur-sm hidden sm:flex"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={() => setCurrentSlide((currentSlide + 1) % slides.length)}
        className="absolute right-4 z-30 p-3 rounded-full bg-navy-900/60 text-white hover:bg-amber-400 hover:text-navy-950 transition-colors backdrop-blur-sm hidden sm:flex"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`w-3 h-3 rounded-full transition-all ${idx === currentSlide ? 'bg-amber-400 w-8' : 'bg-slate-500/60 hover:bg-slate-300'
              }`}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>

    </div>
  );
};
