'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

// Minimal, modern SVG components for each genre
const FictionIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 md:w-9 md:h-9">
    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
    <path d="M6 6h10M6 10h10" />
    <path d="M19 2v18" />
  </svg>
);

const NonFictionIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 md:w-9 md:h-9">
    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z" />
    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z" />
  </svg>
);

const SciFiIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 md:w-9 md:h-9">
    <path d="M12 2L2 22l10-4 10 4L12 2Z" />
    <path d="M12 2v16" />
    <circle cx="12" cy="9" r="2.5" />
  </svg>
);

const FantasyIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 md:w-9 md:h-9">
    <path d="m19 3-4 4M15 3l4 4M21 21l-9-9M12 6l.01-.01M16 10l.01-.01M9 3l.01-.01" />
    <path d="M11 15.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" />
  </svg>
);

const MysteryIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 md:w-9 md:h-9">
    <circle cx="11" cy="11" r="7" />
    <path d="m21 21-4.3-4.3" />
    <path d="M9 10a2 2 0 0 1 4 0c0 1.5-2 2-2 3" />
    <line x1="11" y1="16" x2="11.01" y2="16" strokeWidth="2" />
  </svg>
);

const BiographyIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 md:w-9 md:h-9">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const HistoryIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 md:w-9 md:h-9">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </svg>
);

const ReligionIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 md:w-9 md:h-9">
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    <path d="M19 3v4M17 5h4" strokeWidth="1" />
  </svg>
);

const ScienceTechIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 md:w-9 md:h-9">
    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z" />
    <circle cx="12" cy="12" r="3" />
    <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
  </svg>
);

const SelfHelpIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 md:w-9 md:h-9">
    <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" />
    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
    <line x1="9" y1="9" x2="9.01" y2="9" strokeWidth="2" />
    <line x1="15" y1="9" x2="15.01" y2="9" strokeWidth="2" />
  </svg>
);

const BusinessFinanceIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 md:w-9 md:h-9">
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

const PoetryIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 md:w-9 md:h-9">
    <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
    <line x1="16" y1="8" x2="2" y2="22" />
  </svg>
);

const ClassicsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 md:w-9 md:h-9">
    <rect x="3" y="2" width="18" height="4" rx="1" />
    <rect x="3" y="18" width="18" height="4" rx="1" />
    <line x1="7" y1="6" x2="7" y2="18" />
    <line x1="12" y1="6" x2="12" y2="18" />
    <line x1="17" y1="6" x2="17" y2="18" />
  </svg>
);

const GENRES = [
  { id: "fiction", name: "Fiction", icon: FictionIcon },
  { id: "non-fiction", name: "Non-Fiction", icon: NonFictionIcon },
  { id: "sci-fi", name: "Science Fiction", icon: SciFiIcon },
  { id: "fantasy", name: "Fantasy", icon: FantasyIcon },
  { id: "mystery-thriller", name: "Mystery & Thriller", icon: MysteryIcon },
  { id: "biography-memoir", name: "Biography & Memoir", icon: BiographyIcon },
  { id: "history", name: "History", icon: HistoryIcon },
  { id: "religion-spirituality", name: "Religion & Spirituality", icon: ReligionIcon },
  { id: "science-tech", name: "Science & Tech", icon: ScienceTechIcon },
  { id: "self-help", name: "Self-Help", icon: SelfHelpIcon },
  { id: "business-finance", name: "Business & Finance", icon: BusinessFinanceIcon },
  { id: "poetry", name: "Poetry", icon: PoetryIcon },
  { id: "classics", name: "Classics", icon: ClassicsIcon },
];

const CategoryCarousel = () => {
  const [emblaRef] = useEmblaCarousel(
    { 
      loop: true, 
      align: 'start', 
      dragFree: true 
    },
    [Autoplay({ delay: 1500, stopOnInteraction: false })]
  );

  const containerVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut', staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="w-full bg-slate-50 dark:bg-[#192230] text-[#192230] dark:text-white py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300 relative overflow-hidden select-none">
      {/* Background accents */}
      <div className="absolute right-0 top-0 w-80 h-80 bg-[#856a26]/5 dark:bg-[#ffcd00]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute left-0 bottom-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Changed once to false to allow repeating animations on entry/exit */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-100px" }}
        variants={containerVariants}
        className="max-w-7xl mx-auto space-y-12 relative z-10"
      >
        {/* Corrected Centered Header Block */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <motion.span 
            variants={itemVariants}
            className="inline-flex items-center gap-2 bg-[#856a26]/10 border border-[#856a26]/30 dark:bg-[#ffcd00]/10 dark:border-[#ffcd00]/30 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#856a26] dark:text-[#ffcd00] uppercase tracking-wider"
          >
            <span className="w-2 h-2 rounded-full bg-[#856a26] dark:bg-[#ffcd00] animate-pulse"></span>
            Explore Genres
          </motion.span>
          
          <motion.h2 
            variants={itemVariants}
            className="text-3xl md:text-4xl font-black tracking-tight text-[#192230] dark:text-white"
          >
            Browse Books By <span className="text-[#856a26] dark:text-[#ffcd00]">Categories</span>
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-[#3d474e] dark:text-[#9ea7b3] text-sm md:text-base leading-relaxed max-w-xl mx-auto"
          >
            Discover hand-picked literature collections curated by our trusted local hosts and decentralized neighborhood libraries.
          </motion.p>
        </div>

        {/* Responsive Embla Viewport */}
        {/* Shows exactly 2 categories (flex-[0_0_50%]) on mobile devices (xs) */}
        <motion.div 
          variants={itemVariants}
          className="overflow-hidden cursor-grab active:cursor-grabbing px-2" 
          ref={emblaRef}
        >
          <div className="flex py-4">
            {GENRES.map((genre) => {
              const Icon = genre.icon;
              return (
                <div 
                  key={genre.id} 
                  className="flex-[0_0_50%] min-w-0 sm:flex-[0_0_25%] md:flex-[0_0_20%] lg:flex-[0_0_12.5%] px-2 text-center"
                >
                  <Link
                    href={`/books?category=${genre.id}&page=1`}
                    className="group flex flex-col items-center gap-3.5 focus:outline-hidden"
                  >
                    {/* Circle Container */}
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center bg-white dark:bg-[#2c2f38] border border-slate-200/80 dark:border-gray-800 text-[#856a26] dark:text-[#ffcd00] shadow-md hover:shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:border-[#856a26] dark:group-hover:border-[#ffcd00] group-hover:bg-[#856a26]/5 dark:group-hover:bg-[#ffcd00]/5">
                      <div className="transition-transform duration-300 group-hover:rotate-3">
                        <Icon />
                      </div>
                    </div>

                    {/* Label */}
                    <span className="text-xs md:text-sm font-bold text-[#192230] dark:text-slate-200 group-hover:text-[#856a26] dark:group-hover:text-[#ffcd00] transition-colors duration-200 line-clamp-2 max-w-27.5 sm:max-w-full px-1">
                      {genre.name}
                    </span>
                  </Link>
                </div>
              );
            })}
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
};

export default CategoryCarousel;