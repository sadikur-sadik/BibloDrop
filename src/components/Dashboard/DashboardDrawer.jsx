"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Valid Gravity UI Icons mapped to BiblioDrop actions
import {
  House,
  Book,
  BookOpen,
  Clock,
  Comment,
  Plus,
  ListTimeline,
  ShieldCheck,
  Persons,
  CardDiamond,
  LayoutSideContent
} from "@gravity-ui/icons";

const DEFAULT_AVATAR = "https://plus.unsplash.com/premium_photo-1732668021815-9129fdb798d1?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

// ========================================================
// 1. READER NAVIGATION
// ========================================================
const READER_NAV = [
  {
    title: "Overview",
    links: [
      { href: "/dashboard/reader/overview", label: "Overview", icon: House },
    ],
  },
  {
    title: "My Activity",
    links: [
      { href: "/dashboard/reader/delivery-history", label: "Delivery History", icon: Clock },
      { href: "/dashboard/reader/reading-list", label: "My Reading List", icon: BookOpen },
      { href: "/dashboard/reader/reviews", label: "My Reviews", icon: Comment },
    ],
  },
];

// ========================================================
// 2. LIBRARIAN NAVIGATION
// ========================================================
const LIBRARIAN_NAV = [
  {
    title: "Overview",
    links: [
      { href: "/dashboard/librarian/overview", label: "Overview", icon: House },
    ],
  },
  {
    title: "Cataloging",
    links: [
      { href: "/dashboard/librarian/add-book", label: "Add Book", icon: Plus },
      { href: "/dashboard/librarian/manage-inventory", label: "Manage Inventory", icon: ListTimeline },
    ],
  },
  {
    title: "Operations",
    links: [
      { href: "/dashboard/librarian/manage-deliveries", label: "Manage Deliveries", icon: Clock },
    ],
  },
];

// ========================================================
// 3. ADMIN NAVIGATION
// ========================================================
const ADMIN_NAV = [
  {
    title: "Overview",
    links: [
      { href: "/dashboard/admin/overview", label: "Overview", icon: House },
    ],
  },
  {
    title: "Moderation",
    links: [
      { href: "/dashboard/admin/approvals", label: "Approval Queue", icon: ShieldCheck },
    ],
  },
  {
    title: "System Management",
    links: [
      { href: "/dashboard/admin/manage-users", label: "Manage Users", icon: Persons },
      { href: "/dashboard/admin/manage-books", label: "Manage All Books", icon: Book },
      { href: "/dashboard/admin/manage-transactions", label: "All Transactions", icon: CardDiamond },
    ],
  },
];

const DashboardDrawer = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Fallback state if authClient session isn't loaded/mocked
  const user = { name: "Sadikur Sadik", role: "librarian", image: null };
  const userRole = user.role;

  // 1. Auto-close the menu whenever the route (pathname) changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // 2. Prevent body scroll when the mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);
  
  const getLinkClass = (href) => {
    const isActive = pathname === href;
    return `flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold transition-all w-full border-l-4 ${
      isActive
        ? "bg-slate-200/80 dark:bg-[#2c2f38] text-[#192230] dark:text-[#ffcd00] border-[#856a26] dark:border-[#ffcd00] shadow-sm"
        : "text-[#3d474e] dark:text-[#9ea7b3] hover:text-[#192230] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#2c2f38]/40 border-transparent"
    }`;
  };

  const navSections = userRole === "admin"
    ? ADMIN_NAV
    : userRole === "librarian"
      ? LIBRARIAN_NAV
      : READER_NAV;

  const renderSidebarContent = (onClose) => (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-[#192230] text-[#192230] dark:text-white p-6 border-r border-slate-200 dark:border-gray-800/80 w-64 shrink-0 transition-colors duration-300">
      {/* Brand Header */}
      <div className="flex items-center justify-between mb-8 px-2">
        <h1 className="text-2xl font-black tracking-tight select-none text-[#192230] dark:text-white">
          Biblio<span className="text-[#856a26] dark:text-[#ffcd00]">Drop</span>
        </h1>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="md:hidden p-1.5 rounded-lg text-slate-500 hover:bg-slate-200/50 dark:hover:bg-[#2c2f38] transition cursor-pointer"
            aria-label="Close menu"
          >
            ✕
          </button>
        )}
      </div>

      {/* Profile Card Panel */}
      <div className="flex items-center gap-3.5 p-3.5 bg-white dark:bg-[#2c2f38]/60 rounded-2xl border border-slate-200 dark:border-gray-800 shadow-sm mb-8 transition-colors duration-300">
        <div className="relative h-10 w-10 rounded-full bg-slate-200 dark:bg-[#192230] border border-slate-300 dark:border-gray-800 overflow-hidden flex items-center justify-center shrink-0">
          <Image
            src={user?.image || DEFAULT_AVATAR}
            alt={user?.name || "User Profile"}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-sm font-extrabold truncate text-[#192230] dark:text-slate-100">
            {user?.name || "User Name"}
          </span>
          <span className={`text-[10px] uppercase font-black tracking-wider px-2 py-0.5 rounded w-max mt-1 ${
            userRole === "admin"
              ? "text-rose-600 bg-rose-500/10 dark:text-rose-400"
              : userRole === "librarian"
                ? "text-amber-600 bg-amber-500/10 dark:text-amber-400"
                : "text-emerald-600 bg-emerald-500/10 dark:text-emerald-400"
          }`}>
            {userRole === "admin" ? "Admin" : userRole === "librarian" ? "Librarian" : "Reader"}
          </span>
        </div>
      </div>

      {/* Sidebar Navigation */}
      <nav className="flex-1 space-y-6 overflow-y-auto pr-1 hidden-scrollbar">
        {navSections.map((section, sectionIdx) => (
          <div key={sectionIdx} className="space-y-1.5">
            <p className="text-[10px] font-black text-[#3d474e]/60 dark:text-[#9ea7b3]/40 uppercase tracking-widest px-4 mb-2 select-none">
              {section.title}
            </p>
            {section.links.map((link, linkIdx) => {
              const IconComponent = link.icon;
              return (
                <Link
                  key={linkIdx}
                  href={link.href}
                  className={getLinkClass(link.href)}
                >
                  <IconComponent className="w-5 h-5 text-[#3d474e] dark:text-[#9ea7b3]" />
                  {link.label}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>
    </div>
  );

  return (
    <>
      {/* DESKTOP SIDEBAR - Always visible on >= md, completely static and non-blocking */}
      <aside className="hidden md:block h-screen sticky top-0 z-40 shrink-0">
        {renderSidebarContent()}
      </aside>

      {/* MOBILE HEADER & DRAWER SYSTEM - Visible only on < md */}
      <div className="md:hidden p-4">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="p-2.5 text-[#3d474e] dark:text-neutral-400 hover:text-[#192230] dark:hover:text-white bg-white dark:bg-[#192230] border border-slate-200 dark:border-gray-800 rounded-xl transition-all shadow-sm cursor-pointer"
        >
          <LayoutSideContent width={22} height={22} />
        </button>

        {/* Backdrop Overlay */}
        <div 
          onClick={() => setIsOpen(false)}
          className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity duration-300 ease-in-out ${
            isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        />

        {/* Drawer Container Panel */}
        <div 
          className={`fixed top-0 left-0 bottom-0 z-50 w-64 bg-slate-50 dark:bg-[#192230] shadow-2xl transform transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {renderSidebarContent(() => setIsOpen(false))}
        </div>
      </div>
    </>
  );
};

export default DashboardDrawer;