'use client';

import React, { useState, useEffect } from 'react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Cell 
} from 'recharts';

export default function ReviewStats({ reviews }) {
  const [mounted, setMounted] = useState(false);

  // Safe SSR mount guard for Recharts
  useEffect(() => {
    setMounted(true);
  }, []);

  // Directly calculate values on every render (no useMemo)
  const total = reviews?.length || 0;
  let average = '0.0';
  let distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  let chartData = [];

  if (total > 0) {
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    average = (sum / total).toFixed(1);

    [5, 4, 3, 2, 1].forEach((star) => {
      distribution[star] = reviews.filter((r) => r.rating === star).length;
    });

    // Formatted strictly for the vertical Recharts BarChart layout (5 Stars at the top)
    chartData = [
      { name: '5 ★', count: distribution[5] },
      { name: '4 ★', count: distribution[4] },
      { name: '3 ★', count: distribution[3] },
      { name: '2 ★', count: distribution[2] },
      { name: '1 ★', count: distribution[1] },
    ];
  } else {
    chartData = [
      { name: '5 ★', count: 5 },
      { name: '4 ★', count: 4 },
      { name: '3 ★', count: 1 },
      { name: '2 ★', count: 3 },
      { name: '1 ★', count: 0 },
    ];
  }

  return (
    <div className="bg-white dark:bg-[#2c2f38] p-6 rounded-3xl border border-slate-200/80 dark:border-gray-800 shadow-xs space-y-6">
      <h3 className="text-base font-bold border-b border-slate-100 dark:border-gray-800 pb-3">
        Reviews Summary
      </h3>

      {/* Numeric Score Header */}
      <div className="flex flex-col items-center justify-center text-center p-5 bg-slate-50 dark:bg-[#192230]/50 rounded-2xl border border-slate-200/50 dark:border-gray-800">
        <span className="text-4xl font-black text-slate-800 dark:text-white">
          {average}
        </span>
        <span className="text-xs text-slate-500 dark:text-slate-400 mt-2">
          {total} Ratings and Reviews
        </span>
      </div>

      {/* Recharts Graphical Rating Distribution Curve */}
      {mounted && (
        <div className="pt-2">
          <p className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 mb-4 tracking-wider text-center">
            Rating Distribution Curve
          </p>
          <div className="w-full h-44">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={chartData} 
                layout="vertical" 
                margin={{ left: -20, right: 15, top: 0, bottom: 0 }}
              >
                <XAxis type="number" hide />
                <YAxis 
                  type="category" 
                  dataKey="name" 
                  stroke="#94a3b8" 
                  fontSize={11} 
                  tickLine={false} 
                  axisLine={false}
                />
                <Tooltip 
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ 
                    background: '#1e293b', 
                    border: 'none', 
                    borderRadius: '8px', 
                    color: '#fff',
                    fontSize: '11px' 
                  }} 
                />
                <Bar 
                  dataKey="count" 
                  radius={[0, 4, 4, 0]}
                  barSize={12}
                >
                  {chartData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill="#ffcd00" // Cohesive amber/gold matching your dark-theme accents
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}