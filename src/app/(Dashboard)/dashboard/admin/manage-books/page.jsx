import ManageBooks from '@/components/admin/AdminManageBooks/ManageBooks';
import { getAllBooksByAdmin } from '@/lib/fetch/all-books';
import React from 'react';

const ManageAllBooks = async() => {
  const books = await getAllBooksByAdmin()
  return (
    <div>
      <ManageBooks books={books}/>
    </div>
  );
};

export default ManageAllBooks;