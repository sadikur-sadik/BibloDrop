import AdminApprovals from '@/components/admin/AdminApprovals';
import { getAllBooks } from '@/lib/fetch/all-books';
import React from 'react';

const BookApprovalByAdmin = async() => {
    const books = await getAllBooks()

  return (
    <div>
      <AdminApprovals books={books}/>
    </div>
  );
};

export default BookApprovalByAdmin;