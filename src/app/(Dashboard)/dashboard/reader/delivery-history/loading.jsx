'use client';

import React from 'react';
import { motion } from 'motion/react';

// Progress Tracker Skeleton
const ProgressTrackerSkeleton = () => {
  return (
    <div className="w-full max-w-70 py-1 animate-pulse">
      {/* Step labels */}
      <div className="flex justify-between items-center text-[10px] font-extrabold uppercase tracking-wider mb-2">
        <div className="h-3 w-10 bg-slate-200 dark:bg-slate-700 rounded" />
        <div className="h-3 w-14 bg-slate-100 dark:bg-slate-800/40 rounded" />
        <div className="h-3 w-12 bg-slate-100 dark:bg-slate-800/40 rounded" />
      </div>

      {/* Visual Line and Dots */}
      <div className="flex items-center justify-between w-full relative">
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-slate-200 dark:bg-gray-800 rounded-full z-0" />
        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-[#856a26]/20 dark:bg-[#ffcd00]/20 rounded-full w-1/2 z-0" />
        {[...Array(3)].map((_, index) => (
          <div 
            key={index}
            className={`relative z-10 w-3.5 h-3.5 rounded-full flex items-center justify-center ${
              index === 0 
                ? 'bg-[#856a26] dark:bg-[#ffcd00]' 
                : 'bg-slate-350 dark:bg-gray-700'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

// Card Skeleton for Mobile Layout (lg:hidden)
const MobileCardSkeleton = () => {
  return (
    <div className="p-5 rounded-2xl border border-slate-200/80 dark:border-gray-800/80 bg-white/40 dark:bg-[#2c2f38]/10 backdrop-blur-md flex flex-col gap-4 animate-pulse">
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-1.5 flex-1 min-w-0">
          <div className="h-2.5 bg-slate-200/60 dark:bg-slate-800/40 rounded w-16" />
          <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-3/4" />
          <div className="h-3 bg-slate-100 dark:bg-slate-800/40 rounded w-1/2" />
        </div>
        <div className="flex flex-col items-end gap-1.5 text-right shrink-0">
          <div className="h-2.5 bg-slate-200/60 dark:bg-slate-800/40 rounded w-16" />
          <div className="h-3.5 bg-slate-200 dark:bg-slate-800 rounded w-20" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-y-3 gap-x-4 pt-3 border-t border-slate-200/60 dark:border-gray-800/60 text-xs">
        <div className="space-y-1.5">
          <div className="h-2.5 bg-slate-200/60 dark:bg-slate-800/40 rounded w-16" />
          <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-12" />
        </div>
      </div>

      <div className="pt-4 border-t border-slate-200/60 dark:border-gray-800/60">
        <ProgressTrackerSkeleton />
      </div>
    </div>
  );
};

// Table Row Skeleton for Desktop Layout (lg:block)
const TableRowSkeleton = () => {
  return (
    <tr className="border-b border-slate-200/60 dark:border-gray-800/60 last:border-0 animate-pulse">
      {/* Book Selection */}
      <td className="py-4 align-top">
        <div className="flex flex-col gap-2">
          <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-48" />
          <div className="h-3 bg-slate-100 dark:bg-slate-800/40 rounded w-32" />
        </div>
      </td>

      {/* Delivery Fee */}
      <td className="py-4 align-top">
        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-12" />
      </td>

      {/* Request Date */}
      <td className="py-4 align-top">
        <div className="h-4 bg-slate-150 dark:bg-slate-800/40 rounded w-20" />
      </td>

      {/* Delivery Progress */}
      <td className="py-4">
        <div className="flex items-center justify-start">
          <ProgressTrackerSkeleton />
        </div>
      </td>
    </tr>
  );
};

// Main Delivery History Loading Page
const DeliveryHistoryLoading = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.1 
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, ease: 'easeOut' } 
    },
  };

  return (
    <div className="relative w-full bg-transparent text-[#192230] dark:text-white transition-colors duration-300 space-y-6">
      
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="w-full space-y-8"
      >
        {/* Header Section Skeleton */}
        <motion.div 
          variants={itemVariants}
          className="border-b border-slate-200/80 dark:border-gray-800/80 pb-6 mb-8"
        >
          <div className="flex items-center gap-2">
            <div className="h-8 w-28 bg-slate-200 dark:bg-slate-800 rounded-lg animate-pulse" />
            <div className="h-8 w-24 bg-[#856a26]/15 dark:bg-[#ffcd00]/15 rounded-lg animate-pulse" />
          </div>
          <div className="h-3 w-full max-w-xl bg-slate-200/60 dark:bg-slate-800/60 rounded-md mt-2.5 animate-pulse" />
        </motion.div>

        {/* Content Loading Area */}
        <motion.div variants={itemVariants} className="relative w-full">
          
          {/* Mobile Layout Skeleton */}
          <div className="block lg:hidden space-y-4">
            {[...Array(3)].map((_, i) => (
              <MobileCardSkeleton key={i} />
            ))}
          </div>

          {/* Desktop Layout Skeleton */}
          <div className="hidden lg:block w-full">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="bg-slate-100 dark:bg-[#2c2f38] rounded-l-2xl py-4 pl-4 text-left border-b border-slate-200 dark:border-gray-800 w-1/4">
                    <div className="h-4 w-32 bg-slate-200/80 dark:bg-slate-700/60 rounded" />
                  </th>
                  <th className="bg-slate-100 dark:bg-[#2c2f38] py-4 text-left border-b border-slate-200 dark:border-gray-800">
                    <div className="h-4 w-20 bg-slate-200/80 dark:bg-slate-700/60 rounded" />
                  </th>
                  <th className="bg-slate-100 dark:bg-[#2c2f38] py-4 text-left border-b border-slate-200 dark:border-gray-800">
                    <div className="h-4 w-24 bg-slate-200/80 dark:bg-slate-700/60 rounded" />
                  </th>
                  <th className="bg-slate-100 dark:bg-[#2c2f38] rounded-r-2xl py-4 pr-4 border-b border-slate-200 dark:border-gray-800">
                    <div className="h-4 w-36 bg-slate-200/80 dark:bg-slate-700/60 rounded" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {[...Array(5)].map((_, i) => (
                  <TableRowSkeleton key={i} />
                ))}
              </tbody>
            </table>
          </div>

        </motion.div>
      </motion.div>
    </div>
  );
};

export default DeliveryHistoryLoading;
