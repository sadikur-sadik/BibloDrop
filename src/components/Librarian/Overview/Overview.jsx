'use client';

import React from 'react';
import LibrarianOverviewStats from './StatsCards/StatsCards';
import BookPublishPieChart from './PublishStatsPieChart/Chart';
import StarReviewDistributionChart from './ReviewChart/ReviewChart';
import DeliveryStatusBarChart from './DeliveryStatus/DeliveryStatus';
import RevenueTrendLineChart from './WeeklyRevenue/WeeklyRevenue';
import {motion} from "motion/react"
const LibrarianOverview = ({ books = [], deliveries = [], reviews = [] }) => {

  // Data calculations
  const totalPublished = books.filter(book => book.isPublished === true).length;
  const totalUnpublished = books.filter(book => book.isPublished !== true).length;

  const totalRevenue = deliveries
    .reduce((sum, d) => sum + parseFloat(d.paid || 0), 0);

  const totalReviews = reviews.length;

  const activePendingRequests = deliveries.filter(d =>
    d.deliveryStatus === 'pending' || d.deliveryStatus === 'processing'
  ).length;

  return (
    /* 
      Matched with AddBook's outer container structure to align height,
      width, alignment, and theme-transparent integration.
    */
    <div className="relative w-full min-h-screen bg-transparent text-[#192230] dark:text-white transition-colors duration-300 space-y-6">

      {/* HEADER SECTION (Spans full width, matching AddBook's/Inventory's alignment) */}

      <div className="border-b border-slate-200/80 dark:border-gray-800/80 pb-6 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-black tracking-tight text-slate-800 dark:text-white"
          >
            Librarian<span className="text-[#856a26] dark:text-[#ffcd00]"> Dashboard</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xs text-slate-500 dark:text-slate-400 mt-1"
          >
            Manage your collection and track active circulation requests.
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-3"
        >
          <div className="bg-[#856a26]/10 border border-[#856a26]/30 dark:bg-[#ffcd00]/10 dark:border-[#ffcd00]/30 text-[#856a26] dark:text-[#ffcd00] px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300">
            Pending Deliveries: <span className="font-extrabold">{activePendingRequests}</span>
          </div>
        </motion.div>
      </div>
      {/* Main Content Workspace Wrapper */}
      <div className="w-full space-y-8">

        {/* 1. Statistics Cards Block */}
        <LibrarianOverviewStats
          publishedCount={totalPublished}
          unpublishedCount={totalUnpublished}
          revenue={totalRevenue}
          reviewsCount={totalReviews}
        />

        {/* 2. Structured Multi-Chart Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">

          {/* Middle Row Left: Live Book Status Pie Chart (4 cols) */}
          <div className="lg:col-span-4 w-full">
            <BookPublishPieChart
              published={totalPublished}
              unpublished={totalUnpublished}
            />
          </div>

          {/* Middle Row Right: Live Star Breakdown Distribution Chart (8 cols) */}
          <div className="lg:col-span-8 w-full">
            <StarReviewDistributionChart reviews={reviews} />
          </div>

          {/* Bottom Row Left: Live 7-Day Revenue Trend (6 cols) */}
          <div className="lg:col-span-6 w-full">
            <RevenueTrendLineChart deliveries={deliveries} />
          </div>

          {/* Bottom Row Right: Live Delivery Fulfillment Steps Bar Chart (6 cols) */}
          <div className="lg:col-span-6 w-full">
            <DeliveryStatusBarChart deliveries={deliveries} />
          </div>

        </div>

      </div>
    </div>
  );
};

export default LibrarianOverview;