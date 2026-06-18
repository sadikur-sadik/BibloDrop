"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from '@gravity-ui/icons';

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);

  // Mock user role: change to 'admin', 'user', or null
  const userRole = 'admin'; 

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Browse Books', href: '/books' },
  ];

  const dashboardLinks = {
    admin: [
      { name: 'Admin Console', href: '/dashboard/admin' },
      { name: 'Manage Inventory', href: '/dashboard/inventory' },
    ],
    user: [
      { name: 'My Profile', href: '/dashboard/profile' },
      { name: 'Borrowed Books', href: '/dashboard/borrowed' },
    ],
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-[#6FBEB2]/20 bg-[#FDF4AF] text-[#34908B] transition-colors duration-300 dark:border-[#A5E9DD]/20 dark:bg-[#34908B] dark:text-[#FDF4AF]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* Premium Logo Section */}
          <Link href="/" className="group flex items-center gap-3 tracking-tight">
            <div className="relative flex items-center justify-center">
              {/* Animated Droplet & Book Hybrid Icon */}
              <motion.div
                whileHover={{ y: [0, -3, 2, 0] }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="text-[#34908B] dark:text-[#A5E9DD]"
              >
                <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  {/* Open Book Pages */}
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" fill="currentColor" fillOpacity="0.1" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" fill="currentColor" fillOpacity="0.1" />
                  {/* Minimalist Droplet Bookmark */}
                  <path 
                    d="M12 7c0 0-1.5 2-1.5 3.5a1.5 1.5 0 0 0 3 0C13.5 9 12 7 12 7z" 
                    fill="currentColor" 
                    className="text-[#6FBEB2] dark:text-[#FDF4AF] stroke-[1.2]"
                  />
                </svg>
              </motion.div>
            </div>
            
            {/* Elegant Typography */}
            <span className="text-xl font-light tracking-wide text-[#34908B] dark:text-[#FDF4AF]">
              Biblio<span className="font-extrabold tracking-normal text-[#6FBEB2] dark:text-[#A5E9DD]">Drop</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-6 md:flex">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-sm font-semibold transition-colors duration-200 hover:text-[#6FBEB2] dark:hover:text-[#A5E9DD] ${
                    isActive ? 'text-[#34908B] dark:text-[#A5E9DD]' : 'text-[#34908B]/80 dark:text-[#FDF4AF]/80'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute -bottom-5.5 left-0 h-0.5 w-full bg-[#34908B] dark:bg-[#A5E9DD]"
                    />
                  )}
                </Link>
              );
            })}

            {/* Dashboard Dropdown */}
            {userRole && (
              <div className="relative">
                <button
                  onClick={() => setIsDashboardOpen(!isDashboardOpen)}
                  onBlur={() => setTimeout(() => setIsDashboardOpen(false), 200)}
                  className={`text-sm font-semibold transition-colors duration-200 hover:text-[#6FBEB2] dark:hover:text-[#A5E9DD] flex items-center gap-1 ${
                    pathname.startsWith('/dashboard') ? 'text-[#34908B] dark:text-[#A5E9DD]' : 'text-[#34908B]/80 dark:text-[#FDF4AF]/80'
                  }`}
                >
                  Dashboard
                  <svg className={`h-4 w-4 transform transition-transform ${isDashboardOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <AnimatePresence>
                  {isDashboardOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-48 rounded-md border border-[#6FBEB2]/20 bg-[#A5E9DD] py-1 shadow-lg dark:border-[#A5E9DD]/20 dark:bg-[#256F6B]"
                    >
                      {dashboardLinks[userRole].map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block px-4 py-2 text-sm text-[#34908B] hover:bg-[#6FBEB2]/20 dark:text-[#FDF4AF] dark:hover:bg-[#A5E9DD]/20"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Premium CTA Button */}
            <button className="rounded-md px-4 py-2 text-sm font-semibold transition-all duration-200 bg-[#34908B] text-[#FDF4AF] hover:bg-[#6FBEB2] dark:bg-[#A5E9DD] dark:text-[#34908B] dark:hover:bg-[#A5E9DD]/90 shadow-sm">
              {userRole ? 'Logout' : 'Login'}
            </button>

            {/* Theme Toggle Button */}
            <button 
              onClick={toggleTheme} 
              className="rounded-full p-2 transition-colors duration-200 hover:bg-[#34908B]/10 text-[#34908B] dark:hover:bg-[#A5E9DD]/20 dark:text-[#FDF4AF]"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-[#6FBEB2]/20 bg-[#FDF4AF] dark:bg-[#34908B]"
          >
            <div className="p-4 space-y-2">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="block py-2 font-medium hover:text-[#6FBEB2] dark:hover:text-[#A5E9DD]">{link.name}</Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;