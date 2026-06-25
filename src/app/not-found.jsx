'use client';

import React from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';

const NotFound = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <div className="min-h-screen max-w-360 mx-auto w-full bg-linear-to-br from-slate-50 to-slate-100 dark:from-[#192230] dark:to-[#2c2f38] text-[#192230] dark:text-white transition-colors duration-300 flex items-center justify-center p-6 md:p-12">
      
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative w-full max-w-5xl bg-white/50 dark:bg-[#2c2f38]/20 backdrop-blur-md rounded-3xl border border-slate-200/80 dark:border-gray-800 grid grid-cols-1 md:grid-cols-12 gap-8 px-6 md:px-16 py-10 md:py-16 items-center overflow-hidden"
      >
        {/* Subtle decorative background glow */}
        <div className="absolute right-0 top-0 w-80 h-80 bg-[#856a26]/5 dark:bg-[#ffcd00]/5 rounded-full blur-3xl pointer-events-none" />

        {/* Left Side: 404 Info & Navigation */}
        <div className="md:col-span-7 flex flex-col items-center md:items-start text-center md:text-left space-y-6 z-10 order-2 md:order-1">
          
          {/* Tag indicating state */}
          <div className="inline-flex items-center gap-2 bg-[#856a26]/10 border border-[#856a26]/30 dark:bg-[#ffcd00]/10 dark:border-[#ffcd00]/30 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#856a26] dark:text-[#ffcd00] tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-[#856a26] dark:bg-[#ffcd00] animate-pulse"></span>
            404 - Page Not Found
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Lost in the <br />
            <span className="text-[#856a26] dark:text-[#ffcd00]">Archives.</span>
          </h1>

          <p className="text-[#3d474e] dark:text-[#9ea7b3] text-sm md:text-base max-w-lg leading-relaxed">
            The shelf resource or page you are looking for has been moved, archived, or does not exist in our digital catalog database.
          </p>

          {/* Navigational Links with modern Link routing */}
          <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-2 w-full">
            <Link 
              href="/" 
              className="bg-[#192230] text-white hover:bg-[#2c2f38] dark:bg-[#ffcd00] dark:text-[#192230] dark:hover:bg-[#ffe066] px-8 py-3.5 rounded-full font-bold transition-all transform hover:-translate-y-0.5 shadow-lg shadow-gray-200 dark:shadow-[#ffcd00]/20 text-sm cursor-pointer flex items-center justify-center"
            >
              Return Home
            </Link>
            
            <Link 
              href="/books?page=1" 
              className="bg-slate-200/60 border border-slate-300/80 dark:bg-[#3d474e]/40 dark:border-gray-700 dark:hover:bg-[#3d474e]/60 px-8 py-3.5 rounded-full font-semibold transition-all transform hover:-translate-y-0.5 text-sm cursor-pointer flex items-center justify-center"
            >
              Browse Books
            </Link>
          </div>
        </div>

        {/* Right Side: Thematic Book Search Illustration */}
        <div className="md:col-span-5 flex justify-center items-center h-full min-h-62.5 order-1 md:order-2 z-10">
          <svg viewBox="0 0 400 400" className="w-full max-w-70 md:max-w-[320px] h-auto drop-shadow-2xl">
            {/* Background base circle */}
            <circle cx="200" cy="200" r="160" className="fill-slate-200/40 dark:fill-[#2c2f38]/60 stroke-slate-300/80 dark:stroke-[#3d474e]" strokeWidth="2" />
            
            {/* Stylized open book with a missing page/search indicator */}
            <g transform="translate(100, 110)">
              {/* Main Book Backing */}
              <rect x="20" y="40" width="160" height="110" rx="12" className="fill-slate-100 dark:fill-[#192230] stroke-slate-300 dark:stroke-[#3d474e]" strokeWidth="3" />
              
              {/* Left & Right Pages */}
              <path d="M25,45 C65,35 100,45 100,45 C100,45 135,35 175,45 L175,135 C135,125 100,135 100,135 C100,135 65,125 25,135 Z" className="fill-white dark:fill-[#2c2f38] stroke-slate-300 dark:stroke-[#3d474e]" strokeWidth="2" />
              
              {/* Book spine middle line */}
              <line x1="100" y1="45" x2="100" y2="135" className="stroke-slate-300 dark:stroke-[#3d474e]" strokeWidth="2" />

              {/* Text line representations in book */}
              <line x1="40" y1="65" x2="80" y2="65" className="stroke-slate-200 dark:stroke-slate-700" strokeWidth="3" strokeLinecap="round" />
              <line x1="40" y1="80" x2="70" y2="80" className="stroke-slate-200 dark:stroke-slate-700" strokeWidth="3" strokeLinecap="round" />
              <line x1="40" y1="95" x2="75" y2="95" className="stroke-slate-200 dark:stroke-slate-700" strokeWidth="3" strokeLinecap="round" />
              
              <line x1="120" y1="65" x2="160" y2="65" className="stroke-slate-200 dark:stroke-slate-700" strokeWidth="3" strokeLinecap="round" />
              <line x1="120" y1="80" x2="150" y2="80" className="stroke-slate-200 dark:stroke-slate-700" strokeWidth="3" strokeLinecap="round" />
              <line x1="120" y1="95" x2="155" y2="95" className="stroke-slate-200 dark:stroke-slate-700" strokeWidth="3" strokeLinecap="round" />
            </g>

            {/* Magnifying glass overlay searching for the "missing" item */}
            <motion.g
              animate={{ 
                x: [0, 15, -10, 0],
                y: [0, -10, 5, 0] 
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 6, 
                ease: 'easeInOut' 
              }}
            >
              <g transform="translate(160, 150)">
                {/* Magnifying Glass Handle */}
                <line x1="45" y1="45" x2="75" y2="75" className="stroke-[#856a26] dark:stroke-[#ffcd00]" strokeWidth="6" strokeLinecap="round" />
                
                {/* Glass Border */}
                <circle cx="25" cy="25" r="28" className="fill-slate-50/90 dark:fill-[#192230]/90 stroke-[#856a26] dark:stroke-[#ffcd00]" strokeWidth="4" />
                
                {/* Question mark inside magnifying glass */}
                <text x="25" y="34" textAnchor="middle" className="fill-[#192230] dark:fill-white font-extrabold text-2xl font-sans">?</text>
              </g>
            </motion.g>

            {/* Decorative accent stars */}
            <motion.g
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            >
              <path d="M80,120 L84,124 M76,124 L80,120" className="stroke-[#856a26] dark:stroke-[#ffcd00]" strokeWidth="2" strokeLinecap="round" />
              <path d="M310,130 L314,134" className="stroke-[#856a26] dark:stroke-[#ffcd00]" strokeWidth="2" strokeLinecap="round" />
            </motion.g>
          </svg>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;