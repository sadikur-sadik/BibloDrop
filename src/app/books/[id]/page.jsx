import BookDetails from '@/components/BrowseBooks/BookDetails/BookDetails';
import { getUserSession } from '@/lib/core/session';
import { getDeliveryInfo } from '@/lib/fetch/get-delivery';
import { getReviews } from '@/lib/fetch/reviews';
import { getSingleBook } from '@/lib/fetch/single-book';
import { getUsersAPI } from '@/lib/fetch/users';
import React from 'react';

const BookDetailsPage = async({params}) => {
  const {id} = await params
  const book = await getSingleBook(id)
  const librarianInfo = book?.librarianId ? await getUsersAPI(book.librarianId) : null;
  const user = await getUserSession();
  const deliveryInfo = await getDeliveryInfo(user?.id,id)
  const reviews = await getReviews(id)
  return (
    <div>
      <BookDetails book={book} user={user} deliveryInfo={deliveryInfo} librarianInfo={librarianInfo} reviews={reviews}/>
    </div>
  );
};

export default BookDetailsPage;