"use client";

import React from "react";
import { motion } from "motion/react";
import { Button } from "@heroui/react";
import { ShieldExclamation, ArrowLeft, House } from "@gravity-ui/icons";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const Unauthorized = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      router.push("/login");
    } catch (error) {
      console.error("Failed to sign out:", error);
    }
  };

  // Synchronized animation variants from Banner_1
  const containerVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.12 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="relative w-full py-4 px-4 flex items-center justify-center">

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative max-w-md md:max-w-xl w-full p-6 sm:p-8  bg-transparent text-[#192230] dark:text-white overflow-hidden text-center transition-colors duration-300 shadow-xl shadow-slate-100 dark:shadow-none"
      >
        {/* Ambient Glow synced from Banner_1 */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute right-0 top-0 w-60 h-60 bg-[#856a26]/5 dark:bg-[#ffcd00]/5 rounded-full blur-3xl pointer-events-none"
        />

        {/* Pulsing Alert Icon Badge */}
        <div className="relative flex justify-center mb-4">
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative flex items-center justify-center w-14 h-14 bg-rose-500/10 dark:bg-rose-500/5 rounded-full border border-rose-500/20 dark:border-rose-500/10"
          >
            <ShieldExclamation className="w-7 h-7 text-rose-500 dark:text-rose-400" />
          </motion.div>
        </div>

        {/* Synced Info Badge with Pulsing Status Indicator */}
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 bg-[#856a26]/10 border border-[#856a26]/30 dark:bg-[#ffcd00]/10 dark:border-[#ffcd00]/30 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#856a26] dark:text-[#ffcd00] tracking-wider uppercase mb-1"
        >
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
          403 Forbidden
        </motion.div>

        {/* Header matching Banner_1 Title Weight */}
        <motion.h1
          variants={itemVariants}
          className="text-2xl sm:text-3xl font-black tracking-tight leading-tight mt-1"
        >
          Access <span className="text-[#856a26] dark:text-[#ffcd00]">Restricted.</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-[#3d474e] dark:text-[#9ea7b3] text-xs sm:text-sm mt-2 max-w-md mx-auto leading-relaxed transition-colors"
        >
          This section requires different access privileges than those assigned to your current session. You may be signed in with a profile that does not have authorization for this resource.
        </motion.p>

        {/* Informational Context Box synced with Banner_1 Slate Accent Blocks */}
        <motion.div
          variants={itemVariants}
          className="w-full max-w-md mt-4 p-4 bg-slate-200/30 border border-slate-300/50 dark:bg-[#3d474e]/20 dark:border-gray-700/80 rounded-2xl text-left transition-colors"
        >
          <h4 className="text-xs font-bold text-[#192230] dark:text-white uppercase tracking-wider mb-2">
            Why am I seeing this screen?
          </h4>
          <ul className="text-xs text-[#3d474e] dark:text-[#9ea7b3] space-y-1.5 list-disc list-inside transition-colors">
            <li>Your active account lacks authorization credentials for this specific directory.</li>
            <li>You are authenticated with a role that is restricted from this layout.</li>
            <li>An administrator may have recently updated security permissions for this directory.</li>
          </ul>
        </motion.div>

        {/* Symmetrical Navigation Buttons with Banner_1 Physics & Styling */}
        <motion.div
          variants={itemVariants}
          className="mt-5 flex flex-col sm:flex-row gap-3 justify-center w-full max-w-sm mx-auto"
        >
          <Button
            onClick={() => router.back()}
            className="w-full sm:w-auto h-11 px-6 bg-slate-200/60 border border-slate-300/80 dark:bg-[#3d474e]/40 dark:border-gray-700 dark:hover:bg-[#3d474e]/60 rounded-full font-semibold transition-all transform hover:-translate-y-0.5 text-xs text-[#192230] dark:text-white flex items-center justify-center cursor-pointer shadow-none"
          >
            <ArrowLeft className="mr-2" width={14} height={14} />
            Go Back
          </Button>

          <Button
            onClick={() => router.push("/")}
            className="w-full sm:w-auto h-11 px-6 bg-[#192230] text-white hover:bg-[#2c2f38] dark:bg-[#ffcd00] dark:text-[#192230] dark:hover:bg-[#ffe066] rounded-full font-bold transition-all transform hover:-translate-y-0.5 shadow-lg shadow-slate-200 dark:shadow-[#ffcd00]/10 text-xs flex items-center justify-center cursor-pointer"
          >
            <House className="mr-2" width={14} height={14} />
            Return Home
          </Button>
        </motion.div>

        {/* Alternative Sign Out Action */}
        <motion.div variants={itemVariants} className="mt-4">
          <button
            type="button"
            onClick={handleSignOut}
            className="text-[11px] font-semibold text-gray-400 hover:text-[#856a26] dark:hover:text-[#ffcd00] bg-transparent border-none cursor-pointer transition-colors"
          >
            Sign out to switch account profiles
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Unauthorized;