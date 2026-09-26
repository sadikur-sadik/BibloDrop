'use client';

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { CommunityFeedCard, CommunityFeedSkeletonCard } from "./CommunityFeedCard";

const DEMO_FEED = [
  {
    _id: "demo-1",
    reviewerName: "Eleanor Vance",
    reviewerImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250",
    bookTitle: "The Midnight Library",
    rating: 5,
    comment: "An astonishing journey through infinite possibilities. Truly life-changing!",
    isVerified: true,
    helpfulCount: 24
  },
  {
    _id: "demo-2",
    reviewerName: "Liam Sterling",
    reviewerImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250",
    bookTitle: "Project Hail Mary",
    rating: 5,
    comment: "Incredible science fiction with heartwarming companionship. Couldn't put it down!",
    isVerified: true,
    helpfulCount: 18
  },
  {
    _id: "demo-3",
    reviewerName: "Sophia Chen",
    reviewerImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=250",
    bookTitle: "Klara and the Sun",
    rating: 4,
    comment: "A hauntingly beautiful reflection on love, humanity, and consciousness.",
    isVerified: true,
    helpfulCount: 15
  },
  {
    _id: "demo-4",
    reviewerName: "Marcus Vance",
    reviewerImage: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&q=80&w=250",
    bookTitle: "Atomic Habits",
    rating: 5,
    comment: "Practical, actionable wisdom. Transformed how I structure my daily reading goals.",
    isVerified: false,
    helpfulCount: 31
  }
];

export default function CommunityFeedSection() {
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
    fetch(`${apiUrl}/community-feed`)
      .then((res) => res.json())
      .then((res) => {
        if (res.success && Array.isArray(res.data) && res.data.length > 0) {
          setFeed(res.data);
        } else {
          setFeed(DEMO_FEED);
        }
        setLoading(false);
      })
      .catch(() => {
        setFeed(DEMO_FEED);
        setLoading(false);
      });
  }, []);

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

  return (
    <section className="w-full bg-slate-50 dark:bg-[#192230] text-[#192230] dark:text-white py-16 xl:py-24 2xl:py-32 4k:py-40 px-4 sm:px-8 md:px-16 lg:px-20 xl:px-24 2xl:px-32 4k:px-40 transition-colors duration-300 relative overflow-hidden select-none">

      {/* Background visual accents matching TopLibrarians & FeaturedBooks */}
      <div className="absolute right-0 top-0 w-80 h-80 xl:w-[450px] xl:h-[450px] bg-[#856a26]/5 dark:bg-[#ffcd00]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute left-0 bottom-0 w-80 h-80 xl:w-[450px] xl:h-[450px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Outer Motion Wrapper */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.15 }}
        variants={containerVariants}
        className="w-full max-w-7xl 4k:max-w-[3840px] mx-auto space-y-12 xl:space-y-16 2xl:space-y-20 4k:space-y-28 relative z-10"
      >

        {/* Header Block */}
        <div className="text-center space-y-4 max-w-2xl xl:max-w-3xl 2xl:max-w-4xl 4k:max-w-5xl mx-auto">
          <motion.span
            variants={itemVariants}
            className="inline-flex items-center gap-2 bg-[#856a26]/10 border border-[#856a26]/30 dark:bg-[#ffcd00]/10 dark:border-[#ffcd00]/30 px-3.5 py-1.5 xl:px-4 xl:py-2 4k:px-6 4k:py-3 rounded-full text-xs xl:text-sm 4k:text-xl font-semibold text-[#856a26] dark:text-[#ffcd00] uppercase tracking-wider"
          >
            <span className="w-2 h-2 4k:w-3 4k:h-3 rounded-full bg-[#856a26] dark:bg-[#ffcd00] animate-pulse"></span>
            Community Insights
          </motion.span>

          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl xl:text-5xl 2xl:text-6xl 4k:text-7xl font-black tracking-tight text-[#192230] dark:text-white"
          >
            Live Reader <span className="text-[#856a26] dark:text-[#ffcd00]">Activity</span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-[#3d474e] dark:text-[#9ea7b3] text-sm md:text-base xl:text-lg 2xl:text-xl 4k:text-2xl leading-relaxed max-w-xl xl:max-w-2xl 2xl:max-w-3xl 4k:max-w-4xl mx-auto"
          >
            Real reviews and activity from verified readers across the library network.
          </motion.p>
        </div>

        {/* Standard Grid for <2560px, Centered Flex for 4K */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 4k:flex 4k:flex-wrap 4k:justify-center 4k:gap-12">
            {[...Array(4)].map((_, idx) => (
              <div key={idx} className="w-full 4k:w-[calc(25%-2rem)] 4k:max-w-xl flex">
                <CommunityFeedSkeletonCard />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 4k:flex 4k:flex-wrap 4k:justify-center 4k:gap-12">
            {feed.map((entry) => (
              <div key={entry._id} className="w-full 4k:w-[calc(25%-2rem)] 4k:max-w-xl flex">
                <CommunityFeedCard entry={entry} variants={itemVariants} />
              </div>
            ))}
          </div>
        )}

      </motion.div>
    </section>
  );
}
