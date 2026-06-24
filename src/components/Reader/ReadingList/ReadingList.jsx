'use client';

import React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { Table } from '@heroui/react';

const ReadingList = ({ readingList = [] }) => {
  
  // Calculate collection summary statistics
  const totalBooks = readingList.length;
  const totalPaid = readingList.reduce((sum, book) => sum + (book.deliveryFee || 0), 0);

  // Dynamic color tagging based on genre
  const getGenreBadgeStyles = (genre = '') => {
    const g = genre.toLowerCase();
    if (g.includes('mystery') || g.includes('thriller')) {
      return 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20';
    }
    if (g.includes('fantasy') || g.includes('adventure')) {
      return 'bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20';
    }
    if (g.includes('sci-fi') || g.includes('fiction')) {
      return 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20';
    }
    if (g.includes('history') || g.includes('biography') || g.includes('non')) {
      return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20';
    }
    return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20';
  };

  // Modern verification layout for the payment state
  const renderPaidStatusBadge = (fee) => {
    const amount = typeof fee === 'number' ? fee : 0;
    return (
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-extrabold border bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20">
        <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M2.166 4.9L10 1.154l7.834 3.746A2 2 0 0119 6.653v5.61a6 6 0 01-3.617 5.485L10 20l-5.383-2.252A6 6 0 011 12.264V6.652a2 2 0 011.166-1.753zm8.56 3.66a1 1 0 10-1.452-1.38L6.5 10.12l-1.218-1.162a1 1 0 10-1.38 1.452l2 1.9a1 1 0 001.416-.036l3.01-3.216z" clipRule="evenodd" />
        </svg>
        <span>Paid • ${amount.toFixed(2)}</span>
      </div>
    );
  };

  // Formatting utility for genre titles
  const formatGenre = (genreStr) => {
    if (!genreStr) return 'General';
    return genreStr
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Animation sequences
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.04 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 90, damping: 14 } }
  };

  return (
    <div className="relative w-full bg-transparent text-[#192230] dark:text-white transition-colors duration-300 space-y-8">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-slate-200/80 dark:border-gray-800/80 pb-6 gap-4">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }} className="text-2xl font-black tracking-tight text-slate-800 dark:text-white">
            Library <span className="text-[#856a26] dark:text-[#ffcd00]">Collection</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Browse through books you have registered, paid for, and unlocked in your account.
          </motion.p>
        </div>

        {/* METRICS SUMMARY BAR */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="px-4 py-2.5 rounded-2xl bg-slate-100/60 dark:bg-[#2c2f38]/30 border border-slate-200/60 dark:border-gray-800/60 flex flex-col min-w-22.5">
            <span className="text-[9px] uppercase font-black text-slate-400 tracking-wider">Books</span>
            <span className="text-sm font-black text-slate-800 dark:text-white">{totalBooks}</span>
          </div>
          <div className="px-4 py-2.5 rounded-2xl bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/20 flex flex-col min-w-27.5">
            <span className="text-[9px] uppercase font-black text-emerald-600 dark:text-emerald-400 tracking-wider">Fees Paid</span>
            <span className="text-sm font-black text-emerald-600 dark:text-emerald-400">${totalPaid.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* READING LIST GRID/TABLE */}
      <div className="relative w-full">
        {readingList.length === 0 ? (
          <div className="text-center py-16 bg-slate-100/40 dark:bg-[#2c2f38]/10 border border-slate-200/80 dark:border-gray-800/60 rounded-3xl max-w-md mx-auto space-y-2">
            <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }} className="text-sm font-bold text-slate-500 dark:text-slate-400">
              Your reading list is empty.
            </motion.p>
            <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }} className="text-xs text-slate-400 dark:text-slate-500">
              Purchased and completed items will automatically settle here.
            </motion.p>
          </div>
        ) : (
          <>
            {/* Mobile Cards View */}
            <div className="block lg:hidden">
              <AnimatePresence mode="popLayout">
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="space-y-4"
                >
                  {readingList.map((book) => {
                    const genreClass = getGenreBadgeStyles(book.genre);

                    return (
                      <motion.div
                        layout
                        variants={itemVariants}
                        key={book._id}
                        className="p-5 rounded-2xl border border-slate-200/80 dark:border-gray-800/80 bg-white/40 dark:bg-[#2c2f38]/20 backdrop-blur-md flex flex-col gap-4 group hover:shadow-lg hover:shadow-slate-100/30 dark:hover:shadow-none transition-all duration-300"
                      >
                        <div className="flex items-start gap-4">
                          {book.coverImage && (
                            <div className="relative overflow-hidden rounded-xl border border-slate-200 dark:border-gray-800 shadow-md shrink-0">
                              <Image
                                src={book.coverImage}
                                alt={book.title}
                                width={64}
                                height={88}
                                className="w-16 h-22 object-cover transition-transform duration-300 group-hover:scale-105"
                                unoptimized
                              />
                            </div>
                          )}
                          <div className="min-w-0 flex-1 py-1">
                            <span className={`inline-block px-2.5 py-0.5 mb-2 rounded-lg text-[9px] uppercase font-black tracking-wider border ${genreClass}`}>
                              {formatGenre(book.genre)}
                            </span>
                            <h4 className="font-extrabold text-sm leading-snug text-slate-800 dark:text-slate-100 line-clamp-2">
                              {book.title}
                            </h4>
                            <p className="text-xs text-[#3d474e] dark:text-[#9ea7b3] mt-0.5 truncate">
                              by {book.author}
                            </p>
                          </div>
                        </div>

                        <div className="pt-3.5 border-t border-slate-200/60 dark:border-gray-800/60 flex items-center justify-between">
                          <span className="text-slate-400 uppercase tracking-wider text-[9px] font-black">Receipt Verification</span>
                          {renderPaidStatusBadge(book.deliveryFee)}
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Desktop Table View */}
            <div className="hidden lg:block">
              <Table className="bg-transparent shadow-none">
                <Table.ScrollContainer className="bg-transparent">
                  <Table.Content aria-label="Library Collection Table">
                    <Table.Header>
                      <Table.Column isRowHeader className="bg-slate-100 dark:bg-[#2c2f38] text-slate-700 dark:text-slate-200 font-extrabold text-sm py-4 first:rounded-l-2xl border-b border-slate-200 dark:border-gray-800 w-1/2">
                        Book Selection
                      </Table.Column>
                      <Table.Column className="bg-slate-100 dark:bg-[#2c2f38] text-slate-700 dark:text-slate-200 font-extrabold text-sm py-4 border-b border-slate-200 dark:border-gray-800">
                        Genre Tag
                      </Table.Column>
                      <Table.Column align="end" className="bg-slate-100 dark:bg-[#2c2f38] text-slate-700 dark:text-slate-200 font-extrabold text-sm py-4 last:rounded-r-2xl border-b border-slate-200 dark:border-gray-800 text-right">
                        Verification Status
                      </Table.Column>
                    </Table.Header>

                    <Table.Body>
                      {readingList.map((book, idx) => {
                        const genreClass = getGenreBadgeStyles(book.genre);

                        return (
                          <Table.Row
                            key={book._id}
                            className="hover:bg-slate-100/40 dark:hover:bg-[#2c2f38]/20 transition-all border-b border-slate-200/60 dark:border-gray-800/60 last:border-0 group"
                          >
                            <Table.Cell className="py-4">
                              <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.03, type: "spring", stiffness: 120 }}
                                className="flex items-center gap-4"
                              >
                                {book.coverImage && (
                                  <div className="relative overflow-hidden rounded-lg border border-slate-200 dark:border-gray-800 shadow-sm shrink-0">
                                    <Image
                                      src={book.coverImage}
                                      alt={book.title}
                                      width={40}
                                      height={56}
                                      className="w-10 h-14 object-cover transition-transform duration-300 group-hover:scale-105"
                                      unoptimized
                                    />
                                  </div>
                                )}
                                <div className="min-w-0">
                                  <h3 className="font-extrabold text-sm text-slate-800 dark:text-white truncate max-w-[320px]">
                                    {book.title}
                                  </h3>
                                  <p className="text-xs text-[#3d474e] dark:text-[#9ea7b3] mt-0.5">by {book.author}</p>
                                </div>
                              </motion.div>
                            </Table.Cell>

                            <Table.Cell className="py-4">
                              <span className={`inline-block px-3 py-1 rounded-xl text-xs font-extrabold uppercase tracking-wide border ${genreClass}`}>
                                {formatGenre(book.genre)}
                              </span>
                            </Table.Cell>

                            <Table.Cell className="py-4 text-right">
                              <div className="flex items-center justify-end">
                                {renderPaidStatusBadge(book.deliveryFee)}
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

export default ReadingList;