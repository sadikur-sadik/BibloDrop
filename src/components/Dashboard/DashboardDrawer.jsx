"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Drawer } from "@heroui/react";

// --- COMMENTED OUT SESSION IMPORT ---
// import { authClient } from "@/lib/auth-client";

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
import { authClient } from "@/lib/auth-client";

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

  // ========================================================
  // SESSION DATA (Commented out for easy offline/local mock testing)
  // ========================================================
  
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const userRole = user?.role || "reader";
  
  const getLinkClass = (href) => {
    const isActive = pathname === href;
    return `flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold transition-all w-full border-l-4 ${
      isActive
        ? "bg-slate-200/80 dark:bg-[#2c2f38] text-[#192230] dark:text-[#ffcd00] border-[#856a26] dark:border-[#ffcd00] shadow-sm"
        : "text-[#3d474e] dark:text-[#9ea7b3] hover:text-[#192230] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#2c2f38]/40 border-transparent"
    }`;
  };

  // Select navigation set depending on current role
  const navSections = userRole === "admin"
    ? ADMIN_NAV
    : userRole === "librarian"
      ? LIBRARIAN_NAV
      : READER_NAV;

  const renderSidebarContent = () => (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-[#192230] text-[#192230] dark:text-white p-6 border-r border-slate-200 dark:border-gray-800/80 w-64 shrink-0 transition-colors duration-300">
      {/* Brand Header */}
      <div className="mb-8 px-2">
        <h1 className="text-2xl font-black tracking-tight select-none text-[#192230] dark:text-white">
          Biblio<span className="text-[#856a26] dark:text-[#ffcd00]">Drop</span>
        </h1>
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
              const isActive = pathname === link.href;
              return (
                <Link
                  key={linkIdx}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={getLinkClass(link.href)}
                >
                  <IconComponent 
                    className={`w-5 h-5 transition-colors duration-200 ${
                      isActive ? "text-[#856a26] dark:text-[#ffcd00]" : "text-[#3d474e] dark:text-[#9ea7b3]"
                    }`} 
                  />
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
      {/* DESKTOP SIDEBAR */}
      <aside className="hidden md:block h-screen sticky top-0 z-40 shrink-0">
        {renderSidebarContent()}
      </aside>

      {/* MOBILE DRAWER */}
      <div className="md:hidden p-4">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="p-2.5 text-[#3d474e] dark:text-neutral-400 hover:text-[#192230] dark:hover:text-white bg-white dark:bg-[#192230] border border-slate-200 dark:border-gray-800 rounded-xl transition-all shadow-sm cursor-pointer"
        >
          <LayoutSideContent width={22} height={22} />
        </button>

        <Drawer isOpen={isOpen} onOpenChange={setIsOpen}>
          <Drawer.Backdrop variant="blur" />
          <Drawer.Content placement="left" className="p-0 border-0 bg-transparent h-full max-w-65">
            <Drawer.Dialog className="h-full bg-slate-50 dark:bg-[#192230] focus-visible:outline-none outline-none border-0">
              <Drawer.CloseTrigger
                onClick={() => setIsOpen(false)}
                className="absolute top-4 -right-10 text-[#3d474e] dark:text-neutral-400 hover:text-[#192230] dark:hover:text-white z-50 bg-slate-50 dark:bg-[#192230] border border-slate-200 dark:border-gray-800 p-2 rounded-full shadow-sm transition-all"
              />
              {renderSidebarContent()}
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer>
      </div>
    </>
  );
};

export default DashboardDrawer;