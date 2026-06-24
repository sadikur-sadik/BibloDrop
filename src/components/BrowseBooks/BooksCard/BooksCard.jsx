'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Card } from "@heroui/react";

// Gravity UI direct icon imports
import { Tag, BookOpen } from '@gravity-ui/icons';

const BooksCard = ({ book }) => {
  // Fallbacks if any book field is missing
  const {
    _id = "default-id",
    title = "To Kill a Mockingbird",
    author = "Harper Lee",
    genre = "fiction",
    quantity = "10",
    deliveryFee = "3.50", // Added fallback delivery fee
    coverImage = "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=1000",
  } = book || {};

  // Check if book is currently checked out / out of stock
  const isUnavailable = parseInt(quantity || 0, 10) <= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="w-full"
    >
      <Card className="relative overflow-hidden w-full rounded-[2.5rem] border border-slate-100 dark:border-white/10 p-5 bg-white dark:bg-[#192230] transition-colors duration-300 shadow-md hover:shadow-xl dark:shadow-black/20 flex flex-col group">
        
        {/* Adjusted to portrait ratio (3:4) with subtle inner styling */}
        <div className="relative w-full aspect-3/4 rounded-[1.85rem] overflow-hidden mb-5 bg-slate-50 dark:bg-slate-900/30 flex items-center justify-center">
          
          {/* Blurred Background to soften any leftover edge space */}
          <div className="absolute inset-0 select-none pointer-events-none scale-110 blur-xl opacity-20 dark:opacity-30 transition-transform duration-500 group-hover:scale-115">
            <Image
              src={coverImage}
              alt=""
              fill
              sizes="100px"
              className="object-cover"
            />
          </div>

          {/* "Unavailable" Badge */}
          {isUnavailable && (
            <div className="absolute top-4 right-4 bg-red-600 text-white font-bold text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-full z-20 shadow-md">
              Unavailable
            </div>
          )}

          {/* Main Book Cover with drop-shadow adapted to the book outline */}
          <div className="relative w-[85%] h-[85%] z-10 transition-transform duration-500 group-hover:scale-103">
            <Image
              src={coverImage}
              alt={title}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              priority
              className="object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.25)] dark:drop-shadow-[0_12px_24px_rgba(0,0,0,0.55)]"
            />
          </div>
        </div>

        {/* Hero UI Header - Book Title & Subtitle */}
        <Card.Header className="p-0 flex flex-col items-start bg-transparent">
          <Card.Title className="text-2xl font-extrabold tracking-tight text-[#192230] dark:text-white leading-tight line-clamp-1">
            {title}
          </Card.Title>
          <Card.Description className="text-sm font-semibold text-slate-400 dark:text-[#9ea7b3]/70 mt-1 uppercase tracking-wider">
            by {author}
          </Card.Description>
        </Card.Header>

        {/* Hero UI Content - Metadata Tag Row */}
        <Card.Content className="p-0 mt-4 bg-transparent">
          <div className="flex flex-col gap-2 text-sm font-bold text-[#3d474e] dark:text-slate-300">
            
            {/* Direct Gravity UI BookOpen Icon - Genre */}
            <div className="flex items-center gap-1.5 uppercase tracking-wide">
              <BookOpen className="w-4 h-4 text-slate-400 dark:text-slate-500" />
              <span>{genre}</span>
            </div>

            {/* Direct Gravity UI Tag Icon - Delivery Fee & Quantity */}
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mt-1">
              <div className="flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                <span>Fee: ${parseFloat(deliveryFee).toFixed(2)}</span>
              </div>
              <span>{isUnavailable ? "out of stock" : `${quantity} in stock`}</span>
            </div>

          </div>
        </Card.Content>

        {/* Hero UI Footer - CTA Action Button */}
        <Card.Footer className="p-0 mt-5 bg-transparent w-full">
          <Link href={`/books/${_id}`} className="block w-full">
            <button className="w-full py-3.5 px-6 rounded-full font-extrabold text-sm bg-[#192230] text-white hover:bg-[#2c2f38] dark:bg-[#ffcd00] dark:text-[#192230] dark:hover:bg-[#ffe066] transition-all duration-200 shadow-md hover:shadow-[#192230]/10 dark:hover:shadow-[#ffcd00]/10 flex items-center justify-center cursor-pointer">
              View details
            </button>
          </Link>
        </Card.Footer>

      </Card>
    </motion.div>
  );
};

export default BooksCard;