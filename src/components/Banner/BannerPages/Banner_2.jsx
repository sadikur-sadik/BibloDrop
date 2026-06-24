'use client';

import React from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';

const Banner_2 = () => {
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
      className="relative w-full h-auto min-h-145 md:h-125 bg-linear-to-br from-slate-50 to-slate-100 dark:from-[#2c2f38] dark:to-[#192230] text-[#192230] dark:text-white overflow-hidden border border-slate-200/80 dark:border-gray-800 grid grid-cols-1 md:grid-cols-12 gap-8 px-12 md:px-20 py-8 md:py-12 items-center transition-colors duration-300"
    >
      {/* Visual background accents */}
      <div className="absolute left-0 bottom-0 w-80 h-80 bg-slate-300/10 dark:bg-[#3d474e]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Text Content (Responsive centering layout applied here) */}
      <div className="md:col-span-7 z-10 flex flex-col items-center md:items-start text-center md:text-left space-y-5 order-2 md:order-1">
        <motion.div 
          variants={itemVariants} 
          className="inline-flex items-center gap-2 bg-[#856a26]/10 border border-[#856a26]/30 dark:bg-[#ffcd00]/10 dark:border-[#ffcd00]/30 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#856a26] dark:text-[#ffcd00] tracking-wider uppercase"
        >
          <span className="w-2 h-2 rounded-full bg-[#856a26] dark:bg-[#ffcd00] animate-pulse"></span>
          Librarians & Providers
        </motion.div>

        <motion.h1 
          variants={itemVariants} 
          className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight"
        >
          Share Your Shelf. <br />
          <span className="text-[#856a26] dark:text-[#ffcd00]">Manage Deliveries.</span>
        </motion.h1>

        <motion.p 
          variants={itemVariants} 
          className="text-[#3d474e] dark:text-[#9ea7b3] text-sm md:text-base max-w-lg mx-auto md:mx-0 leading-relaxed"
        >
          List your catalog, manage pending requests, and dispatch books with ease. Expand your local community presence through a secure, cloud-hosted delivery dashboard.
        </motion.p>

        {/* Buttons Centered on Mobile */}
        <motion.div variants={itemVariants} className="flex flex-wrap justify-center md:justify-start gap-4 pt-2 w-full">
           <Link href="/books?page=1">
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
          <circle cx="200" cy="200" r="160" className="fill-slate-200/60 dark:fill-[#192230] stroke-slate-300/80 dark:stroke-[#3d474e]" opacity="0.6" strokeWidth="2" />
          
          <rect x="80" y="280" width="240" height="12" rx="4" className="fill-slate-300 dark:fill-[#3d474e]" />
          
          <g transform="translate(100, 150)">
            <rect x="10" y="40" width="30" height="90" rx="3" className="fill-slate-200 dark:fill-[#3d474e] stroke-[#192230] dark:stroke-[#192230]" strokeWidth="2" />
            <rect x="15" y="50" width="20" height="10" rx="1" className="fill-[#856a26] dark:fill-[#ffcd00]" opacity="0.8" />
            
            <g transform="rotate(12, 50, 130)">
              <rect x="50" y="40" width="32" height="90" rx="3" className="fill-slate-100 dark:fill-[#192230] stroke-slate-300 dark:stroke-[#3d474e]" strokeWidth="2" />
              <line x1="55" y1="60" x2="77" y2="60" className="stroke-[#856a26] dark:stroke-[#ffcd00]" strokeWidth="2" />
              <line x1="55" y1="70" x2="77" y2="70" className="stroke-[#856a26] dark:stroke-[#ffcd00]" strokeWidth="2" />
            </g>

            <rect x="100" y="20" width="35" height="110" rx="3" className="fill-[#856a26] dark:fill-[#ffcd00]" />
            <rect x="108" y="35" width="19" height="15" rx="1" className="fill-slate-100 dark:fill-[#192230]" />
            <line x1="108" y1="70" x2="127" y2="70" className="stroke-slate-100 dark:stroke-[#192230]" strokeWidth="3" />
            <line x1="108" y1="80" x2="127" y2="80" className="stroke-slate-100 dark:stroke-[#192230]" strokeWidth="3" />

            <rect x="145" y="50" width="28" height="80" rx="3" className="fill-slate-200 dark:fill-[#3d474e] stroke-[#192230] dark:stroke-[#192230]" strokeWidth="2" />
          </g>

          <g transform="translate(160, 50)">
            <motion.g
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            >
              <circle cx="40" cy="40" r="30" className="fill-slate-100 dark:fill-[#2c2f38] stroke-slate-300 dark:stroke-[#3d474e]" strokeWidth="2" />
              <path d="M40,22 L40,48 M40,22 L30,32 M40,22 L50,32" className="stroke-[#856a26] dark:stroke-[#ffcd00]" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </motion.g>
          </g>

          <motion.g
            animate={{ x: [0, 5, 0], y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
          >
            <g transform="translate(230, 110)">
              <rect width="80" height="26" rx="13" className="fill-slate-100 dark:fill-[#192230] stroke-slate-300 dark:stroke-[#3d474e]" strokeWidth="1.5" />
              <circle cx="15" cy="13" r="4" className="fill-[#856a26] dark:fill-[#ffcd00]" />
              <text x="28" y="17" className="fill-[#192230] dark:fill-white" fontSize="9" fontWeight="bold">Published</text>
            </g>
          </motion.g>
        </svg>
      </motion.div>
    </motion.div>
  );
};

export default Banner_2;