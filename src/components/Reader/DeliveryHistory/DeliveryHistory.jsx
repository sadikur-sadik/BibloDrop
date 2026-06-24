'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Table } from '@heroui/react';

const DeliveryHistory = ({ deliveries = [] }) => {
  
  // Helper to safely format dates
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return 'N/A';
    }
  };

  // Helper to format currency for the delivery fee (mapped to the 'paid' database field)
  const formatFee = (fee) => {
    if (typeof fee === 'number') {
      return `$${fee.toFixed(2)}`;
    }
    return fee ? `$${fee}` : '$0.00';
  };

  // Visual Tracker Generator (Read-only UI)
  const renderProgressTracker = (status = 'pending') => {
    const normalizedStatus = status.toLowerCase();
    
    const steps = [
      { label: 'Pending', key: 'pending' },
      { label: 'Dispatched', key: 'dispatched' },
      { label: 'Delivered', key: 'delivered' }
    ];

    const currentIndex = steps.findIndex(step => step.key === normalizedStatus);

    return (
      <div className="w-full max-w-70 py-1">
        {/* Step labels */}
        <div className="flex justify-between items-center text-[10px] font-extrabold uppercase tracking-wider mb-2">
          {steps.map((step, index) => {
            const isActiveOrCompleted = index <= currentIndex;
            return (
              <span 
                key={`${step.key}-label`}
                className={`transition-colors duration-300 ${
                  isActiveOrCompleted 
                    ? 'text-[#856a26] dark:text-[#ffcd00]' 
                    : 'text-slate-400 dark:text-slate-500'
                }`}
              >
                {step.label}
              </span>
            );
          })}
        </div>

        {/* Visual Line and Dots Layout */}
        <div className="flex items-center justify-between w-full relative">
          {/* Background Track Line */}
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-slate-200 dark:bg-gray-800 rounded-full z-0" />
          
          {/* Active Fill Line */}
          <div 
            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-[#856a26] dark:bg-[#ffcd00] transition-all duration-500 ease-out z-0"
            style={{ width: currentIndex === 0 ? '0%' : currentIndex === 1 ? '50%' : '100%' }}
          />

          {/* Dots mapped over the line */}
          {steps.map((step, index) => {
            const isCompleted = index <= currentIndex;
            const isActive = index === currentIndex;

            return (
              <div 
                key={`${step.key}-dot`}
                className={`relative z-10 w-3.5 h-3.5 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isActive 
                    ? 'ring-4 ring-[#856a26]/20 dark:ring-[#ffcd00]/20 bg-[#856a26] dark:bg-[#ffcd00]' 
                    : isCompleted 
                      ? 'bg-[#856a26] dark:bg-[#ffcd00]' 
                      : 'bg-slate-300 dark:bg-gray-700'
                }`}
              >
                {isCompleted && !isActive && (
                  <span className="text-[7px] text-white dark:text-slate-900 font-bold">✓</span>
                )}
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-white dark:bg-slate-900" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Framer motion variants
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

  return (
    <div className="relative w-full bg-transparent text-[#192230] dark:text-white transition-colors duration-300 space-y-6">
      
      {/* HEADER SECTION */}
      <div className="border-b border-slate-200/80 dark:border-gray-800/80 pb-6 mb-8">
        <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }} className="text-2xl font-black tracking-tight text-slate-800 dark:text-white">
          Delivery <span className="text-[#856a26] dark:text-[#ffcd00]">History</span>
        </motion.h1>
        <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }} className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Track the status of your requested items from order to doorstep delivery.
        </motion.p>
      </div>

      {/* CONTENT */}
      <div className="relative w-full">
        {deliveries.length === 0 ? (
          <div className="text-center py-16 bg-slate-100/40 dark:bg-[#2c2f38]/10 border border-slate-200/80 dark:border-gray-800/60 rounded-3xl max-w-md mx-auto space-y-2">
            <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }} className="text-sm font-bold text-slate-500 dark:text-slate-400">
              No delivery records found.
            </motion.p>
            <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }} className="text-xs text-slate-400 dark:text-slate-500">
              You haven't requested any books that require tracking yet.
            </motion.p>
          </div>
        ) : (
          <>
            {/* Mobile Layout: Stacked Cards */}
            <div className="block lg:hidden">
              <AnimatePresence mode="popLayout">
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="space-y-4"
                >
                  {deliveries.map((delivery) => (
                    <motion.div
                      layout
                      variants={itemVariants}
                      key={delivery._id}
                      className="p-5 rounded-2xl border border-slate-200/80 dark:border-gray-800/80 bg-white/40 dark:bg-[#2c2f38]/20 backdrop-blur-md flex flex-col gap-4"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex flex-col gap-0.5">
                          <span className="text-slate-400 uppercase tracking-wider text-[9px] font-extrabold block">Book Details</span>
                          <span className="text-sm font-extrabold text-slate-800 dark:text-slate-100">{delivery.bookTitle}</span>
                          <span className="text-xs text-[#3d474e] dark:text-[#9ea7b3]">{delivery.bookAuthor || 'Unknown Author'}</span>
                        </div>
                        <div className="flex flex-col items-end gap-0.5 text-right">
                          <span className="text-slate-400 uppercase tracking-wider text-[9px] font-extrabold block">Request Date</span>
                          <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
                            {formatDate(delivery.createdAt)}
                          </span>
                        </div>
                      </div>

                      {/* Display Delivery Fee in Card Grid */}
                      <div className="grid grid-cols-2 gap-y-3 gap-x-4 pt-3 border-t border-slate-200/60 dark:border-gray-800/60 text-xs">
                        <div className="space-y-1">
                          <span className="text-slate-400 uppercase tracking-wider text-[9px] font-extrabold block">Delivery Fee</span>
                          <span className="font-extrabold text-sm text-slate-800 dark:text-slate-200">
                            {formatFee(delivery.paid)}
                          </span>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-slate-200/60 dark:border-gray-800/60">
                         {renderProgressTracker(delivery.deliveryStatus)}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Desktop Layout: Table */}
            <div className="hidden lg:block">
              <Table className="bg-transparent shadow-none">
                <Table.ScrollContainer className="bg-transparent">
                  <Table.Content aria-label="Delivery History Table">
                    <Table.Header>
                      <Table.Column isRowHeader className="bg-slate-100 dark:bg-[#2c2f38] text-slate-700 dark:text-slate-200 font-extrabold text-sm py-4 first:rounded-l-2xl border-b border-slate-200 dark:border-gray-800 w-1/4">
                        Book Selection
                      </Table.Column>
                      <Table.Column className="bg-slate-100 dark:bg-[#2c2f38] text-slate-700 dark:text-slate-200 font-extrabold text-sm py-4 border-b border-slate-200 dark:border-gray-800">
                        Delivery Fee
                      </Table.Column>
                      <Table.Column className="bg-slate-100 dark:bg-[#2c2f38] text-slate-700 dark:text-slate-200 font-extrabold text-sm py-4 border-b border-slate-200 dark:border-gray-800">
                        Request Date
                      </Table.Column>
                      <Table.Column align="start" className="bg-slate-100 dark:bg-[#2c2f38] text-slate-700 dark:text-slate-200 font-extrabold text-sm py-4 last:rounded-r-2xl border-b border-slate-200 dark:border-gray-800">
                        Delivery Progress
                      </Table.Column>
                    </Table.Header>

                    <Table.Body>
                      {deliveries.map((delivery, idx) => (
                        <Table.Row
                          key={delivery._id}
                          className="hover:bg-slate-100/40 dark:hover:bg-[#2c2f38]/20 transition-colors border-b border-slate-200/60 dark:border-gray-800/60 last:border-0"
                        >
                          <Table.Cell className="py-4 align-top">
                            <motion.div
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.03, type: "spring", stiffness: 120 }}
                              className="flex flex-col"
                            >
                              <span className="font-extrabold text-sm">{delivery.bookTitle}</span>
                              <span className="text-xs text-[#3d474e] dark:text-[#9ea7b3] mt-0.5">{delivery.bookAuthor || 'Unknown Author'}</span>
                            </motion.div>
                          </Table.Cell>

                          <Table.Cell className="py-4 align-top font-bold text-xs text-slate-700 dark:text-slate-300">
                            {formatFee(delivery.paid)}
                          </Table.Cell>

                          <Table.Cell className="py-4 align-top font-bold text-xs text-slate-500 dark:text-slate-400">
                            {formatDate(delivery.createdAt)}
                          </Table.Cell>

                          <Table.Cell className="py-4">
                            <div className="flex items-center justify-start">
                              {renderProgressTracker(delivery.deliveryStatus)}
                            </div>
                          </Table.Cell>
                        </Table.Row>
                      ))}
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

export default DeliveryHistory;