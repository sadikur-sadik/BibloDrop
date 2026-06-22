'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import FilterBar from '../FilterBooks/FilterBooks';
import SearchBar from '../SearchBooks/SearchBooks';
import BooksCard from '../BooksCard/BooksCard';

const BrowseBooks = ({ books = [],  params ,isLoading = false}) => {
  const router = useRouter();
  const pathname = usePathname();
  console.log(params);

  // 1. Initialize states directly from params (matching reference pattern)
  const [selectedCategory, setSelectedCategory] = useState(params?.category || 'All');
  const [deliveryFeeRange, setDeliveryFeeRange] = useState(params?.deliveryFee || 'All');
  const [availabilityStatus, setAvailabilityStatus] = useState(params?.availability || 'All');
  const [sortBy, setSortBy] = useState(params?.sort || 'default');
  
  // Local state for immediate, lag-free keystroke typing
  const [searchInput, setSearchInput] = useState(params?.search || '');
  // Debounced search state used for routing
  const [debouncedSearch, setDebouncedSearch] = useState(searchInput);

  // 2. Debounce effect to delay router updates during active typing
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchInput);
    }, 400); // 400ms delay

    return () => clearTimeout(handler);
  }, [searchInput]);

  // 3. Sync local states with dynamic params changes (e.g., Back/Forward browser navigation)
  useEffect(() => {
    setSelectedCategory(params?.category || 'All');
    setDeliveryFeeRange(params?.deliveryFee || 'All');
    setAvailabilityStatus(params?.availability || 'All');
    setSortBy(params?.sort || 'default');
    setSearchInput(params?.search || '');
  }, [params]);

  // 4. Update the URL via Next.js Router whenever debounced state or filters change
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

    const queryString = sp.toString();
    const path = queryString ? `${pathname}?${queryString}` : pathname;

    // Guard clause to prevent redundant pushes to the same location
    if (typeof window !== 'undefined' && window.location.search !== `?${queryString}`) {
      router.push(path, { scroll: false });
    }
  }, [debouncedSearch, selectedCategory, deliveryFeeRange, availabilityStatus, sortBy, pathname, router]);

  const handleResetFilters = () => {
    setSearchInput('');
    setSelectedCategory('All');
    setDeliveryFeeRange('All');
    setAvailabilityStatus('All');
    setSortBy('default');
  };

  return (
    <div className="w-full min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-slate-50/50 dark:bg-[#2c2f38]/20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Title Section */}
        <div className="border-b border-slate-200/80 dark:border-gray-800/80 pb-6 mb-8">
          <h1 className="text-2xl font-black tracking-tight text-slate-800 dark:text-white">
            Browse <span className="text-[#856a26] dark:text-[#ffcd00]">Digital</span> Collection
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Explore and search dynamic library catalogs. Access book profiles, delivery ranges, and availability statuses.
          </p>
        </div>

        {/* Searching & Filtering Controls Group */}
        <div className="bg-white dark:bg-[#192230]/40 p-5 rounded-[2rem] border border-slate-200/60 dark:border-white/5 space-y-4 shadow-sm">
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
        </div>

        {/* Dynamic List Section - Receives backend filtered collection data */}
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            <p className="text-slate-400 dark:text-slate-500 text-sm col-span-full py-8 text-center animate-pulse">
              Syncing catalog from database...
            </p>
          </div>
        ) : books.length === 0 ? (
          <div className="text-center py-16 px-4 bg-white dark:bg-[#192230]/30 border border-slate-200/60 dark:border-white/5 rounded-[2.5rem] shadow-sm">
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
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {books.map((book) => (
              <BooksCard key={book._id} book={book} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default BrowseBooks;