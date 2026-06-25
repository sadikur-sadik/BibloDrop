'use client';

import React from 'react';
import { motion } from 'motion/react';

// Card Skeleton for Mobile Layout (lg:hidden)
const MobileCardSkeleton = () => {
  return (
    <div className="p-5 rounded-2xl border border-slate-200/80 dark:border-gray-800/80 bg-white/40 dark:bg-[#2c2f38]/10 backdrop-blur-md space-y-4 animate-pulse">
      <div className="flex items-start gap-4">
        {/* Book cover outline */}
        <div className="w-16 h-22 bg-slate-100 dark:bg-slate-800/60 rounded-xl shrink-0" />
        <div className="space-y-2 flex-1 min-w-0 py-1">
          {/* Genre Badge */}
          <div className="h-4.5 bg-slate-100 dark:bg-[#3d474e]/40 rounded w-16" />
          {/* Title */}
          <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-5/6" />
          {/* Author */}
          <div className="h-3 bg-slate-100 dark:bg-slate-800/40 rounded w-1/2" />
        </div>
      </div>

      <div className="pt-3.5 border-t border-slate-200/60 dark:border-gray-800/60 flex items-center justify-between">
        {/* Receipt Verification title */}
        <div className="h-3 w-28 bg-slate-150 dark:bg-slate-800/40 rounded" />
        {/* Paid Status Badge */}
        <div className="h-7 w-24 bg-emerald-500/10 rounded-xl" />
      </div>
    </div>
  );
};

// Table Row Skeleton for Desktop Layout (lg:block)
const TableRowSkeleton = () => {
  return (
    <tr className="border-b border-slate-200/60 dark:border-gray-800/60 last:border-0 animate-pulse">
      {/* Book Selection */}
      <td className="py-4 pl-4">
        <div className="flex items-center gap-4">
          <div className="w-10 h-14 bg-slate-100 dark:bg-slate-800/60 rounded-lg shrink-0 border border-slate-200/40 dark:border-gray-800/40" />
          <div className="space-y-2">
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-44" />
            <div className="h-3 bg-slate-100 dark:bg-slate-800/40 rounded w-28" />
          </div>
        </div>
      </td>

      {/* Genre Tag */}
      <td className="py-4">
        <div className="h-6 bg-slate-200/60 dark:bg-slate-800/50 rounded-full w-20" />
      </td>

      {/* Verification Status */}
      <td className="py-4 pr-4 text-right">
        <div className="h-7 w-24 bg-emerald-500/10 rounded-xl ml-auto" />
      </td>
    </tr>
  );
};

// Main Reading List Loading Page
const ReadingListLoading = () => {
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
    <div className="relative w-full bg-transparent text-[#192230] dark:text-white transition-colors duration-300 space-y-8">
      
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="w-full space-y-8"
      >
        {/* Header Section Skeleton */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-slate-200/80 dark:border-gray-800/80 pb-6 gap-4"
        >
          <div>
            <div className="flex items-center gap-2">
              <div className="h-8 w-24 bg-slate-200 dark:bg-slate-800 rounded-lg animate-pulse" />
              <div className="h-8 w-36 bg-[#856a26]/15 dark:bg-[#ffcd00]/15 rounded-lg animate-pulse" />
            </div>
            <div className="h-3 w-72 bg-slate-200/60 dark:bg-slate-800/60 rounded-md mt-2.5 animate-pulse" />
          </div>

          {/* Metrics summary bar skeletons */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="px-4 py-2.5 rounded-2xl bg-slate-100/60 dark:bg-[#2c2f38]/30 border border-slate-200/60 dark:border-gray-800/60 flex flex-col min-w-22.5 animate-pulse">
              <div className="h-2 w-10 bg-slate-200 dark:bg-slate-700 rounded mb-2" />
              <div className="h-4.5 w-6 bg-slate-300 dark:bg-slate-600 rounded" />
            </div>
            <div className="px-4 py-2.5 rounded-2xl bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/20 flex flex-col min-w-27.5 animate-pulse">
              <div className="h-2 w-12 bg-emerald-500/20 rounded mb-2" />
              <div className="h-4.5 w-12 bg-emerald-500/30 rounded" />
            </div>
          </div>
        </motion.div>

        {/* Collection Grid/Table Loading Area */}
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
                  <th className="bg-slate-100 dark:bg-[#2c2f38] rounded-l-2xl py-4 pl-4 text-left border-b border-slate-200 dark:border-gray-800 w-1/2">
                    <div className="h-4 w-32 bg-slate-200/80 dark:bg-slate-700/60 rounded" />
                  </th>
                  <th className="bg-slate-100 dark:bg-[#2c2f38] py-4 text-left border-b border-slate-200 dark:border-gray-800">
                    <div className="h-4 w-20 bg-slate-200/80 dark:bg-slate-700/60 rounded" />
                  </th>
                  <th className="bg-slate-100 dark:bg-[#2c2f38] rounded-r-2xl py-4 pr-4 border-b border-slate-200 dark:border-gray-800">
                    <div className="h-4 w-28 bg-slate-200/80 dark:bg-slate-700/60 rounded ml-auto" />
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

export default ReadingListLoading;
