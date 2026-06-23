'use client';

import React from 'react';
import AdminStatsCards from './AdminStatsCards/AdminStatsCards';
import CategoryPieChart from './CategoryPieChart/CategoryPieChart';
import RolePieChart from './RolePieChart/RolePieChart';
import ReviewChart from './ReviewChart/ReviewChart';
import WeeklyRevenueTrend from './WeeklyRevenueTrend/WeeklyRevenueTrend';
import FulfillmentBarChart from './FulfillmentBarChart/FulfillmentBarChart';

const OverviewAdmin = ({ books = [], deliveries = [], reviews = [], users = [] }) => {
  
  // Core Statistics Calculations
  const totalUsers = users.length;
  const totalBooks = books.length;
  const totalDeliveries = deliveries.length;
  
  const totalRevenue = deliveries
    .filter(d => d.deliveryStatus === 'delivered')
    .reduce((sum, d) => sum + parseFloat(d.paid || 0), 0);

  return (
    <div className="w-full bg-slate-50 dark:bg-[#192230] text-[#192230] dark:text-white py-12 px-4 md:px-12 transition-colors duration-300 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Workspace Banner */}
        <div className="border-b border-slate-200/80 dark:border-gray-800/80 pb-6 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-800 dark:text-white">
              Biblio<span className="text-[#856a26] dark:text-[#ffcd00]">Drop</span> Administrative Hub
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Global platform analytics, collections overview, and fulfillment trackers.
            </p>
          </div>
        </div>

        {/* 1. Statistics Cards Block */}
        <AdminStatsCards 
          totalUsers={totalUsers}
          totalBooks={totalBooks}
          totalRevenue={totalRevenue}
          totalDeliveries={totalDeliveries}
        />

        {/* 2. Structured Multi-Chart Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Top-Middle Row Left: Category Breakdown Pie Chart (4 cols) */}
          <div className="lg:col-span-4">
            <CategoryPieChart books={books} />
          </div>

          {/* Top-Middle Row Center: User Role Distribution Pie Chart (4 cols) */}
          <div className="lg:col-span-4">
            <RolePieChart users={users} />
          </div>

          {/* Top-Middle Row Right: Stars breakdown Chart (4 cols) */}
          <div className="lg:col-span-4">
            <ReviewChart reviews={reviews} />
          </div>

          {/* Bottom Row Left: Live 7-Day Revenue Trend (6 cols) */}
          <div className="lg:col-span-6">
            <WeeklyRevenueTrend deliveries={deliveries} />
          </div>

          {/* Bottom Row Right: Live Delivery Fulfillment Bar Chart (6 cols) */}
          <div className="lg:col-span-6">
            <FulfillmentBarChart deliveries={deliveries} />
          </div>

        </div>

      </div>
    </div>
  );
};

export default OverviewAdmin;