import React from 'react';
import { motion } from 'motion/react';

const LevelUp = ({ status = 'pending', onLevelUp, isUpdating }) => {
  const normalizedStatus = (status || 'pending').toLowerCase();

  // Defines the step flow sequence
  const steps = [
    { label: 'Pending', key: 'pending' },
    { label: 'Dispatched', key: 'dispatched' },
    { label: 'Delivered', key: 'delivered' }
  ];

  const currentIndex = steps.findIndex(step => step.key === normalizedStatus);
  const nextStep = currentIndex < 2 ? steps[currentIndex + 1] : null;

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 py-1.5">
      {/* visual Progress dots mapping the sequence */}
      <div className="flex items-center gap-1.5 shrink-0">
        {steps.map((step, index) => {
          const isCompleted = index <= currentIndex;
          const isActive = index === currentIndex;
          return (
            <React.Fragment key={step.key}>
              {index > 0 && (
                <div className={`w-5 h-0.5 rounded transition-colors duration-300 ${
                  index <= currentIndex ? 'bg-[#856a26] dark:bg-[#ffcd00]' : 'bg-slate-200 dark:bg-gray-800'
                }`} />
              )}
              <div 
                className={`relative w-3.5 h-3.5 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isActive 
                    ? 'ring-4 ring-[#856a26]/20 dark:ring-[#ffcd00]/20 bg-[#856a26] dark:bg-[#ffcd00]' 
                    : isCompleted 
                      ? 'bg-[#856a26] dark:bg-[#ffcd00]' 
                      : 'bg-slate-200 dark:bg-gray-800'
                }`}
                title={step.label}
              >
                {isCompleted && !isActive && (
                  <span className="text-[7px] text-white dark:text-slate-900 font-bold">✓</span>
                )}
              </div>
            </React.Fragment>
          );
        })}
      </div>

      {/* Dynamic Action Trigger to level up */}
      {nextStep ? (
        <motion.button
          whileHover={!isUpdating ? { scale: 1.02 } : {}}
          whileTap={!isUpdating ? { scale: 0.98 } : {}}
          onClick={onLevelUp}
          disabled={isUpdating}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer flex items-center gap-1.5 border shrink-0 ${
            isUpdating
              ? 'bg-slate-100 dark:bg-gray-800/80 text-slate-400 dark:text-gray-500 border-transparent animate-pulse cursor-wait'
              : 'bg-[#856a26]/10 text-[#856a26] dark:bg-[#ffcd00]/10 dark:text-[#ffcd00] hover:bg-[#856a26]/20 dark:hover:bg-[#ffcd00]/20 border-[#856a26]/20 dark:border-[#ffcd00]/30'
          }`}
        >
          {isUpdating ? (
            <>
              <span className="w-3.5 h-3.5 rounded-full border-2 border-current border-t-transparent animate-spin inline-block" />
              Processing...
            </>
          ) : (
            <>
              <span>Dispatch to {nextStep.label}</span>
              <span className="text-sm">→</span>
            </>
          )}
        </motion.button>
      ) : (
        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-lg shrink-0">
          ✓ Completed
        </span>
      )}
    </div>
  );
};

export default LevelUp;