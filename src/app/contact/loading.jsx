'use client';

import React from 'react';
import { motion } from 'motion/react';

const ContactLoading = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.12 
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
    <div className="w-full min-h-screen bg-slate-50 dark:bg-[#192230] text-[#192230] dark:text-white py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300 relative overflow-hidden flex flex-col justify-center animate-pulse">
      {/* Background accents */}
      <div className="absolute right-0 top-0 w-96 h-96 bg-[#856a26]/5 dark:bg-[#ffcd00]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute left-0 bottom-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-7xl mx-auto w-full space-y-12 relative z-10"
      >
        {/* Header Section */}
        <div className="border-b border-slate-200/80 dark:border-gray-800/80 pb-6 mb-8">
          <div className="flex items-center gap-2">
            <div className="h-8 w-28 bg-slate-200 dark:bg-slate-800 rounded-lg" />
            <div className="h-8 w-20 bg-[#856a26]/15 dark:bg-[#ffcd00]/15 rounded-lg" />
          </div>
          <div className="h-3.5 w-full max-w-xl bg-slate-200/65 dark:bg-slate-800/60 rounded mt-2.5" />
        </div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Column 1: Contact Form Container */}
          <div className="lg:col-span-7">
            <div className="bg-white dark:bg-[#2c2f38] border border-slate-200/80 dark:border-gray-800 shadow-md rounded-[2rem] overflow-hidden">
              <div className="p-6 sm:p-10 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name field */}
                  <div className="space-y-1.5">
                    <div className="h-3 w-16 bg-slate-200 dark:bg-slate-700 rounded" />
                    <div className="h-12 w-full bg-slate-50 dark:bg-[#192230] border border-slate-200/80 dark:border-gray-800/80 rounded-2xl" />
                  </div>
                  {/* Email Address field */}
                  <div className="space-y-1.5">
                    <div className="h-3 w-24 bg-slate-200 dark:bg-slate-700 rounded" />
                    <div className="h-12 w-full bg-slate-50 dark:bg-[#192230] border border-slate-200/80 dark:border-gray-800/80 rounded-2xl" />
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-1.5">
                  <div className="h-3 w-14 bg-slate-200 dark:bg-slate-700 rounded" />
                  <div className="h-12 w-full bg-slate-50 dark:bg-[#192230] border border-slate-200/80 dark:border-gray-800/80 rounded-2xl" />
                </div>

                {/* Your Message */}
                <div className="space-y-1.5">
                  <div className="h-3 w-20 bg-slate-200 dark:bg-slate-700 rounded" />
                  <div className="h-32 w-full bg-slate-50 dark:bg-[#192230] border border-slate-200/80 dark:border-gray-800/80 rounded-2xl" />
                </div>

                {/* Submit Button */}
                <div className="h-12 w-full bg-slate-250 dark:bg-[#192230] rounded-2xl border border-slate-200/80 dark:border-gray-800" />
              </div>
            </div>
          </div>

          {/* Column 2: Direct Contact Cards */}
          <div className="lg:col-span-5 space-y-6">
            {[...Array(3)].map((_, i) => (
              <div 
                key={i}
                className="bg-white dark:bg-[#2c2f38] border border-slate-200/80 dark:border-gray-800 rounded-3xl p-6 shadow-sm flex items-start gap-4"
              >
                <div className="bg-slate-100 dark:bg-[#192230] w-12 h-12 rounded-2xl shrink-0" />
                <div className="space-y-2 flex-1">
                  <div className="h-2.5 w-20 bg-slate-200 dark:bg-slate-700 rounded" />
                  <div className="h-4 w-40 bg-slate-200 dark:bg-slate-700 rounded" />
                  <div className="h-3 w-full bg-slate-100 dark:bg-slate-800/40 rounded" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </motion.div>
    </div>
  );
};

export default ContactLoading;
