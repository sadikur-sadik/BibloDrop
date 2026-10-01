import BrowseBooks from '@/components/BrowseBooks/Books/BrowseBooks';
import Footer from '@/components/Footer/Footer';
import { getBrowseBooks } from '@/lib/fetch/browse-books';
import React from 'react';

const Books = async ({ searchParams }) => {
  const search = await searchParams
  const querySearch = new URLSearchParams(search).toString()

  const { total, result } = await getBrowseBooks(querySearch)
  const books = result
  return (
    <div>
      <BrowseBooks books={books} params={search} total={total} />
      <Footer />
    </div>
  );
};

export default Books;