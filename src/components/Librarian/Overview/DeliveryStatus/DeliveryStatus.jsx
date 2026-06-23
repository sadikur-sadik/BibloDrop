'use client';

import React, { useEffect, useState } from 'react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Cell, 
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

const DeliveryStatusBarChart = ({ deliveries = [] }) => {
  const isDark = useDarkMode();
  
  const pendingCount = deliveries.filter(d => 
    d.deliveryStatus === 'pending' || d.deliveryStatus === 'processing'
  ).length;

  const dispatchedCount = deliveries.filter(d => 
    d.deliveryStatus === 'dispatched' || d.deliveryStatus === 'shipped'
  ).length;

  const deliveredCount = deliveries.filter(d => 
    d.deliveryStatus === 'delivered'
  ).length;

  const totalRequests = pendingCount + dispatchedCount + deliveredCount;

  const themeAccent = isDark ? '#ffcd00' : '#856a26';
  const midAccent = isDark ? '#ffd426' : '#a2843e';
  const neutralAccent = isDark ? '#475569' : '#cbd5e1';
  const labelColor = isDark ? '#94a3b8' : '#3d474e';
  const gridStroke = isDark ? '#2e3846' : '#f1f5f9';

  const data = [
    {
      name: "Pending",
      count: pendingCount,
      color: neutralAccent
    },
    {
      name: "Dispatched",
      count: dispatchedCount,
      color: midAccent
    },
    {
      name: "Delivered",
      count: deliveredCount,
      color: themeAccent
    }
  ];

  return (
    <div className="bg-white dark:bg-[#2c2f38] border border-slate-200/80 dark:border-gray-800 rounded-3xl p-6 md:p-8 flex flex-col justify-between h-full transition-colors duration-300">
      
      <div className="flex justify-between items-start mb-6">
        <div className="space-y-1">
          <h3 className="text-lg font-extrabold text-[#192230] dark:text-white">Fulfillment Status</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Current progress of book deliveries in queue</p>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-2xl font-black text-[#856a26] dark:text-[#ffcd00]">{totalRequests}</span>
          <span className="text-[10px] font-bold text-slate-400 uppercase">Requests</span>
        </div>
      </div>

      <div className="w-full h-44 relative mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={data} 
            margin={{ top: 20, right: 20, left: 20, bottom: 5 }}
          >
            <CartesianGrid 
              strokeDasharray="4 4" 
              vertical={false} 
              stroke={gridStroke}
            />
            
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: labelColor, fontSize: 10, fontWeight: 'bold' }}
              dy={10}
            />
            
            <YAxis hide />
            
            <Tooltip 
              cursor={{ fill: 'rgba(255, 255, 255, 0.03)' }}
              contentStyle={{ 
                backgroundColor: isDark ? '#192230' : '#ffffff', 
                border: isDark ? '1px solid #374151' : '1px solid #e2e8f0', 
                borderRadius: '12px',
                fontSize: '12px',
                color: isDark ? '#fff' : '#192230' 
              }}
              itemStyle={{ color: themeAccent }}
              labelStyle={{ color: isDark ? '#9ca3af' : '#64748b', fontWeight: 'bold' }}
            />
            
            <Bar 
              dataKey="count" 
              radius={[6, 6, 0, 0]}
              maxBarSize={45}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
              
              <LabelList 
                dataKey="count" 
                position="top" 
                fill={isDark ? '#ffffff' : '#192230'}
                className="text-xs font-black"
                offset={10}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DeliveryStatusBarChart;