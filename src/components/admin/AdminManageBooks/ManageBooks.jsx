'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { Table } from '@heroui/react';
import { Xmark } from '@gravity-ui/icons';
import { approveBookByAdmin, deleteBookByAdmin, togglePublishByAdmin } from '@/lib/action/action';
import PublishByAdmin from '../PublishByAdmin';
import ApproveBooks from '../AdminApprovals/ApproveBooks';
import DeletePendingBook from '../DeleteByAdmin';

const ManageBooks = ({ books = [] }) => {
  const [localBooks, setLocalBooks] = useState(books);
  const [notification, setNotification] = useState(null);

  // Sync state if books prop updates from parent
  useEffect(() => {
    setLocalBooks(books);
  }, [books]);

  // --- API Handlers with Optimistic Updates ---

  const handleToggleApproval = async (book) => {
    const previousBooks = [...localBooks];
    const isCurrentlyApproved = book.currentStatus === 'approved';
    const nextStatus = isCurrentlyApproved ? 'pending' : 'approved';

    // Optimistic Update:
    // Update currentStatus and force isPublished to false locally if reverting to pending
    setLocalBooks((prevBooks) =>
      prevBooks.map((b) =>
        b._id === book._id
          ? { 
              ...b, 
              currentStatus: nextStatus, 
              isPublished: nextStatus === 'pending' ? false : b.isPublished 
            }
          : b
      )
    );

    try {
      await approveBookByAdmin(book._id, nextStatus); 
      
      setNotification({
        type: 'success',
        title: 'Status Updated',
        message: `"${book.title}" status has been set to ${nextStatus}.`,
        targetBook: book.title
      });

      setTimeout(() => {
        setNotification((prev) => (prev && prev.targetBook === book.title ? null : prev));
      }, 4000);
    } catch (error) {
      console.error("Failed to update status:", error);
      setLocalBooks(previousBooks); // Revert on failure

      setNotification({
        type: 'error',
        title: 'Action Failed',
        message: `Could not update approval status for "${book.title}".`,
        targetBook: book.title
      });
    }
  };

  const handleDeleteBook = async (book) => {
    const previousBooks = [...localBooks];

    // Optimistically remove book from state
    setLocalBooks((prevBooks) => prevBooks.filter((b) => b._id !== book._id));

    try {
      await deleteBookByAdmin(book._id);

      setNotification({
        type: 'success',
        title: 'Book Removed',
        message: `"${book.title}" has been permanently deleted from the platform.`,
        targetBook: book.title
      });

      setTimeout(() => {
        setNotification((prev) => (prev && prev.targetBook === book.title ? null : prev));
      }, 4000);

    } catch (error) {
      console.error("Failed to delete book:", error);
      setLocalBooks(previousBooks); // Revert on failure

      setNotification({
        type: 'error',
        title: 'Action Failed',
        message: `Could not delete "${book.title}" from the platform database.`,
        targetBook: book.title
      });
    }
  };

  const handleTogglePublish = async (book) => {
    const previousBooks = [...localBooks];
    const nextPublishState = !book.isPublished;

    // Optimistically toggle publication state
    setLocalBooks((prevBooks) =>
      prevBooks.map((b) =>
        b._id === book._id ? { ...b, isPublished: nextPublishState } : b
      )
    );

    try {
      const publishState = nextPublishState === true ? "publish" : "unpublish";
      await togglePublishByAdmin(book._id, publishState);

      setNotification({
        type: 'success',
        title: 'Visibility Updated',
        message: `"${book.title}" has been successfully ${nextPublishState ? 'published' : 'unpublished'}.`,
        targetBook: book.title
      });

      setTimeout(() => {
        setNotification((prev) => (prev && prev.targetBook === book.title ? null : prev));
      }, 4000);

    } catch (error) {
      console.error("Failed to toggle publish status:", error);
      setLocalBooks(previousBooks);

      setNotification({
        type: 'error',
        title: 'Action Failed',
        message: `Could not update publication status for "${book.title}".`,
        targetBook: book.title
      });
    }
  };

  // Approval Status Badge helper
  const getStatusBadge = (book) => {
    if (book.currentStatus === 'pending') {
      return {
        text: 'Pending',
        className: 'bg-[#856a26]/10 text-[#856a26] dark:bg-[#ffcd00]/10 dark:text-[#ffcd00] border-[#856a26]/20 dark:border-[#ffcd00]/30',
        dotColor: 'bg-[#856a26] dark:bg-[#ffcd00]'
      };
    }
    return {
      text: 'Approved',
      className: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
      dotColor: 'bg-blue-500'
    };
  };

  // Visibility Status Badge helper
  const getVisibilityBadge = (book) => {
    if (book.isPublished) {
      return {
        text: 'Published',
        className: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
        dotColor: 'bg-emerald-500'
      };
    }
    return {
      text: 'Unpublished',
      className: 'bg-slate-200/50 text-slate-600 dark:bg-[#3d474e]/40 dark:text-[#9ea7b3] border-slate-300 dark:border-gray-700/60',
      dotColor: 'bg-slate-400 dark:bg-[#9ea7b3]'
    };
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.15 } }
  };

  const isSuccess = notification?.type === 'success';

  return (
    <div className="relative w-full bg-transparent text-[#192230] dark:text-white transition-colors duration-300 space-y-6">

      {/* ========================================================
          FLOATING NOTIFICATION BANNER
          ======================================================== */}
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

      {/* ========================================================
          HEADER SECTION 
          ======================================================== */}
      <div className="border-b border-slate-200/80 dark:border-gray-800/80 pb-6 mb-8">
        <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }} className="text-2xl font-black tracking-tight text-slate-800 dark:text-white">
          Manage All <span className="text-[#856a26] dark:text-[#ffcd00]">Books</span>
        </motion.h1>
        <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }} className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Platform-wide catalog registry. Review global listings, modify visibility, or permanently delete books with administrative authority.
        </motion.p>
      </div>

      {/* ========================================================
          GLOBAL CATALOG CONTENT
          ======================================================== */}
      <div className="relative w-full">
        {localBooks.length === 0 ? (
          <div className="text-center py-16 bg-slate-100/40 dark:bg-[#2c2f38]/10 border border-slate-200/80 dark:border-gray-800/60 rounded-3xl max-w-md mx-auto space-y-2">
            <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }} className="text-sm font-bold text-slate-500 dark:text-slate-400">
              No books registered in the global catalog.
            </motion.p>
            <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }} className="text-xs text-slate-400 dark:text-slate-500">
              There are currently no items matching the platform directory.
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
                  {localBooks.map((book) => {
                    const statusBadge = getStatusBadge(book);
                    const visBadge = getVisibilityBadge(book);

                    return (
                      <motion.div
                        layout
                        variants={itemVariants}
                        key={book._id}
                        className="p-5 rounded-2xl border border-slate-200/80 dark:border-gray-800/80 bg-white/40 dark:bg-[#2c2f38]/20 backdrop-blur-md space-y-4"
                      >
                        <div className="flex items-center gap-4">
                          {book.coverImage && (
                            <Image
                              src={book.coverImage}
                              alt={book.title}
                              width={64}
                              height={80}
                              className="w-16 h-20 object-cover rounded-lg shadow-sm"
                              unoptimized
                            />
                          )}
                          <div>
                            <h4 className="font-extrabold text-sm leading-tight">{book.title}</h4>
                            <p className="text-xs text-[#3d474e] dark:text-[#9ea7b3] mt-0.5">{book.author}</p>
                            <span className="inline-block px-2 py-0.5 mt-2 rounded text-[10px] uppercase font-bold tracking-wider bg-slate-200/60 dark:bg-[#3d474e]/50 text-slate-600 dark:text-slate-300">
                              {book.genre}
                            </span>
                          </div>
                        </div>

                        {/* Responsive Metadata Grid Layout */}
                        <div className="grid grid-cols-2 gap-y-3 gap-x-4 pt-3 border-t border-slate-200/60 dark:border-gray-800/60 text-xs">
                          <div className="space-y-1">
                            <span className="text-slate-400 uppercase tracking-wider text-[10px] font-extrabold block">Approval Status</span>
                            <span className={`inline-flex items-center gap-1.5 w-auto px-2.5 py-1 rounded-full text-xs font-semibold border ${statusBadge.className}`}>
                              <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${statusBadge.dotColor}`} />
                              <span className="truncate">{statusBadge.text}</span>
                            </span>
                          </div>

                          <div className="space-y-1">
                            <span className="text-slate-400 uppercase tracking-wider text-[10px] font-extrabold block">Visibility Status</span>
                            <span className={`inline-flex items-center gap-1.5 w-auto px-2.5 py-1 rounded-full text-xs font-semibold border ${visBadge.className}`}>
                              <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${visBadge.dotColor}`} />
                              <span className="truncate">{visBadge.text}</span>
                            </span>
                          </div>

                          <div className="col-span-2 flex justify-between items-center pt-1 border-t border-slate-100 dark:border-gray-800/40">
                            <span className="text-slate-400 uppercase tracking-wider text-[10px] font-extrabold">Quantity</span>
                            <p className="text-sm font-bold">{book.quantity || '0'}</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200/60 dark:border-gray-800/60">
                          <PublishByAdmin book={book} onTogglePublish={handleTogglePublish} />
                          <DeletePendingBook book={book} onDelete={handleDeleteBook} />
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
                  <Table.Content aria-label="Global Catalog Management Table">
                    <Table.Header>
                      <Table.Column isRowHeader className="bg-slate-100 dark:bg-[#2c2f38] text-slate-700 dark:text-slate-200 font-extrabold text-sm py-4 first:rounded-l-2xl last:rounded-r-2xl border-b border-slate-200 dark:border-gray-800">
                        Book Details
                      </Table.Column>
                      <Table.Column className="bg-slate-100 dark:bg-[#2c2f38] text-slate-700 dark:text-slate-200 font-extrabold text-sm py-4 border-b border-slate-200 dark:border-gray-800">
                        Genre
                      </Table.Column>
                      <Table.Column className="bg-slate-100 dark:bg-[#2c2f38] text-slate-700 dark:text-slate-200 font-extrabold text-sm py-4 border-b border-slate-200 dark:border-gray-800">
                        Quantity
                      </Table.Column>
                      <Table.Column className="bg-slate-100 dark:bg-[#2c2f38] text-slate-700 dark:text-slate-200 font-extrabold text-sm py-4 border-b border-slate-200 dark:border-gray-800">
                        Approval Status
                      </Table.Column>
                      <Table.Column className="bg-slate-100 dark:bg-[#2c2f38] text-slate-700 dark:text-slate-200 font-extrabold text-sm py-4 border-b border-slate-200 dark:border-gray-800">
                        Visibility
                      </Table.Column>
                      <Table.Column align="end" className="bg-slate-100 dark:bg-[#2c2f38] text-slate-700 dark:text-slate-200 font-extrabold text-sm py-4 first:rounded-l-2xl last:rounded-r-2xl border-b border-slate-200 dark:border-gray-800 text-right">
                        Actions
                      </Table.Column>
                    </Table.Header>

                    <Table.Body>
                      {localBooks.map((book, idx) => {
                        const statusBadge = getStatusBadge(book);
                        const visBadge = getVisibilityBadge(book);

                        return (
                          <Table.Row
                            key={book._id}
                            className="hover:bg-slate-100/40 dark:hover:bg-[#2c2f38]/20 transition-colors border-b border-slate-200/60 dark:border-gray-800/60 last:border-0"
                          >
                            <Table.Cell className="py-4">
                              <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.03, type: "spring", stiffness: 120 }}
                                className="flex items-center gap-4"
                              >
                                {book.coverImage && (
                                  <Image
                                    src={book.coverImage}
                                    alt={book.title}
                                    width={40}
                                    height={56}
                                    className="w-10 h-14 object-cover rounded-md shadow-sm border border-slate-200 dark:border-gray-800"
                                    unoptimized
                                  />
                                )}
                                <div>
                                  <h3 className="font-extrabold text-sm">{book.title}</h3>
                                  <p className="text-xs text-[#3d474e] dark:text-[#9ea7b3] mt-0.5">{book.author}</p>
                                </div>
                              </motion.div>
                            </Table.Cell>

                            <Table.Cell className="py-4">
                              <motion.span
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-slate-200/50 dark:bg-[#3d474e]/50 text-slate-600 dark:text-slate-300"
                              >
                                {book.genre}
                              </motion.span>
                            </Table.Cell>

                            <Table.Cell className="py-4 font-bold text-sm">
                              {book.quantity || '0'}
                            </Table.Cell>

                            {/* Column 4: Approval Status */}
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

                            {/* Column 5: Visibility */}
                            <Table.Cell className="py-4">
                              <motion.span
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className={`inline-flex items-center gap-1.5 w-auto px-3 py-1 rounded-full text-xs font-bold border ${visBadge.className}`}
                              >
                                <span className={`w-2 h-2 rounded-full shrink-0 ${visBadge.dotColor}`} />
                                <span className="truncate">{visBadge.text}</span>
                              </motion.span>
                            </Table.Cell>

                            {/* Column 6: Actions */}
                            <Table.Cell className="py-4 text-right">
                              <div className="flex items-center justify-end gap-2.5">
                                <PublishByAdmin book={book} onTogglePublish={handleTogglePublish} />
                                <DeletePendingBook book={book} onDelete={handleDeleteBook} />
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

export default ManageBooks;