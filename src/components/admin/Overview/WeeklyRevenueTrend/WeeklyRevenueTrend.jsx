'use client';

import React, { useEffect, useState } from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  LabelList 
} from 'recharts';

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

const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(value);
};

const WeeklyRevenueTrend = ({ deliveries = [] }) => {
  const isDark = useDarkMode();
  
  // past 7 days starting from June 23, 2026
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date("2026-06-23T00:00:00.000Z");
    d.setDate(d.getDate() - i);
    return {
      dateStr: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      dateKey: d.toISOString().split('T')[0],
      revenue: 0,
    };
  }).reverse();

  deliveries.forEach(delivery => {
    if (delivery.deliveryStatus === 'delivered' && delivery.createdAt) {
      const dateKey = new Date(delivery.createdAt).toISOString().split('T')[0];
      const match = last7Days.find(day => day.dateKey === dateKey);
      if (match) {
        match.revenue += parseFloat(delivery.paid || 0);
      }
    }
  });

  const weeklyTotal = last7Days.reduce((acc, curr) => acc + curr.revenue, 0);

  const themeAccent = isDark ? '#ffcd00' : '#856a26';
  const gridStroke = isDark ? '#2e3846' : '#f1f5f9';

  return (
    <div className="bg-white dark:bg-[#2c2f38] border border-slate-200/80 dark:border-gray-800 rounded-3xl p-6 md:p-8 flex flex-col justify-between h-full transition-colors duration-300">
      
      <div className="flex justify-between items-start mb-6">
        <div className="space-y-1">
          <h3 className="text-lg font-extrabold text-[#192230] dark:text-white">System Revenue Trend</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Total delivered earnings logged in the last 7 days</p>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-2xl font-black text-[#856a26] dark:text-[#ffcd00]">
            {formatCurrency(weeklyTotal)}
          </span>
          <span className="text-[10px] font-bold text-slate-400 uppercase">This Week</span>
        </div>
      </div>

      <div className="w-full h-44 relative mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={last7Days}
            margin={{ top: 20, right: 15, left: 15, bottom: 5 }}
          >
            <defs>
              <linearGradient id="adminRevenueGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={themeAccent} stopOpacity={0.25} />
                <stop offset="95%" stopColor={themeAccent} stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid 
              strokeDasharray="4 4" 
              vertical={false} 
              stroke={gridStroke}
            />

            <XAxis 
              dataKey="dateStr" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: isDark ? '#94a3b8' : '#3d474e', fontSize: 10, fontWeight: 'bold' }}
              dy={10}
            />

            <YAxis hide domain={[0, 'auto']} />

            <Tooltip 
              contentStyle={{ 
                backgroundColor: isDark ? '#192230' : '#ffffff', 
                border: isDark ? '1px solid #374151' : '1px solid #e2e8f0', 
                borderRadius: '12px',
                fontSize: '12px',
                color: isDark ? '#fff' : '#192230' 
              }}
              formatter={(value) => [formatCurrency(value), "Revenue"]}
              labelStyle={{ color: isDark ? '#9ca3af' : '#64748b', fontWeight: 'bold' }}
            />

            <Area 
              type="monotone" 
              dataKey="revenue" 
              stroke={themeAccent} 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#adminRevenueGrad)" 
              dot={{ r: 4, stroke: themeAccent, strokeWidth: 2, fill: isDark ? '#2c2f38' : '#ffffff' }}
              activeDot={{ r: 6, stroke: themeAccent, strokeWidth: 2, fill: themeAccent }}
            >
              <LabelList 
                dataKey="revenue" 
                position="top" 
                offset={10}
                formatter={(val) => (val > 0 ? formatCurrency(val) : '')}
                fill={isDark ? '#ffffff' : '#192230'}
                className="text-xs font-black"
              />
            </Area>
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WeeklyRevenueTrend;