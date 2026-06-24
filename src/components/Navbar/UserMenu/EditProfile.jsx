"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { authClient } from '@/lib/auth-client';
import { Bounce, toast } from 'react-toastify';

const EditProfileModal = ({ isOpen, onClose, user }) => {
  const [editName, setEditName] = useState('');
  const [editImage, setEditImage] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState('');
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    if (user) {
      setEditName(user.name || '');
      setEditImage(user.image || '');
    }
  }, [user]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    setUpdateError('');
    setUpdateSuccess(false);

    try {
      await authClient.updateUser({
        name: editName,
        image: editImage,
      });
      setUpdateSuccess(true);
      toast.success("Profile updated successfully!", {
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
    } catch (err) {
      const errMsg = err.message || 'Failed to update profile';
      setUpdateError(errMsg);
      toast.error(errMsg, {
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
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <>
      {isOpen && user && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-md rounded-xl border border-gray-100 bg-white p-6 shadow-xl dark:border-[#3d474e] dark:bg-[#2c2f38] max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-[#192230] dark:text-white">Profile Settings</h3>
              <button 
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Profile Update Section */}
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <h4 className="text-sm font-bold text-[#192230] dark:text-white mb-2">Edit Details</h4>
              {updateError && (
                <div className="text-xs font-semibold text-red-500 bg-red-50 dark:bg-red-950/20 p-2.5 rounded">
                  {updateError}
                </div>
              )}
              {updateSuccess && (
                <div className="text-xs font-semibold text-green-600 bg-green-50 dark:bg-green-950/20 p-2.5 rounded">
                  Profile updated successfully.
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm text-[#192230] bg-white dark:border-[#3d474e] dark:bg-[#192230] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#856a26] dark:focus:ring-[#ffcd00]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                  Profile Image URL
                </label>
                <input
                  type="url"
                  value={editImage}
                  onChange={(e) => setEditImage(e.target.value)}
                  placeholder="https://example.com/avatar.jpg"
                  className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm text-[#192230] bg-white dark:border-[#3d474e] dark:bg-[#192230] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#856a26] dark:focus:ring-[#ffcd00]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-bold rounded-md border border-gray-200 text-gray-500 hover:bg-gray-50 dark:border-[#3d474e] dark:text-gray-300 dark:hover:bg-[#3d474e]/40 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="px-4 py-2 text-xs font-bold rounded-md bg-[#192230] text-white hover:bg-[#2c2f38] dark:bg-[#ffcd00] dark:text-[#192230] dark:hover:bg-[#ffe066] disabled:opacity-50 transition-colors"
                >
                  {isUpdating ? 'Saving...' : 'Save Profile'}
                </button>
              </div>
            </form>
        
          </motion.div>
        </div>
      )}
    </>
  );
};

export default EditProfileModal;