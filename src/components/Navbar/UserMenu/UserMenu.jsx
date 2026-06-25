"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { authClient } from '@/lib/auth-client';

const UserMenu = ({ variant, onCloseMobileMenu, onOpenEditModal }) => {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileDashboardOpen, setIsMobileDashboardOpen] = useState(false);

  const user = session?.user;
  const userRole = user?.role || 'reader';

  const getDashboardHref = (role) => {
    if (role === 'admin') return '/dashboard/admin/overview';
    if (role === 'librarian') return '/dashboard/librarian/overview';
    return '/dashboard/reader/overview';
  };

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          setIsProfileOpen(false);
          setIsMobileDashboardOpen(false);
          if (onCloseMobileMenu) {
            onCloseMobileMenu();
          }
          router.push('/signin');
        }
      }
    });
  };

  return (
    <>
      {/* Variant 1: Desktop User Option / Profile Dropdown */}
      {variant === 'desktop' && (
        !user ? (
          <Link 
            href="/signin"
            className="rounded-full px-6 py-2.5 text-sm font-semibold tracking-wide transition-all duration-200 bg-[#192230] text-white hover:bg-[#2c2f38] dark:bg-[#ffcd00] dark:text-[#192230] dark:hover:bg-[#ffe066]"
          >
            Sign In
          </Link>
        ) : (
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              onBlur={() => setTimeout(() => setIsProfileOpen(false), 200)}
              className="flex items-center gap-2 focus:outline-none cursor-pointer"
            >
              {user?.image ? (
                <div className="relative h-8 w-8 rounded-full overflow-hidden border border-gray-100 dark:border-[#2c2f38]">
                  <Image 
                    src={user.image} 
                    alt={user?.name || "User profile"} 
                    width={32}
                    height={32}
                    unoptimized
                    className="object-cover" 
                  />
                </div>
              ) : (
                <div className="h-8 w-8 rounded-full bg-[#856a26] text-white dark:bg-[#ffcd00] dark:text-[#192230] flex items-center justify-center font-bold text-xs uppercase shadow-xs">
                  {user?.name ? user.name[0] : 'U'}
                </div>
              )}
              <span className="hidden lg:block text-sm font-semibold tracking-wide text-[#3d474e] dark:text-[#94a3b8] hover:text-[#192230] dark:hover:text-white transition-colors">
                {user?.name}
              </span>
              <svg className={`h-4 w-4 text-[#3d474e] dark:text-[#94a3b8] transform transition-transform duration-250 ${isProfileOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                  <div className="px-4 py-3 border-b border-gray-100 dark:border-[#3d474e]">
                    <p className="text-xs font-bold text-[#192230] dark:text-white leading-none truncate mb-1">
                      {user?.name}
                    </p>
                    <p className="text-[10px] text-gray-400 dark:text-gray-400 truncate mb-2">
                      {user?.email}
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
                    <button
                      onMouseDown={(e) => {
                        e.preventDefault();
                        if (onOpenEditModal) onOpenEditModal();
                        setIsProfileOpen(false);
                      }}
                      className="w-full text-left block px-4 py-2 text-xs font-semibold text-[#3d474e] transition-colors duration-150 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-[#3d474e]/40 cursor-pointer"
                    >
                      Edit Profile
                    </button>
                  </div>

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
        )
      )}

      {/* Variant 2: Mobile Profile Accordion */}
      {variant === 'mobile-profile' && user && (
        <div className="border-t border-gray-100 pt-4 dark:border-[#2c2f38]">
          <button
            onClick={() => setIsMobileDashboardOpen(!isMobileDashboardOpen)}
            className="flex w-full items-center justify-between py-2.5 text-sm font-semibold tracking-wide text-[#3d474e] dark:text-[#94a3b8] focus:outline-none"
          >
            <div className="flex items-center gap-3">
              {user?.image ? (
                <div className="relative h-8 w-8 rounded-full overflow-hidden border border-gray-200 dark:border-[#2c2f38]">
                  <Image 
                    src={user.image} 
                    alt={user?.name || "User profile"} 
                    width={32}
                    height={32}
                    unoptimized
                    className="object-cover" 
                  />
                </div>
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

                <div className="flex gap-4">
                  <Link 
                    href={getDashboardHref(userRole)}
                    onClick={onCloseMobileMenu}
                    className="inline-block py-1 text-xs font-bold text-[#856a26] dark:text-[#ffcd00] hover:underline"
                  >
                    Go to Dashboard &rarr;
                  </Link>
                  <button 
                    onClick={() => {
                      if (onOpenEditModal) onOpenEditModal();
                      if (onCloseMobileMenu) onCloseMobileMenu();
                    }}
                    className="inline-block py-1 text-xs font-bold text-[#3d474e] dark:text-gray-300 hover:underline cursor-pointer"
                  >
                    Edit Profile
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Variant 3: Mobile CTA (Sign In / Logout Button) */}
      {variant === 'mobile-cta' && (
        user ? (
          <button 
            onClick={handleLogout}
            className="rounded-full w-2/3 py-2.5 text-sm font-semibold bg-gray-100 text-[#192230] hover:bg-gray-200 dark:bg-[#2c2f38] dark:text-white dark:hover:bg-[#3d474e] transition-colors duration-200"
          >
            Logout
          </button>
        ) : (
          <Link 
            href="/signin"
            onClick={onCloseMobileMenu}
            className="rounded-full w-2/3 py-2.5 text-sm font-semibold bg-[#192230] text-white hover:bg-[#2c2f38] dark:bg-[#ffcd00] dark:text-[#192230] dark:hover:bg-[#ffe066] text-center"
          >
            Sign In
          </Link>
        )
      )}
    </>
  );
};

export default UserMenu;