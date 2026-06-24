'use client';

import React from 'react';
import AdminStatsCards from './AdminStatsCards/AdminStatsCards';
import CategoryPieChart from './CategoryPieChart/CategoryPieChart';
import RolePieChart from './RolePieChart/RolePieChart';
import ReviewChart from './ReviewChart/ReviewChart';
import WeeklyRevenueTrend from './WeeklyRevenueTrend/WeeklyRevenueTrend';
import FulfillmentBarChart from './FulfillmentBarChart/FulfillmentBarChart';
import { motion } from 'motion/react';

const OverviewAdmin = ({ books = [], deliveries = [], reviews = [], users = [] }) => {
  
  // Core Statistics Calculations
  const totalUsers = users.length;
  const totalBooks = books.length;
  const totalDeliveries = deliveries.length;
  
  const totalRevenue = deliveries
    .reduce((sum, d) => sum + parseFloat(d.paid || 0), 0);

  return (
    /* 
      Updated container system: switched to bg-transparent and removed restrictive 
      max-width limits so that it fills the parent container's width and height.
    */
    <div className="relative w-full min-h-screen bg-transparent text-[#192230] dark:text-white transition-colors duration-300 space-y-6">
      
      {/* Workspace Banner */}
      <div className="border-b border-slate-200/80 dark:border-gray-800/80 pb-6 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }} 
            className="text-2xl font-black tracking-tight text-slate-800 dark:text-white"
          >
           Administrative<span className="text-[#856a26] dark:text-[#ffcd00]"> Hub</span> 
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }} 
            className="text-xs text-slate-500 dark:text-slate-400 mt-1"
          >
            Global platform analytics, collections overview, and fulfillment trackers.
          </motion.p>
        </div>
      </div>

      <div className="w-full space-y-8">
        
        {/* 1. Statistics Cards Block */}
        <AdminStatsCards 
          totalUsers={totalUsers}
          totalBooks={totalBooks}
          totalRevenue={totalRevenue}
          totalDeliveries={totalDeliveries}
        />

        {/* 2. Structured Multi-Chart Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
          
          {/* Top-Middle Row Left: Category Breakdown Pie Chart (4 cols) */}
          <div className="lg:col-span-4 w-full">
            <CategoryPieChart books={books} />
          </div>

          {/* Top-Middle Row Center: User Role Distribution Pie Chart (4 cols) */}
          <div className="lg:col-span-4 w-full">
            <RolePieChart users={users} />
          </div>

          {/* Top-Middle Row Right: Stars breakdown Chart (4 cols) */}
          <div className="lg:col-span-4 w-full">
            <ReviewChart reviews={reviews} />
          </div>

          {/* Bottom Row Left: Live 7-Day Revenue Trend (6 cols) */}
          <div className="lg:col-span-6 w-full">
            <WeeklyRevenueTrend deliveries={deliveries} />
          </div>

          {/* Bottom Row Right: Live Delivery Fulfillment Bar Chart (6 cols) */}
          <div className="lg:col-span-6 w-full">
            <FulfillmentBarChart deliveries={deliveries} />
          </div>

        </div>

      </div>
    </div>
  );
};

export default OverviewAdmin;