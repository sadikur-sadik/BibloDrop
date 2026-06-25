'use client';

import React from 'react';

const LoadingPage = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-slate-50 dark:bg-[#192230] transition-colors duration-300">
      
      {/* Spinner Container */}
      <div className="relative flex items-center justify-center">
        {/* Outer Ring */}
        <div className="w-16 h-16 border-4 border-slate-200 dark:border-slate-700 rounded-full" />
        
        {/* Spinning Indicator */}
        <div className="absolute w-16 h-16 border-4 border-t-[#856a26] dark:border-t-[#ffcd00] rounded-full animate-spin" />
      </div>

      {/* Optional Loading Text */}
      <p className="mt-6 text-sm font-medium text-slate-500 dark:text-slate-400 animate-pulse">
        Loading...
      </p>
    </div>
  );
};

export default LoadingPage;