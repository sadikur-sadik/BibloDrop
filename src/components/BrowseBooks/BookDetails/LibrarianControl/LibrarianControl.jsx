'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  deleteBookByLibrarian,
  togglePublishByLibrarian,
  updateBookbyLibrarian
} from '@/lib/action/action';
import PublishToggle from './Publish';
import EditBooks from './Edit';
import DeleteBooks from './Delete';

export default function LibrarianControls({ book, onUpdate }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();

  // 1. Publish/Unpublish toggle operation (passed to PublishToggle)
  const handleTogglePublish = async () => {
    if (book.currentStatus === 'pending') {
      alert("Librarian cannot toggle publish status of a Pending book.");
      return;
    }

    setIsUpdating(true);
    const nextPublishState = !book.isPublished;
    const publishStatus = nextPublishState ? "publish" : "unpublish";

    try {
      // Execute actual server action
      await togglePublishByLibrarian(book._id, publishStatus);
      
      // Notify parent component to update UI state
      if (onUpdate) {
        onUpdate({ ...book, isPublished: nextPublishState });
      }

      // If the action transitions the book to UNPUBLISHED, redirect
      if (!nextPublishState) {
        router.push('/dashboard/librarian/manage-inventory');
      }
    } catch (error) {
      console.error("Failed to execute toggle publish on backend:", error);
      alert("Failed to update publication status. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  // 2. Delete operation (passed to DeleteBooks)
  const handleDeleteBook = async (deletedBook) => {
    setIsUpdating(true);

    try {
      // Execute actual server action
      await deleteBookByLibrarian(deletedBook._id);
      
      alert("Book successfully deleted from database.");
      
      // Redirect to the add book dashboard following successful deletion
      router.push('/dashboard/librarian/add-book'); 
    } catch (error) {
      console.error("Failed to execute delete on backend:", error);
      alert("Failed to delete the book. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  // 3. Edit operation (passed to EditBooks)
  const handleEditBook = async (bookId, updatedFields) => {
    setIsUpdating(true);

    try {
      // Execute actual server action with new form data
      await updateBookbyLibrarian(bookId, updatedFields);

      // Notify parent component to update UI state
      if (onUpdate) {
        onUpdate({ ...book, ...updatedFields });
      }
      alert("Book successfully updated.");
    } catch (error) {
      console.error("Failed to execute update on backend:", error);
      alert("Failed to update the book. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="bg-slate-50 dark:bg-[#192230]/50 p-4 rounded-xl border border-slate-200/50 dark:border-gray-800 max-w-xl">
      <p className="text-xs font-bold text-[#856a26] dark:text-[#ffcd00] mb-3 uppercase tracking-wider">
        Librarian Controls (Owner Access)
      </p>
      
      {/* 3-column grid hosting the custom modular control components */}
      <div className="grid grid-cols-3 gap-2 items-center">
        
        {/* 1. Modular Edit Book Form Modal */}
        <EditBooks 
          book={book} 
          onEdit={handleEditBook} 
        />

        {/* 2. Modular Publish Toggle Button (uses text button style variant) */}
        <PublishToggle 
          book={book} 
          isToggling={isUpdating} 
          onToggle={handleTogglePublish} 
          variant="button" 
        />

        {/* 3. Modular Delete Book Confirmation Modal */}
        <DeleteBooks 
          book={book} 
          onDelete={handleDeleteBook} 
        />

      </div>
    </div>
  );
}