"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { Sun, Moon, Bell } from '@gravity-ui/icons';
import { useTheme } from 'next-themes';
import { authClient } from '@/lib/auth-client';
import { getNotificationsAPI, markNotificationsAsReadAPI } from '@/lib/fetch/notifications';

// Imported components
import UserMenu from './UserMenu/UserMenu';
import EditProfileModal from './UserMenu/EditProfile';
import NotificationModal from './NotificationModal';

const Navbar = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const pathname = usePathname();
  const { data: session } = authClient.useSession();

  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Notification states
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoadingNotifications, setIsLoadingNotifications] = useState(false);

  const user = session?.user;

  const fetchNotifications = async () => {
    if (!user) return;
    setIsLoadingNotifications(true);
    try {
      const data = await getNotificationsAPI();
      if (data) {
        setNotifications(data.notifications || []);
        setUnreadCount(data.unreadCount || 0);
      }
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    } finally {
      setIsLoadingNotifications(false);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markNotificationsAsReadAPI();
      setUnreadCount(0);
      setNotifications((prev) =>
        prev.map((item) => ({ ...item, isRead: true }))
      );
    } catch (error) {
      console.error("Failed to mark notifications as read:", error);
    }
  };

  // Sync state after mounting to avoid hydration mismatches
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (user) {
      fetchNotifications();
      const interval = setInterval(fetchNotifications, 20000);
      return () => clearInterval(interval);
    }
  }, [user?.id, user?.email]);

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
    <nav className="sticky top-0 mx-auto z-50 w-full max-w-[2560px] 3xl:max-w-[3400px] 4k:max-w-[3840px] border-b border-gray-100 bg-white text-[#192230] transition-colors duration-300 dark:border-[#2c2f38] dark:bg-[#192230] dark:text-[#FFFFFF]">
      {/* Outer bounds & padding scaled up for 1440px, 1920px, 2K, and 4K viewports */}
      <div className="mx-auto w-[92%] xl:w-[95%] px-6 lg:px-8 xl:px-12 2xl:px-16 3xl:px-24 4k:px-32">
        <div className="flex h-20 xl:h-24 2xl:h-28 4k:h-32 items-center justify-between">

          {/* Logo Section - Scaled font and SVG sizing for large displays */}
          <Link href="/" className="group flex items-center gap-2 xl:gap-3 4k:gap-4">
            <motion.div
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="text-[#856a26] dark:text-[#ffcd00]"
            >
              <svg
                className="h-7 w-7 xl:h-8 xl:w-8 2xl:h-9 2xl:w-9 4k:h-11 4k:w-11"
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

            <span className="font-serif text-2xl xl:text-3xl 2xl:text-4xl 4k:text-5xl font-light tracking-wide text-[#192230] transition-colors duration-300 dark:text-[#FFFFFF]">
              Biblio<span className="font-extrabold tracking-normal text-[#856a26] dark:text-[#ffcd00]">Drop</span>
            </span>
          </Link>

          {/* Desktop Navigation - Enhanced spacing and text scale on xl & 2xl viewports */}
          <div className="hidden items-center space-x-8 xl:space-x-10 2xl:space-x-14 4k:space-x-18 md:flex">
            {navLinks.map((link) => {
              const isActive = isRouteActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative py-1 text-sm xl:text-base 2xl:text-lg 4k:text-xl font-semibold tracking-wide transition-colors duration-200 ${isActive
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

            {/* Notification Bell Button (Desktop) */}
            {user && (
              <button
                onClick={() => {
                  fetchNotifications();
                  setIsNotificationModalOpen(true);
                }}
                className="relative rounded-full p-2.5 transition-colors duration-200 hover:bg-gray-100 text-[#192230] dark:hover:bg-[#2c2f38] dark:text-[#FFFFFF] flex items-center justify-center min-w-10 min-h-10 cursor-pointer"
                aria-label="Notifications"
              >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white shadow-xs">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>
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

                <div className="flex items-center gap-2">
                  {user && (
                    <button
                      onClick={() => {
                        closeMobileMenu();
                        fetchNotifications();
                        setIsNotificationModalOpen(true);
                      }}
                      className="relative rounded-full p-2.5 bg-gray-55 dark:bg-[#2c2f38] text-[#192230] dark:text-white flex items-center justify-center min-w-10 min-h-10 cursor-pointer"
                      aria-label="Notifications"
                    >
                      <Bell className="h-5 w-5" />
                      {unreadCount > 0 && (
                        <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white shadow-xs">
                          {unreadCount > 9 ? '9+' : unreadCount}
                        </span>
                      )}
                    </button>
                  )}

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

      {/* Notification Modal */}
      <NotificationModal
        isOpen={isNotificationModalOpen}
        onClose={() => setIsNotificationModalOpen(false)}
        notifications={notifications}
        isLoading={isLoadingNotifications}
        onMarkAllAsRead={handleMarkAllAsRead}
      />
    </nav>
  );
};

export default Navbar;