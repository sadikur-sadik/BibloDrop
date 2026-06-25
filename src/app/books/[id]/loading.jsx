'use client';

import React from 'react';

// Replicates the Recharts horizontal bar chart inside ReviewStats
const ReviewStatsSkeleton = () => {
  const mockBarWidths = ['w-5/6', 'w-3/5', 'w-2/5', 'w-1/6', 'w-1/12'];

  return (
    <div className="bg-white dark:bg-[#2c2f38] p-6 rounded-3xl border border-slate-200/80 dark:border-gray-800 shadow-xs space-y-6 w-full">
      {/* Title */}
      <div className="border-b border-slate-100 dark:border-gray-800 pb-3 animate-pulse">
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-md w-36" />
      </div>

      {/* Numeric Score Header */}
      <div className="flex flex-col items-center justify-center text-center p-5 bg-slate-50 dark:bg-[#192230]/50 rounded-2xl border border-slate-200/50 dark:border-gray-800 animate-pulse">
        <div className="h-10 w-16 bg-slate-300 dark:bg-slate-600 rounded-xl" />
        <div className="h-3 w-32 bg-slate-200 dark:bg-slate-700/60 rounded-md mt-3" />
      </div>

      {/* Graphical Rating Distribution Curve */}
      <div className="pt-2 space-y-4 animate-pulse">
        <div className="h-2.5 w-36 bg-slate-200 dark:bg-slate-700/50 rounded-md mx-auto" />
        
        {/* Mock horizontal bars matching the Recharts Vertical BarChart */}
        <div className="w-full h-44 flex flex-col justify-between py-2">
          {mockBarWidths.map((widthClass, index) => (
            <div key={index} className="flex items-center gap-3 w-full">
              {/* Star label placeholder (e.g. 5 ★) */}
              <div className="w-8 h-3 bg-slate-200 dark:bg-slate-700 rounded-sm shrink-0" />
              {/* Distribution bar track */}
              <div className="flex-1 h-3 bg-slate-100 dark:bg-slate-800/60 rounded-r-md overflow-hidden">
                <div className={`h-full bg-slate-200 dark:bg-slate-700 ${widthClass} rounded-r-md`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Replicates the write review form inside PassingReview
const PassingReviewSkeleton = () => {
  return (
    <div className="bg-white dark:bg-[#2c2f38] p-6 rounded-3xl border border-slate-200/80 dark:border-gray-800 shadow-xs space-y-4 animate-pulse">
      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-md w-28" />

      <div className="space-y-4">
        {/* Rating Select dropdown placeholder */}
        <div>
          <div className="h-2 w-16 bg-slate-100 dark:bg-slate-800 rounded-sm mb-1.5" />
          <div className="h-8 w-44 bg-slate-100 dark:bg-slate-800 rounded-lg" />
        </div>

        {/* Textarea placeholder */}
        <div className="w-full h-24.5 rounded-xl border border-slate-200 dark:border-gray-800 bg-slate-50 dark:bg-[#192230]/50 p-4" />
        
        {/* Submit button aligned right */}
        <div className="flex justify-end">
          <div className="h-8 w-28 bg-slate-200 dark:bg-slate-700 rounded-lg" />
        </div>
      </div>
    </div>
  );
};

// Main combined Book Details loading page
const BookDetailsLoading = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#192230] text-slate-800 dark:text-white transition-colors duration-300 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* 1. Book Information Grid Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white dark:bg-[#2c2f38] p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-gray-800 shadow-xs">
          
          {/* Left Column: Cover Art (lg:col-span-4) */}
          <div className="lg:col-span-4 flex items-center justify-center bg-slate-100/50 dark:bg-[#192230]/30 rounded-2xl p-6 min-h-75 sm:min-h-100 animate-pulse">
            <div className="relative w-40 h-56 sm:w-48 sm:h-72 bg-slate-200 dark:bg-slate-700/60 rounded-xl shadow-md flex items-center justify-center">
              <svg className="w-12 h-12 text-slate-300 dark:text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
          </div>

          {/* Right Column: Detailed Text Info (lg:col-span-8) */}
          <div className="lg:col-span-8 flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              
              {/* Badges Row */}
              <div className="flex flex-wrap items-center gap-2 animate-pulse">
                <div className="bg-slate-200 dark:bg-slate-700/80 h-6 w-20 rounded-full" />
                <div className="bg-slate-200 dark:bg-slate-700/80 h-6 w-28 rounded-full" />
              </div>

              {/* Book Title */}
              <div className="space-y-2.5 animate-pulse">
                <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded-lg w-3/4" />
                <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded-md w-1/4" />
              </div>

              {/* Book Description paragraphs */}
              <div className="space-y-2 border-t border-slate-100 dark:border-gray-800 pt-4 animate-pulse">
                <div className="h-3.5 bg-slate-100 dark:bg-slate-800/80 rounded-sm w-full" />
                <div className="h-3.5 bg-slate-100 dark:bg-slate-800/80 rounded-sm w-11/12" />
                <div className="h-3.5 bg-slate-100 dark:bg-slate-800/80 rounded-sm w-4/5" />
              </div>

              {/* Information Row Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 border-t border-slate-100 dark:border-gray-800 pt-4 items-center animate-pulse">
                
                {/* Delivery Fee Block */}
                <div>
                  <div className="h-2.5 bg-slate-100 dark:bg-slate-800 rounded-sm w-16 mb-2" />
                  <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded-md w-12" />
                </div>

                {/* Date Cataloged Block */}
                <div>
                  <div className="h-2.5 bg-slate-100 dark:bg-slate-800 rounded-sm w-20 mb-2" />
                  <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded-md w-24" />
                </div>

                {/* Librarian Block */}
                <div className="col-span-2 md:col-span-1 border-t md:border-t-0 border-slate-100 dark:border-gray-800 pt-3 md:pt-0">
                  <div className="h-2.5 bg-slate-100 dark:bg-slate-800 rounded-sm w-16 mb-2" />
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 shrink-0" />
                    <div className="space-y-1.5 w-24">
                      <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-sm" />
                      <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-sm" />
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* CTA Buttons Row */}
            <div className="pt-6 border-t border-slate-100 dark:border-gray-800 animate-pulse">
              <div className="h-12 w-full max-w-sm rounded-full bg-slate-200 dark:bg-slate-700" />
            </div>

          </div>

        </div>

        {/* 2. Reviews Grid Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Review Statistics (lg:col-span-4) */}
          <div className="lg:col-span-4">
            <ReviewStatsSkeleton />
          </div>

          {/* Right Column: Submission Form & List (lg:col-span-8) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Input Review Block Placeholder */}
            <PassingReviewSkeleton />

            {/* Reviews List Placeholders */}
            {[...Array(2)].map((_, index) => (
              <div 
                key={index} 
                className="bg-white dark:bg-[#2c2f38] p-6 rounded-3xl border border-slate-200/80 dark:border-gray-800 space-y-4 animate-pulse"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 shrink-0" />
                  <div className="space-y-1.5">
                    <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-sm w-24" />
                    <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-sm w-16" />
                  </div>
                </div>
                <div className="space-y-2 pt-1">
                  <div className="h-3 bg-slate-100 dark:bg-slate-800/80 rounded-sm w-full" />
                  <div className="h-3 bg-slate-100 dark:bg-slate-800/80 rounded-sm w-4/5" />
                </div>
              </div>
            ))}

          </div>

        </div>

      </div>
    </div>
  );
};

export default BookDetailsLoading;