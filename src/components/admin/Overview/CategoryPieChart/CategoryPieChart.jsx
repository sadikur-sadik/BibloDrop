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

const GENRES = [
  { id: "fiction", name: "Fiction" },
  { id: "non-fiction", name: "Non-Fiction" },
  { id: "sci-fi", name: "Science Fiction" },
  { id: "fantasy", name: "Fantasy" },
  { id: "mystery-thriller", name: "Mystery & Thriller" },
  { id: "biography-memoir", name: "Biography & Memoir" },
  { id: "history", name: "History" },
  { id: "religion-spirituality", name: "Religion & Spirituality" },
  { id: "science-tech", name: "Science & Technology" },
  { id: "self-help", name: "Self-Help" },
  { id: "business-finance", name: "Business & Finance" },
  { id: "poetry", name: "Poetry" },
  { id: "classics", name: "Classics" },
];

const COLORS = [
  '#856a26', '#a2843e', '#bca35d', '#d5bf7f', '#ffd426', 
  '#ffcd00', '#64748b', '#cbd5e1', '#334155', '#1e293b'
];

const CategoryPieChart = ({ books = [] }) => {
  const isDark = useDarkMode();

  const counts = {};
  books.forEach(b => {
    const genreId = b.genre ? b.genre.trim().toLowerCase() : '';
    if (genreId) {
      counts[genreId] = (counts[genreId] || 0) + 1;
    }
  });

  const chartData = GENRES.map((genre, idx) => ({
    name: genre.name,
    value: counts[genre.id] || 0,
    color: COLORS[idx % COLORS.length]
  })).filter(item => item.value > 0);

  const totalBooks = chartData.reduce((sum, item) => sum + item.value, 0);
  const isNoData = chartData.length === 0;

  const fallbackData = [{ name: 'No Books Found', value: 1, color: isDark ? '#475569' : '#e2e8f0' }];

  return (
    <div className="bg-white dark:bg-[#2c2f38] border border-slate-200/80 dark:border-gray-800 rounded-3xl p-6 md:p-8 flex flex-col justify-between h-full transition-colors duration-300">
      
      <div className="flex justify-between items-start mb-4">
        <div className="space-y-1">
          <h3 className="text-lg font-extrabold text-[#192230] dark:text-white">Books by Category</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Total physical collection split by genre</p>
        </div>
      </div>

      <div className="relative flex items-center justify-center my-4 h-40">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={isNoData ? fallbackData : chartData}
              cx="50%"
              cy="50%"
              innerRadius={36}
              outerRadius={48}
              startAngle={90}
              endAngle={-270}
              dataKey="value"
              stroke="none"
              paddingAngle={!isNoData && chartData.length > 1 ? 2 : 0}
            >
              {(isNoData ? fallbackData : chartData).map((entry, index) => (
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
              />
            )}
          </PieChart>
        </ResponsiveContainer>

        <div className="absolute text-center pointer-events-none">
          <p className="text-3xl font-black text-[#192230] dark:text-white">{totalBooks}</p>
          <p className="text-[9px] font-bold text-slate-400 uppercase">Items</p>
        </div>
      </div>

      <div className="max-h-24 overflow-y-auto space-y-2 mt-4 pr-1 border-t border-slate-100 dark:border-gray-800/80 pt-4 custom-scrollbar">
        {isNoData ? (
          <p className="text-xs text-center text-slate-400">No category statistics available.</p>
        ) : (
          chartData.map((item, idx) => (
            <div key={idx} className="flex justify-between items-center text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="font-semibold text-slate-600 dark:text-slate-300">{item.name}</span>
              </div>
              <span className="font-extrabold text-[#192230] dark:text-white">
                {item.value} <span className="text-slate-400 font-normal">({((item.value / totalBooks) * 100).toFixed(0)}%)</span>
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CategoryPieChart;