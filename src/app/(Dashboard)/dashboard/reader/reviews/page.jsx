import ReviewList from '@/components/Reader/ReviewList/ReviewList';
import { getUserSession } from '@/lib/core/session';
import { getreaderReview } from '@/lib/fetch/reviews';
import React from 'react';

const MyReviewsPage = async () => {
  const user = await getUserSession()
  const reviews = await getreaderReview(user?.id)
  
  return (
    <div>
      <ReviewList reviews={reviews} />
    </div>
  );
};

export default MyReviewsPage;