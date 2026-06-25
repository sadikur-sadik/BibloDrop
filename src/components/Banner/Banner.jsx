'use client';

import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { ChevronLeft, ChevronRight } from '@gravity-ui/icons'
import Banner_1 from './BannerPages/Banner_1'
import Banner_2 from './BannerPages/Banner_2'
import Banner_3 from './BannerPages/Banner_3'

const Banner = () => {
  // Configured loop: true and Autoplay with a 4-second delay
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true }, 
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  )

  // Safe fallback methods for navigation
  const goToPrev = () => {
    if (emblaApi?.goToPrev) emblaApi.goToPrev();
    else emblaApi?.scrollPrev();
  };

  const goToNext = () => {
    if (emblaApi?.goToNext) emblaApi.goToNext();
    else emblaApi?.scrollNext();
  };

  return (
    <div className="embla relative w-full group max-w-360 mx-auto">
      {/* Viewport Wrapper - holds the slides cleanly without side gaps */}
      <div className="embla__viewport overflow-hidden rounded-3xl" ref={emblaRef}>
        <div className="embla__container flex">
          <div className="embla__slide flex-none w-full min-w-0"><Banner_1 /></div>
          <div className="embla__slide flex-none w-full min-w-0"><Banner_2 /></div>
          <div className="embla__slide flex-none w-full min-w-0"><Banner_3 /></div>
        </div>
      </div>

      {/* Prev Button - Always enabled */}
      <button 
        className="absolute left-6 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full flex items-center justify-center bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-slate-200/60 dark:border-slate-700/80 text-[#192230] dark:text-white hover:bg-white dark:hover:bg-slate-700 transition-all cursor-pointer shadow-lg"
        onClick={goToPrev} 
        aria-label="Scroll to previous"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Next Button - Always enabled */}
      <button 
        className="absolute right-6 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full flex items-center justify-center bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-slate-200/60 dark:border-slate-700/80 text-[#192230] dark:text-white hover:bg-white dark:hover:bg-slate-700 transition-all cursor-pointer shadow-lg"
        onClick={goToNext} 
        aria-label="Scroll to next"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  )
}

export default Banner;