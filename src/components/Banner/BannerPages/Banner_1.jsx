'use client';

import React from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';

const Banner_1 = () => {
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
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="relative w-full h-auto min-h-145 md:h-125 bg-linear-to-br from-slate-50 to-slate-100 dark:from-[#192230] dark:to-[#2c2f38] text-[#192230] dark:text-white overflow-hidden rounded-3xl border border-slate-200/80 dark:border-gray-800 grid grid-cols-1 md:grid-cols-12 gap-8 px-12 md:px-20 py-8 md:py-12 items-center transition-colors duration-300"
    >
      {/* Visual background accents */}
      <div className="absolute right-0 top-0 w-80 h-80 bg-[#856a26]/5 dark:bg-[#ffcd00]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Text Content (Centering classes added here) */}
      <div className="md:col-span-7 z-10 flex flex-col items-center md:items-start text-center md:text-left space-y-5 order-2 md:order-1">
        <motion.div 
          variants={itemVariants} 
          className="inline-flex items-center gap-2 bg-[#856a26]/10 border border-[#856a26]/30 dark:bg-[#ffcd00]/10 dark:border-[#ffcd00]/30 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#856a26] dark:text-[#ffcd00] tracking-wider uppercase"
        >
          <span className="w-2 h-2 rounded-full bg-[#856a26] dark:bg-[#ffcd00] animate-pulse"></span>
          Readers & Students
        </motion.div>

        <motion.h1 
          variants={itemVariants} 
          className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight"
        >
          Your Local Library, <br />
          <span className="text-[#856a26] dark:text-[#ffcd00]">Delivered.</span>
        </motion.h1>

        <motion.p 
          variants={itemVariants} 
          className="text-[#3d474e] dark:text-[#9ea7b3] text-sm md:text-base max-w-lg mx-auto md:mx-0 leading-relaxed"
        >
          Browse local library catalogs and independent book collections. Request secure doorstep delivery with real-time tracking, democratizing literature access for everyone.
        </motion.p>

        {/* Buttons Centered on Mobile */}
        <motion.div variants={itemVariants} className="flex flex-wrap justify-center md:justify-start gap-4 pt-2 w-full">
       <Link href="/books">
            <button className="bg-[#192230] text-white hover:bg-[#2c2f38] dark:bg-[#ffcd00] dark:text-[#192230] dark:hover:bg-[#ffe066] px-8 py-3.5 rounded-full font-bold transition-all transform hover:-translate-y-0.5 shadow-lg shadow-gray-200 dark:shadow-[#ffcd00]/20 text-sm cursor-pointer">
              Browse Books
            </button>
          </Link>
          <Link href="/signup">
            <button className="bg-slate-200/60 border border-slate-300/80 dark:bg-[#3d474e]/40 dark:border-gray-700 dark:hover:bg-[#3d474e]/60 px-8 py-3.5 rounded-full font-semibold transition-all transform hover:-translate-y-0.5 text-sm cursor-pointer">
              Get Started
            </button>
          </Link>
        </motion.div>
      </div>

      {/* Premium SVG Illustration (Right 5 Columns) */}
      <motion.div 
        variants={itemVariants} 
        className="md:col-span-5 flex justify-center items-center h-full min-h-62.5 relative order-1 md:order-2"
      >
        <svg viewBox="0 0 400 400" className="w-full max-w-70 md:max-w-[320px] h-auto drop-shadow-2xl">
          <circle cx="200" cy="200" r="160" className="fill-slate-200/60 dark:fill-[#2c2f38] stroke-slate-300/80 dark:stroke-[#3d474e]" opacity="0.6" strokeWidth="2" />
          
          <path d="M120,320 L120,200 L200,140 L280,200 L280,320 Z" className="fill-slate-100 dark:fill-[#192230] stroke-slate-300 dark:stroke-[#3d474e]" strokeWidth="3" />
          <rect x="175" y="240" width="50" height="80" rx="4" className="fill-slate-200 dark:fill-[#3d474e]" />
          <circle cx="215" cy="280" r="3" className="fill-[#856a26] dark:fill-[#ffcd00]" />

          <path d="M200,320 C200,350 150,340 100,380" className="stroke-[#856a26] dark:stroke-[#ffcd00]" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.8" />
          
          <g transform="translate(140, 90)">
            <motion.circle 
              animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
              cx="60" cy="50" r="45" className="fill-[#856a26] dark:fill-[#ffcd00]" opacity="0.2" 
            />
            
            <rect x="25" y="30" width="70" height="40" rx="6" className="fill-[#856a26] dark:fill-[#ffcd00]" />
            <path d="M30,30 C45,20 60,25 60,25 C60,25 75,20 90,30 L90,65 C75,55 60,60 60,60 C60,60 45,55 30,65 Z" className="fill-slate-50 dark:fill-white" />
            <line x1="40" y1="40" x2="52" y2="40" className="stroke-[#856a26] dark:stroke-[#3d474e]" strokeWidth="2" strokeLinecap="round" />
            <line x1="40" y1="48" x2="52" y2="48" className="stroke-[#856a26] dark:stroke-[#3d474e]" strokeWidth="2" strokeLinecap="round" />
            <line x1="68" y1="40" x2="80" y2="40" className="stroke-[#856a26] dark:stroke-[#3d474e]" strokeWidth="2" strokeLinecap="round" />
            <line x1="68" y1="48" x2="80" y2="48" className="stroke-[#856a26] dark:stroke-[#3d474e]" strokeWidth="2" strokeLinecap="round" />
          </g>

          <motion.g
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
          >
            <g transform="translate(260, 210)">
              <rect width="40" height="30" rx="4" className="fill-slate-200 dark:fill-[#3d474e]" />
              <rect x="15" y="0" width="10" height="30" className="fill-[#856a26] dark:fill-[#ffcd00]" />
              <rect x="0" y="12" width="40" height="6" className="fill-[#856a26] dark:fill-[#ffcd00]" />
            </g>
          </motion.g>

          <motion.g
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
          >
            <path d="M90,160 L92,165 L97,165 L93,169 L95,174 L90,171 L85,174 L87,169 L83,165 L88,165 Z" className="fill-[#856a26] dark:fill-[#ffcd00]" />
            <path d="M300,120 L301,123 L305,123 L302,126 L303,130 L300,128 L297,130 L298,126 L295,123 L299,123 Z" className="fill-[#856a26] dark:fill-[#ffcd00]" />
          </motion.g>
        </svg>
      </motion.div>
    </motion.div>
  );
};

export default Banner_1;