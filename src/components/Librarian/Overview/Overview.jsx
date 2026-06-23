'use client';

import React from 'react';
import LibrarianOverviewStats from './StatsCards/StatsCards';
import BookPublishPieChart from './PublishStatsPieChart/Chart';
import StarReviewDistributionChart from './ReviewChart/ReviewChart';
import ReviewTrendLineChart from './WeeklyRevenue/WeeklyRevenue';
import DeliveryStatusBarChart from './DeliveryStatus/DeliveryStatus';
const LibrarianOverview = ({ books = [], deliveries = [], reviews = [] }) => {
  
  // Data calculations
  const totalPublished = books.filter(book => book.isPublished === true).length;
  const totalUnpublished = books.filter(book => book.isPublished !== true).length;
  
  const totalRevenue = deliveries
    .filter(d => d.deliveryStatus === 'delivered')
    .reduce((sum, d) => sum + parseFloat(d.paid || 0), 0);

  const totalReviews = reviews.length;

  const activePendingRequests = deliveries.filter(d => 
    d.deliveryStatus === 'pending' || d.deliveryStatus === 'processing'
  ).length;

  return (
    <div className="w-full bg-slate-50 dark:bg-[#192230] text-[#192230] dark:text-white py-12 px-4 md:px-12 transition-colors duration-300 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Workspace Banner */}
        <div className="border-b border-slate-200/80 dark:border-gray-800/80 pb-6 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-800 dark:text-white">
              Biblio<span className="text-[#856a26] dark:text-[#ffcd00]">Drop</span> Catalog
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Update resources and manage catalog settings.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-[#856a26]/10 border border-[#856a26]/30 dark:bg-[#ffcd00]/10 dark:border-[#ffcd00]/30 text-[#856a26] dark:text-[#ffcd00] px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300">
              Pending Deliveries: <span className="font-extrabold">{activePendingRequests}</span>
            </div>
          </div>
        </div>

        {/* 1. Statistics Cards Block */}
        <LibrarianOverviewStats 
          publishedCount={totalPublished}
          unpublishedCount={totalUnpublished}
          revenue={totalRevenue}
          reviewsCount={totalReviews}
        />

        {/* 2. Structured Multi-Chart Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Middle Row Left: Live Book Status Pie Chart (4 cols) */}
          <div className="lg:col-span-4">
            <BookPublishPieChart 
              published={totalPublished} 
              unpublished={totalUnpublished} 
            />
          </div>

          {/* Middle Row Right: Live Star Breakdown Distribution Chart (8 cols) */}
          <div className="lg:col-span-8">
            <StarReviewDistributionChart reviews={reviews} />
          </div>

          {/* Bottom Row Left: Live 7-Day Review volume Trend (6 cols) */}
          <div className="lg:col-span-6">
            <ReviewTrendLineChart reviews={reviews} />
          </div>

          {/* Bottom Row Right: Live Delivery Fulfillment Steps Bar Chart (6 cols) */}
          <div className="lg:col-span-6">
            <DeliveryStatusBarChart deliveries={deliveries} />
          </div>

        </div>

      </div>
    </div>
  );
};

export default LibrarianOverview;