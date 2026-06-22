'use client';

import React from 'react';
import { Magnifier } from '@gravity-ui/icons';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Magnifier className="w-5 h-5 text-slate-400 dark:text-slate-500" />
      </div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search books by title or author..."
        className="w-full pl-12 pr-4 py-4 rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#192230] text-[#192230] dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:ring-2 focus:ring-[#192230] dark:focus:ring-[#ffcd00] transition-all duration-200 text-sm shadow-sm"
      />
    </div>
  );
};

export default SearchBar;