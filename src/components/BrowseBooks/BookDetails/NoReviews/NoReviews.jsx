'use client';

import React from 'react';

export default function NoReviews() {
  return (
    <div className="p-8 bg-white dark:bg-[#2c2f38] rounded-3xl border border-slate-200/80 dark:border-gray-800 shadow-xs text-center space-y-2">
      <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
        No Reviews Yet
      </p>
      <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
        Be the first to share your thoughts, content quality feedback, or layout impressions.
      </p>
    </div>
  );
}