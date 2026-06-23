'use client';

import React from 'react';
import ReaderStatsCards from './ReaderStats/ReaderStatsCard';
import ReaderReviewChart from './ReviewChart/ReviewChart';
import FulfillmentBarChart from './FulfillmentBar/FulfillmentBar';
import WeeklySpendingTrend from './SpendingTrend/SpendingTrend';

const OverviewReader = ({ reader = {}, deliveries = [], reviews = [] }) => {
  const readerEmail = reader?.email;
  const readerId = reader?._id || reader?.id;

  // Safeguard: Filter collections to this specific reader if global data is passed.
  // If the parent component has already pre-filtered the arrays, these statements will safely preserve all records.
  const myDeliveries = deliveries.filter(d => 
    !readerEmail || d.userEmail === readerEmail || d.userId === readerId
  );
  
  const myReviews = reviews.filter(r => 
    !readerEmail || r.reviewerEmail === readerEmail
  );

  // 1. Calculations for Quick Stats
  const totalBooksOwned = myDeliveries.filter(d => d.deliveryStatus === 'delivered').length;
  
  const totalSpent = myDeliveries
    .filter(d => d.deliveryStatus === 'delivered')
    .reduce((sum, d) => sum + parseFloat(d.paid || 0), 0);

  const pendingDeliveriesCount = myDeliveries.filter(d => 
    d.deliveryStatus === 'pending' || d.deliveryStatus === 'processing'
  ).length;

  const totalReviewsCount = myReviews.length;

  return (
    <div className="w-full bg-slate-50 dark:bg-[#192230] text-[#192230] dark:text-white py-12 px-4 md:px-12 transition-colors duration-300 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header/Banner */}
        <div className="border-b border-slate-200/80 dark:border-gray-800/80 pb-6 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-800 dark:text-white">
              Reader<span className="text-[#856a26] dark:text-[#ffcd00]">Dashboard</span>
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Welcome back, <span className="font-bold text-[#856a26] dark:text-[#ffcd00]">{reader?.name || 'Reader'}</span>. Track your library logs and collection stats.
            </p>
          </div>
        </div>

        {/* 1. Statistics Cards Block */}
        <ReaderStatsCards 
          totalBooksOwned={totalBooksOwned}
          totalSpent={totalSpent}
          pendingDeliveriesCount={pendingDeliveriesCount}
          totalReviewsCount={totalReviewsCount}
        />

        {/* 2. Graphical Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Middle Row Left: Star Reviews Distribution (4 cols) */}
          <div className="lg:col-span-4">
            <ReaderReviewChart reviews={myReviews} />
          </div>

          {/* Middle Row Right: Book Status Allocation (8 cols) */}
          <div className="lg:col-span-8">
            <FulfillmentBarChart deliveries={myDeliveries} />
          </div>

          {/* Bottom Row: 7-Day Spending Trend (12 cols) */}
          <div className="lg:col-span-12">
            <WeeklySpendingTrend deliveries={myDeliveries} />
          </div>

        </div>

      </div>
    </div>
  );
};

export default OverviewReader;