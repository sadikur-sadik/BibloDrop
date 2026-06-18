"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from '@gravity-ui/icons';

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [isMobileDashboardOpen, setIsMobileDashboardOpen] = useState(false);

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

  // Sync state with HTML document element for dark mode styling
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <nav className="sticky top-0 z-50 w-full  max-w-360 border-b border-gray-100 bg-white text-[#192230] transition-colors duration-300 dark:border-[#2c2f38] dark:bg-[#192230] dark:text-[#FFFFFF]">
      <div className="mx-auto  w-[90%] md:w-[92%] xl:w-[95%] px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          
          {/* Logo Section with Original BiblioDrop Style and Custom Droplet SVG */}
          <Link href="/" className="group flex items-center gap-2">
            <motion.div
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="text-[#856a26] dark:text-[#ffcd00]"
            >
              <svg 
                className="h-7 w-7" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.8" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                {/* Book Pages with subtle opacity fill */}
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" fill="currentColor" fillOpacity="0.1" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" fill="currentColor" fillOpacity="0.1" />
                {/* Droplet Bookmark */}
                <path 
                  d="M12 6c0 0-1.2 1.8-1.2 3.2a1.2 1.2 0 1 0 2.4 0C13.2 7.8 12 6 12 6z" 
                  fill="currentColor" 
                  className="stroke-1"
                />
              </svg>
            </motion.div>
            
            {/* Elegant Brand Typography */}
            <span className="font-serif text-2xl font-light tracking-wide text-[#192230] transition-colors duration-300 dark:text-[#FFFFFF]">
              Biblio<span className="font-extrabold tracking-normal text-[#856a26] dark:text-[#ffcd00]">Drop</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-8 md:flex">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative py-1 text-sm font-semibold tracking-wide transition-colors duration-200 ${
                    isActive 
                      ? 'text-[#856a26] dark:text-[#ffcd00]' 
                      : 'text-[#3d474e] hover:text-[#192230] dark:text-[#94a3b8] dark:hover:text-white'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-0 h-0.5 w-full bg-[#856a26] dark:bg-[#ffcd00]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}

            {/* Desktop Dashboard Dropdown */}
            {userRole && (
              <div className="relative">
                <button
                  onClick={() => setIsDashboardOpen(!isDashboardOpen)}
                  onBlur={() => setTimeout(() => setIsDashboardOpen(false), 200)}
                  className={`flex items-center gap-1.5 text-sm font-semibold tracking-wide transition-colors duration-200 ${
                    pathname.startsWith('/dashboard') 
                      ? 'text-[#856a26] dark:text-[#ffcd00]' 
                      : 'text-[#3d474e] hover:text-[#192230] dark:text-[#94a3b8] dark:hover:text-white'
                  }`}
                >
                  Dashboard
                  <svg className={`h-4 w-4 transform transition-transform duration-200 ${isDashboardOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <AnimatePresence>
                  {isDashboardOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-3 w-48 rounded-lg border border-gray-100 bg-white py-2 shadow-lg dark:border-[#3d474e] dark:bg-[#2c2f38]"
                    >
                      {dashboardLinks[userRole].map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block px-4 py-2.5 text-sm text-[#192230] transition-colors duration-150 hover:bg-gray-50 dark:text-white dark:hover:bg-[#3d474e]/40"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Pill-Shaped Dynamic CTA Button */}
            <button className="rounded-full px-6 py-2.5 text-sm font-semibold tracking-wide transition-all duration-200 bg-[#192230] text-white hover:bg-[#2c2f38] dark:bg-[#ffcd00] dark:text-[#192230] dark:hover:bg-[#ffe066]">
              {userRole ? 'Logout' : 'Login'}
            </button>

            {/* Theme Toggle Button */}
            <button 
              onClick={toggleTheme} 
              className="rounded-full p-2.5 transition-colors duration-200 hover:bg-gray-100 text-[#192230] dark:hover:bg-[#2c2f38] dark:text-[#FFFFFF]"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun className="h-5 w-5 text-[#ffcd00]" /> : <Moon className="h-5 w-5 text-[#192230]" />}
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button 
            className="rounded-full p-2 md:hidden hover:bg-gray-100 dark:hover:bg-[#2c2f38] text-[#192230] dark:text-white" 
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Panel with Accordion Submenu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-100 bg-white dark:border-[#2c2f38] dark:bg-[#192230] overflow-hidden"
          >
            <div className="px-6 py-5 space-y-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href} 
                  onClick={() => setIsOpen(false)}
                  className="block py-2 text-sm font-semibold tracking-wide text-[#3d474e] hover:text-[#192230] dark:text-[#94a3b8] dark:hover:text-white"
                >
                  {link.name}
                </Link>
              ))}
              
              {/* Collapsible Mobile Dashboard Accordion */}
              {userRole && (
                <div className="border-t border-gray-100 pt-2 dark:border-[#2c2f38]">
                  <button
                    onClick={() => setIsMobileDashboardOpen(!isMobileDashboardOpen)}
                    className="flex w-full items-center justify-between py-2 text-sm font-semibold tracking-wide text-[#3d474e] dark:text-[#94a3b8]"
                  >
                    <span>Dashboard</span>
                    <svg 
                      className={`h-4 w-4 transform transition-transform duration-250 text-[#3d474e] dark:text-[#94a3b8] ${isMobileDashboardOpen ? 'rotate-180' : ''}`} 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {/* Dynamic length increase animation for submenu options */}
                  <AnimatePresence initial={false}>
                    {isMobileDashboardOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden pl-4 border-l border-gray-100 dark:border-[#2c2f38] space-y-1.5 mt-2"
                      >
                        {dashboardLinks[userRole].map((item) => (
                          <Link 
                            key={item.href} 
                            href={item.href} 
                            onClick={() => setIsOpen(false)}
                            className="block py-2 text-sm font-medium text-[#3d474e]/80 hover:text-[#192230] dark:text-[#94a3b8]/80 dark:hover:text-white"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* Mobile CTA Options Section */}
              <div className="pt-4 flex items-center justify-between border-t border-gray-100 dark:border-[#2c2f38]">
                <button className="rounded-full w-2/3 py-2.5 text-sm font-semibold bg-[#192230] text-white hover:bg-[#2c2f38] dark:bg-[#ffcd00] dark:text-[#192230] dark:hover:bg-[#ffe066]">
                  {userRole ? 'Logout' : 'Login'}
                </button>
                <button 
                  onClick={toggleTheme} 
                  className="rounded-full p-2.5 bg-gray-50 dark:bg-[#2c2f38] text-[#192230] dark:text-white"
                >
                  {isDarkMode ? <Sun className="h-5 w-5 text-[#ffcd00]" /> : <Moon className="h-5 w-5 text-[#192230]" />}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;