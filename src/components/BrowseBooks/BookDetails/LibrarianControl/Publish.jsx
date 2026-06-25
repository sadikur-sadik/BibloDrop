'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Eye, EyeSlash, Lock } from '@gravity-ui/icons';

const PublishToggle = ({
  book,
  isToggling,
  onToggle,
  variant = 'icon'
}) => {
  const isPending = book?.currentStatus === 'pending';
  const isPublished = book?.isPublished;

  const handlePress = () => {
    if (isPending || isToggling) return;
    onToggle(book);
  };

  const hoverAnimation = !isPending && !isToggling ? { scale: 1.05 } : {};
  const tapAnimation = !isPending && !isToggling ? { scale: 0.95 } : {};

  // --- Variant 1: Text Button (Kept original w-full layout) ---
  if (variant === 'button') {
    return (
      <motion.button
        whileHover={hoverAnimation}
        whileTap={tapAnimation}
        onClick={handlePress}
        disabled={isPending || isToggling}
        className={`w-full h-9 px-3 rounded-xl text-[11px] font-bold tracking-tight flex items-center justify-center gap-1.5 transition-all cursor-pointer ${isPending
          ? 'bg-slate-100 text-slate-400/70 dark:bg-[#3d474e]/20 dark:text-[#9ea7b3]/30 cursor-not-allowed border border-slate-200/20 dark:border-gray-800/40'
          : isToggling
            ? 'bg-slate-200/50 text-slate-500 dark:bg-[#3d474e]/40 dark:text-slate-400 animate-pulse cursor-wait'
            : isPublished
              ? 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 dark:border-emerald-500/10'
              : 'bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 border border-rose-500/20 dark:border-rose-500/10'
          }`}
      >
        {isPending ? (
          <>
            <Lock className="w-3.5 h-3.5 shrink-0" />
            <span className="hidden sm:inline-block whitespace-nowrap">Locked</span>
          </>
        ) : isToggling ? (
          <>
            <div className="w-3.5 h-3.5 rounded-full border-2 border-slate-400 border-t-transparent animate-spin shrink-0" />
            <span className="hidden sm:inline-block whitespace-nowrap">Updating...</span>
          </>
        ) : isPublished ? (
          <>
            <Eye className="w-3.5 h-3.5 shrink-0" />
            <span className="hidden sm:inline-block whitespace-nowrap">Published</span>
          </>
        ) : (
          <>
            <EyeSlash className="w-3.5 h-3.5 shrink-0" />
            <span className="hidden sm:inline-block whitespace-nowrap">Unpublished</span>
          </>
        )}
      </motion.button>
    );
  }

  // --- Variant 2: Icon-only Tooltip (Kept original responsive square-to-pill widths) ---
  return (
    <div className="relative group flex items-center justify-center">
      <motion.button
        whileHover={hoverAnimation}
        whileTap={tapAnimation}
        onClick={handlePress}
        disabled={isPending || isToggling}
        className={`h-9 w-9 sm:w-auto sm:px-3 sm:gap-1.5 rounded-xl transition-colors cursor-pointer flex items-center justify-center shrink-0 ${isPending
            ? 'bg-slate-100 text-slate-400/70 dark:bg-[#3d474e]/20 dark:text-[#9ea7b3]/30 cursor-not-allowed border border-slate-200/20'
            : isToggling
              ? 'bg-slate-200 text-slate-400 dark:bg-[#3d474e] dark:text-[#9ea7b3] animate-pulse cursor-wait'
              : isPublished
                ? 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                : 'bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 border border-rose-500/20'
          }`}
        title={
          isPending
            ? 'Locked: Awaiting Admin Approval'
            : isPublished
              ? 'Unpublish Book'
              : 'Publish Book'
        }
      >
        {isPending ? (
          <Lock className="w-3.5 h-3.5 shrink-0" />
        ) : isToggling ? (
          <div className="w-3.5 h-3.5 rounded-full border-2 border-slate-400 border-t-transparent animate-spin shrink-0" />
        ) : isPublished ? (
          <Eye className="w-3.5 h-3.5 shrink-0" />
        ) : (
          <EyeSlash className="w-3.5 h-3.5 shrink-0" />
        )}

        <span className="hidden sm:inline-block text-[11px] font-bold tracking-tight whitespace-nowrap">
          {isPending
            ? 'Pending'
            : isToggling
              ? 'Saving...'
              : isPublished
                ? 'Published'
                : 'Publish'}
        </span>
      </motion.button>

      {isPending && (
        <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block w-48 p-2 rounded-lg bg-[#192230] dark:bg-white text-white dark:text-[#192230] text-[10px] font-bold text-center shadow-lg pointer-events-none z-20">
          Publishing power disabled while "Pending Approval"
        </div>
      )}
    </div>
  );
};

export default PublishToggle;