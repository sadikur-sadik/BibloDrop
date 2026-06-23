import TranstactionHistory from '@/components/admin/TransactionHistory/TranstactionHistory';
import { getDeliveriesByAdmin } from '@/lib/fetch/adminDeliveries';
import React from 'react';

const AllTransactions = async () => {
  const deliveryRequests = await getDeliveriesByAdmin()
  return (
    <div>
      <TranstactionHistory deliveries={deliveryRequests}/>
    </div>
  );
};

export default AllTransactions;