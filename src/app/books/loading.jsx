'use client';

import React from 'react';
import { motion } from 'motion/react';

// Single Card Skeleton matching the exact visual weight of BooksCard
const CardSkeleton = () => {
  return (
    <div className="relative overflow-hidden w-full rounded-[2.5rem] border border-slate-100 dark:border-white/10 p-5 bg-white dark:bg-[#192230] transition-colors duration-300 shadow-md flex flex-col justify-between">
      <div>
        {/* Aspect 3:4 Book Cover Placeholder */}
        <div className="relative w-full aspect-3/4 rounded-[1.85rem] overflow-hidden mb-5 bg-slate-50 dark:bg-slate-900/30 flex items-center justify-center animate-pulse">
          <div className="w-[85%] h-[85%] bg-slate-200/60 dark:bg-slate-800/60 rounded-xl shadow-xs border border-slate-300/10 dark:border-slate-700/20 flex items-center justify-center">
            {/* Book icon silhouette */}
            <svg className="w-10 h-10 text-slate-300/70 dark:text-slate-700/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
        </div>

        {/* Title & Author Meta Skeleton */}
        <div className="space-y-2.5 animate-pulse">
          <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded-lg w-10/12" />
          <div className="h-3 bg-slate-100 dark:bg-slate-800/60 rounded-md w-1/2" />
        </div>

        {/* Content Meta Skeleton */}
        <div className="mt-5 space-y-3 pt-2 animate-pulse">
          {/* Genre Label line */}
          <div className="h-3.5 bg-slate-100 dark:bg-slate-800/80 rounded-md w-1/3" />
          {/* Delivery Fee Line */}
          <div className="flex items-center justify-between">
            <div className="h-3 bg-slate-100 dark:bg-slate-800/60 rounded-md w-2/5" />
            <div className="h-3 bg-slate-100 dark:bg-slate-800/60 rounded-md w-1/4" />
          </div>
        </div>
      </div>

      {/* CTA Button Skeleton */}
      <div className="mt-5 w-full animate-pulse">
        <div className="w-full h-12 rounded-full bg-slate-200 dark:bg-slate-800" />
      </div>
    </div>
  );
};

// Filter Bar Row Skeleton matching your 4-column filter drop downs
const FilterBarSkeleton = () => {
  return (
    <div className="grid grid-cols-1 max-w-360 mx-auto sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      {[...Array(4)].map((_, i) => (
        <div 
          key={i} 
          className="flex justify-between items-center w-full px-4 py-3.5 rounded-2xl border border-slate-200/60 dark:border-white/10 bg-white dark:bg-[#192230] text-xs h-11 animate-pulse"
        >
          <div className="h-3 w-28 bg-slate-200 dark:bg-slate-800 rounded-full" />
          <svg className="w-3.5 h-3.5 text-slate-300 dark:text-slate-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      ))}
    </div>
  );
};

// Main Loading Page Component
const BrowseBooksLoading = () => {
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
    <div className="w-full min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-slate-50/50 dark:bg-[#2c2f38]/20 transition-colors duration-300 relative overflow-hidden">
      
      {/* Absolute Ambient Background Glows matching the exact values */}
      <div className="absolute right-0 top-0 w-96 h-96 bg-[#856a26]/5 dark:bg-[#ffcd00]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute left-0 bottom-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-7xl mx-auto space-y-8 relative z-10"
      >
        {/* Header Section Skeleton */}
        <motion.div 
          variants={itemVariants}
          className="border-b border-slate-200/80 dark:border-gray-800/80 pb-6 mb-8"
        >
          <div className="flex items-center gap-2">
            {/* "Browse" text skeleton */}
            <div className="h-8 w-24 bg-slate-200 dark:bg-slate-800 rounded-lg animate-pulse" />
            {/* "Digital" text skeleton with matching theme color trace */}
            <div className="h-8 w-44 bg-[#856a26]/15 dark:bg-[#ffcd00]/15 rounded-lg animate-pulse" />
          </div>
          <div className="h-4 w-full max-w-xl bg-slate-200/60 dark:bg-slate-800/60 rounded-md mt-2.5 animate-pulse" />
        </motion.div>

        {/* Search & Filter Bar Group Box Skeleton */}
        <motion.div 
          variants={itemVariants}
          className="bg-white dark:bg-[#192230]/40 p-5 rounded-[2rem] border border-slate-200/60 dark:border-white/5 space-y-4 shadow-sm"
        >
          {/* SearchBar Input Shape Skeleton */}
          <div className="relative w-full h-13 bg-slate-100 dark:bg-[#192230] rounded-3xl border border-slate-200/40 dark:border-white/10 flex items-center px-4 animate-pulse">
            <div className="w-5 h-5 rounded-full border-2 border-slate-300 dark:border-slate-700 mr-3" />
            <div className="h-4 w-60 bg-slate-200 dark:bg-slate-800 rounded-full" />
          </div>

          {/* Filter Options Row */}
          <FilterBarSkeleton />
        </motion.div>

        {/* Book Grid Skeleton Layout */}
        <motion.div 
          variants={itemVariants}
          className="grid sm:grid-cols-2 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-6"
        >
          {[...Array(8)].map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </motion.div>

        {/* Pagination Section Skeleton */}
        <motion.div 
          variants={itemVariants}
          className="w-full flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-slate-200/60 dark:border-white/5 gap-4 animate-pulse"
        >
          {/* Showing results placeholder */}
          <div className="h-4 w-48 bg-slate-200 dark:bg-slate-800 rounded-md" />
          
          {/* Pagination buttons placeholder */}
          <div className="flex gap-2">
            <div className="h-10 w-24 bg-slate-200 dark:bg-slate-800 rounded-xl" />
            <div className="h-10 w-10 bg-slate-200 dark:bg-slate-800 rounded-xl" />
            <div className="h-10 w-10 bg-slate-200 dark:bg-slate-800 rounded-xl" />
            <div className="h-10 w-10 bg-slate-200 dark:bg-slate-800 rounded-xl" />
            <div className="h-10 w-24 bg-slate-200 dark:bg-slate-800 rounded-xl" />
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
};

export default BrowseBooksLoading;