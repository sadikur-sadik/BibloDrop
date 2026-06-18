"use client";

import React from 'react';
import Link from 'next/link';

const Footer = () => {
  // SVG Social Icons featuring up-to-date (June 2026) minimalist vector paths
  const socialLinks = [
    {
      name: 'X',
      href: 'https://x.com',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
    },
    {
      name: 'GitHub',
      href: 'https://github.com',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
        </svg>
      ),
    },
  ];

  // Route plans mapping to standard page navigation & dashboard configurations
  const exploreLinks = [
    { name: 'Browse Books', href: '/books' },
    { name: 'New Arrivals', href: '/books?filter=new' },
    { name: 'Partner Libraries', href: '/libraries' },
    { name: 'How It Works', href: '/how-it-works' },
  ];

  const consoleLinks = [
    { name: 'User Profile', href: '/dashboard/profile' },
    { name: 'Borrow Tracker', href: '/dashboard/borrowed' },
    { name: 'Librarian Console', href: '/dashboard/inventory' },
    { name: 'Admin Control', href: '/dashboard/admin' },
  ];

  const supportLinks = [
    { name: 'Help Center', href: '/support' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Contact Delivery', href: '/contact' },
  ];

  return (
    <footer className="w-full  max-w-360 border-t border-gray-100 bg-white text-[#192230] transition-colors duration-300 dark:border-[#2c2f38] dark:bg-[#192230] dark:text-[#FFFFFF]">
      <div className="mx-auto  w-[90%] md:w-[92%] xl:w-[95%] px-6 py-12 lg:px-8 lg:py-16">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">

          {/* Brand Presentation Column */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2">
              {/* Custom SVG bookmark logo matching the Navbar */}
              <div className="text-[#856a26] dark:text-[#ffcd00]">
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
              </div>
              <span className="font-serif text-2xl font-light tracking-wide text-[#192230] dark:text-[#FFFFFF]">
                Biblio<span className="font-extrabold tracking-normal text-[#856a26] dark:text-[#ffcd00]">Drop</span>
              </span>
            </Link>

            {/* Custom concept text centered around BiblioDrop's delivery ecosystem */}
            <p className="max-w-md text-sm leading-relaxed text-[#3d474e] dark:text-[#94a3b8]">
              Democratizing access to books by connecting readers with local libraries and book owners. Request doorstep delivery, manage reading lists, and streamline your borrowing experience seamlessly [1].
            </p>

            {/* Dynamic Social Icons with styled background circles matching your color rules */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 text-[#3d474e] transition-all duration-200 hover:bg-gray-100 dark:bg-[#2c2f38] dark:text-[#94a3b8] dark:hover:bg-[#3d474e] dark:hover:text-white"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Interactive Navigation Grid */}
          <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0 sm:grid-cols-3">

            {/* Explore Column */}
            <div>
              <h3 className="text-xs font-bold tracking-widest text-[#856a26] uppercase dark:text-[#ffcd00]">
                Explore
              </h3>
              <ul role="list" className="mt-4 space-y-3">
                {exploreLinks.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm font-medium text-[#3d474e] hover:text-[#192230] dark:text-[#94a3b8] dark:hover:text-white transition-colors duration-150"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Dashboard Workspace Column */}
            <div>
              <h3 className="text-xs font-bold tracking-widest text-[#856a26] uppercase dark:text-[#ffcd00]">
                Workspace
              </h3>
              <ul role="list" className="mt-4 space-y-3">
                {consoleLinks.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm font-medium text-[#3d474e] hover:text-[#192230] dark:text-[#94a3b8] dark:hover:text-white transition-colors duration-150"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support / Legal Column */}
            <div className="col-span-2 sm:col-span-1">
              <h3 className="text-xs font-bold tracking-widest text-[#856a26] uppercase dark:text-[#ffcd00]">
                Support
              </h3>
              <ul role="list" className="mt-4 space-y-3">
                {supportLinks.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm font-medium text-[#3d474e] hover:text-[#192230] dark:text-[#94a3b8] dark:hover:text-white transition-colors duration-150"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom copyright and metadata line */}
        <div className="mt-12 border-t border-gray-100 pt-8 dark:border-[#2c2f38] text-center sm:flex sm:items-center sm:justify-between">
          <p className="text-xs text-[#3d474e]/70 dark:text-[#94a3b8]/70">
            &copy; 2026 BiblioDrop Platform. All rights reserved.
          </p>
          <p className="mt-4 sm:mt-0 text-xs text-[#3d474e]/40 dark:text-[#94a3b8]/40">
            Democratizing book access, page by page.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;