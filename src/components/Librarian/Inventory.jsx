'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Table } from '@heroui/react';
import { 
  Pencil, 
  TrashBin, 
  Eye, 
  EyeSlash, 
  Check, 
  Lock,
  Xmark, // Imported to close notifications
} from '@gravity-ui/icons';
import { deleteBookbyLibrarian, togglePublish } from '@/lib/action/action';

const Inventory = ({ books = [] }) => {
  // Local state initialized with the books prop to enable dynamic updates without reload
  const [localBooks, setLocalBooks] = useState(books);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Track active toggling operations to show loader feedback
  const [togglingId, setTogglingId] = useState(null);

  // State to manage success or error notifications
  const [notification, setNotification] = useState(null);

  // Synchronize local state if the parent component updates the books prop
  useEffect(() => {
    setLocalBooks(books);
  }, [books]);

  // --- API CALL HANDLERS ---
  const handleTogglePublish = async (book) => {
    if (book.currentStatus === 'pending') {
      console.warn("Unauthorized Action: Librarian cannot toggle publish status of a Pending book.");
      return;
    }

    const nextPublishState = !book.isPublished;
    const publishStatus = nextPublishState ? "publish" : "unpublish";

    // 1. Optimistic Update: Update state instantly before the network call resolves
    setLocalBooks((prevBooks) =>
      prevBooks.map((b) =>
        b._id === book._id ? { ...b, isPublished: nextPublishState } : b
      )
    );

    try {
      setTogglingId(book._id);

      await togglePublish(book._id, publishStatus);

      // 2. Success Feedback
      setNotification({
        type: 'success',
        title: nextPublishState ? 'Book Published' : 'Book Unpublished',
        message: `"${book.title}" has been successfully ${nextPublishState ? 'published' : 'unpublished'}.`,
      });

      // Automatically hide the message after 4 seconds
      setTimeout(() => {
        setNotification((prev) => {
          if (prev && prev.message.includes(book.title)) {
            return null;
          }
          return prev;
        });
      }, 4000);
      
    } catch (error) {
      console.error("Failed to toggle publish status:", error);

      // 3. Revert state change if the network request fails
      setLocalBooks((prevBooks) =>
        prevBooks.map((b) =>
          b._id === book._id ? { ...b, isPublished: !nextPublishState } : b
        )
      );

      // Error Feedback
      setNotification({
        type: 'error',
        title: 'Action Failed',
        message: `Failed to update publication status for "${book.title}". Please try again.`,
      });
    } finally {
      setTogglingId(null);
    }
  };

  const handleEditBook = (book) => {
    console.log("%c[ACTION REQUIRED] Edit Book Triggered", "color: #3d474e; font-weight: bold;");
    console.log(`Target ID: ${book._id}`);
    console.log("Current Data payload to populate state/inputs:", book);
  };

  const handleDeleteBook = async(bookId) => {
    await deleteBookbyLibrarian(bookId)
  };

  // --- Filters and Searches ---
  // Now uses localBooks instead of the books prop
  const filteredBooks = useMemo(() => {
    return localBooks.filter((book) => {
      const matchesSearch = 
        book.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.genre?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = 
        statusFilter === 'all' ||
        (statusFilter === 'pending' && book.currentStatus === 'pending') ||
        (statusFilter === 'published' && book.currentStatus !== 'pending' && book.isPublished) ||
        (statusFilter === 'unpublished' && book.currentStatus !== 'pending' && !book.isPublished);

      return matchesSearch && matchesStatus;
    });
  }, [localBooks, searchTerm, statusFilter]);

  // Helper to determine status presentation
  const getStatusBadge = (book) => {
    if (book.currentStatus === 'pending') {
      return {
        text: 'Pending Approval',
        className: 'bg-[#856a26]/10 text-[#856a26] dark:bg-[#ffcd00]/10 dark:text-[#ffcd00] border-[#856a26]/20 dark:border-[#ffcd00]/30',
        dotColor: 'bg-[#856a26] dark:bg-[#ffcd00]'
      };
    }
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
              className={`pointer-events-auto w-full p-4 rounded-2xl backdrop-blur-md border shadow-xl flex items-start justify-between gap-3 ${
                notification.type === 'success'
                  ? 'bg-white/95 dark:bg-[#192230]/95 border-emerald-500/25 dark:border-emerald-500/20 text-emerald-800 dark:text-emerald-300'
                  : 'bg-white/95 dark:bg-[#192230]/95 border-rose-500/25 dark:border-rose-500/20 text-rose-800 dark:text-rose-300'
              }`}
            >
              <div className="flex items-start gap-3 min-w-0">
                <div className={`flex items-center justify-center w-6 h-6 rounded-full shrink-0 text-sm font-bold ${
                  notification.type === 'success'
                    ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                    : 'bg-rose-500/20 text-rose-600 dark:text-rose-400'
                }`}>
                  {notification.type === 'success' ? '✓' : '!'}
                </div>
                <div className="min-w-0">
                  <h4 className={`text-sm font-black tracking-tight ${
                    notification.type === 'success' ? 'text-emerald-800 dark:text-emerald-400' : 'text-rose-800 dark:text-rose-400'
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

      {/* Search and Filters Segment */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-3xl bg-slate-100/60 dark:bg-[#2c2f38]/60 border border-slate-200/80 dark:border-gray-800/80 backdrop-blur-md">
        
        {/* Search Field */}
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search title, author, or genre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-5 py-3 pl-12 rounded-2xl text-sm outline-hidden border border-slate-200 dark:border-gray-700/50 bg-white dark:bg-[#192230] focus:border-[#856a26] dark:focus:border-[#ffcd00] transition-all"
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </span>
        </div>

        {/* Tab Filters with Sliding active indicator */}
        <div className="flex flex-wrap gap-2 relative bg-slate-200/40 dark:bg-[#192230]/40 p-1.5 rounded-2xl border border-slate-200/60 dark:border-gray-800">
          {['all', 'pending', 'published', 'unpublished'].map((filter) => {
            const isActive = statusFilter === filter;
            return (
              <button
                key={filter}
                onClick={() => setStatusFilter(filter)}
                className={`relative px-4 py-2 rounded-xl text-xs font-bold capitalize transition-colors duration-200 cursor-pointer z-10 ${
                  isActive 
                    ? 'text-white dark:text-[#192230]' 
                    : 'text-slate-600 dark:text-[#9ea7b3] hover:text-slate-800 dark:hover:text-white'
                }`}
              >
                <span>{filter === 'pending' ? 'Pending Approval' : filter}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute inset-0 bg-[#192230] dark:bg-[#ffcd00] rounded-xl -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Table Container */}
      <div className="relative w-full">
        
        {/* Mobile View: Animated Cards Layout */}
        <div className="block lg:hidden">
          <AnimatePresence mode="popLayout">
            {filteredBooks.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-12 bg-white/40 dark:bg-[#2c2f38]/20 border border-slate-200/80 dark:border-gray-800 rounded-2xl"
              >
                <p className="text-sm text-slate-500 dark:text-slate-400">No matching books found in inventory.</p>
              </motion.div>
            ) : (
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="space-y-4"
              >
                {filteredBooks.map((book) => {
                  const status = getStatusBadge(book);
                  const isToggling = togglingId === book._id;
                  
                  return (
                    <motion.div 
                      layout
                      variants={itemVariants}
                      key={book._id}
                      className="p-5 rounded-2xl border border-slate-200/80 dark:border-gray-800/80 bg-white/40 dark:bg-[#2c2f38]/20 backdrop-blur-md space-y-4"
                    >
                      <div className="flex items-center gap-4">
                        {book.coverImage && (
                          <img 
                            src={book.coverImage} 
                            alt={book.title} 
                            className="w-16 h-20 object-cover rounded-lg shadow-sm"
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

                      <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 dark:border-gray-800/60">
                        <div className="space-y-1">
                          <p className="text-[10px] text-slate-400 uppercase tracking-wider">Status</p>
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${status.className}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${status.dotColor}`} />
                            {status.text}
                          </span>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-[10px] text-slate-400 uppercase tracking-wider">Qty</p>
                          <p className="text-sm font-bold">{book.quantity || '0'}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-200/60 dark:border-gray-800/60">
                        {/* Publish/Unpublish Action */}
                        <motion.button
                          whileTap={book.currentStatus !== 'pending' && !isToggling ? { scale: 0.95 } : {}}
                          onClick={() => handleTogglePublish(book)}
                          disabled={book.currentStatus === 'pending' || isToggling}
                          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            book.currentStatus === 'pending'
                              ? 'bg-slate-200/40 text-slate-400 dark:bg-[#3d474e]/20 dark:text-[#9ea7b3]/40 cursor-not-allowed opacity-50'
                              : isToggling 
                              ? 'bg-slate-300 text-slate-500 dark:bg-[#3d474e] dark:text-[#9ea7b3] animate-pulse cursor-wait'
                              : book.isPublished
                              ? 'bg-rose-500/10 text-rose-500 hover:bg-rose-500/20'
                              : 'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20'
                          }`}
                        >
                          {book.currentStatus === 'pending' ? (
                            <><Lock className="w-3.5 h-3.5" /> Locked</>
                          ) : isToggling ? (
                            <>Updating...</>
                          ) : book.isPublished ? (
                            <><EyeSlash className="w-3.5 h-3.5" /> Unpublish</>
                          ) : (
                            <><Eye className="w-3.5 h-3.5" /> Publish</>
                          )}
                        </motion.button>

                        {/* Edit Action */}
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleEditBook(book)}
                          className="p-2 rounded-xl bg-slate-200/60 hover:bg-slate-200 dark:bg-[#3d474e]/40 dark:hover:bg-[#3d474e]/60 text-slate-600 dark:text-slate-300 cursor-pointer"
                        >
                          <Pencil className="w-4 h-4" />
                        </motion.button>

                        {/* Delete Action */}
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleDeleteBook(book._id)}
                          className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 cursor-pointer"
                        >
                          <TrashBin className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Large View: Hero UI Table with Framer Motion Elements */}
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
                    Status
                  </Table.Column>
                  <Table.Column align="end" className="bg-slate-100 dark:bg-[#2c2f38] text-slate-700 dark:text-slate-200 font-extrabold text-sm py-4 first:rounded-l-2xl last:rounded-r-2xl border-b border-slate-200 dark:border-gray-800 text-right">
                    Actions
                  </Table.Column>
                </Table.Header>
                
                {/* Wrapped Table Body with AnimatePresence */}
                <Table.Body>
                  {filteredBooks.length === 0 ? (
                    <Table.Row>
                      <Table.Cell className="text-center py-10 text-slate-400 dark:text-slate-500">
                        No matches found.
                      </Table.Cell>
                      <Table.Cell className="hidden">-</Table.Cell>
                      <Table.Cell className="hidden">-</Table.Cell>
                      <Table.Cell className="hidden">-</Table.Cell>
                      <Table.Cell className="hidden">-</Table.Cell>
                    </Table.Row>
                  ) : (
                    filteredBooks.map((book, idx) => {
                      const status = getStatusBadge(book);
                      const isToggling = togglingId === book._id;
                      
                      return (
                        <Table.Row 
                          key={book._id}
                          className="hover:bg-slate-100/40 dark:hover:bg-[#2c2f38]/20 transition-colors border-b border-slate-200/60 dark:border-gray-800/60 last:border-0"
                        >
                          {/* Rich Book/Author Column with subtle enter effect */}
                          <Table.Cell className="py-4">
                            <motion.div 
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.03, type: "spring", stiffness: 120 }}
                              className="flex items-center gap-4"
                            >
                              {book.coverImage && (
                                <img 
                                  src={book.coverImage} 
                                  alt={book.title} 
                                  className="w-10 h-14 object-cover rounded-md shadow-sm border border-slate-200 dark:border-gray-800"
                                />
                              )}
                              <div>
                                <h3 className="font-extrabold text-sm">{book.title}</h3>
                                <p className="text-xs text-[#3d474e] dark:text-[#9ea7b3] mt-0.5">{book.author}</p>
                              </div>
                            </motion.div>
                          </Table.Cell>

                          {/* Genre Column */}
                          <Table.Cell className="py-4">
                            <motion.span 
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-slate-200/50 dark:bg-[#3d474e]/50 text-slate-600 dark:text-slate-300"
                            >
                              {book.genre}
                            </motion.span>
                          </Table.Cell>

                          {/* Quantity Column */}
                          <Table.Cell className="py-4 font-bold text-sm">
                            {book.quantity || '0'}
                          </Table.Cell>

                          {/* Status Badge Column */}
                          <Table.Cell className="py-4">
                            <motion.span 
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${status.className}`}
                            >
                              <span className={`w-2 h-2 rounded-full ${status.dotColor}`} />
                              {status.text}
                            </motion.span>
                          </Table.Cell>

                          {/* Interactive Action Column */}
                          <Table.Cell className="py-4 text-right">
                            <div className="flex items-center justify-end gap-2.5">
                              
                              {/* Toggle Publish State: Disabled on pending & during active mutation */}
                              <div className="relative group">
                                <motion.button
                                  whileHover={book.currentStatus !== 'pending' && !isToggling ? { scale: 1.08 } : {}}
                                  whileTap={book.currentStatus !== 'pending' && !isToggling ? { scale: 0.95 } : {}}
                                  onClick={() => handleTogglePublish(book)}
                                  disabled={book.currentStatus === 'pending' || isToggling}
                                  className={`p-2 rounded-xl transition-colors cursor-pointer ${
                                    book.currentStatus === 'pending'
                                      ? 'bg-slate-200/30 text-slate-300 dark:bg-[#3d474e]/10 dark:text-slate-700 cursor-not-allowed'
                                      : isToggling 
                                      ? 'bg-slate-200 text-slate-400 dark:bg-[#3d474e] dark:text-[#9ea7b3] animate-pulse cursor-wait'
                                      : book.isPublished
                                      ? 'bg-rose-500/10 text-rose-500 hover:bg-rose-500/20'
                                      : 'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20'
                                  }`}
                                  title={book.currentStatus === 'pending' ? 'Locked: Awaiting Admin Approval' : book.isPublished ? 'Unpublish Book' : 'Publish Book'}
                                >
                                  {book.currentStatus === 'pending' ? (
                                    <Lock className="w-4 h-4" />
                                  ) : isToggling ? (
                                    <div className="w-4 h-4 rounded-full border-2 border-slate-400 border-t-transparent animate-spin" />
                                  ) : book.isPublished ? (
                                    <EyeSlash className="w-4 h-4" />
                                  ) : (
                                    <Eye className="w-4 h-4" />
                                  )}
                                </motion.button>
                                
                                {book.currentStatus === 'pending' && (
                                  <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block w-48 p-2 rounded-lg bg-[#192230] dark:bg-white text-white dark:text-[#192230] text-[10px] font-bold text-center shadow-lg pointer-events-none z-20">
                                    Publishing power disabled while "Pending Approval"
                                  </div>
                                )}
                              </div>

                              {/* Edit Action Button */}
                              <motion.button
                                whileHover={{ scale: 1.08 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleEditBook(book)}
                                className="p-2 rounded-xl bg-slate-200/60 hover:bg-slate-200 dark:bg-[#3d474e]/40 dark:hover:bg-[#3d474e]/60 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
                                title="Edit Book"
                              >
                                <Pencil className="w-4 h-4" />
                              </motion.button>

                              {/* Delete Action Button */}
                              <motion.button
                                whileHover={{ scale: 1.08 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleDeleteBook(book._id, book.title)}
                                className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 transition-colors cursor-pointer"
                                title="Delete Book"
                              >
                                <TrashBin className="w-4 h-4" />
                              </motion.button>

                            </div>
                          </Table.Cell>
                        </Table.Row>
                      );
                    })
                  )}
                </Table.Body>
              </Table.Content>
            </Table.ScrollContainer>
            <Table.Footer className="hidden" />
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Inventory;