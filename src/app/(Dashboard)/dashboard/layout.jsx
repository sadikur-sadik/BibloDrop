import DashboardDrawer from '@/components/Dashboard/DashboardDrawer';
import React from 'react';

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex flex-col max-w-360 mx-auto md:flex-row min-h-screen bg-slate-100 dark:bg-[#12141c] transition-colors duration-300">
      {/* Sidebar & Mobile Drawer Navigation */}
      <DashboardDrawer />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        <div className="flex-1 p-4 md:p-8 lg:p-10 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;