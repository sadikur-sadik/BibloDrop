'use client';

import React, { useState } from 'react';

export default function PassingReview({ 
  bookId, 
  currentUser, 
  isAuthenticated, 
  hasOrderedBook, 
  onAddReview 
}) {
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Prepare review submission for backend API integration
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated || !hasOrderedBook) return;
    if (!newComment.trim()) return;

    setIsSubmitting(true);

    // Formulate payload with strict data types
    const payload = {
      bookId: bookId,
      reviewerName: currentUser?.name || 'Anonymous Reader',
      reviewerEmail: currentUser?.email,
      reviewerImage: currentUser?.image || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=120&auto=format&fit=crop',
      rating: Number(newRating), // Strict number parsing
      comment: newComment,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      verified: true // Strict boolean parsing
    };

    console.log("Ready to post review payload from PassingReview component:", payload);

    /*
    try {
      const response = await fetch(`/api/books/${bookId}/reviews`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(payload)
      });
      const savedReview = await response.json();
      
      // Update mother component state
      if (onAddReview) onAddReview(savedReview);
      
      setNewComment('');
      setNewRating(5);
    } catch (error) {
      console.error("Failed to execute review submission on backend:", error);
    } finally {
      setIsSubmitting(false);
    }
    */

    // Simulated local fallback for testing
    setTimeout(() => {
      const mockSavedReview = {
        id: `rev-${Date.now()}`,
        ...payload,
        helpfulCount: 0
      };
      if (onAddReview) onAddReview(mockSavedReview);
      
      setNewComment('');
      setNewRating(5);
      setIsSubmitting(false);
    }, 400);
  };

  // State 1: User is not authenticated
  if (!isAuthenticated) {
    return (
      <div className="bg-slate-100/50 dark:bg-slate-800/40 border border-dashed border-slate-200 dark:border-gray-800 p-6 rounded-3xl text-center">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Please log in to submit reviews and rate this book.
        </p>
      </div>
    );
  }

  // State 2: User is logged in but hasn't ordered the book yet
  if (!hasOrderedBook) {
    return (
      <div className="bg-slate-100/50 dark:bg-slate-800/40 border border-dashed border-slate-200 dark:border-gray-800 p-6 rounded-3xl text-center">
        <p className="text-xs text-amber-600 dark:text-amber-400 font-medium">
          Only readers who have ordered this book can leave a review.
        </p>
        <p className="text-[11px] text-slate-400 mt-1">
          (Test Tip: Switch identity to &quot;Reader&quot; above and click &quot;Request Delivery&quot; to unlock the form)
        </p>
      </div>
    );
  }

  // State 3: User is authenticated and has ordered the book
  return (
    <div className="bg-white dark:bg-[#2c2f38] p-6 rounded-3xl border border-slate-200/80 dark:border-gray-800 shadow-xs">
      <h4 className="font-bold text-xs mb-4">Write a Review</h4>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Your Rating</label>
          <select 
            value={newRating} 
            onChange={(e) => setNewRating(Number(e.target.value))}
            className="rounded-lg bg-slate-100 dark:bg-slate-800 border-none p-1.5 text-xs text-slate-800 dark:text-white focus:outline-hidden"
            disabled={isSubmitting}
          >
            <option value={5}>5 Stars (Excellent)</option>
            <option value={4}>4 Stars (Good)</option>
            <option value={3}>3 Stars (Average)</option>
            <option value={2}>2 Stars (Poor)</option>
            <option value={1}>1 Star (Unsatisfying)</option>
          </select>
        </div>

        <textarea 
          rows="3" 
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Share your opinions on content quality and printing layout..."
          className="w-full rounded-xl border border-slate-200 dark:border-gray-800 bg-slate-50 dark:bg-[#192230]/50 p-4 text-xs focus:outline-hidden"
          disabled={isSubmitting}
        />
        <div className="flex justify-end">
          <button 
            type="submit"
            disabled={isSubmitting}
            className="px-5 py-2 rounded-lg bg-[#192230] dark:bg-[#ffcd00] text-white dark:text-[#192230] text-xs font-bold cursor-pointer hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {isSubmitting ? 'Posting...' : 'Submit Review'}
          </button>
        </div>
      </form>
    </div>
  );
}