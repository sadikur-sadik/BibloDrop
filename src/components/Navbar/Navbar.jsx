"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { Sun, Moon } from '@gravity-ui/icons';
import { useTheme } from 'next-themes';

// Auth Client Import
import { authClient } from '@/lib/auth-client';

const Navbar = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();
  
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileDashboardOpen, setIsMobileDashboardOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Retrieve active session dynamically
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const userRole = user?.role || 'reader'; 

  // Sync state after mounting to avoid hydration mismatches
  useEffect(() => {
    setMounted(true);
  }, []);

  const isDarkMode = resolvedTheme === 'dark';

  // Navigation Links
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Browse Books', href: '/books' },
    { name: 'Contact', href: '/contact' },
  ];

  // Helper to map roles directly to their respective dashboards
  const getDashboardHref = (role) => {
    if (role === 'admin') return '/dashboard/admin/overview';
    if (role === 'librarian') return '/dashboard/librarian/overview';
    return '/dashboard/reader/overview';
  };

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          setIsProfileOpen(false);
          setIsMobileDashboardOpen(false);
          setIsOpen(false);
          router.push('/signin');
        }
      }
    });
  };

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

            {/* Desktop User Profile Dropdown */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  onBlur={() => setTimeout(() => setIsProfileOpen(false), 200)}
                  className="flex items-center gap-2 focus:outline-none cursor-pointer"
                >
                  {user?.image ? (
                    <img 
                      src={user.image} 
                      alt={user.name} 
                      className="h-8 w-8 rounded-full object-cover border border-gray-100 dark:border-[#2c2f38]" 
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-[#856a26] text-white dark:bg-[#ffcd00] dark:text-[#192230] flex items-center justify-center font-bold text-xs uppercase shadow-xs">
                      {user?.name ? user.name[0] : 'U'}
                    </div>
                  )}
                  <span className="hidden lg:block text-sm font-semibold tracking-wide text-[#3d474e] dark:text-[#94a3b8] hover:text-[#192230] dark:hover:text-white transition-colors">
                    {user?.name}
                  </span>
                  <svg className={`h-4 w-4 text-[#3d474e] dark:text-[#94a3b8] transform transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-3 w-56 rounded-lg border border-gray-100 bg-white py-2 shadow-lg dark:border-[#3d474e] dark:bg-[#2c2f38] z-50"
                    >
                      {/* Detailed Profile Info Block */}
                      <div className="px-4 py-3 border-b border-gray-100 dark:border-[#3d474e]">
                        <p className="text-xs font-bold text-[#192230] dark:text-white leading-none truncate mb-1">
                          {user.name}
                        </p>
                        <p className="text-[10px] text-gray-400 dark:text-gray-400 truncate mb-2">
                          {user.email}
                        </p>
                        <span className="inline-block px-1.5 py-0.5 text-[9px] font-bold tracking-wider uppercase rounded-sm bg-[#856a26]/10 text-[#856a26] dark:bg-[#ffcd00]/10 dark:text-[#ffcd00]">
                          {userRole}
                        </span>
                      </div>

                      <div className="py-1">
                        <Link
                          href={getDashboardHref(userRole)}
                          className="block px-4 py-2 text-xs font-semibold text-[#3d474e] transition-colors duration-150 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-[#3d474e]/40"
                        >
                          Dashboard
                        </Link>
                      </div>

                      {/* Unified Brand Styled Logout */}
                      <div className="border-t border-gray-100 dark:border-[#3d474e] mt-1 pt-1">
                        <button
                          onClick={handleLogout}
                          className="w-full text-left block px-4 py-2 text-xs font-bold text-[#3d474e] dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#3d474e]/40 transition-colors duration-150"
                        >
                          Logout
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link 
                href="/signin"
                className="rounded-full px-6 py-2.5 text-sm font-semibold tracking-wide transition-all duration-200 bg-[#192230] text-white hover:bg-[#2c2f38] dark:bg-[#ffcd00] dark:text-[#192230] dark:hover:bg-[#ffe066]"
              >
                Sign In
              </Link>
            )}

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
                  onClick={() => setIsOpen(false)}
                  className="block py-2 text-sm font-semibold tracking-wide text-[#3d474e] hover:text-[#192230] dark:text-[#94a3b8] dark:hover:text-white"
                >
                  {link.name}
                </Link>
              ))}
              
              {/* Collapsible Mobile Profile Section */}
              {user && (
                <div className="border-t border-gray-100 pt-4 dark:border-[#2c2f38]">
                  <button
                    onClick={() => setIsMobileDashboardOpen(!isMobileDashboardOpen)}
                    className="flex w-full items-center justify-between py-2.5 text-sm font-semibold tracking-wide text-[#3d474e] dark:text-[#94a3b8] focus:outline-none"
                  >
                    <div className="flex items-center gap-3">
                      {user?.image ? (
                        <img 
                          src={user.image} 
                          alt={user.name} 
                          className="h-8 w-8 rounded-full object-cover border border-gray-200 dark:border-[#2c2f38]" 
                        />
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-[#856a26] text-white dark:bg-[#ffcd00] dark:text-[#192230] flex items-center justify-center font-bold text-xs uppercase shadow-xs">
                          {user?.name ? user.name[0] : 'U'}
                        </div>
                      )}
                      <div className="text-left">
                        <p className="text-sm font-semibold text-[#192230] dark:text-white leading-none">{user?.name}</p>
                        <p className="text-[10px] text-gray-400 font-light mt-1">View Profile & Dashboard</p>
                      </div>
                    </div>
                    <svg 
                      className={`h-4 w-4 transform transition-transform duration-250 text-[#3d474e] dark:text-[#94a3b8] ${isMobileDashboardOpen ? 'rotate-180' : ''}`} 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  <AnimatePresence initial={false}>
                    {isMobileDashboardOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden pl-11 space-y-3 mt-2"
                      >
                        {/* Expandable Profile Info Layer */}
                        <div className="space-y-1">
                          <p className="text-xs text-gray-400">
                            Email: <span className="font-semibold text-[#192230] dark:text-white">{user?.email}</span>
                          </p>
                          <p className="text-xs text-gray-400 flex items-center gap-1.5">
                            Role: 
                            <span className="inline-block px-1.5 py-0.5 text-[9px] font-bold tracking-wider uppercase rounded-sm bg-[#856a26]/10 text-[#856a26] dark:bg-[#ffcd00]/10 dark:text-[#ffcd00]">
                              {userRole}
                            </span>
                          </p>
                        </div>

                        {/* Direct Navigation Path */}
                        <Link 
                          href={getDashboardHref(userRole)}
                          onClick={() => setIsOpen(false)}
                          className="inline-block py-1 text-xs font-bold text-[#856a26] dark:text-[#ffcd00] hover:underline"
                        >
                          Go to Dashboard &rarr;
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* Mobile CTA Options Section */}
              <div className="pt-4 flex items-center justify-between border-t border-gray-100 dark:border-[#2c2f38]">
                {user ? (
                  <button 
                    onClick={handleLogout}
                    className="rounded-full w-2/3 py-2.5 text-sm font-semibold bg-gray-100 text-[#192230] hover:bg-gray-200 dark:bg-[#2c2f38] dark:text-white dark:hover:bg-[#3d474e] transition-colors duration-200"
                  >
                    Logout
                  </button>
                ) : (
                  <Link 
                    href="/signin"
                    onClick={() => setIsOpen(false)}
                    className="rounded-full w-2/3 py-2.5 text-sm font-semibold bg-[#192230] text-white hover:bg-[#2c2f38] dark:bg-[#ffcd00] dark:text-[#192230] dark:hover:bg-[#ffe066] text-center"
                  >
                    Sign In
                  </Link>
                )}
                <button 
                  onClick={toggleTheme} 
                  className="rounded-full p-2.5 bg-gray-50 dark:bg-[#2c2f38] text-[#192230] dark:text-white flex items-center justify-center min-w-10 min-h-10"
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
    </nav>
  );
};

export default Navbar;