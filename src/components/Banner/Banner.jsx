'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from '@gravity-ui/icons';
import Banner_1 from './BannerPages/Banner_1';
import Banner_2 from './BannerPages/Banner_2';
import Banner_3 from './BannerPages/Banner_3';

const SLIDES = [Banner_1, Banner_2, Banner_3];

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const goToPrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
  };

  const CurrentSlide = SLIDES[currentIndex];

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir) => ({
      x: dir < 0 ? '100%' : '-100%',
      opacity: 0,
    }),
  };

  return (
    <div className="relative w-full group max-w-7xl xl:max-w-[1600px] 2xl:max-w-[1800px] 3xl:max-w-[2200px] 4k:max-w-[2500px] mx-auto px-4 sm:px-6 xl:px-8 4k:px-12">
      {/* Viewport Wrapper - single container holding card border, background clipping & rounding */}
      <div className="relative w-full overflow-hidden rounded-3xl border border-slate-200/80 dark:border-gray-800 shadow-xl min-h-[440px] sm:min-h-[480px] md:min-h-[500px]">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 260, damping: 28 },
              opacity: { duration: 0.25 },
            }}
            className="w-full h-full"
          >
            <CurrentSlide />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Prev Button - Always enabled */}
      <button 
        className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-slate-200/60 dark:border-slate-700/80 text-[#192230] dark:text-white hover:bg-white dark:hover:bg-slate-700 transition-all cursor-pointer shadow-lg"
        onClick={goToPrev} 
        aria-label="Scroll to previous"
      >
        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>

      {/* Next Button - Always enabled */}
      <button 
        className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-slate-200/60 dark:border-slate-700/80 text-[#192230] dark:text-white hover:bg-white dark:hover:bg-slate-700 transition-all cursor-pointer shadow-lg"
        onClick={goToNext} 
        aria-label="Scroll to next"
      >
        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>
    </div>
  );
};

export default Banner;