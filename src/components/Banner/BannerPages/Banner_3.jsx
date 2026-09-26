'use client';

import React from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';

const Banner_3 = () => {
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
      className="relative w-full h-auto min-h-145 md:h-125 xl:min-h-[550px] 2xl:min-h-[650px] 3xl:min-h-[700px] 4k:min-h-[750px] bg-linear-to-br from-slate-50 to-slate-100 dark:from-[#192230] dark:via-[#2c2f38] dark:to-[#192230] text-[#192230] dark:text-white overflow-hidden rounded-3xl border border-slate-200/80 dark:border-gray-800 grid grid-cols-1 md:grid-cols-12 gap-8 xl:gap-12 2xl:gap-16 4k:gap-20 px-12 md:px-20 xl:px-24 2xl:px-32 3xl:px-36 4k:px-40 py-8 md:py-12 xl:py-16 2xl:py-20 4k:py-24 items-center transition-colors duration-300"
    >
      {/* Visual background accents */}
      <div className="absolute right-10 bottom-0 w-80 h-80 4k:w-[500px] 4k:h-[500px] bg-[#856a26]/5 dark:bg-[#ffcd00]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Text Content (Responsive centering layout applied here) */}
      <div className="md:col-span-7 z-10 flex flex-col items-center md:items-start text-center md:text-left space-y-5 xl:space-y-7 2xl:space-y-8 4k:space-y-10 order-2 md:order-1">
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 bg-[#856a26]/10 border border-[#856a26]/30 dark:bg-[#ffcd00]/10 dark:border-[#ffcd00]/30 px-3.5 py-1.5 xl:px-4 xl:py-2 4k:px-6 4k:py-3 rounded-full text-xs xl:text-sm 4k:text-base font-semibold text-[#856a26] dark:text-[#ffcd00] tracking-wider uppercase"
        >
          <span className="w-2 h-2 4k:w-3 4k:h-3 rounded-full bg-[#856a26] dark:bg-[#ffcd00] animate-pulse"></span>
          Safe & Trustworthy
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl 3xl:text-7xl 4k:text-8xl font-black tracking-tight leading-tight"
        >
          Verified Reviews. <br />
          <span className="text-[#856a26] dark:text-[#ffcd00]">Secure Payments.</span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-[#3d474e] dark:text-[#9ea7b3] text-sm md:text-base xl:text-lg 2xl:text-xl 3xl:text-2xl 4k:text-2xl max-w-lg xl:max-w-xl 2xl:max-w-2xl 3xl:max-w-3xl 4k:max-w-4xl mx-auto md:mx-0 leading-relaxed"
        >
          Pay delivery fees safely through integrated Stripe checkout channels. Our system ensures honest feedback by only allowing reviews from verified, completed book deliveries.
        </motion.p>

        {/* Buttons Centered on Mobile */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center md:justify-start items-center md:items-start gap-4 pt-2 w-full xl:gap-6 4k:gap-8">
          <Link href="/books?page=1" className="w-full sm:w-48 xl:w-56 3xl:w-60 4k:w-64">
            <button className="w-full bg-[#192230] text-white hover:bg-[#2c2f38] dark:bg-[#ffcd00] dark:text-[#192230] dark:hover:bg-[#ffe066] px-8 py-3.5 xl:py-4 4k:py-5 rounded-full font-bold transition-all transform hover:-translate-y-0.5 shadow-lg shadow-gray-200 dark:shadow-[#ffcd00]/20 text-sm xl:text-base 3xl:text-lg 4k:text-xl cursor-pointer text-center">
              Browse Books
            </button>
          </Link>

          <Link href="/signup" className="w-full sm:w-48 xl:w-56 3xl:w-60 4k:w-64">
            <button className="w-full bg-slate-200/60 border border-slate-300/80 dark:bg-[#3d474e]/40 dark:border-gray-700 dark:hover:bg-[#3d474e]/60 px-8 py-3.5 xl:py-4 4k:py-5 rounded-full font-semibold transition-all transform hover:-translate-y-0.5 text-sm xl:text-base 3xl:text-lg 4k:text-xl cursor-pointer text-center">
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
        <svg viewBox="0 0 400 400" className="w-full max-w-70 md:max-w-[320px] xl:max-w-[420px] 2xl:max-w-[520px] 3xl:max-w-[580px] 4k:max-w-[650px] max-h-[600px] 2xl:max-h-[750px] 4k:max-h-[850px] object-contain h-auto drop-shadow-2xl">
          <circle cx="200" cy="200" r="160" className="fill-slate-200/60 dark:fill-[#2c2f38] stroke-slate-300/80 dark:stroke-[#3d474e]" opacity="0.6" strokeWidth="2" />

          <g transform="translate(110, 100)">
            <motion.path
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              d="M90,30 L160,50 L160,110 C160,160 120,200 90,210 C60,200 20,160 20,110 L20,50 Z"
              className="fill-slate-100 dark:fill-[#192230] stroke-slate-300 dark:stroke-[#3d474e]"
              strokeWidth="3"
            />
            <path d="M90,42 L145,58 L145,110 C145,148 115,180 90,192 C65,180 35,148 35,110 L35,58 Z" className="fill-slate-200 dark:fill-[#2c2f38]" opacity="0.5" />
          </g>

          <g transform="translate(230, 210)">
            <motion.circle
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 15, ease: 'linear' }}
              cx="40" cy="40" r="35" fill="none" className="stroke-[#856a26] dark:stroke-[#ffcd00]" strokeWidth="2" strokeDasharray="6 4"
            />
            <circle cx="40" cy="40" r="30" className="fill-[#856a26] dark:fill-[#ffcd00]" />

            <rect x="25" y="28" width="30" height="20" rx="3" className="fill-slate-100 dark:fill-[#192230]" />
            <rect x="30" y="33" width="7" height="10" rx="1" className="fill-[#856a26] dark:fill-[#ffcd00]" />
            <circle cx="47" cy="38" r="4" className="fill-[#3d474e] dark:fill-[#3d474e]" />
          </g>

          <motion.g
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
            transform="translate(60, 140)"
          >
            <rect width="110" height="50" rx="10" className="fill-slate-100 dark:fill-[#2c2f38] stroke-slate-300 dark:stroke-[#3d474e]" strokeWidth="2" />
            <path d="M15,18 L17,21 L22,21 L18,24 L19,28 L15,26 L11,28 L12,24 L8,21 L13,21 Z" className="fill-[#856a26] dark:fill-[#ffcd00]" />
            <path d="M28,18 L30,21 L35,21 L31,24 L32,28 L28,26 L24,28 L25,24 L21,21 L26,21 Z" className="fill-[#856a26] dark:fill-[#ffcd00]" />
            <path d="M41,18 L43,21 L48,21 L44,24 L45,28 L41,26 L37,28 L38,24 L34,21 L39,21 Z" className="fill-[#856a26] dark:fill-[#ffcd00]" />
            <text x="12" y="40" className="fill-[#192230] dark:fill-white" fontSize="9" fontWeight="bold">Verified Reader</text>
          </motion.g>

          <line x1="170" y1="210" x2="230" y2="245" className="stroke-slate-300 dark:stroke-[#3d474e]" strokeWidth="2" strokeDasharray="4 4" />
          <line x1="170" y1="190" x2="110" y2="165" className="stroke-slate-300 dark:stroke-[#3d474e]" strokeWidth="2" strokeDasharray="4 4" />
        </svg>
      </motion.div>
    </motion.div>
  );
};

export default Banner_3;