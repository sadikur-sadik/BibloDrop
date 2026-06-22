'use client';

import { Dropdown, Label } from '@heroui/react';
import React from 'react';

const GENRES = [
  { id: "fiction", name: "Fiction" },
  { id: "non-fiction", name: "Non-Fiction" },
  { id: "sci-fi", name: "Science Fiction" },
  { id: "fantasy", name: "Fantasy" },
  { id: "mystery-thriller", name: "Mystery & Thriller" },
  { id: "biography-memoir", name: "Biography & Memoir" },
  { id: "history", name: "History" },
  { id: "religion-spirituality", name: "Religion & Spirituality" },
  { id: "science-tech", name: "Science & Technology" },
  { id: "self-help", name: "Self-Help" },
  { id: "business-finance", name: "Business & Finance" },
  { id: "poetry", name: "Poetry" },
  { id: "classics", name: "Classics" },
];

const DELIVERY_FEES = [
  { id: "All", name: "All Delivery Fees" },
  { id: "under-5", name: "Under $5.00" },
  { id: "5-10", name: "$5.00 - $10.00" },
  { id: "10-over", name: "Over $10.00" },
];

const AVAILABILITY_OPTIONS = [
  { id: "All", name: "All Availability" },
  { id: "available", name: "Available Now" },
  { id: "unavailable", name: "Unavailable" },
];

const SORT_OPTIONS = [
  { id: "default", name: "Sort: Default" },
  { id: "az", name: "Title: A to Z" },
  { id: "za", name: "Title: Z to A" },
  { id: "newest", name: "Newest Releases" },
];

const FilterBar = ({
  selectedCategory,
  setSelectedCategory,
  deliveryFeeRange,
  setDeliveryFeeRange,
  availabilityStatus,
  setAvailabilityStatus,
  sortBy,
  setSortBy,
}) => {
  const triggerClass = "flex justify-between items-center w-full px-4 py-3.5 rounded-2xl border border-slate-200/60 dark:border-white/10 bg-white dark:bg-[#192230] hover:bg-slate-50 dark:hover:bg-[#1e2330] text-[#192230] dark:text-white outline-none focus:ring-2 focus:ring-[#192230] dark:focus:ring-[#ffcd00] transition-all duration-200 text-xs font-semibold cursor-pointer shadow-sm h-auto min-w-0";

  const getItemClass = (isSelected) => 
    `w-full text-left px-3 py-2 text-xs font-bold transition-colors cursor-pointer rounded-xl ${
      isSelected
        ? 'bg-slate-100 dark:bg-[#2c2f38] text-[#856a26] dark:text-[#ffcd00]'
        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#252a35]'
    }`;

  const categoryOptions = [{ id: "All", name: "All Categories" }, ...GENRES];

  const activeCategoryLabel = categoryOptions.find(cat => cat.id === selectedCategory)?.name || "All Categories";
  const activeDeliveryFeeLabel = DELIVERY_FEES.find(fee => fee.id === deliveryFeeRange)?.name || "All Delivery Fees";
  const activeAvailabilityLabel = AVAILABILITY_OPTIONS.find(status => status.id === availabilityStatus)?.name || "All Availability";
  const activeSortLabel = SORT_OPTIONS.find(sort => sort.id === sortBy)?.name || "Sort: Default";

  const ChevronIcon = () => (
    <svg
      className="w-3.5 h-3.5 text-slate-500 transition-transform duration-200"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );

  const ActiveCheckIcon = () => (
    <svg className="w-3.5 h-3.5 text-current" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      
      {/* Category Filter */}
      <Dropdown>
        <Dropdown.Trigger className={triggerClass}>
          <span>{activeCategoryLabel}</span>
          <ChevronIcon />
        </Dropdown.Trigger>
        <Dropdown.Popover className="w-56 max-h-64 overflow-y-auto rounded-2xl border border-slate-200/80 dark:border-gray-800/80 bg-white/95 dark:bg-[#192230]/95 backdrop-blur-md shadow-xl py-1 z-50">
          <Dropdown.Menu onAction={(key) => setSelectedCategory(String(key))}>
            {categoryOptions.map((cat) => (
              <Dropdown.Item
                id={cat.id}
                key={cat.id}
                textValue={cat.name}
                className={getItemClass(selectedCategory === cat.id)}
              >
                <div className="flex items-center justify-between w-full">
                  <Label className="capitalize">{cat.name}</Label>
                  {selectedCategory === cat.id && <ActiveCheckIcon />}
                </div>
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown.Popover>
      </Dropdown>

      {/* Delivery Fee Filter */}
      <Dropdown>
        <Dropdown.Trigger className={triggerClass}>
          <span>{activeDeliveryFeeLabel}</span>
          <ChevronIcon />
        </Dropdown.Trigger>
        <Dropdown.Popover className="w-56 rounded-2xl border border-slate-200/80 dark:border-gray-800/80 bg-white/95 dark:bg-[#192230]/95 backdrop-blur-md shadow-xl py-1 z-50">
          <Dropdown.Menu onAction={(key) => setDeliveryFeeRange(String(key))}>
            {DELIVERY_FEES.map((fee) => (
              <Dropdown.Item
                id={fee.id}
                key={fee.id}
                textValue={fee.name}
                className={getItemClass(deliveryFeeRange === fee.id)}
              >
                <div className="flex items-center justify-between w-full">
                  <Label className="capitalize">{fee.name}</Label>
                  {deliveryFeeRange === fee.id && <ActiveCheckIcon />}
                </div>
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown.Popover>
      </Dropdown>

      {/* Availability Status Filter */}
      <Dropdown>
        <Dropdown.Trigger className={triggerClass}>
          <span>{activeAvailabilityLabel}</span>
          <ChevronIcon />
        </Dropdown.Trigger>
        <Dropdown.Popover className="w-56 rounded-2xl border border-slate-200/80 dark:border-gray-800/80 bg-white/95 dark:bg-[#192230]/95 backdrop-blur-md shadow-xl py-1 z-50">
          <Dropdown.Menu onAction={(key) => setAvailabilityStatus(String(key))}>
            {AVAILABILITY_OPTIONS.map((status) => (
              <Dropdown.Item
                id={status.id}
                key={status.id}
                textValue={status.name}
                className={getItemClass(availabilityStatus === status.id)}
              >
                <div className="flex items-center justify-between w-full">
                  <Label className="capitalize">{status.name}</Label>
                  {availabilityStatus === status.id && <ActiveCheckIcon />}
                </div>
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown.Popover>
      </Dropdown>

      {/* Sort Option */}
      <Dropdown>
        <Dropdown.Trigger className={triggerClass}>
          <span>{activeSortLabel}</span>
          <ChevronIcon />
        </Dropdown.Trigger>
        <Dropdown.Popover className="w-56 rounded-2xl border border-slate-200/80 dark:border-gray-800/80 bg-white/95 dark:bg-[#192230]/95 backdrop-blur-md shadow-xl py-1 z-50">
          <Dropdown.Menu onAction={(key) => setSortBy(String(key))}>
            {SORT_OPTIONS.map((sort) => (
              <Dropdown.Item
                id={sort.id}
                key={sort.id}
                textValue={sort.name}
                className={getItemClass(sortBy === sort.id)}
              >
                <div className="flex items-center justify-between w-full">
                  <Label className="capitalize">{sort.name}</Label>
                  {sortBy === sort.id && <ActiveCheckIcon />}
                </div>
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown.Popover>
      </Dropdown>

    </div>
  );
};

export default FilterBar;