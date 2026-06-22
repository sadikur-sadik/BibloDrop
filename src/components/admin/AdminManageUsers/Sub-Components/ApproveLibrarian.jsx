'use client';

import React, { useState, useEffect } from 'react';
import { Modal, Button, Dropdown, Label } from '@heroui/react';

const ApproveLibrarian = ({ user, onStatusChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingStatus, setPendingStatus] = useState(null);

  const statuses = ['approved', 'pending'];
  
  // Aligned to user.status
  const currentStatus = user?.status || 'pending';

  // Clear modal status cache when the dialog closes
  useEffect(() => {
    if (!isModalOpen) {
      setPendingStatus(null);
    }
  }, [isModalOpen]);

  const selectStatus = (status) => {
    if (status !== currentStatus) {
      setPendingStatus(status);
      setIsModalOpen(true);
    }
  };

  const handleConfirmStatusChange = () => {
    if (pendingStatus) {
      onStatusChange(user, pendingStatus);
    }
    setIsModalOpen(false);
  };

  const handleCancelStatusChange = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {/* 
        In HeroUI v3, Dropdown.Trigger acts as the button trigger itself. 
        Applying classes directly to Dropdown.Trigger prevents nested <button> elements,
        resolving the hydration mismatch and allowing the popup positioning to function.
      */}
      <Dropdown>
        <Dropdown.Trigger
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-gray-800 bg-white dark:bg-[#1e2330] hover:bg-slate-50 dark:hover:bg-[#2c3344] text-slate-700 dark:text-slate-200 text-xs font-bold transition-all shadow-sm cursor-pointer outline-none h-auto min-w-0"
        >
          <span>Status</span>
          <svg
            className="w-3.5 h-3.5 text-slate-500 transition-transform duration-200"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </Dropdown.Trigger>

        <Dropdown.Popover className="w-40 rounded-2xl border border-slate-200/80 dark:border-gray-800/80 bg-white/95 dark:bg-[#192230]/95 backdrop-blur-md shadow-xl py-1 z-50">
          <Dropdown.Menu onAction={(key) => selectStatus(String(key))}>
            {statuses.map((status) => (
              <Dropdown.Item
                id={status}
                key={status}
                textValue={status}
                className={`w-full text-left px-3 py-1.5 text-xs font-bold transition-colors cursor-pointer rounded-xl ${
                  currentStatus === status
                    ? 'bg-slate-100 dark:bg-[#2c2f38] text-[#856a26] dark:text-[#ffcd00]'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#252a35]'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <Label className="capitalize">{status}</Label>
                  {currentStatus === status && (
                    <svg className="w-3.5 h-3.5 text-current" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown.Popover>
      </Dropdown>

      {/* Confirmation Modal */}
      <Modal.Backdrop isOpen={isModalOpen} onOpenChange={setIsModalOpen} className="bg-black/50 dark:bg-black/70 backdrop-blur-sm z-50">
        <Modal.Container className="flex items-center justify-center p-4">
          <Modal.Dialog className="w-full max-w-sm rounded-2xl border border-slate-200 dark:border-gray-800 bg-white dark:bg-[#1e2330] p-6 shadow-2xl relative">
            <Modal.CloseTrigger className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors" />
            
            <Modal.Header className="flex items-center gap-3 border-b border-slate-100 dark:border-gray-800/60 pb-3 mb-4">
              <Modal.Icon className="flex items-center justify-center w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-[#ffcd00]">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </Modal.Icon>
              <Modal.Heading className="text-sm font-bold text-slate-900 dark:text-white">
                Confirm Status Change
              </Modal.Heading>
            </Modal.Header>

            <Modal.Body className="text-xs leading-relaxed text-slate-600 dark:text-slate-300 mb-6">
              Are you sure you want to change <strong>{user?.name || 'this librarian'}</strong>'s registration status from{" "}
              <span className="capitalize font-extrabold text-slate-800 dark:text-slate-100">{currentStatus}</span> to{" "}
              <span className="capitalize font-extrabold text-amber-600 dark:text-[#ffcd00]">{pendingStatus}</span>?
            </Modal.Body>

            <Modal.Footer className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-gray-800/60">
              <Button
                onPress={handleCancelStatusChange}
                className="px-3 py-1.5 text-[11px] font-bold rounded-xl border border-slate-200 dark:border-gray-800 bg-white dark:bg-[#1e2330] hover:bg-slate-50 dark:hover:bg-[#2c3344] text-slate-700 dark:text-slate-300 transition-all cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                onPress={handleConfirmStatusChange}
                className="px-3 py-1.5 text-[11px] font-bold rounded-xl bg-amber-600 hover:bg-amber-700 text-white shadow-sm transition-all cursor-pointer"
              >
                Confirm
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </>
  );
};

export default ApproveLibrarian;