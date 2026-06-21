'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Eye, EyeSlash, Lock } from '@gravity-ui/icons';

const PublishByAdmin = ({ book, onTogglePublish }) => {
  const isPending = book.currentStatus === 'pending';
  const isPublished = book.isPublished;

  return (
    <div className="relative group">
      <motion.button
        whileHover={!isPending ? { scale: 1.08 } : {}}
        whileTap={!isPending ? { scale: 0.95 } : {}}
        onClick={() => !isPending && onTogglePublish(book)}
        disabled={isPending}
        className={`p-2 rounded-xl transition-colors cursor-pointer flex items-center justify-center ${
          isPending
            ? 'bg-slate-200/30 text-slate-300 dark:bg-[#3d474e]/10 dark:text-slate-700 cursor-not-allowed'
            : isPublished
            ? 'bg-rose-500/10 text-rose-500 hover:bg-rose-500/20'
            : 'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20'
        }`}
        title={isPending ? 'Locked: Awaiting Admin Approval' : isPublished ? 'Unpublish Book' : 'Publish Book'}
      >
        {isPending ? (
          <Lock className="w-4 h-4" />
        ) : isPublished ? (
          <EyeSlash className="w-4 h-4" />
        ) : (
          <Eye className="w-4 h-4" />
        )}
      </motion.button>

      {/* Warning tooltip display when action is locked */}
      {isPending && (
        <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block w-48 p-2 rounded-lg bg-[#192230] dark:bg-white text-white dark:text-[#192230] text-[10px] font-bold text-center shadow-lg pointer-events-none z-20">
          Publishing power disabled while "Pending Approval"
        </div>
      )}
    </div>
  );
};

export default PublishByAdmin;