"use client";

// Keys helper for localStorage
const getSavedKey = (userId) => `bibliodrop_saved_comments_${userId || 'guest'}`;
const getLikedKey = (userId) => `bibliodrop_liked_comments_${userId || 'guest'}`;
const getDislikedKey = (userId) => `bibliodrop_disliked_comments_${userId || 'guest'}`;
const GET_COUNTS_KEY = `bibliodrop_comment_counts_map`;

/**
 * Get all stored comment counts map: { [commentId]: { likes: number, dislikes: number } }
 */
export const getCommentCountsMap = () => {
  if (typeof window === 'undefined') return {};
  try {
    const data = localStorage.getItem(GET_COUNTS_KEY);
    return data ? JSON.parse(data) : {};
  } catch (err) {
    console.error("Failed to read comment counts map:", err);
    return {};
  }
};

/**
 * Get specific counts for a comment ID
 */
export const getCommentCounts = (commentId, defaultLikes = 0, defaultDislikes = 0) => {
  if (!commentId) return { likes: defaultLikes, dislikes: defaultDislikes };
  const map = getCommentCountsMap();
  const entry = map[commentId];
  return {
    likes: entry && typeof entry.likes === 'number' ? entry.likes : defaultLikes,
    dislikes: entry && typeof entry.dislikes === 'number' ? entry.dislikes : defaultDislikes,
  };
};

/**
 * Update counts map in localStorage and sync with any saved comments
 */
export const updateCommentCountsMap = (userId, commentId, likes, dislikes) => {
  if (typeof window === 'undefined' || !commentId) return;
  
  // 1. Update counts map
  const map = getCommentCountsMap();
  map[commentId] = { likes: Math.max(0, likes), dislikes: Math.max(0, dislikes) };
  try {
    localStorage.setItem(GET_COUNTS_KEY, JSON.stringify(map));
  } catch (err) {
    console.error("Failed to save comment counts map:", err);
  }

  // 2. Update in saved comments list if user is logged in and has this comment saved
  if (userId) {
    const savedList = getSavedComments(userId);
    const existingIndex = savedList.findIndex(item => (item._id || item.id) === commentId);
    if (existingIndex >= 0) {
      savedList[existingIndex] = {
        ...savedList[existingIndex],
        helpfulCount: Math.max(0, likes),
        likes: Math.max(0, likes),
        dislikes: Math.max(0, dislikes),
      };
      try {
        localStorage.setItem(getSavedKey(userId), JSON.stringify(savedList));
      } catch (err) {
        console.error("Failed to update saved comment counts:", err);
      }
    }
  }

  // 3. Dispatch event for real-time UI updates
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('comment_counts_updated', {
      detail: { commentId, likes: Math.max(0, likes), dislikes: Math.max(0, dislikes) }
    }));
  }
};

/**
 * Get all saved comments for a user with persisted like counts merged
 */
export const getSavedComments = (userId) => {
  if (typeof window === 'undefined' || !userId) return [];
  try {
    const data = localStorage.getItem(getSavedKey(userId));
    if (!data) return [];
    const parsed = JSON.parse(data);
    const countsMap = getCommentCountsMap();
    return parsed.map(item => {
      const id = item._id || item.id;
      const count = countsMap[id];
      const baseLikes = item.helpfulCount ?? item.likes ?? 0;
      const baseDislikes = item.dislikes ?? 0;
      return {
        ...item,
        helpfulCount: count && typeof count.likes === 'number' ? count.likes : baseLikes,
        likes: count && typeof count.likes === 'number' ? count.likes : baseLikes,
        dislikes: count && typeof count.dislikes === 'number' ? count.dislikes : baseDislikes,
      };
    });
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
  return list.some(item => (item._id || item.id) === commentId);
};

/**
 * Save or remove a comment for a user
 */
export const toggleSaveComment = (userId, comment) => {
  if (typeof window === 'undefined' || !userId || !(comment?._id || comment?.id)) return false;
  const id = comment._id || comment.id;
  const currentList = getSavedComments(userId);
  const existsIndex = currentList.findIndex(item => (item._id || item.id) === id);
  
  let updatedList = [];
  let isNowSaved = false;

  const countsMap = getCommentCountsMap();
  const currentCount = countsMap[id];
  const finalLikes = currentCount && typeof currentCount.likes === 'number' ? currentCount.likes : (comment.helpfulCount ?? comment.likes ?? 0);
  const finalDislikes = currentCount && typeof currentCount.dislikes === 'number' ? currentCount.dislikes : (comment.dislikes ?? 0);

  if (existsIndex >= 0) {
    updatedList = currentList.filter(item => (item._id || item.id) !== id);
    isNowSaved = false;
  } else {
    updatedList = [
      {
        ...comment,
        helpfulCount: finalLikes,
        likes: finalLikes,
        dislikes: finalDislikes,
        savedAt: new Date().toISOString()
      },
      ...currentList
    ];
    isNowSaved = true;
  }

  try {
    localStorage.setItem(getSavedKey(userId), JSON.stringify(updatedList));
    window.dispatchEvent(new CustomEvent('saved_comments_updated', { detail: { userId, commentId: id, isSaved: isNowSaved } }));
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
 * Get disliked comment IDs for a user
 */
export const getDislikedCommentIds = (userId) => {
  if (typeof window === 'undefined' || !userId) return [];
  try {
    const data = localStorage.getItem(getDislikedKey(userId));
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error("Failed to read disliked comments:", err);
    return [];
  }
};

/**
 * Check if a comment is disliked
 */
export const isCommentDisliked = (userId, commentId) => {
  if (typeof window === 'undefined' || !userId || !commentId) return false;
  const list = getDislikedCommentIds(userId);
  return list.includes(commentId);
};

/**
 * Toggle LIKE state for a comment (Single-like enforcement per user)
 * Returns { isLiked: boolean, isDisliked: boolean, newLikes: number, newDislikes: number }
 */
export const toggleLikeComment = (userId, commentId, baseLikes = 0, baseDislikes = 0) => {
  if (typeof window === 'undefined' || !userId || !commentId) {
    return { isLiked: false, isDisliked: false, newLikes: baseLikes, newDislikes: baseDislikes };
  }

  const likedList = getLikedCommentIds(userId);
  const dislikedList = getDislikedCommentIds(userId);

  const isCurrentlyLiked = likedList.includes(commentId);
  const isCurrentlyDisliked = dislikedList.includes(commentId);

  const currentCounts = getCommentCounts(commentId, baseLikes, baseDislikes);
  let likes = currentCounts.likes;
  let dislikes = currentCounts.dislikes;

  let newLikedList = [...likedList];
  let newDislikedList = [...dislikedList];

  let nowLiked = false;
  let nowDisliked = false;

  if (isCurrentlyLiked) {
    // User is un-liking
    newLikedList = newLikedList.filter(id => id !== commentId);
    likes = Math.max(0, likes - 1);
    nowLiked = false;
    nowDisliked = false;
  } else {
    // User is liking
    newLikedList.push(commentId);
    likes = likes + 1;
    nowLiked = true;

    // If previously disliked, remove dislike
    if (isCurrentlyDisliked) {
      newDislikedList = newDislikedList.filter(id => id !== commentId);
      dislikes = Math.max(0, dislikes - 1);
    }
    nowDisliked = false;
  }

  try {
    localStorage.setItem(getLikedKey(userId), JSON.stringify(newLikedList));
    localStorage.setItem(getDislikedKey(userId), JSON.stringify(newDislikedList));
    updateCommentCountsMap(userId, commentId, likes, dislikes);

    window.dispatchEvent(new CustomEvent('liked_comments_updated', {
      detail: { userId, commentId, isLiked: nowLiked, isDisliked: nowDisliked, likes, dislikes }
    }));
  } catch (err) {
    console.error("Failed to toggle like:", err);
  }

  return { isLiked: nowLiked, isDisliked: nowDisliked, newLikes: likes, newDislikes: dislikes };
};

/**
 * Toggle DISLIKE state for a comment (Single-dislike enforcement per user)
 * Returns { isLiked: boolean, isDisliked: boolean, newLikes: number, newDislikes: number }
 */
export const toggleDislikeComment = (userId, commentId, baseLikes = 0, baseDislikes = 0) => {
  if (typeof window === 'undefined' || !userId || !commentId) {
    return { isLiked: false, isDisliked: false, newLikes: baseLikes, newDislikes: baseDislikes };
  }

  const likedList = getLikedCommentIds(userId);
  const dislikedList = getDislikedCommentIds(userId);

  const isCurrentlyLiked = likedList.includes(commentId);
  const isCurrentlyDisliked = dislikedList.includes(commentId);

  const currentCounts = getCommentCounts(commentId, baseLikes, baseDislikes);
  let likes = currentCounts.likes;
  let dislikes = currentCounts.dislikes;

  let newLikedList = [...likedList];
  let newDislikedList = [...dislikedList];

  let nowLiked = false;
  let nowDisliked = false;

  if (isCurrentlyDisliked) {
    // User is un-disliking
    newDislikedList = newDislikedList.filter(id => id !== commentId);
    dislikes = Math.max(0, dislikes - 1);
    nowDisliked = false;
    nowLiked = false;
  } else {
    // User is disliking
    newDislikedList.push(commentId);
    dislikes = dislikes + 1;
    nowDisliked = true;

    // If previously liked, remove like
    if (isCurrentlyLiked) {
      newLikedList = newLikedList.filter(id => id !== commentId);
      likes = Math.max(0, likes - 1);
    }
    nowLiked = false;
  }

  try {
    localStorage.setItem(getLikedKey(userId), JSON.stringify(newLikedList));
    localStorage.setItem(getDislikedKey(userId), JSON.stringify(newDislikedList));
    updateCommentCountsMap(userId, commentId, likes, dislikes);

    window.dispatchEvent(new CustomEvent('liked_comments_updated', {
      detail: { userId, commentId, isLiked: nowLiked, isDisliked: nowDisliked, likes, dislikes }
    }));
  } catch (err) {
    console.error("Failed to toggle dislike:", err);
  }

  return { isLiked: nowLiked, isDisliked: nowDisliked, newLikes: likes, newDislikes: dislikes };
};
