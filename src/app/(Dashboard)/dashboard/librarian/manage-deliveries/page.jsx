import ManageDeliveries from '@/components/Librarian/Manage-Deliveries/Manage-Deliveries';
import { getUserSession } from '@/lib/core/session';
import { getDeliveriesByLibrarian } from '@/lib/fetch/librarianDeliveries';
import React from 'react';

const ManageDeliveriesByLibrarian = async () => {
  const user = await getUserSession()
  const deliveryRequests = await getDeliveriesByLibrarian(user?.id, "")
  
  return (
    <div>
      <ManageDeliveries deliveries={deliveryRequests}/>
    </div>
  );
};

export default ManageDeliveriesByLibrarian;