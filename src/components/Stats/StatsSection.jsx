'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, animate } from 'motion/react';
import { 
  Book, 
  Person, 
  Car, 
  ShieldCheck, 
  CardDiamond, 
  Check 
} from '@gravity-ui/icons';

// Reusable Count-Up component with spring easing
const CountUpValue = ({ to, duration = 2.5, delay = 0 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    // Numerical transition with a custom cubic-bezier for a smooth deceleration
    const controls = animate(0, to, {
      duration: duration,
      delay: delay,
      ease: [0.16, 1, 0.3, 1], 
      onUpdate: (value) => {
        setCount(Math.floor(value));
      }
    });

    return () => controls.stop();
  }, [to, isInView, duration, delay]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
};

const StatsSection = () => {
  // Framer Motion layout orchestration variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 85, damping: 16 } 
    }
  };

  const statItems = [
    {
      id: 1,
      number: 14250,
      suffix: "+",
      label: "Active Readers",
      subLabel: "Students, locals, & avid readers",
      icon: <Book className="w-6 h-6 text-[#ffcd00]" />
    },
    {
      id: 2,
      number: 890,
      suffix: "+",
      label: "Librarians & Providers",
      subLabel: "Independent collection hosts",
      icon: <Person className="w-6 h-6 text-[#ffcd00]" />
    },
    {
      id: 3,
      number: 58400,
      suffix: "",
      label: "Books Delivered",
      subLabel: "Secure, tracked home deliveries",
      icon: <Car className="w-6 h-6 text-[#ffcd00]" />
    },
    {
      id: 4,
      number: 96,
      suffix: "%",
      label: "Trust Score",
      subLabel: "Verified positive community ratings",
      icon: <ShieldCheck className="w-6 h-6 text-[#ffcd00]" />
    }
  ];

  return (
    <section className="w-full bg-slate-50 dark:bg-[#192230] text-[#192230] dark:text-white py-16 px-8 md:px-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header Block */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 bg-[#ffcd00]/10 border border-[#ffcd00]/30 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#856a26] dark:text-[#ffcd00] uppercase tracking-wider">
            BiblioDrop Impact
          </span>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-[#192230] dark:text-white">
            Connecting Readers &amp; Local Libraries
          </h2>
          <p className="text-[#3d474e] dark:text-[#9ea7b3] text-sm md:text-base leading-relaxed">
            Real-time infrastructure powering decentralized book lending, community hubs, and doorstep delivery.
          </p>
        </div>

        {/* Animated Numerical Stats Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {statItems.map((stat, idx) => (
            <motion.div
              key={stat.id}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.2 } }}
              className="bg-white dark:bg-[#2c2f38] border border-slate-200 dark:border-gray-800 rounded-2xl p-6 md:p-8 flex flex-col justify-between relative overflow-hidden group shadow-md dark:shadow-lg hover:shadow-slate-200 dark:hover:shadow-[#ffcd00]/5 hover:border-[#ffcd00]/30 transition-all duration-300"
            >
              {/* CardDiamond top row with Gravity UI Icon wrapper */}
              <div className="flex justify-between items-start">
                <div className="bg-slate-100 dark:bg-[#192230] p-3 rounded-xl border border-slate-200 dark:border-gray-700/50 group-hover:bg-[#ffcd00]/10 transition-colors duration-300 flex items-center justify-center">
                  {stat.icon}
                </div>
              </div>

              {/* Dynamic Number Container */}
              <div className="mt-8 space-y-2">
                <div className="text-4xl md:text-5xl font-black tracking-tight text-[#192230] dark:text-white flex items-baseline">
                  <CountUpValue to={stat.number} delay={idx * 0.1} />
                  <span className="text-[#ffcd00] select-none">{stat.suffix}</span>
                </div>
                <h3 className="text-lg font-bold text-[#192230] dark:text-slate-100 group-hover:text-[#ffcd00] transition-colors duration-200">
                  {stat.label}
                </h3>
                <p className="text-[#3d474e] dark:text-[#9ea7b3] text-xs leading-relaxed">
                  {stat.subLabel}
                </p>
              </div>

              {/* Glowing accent border effect on hover */}
              <div className="absolute inset-x-0 bottom-0 h-1 bg-linear-to-r from-transparent via-[#ffcd00] to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
            </motion.div>
          ))}
        </motion.div>

        {/* Secondary Static Trust Section */}
        <div className="bg-white dark:bg-[#2c2f38] border border-slate-200 dark:border-gray-800 rounded-3xl p-8 md:p-12 grid grid-cols-1 md:grid-cols-3 gap-8 items-center relative overflow-hidden shadow-md dark:shadow-none">
          
          <div className="absolute right-0 top-0 w-64 h-64 bg-[#ffcd00]/5 rounded-full blur-3xl pointer-events-none" />

          {/* Left Column: Brief Statement */}
          <div className="space-y-4">
            <h4 className="text-xl md:text-2xl font-extrabold text-[#192230] dark:text-white leading-tight">
              A Secure ecosystem built on community trust
            </h4>
            <p className="text-[#3d474e] dark:text-[#9ea7b3] text-xs md:text-sm leading-relaxed">
              We coordinate verified pipelines for book security, route optimizations, and secure client-provider billing.
            </p>
          </div>

          {/* Center Column: Gravity UI CardDiamond Icon & Stripe Detail */}
          <div className="border-t md:border-t-0 md:border-l border-slate-200 dark:border-gray-800 pt-6 md:pt-0 md:pl-8 space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-100 dark:bg-[#192230] rounded-lg border border-slate-200 dark:border-gray-700/50 text-[#ffcd00]">
                <CardDiamond className="w-5 h-5" />
              </div>
              <span className="text-[#192230] dark:text-white font-black text-2xl">99.8%</span>
              <span className="bg-[#ffcd00]/10 text-[#ffcd00] px-2 py-0.5 rounded text-[10px] font-bold uppercase">Stripe API</span>
            </div>
            <p className="text-sm font-semibold text-[#192230] dark:text-slate-200">Instant Payments &amp; Escrow</p>
            <p className="text-xs text-[#3d474e] dark:text-[#9ea7b3]">
              Automated delivery fees secure inside stripe checkout flow.
            </p>
          </div>

          {/* Right Column: Gravity UI Check Icon & Verified Reviews Detail */}
          <div className="border-t md:border-t-0 md:border-l border-slate-200 dark:border-gray-800 pt-6 md:pt-0 md:pl-8 space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-100 dark:bg-[#192230] rounded-lg border border-slate-200 dark:border-gray-700/50 text-[#ffcd00]">
                <Check className="w-5 h-5" />
              </div>
              <span className="text-[#192230] dark:text-white font-black text-2xl">100%</span>
              <span className="bg-[#ffcd00]/10 text-[#ffcd00] px-2 py-0.5 rounded text-[10px] font-bold uppercase">Verified</span>
            </div>
            <p className="text-sm font-semibold text-[#192230] dark:text-slate-200">Strict Feedback System</p>
            <p className="text-xs text-[#3d474e] dark:text-[#9ea7b3]">
              Only readers with completed doorstep transactions can submit ratings.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};

export default StatsSection;