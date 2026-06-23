'use client';

import React from 'react';
import { Table } from '@heroui/react';
import { motion, AnimatePresence } from 'motion/react';

const TranstactionHistory = ({ deliveries = [] }) => {
  // Date Formatter Helper
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch (error) {
      return dateString;
    }
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

  return (
    <div className="relative w-full bg-transparent text-[#192230] dark:text-white transition-colors duration-300 space-y-6">
      
      {/* ========================================================
          HEADER SECTION
          ======================================================== */}
      <div className="border-b border-slate-200/80 dark:border-gray-800/80 pb-6 mb-8">
        <h1 className="text-2xl font-black tracking-tight text-slate-800 dark:text-white">
          Transaction <span className="text-[#856a26] dark:text-[#ffcd00]">History</span>
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Review system distributions, billing logs, and delivery allocations.
        </p>
      </div>

      {/* ========================================================
          QUEUE CONTENT
          ======================================================== */}
      <div className="relative w-full">
        {deliveries.length === 0 ? (
          <div className="text-center py-16 bg-slate-100/40 dark:bg-[#2c2f38]/10 border border-slate-200/80 dark:border-gray-800/60 rounded-3xl max-w-md mx-auto space-y-2">
            <p className="text-sm font-bold text-slate-500 dark:text-slate-400">
              No transactions recorded.
            </p>
            <p className="text-xs text-slate-400 dark:text-slate-500">
              There are currently no transaction or delivery entries to display.
            </p>
          </div>
        ) : (
          <>
            {/* Mobile Layout: Responsive Metadata Cards */}
            <div className="block lg:hidden">
              <AnimatePresence mode="popLayout">
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-4"
                >
                  {deliveries.map((delivery, idx) => (
                    <motion.div
                      layout
                      variants={itemVariants}
                      key={delivery._id || delivery.transactionId || idx}
                      className="p-5 rounded-2xl border border-slate-200/80 dark:border-gray-800/80 bg-white/40 dark:bg-[#2c2f38]/20 backdrop-blur-md space-y-4"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <span className="text-slate-400 uppercase tracking-wider text-[10px] font-extrabold block">Transaction ID</span>
                          <code className="text-xs font-mono font-bold text-[#856a26] dark:text-[#ffcd00] break-all">
                            {delivery.transactionId || 'N/A'}
                          </code>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-slate-400 uppercase tracking-wider text-[10px] font-extrabold block">Amount</span>
                          <span className="text-sm font-black text-emerald-600 dark:text-emerald-400">
                            {typeof delivery.paid === 'number' 
                              ? `$${delivery.paid.toFixed(2)}` 
                              : `$${delivery.paid || '0.00'}`}
                          </span>
                        </div>
                      </div>

                      {/* Responsive Info Grid */}
                      <div className="grid grid-cols-2 gap-y-3 gap-x-4 pt-3 border-t border-slate-200/60 dark:border-gray-800/60 text-xs">
                        <div className="space-y-0.5 min-w-0">
                          <span className="text-slate-400 uppercase tracking-wider text-[10px] font-extrabold block">User Email</span>
                          <span className="font-semibold text-slate-700 dark:text-slate-300 block truncate" title={delivery.userEmail}>
                            {delivery.userEmail || 'N/A'}
                          </span>
                        </div>

                        <div className="space-y-0.5 min-w-0">
                          <span className="text-slate-400 uppercase tracking-wider text-[10px] font-extrabold block">Librarian Email</span>
                          <span className="font-semibold text-slate-700 dark:text-slate-300 block truncate" title={delivery.librarianEmail || delivery.librarianId}>
                            {delivery.librarianEmail || delivery.librarianId || 'N/A'}
                          </span>
                        </div>

                        <div className="col-span-2 flex justify-between items-center pt-2 border-t border-slate-100 dark:border-gray-800/40">
                          <span className="text-slate-400 uppercase tracking-wider text-[10px] font-extrabold">Date / Time</span>
                          <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                            {formatDate(delivery.createdAt)}
                          </p>
                        </div>
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
                  <Table.Content aria-label="Transaction History Table">
                    <Table.Header>
                      <Table.Column isRowHeader className="bg-slate-100 dark:bg-[#2c2f38] text-slate-700 dark:text-slate-200 font-extrabold text-sm py-4 first:rounded-l-2xl last:rounded-r-2xl border-b border-slate-200 dark:border-gray-800">
                        Transaction ID
                      </Table.Column>
                      <Table.Column className="bg-slate-100 dark:bg-[#2c2f38] text-slate-700 dark:text-slate-200 font-extrabold text-sm py-4 border-b border-slate-200 dark:border-gray-800">
                        User Email
                      </Table.Column>
                      <Table.Column className="bg-slate-100 dark:bg-[#2c2f38] text-slate-700 dark:text-slate-200 font-extrabold text-sm py-4 border-b border-slate-200 dark:border-gray-800">
                        Librarian Email / ID
                      </Table.Column>
                      <Table.Column className="bg-slate-100 dark:bg-[#2c2f38] text-slate-700 dark:text-slate-200 font-extrabold text-sm py-4 border-b border-slate-200 dark:border-gray-800">
                        Amount
                      </Table.Column>
                      <Table.Column align="end" className="bg-slate-100 dark:bg-[#2c2f38] text-slate-700 dark:text-slate-200 font-extrabold text-sm py-4 first:rounded-l-2xl last:rounded-r-2xl border-b border-slate-200 dark:border-gray-800 text-right">
                        Date
                      </Table.Column>
                    </Table.Header>

                    <Table.Body>
                      {deliveries.map((delivery, idx) => (
                        <Table.Row
                          key={delivery._id || delivery.transactionId || idx}
                          className="hover:bg-slate-100/40 dark:hover:bg-[#2c2f38]/20 transition-colors border-b border-slate-200/60 dark:border-gray-800/60 last:border-0"
                        >
                          <Table.Cell className="py-4">
                            <motion.code
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.03, type: 'spring', stiffness: 120 }}
                              className="text-xs font-mono font-bold text-[#856a26] dark:text-[#ffcd00]"
                            >
                              {delivery.transactionId || 'N/A'}
                            </motion.code>
                          </Table.Cell>

                          <Table.Cell className="py-4 font-bold text-sm text-slate-800 dark:text-slate-200">
                            {delivery.userEmail || 'N/A'}
                          </Table.Cell>

                          <Table.Cell className="py-4 text-xs font-semibold text-slate-500 dark:text-slate-400">
                            {delivery.librarianEmail || delivery.librarianId || 'N/A'}
                          </Table.Cell>

                          <Table.Cell className="py-4 font-black text-sm text-emerald-600 dark:text-emerald-400">
                            {typeof delivery.paid === 'number' 
                              ? `$${delivery.paid.toFixed(2)}` 
                              : `$${delivery.paid || '0.00'}`}
                          </Table.Cell>

                          <Table.Cell className="py-4 text-right text-xs font-medium text-slate-500 dark:text-slate-400">
                            {formatDate(delivery.createdAt)}
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

export default TranstactionHistory;