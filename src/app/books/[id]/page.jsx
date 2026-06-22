import BookDetails from '@/components/BrowseBooks/BookDetails/BookDetails';
import { getUserSession } from '@/lib/core/session';
import { getDeliveryInfo } from '@/lib/fetch/get-delivery';
import { getSingleBook } from '@/lib/fetch/single-book';
import { getUsersAPI } from '@/lib/fetch/users';
import React from 'react';

const BookDetailsPage = async({params}) => {
  const {id} = await params
  const book = await getSingleBook(id)
  const librarianInfo = await getUsersAPI(book.librarianId)
  const user = await getUserSession();
  const deliveryInfo = await getDeliveryInfo(user?.id,id)
  return (
    <div>
      <BookDetails book={book} user={user} deliveryInfo={deliveryInfo} librarianInfo={librarianInfo}/>
    </div>
  );
};

export default BookDetailsPage;