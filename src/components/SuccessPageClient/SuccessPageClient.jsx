'use client';

import React from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';

export default function SuccessPageClient({ customerEmail }) {
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
    <div className="min-h-screen bg-slate-50 dark:bg-[#192230] text-[#192230] dark:text-white transition-colors duration-300 py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative w-full max-w-4xl bg-white dark:bg-[#2c2f38] p-8 sm:p-12 md:p-16 rounded-3xl border border-slate-200/80 dark:border-gray-800 shadow-xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center overflow-hidden"
      >
        {/* Visual background accents matching Banner_1 */}
        <div className="absolute right-0 top-0 w-80 h-80 bg-[#856a26]/5 dark:bg-[#ffcd00]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute left-0 bottom-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Text Content */}
        <div className="md:col-span-7 z-10 flex flex-col items-center md:items-start text-center md:text-left space-y-5 order-2 md:order-1">
          <motion.div 
            variants={itemVariants} 
            className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-1.5 rounded-full text-xs font-semibold text-emerald-600 dark:text-emerald-400 tracking-wider uppercase"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse"></span>
            Order Confirmed
          </motion.div>

          <motion.h1 
            variants={itemVariants} 
            className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight"
          >
            Delivery <br />
            <span className="text-[#856a26] dark:text-[#ffcd00]">Requested!</span>
          </motion.h1>

          <motion.div 
            variants={itemVariants} 
            className="text-[#3d474e] dark:text-[#9ea7b3] text-sm md:text-base max-w-lg mx-auto md:mx-0 leading-relaxed"
          >
            We appreciate your business! A confirmation email and transaction details have been dispatched to{' '}
            <p className="font-bold text-[#192230] dark:text-white break-all">{customerEmail} .</p>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="text-xs text-slate-400 dark:text-slate-500 border-t border-slate-100 dark:border-gray-800/80 pt-4 w-full"
          >
            Have any questions or need to make changes? Reach out to us at{' '}
            <a href="mailto:orders@example.com" className="text-[#856a26] dark:text-[#ffcd00] hover:underline font-medium">
              orders@example.com
            </a>.
          </motion.div>

          {/* Action Buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center md:justify-start gap-4 pt-2 w-full">
            <Link href="/books">
              <button className="bg-[#192230] text-white hover:bg-[#2c2f38] dark:bg-[#ffcd00] dark:text-[#192230] dark:hover:bg-[#ffe066] px-8 py-3.5 rounded-full font-bold transition-all transform hover:-translate-y-0.5 shadow-lg shadow-gray-200 dark:shadow-[#ffcd00]/20 text-sm cursor-pointer">
                Browse More Books
              </button>
            </Link>
            <Link href="/Dashboard">
              <button className="bg-slate-200/60 border border-slate-300/80 dark:bg-[#3d474e]/40 dark:border-gray-700 dark:hover:bg-[#3d474e]/60 text-[#192230] dark:text-white px-8 py-3.5 rounded-full font-semibold transition-all transform hover:-translate-y-0.5 text-sm cursor-pointer">
                View Dashboard
              </button>
            </Link>
          </motion.div>
        </div>

        {/* Success Premium Illustration */}
        <motion.div 
          variants={itemVariants} 
          className="md:col-span-5 flex justify-center items-center h-full min-h-62.5 relative order-1 md:order-2"
        >
          <svg viewBox="0 0 400 400" className="w-full max-w-70 md:max-w-[320px] h-auto drop-shadow-2xl">
            {/* Background Circle */}
            <circle cx="200" cy="200" r="160" className="fill-slate-100 dark:fill-[#192230] stroke-slate-200 dark:stroke-[#3d474e]" strokeWidth="2" />
            
            {/* Animated Glow Circle */}
            <motion.circle 
              animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.35, 0.15] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
              cx="200" cy="190" r="65" className="fill-emerald-500 dark:fill-emerald-400" opacity="0.2" 
            />

            {/* Delivery Box & Book Composite Graphic */}
            <g transform="translate(130, 120)">
              {/* Box Base */}
              <path d="M20,110 L20,60 L70,30 L120,60 L120,110 Z" className="fill-slate-50 dark:fill-[#2c2f38] stroke-slate-300 dark:stroke-[#3d474e]" strokeWidth="3" />
              {/* Left Flap */}
              <path d="M20,60 L60,40 L60,70 L20,90 Z" className="fill-slate-200/80 dark:fill-[#3d474e]/60 stroke-slate-300 dark:stroke-[#3d474e]" strokeWidth="1.5" />
              {/* Right Flap */}
              <path d="M120,60 L80,40 L80,70 L120,90 Z" className="fill-slate-200/80 dark:fill-[#3d474e]/60 stroke-slate-300 dark:stroke-[#3d474e]" strokeWidth="1.5" />

              {/* Book emerging from box */}
              <g transform="translate(45, 15)">
                <rect width="50" height="60" rx="4" className="fill-[#856a26] dark:fill-[#ffcd00]" />
                <path d="M5,0 L45,0 L45,60 L5,60 Z" className="fill-slate-100 dark:fill-white" />
                <line x1="12" y1="15" x2="38" y2="15" className="stroke-[#856a26] dark:stroke-[#3d474e]" strokeWidth="2" strokeLinecap="round" />
                <line x1="12" y1="25" x2="38" y2="25" className="stroke-[#856a26] dark:stroke-[#3d474e]" strokeWidth="2" strokeLinecap="round" />
                <line x1="12" y1="35" x2="30" y2="35" className="stroke-[#856a26] dark:stroke-[#3d474e]" strokeWidth="2" strokeLinecap="round" />
              </g>

              {/* Delivery Tape Decor */}
              <rect x="63" y="60" width="14" height="50" className="fill-slate-300 dark:fill-[#3d474e]" />
              <rect x="63" y="80" width="14" height="6" className="fill-[#856a26] dark:fill-[#ffcd00]" />
            </g>

            {/* Floating Checkmark Badge */}
            <motion.g
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              transform="translate(240, 110)"
            >
              <circle cx="25" cy="25" r="25" className="fill-emerald-500 dark:fill-emerald-400 shadow-md" />
              <path d="M15,25 L22,32 L35,18" className="stroke-white fill-none" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            </motion.g>

            {/* Sparkles / Stars Animation */}
            <motion.g
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            >
              <path d="M90,120 L92,125 L97,125 L93,129 L95,134 L90,131 L85,134 L87,129 L83,125 L88,125 Z" className="fill-[#856a26] dark:fill-[#ffcd00]" />
              <path d="M300,240 L301,243 L305,243 L302,246 L303,250 L300,248 L297,250 L298,246 L295,243 L299,243 Z" className="fill-emerald-500 dark:fill-emerald-400" />
            </motion.g>
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
}