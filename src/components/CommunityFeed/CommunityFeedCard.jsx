'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Tooltip, Modal } from "@heroui/react";
import { StarFill, Bookmark, ThumbsUp, ShieldCheck } from "@gravity-ui/icons";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import { 
  isCommentSaved, 
  toggleSaveComment, 
  isCommentLiked, 
  toggleLikeComment 
} from "@/lib/saved-comments";

const DEFAULT_AVATAR = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250";

export function CommunityFeedCard({ entry, variants }) {
  const { data: session } = authClient.useSession();
  const userId = session?.user?.id || session?.user?.email;

  const [helpfulCount, setHelpfulCount] = useState(() => entry.helpfulCount ?? entry.likes ?? 0);
  const [isHelpful, setIsHelpful] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalAction, setAuthModalAction] = useState("");
  const [imgSrc, setImgSrc] = useState(() => {
    if (entry.reviewerImage && entry.reviewerImage !== "/default-avatar.png") {
      return entry.reviewerImage;
    }
    return DEFAULT_AVATAR;
  });

  // Dynamically update helpful count from comment data when prop changes
  useEffect(() => {
    setHelpfulCount(entry.helpfulCount ?? entry.likes ?? 0);
  }, [entry.helpfulCount, entry.likes]);

  // Sync initial saved and liked states whenever session or entry changes
  useEffect(() => {
    if (userId && entry?._id) {
      setIsSaved(isCommentSaved(userId, entry._id));
      const isUserInHelpfulList = Array.isArray(entry.helpfulUsers) && session?.user?.email && entry.helpfulUsers.includes(session.user.email);
      setIsHelpful(Boolean(isUserInHelpfulList || isCommentLiked(userId, entry._id)));
    }
  }, [userId, entry?._id, entry.helpfulUsers, session?.user?.email]);

  // Listen for window events to sync state across components in real-time
  useEffect(() => {
    if (!userId || !entry?._id) return;

    const handleSavedUpdate = (e) => {
      if (e.detail?.userId === userId && e.detail?.commentId === entry._id) {
        setIsSaved(e.detail.isSaved);
      }
    };

    const handleLikedUpdate = (e) => {
      if (e.detail?.userId === userId && e.detail?.commentId === entry._id) {
        setIsHelpful(e.detail.isLiked);
      }
    };

    window.addEventListener('saved_comments_updated', handleSavedUpdate);
    window.addEventListener('liked_comments_updated', handleLikedUpdate);

    return () => {
      window.removeEventListener('saved_comments_updated', handleSavedUpdate);
      window.removeEventListener('liked_comments_updated', handleLikedUpdate);
    };
  }, [userId, entry?._id]);

  const handleHelpfulClick = async () => {
    if (!session?.user) {
      setAuthModalAction("mark community reviews as helpful");
      setIsAuthModalOpen(true);
      return;
    }

    const nowLiked = toggleLikeComment(userId, entry._id);
    setIsHelpful(nowLiked);
    if (nowLiked) {
      setHelpfulCount(prev => prev + 1);
      toast.success("Marked review as helpful!");
    } else {
      setHelpfulCount(prev => Math.max(0, prev - 1));
      toast.info("Removed helpful mark.");
    }

    // Persist to backend database for global reader updates
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
      const token = session?.token || session?.session?.token;
      const res = await fetch(`${apiUrl}/community-feed/${entry._id}/helpful`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ userEmail: session.user.email || userId })
      });
      const data = await res.json();
      if (data.success && typeof data.helpfulCount === 'number') {
        setHelpfulCount(data.helpfulCount);
      }
    } catch (err) {
      console.error("Failed to sync helpful count with server:", err);
    }
  };

  const handleSaveClick = () => {
    if (!session?.user) {
      setAuthModalAction(`save "${entry.bookTitle || 'Book'}" to your saved comments`);
      setIsAuthModalOpen(true);
      return;
    }

    const nowSaved = toggleSaveComment(userId, entry);
    setIsSaved(nowSaved);
    if (nowSaved) {
      toast.success(`Saved "${entry.bookTitle || 'Book'}" review to your saved comments!`);
    } else {
      toast.info(`Removed "${entry.bookTitle || 'Book'}" review from saved comments.`);
    }
  };

  const ratingValue = Number(entry.rating) || 5;

  return (
    <>
      <motion.div
        variants={variants}
        whileHover={{ y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
        className="h-full flex flex-col w-full"
      >
        <div className="group relative bg-white dark:bg-[#2c2f38] border border-slate-200/80 dark:border-gray-800 rounded-3xl overflow-hidden shadow-md hover:shadow-xl dark:hover:shadow-[#ffcd00]/10 hover:border-[#856a26]/40 dark:hover:border-[#ffcd00]/40 transition-all duration-300 h-full flex flex-col justify-between p-5 sm:p-6 4k:p-10 select-none">
          <div>
            {/* Header: User Avatar & Flex-Wrapped Verified Reader Badge */}
            <div className="flex gap-3 items-center mb-4">
              <div className="relative w-10 h-10 4k:w-16 4k:h-16 rounded-full overflow-hidden shrink-0 border-2 border-slate-100 dark:border-[#192230] shadow-xs group-hover:border-[#856a26] dark:group-hover:border-[#ffcd00] transition-colors duration-300 bg-slate-100 dark:bg-slate-800">
                <img
                  src={imgSrc}
                  alt={entry.reviewerName || "Reader"}
                  className="w-full h-full object-cover"
                  onError={() => setImgSrc(DEFAULT_AVATAR)}
                  loading="lazy"
                />
              </div>
              
              <div className="flex flex-col items-start justify-center grow min-w-0">
                <div className="flex items-center gap-2 flex-wrap w-full">
                  <h4 className="text-sm sm:text-base 4k:text-2xl font-bold leading-tight text-[#192230] dark:text-white group-hover:text-[#856a26] dark:group-hover:text-[#ffcd00] transition-colors duration-200 truncate">
                    {entry.reviewerName || "Anonymous Reader"}
                  </h4>
                  {entry.isVerified && (
                    <span className="inline-flex items-center gap-1 bg-[#856a26]/10 text-[#856a26] dark:bg-[#ffcd00]/10 dark:text-[#ffcd00] border border-[#856a26]/20 dark:border-[#ffcd00]/30 px-2 py-0.5 rounded-full text-[10px] 4k:text-xs font-extrabold uppercase tracking-wider shrink-0">
                      <ShieldCheck className="w-3 h-3 4k:w-4 4k:h-4" />
                      Verified Reader
                    </span>
                  )}
                </div>
                <span className="text-xs 4k:text-base text-[#3d474e] dark:text-[#9ea7b3] font-medium mt-0.5">
                  Shared a review
                </span>
              </div>
            </div>

            {/* Book Title & Rating Row */}
            <div className="mb-3 space-y-1">
              <div className="flex justify-between items-center gap-2">
                <h3 className="font-extrabold text-[#192230] dark:text-white text-base sm:text-lg 4k:text-3xl line-clamp-1 leading-snug">
                  {entry.bookTitle || "Unknown Book"}
                </h3>
                <div className="flex items-center gap-0.5 shrink-0">
                  {[...Array(5)].map((_, i) => (
                    <StarFill
                      key={i}
                      className={`w-3.5 h-3.5 4k:w-6 4k:h-6 ${
                        i < ratingValue ? 'text-[#856a26] dark:text-[#ffcd00]' : 'text-slate-200 dark:text-gray-700'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Review Comment Quote */}
            <p className="text-[#3d474e] dark:text-[#9ea7b3] text-xs sm:text-sm 4k:text-xl italic leading-relaxed line-clamp-3 mb-6">
              "{entry.comment || "Great read!"}"
            </p>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-slate-100 dark:border-gray-800/80 flex items-center justify-between gap-2">
            <button
              onClick={handleHelpfulClick}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs 4k:text-lg font-bold transition-all duration-200 cursor-pointer ${
                isHelpful
                  ? "bg-[#856a26] text-white dark:bg-[#ffcd00] dark:text-[#192230] shadow-xs"
                  : "bg-slate-100 dark:bg-[#192230] text-[#3d474e] dark:text-[#9ea7b3] hover:bg-[#856a26]/10 dark:hover:bg-[#ffcd00]/10 hover:text-[#856a26] dark:hover:text-[#ffcd00]"
              }`}
            >
              <ThumbsUp className="w-3.5 h-3.5 4k:w-5 4k:h-5" />
              <span>{isHelpful ? `Liked (${helpfulCount})` : helpfulCount > 0 ? `Helpful (${helpfulCount})` : "Helpful"}</span>
            </button>

            <Tooltip content={isSaved ? "Remove from saved comments" : "Save comment from Live Reader Activity"}>
              <button
                onClick={handleSaveClick}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs 4k:text-lg font-extrabold transition-all duration-200 cursor-pointer ${
                  isSaved
                    ? "bg-emerald-600 text-white dark:bg-emerald-500 dark:text-slate-950 shadow-xs"
                    : "bg-[#192230] text-white hover:bg-[#2c2f38] dark:bg-[#ffcd00] dark:text-[#192230] dark:hover:bg-[#ffe066]"
                }`}
              >
                <Bookmark className="w-3.5 h-3.5 4k:w-5 4k:h-5" />
                <span>{isSaved ? "Saved" : "Save"}</span>
              </button>
            </Tooltip>
          </div>

          {/* Bottom Accent Gradient Line */}
          <div className="absolute inset-x-0 bottom-0 h-1 bg-linear-to-r from-transparent via-[#856a26] dark:via-[#ffcd00] to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
        </div>
      </motion.div>

      {/* Auth Prompt Modal for Logged-out Visitors */}
      <Modal isOpen={isAuthModalOpen} onOpenChange={setIsAuthModalOpen}>
        <Modal.Backdrop isOpen={isAuthModalOpen} onOpenChange={setIsAuthModalOpen} className="bg-black/60 backdrop-blur-xs transition-all z-50">
          <Modal.Container placement="center" className="p-4 flex items-center justify-center">
            <Modal.Dialog className="max-w-md w-full bg-white dark:bg-[#192230] text-[#192230] dark:text-white rounded-3xl border border-slate-200 dark:border-gray-800 shadow-2xl p-6 outline-hidden transition-colors duration-300 relative">
              <Modal.CloseTrigger 
                onPress={() => setIsAuthModalOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-[#2c2f38] text-slate-400 transition-colors cursor-pointer"
              />
              <Modal.Header className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-gray-800">
                <Modal.Icon>
                  <ShieldCheck className="w-6 h-6 text-[#856a26] dark:text-[#ffcd00]" />
                </Modal.Icon>
                <Modal.Heading className="text-lg font-black tracking-tight">Reader Sign In Required</Modal.Heading>
              </Modal.Header>
              <Modal.Body className="py-5 space-y-3">
                <p className="text-sm text-[#3d474e] dark:text-[#9ea7b3] leading-relaxed">
                  You need to be signed in as a reader to {authModalAction || "interact with community reviews"}.
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-500">
                  Sign in or create an account to access reading lists, save books, and leave verified reviews across our library network.
                </p>
              </Modal.Body>
              <Modal.Footer className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-gray-800">
                <button
                  type="button"
                  onClick={() => setIsAuthModalOpen(false)}
                  className="px-4 py-2 rounded-full text-xs font-bold bg-slate-100 hover:bg-slate-200 dark:bg-[#2c2f38] dark:hover:bg-[#383d4a] text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <Link
                  href="/signin"
                  className="px-5 py-2 rounded-full text-xs font-extrabold bg-[#192230] text-white hover:bg-[#2c2f38] dark:bg-[#ffcd00] dark:text-[#192230] dark:hover:bg-[#ffe066] transition-all cursor-pointer shadow-md inline-flex items-center justify-center"
                >
                  Sign In to Continue
                </Link>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </>
  );
}

export function CommunityFeedSkeletonCard() {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="relative bg-white dark:bg-[#2c2f38] border border-slate-200/80 dark:border-gray-800 rounded-3xl overflow-hidden shadow-md h-full flex flex-col justify-between p-5 sm:p-6 4k:p-10 select-none animate-pulse">
        <div>
          {/* Header: User Avatar & Reviewer Details */}
          <div className="flex gap-3 items-center mb-4">
            {/* Avatar Circle */}
            <div className="w-10 h-10 4k:w-16 4k:h-16 rounded-full shrink-0 bg-slate-200 dark:bg-slate-700/60" />
            
            <div className="flex flex-col items-start justify-center grow min-w-0 space-y-2">
              <div className="flex items-center gap-2 flex-wrap w-full">
                {/* Reviewer Name Line */}
                <div className="h-4 sm:h-4.5 4k:h-7 w-28 sm:w-36 4k:w-52 bg-slate-200 dark:bg-slate-700/60 rounded-md" />
                {/* Verified Badge Pill */}
                <div className="h-4 4k:h-6 w-20 4k:w-28 bg-slate-200/70 dark:bg-slate-700/40 rounded-full" />
              </div>
              {/* "Shared a review" subtitle */}
              <div className="h-3 4k:h-4 w-24 4k:w-36 bg-slate-200/60 dark:bg-slate-700/40 rounded-md" />
            </div>
          </div>

          {/* Book Title & Rating Stars Row */}
          <div className="mb-3 space-y-1">
            <div className="flex justify-between items-center gap-2">
              {/* Book Title */}
              <div className="h-5 sm:h-6 4k:h-9 w-3/5 bg-slate-200 dark:bg-slate-700/60 rounded-md" />
              {/* 5 Rating Stars */}
              <div className="flex items-center gap-0.5 shrink-0">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-3.5 h-3.5 4k:w-6 4k:h-6 rounded-full bg-slate-200/70 dark:bg-slate-700/50" />
                ))}
              </div>
            </div>
          </div>

          {/* Review Comment Quote lines */}
          <div className="space-y-2 mb-6">
            <div className="h-3.5 sm:h-4 4k:h-6 w-full bg-slate-200/80 dark:bg-slate-700/50 rounded-md" />
            <div className="h-3.5 sm:h-4 4k:h-6 w-11/12 bg-slate-200/80 dark:bg-slate-700/50 rounded-md" />
            <div className="h-3.5 sm:h-4 4k:h-6 w-3/4 bg-slate-200/80 dark:bg-slate-700/50 rounded-md" />
          </div>
        </div>

        {/* Action Buttons Row */}
        <div className="pt-4 border-t border-slate-100 dark:border-gray-800/80 flex items-center justify-between gap-2">
          {/* Helpful Button Pill */}
          <div className="h-7 sm:h-8 4k:h-12 w-24 sm:w-28 4k:w-40 rounded-full bg-slate-200 dark:bg-slate-700/60" />

          {/* Save Button Pill */}
          <div className="h-7 sm:h-8 4k:h-12 w-16 sm:w-20 4k:w-28 rounded-full bg-slate-200 dark:bg-slate-700/60" />
        </div>
      </div>
    </div>
  );
}

