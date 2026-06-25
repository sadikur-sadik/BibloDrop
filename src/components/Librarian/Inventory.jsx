'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { Table } from '@heroui/react';
import DeleteBooks from './Delete';
import EditBooks from './Edit';
import {
  Eye,
  EyeSlash,
  Lock,
  Xmark,
} from '@gravity-ui/icons';
import {
  deleteBookByLibrarian,
  togglePublishByLibrarian,
  updateBookbyLibrarian
} from '@/lib/action/action';
import { Bounce, toast } from 'react-toastify';

const Inventory = ({ books = [] }) => {
  const [localBooks, setLocalBooks] = useState(books);

  // Track active toggling operations to show loader feedback
  const [togglingId, setTogglingId] = useState(null);


  // Synchronize local state if the parent component updates the books prop
  useEffect(() => {
    setLocalBooks(books);
  }, [books]);

  // --- API CALL HANDLERS ---
 const handleTogglePublish = async (book) => {
    if (book?.currentStatus === 'pending') {
      console.warn("Unauthorized Action: Librarian cannot toggle publish status of a Pending book.");
      toast.error("Cannot publish/unpublish a pending book.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      return;
    }

    const nextPublishState = !book?.isPublished;
    const publishStatus = nextPublishState ? "publish" : "unpublish";

    // Optimistic Update
    setLocalBooks((prevBooks) =>
      prevBooks?.map((b) =>
        b?._id === book?._id ? { ...b, isPublished: nextPublishState } : b
      )
    );

    try {
      setTogglingId(book?._id);

      const res = await togglePublishByLibrarian(book?._id, publishStatus);
      
      if (res?.modifiedCount > 0) {
        toast.success(`"${book?.title}" has been successfully ${publishStatus}ed!`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      } else {
        toast.info(`No changes were made to "${book?.title}".`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      }

    } catch (error) {
      console.error("Failed to toggle publish status:", error);

      // Revert state change
      setLocalBooks((prevBooks) =>
        prevBooks?.map((b) =>
          b?._id === book?._id ? { ...b, isPublished: !nextPublishState } : b
        )
      );

      toast.error(`An error occurred while updating status for "${book?.title}".`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });

    } finally {
      setTogglingId(null);
    }
  };

 const handleUpdateBook = async (bookId, updatedData) => {
    const previousBooks = [...localBooks];

    // Optimistic Update
    setLocalBooks((prevBooks) =>
      prevBooks.map((b) => (b._id === bookId ? { ...b, ...updatedData } : b))
    );

    try {
      const res = await updateBookbyLibrarian(bookId, updatedData);
      
      if (res?.modifiedCount > 0) {
        toast.success(`"${updatedData.title || 'Book'}" updated successfully!`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      } else {
        toast.info("No modifications detected.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      }

    } catch (error) {
      console.error("Failed to update book:", error);

      // Revert state
      setLocalBooks(previousBooks);

      toast.error(`An error occurred while saving "${updatedData.title || 'Book'}".`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
  };

const handleDeleteBook = async (book) => {
    const previousBooks = [...localBooks];

    // Optimistic Update
    setLocalBooks((prevBooks) => prevBooks?.filter((b) => b?._id !== book?._id) || []);

    try {
      const res = await deleteBookByLibrarian(book?._id);

      if (res?.deletedCount > 0) {
        toast.info(`"${book?.title}" was deleted from inventory.`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      } else {
        toast.error(`Failed to delete "${book?.title}".`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
        setLocalBooks(previousBooks);
      }

    } catch (error) {
      console.error("Failed to delete book:", error);

      // Revert state
      setLocalBooks(previousBooks);

      toast.error(`An error occurred while trying to delete "${book?.title}".`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
  };
  // Approval Status Badge helper
  const getStatusBadge = (book) => {
    if (book?.currentStatus === 'pending') {
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
    if (book?.isPublished) {
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
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.15 }
    }
  };


  return (
    <div className="relative w-full bg-transparent text-[#192230] dark:text-white transition-colors duration-300 space-y-6">

  
      {/* ========================================================
          HEADER SECTION (Adapted to your component context)
          ======================================================== */}
      <div className="border-b border-slate-200/80 dark:border-gray-800/80 pb-6 mb-8">
        <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }} className="text-2xl font-black tracking-tight text-slate-800 dark:text-white">
          Librarian Control<span className="text-[#856a26] dark:text-[#ffcd00]"> Center</span>
        </motion.h1>
        <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }} className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Manage your collection with precision. Publish, unpublish, and curate digital inventory.
        </motion.p>
      </div>

      {/* ========================================================
          QUEUE CONTENT
          ======================================================== */}
      <div className="relative w-full">
        {localBooks.length === 0 ? (
          <div className="text-center py-16 bg-slate-100/40 dark:bg-[#2c2f38]/10 border border-slate-200/80 dark:border-gray-800/60 rounded-3xl max-w-md mx-auto space-y-2">
            <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }} className="text-sm font-bold text-slate-500 dark:text-slate-400">
              No books registered in the system.
            </motion.p>
            <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }} className="text-xs text-slate-400 dark:text-slate-500">
              There are currently no items matching your catalog registry.
            </motion.p>
          </div>
        ) : (
          <>
            {/* Mobile Layout: Responsive Metadata Grid Cards */}
            <div className="block lg:hidden">
              <AnimatePresence mode="popLayout">
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="space-y-4"
                >
                  {localBooks?.map((book) => {
                    const statusBadge = getStatusBadge(book);
                    const visBadge = getVisibilityBadge(book);
                    const isToggling = togglingId === book?._id;

                    return (
                      <motion.div
                        layout
                        variants={itemVariants}
                        key={book?._id}
                        className="p-5 rounded-2xl border border-slate-200/80 dark:border-gray-800/80 bg-white/40 dark:bg-[#2c2f38]/20 backdrop-blur-md space-y-4"
                      >
                        <div className="flex items-center gap-4">
                          {book?.coverImage && (
                            <Image
                              src={book?.coverImage}
                              alt={book?.title}
                              width={64}
                              height={80}
                              className="w-16 h-20 object-cover rounded-lg shadow-sm"
                              unoptimized
                            />
                          )}
                          <div>
                            <h4 className="font-extrabold text-sm leading-tight">{book?.title}</h4>
                            <p className="text-xs text-[#3d474e] dark:text-[#9ea7b3] mt-0.5">{book?.author}</p>
                            <span className="inline-block px-2 py-0.5 mt-2 rounded text-[10px] uppercase font-bold tracking-wider bg-slate-200/60 dark:bg-[#3d474e]/50 text-slate-600 dark:text-slate-300">
                              {book?.genre}
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
                            <p className="text-sm font-bold">{book?.quantity || '0'}</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-200/60 dark:border-gray-800/60">
                          {/* Publish/Unpublish Action */}
                          <motion.button
                            whileTap={book?.currentStatus !== 'pending' && !isToggling ? { scale: 0.95 } : {}}
                            onClick={() => handleTogglePublish(book)}
                            disabled={book?.currentStatus === 'pending' || isToggling}
                            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${book?.currentStatus === 'pending'
                                ? 'bg-slate-200/40 text-slate-400 dark:bg-[#3d474e]/20 dark:text-[#9ea7b3]/40 cursor-not-allowed opacity-50'
                                : isToggling
                                  ? 'bg-slate-300 text-slate-500 dark:bg-[#3d474e] dark:text-[#9ea7b3] animate-pulse cursor-wait'
                                  : book?.isPublished
                                    ? 'bg-rose-500/10 text-rose-500 hover:bg-rose-500/20'
                                    : 'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20'
                              }`}
                          >
                            {book?.currentStatus === 'pending' ? (
                              <><Lock className="w-3.5 h-3.5" /> Locked</>
                            ) : isToggling ? (
                              <>Updating...</>
                            ) : book?.isPublished ? (
                              <><EyeSlash className="w-3.5 h-3.5" /> Unpublish</>
                            ) : (
                              <><Eye className="w-3.5 h-3.5" /> Publish</>
                            )}
                          </motion.button>

                          {/* Edit Action Component (Mobile) */}
                          <EditBooks book={book} onEdit={handleUpdateBook} />

                          {/* Delete Action Component (Mobile) */}
                          <DeleteBooks book={book} onDelete={handleDeleteBook} />
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
                  <Table.Content aria-label="Inventory Table">
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
                      {localBooks?.map((book, idx) => {
                        const statusBadge = getStatusBadge(book);
                        const visBadge = getVisibilityBadge(book);
                        const isToggling = togglingId === book?._id;

                        return (
                          <Table.Row
                            key={book?._id}
                            className="hover:bg-slate-100/40 dark:hover:bg-[#2c2f38]/20 transition-colors border-b border-slate-200/60 dark:border-gray-800/60 last:border-0"
                          >
                            <Table.Cell className="py-4">
                              <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.03, type: "spring", stiffness: 120 }}
                                className="flex items-center gap-4"
                              >
                                {book?.coverImage && (
                                  <Image
                                    src={book?.coverImage}
                                    alt={book?.title}
                                    width={40}
                                    height={56}
                                    className="w-10 h-14 object-cover rounded-md shadow-sm border border-slate-200 dark:border-gray-800"
                                    unoptimized
                                  />
                                )}
                                <div>
                                  <h3 className="font-extrabold text-sm">{book?.title}</h3>
                                  <p className="text-xs text-[#3d474e] dark:text-[#9ea7b3] mt-0.5">{book?.author}</p>
                                </div>
                              </motion.div>
                            </Table.Cell>

                            <Table.Cell className="py-4">
                              <motion.span
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-slate-200/50 dark:bg-[#3d474e]/50 text-slate-600 dark:text-slate-300"
                              >
                                {book?.genre}
                              </motion.span>
                            </Table.Cell>

                            <Table.Cell className="py-4 font-bold text-sm">
                              {book?.quantity || '0'}
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

                                {/* Toggle Publish State: Disabled on pending & during active mutation */}
                                <div className="relative group">
                                  <motion.button
                                    whileHover={book?.currentStatus !== 'pending' && !isToggling ? { scale: 1.08 } : {}}
                                    whileTap={book?.currentStatus !== 'pending' && !isToggling ? { scale: 0.95 } : {}}
                                    onClick={() => handleTogglePublish(book)}
                                    disabled={book?.currentStatus === 'pending' || isToggling}
                                    className={`p-2 rounded-xl transition-colors cursor-pointer flex items-center justify-center ${book?.currentStatus === 'pending'
                                        ? 'bg-slate-200/30 text-slate-300 dark:bg-[#3d474e]/10 dark:text-slate-700 cursor-not-allowed'
                                        : isToggling
                                          ? 'bg-slate-200 text-slate-400 dark:bg-[#3d474e] dark:text-[#9ea7b3] animate-pulse cursor-wait'
                                          : book?.isPublished
                                            ? 'bg-rose-500/10 text-rose-500 hover:bg-rose-500/20'
                                            : 'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20'
                                      }`}
                                    title={book?.currentStatus === 'pending' ? 'Locked: Awaiting Admin Approval' : book?.isPublished ? 'Unpublish Book' : 'Publish Book'}
                                  >
                                    {book?.currentStatus === 'pending' ? (
                                      <Lock className="w-4 h-4" />
                                    ) : isToggling ? (
                                      <div className="w-4 h-4 rounded-full border-2 border-slate-400 border-t-transparent animate-spin" />
                                    ) : book?.isPublished ? (
                                      <EyeSlash className="w-4 h-4" />
                                    ) : (
                                      <Eye className="w-4 h-4" />
                                    )}
                                  </motion.button>

                                  {book?.currentStatus === 'pending' && (
                                    <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block w-48 p-2 rounded-lg bg-[#192230] dark:bg-white text-white dark:text-[#192230] text-[10px] font-bold text-center shadow-lg pointer-events-none z-20">
                                      Publishing power disabled while "Pending Approval"
                                    </div>
                                  )}
                                </div>

                                {/* Edit Action Component */}
                                <EditBooks book={book} onEdit={handleUpdateBook} />

                                {/* Delete Action Component */}
                                <DeleteBooks book={book} onDelete={handleDeleteBook} />

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

export default Inventory;