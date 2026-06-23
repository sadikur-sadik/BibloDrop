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

const RolePieChart = ({ users = [] }) => {
  const isDark = useDarkMode();

  const roles = { admin: 0, librarian: 0, reader: 0 };
  
  users.forEach(user => {
    const rawRole = user.role ? user.role.trim().toLowerCase() : '';
    if (rawRole === 'admin') roles.admin += 1;
    else if (rawRole === 'librarian') roles.librarian += 1;
    else roles.reader += 1; // Default fallback to reader
  });

  const totalUsers = users.length;

  const adminColor = isDark ? '#ffcd00' : '#856a26';
  const librarianColor = isDark ? '#ffd426' : '#a2843e';
  const readerColor = isDark ? '#64748b' : '#cbd5e1';

  const chartData = [
    { name: 'Admin', value: roles.admin, color: adminColor },
    { name: 'Librarian', value: roles.librarian, color: librarianColor },
    { name: 'Reader', value: roles.reader, color: readerColor }
  ].filter(item => item.value > 0);

  const isNoData = totalUsers === 0;
  const fallbackData = [{ name: 'No Users Found', value: 1, color: isDark ? '#475569' : '#e2e8f0' }];

  return (
    <div className="bg-white dark:bg-[#2c2f38] border border-slate-200/80 dark:border-gray-800 rounded-3xl p-6 md:p-8 flex flex-col justify-between h-full transition-colors duration-300">
      
      <div className="flex justify-between items-start mb-4">
        <div className="space-y-1">
          <h3 className="text-lg font-extrabold text-[#192230] dark:text-white">Role Breakdown</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Platform demographics ratio</p>
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
              paddingAngle={!isNoData && chartData.length > 1 ? 3 : 0}
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
          <p className="text-3xl font-black text-[#192230] dark:text-white">{totalUsers}</p>
          <p className="text-[9px] font-bold text-slate-400 uppercase">Users</p>
        </div>
      </div>

      <div className="space-y-3 mt-4 border-t border-slate-100 dark:border-gray-800/80 pt-4">
        <div className="flex justify-between items-center text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#856a26] dark:bg-[#ffcd00]" />
            <span className="font-semibold text-slate-600 dark:text-slate-300">Admin</span>
          </div>
          <span className="font-extrabold text-[#192230] dark:text-white">
            {roles.admin} <span className="text-slate-400 font-normal">({totalUsers > 0 ? ((roles.admin / totalUsers) * 100).toFixed(0) : 0}%)</span>
          </span>
        </div>

        <div className="flex justify-between items-center text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#a2843e] dark:bg-[#ffd426]" />
            <span className="font-semibold text-slate-600 dark:text-slate-300">Librarian</span>
          </div>
          <span className="font-extrabold text-[#192230] dark:text-white">
            {roles.librarian} <span className="text-slate-400 font-normal">({totalUsers > 0 ? ((roles.librarian / totalUsers) * 100).toFixed(0) : 0}%)</span>
          </span>
        </div>

        <div className="flex justify-between items-center text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-400 dark:bg-slate-500" />
            <span className="font-semibold text-slate-600 dark:text-slate-300">Reader</span>
          </div>
          <span className="font-extrabold text-[#192230] dark:text-white">
            {roles.reader} <span className="text-slate-400 font-normal">({totalUsers > 0 ? ((roles.reader / totalUsers) * 100).toFixed(0) : 0}%)</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default RolePieChart;