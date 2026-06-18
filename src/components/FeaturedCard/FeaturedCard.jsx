"use client";

import React from "react";
import Image from "next/image";
import { Card } from "@heroui/react";

const FeaturedBookCard = ({ book }) => {
  // Fallbacks if any prop field is missing
  const {
    title = "Beyond The Stars",
    price = "$22.00",
    description = "The comprehensive guide to historical astronomy and the maps that led us to explore the cosmos.",
    rating = "5.0",
    genre = "Science",
    tag = "Classic",
    coverUrl = "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=1000",
  } = book || {};

  return (
    <Card className="relative overflow-hidden w-full max-w-sm sm:max-w-md aspect-3/4 min-h-120 rounded-[32px] border border-solid border-gray-300 dark:border-white/10 flex flex-col justify-end p-6 z-0 shadow-lg group transition-all duration-300 hover:border-gray-400 dark:hover:border-white/20">
      
      {/* Optimized Next.js Cover Image */}
      <Image
        src={coverUrl}
        alt={title}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        priority
        className="object-cover z-0 transition-transform duration-500 group-hover:scale-105"
      />

      {/* Contrast Overlays */}
      <div className="absolute inset-0 bg-linear-to-t from-[#192230]/95 via-[#192230]/80 to-[#192230]/30 z-10 pointer-events-none" />
      
      {/* Cinematic radial spotlight beaming from the top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[85%] h-[60%] bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.15)_0%,transparent_65%)] pointer-events-none z-10" />

      {/* Hero UI Content Wrapper */}
      <div className="relative z-20 flex flex-col gap-4">
        
        {/* Header containing Title, Price, and Description */}
        <Card.Header className="p-0 flex flex-col items-start gap-1 bg-transparent">
          <div className="flex items-center gap-2.5 flex-wrap w-full">
            <Card.Title className="font-serif text-2xl font-bold text-white tracking-wide leading-tight">
              {title}
            </Card.Title>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/10 text-white/90">
              {price}
            </span>
          </div>
          <Card.Description className="text-sm font-light text-gray-300 line-clamp-2 leading-relaxed mt-1">
            {description}
          </Card.Description>
        </Card.Header>

        {/* Content containing Category Tags & Ratings */}
        <Card.Content className="p-0 bg-transparent">
          {/* Explicitly flexes standard elements horizontally and overrides block stretching */}
          <div className="flex flex-row flex-wrap gap-2 items-center justify-start w-full">
            
            {/* Rating Tag */}
            <span className="inline-flex items-center gap-1 text-xs py-1.5 px-3.5 bg-white/10 dark:bg-white/15 backdrop-blur-md rounded-full border border-white/10 text-white font-semibold">
              <span className="text-[#ffcd00]">★</span> {rating}
            </span>

            {/* Genre Tag */}
            <span className="inline-flex items-center text-xs py-1.5 px-3.5 bg-white/10 dark:bg-white/15 backdrop-blur-md rounded-full border border-white/10 text-white font-semibold">
              {genre}
            </span>

            {/* Subject/Status Tag */}
            <span className="inline-flex items-center text-xs py-1.5 px-3.5 bg-white/10 dark:bg-white/15 backdrop-blur-md rounded-full border border-white/10 text-white font-semibold">
              {tag}
            </span>
            
          </div>
        </Card.Content>

        {/* Footer containing action CTA Button */}
        <Card.Footer className="p-0 mt-2 bg-transparent">
          <button className="w-full py-3.5 px-6 rounded-full font-semibold text-sm bg-white text-[#192230] hover:bg-gray-100 transition-all duration-200 shadow-md hover:scale-[1.01] active:scale-[0.99]">
            Book now
          </button>
        </Card.Footer>

      </div>
    </Card>
  );
};

export default FeaturedBookCard;