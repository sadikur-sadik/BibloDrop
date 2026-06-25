'use client';

import React from 'react';
import { motion } from 'motion/react';

// Single Stat Card Skeleton
const StatCardSkeleton = () => {
  return (
    <div className="bg-white dark:bg-[#2c2f38] border border-slate-200/80 dark:border-gray-800 rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden shadow-xs animate-pulse h-36">
      <div className="flex justify-between items-start w-full">
        <div className="space-y-2">
          <div className="h-3 w-28 bg-slate-200 dark:bg-slate-700 rounded" />
          <div className="h-3 w-40 bg-slate-100 dark:bg-slate-800/60 rounded" />
        </div>
        <div className="bg-slate-100 dark:bg-[#192230] w-10 h-10 rounded-xl" />
      </div>
      <div className="mt-4">
        <div className="h-8 w-20 bg-slate-200 dark:bg-slate-700 rounded-lg" />
      </div>
    </div>
  );
};

// Chart Container Skeleton
const ChartCardSkeleton = ({ title, subtitle, children, className = '' }) => {
  return (
    <div className={`bg-white dark:bg-[#2c2f38] border border-slate-200/80 dark:border-gray-800 rounded-3xl p-6 md:p-8 flex flex-col justify-between min-h-[380px] transition-colors duration-300 animate-pulse ${className}`}>
      <div className="space-y-2 mb-6">
        <div className="h-4.5 w-36 bg-slate-250 dark:bg-slate-700 rounded" />
        <div className="h-3 w-56 bg-slate-150 dark:bg-slate-800/60 rounded" />
      </div>
      <div className="flex-1 flex items-center justify-center w-full">
        {children}
      </div>
    </div>
  );
};

// Reader Overview Loading Page
const ReaderOverviewLoading = () => {
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
    <div className="relative w-full min-h-screen bg-transparent text-[#192230] dark:text-white transition-colors duration-300 space-y-6">
      
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="w-full space-y-8"
      >
        {/* Header/Banner Section */}
        <motion.div 
          variants={itemVariants}
          className="border-b border-slate-200/80 dark:border-gray-800/80 pb-6 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
        >
          <div>
            <div className="flex items-center gap-2">
              <div className="h-8 w-24 bg-slate-200 dark:bg-slate-800 rounded-lg animate-pulse" />
              <div className="h-8 w-36 bg-[#856a26]/15 dark:bg-[#ffcd00]/15 rounded-lg animate-pulse" />
            </div>
            <div className="h-3 w-72 bg-slate-200/60 dark:bg-slate-800/60 rounded-md mt-2.5 animate-pulse" />
          </div>
        </motion.div>

        {/* 1. Statistics Cards Block */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[...Array(4)].map((_, i) => (
            <StatCardSkeleton key={i} />
          ))}
        </motion.div>

        {/* 2. Graphical Grid Layout */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
          
          {/* Sentiment Distribution Card (4 cols) */}
          <div className="lg:col-span-4 w-full">
            <ChartCardSkeleton title="Review Sentiment" subtitle="Total metrics from your rating submissions">
              <div className="w-full space-y-5">
                {/* Average rating circles */}
                <div className="flex flex-col items-center pb-2 border-b border-slate-100 dark:border-gray-800/60 space-y-2">
                  <div className="h-10 w-16 bg-slate-200 dark:bg-slate-700 rounded-lg" />
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-3.5 h-3.5 bg-slate-200 dark:bg-slate-700 rounded-full" />
                    ))}
                  </div>
                  <div className="h-2.5 w-24 bg-slate-100 dark:bg-slate-800/40 rounded" />
                </div>
                {/* Distribution bars */}
                <div className="space-y-2">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="h-2.5 w-8 bg-slate-100 dark:bg-slate-800/40 rounded" />
                      <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full flex-1" />
                      <div className="h-2.5 w-6 bg-slate-100 dark:bg-slate-800/40 rounded" />
                    </div>
                  ))}
                </div>
              </div>
            </ChartCardSkeleton>
          </div>

          {/* Book Status Allocation Card (8 cols) */}
          <div className="lg:col-span-8 w-full">
            <ChartCardSkeleton title="Fulfillment Distribution" subtitle="Allocation of requested and owned book copies">
              <div className="w-full h-48 flex items-end justify-between gap-6 pt-4 px-4 border-b border-slate-150 dark:border-gray-800">
                <div className="flex flex-col items-center flex-1 h-full justify-end space-y-2">
                  <div className="w-full bg-slate-250 dark:bg-slate-700 rounded-t-lg h-3/4" />
                  <div className="h-3 w-16 bg-slate-100 dark:bg-slate-800/45 rounded" />
                </div>
                <div className="flex flex-col items-center flex-1 h-full justify-end space-y-2">
                  <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-t-lg h-1/4" />
                  <div className="h-3 w-20 bg-slate-100 dark:bg-slate-800/45 rounded" />
                </div>
                <div className="flex flex-col items-center flex-1 h-full justify-end space-y-2">
                  <div className="w-full bg-slate-150 dark:bg-slate-800/60 rounded-t-lg h-1/6" />
                  <div className="h-3 w-20 bg-slate-100 dark:bg-slate-800/45 rounded" />
                </div>
              </div>
            </ChartCardSkeleton>
          </div>

          {/* Spending Trend (12 cols) */}
          <div className="lg:col-span-12 w-full">
            <ChartCardSkeleton title="Weekly Spending Trend" subtitle="Total service fees disbursed over the last 7 days">
              <div className="w-full h-48 relative flex items-end border-b border-l border-slate-200 dark:border-gray-800 pt-6 pl-4">
                {/* Simulated wavy area chart */}
                <svg className="absolute inset-0 w-full h-full text-slate-100/50 dark:text-slate-800/40" preserveAspectRatio="none" viewBox="0 0 100 100">
                  <path fill="currentColor" d="M0,80 Q15,40 30,60 T60,30 T90,50 T100,20 L100,100 L0,100 Z" />
                  <path fill="none" stroke="currentColor" strokeWidth="2" d="M0,80 Q15,40 30,60 T60,30 T90,50 T100,20" className="text-slate-200 dark:text-slate-700" />
                </svg>
                {/* Day Labels */}
                <div className="absolute bottom-[-24px] left-0 right-0 flex justify-between px-2 text-[10px] text-slate-400">
                  {[...Array(7)].map((_, i) => (
                    <div key={i} className="h-3 w-10 bg-slate-100 dark:bg-slate-800/50 rounded" />
                  ))}
                </div>
              </div>
            </ChartCardSkeleton>
          </div>

        </motion.div>

      </motion.div>
    </div>
  );
};

export default ReaderOverviewLoading;
