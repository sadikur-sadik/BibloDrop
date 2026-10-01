"use client";

// Keys helper for localStorage
const getSavedKey = (userId) => `bibliodrop_saved_comments_${userId || 'guest'}`;
const getLikedKey = (userId) => `bibliodrop_liked_comments_${userId || 'guest'}`;

/**
 * Get all saved comments for a user
 */
export const getSavedComments = (userId) => {
  if (typeof window === 'undefined' || !userId) return [];
  try {
    const data = localStorage.getItem(getSavedKey(userId));
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error("Failed to read saved comments:", err);
    return [];
  }
};

/**
 * Check if a specific comment is saved
 */
export const isCommentSaved = (userId, commentId) => {
  if (typeof window === 'undefined' || !userId || !commentId) return false;
  const list = getSavedComments(userId);
  return list.some(item => item._id === commentId);
};

/**
 * Save or remove a comment for a user
 * Returns true if now saved, false if removed
 */
export const toggleSaveComment = (userId, comment) => {
  if (typeof window === 'undefined' || !userId || !comment?._id) return false;
  
  const currentList = getSavedComments(userId);
  const existsIndex = currentList.findIndex(item => item._id === comment._id);
  
  let updatedList = [];
  let isNowSaved = false;

  if (existsIndex >= 0) {
    // Remove comment
    updatedList = currentList.filter(item => item._id !== comment._id);
    isNowSaved = false;
  } else {
    // Add comment with saved timestamp
    updatedList = [
      {
        ...comment,
        savedAt: new Date().toISOString()
      },
      ...currentList
    ];
    isNowSaved = true;
  }

  try {
    localStorage.setItem(getSavedKey(userId), JSON.stringify(updatedList));
    window.dispatchEvent(new CustomEvent('saved_comments_updated', { detail: { userId, commentId: comment._id, isSaved: isNowSaved } }));
  } catch (err) {
    console.error("Failed to save comment:", err);
  }

  return isNowSaved;
};

/**
 * Get liked comment IDs for a user
 */
export const getLikedCommentIds = (userId) => {
  if (typeof window === 'undefined' || !userId) return [];
  try {
    const data = localStorage.getItem(getLikedKey(userId));
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error("Failed to read liked comments:", err);
    return [];
  }
};

/**
 * Check if a comment is liked
 */
export const isCommentLiked = (userId, commentId) => {
  if (typeof window === 'undefined' || !userId || !commentId) return false;
  const list = getLikedCommentIds(userId);
  return list.includes(commentId);
};

/**
 * Toggle liked state for a comment
 * Returns true if now liked, false if unliked
 */
export const toggleLikeComment = (userId, commentId) => {
  if (typeof window === 'undefined' || !userId || !commentId) return false;
  
  const currentLikes = getLikedCommentIds(userId);
  const exists = currentLikes.includes(commentId);
  
  let updatedLikes = [];
  let isNowLiked = false;

  if (exists) {
    updatedLikes = currentLikes.filter(id => id !== commentId);
    isNowLiked = false;
  } else {
    updatedLikes = [...currentLikes, commentId];
    isNowLiked = true;
  }

  try {
    localStorage.setItem(getLikedKey(userId), JSON.stringify(updatedLikes));
    window.dispatchEvent(new CustomEvent('liked_comments_updated', { detail: { userId, commentId, isLiked: isNowLiked } }));
  } catch (err) {
    console.error("Failed to update liked comment:", err);
  }

  return isNowLiked;
};
