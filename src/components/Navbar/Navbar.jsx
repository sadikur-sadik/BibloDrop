"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { Sun, Moon } from '@gravity-ui/icons';
import { useTheme } from 'next-themes';
import { authClient } from '@/lib/auth-client';

// Imported components
import UserMenu from './UserMenu/UserMenu';
import EditProfileModal from './UserMenu/EditProfile';

const Navbar = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const pathname = usePathname();
  const { data: session } = authClient.useSession();

  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const user = session?.user;

  // Sync state after mounting to avoid hydration mismatches
  useEffect(() => {
    setMounted(true);
  }, []);

  const isDarkMode = resolvedTheme === 'dark';

  // Navigation Links
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Browse Books', href: '/books?page=1' },
    { name: 'Contact', href: '/contact' },
  ];

  const isRouteActive = (href) => {
    const [basePath] = href.split('?');
    if (basePath === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(basePath);
  };

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  const closeMobileMenu = () => setIsOpen(false);

  return (
    <nav className="sticky top-0 z-50 w-full max-w-360 border-b border-gray-100 bg-white text-[#192230] transition-colors duration-300 dark:border-[#2c2f38] dark:bg-[#192230] dark:text-[#FFFFFF]">
      <div className="mx-auto w-[90%] md:w-[92%] xl:w-[95%] px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">

          {/* Logo Section */}
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
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" fill="currentColor" fillOpacity="0.1" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" fill="currentColor" fillOpacity="0.1" />
                <path
                  d="M12 6c0 0-1.2 1.8-1.2 3.2a1.2 1.2 0 1 0 2.4 0C13.2 7.8 12 6 12 6z"
                  fill="currentColor"
                  className="stroke-1"
                />
              </svg>
            </motion.div>

            <span className="font-serif text-2xl font-light tracking-wide text-[#192230] transition-colors duration-300 dark:text-[#FFFFFF]">
              Biblio<span className="font-extrabold tracking-normal text-[#856a26] dark:text-[#ffcd00]">Drop</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-8 md:flex">
            {navLinks.map((link) => {
              const isActive = isRouteActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative py-1 text-sm font-semibold tracking-wide transition-colors duration-200 ${isActive
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

            {/* Desktop User Option */}
            <UserMenu variant="desktop" onOpenEditModal={() => setIsEditModalOpen(true)} />

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="rounded-full p-2.5 transition-colors duration-200 hover:bg-gray-100 text-[#192230] dark:hover:bg-[#2c2f38] dark:text-[#FFFFFF] flex items-center justify-center min-w-10 min-h-10"
              aria-label="Toggle theme"
            >
              {mounted ? (
                isDarkMode ? (
                  <Sun className="h-5 w-5 text-[#ffcd00]" />
                ) : (
                  <Moon className="h-5 w-5 text-[#192230]" />
                )
              ) : (
                <div className="h-5 w-5" />
              )}
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
                  onClick={closeMobileMenu}
                  className="block py-2 text-sm font-semibold tracking-wide text-[#3d474e] hover:text-[#192230] dark:text-[#94a3b8] dark:hover:text-white"
                >
                  {link.name}
                </Link>
              ))}

              {/* Mobile Profile Area */}
              <UserMenu 
                variant="mobile-profile" 
                onCloseMobileMenu={closeMobileMenu} 
                onOpenEditModal={() => setIsEditModalOpen(true)}
              />

              {/* Mobile CTA Options Section */}
              <div className="pt-4 flex items-center justify-between border-t border-gray-100 dark:border-[#2c2f38]">
                <UserMenu variant="mobile-cta" onCloseMobileMenu={closeMobileMenu} />

                <button
                  onClick={toggleTheme}
                  className="rounded-full p-2.5 bg-gray-55 dark:bg-[#2c2f38] text-[#192230] dark:text-white flex items-center justify-center min-w-10 min-h-10"
                >
                  {mounted ? (
                    isDarkMode ? (
                      <Sun className="h-5 w-5 text-[#ffcd00]" />
                    ) : (
                      <Moon className="h-5 w-5 text-[#192230]" />
                    )
                  ) : (
                    <div className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Edit Profile Modal (Mounted at the root of Navbar) */}
      <AnimatePresence>
        {isEditModalOpen && user && (
          <EditProfileModal 
            isOpen={isEditModalOpen} 
            onClose={() => setIsEditModalOpen(false)} 
            user={user} 
          />
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;