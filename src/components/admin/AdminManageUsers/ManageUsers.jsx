'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { Table } from '@heroui/react';
import DeleteUserByAdmin from './Sub-Components/Delete';
import ChangeUserRole from './Sub-Components/ChangeRole';
import ApproveLibrarian from './Sub-Components/ApproveLibrarian';
import { approveLibrarian, deleteUser, updateUserRole } from '@/lib/action/action';
import { Bounce, toast } from 'react-toastify';

const ManageUsersByAdmin = ({ users = [] }) => {
  const [localUsers, setLocalUsers] = useState(users);

  useEffect(() => {
    setLocalUsers(users);
  }, [users]);

  // Client-safe ISO Date formatter to prevent Next.js hydration mismatch
  const formatDate = (dateString) => {
    if (!dateString) return '—';
    const [datePart] = dateString.split('T');
    return datePart; // Returns "YYYY-MM-DD" safely on both server and client
  };

  const handleRoleChange = async (user, nextRole) => {
    const previousUsers = [...localUsers];

    setLocalUsers((prevUsers) =>
      prevUsers.map((u) => (u._id === user._id ? { ...u, role: nextRole } : u))
    );

    try {
      const res = await updateUserRole(user._id, nextRole);
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (res?.modifiedCount > 0) {
        toast.success(`Successfully changed the role of "${user.name}" to ${nextRole}.`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      } else {
        toast.info(`No changes were made to "${user.name}".`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      }
    } catch (error) {
      console.error("Failed to update user role:", error);
      setLocalUsers(previousUsers);

      toast.error(`Could not update role for "${user.name}".`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
  };

  const handlestatusChange = async (user, nextStatus) => {
    const previousUsers = [...localUsers];

    // Optimistically update the UI status field
    setLocalUsers((prevUsers) =>
      prevUsers.map((u) => (u._id === user._id ? { ...u, status: nextStatus } : u))
    );

    try {
      const res = await approveLibrarian(user._id, nextStatus);
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (res?.modifiedCount > 0) {
        toast.success(`Successfully set librarian status of "${user.name}" to ${nextStatus}.`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      } else {
        toast.info(`No changes were made to "${user.name}".`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      }
    } catch (error) {
      console.error("Failed to update librarian status:", error);
      setLocalUsers(previousUsers);

      toast.error(`Could not update librarian status for "${user.name}".`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
  };

  const handleDeleteUser = async (user) => {
    const previousUsers = [...localUsers];

    setLocalUsers((prevUsers) => prevUsers.filter((u) => u._id !== user._id));

    try {
      const res = await deleteUser(user._id);

      if (res?.deletedCount > 0) {
        toast.success(`Successfully removed user "${user.name}" from the database.`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      } else {
        toast.error(`Failed to delete "${user.name}".`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
        setLocalUsers(previousUsers);
      }

    } catch (error) {
      console.error("Failed to delete user:", error);
      setLocalUsers(previousUsers);

      toast.error(`Could not delete user "${user.name}".`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
  };

  const getRoleBadge = (role) => {
    switch (role?.toLowerCase()) {
      case 'admin':
        return {
          text: 'Admin',
          className: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
          dotColor: 'bg-rose-500'
        };
      case 'librarian':
        return {
          text: 'Librarian',
          className: 'bg-[#856a26]/10 text-[#856a26] dark:bg-[#ffcd00]/10 dark:text-[#ffcd00] border-[#856a26]/20 dark:border-[#ffcd00]/30',
          dotColor: 'bg-[#856a26] dark:bg-[#ffcd00]'
        };
      default:
        return {
          text: 'Reader',
          className: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
          dotColor: 'bg-blue-500'
        };
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } }
  };

  return (
    <div className="relative w-full bg-transparent text-[#192230] dark:text-white transition-colors duration-300 space-y-6">

      {/* Header section */}
      <div className="border-b border-slate-200/80 dark:border-gray-800/80 pb-6 mb-8">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }} className="text-2xl font-black tracking-tight text-slate-800 dark:text-white">
          System User <span className="text-[#856a26] dark:text-[#ffcd00]"> Governance</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }} className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Review accounts, update administrative permissions, and manage membership profiles.
        </motion.p>
      </div>

      {/* Users queue listing */}
      <div className="relative w-full">
        {localUsers.length === 0 ? (
          <div className="text-center py-16 bg-slate-100/40 dark:bg-[#2c2f38]/10 border border-slate-200/80 dark:border-gray-800/60 rounded-3xl max-w-md mx-auto space-y-2">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }} className="text-sm font-bold text-slate-500 dark:text-slate-400">
              No registered users found.
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }} className="text-xs text-slate-400 dark:text-slate-500">
              The platform currently has zero users registered under this catalog.
            </motion.p>
          </div>
        ) : (
          <>
            {/* Mobile Layout: Responsive cards */}
            <div className="block lg:hidden">
              <AnimatePresence mode="popLayout">
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-4"
                >
                  {localUsers.map((user) => {
                    const roleBadge = getRoleBadge(user.role);

                    return (
                      <motion.div
                        layout
                        variants={itemVariants}
                        key={user._id}
                        className="p-5 rounded-2xl border border-slate-200/80 dark:border-gray-800/80 bg-white/40 dark:bg-[#2c2f38]/20 backdrop-blur-md space-y-4"
                      >
                        <div className="flex items-center gap-4">
                          <div className="relative w-12 h-12 shrink-0">
                            {user.image ? (
                              <Image
                                src={user.image}
                                alt={user.name}
                                fill
                                className="object-cover rounded-full border border-slate-200 dark:border-gray-700"
                                unoptimized
                              />
                            ) : (
                              <div className="w-12 h-12 bg-slate-200 dark:bg-gray-700 rounded-full flex items-center justify-center font-bold text-sm">
                                {user.name?.[0]?.toUpperCase() || 'U'}
                              </div>
                            )}
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-extrabold text-sm leading-tight truncate">{user.name}</h4>
                            <p className="text-xs text-[#3d474e] dark:text-[#9ea7b3] mt-0.5 truncate">{user.email}</p>
                          </div>
                        </div>

                        {/* Card metadata (Responsive) */}
                        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-200/60 dark:border-gray-800/60 text-xs">
                          <div className="space-y-1 font-semibold">
                            <span className="text-slate-400 uppercase tracking-wider text-[10px] font-extrabold block mb-1">Account Role</span>
                            <div className="flex flex-wrap items-center gap-1.5">
                              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${roleBadge.className}`}>
                                <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${roleBadge.dotColor}`} />
                                <span>{roleBadge.text}</span>
                              </span>

                              {/* Librarian Approval Status Badge */}
                              {user.role === 'librarian' && (
                                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold tracking-wider uppercase border ${(user.status || 'pending') === 'approved'
                                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
                                    : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
                                  }`}>
                                  {user.status || 'pending'}
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="space-y-1">
                            <span className="text-slate-400 uppercase tracking-wider text-[10px] font-extrabold block">Joined Date</span>
                            <span className="inline-block text-xs font-semibold text-slate-600 dark:text-slate-400 font-mono mt-1">
                              {formatDate(user.createdAt)}
                            </span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200/60 dark:border-gray-800/60">
                          {user.role === 'librarian' && (
                            <ApproveLibrarian user={user} onStatusChange={handlestatusChange} />
                          )}
                          <ChangeUserRole user={user} onRoleChange={handleRoleChange} />
                          <DeleteUserByAdmin user={user} onDelete={handleDeleteUser} />
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Desktop Layout: Table */}
            <div className="hidden lg:block">
              <Table className="bg-transparent shadow-none">
                <Table.ScrollContainer className="bg-transparent">
                  <Table.Content aria-label="Governance User Database">
                    <Table.Header>
                      <Table.Column isRowHeader className="bg-slate-100 dark:bg-[#2c2f38] text-slate-700 dark:text-slate-200 font-extrabold text-sm py-4 first:rounded-l-2xl last:rounded-r-2xl border-b border-slate-200 dark:border-gray-800">
                        Profile & Details
                      </Table.Column>
                      <Table.Column className="bg-slate-100 dark:bg-[#2c2f38] text-slate-700 dark:text-slate-200 font-extrabold text-sm py-4 border-b border-slate-200 dark:border-gray-800">
                        Email Address
                      </Table.Column>
                      <Table.Column className="bg-slate-100 dark:bg-[#2c2f38] text-slate-700 dark:text-slate-200 font-extrabold text-sm py-4 border-b border-slate-200 dark:border-gray-800">
                        Joined Date
                      </Table.Column>
                      <Table.Column className="bg-slate-100 dark:bg-[#2c2f38] text-slate-700 dark:text-slate-200 font-extrabold text-sm py-4 border-b border-slate-200 dark:border-gray-800">
                        Role Badge & Status
                      </Table.Column>
                      <Table.Column align="end" className="bg-slate-100 dark:bg-[#2c2f38] text-slate-700 dark:text-slate-200 font-extrabold text-sm py-4 first:rounded-l-2xl last:rounded-r-2xl border-b border-slate-200 dark:border-gray-800 text-right">
                        Administrative Authority
                      </Table.Column>
                    </Table.Header>

                    <Table.Body>
                      {localUsers.map((user, idx) => {
                        const roleBadge = getRoleBadge(user.role);

                        return (
                          <Table.Row
                            key={user._id}
                            className="hover:bg-slate-100/40 dark:hover:bg-[#2c2f38]/20 transition-colors border-b border-slate-200/60 dark:border-gray-800/60 last:border-0"
                          >
                            <Table.Cell className="py-4">
                              <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.03, type: "spring", stiffness: 120 }}
                                className="flex items-center gap-3"
                              >
                                <div className="relative w-10 h-10 shrink-0">
                                  {user.image ? (
                                    <Image
                                      src={user.image}
                                      alt={user.name}
                                      fill
                                      className="object-cover rounded-full border border-slate-200 dark:border-gray-800"
                                      unoptimized
                                    />
                                  ) : (
                                    <div className="w-10 h-10 bg-slate-200 dark:bg-gray-800 rounded-full flex items-center justify-center font-bold text-xs">
                                      {user.name?.[0]?.toUpperCase() || 'U'}
                                    </div>
                                  )}
                                </div>
                                <span className="font-extrabold text-sm">{user.name}</span>
                              </motion.div>
                            </Table.Cell>

                            <Table.Cell className="py-4 text-[#3d474e] dark:text-[#9ea7b3] text-sm">
                              {user.email}
                            </Table.Cell>

                            <Table.Cell className="py-4 text-xs font-mono text-slate-500 dark:text-slate-400">
                              {formatDate(user.createdAt)}
                            </Table.Cell>

                            <Table.Cell className="py-4">
                              <div className="flex items-center gap-2">
                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${roleBadge.className}`}>
                                  <span className={`w-2 h-2 rounded-full shrink-0 ${roleBadge.dotColor}`} />
                                  <span>{roleBadge.text}</span>
                                </span>

                                {/* Librarian Approval Status Badge */}
                                {user.role === 'librarian' && (
                                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold tracking-wider uppercase border ${(user.status || 'pending') === 'approved'
                                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
                                      : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
                                    }`}>
                                    {user.status || 'pending'}
                                  </span>
                                )}
                              </div>
                            </Table.Cell>

                            <Table.Cell className="py-4 text-right">
                              <div className="flex items-center justify-end gap-2.5">
                                {user.role === 'librarian' && (
                                  <ApproveLibrarian user={user} onStatusChange={handlestatusChange} />
                                )}
                                <ChangeUserRole user={user} onRoleChange={handleRoleChange} />
                                <DeleteUserByAdmin user={user} onDelete={handleDeleteUser} />
                              </div>
                            </Table.Cell>
                          </Table.Row>
                        );
                      })}
                    </Table.Body>
                  </Table.Content>
                </Table.ScrollContainer>
                <Table.Footer className="hidden" />
              </Table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ManageUsersByAdmin;