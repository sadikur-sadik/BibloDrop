import OverviewReader from '@/components/Reader/Overview/OverviewReader';
import { getUserSession } from '@/lib/core/session';
import { getDeliveriesByReader } from '@/lib/fetch/readerDelivery';
import { getreaderReview } from '@/lib/fetch/reviews';
import React from 'react';

const ReaderOverviewPage = async() => {
  const user =  await getUserSession()
  const deliveryRequest = await getDeliveriesByReader(user?.id)
  const reviews = await getreaderReview(user?.id)
  return (
    <div>
      <OverviewReader reader={user} deliveries={deliveryRequest} reviews={reviews}/>
    </div>
  );
};

export default ReaderOverviewPage;