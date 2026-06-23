
import AdminApprovals from '@/components/admin/AdminApprovals/AdminApprovals';
import { getAllBooksByAdmin } from '@/lib/fetch/all-books';
import React from 'react';

const BookApprovalByAdmin = async() => {
    const books = await getAllBooksByAdmin()

  return (
    <div>
      <AdminApprovals books={books}/>
    </div>
  );
};

export default BookApprovalByAdmin;