'use client';

import React from 'react';
import { motion } from 'motion/react';

// Card Skeleton for Mobile Layout (lg:hidden)
const MobileCardSkeleton = () => {
  return (
    <div className="p-5 rounded-2xl border border-slate-200/80 dark:border-gray-800/80 bg-white/40 dark:bg-[#2c2f38]/10 backdrop-blur-md space-y-4 animate-pulse">
      {/* Reviewer Details */}
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-slate-200 dark:bg-slate-800 rounded-full shrink-0" />
        <div className="space-y-2 flex-1 min-w-0">
          <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-3/4" />
          <div className="h-3 bg-slate-100 dark:bg-slate-800/40 rounded w-1/2" />
        </div>
      </div>

      {/* Book details row */}
      <div className="flex items-center gap-3 pt-3 border-t border-slate-100 dark:border-gray-800/40">
        <div className="w-8 h-11 bg-slate-100 dark:bg-slate-800/60 rounded shrink-0" />
        <div className="h-3.5 bg-slate-200 dark:bg-slate-800 rounded w-1/2" />
      </div>

      {/* Rating & Comment */}
      <div className="space-y-2 pt-3 border-t border-slate-200/60 dark:border-gray-800/60">
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-3 h-3 bg-slate-200 dark:bg-slate-700 rounded-full" />
          ))}
        </div>
        <div className="space-y-1">
          <div className="h-3 bg-slate-100 dark:bg-slate-800/50 rounded w-full" />
          <div className="h-3 bg-slate-100 dark:bg-slate-800/50 rounded w-5/6" />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200/60 dark:border-gray-800/60">
        <div className="h-8 w-20 bg-slate-200 dark:bg-slate-800 rounded-xl" />
        <div className="h-8 w-8 bg-slate-200 dark:bg-slate-800 rounded-full" />
      </div>
    </div>
  );
};

// Table Row Skeleton for Desktop Layout (lg:block)
const TableRowSkeleton = () => {
  return (
    <tr className="border-b border-slate-200/60 dark:border-gray-800/60 last:border-0 animate-pulse">
      {/* Reader details */}
      <td className="py-4 pl-4">
        <div className="flex items-center gap-3.5">
          <div className="w-9 h-9 bg-slate-200 dark:bg-slate-800 rounded-full shrink-0" />
          <div className="space-y-1.5">
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-28" />
            <div className="h-3 bg-slate-100 dark:bg-slate-800/40 rounded w-36" />
          </div>
        </div>
      </td>

      {/* Book References */}
      <td className="py-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-11 bg-slate-100 dark:bg-slate-800/60 rounded shrink-0 border border-slate-200/40 dark:border-gray-800/40" />
          <div className="h-3.5 bg-slate-200 dark:bg-slate-800 rounded w-28" />
        </div>
      </td>

      {/* Rating Scale */}
      <td className="py-4">
        <div className="space-y-2">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-3.5 h-3.5 bg-slate-200 dark:bg-slate-700 rounded-full" />
            ))}
          </div>
          <div className="h-5 bg-slate-100 dark:bg-slate-850 rounded-full w-16" />
        </div>
      </td>

      {/* Review Comments */}
      <td className="py-4 max-w-xs">
        <div className="space-y-1.5">
          <div className="h-3.5 bg-slate-100 dark:bg-slate-800/50 rounded w-full" />
          <div className="h-3.5 bg-slate-100 dark:bg-slate-800/50 rounded w-3/4" />
        </div>
      </td>

      {/* Actions */}
      <td className="py-4 pr-4 text-right">
        <div className="flex items-center justify-end gap-2.5">
          <div className="h-8 w-20 bg-slate-200 dark:bg-slate-800 rounded-xl" />
          <div className="h-8 w-8 bg-slate-200 dark:bg-slate-800 rounded-full" />
        </div>
      </td>
    </tr>
  );
};

// Main Reviews Loading Page
const ReviewsLoading = () => {
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
            <div className="h-8 w-44 bg-slate-200 dark:bg-slate-800 rounded-lg animate-pulse" />
            <div className="h-8 w-24 bg-[#856a26]/15 dark:bg-[#ffcd00]/15 rounded-lg animate-pulse" />
          </div>
          <div className="h-3 w-full max-w-xl bg-slate-200/60 dark:bg-slate-800/60 rounded-md mt-2.5 animate-pulse" />
        </motion.div>

        {/* Reviews list Loading Area */}
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
                  <th className="bg-slate-100 dark:bg-[#2c2f38] rounded-l-2xl py-4 pl-4 text-left border-b border-slate-200 dark:border-gray-800">
                    <div className="h-4 w-28 bg-slate-200/80 dark:bg-slate-700/60 rounded" />
                  </th>
                  <th className="bg-slate-100 dark:bg-[#2c2f38] py-4 text-left border-b border-slate-200 dark:border-gray-800">
                    <div className="h-4 w-24 bg-slate-200/80 dark:bg-slate-700/60 rounded" />
                  </th>
                  <th className="bg-slate-100 dark:bg-[#2c2f38] py-4 text-left border-b border-slate-200 dark:border-gray-800">
                    <div className="h-4 w-20 bg-slate-200/80 dark:bg-slate-700/60 rounded" />
                  </th>
                  <th className="bg-slate-100 dark:bg-[#2c2f38] py-4 text-left border-b border-slate-200 dark:border-gray-800">
                    <div className="h-4 w-32 bg-slate-200/80 dark:bg-slate-700/60 rounded" />
                  </th>
                  <th className="bg-slate-100 dark:bg-[#2c2f38] rounded-r-2xl py-4 pr-4 border-b border-slate-200 dark:border-gray-800">
                    <div className="h-4 w-16 bg-slate-200/80 dark:bg-slate-700/60 rounded ml-auto" />
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

export default ReviewsLoading;
