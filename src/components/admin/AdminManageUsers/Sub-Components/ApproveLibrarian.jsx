'use client';

import React from 'react';
import { Dropdown, Label } from '@heroui/react';

const ApproveLibrarian = ({ user, onStatusChange }) => {
  const statuses = ['approved', 'pending'];
  const currentStatus = user?.status || 'pending';

  const selectStatus = (status) => {
    if (status !== currentStatus) {
      onStatusChange(user, status);
    }
  };

  return (
    <Dropdown>
      <Dropdown.Trigger
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200/80 dark:border-gray-800 bg-white dark:bg-[#1e2330] hover:bg-slate-50 dark:hover:bg-[#2c3344] text-slate-700 dark:text-slate-200 text-xs font-bold transition-all shadow-sm cursor-pointer outline-none h-auto min-w-0"
      >
        <span>Status</span>
        <svg
          className="w-3.5 h-3.5 text-slate-500 transition-transform duration-200"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </Dropdown.Trigger>

      <Dropdown.Popover className="w-40 rounded-2xl border border-slate-200/80 dark:border-gray-800/80 bg-white/95 dark:bg-[#192230]/95 backdrop-blur-md shadow-xl py-1 z-50">
        <Dropdown.Menu onAction={(key) => selectStatus(String(key))}>
          {statuses.map((status) => (
            <Dropdown.Item
              id={status}
              key={status}
              textValue={status}
              className={`w-full text-left px-3 py-1.5 text-xs font-bold transition-colors cursor-pointer rounded-xl ${
                currentStatus === status
                  ? 'bg-slate-100 dark:bg-[#2c2f38] text-[#856a26] dark:text-[#ffcd00]'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#252a35]'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <Label className="capitalize">{status}</Label>
                {currentStatus === status && (
                  <svg className="w-3.5 h-3.5 text-current" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
};

export default ApproveLibrarian;