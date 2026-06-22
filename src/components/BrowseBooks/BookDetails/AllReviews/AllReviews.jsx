'use client';

import React from 'react';
import Image from 'next/image';

export default function AllReviews({ reviews }) {
  return (
    <div className="space-y-4">
      <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400">
        Reviews & User Logs
      </h4>
      
      {reviews.map((review) => (
        <div 
          key={review.id} 
          className="p-6 bg-white dark:bg-[#2c2f38] rounded-3xl border border-slate-200/80 dark:border-gray-800 shadow-xs space-y-3"
        >
          <div className="flex items-center justify-between gap-2 border-b border-slate-100 dark:border-gray-800 pb-2">
            <div className="flex items-center gap-2">
              {review.reviewerImage && (
                <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0">
                  <Image 
                    src={review.reviewerImage} 
                    alt={review.reviewerName} 
                    fill 
                    className="object-cover" 
                  />
                </div>
              )}
              <div>
                <p className="text-xs font-bold">{review.reviewerName}</p>
                <p className="text-[10px] text-slate-400">{review.date}</p>
              </div>
            </div>
            
            <div className="flex flex-col items-end gap-1">
              <span className="text-xs text-amber-500 dark:text-[#ffcd00] font-bold">
                {Array.from({ length: review.rating }).map((_, i) => '★').join('')}
              </span>
              {review.verified && (
                <span className="text-[9px] text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded-sm font-semibold uppercase">
                  Verified Reader
                </span>
              )}
            </div>
          </div>
          
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
            {review.comment}
          </p>
        </div>
      ))}
    </div>
  );
}