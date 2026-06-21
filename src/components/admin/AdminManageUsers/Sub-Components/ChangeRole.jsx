'use client';

import React, { useState, useEffect } from 'react';
import { Modal, Button, Dropdown, Label } from '@heroui/react';

const ChangeUserRole = ({ user, onRoleChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingRole, setPendingRole] = useState(null);

  const roles = ['reader', 'librarian', 'admin'];

  // Safely clear pending role state when the modal closes
  useEffect(() => {
    if (!isModalOpen) {
      setPendingRole(null);
    }
  }, [isModalOpen]);

  const selectRole = (role) => {
    if (role !== user.role) {
      setPendingRole(role);
      setIsModalOpen(true);
    }
  };

  const handleConfirmRoleChange = () => {
    if (pendingRole) {
      onRoleChange(user, pendingRole);
    }
    setIsModalOpen(false);
  };

  const handleCancelRoleChange = () => {
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
          <span>Change Role</span>
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
          <Dropdown.Menu onAction={(key) => selectRole(String(key))}>
            {roles.map((role) => (
              <Dropdown.Item
                id={role}
                key={role}
                textValue={role}
                className={`w-full text-left px-3 py-1.5 text-xs font-bold transition-colors cursor-pointer rounded-xl ${
                  user.role === role
                    ? 'bg-slate-100 dark:bg-[#2c2f38] text-[#856a26] dark:text-[#ffcd00]'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#252a35]'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <Label className="capitalize">{role}</Label>
                  {user.role === role && (
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
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </Modal.Icon>
              <Modal.Heading className="text-sm font-bold text-slate-900 dark:text-white">
                Confirm Role Change
              </Modal.Heading>
            </Modal.Header>

            <Modal.Body className="text-xs leading-relaxed text-slate-600 dark:text-slate-300 mb-6">
              Are you sure you want to change <strong>{user?.name || 'this user'}</strong>'s role from{" "}
              <span className="capitalize font-extrabold text-slate-800 dark:text-slate-100">{user?.role}</span> to{" "}
              <span className="capitalize font-extrabold text-amber-600 dark:text-[#ffcd00]">{pendingRole}</span>?
            </Modal.Body>

            <Modal.Footer className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-gray-800/60">
              <Button
                onPress={handleCancelRoleChange}
                className="px-3 py-1.5 text-[11px] font-bold rounded-xl border border-slate-200 dark:border-gray-800 bg-white dark:bg-[#1e2330] hover:bg-slate-50 dark:hover:bg-[#2c3344] text-slate-700 dark:text-slate-300 transition-all cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                onPress={handleConfirmRoleChange}
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

export default ChangeUserRole;