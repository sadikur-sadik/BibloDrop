'use client';

import { PostingReview } from '@/lib/action/action';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter

export default function PassingReview({ 
  bookId, 
  currentUser, 
  isAuthenticated, 
  deliveryInfo, 
  onAddReview 
}) {
  const router = useRouter(); // Initialize router
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const hasPurchased = deliveryInfo && deliveryInfo.length > 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated || !hasPurchased) return;
    if (!newComment.trim()) return;

    setIsSubmitting(true);

    const payload = {
      bookId: bookId,
      reviewerName: currentUser?.name || 'Anonymous Reader',
      reviewerEmail: currentUser?.email,
      reviewerImage: currentUser?.image || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=120&auto=format&fit=crop',
      rating: Number(newRating),
      comment: newComment,
      verified: true
    };

    try {
      const response = await PostingReview(payload);
      
      if (response && (response.acknowledged || response.insertedId)) {
        alert('Review submitted successfully!');
        
        // Construct complete review object with standard createdAt timestamp
        const savedReview = {
          _id: response.insertedId || Date.now().toString(),
          ...payload,
          createdAt: new Date().toISOString() 
        };
        
        // 1. Instant 0ms local state update (overcomes any server caching delay)
        if (onAddReview) {
          onAddReview(savedReview); 
        }
        
        // 2. Silent background sync with server to ensure next loads are completely fresh
        router.refresh(); 
        
        setNewComment('');
        setNewRating(5);
      } else {
        alert('Failed to post review. Please try again.');
      }
    } catch (error) {
      console.error("Failed to execute review submission on backend:", error);
      alert('An error occurred. Your review could not be posted.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="bg-slate-100/50 dark:bg-slate-800/40 border border-dashed border-slate-200 dark:border-gray-800 p-6 rounded-3xl text-center">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Please log in to submit reviews and rate this book.
        </p>
      </div>
    );
  }

  if (!hasPurchased) {
    return (
      <div className="bg-slate-100/50 dark:bg-slate-800/40 border border-dashed border-slate-200 dark:border-gray-800 p-6 rounded-3xl text-center">
        <p className="text-xs text-amber-600 dark:text-amber-400 font-medium">
          Only readers who have ordered this book can leave a review.
        </p>
      </div>
    );
  }

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
          className="w-full rounded-xl border border-slate-200 dark:border-gray-800 bg-slate-50 dark:bg-[#192230]/50 p-4 text-xs focus:outline-hidden text-slate-800 dark:text-white"
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