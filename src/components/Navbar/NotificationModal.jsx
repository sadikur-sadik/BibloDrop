"use client";

import React from "react";
import Link from "next/link";
import { Modal, Button } from "@heroui/react";
import { Bell } from "@gravity-ui/icons";

export default function NotificationModal({
  isOpen,
  onClose,
  notifications = [],
  isLoading,
  onMarkAllAsRead,
}) {
  return (
    <Modal isOpen={isOpen} onOpenChange={onClose}>
      <Modal.Backdrop isOpen={isOpen} onOpenChange={onClose} className="bg-black/60 backdrop-blur-xs transition-all z-50">
        <Modal.Container placement="center" className="p-4 flex items-center justify-center">
          <Modal.Dialog className="max-w-md w-full bg-white dark:bg-[#192230] text-[#192230] dark:text-white rounded-2xl border border-slate-200 dark:border-gray-800 shadow-2xl p-6 outline-hidden transition-colors duration-300">
            <Modal.CloseTrigger 
              onPress={onClose}
              className="absolute top-4 right-4 p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-[#2c2f38] text-slate-400 transition-colors cursor-pointer"
            />
            <Modal.Header className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-gray-800">
              <Modal.Icon>
                <Bell className="w-5 h-5 text-primary text-[#856a26] dark:text-[#ffcd00]" />
              </Modal.Icon>
              <Modal.Heading className="text-lg font-bold">Notifications</Modal.Heading>
            </Modal.Header>
            <Modal.Body className="space-y-3 max-h-[350px] overflow-y-auto my-4 pr-1">
              {isLoading ? (
                <div className="text-center py-6 text-sm text-gray-500">Loading notifications...</div>
              ) : notifications.length === 0 ? (
                <p className="text-center text-gray-500 py-4">No recent notifications</p>
              ) : (
                notifications.slice(0, 5).map((item) => {
                  const content = (
                    <div
                      className={`p-3 rounded-lg transition-all ${
                        item.link ? 'cursor-pointer hover:scale-[1.01]' : ''
                      } ${
                        item.isRead
                          ? 'bg-default-100 bg-slate-100 dark:bg-[#252a35] opacity-80'
                          : 'bg-primary-50 bg-amber-500/10 border-l-4 border-primary border-[#856a26] dark:border-[#ffcd00]'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <h4 className="font-semibold text-sm text-slate-800 dark:text-slate-100">{item.title}</h4>
                        <span className="text-xs text-gray-400 ml-2 whitespace-nowrap">
                          {item.createdAt
                            ? new Date(item.createdAt).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                              })
                            : ''}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">{item.message}</p>
                    </div>
                  );

                  return item.link ? (
                    <Link key={item._id || item.id} href={item.link} onClick={onClose} className="block">
                      {content}
                    </Link>
                  ) : (
                    <React.Fragment key={item._id || item.id}>
                      {content}
                    </React.Fragment>
                  );
                })
              )}
            </Modal.Body>
            <Modal.Footer className="flex justify-end pt-3 border-t border-slate-100 dark:border-gray-800">
              <Button
                onClick={onMarkAllAsRead}
                size="sm"
                variant="flat"
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-[#2c2f38] dark:hover:bg-[#383d4a] text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
              >
                Mark all as read
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
