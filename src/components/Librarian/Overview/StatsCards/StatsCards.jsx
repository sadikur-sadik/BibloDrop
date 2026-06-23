'use client';

import React, { useEffect, useState } from 'react';
import { motion, animate } from 'motion/react';
import { 
  Book, 
  CardDiamond, 
  ShieldCheck, 
  Check 
} from '@gravity-ui/icons';

const CountUpValue = ({ to, duration = 1.8, isDecimal = false }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const controls = animate(0, to, {
      duration: duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (value) => {
        setCount(isDecimal ? parseFloat(value.toFixed(2)) : Math.floor(value));
      }
    });
    return () => controls.stop();
  }, [to, duration, isDecimal]);

  return (
    <span>
      {isDecimal 
        ? count.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) 
        : count.toLocaleString()
      }
    </span>
  );
};

const LibrarianOverviewStats = ({ 
  publishedCount = 0, 
  unpublishedCount = 0, 
  revenue = 0, 
  reviewsCount = 0 
}) => {

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 100, damping: 15 } 
    }
  };

  const statCards = [
    {
      id: "published",
      value: publishedCount,
      label: "Published Books",
      subLabel: "Active in global catalogue",
      prefix: "",
      isDecimal: false,
      icon: <Check className="w-5 h-5 text-[#856a26] dark:text-[#ffcd00]" />,
      accentColor: "border-slate-200/80 dark:border-gray-800 hover:border-emerald-500/30 dark:hover:border-emerald-500/30"
    },
    {
      id: "unpublished",
      value: unpublishedCount,
      label: "Unpublished Drafts",
      subLabel: "Saved or temporarily hidden",
      prefix: "",
      isDecimal: false,
      icon: <Book className="w-5 h-5 text-slate-400 dark:text-slate-500" />,
      accentColor: "border-slate-200/80 dark:border-gray-800 hover:border-slate-500/30 dark:hover:border-slate-500/30"
    },
    {
      id: "revenue",
      value: revenue,
      label: "Total Revenue",
      subLabel: "Earned from deliveries",
      prefix: "$",
      isDecimal: true,
      icon: <CardDiamond className="w-5 h-5 text-[#856a26] dark:text-[#ffcd00]" />,
      accentColor: "border-slate-200/80 dark:border-gray-800 hover:border-[#856a26]/30 dark:hover:border-[#ffcd00]/40"
    },
    {
      id: "reviews",
      value: reviewsCount,
      label: "Total Reviews",
      subLabel: "Submitted by readers",
      prefix: "",
      isDecimal: false,
      icon: <ShieldCheck className="w-5 h-5 text-[#856a26] dark:text-[#ffcd00]" />,
      accentColor: "border-slate-200/80 dark:border-gray-800 hover:border-[#856a26]/30 dark:hover:border-[#ffcd00]/40"
    }
  ];

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
    >
      {statCards.map((stat) => (
        <motion.div
          key={stat.id}
          variants={itemVariants}
          whileHover={{ y: -4, scale: 1.01, transition: { duration: 0.15 } }}
          className={`bg-white dark:bg-[#2c2f38] border rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden shadow-xs hover:shadow-md dark:shadow-none transition-all duration-300 group ${stat.accentColor}`}
        >
          <div className="flex justify-between items-start w-full">
            <div className="space-y-1">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {stat.label}
              </p>
              <p className="text-xs text-[#3d474e] dark:text-slate-500">
                {stat.subLabel}
              </p>
            </div>
            <div className="bg-slate-100 dark:bg-[#192230] p-2.5 rounded-xl border border-slate-200 dark:border-gray-700/40 group-hover:bg-[#856a26]/10 dark:group-hover:bg-[#ffcd00]/10 group-hover:border-[#856a26]/30 dark:group-hover:border-[#ffcd00]/30 transition-colors duration-300">
              {stat.icon}
            </div>
          </div>

          <div className="mt-8">
            <div className="text-3xl md:text-4xl font-black tracking-tight text-[#192230] dark:text-white flex items-baseline">
              {stat.prefix && (
                <span className="text-lg md:text-xl font-bold mr-0.5 text-slate-400 dark:text-[#ffcd00] select-none">
                  {stat.prefix}
                </span>
              )}
              <CountUpValue to={stat.value} isDecimal={stat.isDecimal} />
            </div>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-0.75 bg-linear-to-r from-transparent via-[#856a26] dark:via-[#ffcd00] to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default LibrarianOverviewStats;