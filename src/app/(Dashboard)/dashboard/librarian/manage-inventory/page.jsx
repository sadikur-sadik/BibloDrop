import Inventory from '@/components/Librarian/Inventory';
import { getUserSession } from '@/lib/core/session';
import { getBooksByLibrarian } from '@/lib/fetch/librarian-books';
import React from 'react';

const ManageInventory = async() => {
  const {id} = await getUserSession()
  const books = await getBooksByLibrarian(id)
  return (
    <div>
      <Inventory books={books}/>
    </div>
  );
};

export default ManageInventory;