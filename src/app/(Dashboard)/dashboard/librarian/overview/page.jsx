import LibrarianOverview from '@/components/Librarian/Overview/Overview';
import { getUserSession } from '@/lib/core/session';
import { getBooksByLibrarian } from '@/lib/fetch/librarian-books';
import { getDeliveriesByLibrarian } from '@/lib/fetch/librarianDeliveries';
import { getAllLibrarianReviews } from '@/lib/fetch/reviews';
import React from 'react';

const LibrarianHomePage = async() => {

  const user =  await getUserSession()
  const booksOftheLibrarian = await getBooksByLibrarian(user?.id)
  const deliveryRequests = await getDeliveriesByLibrarian(user.id, "")
  const allReviews = await getAllLibrarianReviews(user?.id,"")

  return (
    <div>
      <LibrarianOverview books={booksOftheLibrarian} deliveries={deliveryRequests} reviews={allReviews} />
    </div>
  );
};

export default LibrarianHomePage;