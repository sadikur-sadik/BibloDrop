'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Table } from '@heroui/react';
import { Xmark } from '@gravity-ui/icons';
import LevelUp from './LevelUp/LevelUp';
import { updateDeliveryStatusByLibrarian } from '@/lib/action/action';

const ManageDeliveries = ({ deliveries = [] }) => {
  const [localDeliveries, setLocalDeliveries] = useState(deliveries);

  // Tracks active status updates to show loading spin feedback for specific entries
  const [updatingId, setUpdatingId] = useState(null);

  // Feedback notifications
  const [notification, setNotification] = useState(null);

  // Sync state if initial props change
  useEffect(() => {
    setLocalDeliveries(deliveries);
  }, [deliveries]);

  // --- API CALL HANDLERS & OPTIMISTIC UPDATE ---
  const handleLevelUpStatus = async (delivery) => {
    const STATUS_SEQUENCE = ['pending', 'dispatched', 'delivered'];
    const currentStatus = (delivery.deliveryStatus || 'pending').toLowerCase();
    const currentIndex = STATUS_SEQUENCE.indexOf(currentStatus);

    if (currentIndex === -1 || currentIndex >= STATUS_SEQUENCE.length - 1) {
      console.warn("Status is already at its final level.");
      return;
    }

    const nextStatus = STATUS_SEQUENCE[currentIndex + 1];
    const previousDeliveries = [...localDeliveries];

    // Optimistic Update: Transition the status inside the UI instantly
    setLocalDeliveries((prevDeliveries) =>
      prevDeliveries.map((d) =>
        d._id === delivery._id ? { ...d, deliveryStatus: nextStatus } : d
      )
    );

    try {
      setUpdatingId(delivery._id);

      // Trigger server action call (pending, dispatched, or delivered)
      await updateDeliveryStatusByLibrarian(delivery._id, nextStatus);

      setNotification({
        type: 'success',
        title: 'Status Updated',
        message: `"${delivery.bookTitle}" is now marked as ${nextStatus.toUpperCase()}.`,
        targetId: delivery._id,
      });

      // Clear the notice after 4 seconds
      setTimeout(() => {
        setNotification((prev) => {
          if (prev && prev.targetId === delivery._id) {
            return null;
          }
          return prev;
        });
      }, 4000);

    } catch (error) {
      console.error("Failed to transition delivery status:", error);

      // Revert state if the database write fails
      setLocalDeliveries(previousDeliveries);

      setNotification({
        type: 'error',
        title: 'Action Failed',
        message: `Failed to update status for "${delivery.bookTitle}". Please try again.`,
        targetId: delivery._id,
      });
    } finally {
      setUpdatingId(null);
    }
  };

  // Status indicators for badges
  const getStatusBadge = (status = 'pending') => {
    const normalized = status.toLowerCase();
    if (normalized === 'pending') {
      return {
        text: 'Pending',
        className: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
        dotColor: 'bg-amber-500'
      };
    }
    if (normalized === 'dispatched') {
      return {
        text: 'Dispatched',
        className: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20',
        dotColor: 'bg-indigo-500'
      };
    }
    return {
      text: 'Delivered',
      className: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
      dotColor: 'bg-emerald-500'
    };
  };

  // Helper to safely display formatting dates
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

  // Animation layout configs
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
        <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }} className="text-2xl font-black tracking-tight text-slate-800 dark:text-white">
          Delivery Dispatch<span className="text-[#856a26] dark:text-[#ffcd00]"> Queue</span> 
        </motion.h1>
        <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }} className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Monitor incoming distribution and level up delivery statuses from pending, dispatched, to delivered.
        </motion.p>
      </div>

      {/* QUEUE CONTENT */}
      <div className="relative w-full">
        {localDeliveries.length === 0 ? (
          <div className="text-center py-16 bg-slate-100/40 dark:bg-[#2c2f38]/10 border border-slate-200/80 dark:border-gray-800/60 rounded-3xl max-w-md mx-auto space-y-2">
            <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}className="text-sm font-bold text-slate-500 dark:text-slate-400">
              No deliveries registered in the system.
            </motion.p>
            <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }} className="text-xs text-slate-400 dark:text-slate-500">
              There are currently no dispatch lines matching your database records.
            </motion.p>
          </div>
        ) : (
          <>
            {/* Mobile Layout: Cards */}
            <div className="block lg:hidden">
              <AnimatePresence mode="popLayout">
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="space-y-4"
                >
                  {localDeliveries.map((delivery) => {
                    const statusBadge = getStatusBadge(delivery.deliveryStatus);
                    const isUpdating = updatingId === delivery._id;

                    return (
                      <motion.div
                        layout
                        variants={itemVariants}
                        key={delivery._id}
                        className="p-5 rounded-2xl border border-slate-200/80 dark:border-gray-800/80 bg-white/40 dark:bg-[#2c2f38]/20 backdrop-blur-md space-y-4"
                      >
                        <div className="flex flex-col gap-1">
                          <span className="text-slate-400 uppercase tracking-wider text-[9px] font-extrabold block">Client</span>
                          <h4 className="font-extrabold text-sm leading-tight text-slate-800 dark:text-slate-100">{delivery.userName || 'Guest User'}</h4>
                          <p className="text-xs text-[#3d474e] dark:text-[#9ea7b3]">{delivery.userEmail}</p>
                        </div>

                        <div className="pt-3 border-t border-slate-200/60 dark:border-gray-800/60 space-y-2">
                          <div className="flex flex-col gap-0.5">
                            <span className="text-slate-400 uppercase tracking-wider text-[9px] font-extrabold block">Book Details</span>
                            <span className="text-xs font-extrabold text-slate-800 dark:text-slate-200">{delivery.bookTitle}</span>
                            <span className="text-[11px] text-slate-500 dark:text-slate-400">{delivery.bookAuthor}</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-y-3 gap-x-4 pt-3 border-t border-slate-200/60 dark:border-gray-800/60 text-xs">
                          <div className="space-y-1">
                            <span className="text-slate-400 uppercase tracking-wider text-[10px] font-extrabold block">Order Date</span>
                            <span className="font-bold text-slate-600 dark:text-slate-300">
                              {formatDate(delivery.createdAt)}
                            </span>
                          </div>

                          <div className="space-y-1">
                            <span className="text-slate-400 uppercase tracking-wider text-[10px] font-extrabold block">Status</span>
                            <span className={`inline-flex items-center gap-1.5 w-auto px-2.5 py-1 rounded-full text-xs font-semibold border ${statusBadge.className}`}>
                              <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${statusBadge.dotColor}`} />
                              <span className="truncate">{statusBadge.text}</span>
                            </span>
                          </div>
                        </div>

                        <div className="pt-3 border-t border-slate-200/60 dark:border-gray-800/60 flex flex-col gap-2">
                          <span className="text-slate-400 uppercase tracking-wider text-[9px] font-extrabold">Dispatch Status Management</span>
                          <div className="flex items-center justify-start">
                            <LevelUp
                              status={delivery.deliveryStatus}
                              onLevelUp={() => handleLevelUpStatus(delivery)}
                              isUpdating={isUpdating}
                            />
                          </div>
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
                  <Table.Content aria-label="Deliveries Table">
                    <Table.Header>
                      <Table.Column isRowHeader className="bg-slate-100 dark:bg-[#2c2f38] text-slate-700 dark:text-slate-200 font-extrabold text-sm py-4 first:rounded-l-2xl last:rounded-r-2xl border-b border-slate-200 dark:border-gray-800">
                        Client Details
                      </Table.Column>
                      <Table.Column className="bg-slate-100 dark:bg-[#2c2f38] text-slate-700 dark:text-slate-200 font-extrabold text-sm py-4 border-b border-slate-200 dark:border-gray-800">
                        Book Selection
                      </Table.Column>
                      <Table.Column className="bg-slate-100 dark:bg-[#2c2f38] text-slate-700 dark:text-slate-200 font-extrabold text-sm py-4 border-b border-slate-200 dark:border-gray-800">
                        Order Date
                      </Table.Column>
                      <Table.Column className="bg-slate-100 dark:bg-[#2c2f38] text-slate-700 dark:text-slate-200 font-extrabold text-sm py-4 border-b border-slate-200 dark:border-gray-800">
                        Current Status
                      </Table.Column>
                      <Table.Column align="end" className="bg-slate-100 dark:bg-[#2c2f38] text-slate-700 dark:text-slate-200 font-extrabold text-sm py-4 first:rounded-l-2xl last:rounded-r-2xl border-b border-slate-200 dark:border-gray-800 text-right">
                        Action Updates
                      </Table.Column>
                    </Table.Header>

                    <Table.Body>
                      {localDeliveries.map((delivery, idx) => {
                        const statusBadge = getStatusBadge(delivery.deliveryStatus);
                        const isUpdating = updatingId === delivery._id;

                        return (
                          <Table.Row
                            key={delivery._id}
                            className="hover:bg-slate-100/40 dark:hover:bg-[#2c2f38]/20 transition-colors border-b border-slate-200/60 dark:border-gray-800/60 last:border-0"
                          >
                            <Table.Cell className="py-4">
                              <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.03, type: "spring", stiffness: 120 }}
                                className="flex flex-col"
                              >
                                <span className="font-extrabold text-sm">{delivery.userName || 'Guest User'}</span>
                                <span className="text-xs text-[#3d474e] dark:text-[#9ea7b3] mt-0.5">{delivery.userEmail}</span>
                              </motion.div>
                            </Table.Cell>

                            <Table.Cell className="py-4">
                              <div className="flex flex-col">
                                <span className="font-extrabold text-sm">{delivery.bookTitle}</span>
                                <span className="text-xs text-[#3d474e] dark:text-[#9ea7b3] mt-0.5">{delivery.bookAuthor || 'Unknown Author'}</span>
                              </div>
                            </Table.Cell>

                            <Table.Cell className="py-4 font-bold text-xs text-slate-500 dark:text-slate-400">
                              {formatDate(delivery.createdAt)}
                            </Table.Cell>

                            <Table.Cell className="py-4">
                              <motion.span
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className={`inline-flex items-center gap-1.5 w-auto px-3 py-1 rounded-full text-xs font-bold border ${statusBadge.className}`}
                              >
                                <span className={`w-2 h-2 rounded-full shrink-0 ${statusBadge.dotColor}`} />
                                <span className="truncate">{statusBadge.text}</span>
                              </motion.span>
                            </Table.Cell>

                            <Table.Cell className="py-4 text-right">
                              <div className="flex items-center justify-end">
                                <LevelUp
                                  status={delivery.deliveryStatus}
                                  onLevelUp={() => handleLevelUpStatus(delivery)}
                                  isUpdating={isUpdating}
                                />
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

export default ManageDeliveries;