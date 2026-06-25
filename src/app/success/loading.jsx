'use client';

import React from 'react';
import { motion } from 'motion/react';

const SuccessPageLoading = () => {
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
        className="relative w-full max-w-4xl bg-white dark:bg-[#2c2f38] p-8 sm:p-12 md:p-16 rounded-3xl border border-slate-200/80 dark:border-gray-800 shadow-xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center overflow-hidden animate-pulse"
      >
        {/* Visual background accents */}
        <div className="absolute right-0 top-0 w-80 h-80 bg-[#856a26]/5 dark:bg-[#ffcd00]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute left-0 bottom-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Text Content Skeleton */}
        <div className="md:col-span-7 z-10 flex flex-col items-center md:items-start text-center md:text-left space-y-5 order-2 md:order-1">
          {/* Badge skeleton */}
          <div className="h-7 w-36 bg-emerald-500/10 border border-emerald-500/20 rounded-full" />

          {/* Title skeleton */}
          <div className="space-y-2 w-full flex flex-col items-center md:items-start">
            <div className="h-10 w-44 bg-slate-200 dark:bg-slate-700 rounded-lg" />
            <div className="h-10 w-56 bg-[#856a26]/10 dark:bg-[#ffcd00]/10 rounded-lg" />
          </div>

          {/* Description paragraphs skeleton */}
          <div className="space-y-2 w-full flex flex-col items-center md:items-start max-w-lg">
            <div className="h-4 bg-slate-150 dark:bg-slate-800 rounded w-full" />
            <div className="h-4 bg-slate-150 dark:bg-slate-800 rounded w-5/6" />
          </div>

          {/* Subtext skeleton */}
          <div className="h-3.5 bg-slate-100 dark:bg-slate-800/40 rounded w-3/4 border-t border-slate-100 dark:border-gray-800/80 pt-4" />

          {/* Action buttons row skeleton */}
          <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-2 w-full">
            <div className="h-12 w-44 bg-slate-200 dark:bg-slate-700 rounded-full" />
            <div className="h-12 w-40 bg-slate-150 dark:bg-slate-800/60 rounded-full" />
          </div>
        </div>

        {/* Illustration Skeleton */}
        <div className="md:col-span-5 flex justify-center items-center h-full min-h-62.5 relative order-1 md:order-2">
          {/* Circle outline skeleton */}
          <div className="w-64 h-64 sm:w-72 sm:h-72 rounded-full border-2 border-slate-200 dark:border-slate-800 flex items-center justify-center bg-slate-50/50 dark:bg-[#192230]/30">
            {/* Box outline shape */}
            <div className="w-24 h-24 bg-slate-100 dark:bg-[#2c2f38] border-2 border-slate-200 dark:border-[#3d474e] rounded-lg relative flex items-center justify-center">
              <div className="w-16 h-3 bg-[#856a26]/20 dark:bg-[#ffcd00]/20 rounded" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SuccessPageLoading;
