import ManageBooks from '@/components/admin/AdminManageBooks/ManageBooks';
import { getAllBooks } from '@/lib/fetch/all-books';
import React from 'react';

const ManageAllBooks = async() => {
  const books = await getAllBooks()
  return (
    <div>
      <ManageBooks books={books}/>
    </div>
  );
};

export default ManageAllBooks;