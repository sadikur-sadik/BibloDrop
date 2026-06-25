'use client';

import React from 'react';
import { motion } from 'motion/react';

// Single Stat Card Skeleton
const StatCardSkeleton = () => {
  return (
    <div className="p-6 rounded-[2rem] border border-slate-200/60 dark:border-white/5 bg-white dark:bg-[#192230] shadow-sm flex items-center justify-between animate-pulse">
      <div className="space-y-2.5">
        {/* Title */}
        <div className="h-3 w-20 bg-slate-100 dark:bg-slate-800/60 rounded-md" />
        {/* Metric Value */}
        <div className="h-7 w-24 bg-slate-200 dark:bg-slate-800 rounded-lg" />
      </div>
      {/* Icon Placeholder */}
      <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800/50 flex items-center justify-center">
        <div className="w-5 h-5 rounded-md bg-slate-200 dark:bg-slate-800" />
      </div>
    </div>
  );
};

// Pie / Donut Chart Container Skeleton
const PieChartSkeleton = () => {
  return (
    <div className="p-6 rounded-[2rem] border border-slate-200/60 dark:border-white/5 bg-white dark:bg-[#192230] shadow-sm animate-pulse flex flex-col justify-between h-85">
      <div>
        <div className="h-4.5 w-40 bg-slate-200 dark:bg-slate-800 rounded-md mb-2" />
        <div className="h-3 w-28 bg-slate-100 dark:bg-slate-800/60 rounded-md" />
      </div>
      
      {/* Circle Placeholder */}
      <div className="flex items-center justify-center my-2">
        <div className="w-36 h-36 rounded-full border-14 border-slate-100 dark:border-slate-800/60 flex items-center justify-center">
          <div className="w-12 h-12 bg-slate-200/40 dark:bg-slate-800/30 rounded-full" />
        </div>
      </div>

      {/* Legend Placeholders */}
      <div className="flex justify-center gap-3 mt-1">
        <div className="h-2.5 w-12 bg-slate-100 dark:bg-slate-800/60 rounded-md" />
        <div className="h-2.5 w-12 bg-slate-100 dark:bg-slate-800/60 rounded-md" />
        <div className="h-2.5 w-12 bg-slate-100 dark:bg-slate-800/60 rounded-md" />
      </div>
    </div>
  );
};

// Trend / Bar Chart Container Skeleton
const BarChartSkeleton = () => {
  return (
    <div className="p-6 rounded-[2rem] border border-slate-200/60 dark:border-white/5 bg-white dark:bg-[#192230] shadow-sm animate-pulse flex flex-col justify-between h-90">
      <div>
        <div className="h-4.5 w-48 bg-slate-200 dark:bg-slate-800 rounded-md mb-2" />
        <div className="h-3 w-32 bg-slate-100 dark:bg-slate-800/60 rounded-md" />
      </div>

      {/* Bars Visualization */}
      <div className="flex items-end justify-between gap-4 h-40 px-2 mt-4">
        <div className="h-[35%] w-full bg-slate-100 dark:bg-slate-800/60 rounded-t-lg" />
        <div className="h-[65%] w-full bg-slate-200 dark:bg-slate-800 rounded-t-lg" />
        <div className="h-[45%] w-full bg-slate-100 dark:bg-slate-800/60 rounded-t-lg" />
        <div className="h-[85%] w-full bg-slate-200 dark:bg-slate-800 rounded-t-lg" />
        <div className="h-[55%] w-full bg-slate-100 dark:bg-slate-800/60 rounded-t-lg" />
        <div className="h-[75%] w-full bg-slate-200 dark:bg-slate-800 rounded-t-lg" />
        <div className="h-[30%] w-full bg-slate-100 dark:bg-slate-800/60 rounded-t-lg" />
      </div>
      
      {/* Axis Line */}
      <div className="h-0.5 bg-slate-200 dark:bg-slate-800 w-full mt-2" />
    </div>
  );
};

// Main Admin Overview Loading Screen
const OverviewAdminLoading = () => {
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
        {/* Workspace Banner Skeleton */}
        <motion.div 
          variants={itemVariants}
          className="border-b border-slate-200/80 dark:border-gray-800/80 pb-6 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
        >
          <div>
            <div className="flex items-center gap-2">
              {/* "Administrative" text placeholder */}
              <div className="h-8 w-44 bg-slate-200 dark:bg-slate-800 rounded-lg animate-pulse" />
              {/* "Hub" text placeholder with matching theme color trace */}
              <div className="h-8 w-16 bg-[#856a26]/15 dark:bg-[#ffcd00]/15 rounded-lg animate-pulse" />
            </div>
            {/* Description Subtitle */}
            <div className="h-3 w-80 bg-slate-200/60 dark:bg-slate-800/60 rounded-md mt-2 animate-pulse" />
          </div>
        </motion.div>

        {/* 1. Statistics Cards Block Skeleton */}
        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full"
        >
          {[...Array(4)].map((_, i) => (
            <StatCardSkeleton key={i} />
          ))}
        </motion.div>

        {/* 2. Structured Multi-Chart Layout Grid Skeleton */}
        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full"
        >
          {/* Top-Middle Row Left: Category Breakdown (4 cols) */}
          <div className="lg:col-span-4 w-full">
            <PieChartSkeleton />
          </div>

          {/* Top-Middle Row Center: User Role Distribution (4 cols) */}
          <div className="lg:col-span-4 w-full">
            <PieChartSkeleton />
          </div>

          {/* Top-Middle Row Right: Stars breakdown (4 cols) */}
          <div className="lg:col-span-4 w-full">
            <PieChartSkeleton />
          </div>

          {/* Bottom Row Left: Live 7-Day Revenue Trend (6 cols) */}
          <div className="lg:col-span-6 w-full">
            <BarChartSkeleton />
          </div>

          {/* Bottom Row Right: Live Delivery Fulfillment Bar Chart (6 cols) */}
          <div className="lg:col-span-6 w-full">
            <BarChartSkeleton />
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
};

export default OverviewAdminLoading;