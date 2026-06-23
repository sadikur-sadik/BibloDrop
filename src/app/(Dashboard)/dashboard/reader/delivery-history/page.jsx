import DeliveryHistory from '@/components/Reader/DeliveryHistory/DeliveryHistory';
import { getUserSession } from '@/lib/core/session';
import { getDeliveriesByReader } from '@/lib/fetch/readerDelivery';
import React from 'react';

const DeliveryHistoryPage = async() => {
  const user =  await getUserSession()
  const deliveryRequest = await getDeliveriesByReader(user?.id)
  return (
    <div>
      <DeliveryHistory deliveries={deliveryRequest}/>
    </div>
  );
};

export default DeliveryHistoryPage;