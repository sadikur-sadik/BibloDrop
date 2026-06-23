'use client';

import React, { useEffect, useState } from 'react';
import { animate } from 'motion/react';

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

const ReaderStatsCards = ({ 
  totalBooksOwned = 0, 
  totalSpent = 0, 
  pendingDeliveriesCount = 0, 
  totalReviewsCount = 0 
}) => {

  const statCards = [
    {
      id: "books-read",
      value: totalBooksOwned,
      label: "Total Books Owned",
      subLabel: "Delivered resources in collection",
      prefix: "",
      isDecimal: false,
      icon: (
        <svg className="w-5 h-5 text-[#856a26] dark:text-[#ffcd00]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      accentColor: "border-slate-200/80 dark:border-gray-800 hover:border-[#856a26]/30 dark:hover:border-[#ffcd00]/40"
    },
    {
      id: "total-fees",
      value: totalSpent,
      label: "Total Spent on Fees",
      subLabel: "Accrued order service fees",
      prefix: "$",
      isDecimal: true,
      icon: (
        <svg className="w-5 h-5 text-[#856a26] dark:text-[#ffcd00]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      accentColor: "border-slate-200/80 dark:border-gray-800 hover:border-emerald-500/30"
    },
    {
      id: "pending-requests",
      value: pendingDeliveriesCount,
      label: "Pending Deliveries",
      subLabel: "Orders processing in status log",
      prefix: "",
      isDecimal: false,
      icon: (
        <svg className="w-5 h-5 text-[#856a26] dark:text-[#ffcd00]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      accentColor: "border-slate-200/80 dark:border-gray-800 hover:border-amber-500/30"
    },
    {
      id: "reviews",
      value: totalReviewsCount,
      label: "Total Reviews",
      subLabel: "Submitted reading reports",
      prefix: "",
      isDecimal: false,
      icon: (
        <svg className="w-5 h-5 text-[#856a26] dark:text-[#ffcd00]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ),
      accentColor: "border-slate-200/80 dark:border-gray-800 hover:border-indigo-500/30"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {statCards.map((stat) => (
        <div
          key={stat.id}
          className={`bg-white dark:bg-[#2c2f38] border rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 group ${stat.accentColor}`}
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
        </div>
      ))}
    </div>
  );
};

export default ReaderStatsCards;