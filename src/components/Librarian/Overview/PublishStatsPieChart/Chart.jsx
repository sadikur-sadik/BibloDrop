'use client';

import React, { useEffect, useState } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

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

const BookPublishPieChart = ({ published = 0, unpublished = 0 }) => {
  const isDark = useDarkMode();
  const total = published + unpublished;
  
  const publishedPct = total > 0 ? (published / total) * 100 : 0;
  const unpublishedPct = total > 0 ? (unpublished / total) * 100 : 0;

  const isNoData = total === 0;

  const publishedColor = isDark ? '#ffcd00' : '#856a26';
  const unpublishedColor = isDark ? '#64748b' : '#cbd5e1';

  const chartData = isNoData 
    ? [{ name: 'No Books', value: 1, color: isDark ? '#475569' : '#e2e8f0' }]
    : [
        { name: 'Published', value: published, color: publishedColor },
        { name: 'Unpublished', value: unpublished, color: unpublishedColor }
      ];

  return (
    <div className="bg-white dark:bg-[#2c2f38] border border-slate-200/80 dark:border-gray-800 rounded-3xl p-6 md:p-8 flex flex-col justify-between h-full transition-colors duration-300">
      
      <div className="flex justify-between items-start mb-6">
        <div className="space-y-1">
          <h3 className="text-lg font-extrabold text-[#192230] dark:text-white">Catalogue Distribution</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Ratio of live vs draft collection items</p>
        </div>
        <div className="bg-[#856a26]/10 border border-[#856a26]/30 dark:bg-[#ffcd00]/10 dark:border-[#ffcd00]/30 px-3 py-1 rounded-xl text-[10px] font-black text-[#856a26] dark:text-[#ffcd00] uppercase tracking-wider select-none transition-all duration-300">
          {total} Total Books
        </div>
      </div>

      <div className="relative flex items-center justify-center my-4 h-40">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={32}
              outerRadius={44}
              startAngle={90}
              endAngle={-270}
              dataKey="value"
              stroke="none"
              paddingAngle={!isNoData && published > 0 && unpublished > 0 ? 3 : 0}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            
            {!isNoData && (
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? '#192230' : '#ffffff',
                  border: isDark ? '1px solid #374151' : '1px solid #e2e8f0',
                  borderRadius: '12px',
                  fontSize: '12px',
                  color: isDark ? '#fff' : '#192230',
                }}
                itemStyle={{ color: publishedColor }}
              />
            )}
          </PieChart>
        </ResponsiveContainer>

        <div className="absolute text-center pointer-events-none">
          <p className="text-4xl font-black text-[#192230] dark:text-white">{total}</p>
        </div>
      </div>

      <div className="space-y-3 mt-6 border-t border-slate-100 dark:border-gray-800/80 pt-4">
        <div className="flex justify-between items-center text-xs">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#856a26] dark:bg-[#ffcd00]" />
            <span className="font-semibold text-slate-600 dark:text-slate-300">Published</span>
          </div>
          <span className="font-extrabold text-[#192230] dark:text-white">
            {published} <span className="text-slate-400 font-normal">({publishedPct.toFixed(0)}%)</span>
          </span>
        </div>

        <div className="flex justify-between items-center text-xs">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-slate-400 dark:bg-slate-500" />
            <span className="font-semibold text-slate-600 dark:text-slate-300">Unpublished</span>
          </div>
          <span className="font-extrabold text-[#192230] dark:text-white">
            {unpublished} <span className="text-slate-400 font-normal">({unpublishedPct.toFixed(0)}%)</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default BookPublishPieChart;