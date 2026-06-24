'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Car, ShieldCheck } from '@gravity-ui/icons';

const STATIC_LIBRARIANS = [
  {
    _id: '1',
    name: 'Marcus Vance',
    email: 'marcus.vance@library.delivery',
    image: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&crop=faces&q=90&w=1000&h=1000',
    deliveryCount: 142,
    status: 'approved',
  },
  {
    _id: '2',
    name: 'David Kael',
    email: 'david.kael@library.delivery',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=90&w=1000&h=1000',
    deliveryCount: 128,
    status: 'approved',
  },
  {
    _id: '3',
    name: 'Julian Mercer',
    email: 'julian.mercer@library.delivery',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&crop=faces&q=90&w=1000&h=1000',
    deliveryCount: 115,
    status: 'approved',
  }
];

const TopLibrarians = () => {
  const sortedLibrarians = [...STATIC_LIBRARIANS].sort(
    (a, b) => (b.deliveryCount || 0) - (a.deliveryCount || 0)
  );

  // Animation configuration to trigger only when entered into viewport
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: [0.16, 1, 0.3, 1], // Custom deceleration curve for premium transition
        staggerChildren: 0.15 
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
    <section className="w-full bg-slate-50 dark:bg-[#192230] text-[#192230] dark:text-white py-16 px-4 sm:px-8 md:px-16 lg:px-20 transition-colors duration-300 relative overflow-hidden select-none">
      {/* Background visual accents */}
      <div className="absolute right-0 top-0 w-80 h-80 bg-[#856a26]/5 dark:bg-[#ffcd00]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute left-0 bottom-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Changed once to false to allow repeating animations on entry/exit */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.15 }}
        variants={containerVariants}
        className="max-w-7xl mx-auto space-y-12 relative z-10"
      >
        
        {/* Header Block with dynamic view-triggered entry */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <motion.span 
            variants={itemVariants}
            className="inline-flex items-center gap-2 bg-[#856a26]/10 border border-[#856a26]/30 dark:bg-[#ffcd00]/10 dark:border-[#ffcd00]/30 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#856a26] dark:text-[#ffcd00] uppercase tracking-wider"
          >
            <span className="w-2 h-2 rounded-full bg-[#856a26] dark:bg-[#ffcd00] animate-pulse"></span>
            Librarian Spotlight
          </motion.span>
          
          <motion.h2 
            variants={itemVariants}
            className="text-3xl md:text-4xl font-black tracking-tight text-[#192230] dark:text-white"
          >
            Our Top Delivery <span className="text-[#856a26] dark:text-[#ffcd00]">Partners</span>
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-[#3d474e] dark:text-[#9ea7b3] text-sm md:text-base leading-relaxed max-w-xl mx-auto"
          >
            The active community hosts and local librarians dispatching literature directly to your doorstep.
          </motion.p>
        </div>

        {/* Dynamic Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {sortedLibrarians.map((librarian, index) => (
            <motion.div
              key={librarian._id}
              variants={itemVariants}
              className="group relative bg-white dark:bg-[#2c2f38] border border-slate-200/80 dark:border-gray-800 rounded-3xl overflow-hidden shadow-md hover:shadow-xl dark:hover:shadow-[#ffcd00]/10 hover:border-[#856a26]/40 dark:hover:border-[#ffcd00]/40 transition-all duration-300 hover:-translate-y-1.5 flex flex-col"
            >
              {/* Card Banner */}
              <div className="h-24 sm:h-28 bg-slate-100 dark:bg-[#192230] relative overflow-hidden border-b border-slate-200 dark:border-[#3d474e]/40">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#856a26]/5 dark:bg-[#ffcd00]/5 rounded-full blur-xl transition-all duration-300 group-hover:scale-125" />
                
                {/* Ranking Tag */}
                <div className="absolute top-4 right-4 bg-white/80 dark:bg-[#2c2f38]/80 backdrop-blur-xs border border-slate-200 dark:border-gray-700/50 px-2.5 py-1 rounded-lg text-xs font-black text-[#856a26] dark:text-[#ffcd00] uppercase tracking-wide">
                  Rank #{index + 1}
                </div>
              </div>

              {/* Profile Details Content Area */}
              <div className="px-4 sm:px-6 pb-6 grow flex flex-col items-center -mt-12 relative z-10 text-center">
                {/* Avatar Frame */}
                <div className="relative w-24 h-24 rounded-full border-4 border-white dark:border-[#2c2f38] overflow-hidden shadow-lg group-hover:border-[#856a26] dark:group-hover:border-[#ffcd00] group-hover:shadow-[0_0_15px_rgba(255,205,0,0.15)] transition-all duration-300 bg-slate-100 dark:bg-[#192230]">
                  <img
                    src={librarian.image}
                    alt={librarian.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                {/* Status Badging */}
                {librarian.status === 'approved' && (
                  <div className="mt-3.5 inline-flex items-center gap-1.5 bg-[#856a26]/5 dark:bg-[#ffcd00]/5 text-[#856a26] dark:text-[#ffcd00] px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase border border-[#856a26]/15 dark:border-[#ffcd00]/15">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified Host
                  </div>
                )}

                {/* Identification */}
                <h3 className="mt-3.5 text-lg sm:text-xl font-bold text-[#192230] dark:text-white transition-colors duration-200 group-hover:text-[#856a26] dark:group-hover:text-[#ffcd00]">
                  {librarian.name}
                </h3>
                <p className="text-xs text-[#3d474e] dark:text-[#9ea7b3] font-medium mt-0.5 max-w-50 sm:max-w-xs truncate">
                  {librarian.email}
                </p>

                {/* Divider Line */}
                <div className="w-full h-px bg-slate-100 dark:bg-gray-800/80 my-5" />

                {/* Delivery Counter Area */}
                <div className="w-full flex justify-between items-center bg-slate-50 dark:bg-[#192230] rounded-2xl p-4 border border-slate-100 dark:border-[#3d474e]/30 transition-colors duration-300">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="p-2 bg-white dark:bg-[#2c2f38] rounded-xl text-[#856a26] dark:text-[#ffcd00] border border-slate-200 dark:border-gray-700/50">
                      <Car className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <span className="text-[10px] sm:text-xs font-bold text-[#3d474e] dark:text-[#9ea7b3] uppercase tracking-wide">
                      Deliveries
                    </span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl sm:text-2xl font-black text-[#192230] dark:text-white">
                      {librarian.deliveryCount || 0}
                    </span>
                    <span className="text-[9px] sm:text-[10px] font-extrabold text-[#856a26] dark:text-[#ffcd00] uppercase tracking-wider">
                      Completed
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Border Accent */}
              <div className="absolute inset-x-0 bottom-0 h-1 bg-linear-to-r from-transparent via-[#856a26] dark:via-[#ffcd00] to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
            </motion.div>
          ))}
        </div>

      </motion.div>
    </section>
  );
};

export default TopLibrarians;