import OverviewAdmin from '@/components/admin/Overview/Overview';
import { getUserSession } from '@/lib/core/session';
import { getDeliveriesByAdmin } from '@/lib/fetch/adminDeliveries';
import { getAllBooksByAdmin } from '@/lib/fetch/all-books';
import { getAllReviews } from '@/lib/fetch/reviews';
import { getAllUsersForAdmin } from '@/lib/fetch/users';
import React from 'react';

const AdminDashboardOverview = async () => {
    const user =  await getUserSession()
    const books = await getAllBooksByAdmin()
    const deliveryRequests = await getDeliveriesByAdmin()
    const allReviews = await getAllReviews()
    const allusers = await getAllUsersForAdmin()
  return (
    <div>
      <OverviewAdmin books={books} deliveries={deliveryRequests} reviews={allReviews} users={allusers}/>
    </div>
  );
};

export default AdminDashboardOverview;