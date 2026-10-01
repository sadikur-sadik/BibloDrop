'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ThumbsUp, ThumbsDown, ShieldCheck } from '@gravity-ui/icons';
import { toast } from 'react-toastify';
import { authClient } from '@/lib/auth-client';
import { 
  getCommentCounts, 
  isCommentLiked, 
  isCommentDisliked, 
  toggleLikeComment, 
  toggleDislikeComment 
} from '@/lib/saved-comments';

function ReviewItem({ review, userId, userEmail }) {
  const reviewId = review._id || review.id;
  const initialLikes = review.helpfulCount ?? review.likes ?? 0;
  const initialDislikes = review.dislikes ?? 0;

  const [counts, setCounts] = useState(() => getCommentCounts(reviewId, initialLikes, initialDislikes));
  const [isLiked, setIsLiked] = useState(() => Boolean(userId && isCommentLiked(userId, reviewId)));
  const [isDisliked, setIsDisliked] = useState(() => Boolean(userId && isCommentDisliked(userId, reviewId)));

  useEffect(() => {
    if (userId && reviewId) {
      setIsLiked(isCommentLiked(userId, reviewId));
      setIsDisliked(isCommentDisliked(userId, reviewId));
      setCounts(getCommentCounts(reviewId, initialLikes, initialDislikes));
    }
  }, [userId, reviewId, initialLikes, initialDislikes]);

  useEffect(() => {
    const handleCountsUpdate = (e) => {
      if (e.detail?.commentId === reviewId) {
        setCounts({ likes: e.detail.likes, dislikes: e.detail.dislikes });
      }
    };

    const handleLikedUpdate = (e) => {
      if (e.detail?.userId === userId && e.detail?.commentId === reviewId) {
        setIsLiked(Boolean(e.detail.isLiked));
        setIsDisliked(Boolean(e.detail.isDisliked));
        if (typeof e.detail.likes === 'number') {
          setCounts({ likes: e.detail.likes, dislikes: e.detail.dislikes });
        }
      }
    };

    window.addEventListener('comment_counts_updated', handleCountsUpdate);
    window.addEventListener('liked_comments_updated', handleLikedUpdate);
    return () => {
      window.removeEventListener('comment_counts_updated', handleCountsUpdate);
      window.removeEventListener('liked_comments_updated', handleLikedUpdate);
    };
  }, [userId, reviewId]);

  const handleLikeClick = async () => {
    if (!userId) {
      toast.error("Please sign in to like reviews!");
      return;
    }

    const res = toggleLikeComment(userId, reviewId, initialLikes, initialDislikes);
    setIsLiked(res.isLiked);
    setIsDisliked(res.isDisliked);
    setCounts({ likes: res.newLikes, dislikes: res.newDislikes });

    if (res.isLiked) {
      toast.success("Liked review!");
    } else {
      toast.info("Removed like.");
    }

    // Backend database update
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
      await fetch(`${apiUrl}/reviews/${reviewId}/reaction`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: res.isLiked ? (isDisliked ? 'like_from_dislike' : 'like') : 'unlike',
          userEmail: userEmail || userId
        })
      });
    } catch (err) {
      console.error("Failed to sync reaction to backend:", err);
    }
  };

  const handleDislikeClick = async () => {
    if (!userId) {
      toast.error("Please sign in to dislike reviews!");
      return;
    }

    const res = toggleDislikeComment(userId, reviewId, initialLikes, initialDislikes);
    setIsLiked(res.isLiked);
    setIsDisliked(res.isDisliked);
    setCounts({ likes: res.newLikes, dislikes: res.newDislikes });

    if (res.isDisliked) {
      toast.info("Disliked review.");
    } else {
      toast.info("Removed dislike.");
    }

    // Backend database update
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
      await fetch(`${apiUrl}/reviews/${reviewId}/reaction`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: res.isDisliked ? (isLiked ? 'dislike_from_like' : 'dislike') : 'undislike',
          userEmail: userEmail || userId
        })
      });
    } catch (err) {
      console.error("Failed to sync reaction to backend:", err);
    }
  };

  const reviewDate = review.createdAt 
    ? new Date(review.createdAt).toLocaleDateString('en-GB', { 
        day: '2-digit', 
        month: 'short', 
        year: 'numeric' 
      })
    : review.date || 'Recent';

  return (
    <div className="p-6 bg-white dark:bg-[#2c2f38] rounded-3xl border border-slate-200/80 dark:border-gray-800 shadow-xs space-y-4">
      {/* Top Row: Reviewer Details & Rating */}
      <div className="flex items-center justify-between gap-2 border-b border-slate-100 dark:border-gray-800 pb-3">
        <div className="flex items-center gap-3">
          {review.reviewerImage && (
            <div className="relative w-9 h-9 rounded-full overflow-hidden shrink-0 border border-slate-200 dark:border-gray-800">
              <Image 
                src={review.reviewerImage} 
                alt={review.reviewerName || 'Reviewer'} 
                fill 
                unoptimized
                className="object-cover" 
              />
            </div>
          )}
          <div>
            <p className="text-xs font-bold text-[#192230] dark:text-white">
              {review.reviewerName || 'Anonymous Reader'}
            </p>
            <p className="text-[10px] text-slate-400">{reviewDate}</p>
          </div>
        </div>
        
        <div className="flex flex-col items-end gap-1">
          <div className="flex items-center gap-1">
            <span className="text-xs text-amber-500 dark:text-[#ffcd00] font-bold tracking-wider">
              {'★'.repeat(Math.min(5, Math.max(1, review.rating || 5)))}
            </span>
          </div>
          {review.verified && (
            <span className="inline-flex items-center gap-1 text-[9px] text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded-sm font-semibold uppercase">
              <ShieldCheck className="w-2.5 h-2.5" />
              Verified Reader
            </span>
          )}
        </div>
      </div>
      
      {/* Review Comment Text */}
      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
        {review.comment}
      </p>

      {/* Action Row: Interactive Like & Dislike Buttons */}
      <div className="pt-2 border-t border-slate-100 dark:border-gray-800/60 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Like Button */}
          <button
            type="button"
            onClick={handleLikeClick}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
              isLiked
                ? "bg-[#856a26] text-white dark:bg-[#ffcd00] dark:text-[#192230] shadow-xs"
                : "bg-slate-100 dark:bg-[#192230] text-slate-600 dark:text-slate-300 hover:bg-[#856a26]/10 dark:hover:bg-[#ffcd00]/10 hover:text-[#856a26] dark:hover:text-[#ffcd00]"
            }`}
          >
            <ThumbsUp className="w-3.5 h-3.5" />
            <span>{isLiked ? `Liked (${counts.likes})` : `Like (${counts.likes})`}</span>
          </button>

          {/* Dislike Button */}
          <button
            type="button"
            onClick={handleDislikeClick}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
              isDisliked
                ? "bg-rose-600 text-white dark:bg-rose-500 dark:text-white shadow-xs"
                : "bg-slate-100 dark:bg-[#192230] text-slate-600 dark:text-slate-300 hover:bg-rose-500/10 hover:text-rose-600 dark:hover:text-rose-400"
            }`}
          >
            <ThumbsDown className="w-3.5 h-3.5" />
            <span>{isDisliked ? `Disliked (${counts.dislikes})` : `Dislike (${counts.dislikes})`}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AllReviews({ reviews = [] }) {
  const { data: session } = authClient.useSession();
  const userId = session?.user?.id || session?.user?.email;
  const userEmail = session?.user?.email || userId;

  return (
    <div className="space-y-4">
      <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400">
        Reviews & User Logs ({reviews.length})
      </h4>
      
      {reviews.map((review) => (
        <ReviewItem 
          key={review._id || review.id} 
          review={review} 
          userId={userId} 
          userEmail={userEmail} 
        />
      ))}
    </div>
  );
}