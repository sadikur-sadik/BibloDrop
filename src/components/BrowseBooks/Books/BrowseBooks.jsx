'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion } from 'motion/react';
import FilterBar from '../FilterBooks/FilterBooks';
import SearchBar from '../SearchBooks/SearchBooks';
import BooksCard from '../BooksCard/BooksCard';
import { Pagination } from '@heroui/react';

const BrowseBooks = ({ books = [], params, total, isLoading = false }) => {
  const router = useRouter();
  const pathname = usePathname();

  const [selectedCategory, setSelectedCategory] = useState(params?.category || 'All');
  const [deliveryFeeRange, setDeliveryFeeRange] = useState(params?.deliveryFee || 'All');
  const [availabilityStatus, setAvailabilityStatus] = useState(params?.availability || 'All');
  const [sortBy, setSortBy] = useState(params?.sort || 'default');
  const [page, setPage] = useState(params?.page || 1);
  const totalItems = total;
  const itemsPerPage = 12;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const [searchInput, setSearchInput] = useState(params?.search || '');
  const [debouncedSearch, setDebouncedSearch] = useState(searchInput);

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.12
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    },
  };

  const getPageNumbers = () => {
    if (totalPages <= 1) return [1];

    const pages = [];
    pages.push(1);
    if (page > 3) {
      pages.push("ellipsis");
    }
    const start = Math.max(2, page - 1);
    const end = Math.min(totalPages - 1, page + 1);
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    if (page < totalPages - 2) {
      pages.push("ellipsis");
    }
    pages.push(totalPages);
    return pages;
  };

  const startItem = (page - 1) * itemsPerPage + 1;
  const endItem = Math.min(page * itemsPerPage, totalItems);

  useEffect(() => {
    if (totalPages > 0 && page > totalPages) {
      setPage(totalPages);
    } else if (page < 1) {
      setPage(1);
    }
  }, [totalPages, page]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchInput);
    }, 400);

    return () => clearTimeout(handler);
  }, [searchInput]);

  useEffect(() => {
    setSelectedCategory(params?.category || 'All');
    setDeliveryFeeRange(params?.deliveryFee || 'All');
    setAvailabilityStatus(params?.availability || 'All');
    setSortBy(params?.sort || 'default');
    setSearchInput(params?.search || '');
  }, [params]);

  useEffect(() => {
    const sp = new URLSearchParams();

    if (debouncedSearch) {
      sp.set('search', debouncedSearch);
    }
    if (selectedCategory !== 'All') {
      sp.set('category', selectedCategory);
    }
    if (deliveryFeeRange !== 'All') {
      sp.set('deliveryFee', deliveryFeeRange);
    }
    if (availabilityStatus !== 'All') {
      sp.set('availability', availabilityStatus);
    }
    if (sortBy !== 'default') {
      sp.set('sort', sortBy);
    }
    if (page) {
      sp.set("page", page);
    }

    const queryString = sp.toString();
    const path = queryString ? `${pathname}?${queryString}` : pathname;

    if (typeof window !== 'undefined' && window.location.search !== `?${queryString}`) {
      router.push(path, { scroll: false });
    }
  }, [debouncedSearch, selectedCategory, deliveryFeeRange, availabilityStatus, sortBy, pathname, router, page]);

  const handleResetFilters = () => {
    setSearchInput('');
    setSelectedCategory('All');
    setDeliveryFeeRange('All');
    setAvailabilityStatus('All');
    setSortBy('default');
    setPage(1);
  };

  return (
    <div className="w-full min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-slate-50/50 dark:bg-[#2c2f38]/20 transition-colors duration-300 relative overflow-hidden">

      <div className="absolute right-0 top-0 w-96 h-96 bg-[#856a26]/5 dark:bg-[#ffcd00]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute left-0 bottom-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Changed whileInView to animate for reliable mounting on mobile */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-7xl mx-auto space-y-8 relative z-10"
      >

        <motion.div
          variants={itemVariants}
          className="border-b border-slate-200/80 dark:border-gray-800/80 pb-6 mb-8"
        >
          <h1 className="text-2xl font-black tracking-tight text-slate-800 dark:text-white">
            Browse Digital<span className="text-[#856a26] dark:text-[#ffcd00]"> Collection</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Explore and search dynamic library catalogs. Access book profiles, delivery ranges, and availability statuses.
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-[#192230]/40 p-5 rounded-[2rem] border border-slate-200/60 dark:border-white/5 space-y-4 shadow-sm"
        >
          <SearchBar searchQuery={searchInput} setSearchQuery={setSearchInput} />

          <FilterBar
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            deliveryFeeRange={deliveryFeeRange}
            setDeliveryFeeRange={setDeliveryFeeRange}
            availabilityStatus={availabilityStatus}
            setAvailabilityStatus={setAvailabilityStatus}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
        </motion.div>

        {isLoading ? (
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
          >
            <p className="text-slate-400 dark:text-slate-500 text-sm col-span-full py-8 text-center animate-pulse">
              Syncing catalog from database...
            </p>
          </motion.div>
        ) : (
          <>
            {(books?.length || 0) === 0 ? (
              <motion.div
                variants={itemVariants}
                className="text-center py-16 px-4 bg-white dark:bg-[#192230]/30 border border-slate-200/60 dark:border-white/5 rounded-[2.5rem] shadow-sm mb-6"
              >
                <p className="text-lg font-bold text-slate-500 dark:text-slate-400">
                  No matching books found
                </p>
                <p className="text-sm text-slate-400 dark:text-slate-500 mt-1 max-w-xs mx-auto">
                  Try modifying your search criteria or resetting the filter parameters.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="mt-5 px-6 py-2.5 rounded-full text-xs font-bold bg-[#192230] hover:bg-[#2c2f38] text-white dark:bg-[#ffcd00] dark:text-[#192230] dark:hover:bg-[#ffe066] transition-all cursor-pointer"
                >
                  Reset Filters
                </button>
              </motion.div>
            ) : (
              <motion.div
                variants={itemVariants}
                className="grid sm:grid-cols-2 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-6"
              >
                {books?.map((book) => (
                  <BooksCard key={book?._id} book={book} />
                ))}
              </motion.div>
            )}

            {(totalPages > 1 || page > 1) && (
              <motion.div variants={itemVariants}>
                <Pagination className="w-full">
                  <Pagination.Summary>
                    Showing {startItem}-{endItem} of {totalItems} results
                  </Pagination.Summary>
                  <Pagination.Content>
                    <Pagination.Item>
                      <Pagination.Previous isDisabled={page === 1} onPress={() => setPage((p) => p - 1)}>
                        <Pagination.PreviousIcon />
                        <span>Previous</span>
                      </Pagination.Previous>
                    </Pagination.Item>
                    {getPageNumbers().map((p, i) =>
                      p === "ellipsis" ? (
                        <Pagination.Item key={`ellipsis-${i}`}>
                          <Pagination.Ellipsis />
                        </Pagination.Item>
                      ) : (
                        <Pagination.Item key={p}>
                          <Pagination.Link isActive={p === page} onPress={() => setPage(p)}>
                            {p}
                          </Pagination.Link>
                        </Pagination.Item>
                      ),
                    )}
                    <Pagination.Item>
                      <Pagination.Next isDisabled={page === totalPages} onPress={() => setPage((p) => p + 1)}>
                        <span>Next</span>
                        <Pagination.NextIcon />
                      </Pagination.Next>
                    </Pagination.Item>
                  </Pagination.Content>
                </Pagination>
              </motion.div>
            )}
          </>
        )}

      </motion.div>
    </div>
  );
};

export default BrowseBooks;