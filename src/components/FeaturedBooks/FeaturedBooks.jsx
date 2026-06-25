'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Card } from "@heroui/react";

import { getFeaturedBooks } from '@/lib/fetch/featuredbooks';

const FeaturedBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBooks() {
      try {
        setLoading(true);
        const data = await getFeaturedBooks();
        if (data) {
          setBooks(data);
        }
      } catch (err) {
        console.error("Error loading featured books:", err);
        setError("Unable to load featured books.");
      } finally {
        setLoading(false);
      }
    }
    fetchBooks();
  }, []);

  // Premium viewport entry animations matching TopLibrarians
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: [0.16, 1, 0.3, 1], // Custom deceleration curve for premium transition
        staggerChildren: 0.15 
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

  if (loading) {
    return (
      <section className="w-full bg-slate-50 dark:bg-[#192230] py-16 px-4 sm:px-8 md:px-16 transition-colors duration-300">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 animate-pulse">
            {[...Array(6)].map((_, idx) => (
              <div key={idx} className="h-80 bg-slate-200 dark:bg-slate-800 rounded-[2rem]" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error || books.length === 0) {
    return null;
  }

  return (
    <section className="w-full bg-slate-50 dark:bg-[#192230] text-[#192230] dark:text-white py-16 px-4 sm:px-8 md:px-16 lg:px-20 transition-colors duration-300 relative overflow-hidden select-none">
      
      {/* Background visual accents */}
      <div className="absolute right-0 top-0 w-80 h-80 bg-[#856a26]/5 dark:bg-[#ffcd00]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute left-0 bottom-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Repeated transition triggered on view entry/exit */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.15 }}
        variants={containerVariants}
        className="max-w-7xl mx-auto space-y-12 relative z-10"
      >
        
        {/* Header Block matching the spotlight aesthetics */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <motion.span 
            variants={itemVariants}
            className="inline-flex items-center gap-2 bg-[#856a26]/10 border border-[#856a26]/30 dark:bg-[#ffcd00]/10 dark:border-[#ffcd00]/30 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#856a26] dark:text-[#ffcd00] uppercase tracking-wider"
          >
            <span className="w-2 h-2 rounded-full bg-[#856a26] dark:bg-[#ffcd00] animate-pulse"></span>
            Curated Selection
          </motion.span>
          
          <motion.h2 
            variants={itemVariants}
            className="text-3xl md:text-4xl font-black tracking-tight text-[#192230] dark:text-white"
          >
            Our Featured <span className="text-[#856a26] dark:text-[#ffcd00]">Literature</span>
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-[#3d474e] dark:text-[#9ea7b3] text-sm md:text-base leading-relaxed max-w-xl mx-auto"
          >
            Vetted literary selections registered directly under verified community catalog libraries.
          </motion.p>
        </div>

        {/* Compact Staggered Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-5">
          {books.map((book) => {
            const {
              _id = "default-id",
              title = "Untitled Title",
              author = "Unknown Author",
              quantity = 0,
              coverImage = "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=1000",
            } = book;

            const isOutOfStock = quantity <= 0;

            return (
              <motion.div
                key={_id}
                variants={itemVariants}
                className="w-full flex"
              >
                <Card className="relative overflow-hidden w-full rounded-[2rem] border border-slate-100 dark:border-white/10 p-4 bg-white dark:bg-[#2c2f38] transition-colors duration-300 shadow-sm hover:shadow-xl dark:shadow-black/20 flex flex-col group justify-between">
                  
                  {/* Portrait Cover Wrapper */}
                  <div>
                    <div className="relative w-full aspect-3/4 rounded-[1.4rem] overflow-hidden mb-3.5 bg-slate-50 dark:bg-slate-900/30 flex items-center justify-center">
                      
                      <div className="absolute inset-0 select-none pointer-events-none scale-110 blur-xl opacity-20 dark:opacity-35 transition-transform duration-500 group-hover:scale-115">
                        <Image
                          src={coverImage}
                          alt=""
                          fill
                          sizes="100px"
                          className="object-cover"
                        />
                      </div>

                      <div className="relative w-[85%] h-[85%] z-10 transition-transform duration-500 group-hover:scale-103">
                        <Image
                          src={coverImage}
                          alt={title}
                          fill
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 20vw, 15vw"
                          priority
                          className="object-contain drop-shadow-[0_4px_8px_rgba(0,0,0,0.15)] dark:drop-shadow-[0_8px_16px_rgba(0,0,0,0.45)]"
                        />
                      </div>
                    </div>

                    {/* Compact Card Headers */}
                    <Card.Header className="p-0 flex flex-col items-start bg-transparent">
                      <Card.Title className="text-sm font-extrabold tracking-tight text-[#192230] dark:text-white leading-snug line-clamp-1 group-hover:text-[#856a26] dark:group-hover:text-[#ffcd00] transition-colors duration-200">
                        {title}
                      </Card.Title>
                      
                      {/* Integrated Author & Stock Layout */}
                      <Card.Description className="text-[10px] font-semibold text-slate-400 dark:text-[#9ea7b3]/70 mt-1 uppercase tracking-wider line-clamp-1 flex items-center flex-wrap gap-1">
                        <span>by {author}</span>
                        <span className="text-slate-300 dark:text-slate-600 font-normal select-none">•</span>
                        {isOutOfStock ? (
                          <span className="text-red-500 dark:text-red-400 font-bold">Out of stock</span>
                        ) : (
                          <span className="text-emerald-500 dark:text-emerald-400 font-bold">In stock</span>
                        )}
                      </Card.Description>
                    </Card.Header>
                  </div>

                  {/* Clean details button linking to dynamic routes */}
                  <Card.Footer className="p-0 mt-3.5 bg-transparent w-full">
                    <Link href={`/books/${_id}`} className="block w-full">
                      <button className="w-full py-2 px-4 rounded-full font-extrabold text-[11px] bg-[#192230] text-white hover:bg-[#2c2f38] dark:bg-[#ffcd00] dark:text-[#192230] dark:hover:bg-[#ffe066] transition-all duration-200 shadow-md flex items-center justify-center cursor-pointer">
                        View details
                      </button>
                    </Link>
                  </Card.Footer>

                </Card>
              </motion.div>
            );
          })}
        </div>

      </motion.div>
    </section>
  );
};

export default FeaturedBooks;