'use client';

import React from 'react';
import { motion } from 'motion/react';

const UnauthorizedLoading = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.12 },
    },
  };

  return (
    <div className="relative w-full max-w-360 mx-auto py-4 px-4 flex items-center justify-center min-h-screen bg-slate-50 dark:bg-[#192230] transition-colors duration-300">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative max-w-md md:max-w-xl w-full p-6 sm:p-8 bg-transparent text-[#192230] dark:text-white overflow-hidden text-center transition-colors duration-300 shadow-xl shadow-slate-100 dark:shadow-none animate-pulse"
      >
        {/* Ambient Glow */}
        <div className="absolute right-0 top-0 w-60 h-60 bg-[#856a26]/5 dark:bg-[#ffcd00]/5 rounded-full blur-3xl pointer-events-none" />

        {/* Pulsing Alert Icon Badge */}
        <div className="relative flex justify-center mb-4">
          <div className="w-14 h-14 bg-rose-500/10 dark:bg-rose-500/5 rounded-full border border-rose-500/20 dark:border-rose-500/10 flex items-center justify-center">
            <div className="w-6 h-6 rounded bg-rose-400/40" />
          </div>
        </div>

        {/* Info Badge */}
        <div className="inline-flex items-center gap-2 bg-[#856a26]/10 border border-[#856a26]/20 dark:bg-[#ffcd00]/10 dark:border-[#ffcd00]/20 px-3.5 py-1.5 rounded-full mb-1">
          <span className="w-2 h-2 rounded-full bg-rose-500" />
          <div className="h-3.5 w-20 bg-[#856a26]/20 dark:bg-[#ffcd00]/20 rounded" />
        </div>

        {/* Header */}
        <div className="flex justify-center mt-1">
          <div className="h-8 w-56 bg-slate-200 dark:bg-slate-700 rounded-lg" />
        </div>

        {/* Description */}
        <div className="space-y-1.5 mt-4 max-w-md mx-auto flex flex-col items-center">
          <div className="h-3 w-full bg-slate-150 dark:bg-slate-800 rounded" />
          <div className="h-3 w-5/6 bg-slate-150 dark:bg-slate-800 rounded" />
        </div>

        {/* Informational Context Box */}
        <div className="w-full max-w-md mt-6 p-5 bg-slate-200/30 border border-slate-300/50 dark:bg-[#3d474e]/20 dark:border-gray-700/80 rounded-2xl text-left">
          <div className="h-3 w-40 bg-slate-200 dark:bg-slate-700 rounded mb-4" />
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-gray-600 mt-1.5 shrink-0" />
                <div className="h-3 bg-slate-150 dark:bg-slate-800/60 rounded flex-1" />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center w-full max-w-sm mx-auto">
          <div className="h-11 w-full sm:w-28 bg-slate-200 dark:bg-[#3d474e]/40 rounded-full" />
          <div className="h-11 w-full sm:w-32 bg-[#192230] dark:bg-[#ffcd00] rounded-full" />
        </div>

        {/* Alternative Sign Out Action */}
        <div className="mt-4 flex justify-center">
          <div className="h-3 w-48 bg-slate-100 dark:bg-slate-800/40 rounded" />
        </div>

      </motion.div>
    </div>
  );
};

export default UnauthorizedLoading;
