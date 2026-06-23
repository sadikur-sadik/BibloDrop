'use client';

import React, { useEffect, useState } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from 'recharts';

const useDarkMode = () => {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const checkTheme = () => setIsDark(document.documentElement.classList.contains('dark'));
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);
  return isDark;
};

const StarIcon = ({ filled = false }) => (
  <svg 
    className={`w-3.5 h-3.5 ${filled ? 'text-[#856a26] dark:text-[#ffcd00]' : 'text-slate-200 dark:text-slate-700'}`} 
    fill="currentColor" 
    viewBox="0 0 20 20"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const ReaderReviewChart = ({ reviews = [] }) => {
  const isDark = useDarkMode();
  const totalReviews = reviews.length;

  const averageRating = totalReviews > 0 
    ? (reviews.reduce((sum, r) => sum + (parseFloat(r.rating) || 0), 0) / totalReviews).toFixed(1)
    : "0.0";

  const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  
  reviews.forEach(review => {
    const rating = Math.round(parseFloat(review.rating || 0));
    if (rating >= 1 && rating <= 5) {
      distribution[rating] += 1;
    }
  });

  const chartData = [
    { 
      name: "5 ★", 
      percentage: totalReviews > 0 ? (distribution[5] / totalReviews) * 100 : 0,
      label: totalReviews > 0 ? `${((distribution[5] / totalReviews) * 100).toFixed(0)}%` : '0%'
    },
    { 
      name: "4 ★", 
      percentage: totalReviews > 0 ? (distribution[4] / totalReviews) * 100 : 0,
      label: totalReviews > 0 ? `${((distribution[4] / totalReviews) * 100).toFixed(0)}%` : '0%'
    },
    { 
      name: "3 ★", 
      percentage: totalReviews > 0 ? (distribution[3] / totalReviews) * 100 : 0,
      label: totalReviews > 0 ? `${((distribution[3] / totalReviews) * 100).toFixed(0)}%` : '0%'
    },
    { 
      name: "2 ★", 
      percentage: totalReviews > 0 ? (distribution[2] / totalReviews) * 100 : 0,
      label: totalReviews > 0 ? `${((distribution[2] / totalReviews) * 100).toFixed(0)}%` : '0%'
    },
    { 
      name: "1 ★", 
      percentage: totalReviews > 0 ? (distribution[1] / totalReviews) * 100 : 0,
      label: totalReviews > 0 ? `${((distribution[1] / totalReviews) * 100).toFixed(0)}%` : '0%'
    }
  ];

  const themeAccent = isDark ? '#ffcd00' : '#856a26';
  const labelColor = isDark ? '#94a3b8' : '#3d474e';

  return (
    <div className="bg-white dark:bg-[#2c2f38] border border-slate-200/80 dark:border-gray-800 rounded-3xl p-6 md:p-8 flex flex-col justify-between h-full transition-colors duration-300">
      
      <div className="space-y-1 mb-4">
        <h3 className="text-lg font-extrabold text-[#192230] dark:text-white">Review Sentiment</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">Total metrics from your rating submissions</p>
      </div>

      <div className="flex flex-col gap-4 my-auto">
        
        <div className="text-center pb-2 border-b border-slate-100 dark:border-gray-800/80">
          <p className="text-4xl font-black text-[#192230] dark:text-white">{averageRating}</p>
          <div className="flex justify-center gap-0.5 mt-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <StarIcon key={star} filled={star <= Math.round(parseFloat(averageRating))} />
            ))}
          </div>
          <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400 mt-1">
            {totalReviews} Rating{totalReviews !== 1 ? 's' : ''} Submitted
          </p>
        </div>

        <div className="relative h-32">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={chartData}
              margin={{ top: 0, right: 10, left: -25, bottom: 0 }}
            >
              <XAxis type="number" hide />
              
              <YAxis 
                yAxisId="left"
                dataKey="name" 
                type="category" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: labelColor, fontWeight: 'bold', fontSize: 10 }} 
              />
              
              <YAxis 
                yAxisId="right"
                dataKey="label" 
                type="category" 
                orientation="right"
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: labelColor, fontSize: 10, fontWeight: 'bold' }} 
              />
              
              <Bar 
                yAxisId="left"
                dataKey="percentage" 
                fill={themeAccent} 
                radius={[0, 4, 4, 0]} 
                background={{ fill: isDark ? '#192230' : '#f1f5f9' }} 
                barSize={6}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>

    </div>
  );
};

export default ReaderReviewChart;