'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { Table } from '@heroui/react';
import DeleteReview from './DeleteReview/DeleteReview';
import EditReview from './EditReview/EditReview';
import { Xmark, Star, StarFill } from '@gravity-ui/icons';
import { deleteReviewByReader, updateReviewByReader } from '@/lib/action/action';

const ReviewList = ({ reviews = [] }) => {
  const [localReviews, setLocalReviews] = useState(reviews);
  const [notification, setNotification] = useState(null);

  // Synchronize state if parent properties change
  useEffect(() => {
    setLocalReviews(reviews);
  }, [reviews]);

  // --- API CALL HANDLERS (OPTIMISTIC STATE INJECTORS) ---

  const handleUpdateReview = async (reviewId, updatedData) => {
    const previousReviews = [...localReviews];

    // Optimistic state updates
    setLocalReviews((prevReviews) =>
      prevReviews.map((r) => (r._id === reviewId ? { ...r, ...updatedData } : r))
    );

    try {
      // Use the correctly imported API function
      await updateReviewByReader(reviewId, updatedData);

      setNotification({
        type: 'success',
        title: 'Review Updated',
        message: 'The feedback comments and ratings have been successfully updated.',
        targetId: reviewId
      });

      setTimeout(() => {
        setNotification((prev) => (prev?.targetId === reviewId ? null : prev));
      }, 4000);

    } catch (error) {
      console.error("Failed to update the review details:", error);
      setLocalReviews(previousReviews);

      setNotification({
        type: 'error',
        title: 'Update Failed',
        message: 'Could not complete your request to update feedback. Please try again.',
        targetId: reviewId
      });
    }
  };

  const handleDeleteReview = async (review) => {
    const previousReviews = [...localReviews];

    // Optimistic deletion
    setLocalReviews((prevReviews) => prevReviews.filter((r) => r._id !== review._id));

    try {
      // Use the correctly imported API function, sending only the review ID
      await deleteReviewByReader(review._id);

      setNotification({
        type: 'success',
        title: 'Review Deleted',
        message: `Review written by "${review.reviewerName}" has been successfully removed.`,
        targetId: review._id
      });

      setTimeout(() => {
        setNotification((prev) => (prev?.targetId === review._id ? null : prev));
      }, 4000);

    } catch (error) {
      console.error("Failed to complete review deletion:", error);
      setLocalReviews(previousReviews);

      setNotification({
        type: 'error',
        title: 'Deletion Failed',
        message: `Unable to remove the review entry. Please try again.`,
        targetId: review._id
      });
    }
  };

  // Helper function to render Star icons
  const renderStars = (ratingValue) => {
    return (
      <div className="flex items-center gap-0.5 text-amber-500 dark:text-[#ffcd00]">
        {Array.from({ length: 5 }).map((_, i) => {
          const isFilled = i < ratingValue;
          return isFilled ? (
            <StarFill key={i} className="w-3.5 h-3.5 fill-current shrink-0" />
          ) : (
            <Star key={i} className="w-3.5 h-3.5 opacity-25 shrink-0" />
          );
        })}
      </div>
    );
  };

  // Helper text mapping corresponding ratings to their feedback descriptions
  const getRatingDescription = (val) => {
    const labels = {
      5: "Excellent",
      4: "Good",
      3: "Average",
      2: "Poor",
      1: "Unsatisfying"
    };
    return labels[val] || "Average";
  };

  // Badge styles helper
  const getRatingBadgeClass = (val) => {
    if (val >= 4) return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20';
    if (val === 3) return 'bg-[#856a26]/10 text-[#856a26] dark:bg-[#ffcd00]/10 dark:text-[#ffcd00] border-[#856a26]/20 dark:border-[#ffcd00]/30';
    return 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20';
  };

  // Animation configuration variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 15 }
    }
  };

  const isSuccess = notification?.type === 'success';

  return (
    <div className="relative w-full bg-transparent text-[#192230] dark:text-white transition-colors duration-300 space-y-6">

      {/* FLOATING NOTIFICATION BANNER */}
      <div className="absolute top-4 left-4 right-4 z-50 pointer-events-none">
        <AnimatePresence>
          {notification && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              className={`pointer-events-auto w-full p-4 rounded-2xl bg-white/95 dark:bg-[#192230]/95 backdrop-blur-md border shadow-xl flex items-start justify-between gap-3 ${
                isSuccess
                  ? 'border-emerald-500/25 dark:border-emerald-500/20 text-emerald-800 dark:text-emerald-300'
                  : 'border-rose-500/25 dark:border-rose-500/20 text-rose-800 dark:text-rose-300'
              }`}
            >
              <div className="flex items-start gap-3 min-w-0">
                <div className={`flex items-center justify-center w-6 h-6 rounded-full shrink-0 text-sm font-bold ${
                  isSuccess
                    ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                    : 'bg-rose-500/20 text-rose-600 dark:text-rose-400'
                }`}>
                  {isSuccess ? '✓' : '!'}
                </div>
                <div className="min-w-0">
                  <h4 className={`text-sm font-black tracking-tight ${
                    isSuccess ? 'text-emerald-800 dark:text-emerald-400' : 'text-rose-800 dark:text-rose-400'
                  }`}>
                    {notification.title}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400/90 mt-0.5 leading-relaxed">
                    {notification.message}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setNotification(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 shrink-0 p-1 rounded-lg transition-colors cursor-pointer"
              >
                <Xmark width={16} height={16} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* HEADER SECTION */}
      <div className="border-b border-slate-200/80 dark:border-gray-800/80 pb-6 mb-8">
        <h1 className="text-2xl font-black tracking-tight text-slate-800 dark:text-white">
          Reviews & Ratings <span className="text-[#856a26] dark:text-[#ffcd00]">Control</span> Hub
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Moderate review ratings, edit entries, and verify community remarks on published literature.
        </p>
      </div>

      {/* CONTAINER */}
      <div className="relative w-full">
        {localReviews.length === 0 ? (
          <div className="text-center py-16 bg-slate-100/40 dark:bg-[#2c2f38]/10 border border-slate-200/80 dark:border-gray-800/60 rounded-3xl max-w-md mx-auto space-y-2">
            <p className="text-sm font-bold text-slate-500 dark:text-slate-400">
              No reviews registered yet.
            </p>
            <p className="text-xs text-slate-400 dark:text-slate-500">
              When readers submit feedback on books, their comments will appear in this control queue.
            </p>
          </div>
        ) : (
          <>
            {/* Mobile Layout: Responsive Grid Cards */}
            <div className="block lg:hidden">
              <AnimatePresence mode="popLayout">
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="space-y-4"
                >
                  {localReviews.map((review) => {
                    const badgeClass = getRatingBadgeClass(review.rating);
                    return (
                      <motion.div
                        layout
                        variants={itemVariants}
                        key={review._id}
                        className="p-5 rounded-2xl border border-slate-200/80 dark:border-gray-800/80 bg-white/40 dark:bg-[#2c2f38]/20 backdrop-blur-md space-y-4"
                      >
                        {/* Profile Info Row */}
                        <div className="flex items-center gap-3">
                          {review.reviewerImage && (
                            <Image
                              src={review.reviewerImage}
                              alt={review.reviewerName}
                              width={36}
                              height={36}
                              className="w-9 h-9 object-cover rounded-full border border-slate-200 dark:border-gray-800"
                              unoptimized
                            />
                          )}
                          <div className="min-w-0 flex-1">
                            <h4 className="font-extrabold text-xs leading-tight truncate">{review.reviewerName}</h4>
                            <p className="text-[10px] text-slate-400 truncate">{review.reviewerEmail}</p>
                          </div>
                        </div>

                        {/* Associated Book Info Card */}
                        <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-100/50 dark:bg-[#12141c]/40 border border-slate-200/40 dark:border-gray-800/40">
                          {review.bookImage && (
                            <Image
                              src={review.bookImage}
                              alt={review.bookName}
                              width={32}
                              height={44}
                              className="w-8 h-11 object-cover rounded-md shadow-sm border border-slate-200 dark:border-gray-800"
                              unoptimized
                            />
                          )}
                          <div className="min-w-0">
                            <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider block">Assigned Book</span>
                            <h5 className="text-xs font-black truncate mt-0.5 text-slate-700 dark:text-slate-300">{review.bookName}</h5>
                          </div>
                        </div>

                        {/* Metadata Details Grid */}
                        <div className="grid grid-cols-2 gap-y-3 gap-x-4 pt-3 border-t border-slate-200/60 dark:border-gray-800/60 text-xs">
                          <div className="space-y-1">
                            <span className="text-slate-400 uppercase tracking-wider text-[9px] font-extrabold block">Stars Rating</span>
                            {renderStars(review.rating)}
                          </div>

                          <div className="space-y-1">
                            <span className="text-slate-400 uppercase tracking-wider text-[9px] font-extrabold block">Feedback Evaluation</span>
                            <span className={`inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${badgeClass}`}>
                              {getRatingDescription(review.rating)}
                            </span>
                          </div>

                          <div className="col-span-2 pt-1">
                            <span className="text-slate-400 uppercase tracking-wider text-[9px] font-extrabold block mb-1">Written Comment</span>
                            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic bg-slate-100/30 dark:bg-[#12141c]/20 p-2.5 rounded-lg border border-slate-200/40 dark:border-gray-800/40">
                              "{review.comment}"
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200/60 dark:border-gray-800/60">
                          {/* Edit Action Component (Mobile) */}
                          <EditReview review={review} onEdit={handleUpdateReview} />

                          {/* Delete Action Component (Mobile) */}
                          <DeleteReview review={review} onDelete={handleDeleteReview} />
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Desktop Layout: Table */}
            <div className="hidden lg:block">
              <Table className="bg-transparent shadow-none">
                <Table.ScrollContainer className="bg-transparent">
                  <Table.Content aria-label="Reviews Queue Table">
                    <Table.Header>
                      {/* Added isRowHeader prop to correct validation error */}
                      <Table.Column isRowHeader className="bg-slate-100 dark:bg-[#2c2f38] text-slate-700 dark:text-slate-200 font-extrabold text-sm py-4 first:rounded-l-2xl border-b border-slate-200 dark:border-gray-800">
                        Reader details
                      </Table.Column>
                      <Table.Column className="bg-slate-100 dark:bg-[#2c2f38] text-slate-700 dark:text-slate-200 font-extrabold text-sm py-4 border-b border-slate-200 dark:border-gray-800">
                        Book References
                      </Table.Column>
                      <Table.Column className="bg-slate-100 dark:bg-[#2c2f38] text-slate-700 dark:text-slate-200 font-extrabold text-sm py-4 border-b border-slate-200 dark:border-gray-800">
                        Rating Scale
                      </Table.Column>
                      <Table.Column className="bg-slate-100 dark:bg-[#2c2f38] text-slate-700 dark:text-slate-200 font-extrabold text-sm py-4 border-b border-slate-200 dark:border-gray-800 max-w-xs">
                        Review Comments
                      </Table.Column>
                      <Table.Column align="end" className="bg-slate-100 dark:bg-[#2c2f38] text-slate-700 dark:text-slate-200 font-extrabold text-sm py-4 last:rounded-r-2xl border-b border-slate-200 dark:border-gray-800 text-right">
                        Actions
                      </Table.Column>
                    </Table.Header>

                    <Table.Body>
                      {localReviews.map((review, idx) => {
                        const badgeClass = getRatingBadgeClass(review.rating);

                        return (
                          <Table.Row
                            key={review._id}
                            className="hover:bg-slate-100/40 dark:hover:bg-[#2c2f38]/20 transition-colors border-b border-slate-200/60 dark:border-gray-800/60 last:border-0"
                          >
                            {/* Column 1: Reviewer profile */}
                            <Table.Cell className="py-4">
                              <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.03, type: "spring", stiffness: 120 }}
                                className="flex items-center gap-3.5"
                              >
                                {review.reviewerImage && (
                                  <Image
                                    src={review.reviewerImage}
                                    alt={review.reviewerName}
                                    width={38}
                                    height={38}
                                    className="w-9 h-9 object-cover rounded-full border border-slate-200 dark:border-gray-800 shadow-xs"
                                    unoptimized
                                  />
                                )}
                                <div className="min-w-0">
                                  <h3 className="font-extrabold text-sm text-slate-800 dark:text-slate-100">{review.reviewerName}</h3>
                                  <p className="text-xs text-slate-400 mt-0.5">{review.reviewerEmail}</p>
                                </div>
                              </motion.div>
                            </Table.Cell>

                            {/* Column 2: Assigned Book */}
                            <Table.Cell className="py-4">
                              <div className="flex items-center gap-3">
                                {review.bookImage && (
                                  <Image
                                    src={review.bookImage}
                                    alt={review.bookName}
                                    width={30}
                                    height={42}
                                    className="w-8 h-11 object-cover rounded-md shadow-sm border border-slate-200 dark:border-gray-800"
                                    unoptimized
                                  />
                                )}
                                <div className="min-w-0">
                                  <h4 className="font-extrabold text-xs text-slate-700 dark:text-slate-300 truncate max-w-xs">{review.bookName}</h4>
                                </div>
                              </div>
                            </Table.Cell>

                            {/* Column 3: Rating Grade */}
                            <Table.Cell className="py-4">
                              <div className="space-y-1">
                                {renderStars(review.rating)}
                                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border ${badgeClass}`}>
                                  {getRatingDescription(review.rating)}
                                </span>
                              </div>
                            </Table.Cell>

                            {/* Column 4: Comments and thoughts */}
                            <Table.Cell className="py-4 max-w-xs">
                              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 italic leading-relaxed">
                                "{review.comment}"
                              </p>
                            </Table.Cell>

                            {/* Column 5: Controls and Triggers */}
                            <Table.Cell className="py-4 text-right">
                              <div className="flex items-center justify-end gap-2.5">
                                {/* Edit Review */}
                                <EditReview review={review} onEdit={handleUpdateReview} />

                                {/* Delete Review */}
                                <DeleteReview review={review} onDelete={handleDeleteReview} />
                              </div>
                            </Table.Cell>
                          </Table.Row>
                        );
                      })}
                    </Table.Body>
                  </Table.Content>
                </Table.ScrollContainer>
                <Table.Footer className="hidden" />
              </Table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ReviewList;