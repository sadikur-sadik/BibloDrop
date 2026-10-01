'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Bookmark, ShieldCheck, TrashBin, House } from '@gravity-ui/icons';
import { authClient } from '@/lib/auth-client';
import { getSavedComments, toggleSaveComment } from '@/lib/saved-comments';
import { CommunityFeedCard } from '@/components/CommunityFeed/CommunityFeedCard';
import { toast } from 'react-toastify';

export default function SavedCommentsView() {
  const { data: session, isPending } = authClient.useSession();
  const userId = session?.user?.id || session?.user?.email;

  const [savedComments, setSavedComments] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadSaved = () => {
    if (userId) {
      const list = getSavedComments(userId);
      setSavedComments(list);
    } else {
      setSavedComments([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!isPending) {
      loadSaved();
    }
  }, [userId, isPending]);

  // Real-time synchronization event listener
  useEffect(() => {
    const handleUpdate = () => {
      loadSaved();
    };

    window.addEventListener('saved_comments_updated', handleUpdate);
    return () => {
      window.removeEventListener('saved_comments_updated', handleUpdate);
    };
  }, [userId]);

  const handleClearAll = () => {
    if (!userId || savedComments.length === 0) return;
    if (confirm("Are you sure you want to clear all your saved comments?")) {
      savedComments.forEach((item) => {
        toggleSaveComment(userId, item);
      });
      toast.info("Cleared all saved comments.");
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <div className="w-full bg-slate-50 dark:bg-[#192230] text-[#192230] dark:text-white min-h-[calc(100vh-5rem)] py-10 sm:py-16 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 transition-colors duration-300 relative select-none">
      
      {/* Background Visual Accents */}
      <div className="absolute right-0 top-0 w-96 h-96 bg-[#856a26]/10 dark:bg-[#ffcd00]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute left-0 bottom-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-8 relative z-10">

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-white/10 pb-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-[#856a26]/10 dark:bg-[#ffcd00]/10 text-[#856a26] dark:text-[#ffcd00]">
                <Bookmark className="w-5 h-5" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#856a26] dark:text-[#ffcd00]">
                Live Reader Activity
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif font-black tracking-tight text-[#192230] dark:text-white">
              Saved Comments
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-medium max-w-2xl">
              Your curated collection of book reviews and reader insights saved from the community feed.
            </p>
          </div>

          {session?.user && savedComments.length > 0 && (
            <button
              onClick={handleClearAll}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-rose-200 dark:border-rose-900/50 bg-rose-50/50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/50 text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-xs"
            >
              <TrashBin className="w-4 h-4" />
              Clear All Saved
            </button>
          )}
        </div>

        {/* Loading State */}
        {isPending || loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-64 bg-slate-200 dark:bg-[#2c2f38] rounded-3xl animate-pulse" />
            ))}
          </div>
        ) : !session?.user ? (
          /* Unauthenticated State Notice */
          <div className="max-w-md mx-auto text-center bg-white dark:bg-[#2c2f38] border border-slate-200/80 dark:border-white/10 rounded-3xl p-8 sm:p-10 shadow-xl space-y-5 my-12">
            <div className="h-16 w-16 bg-[#856a26]/10 dark:bg-[#ffcd00]/10 text-[#856a26] dark:text-[#ffcd00] rounded-full flex items-center justify-center mx-auto">
              <ShieldCheck className="h-8 w-8" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-[#192230] dark:text-white">
                Sign In Required
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                Please sign in to your reader account to view your saved reader activity comments and manage your reading insights.
              </p>
            </div>
            <Link
              href="/signin"
              className="inline-flex items-center justify-center w-full h-12 bg-[#192230] text-white hover:bg-[#2c2f38] dark:bg-[#ffcd00] dark:text-[#192230] dark:hover:bg-[#ffe066] rounded-xl font-extrabold text-sm transition-all shadow-md cursor-pointer"
            >
              Sign In Now
            </Link>
          </div>
        ) : savedComments.length === 0 ? (
          /* Empty State */
          <div className="max-w-lg mx-auto text-center bg-white dark:bg-[#2c2f38] border border-slate-200/80 dark:border-white/10 rounded-3xl p-8 sm:p-12 shadow-lg space-y-6 my-10">
            <div className="h-16 w-16 bg-slate-100 dark:bg-[#192230] text-slate-400 dark:text-slate-500 rounded-full flex items-center justify-center mx-auto">
              <Bookmark className="h-8 w-8" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-bold text-[#192230] dark:text-white">
                No Saved Comments Yet
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                Explore the Live Reader Activity on the home page and click the <strong>Save</strong> button on any community review to add it here.
              </p>
            </div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#192230] text-white hover:bg-[#2c2f38] dark:bg-[#ffcd00] dark:text-[#192230] dark:hover:bg-[#ffe066] rounded-xl font-extrabold text-sm transition-all shadow-md cursor-pointer"
            >
              <House className="w-4 h-4" />
              Explore Community Feed
            </Link>
          </div>
        ) : (
          /* Saved Comments Grid */
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm font-semibold text-slate-500 dark:text-slate-400">
              <span>Showing {savedComments.length} saved {savedComments.length === 1 ? 'review' : 'reviews'}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {savedComments.map((entry) => (
                <div key={entry._id} className="w-full flex">
                  <CommunityFeedCard entry={entry} variants={itemVariants} />
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
