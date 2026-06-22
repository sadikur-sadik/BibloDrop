'use client';

import React, { useState } from 'react';

export default function LibrarianControls({ book, onUpdate }) {
  const [isUpdating, setIsUpdating] = useState(false);

  // 1. Publish/Unpublish toggle operation
  const handleTogglePublish = async () => {
    setIsUpdating(true);
    const updatedPublishState = !book.isPublished;
    
    // Prepare the payload for backend dispatch
    const payload = {
      isPublished: updatedPublishState
    };
    
    console.log("Toggle Publish Payload ready:", payload);

    /*
    try {
      const response = await fetch(`/api/books/${book._id}/publish`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const updatedBook = await response.json();
      if (onUpdate) onUpdate(updatedBook);
    } catch (error) {
      console.error("Failed to execute toggle publish on backend:", error);
    } finally {
      setIsUpdating(false);
    }
    */
    
    // Fallback UI State update
    setTimeout(() => {
      onUpdate({ ...book, isPublished: updatedPublishState });
      setIsUpdating(false);
    }, 400);
  };

  // 2. Delete operation
  const handleDeleteBook = async () => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;
    setIsUpdating(true);
    
    console.log("Delete Request ready for book ID:", book._id);

    /*
    try {
      const response = await fetch(`/api/books/${book._id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      alert("Book deleted from database.");
    } catch (error) {
      console.error("Failed to execute delete on backend:", error);
    } finally {
      setIsUpdating(false);
    }
    */

    setTimeout(() => {
      alert("Mock Delete Successful.");
      setIsUpdating(false);
    }, 400);
  };

  // 3. Edit operation
  const handleEditBook = async () => {
    setIsUpdating(true);
    
    // Sample placeholder payload structure representing dynamic edits
    const payload = {
      title: book.title,
      author: book.author,
      description: "Updated Book Description text content.",
      genre: book.genre,
      quantity: book.quantity,
      deliveryFee: book.deliveryFee
    };

    console.log("Edit Payload ready:", payload);

    /*
    try {
      const response = await fetch(`/api/books/${book._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const updatedBook = await response.json();
      if (onUpdate) onUpdate(updatedBook);
    } catch (error) {
      console.error("Failed to execute update on backend:", error);
    } finally {
      setIsUpdating(false);
    }
    */

    setTimeout(() => {
      onUpdate({ ...book, description: payload.description });
      setIsUpdating(false);
      alert("Mock Edit Successful.");
    }, 400);
  };

  return (
    <div className="bg-slate-50 dark:bg-[#192230]/50 p-4 rounded-xl border border-slate-200/50 dark:border-gray-800 max-w-xl">
      <p className="text-xs font-bold text-[#856a26] dark:text-[#ffcd00] mb-3 uppercase tracking-wider">
        Librarian Controls (Owner Access)
      </p>
      <div className="grid grid-cols-3 gap-2">
        <button 
          onClick={handleEditBook}
          disabled={isUpdating}
          className="py-2 px-3 text-xs font-semibold rounded-lg bg-slate-200 dark:bg-gray-800 hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50"
        >
          Edit
        </button>
        <button 
          onClick={handleTogglePublish}
          disabled={isUpdating}
          className="py-2 px-3 text-xs font-semibold rounded-lg bg-slate-200 dark:bg-gray-800 hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50"
        >
          {book.isPublished ? 'Unpublish' : 'Publish'}
        </button>
        <button 
          onClick={handleDeleteBook}
          disabled={isUpdating}
          className="py-2 px-3 text-xs font-semibold rounded-lg bg-rose-100 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50"
        >
          Delete
        </button>
      </div>
    </div>
  );
}