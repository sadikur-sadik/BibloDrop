'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { Bounce, toast } from 'react-toastify';

// Import child components
import LibrarianControls from './LibrarianControl/LibrarianControl';
import DeliveryRequestButton from './DeliveryRequest/DeliveryRequest';
import PassingReview from './PassingReview/PassingReview';
import AllReviews from './AllReviews/AllReviews';
import NoReviews from './NoReviews/NoReviews';
import { useRouter } from 'next/navigation';

// Dynamically import ReviewStats to bypass server-side rendering issues with Recharts
const ReviewStats = dynamic(() => import('./ReviewStats/ReviewStats'), { ssr: false });

export default function BookDetails({ book, user, deliveryInfo, librarianInfo, reviews = [] }) {
  const router = useRouter()
  const [currentBook, setCurrentBook] = useState(book);
  const [reviewsList, setReviewsList] = useState(reviews || []);
  const [deliveryStatus, setDeliveryStatus] = useState('Available');

  const librarian = librarianInfo && librarianInfo.length > 0 ? librarianInfo[0] : null;

  useEffect(() => {
    setCurrentBook(book);
  }, [book]);

  useEffect(() => {
    setReviewsList(reviews || []);
  }, [reviews]);

  useEffect(() => {
    const actualDelivery = deliveryInfo && deliveryInfo.length > 0 ? deliveryInfo[0] : null;

    if (actualDelivery) {
      const status = actualDelivery.status || actualDelivery.deliveryStatus;
      if (status === 'delivered' || status === 'Delivered') {
        setDeliveryStatus('Delivered');
      } else {
        setDeliveryStatus('Pending Delivery');
      }
    } else {
      setDeliveryStatus('Available');
    }
  }, [deliveryInfo]);

  if (!currentBook) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#192230] flex items-center justify-center">
        <p className="text-xs text-slate-400 font-semibold tracking-wider uppercase">
          Loading book details...
        </p>
      </div>
    );
  }

  const isAuthenticated = !!user;
  
  const isOwner = isAuthenticated && 
    user?.role === 'librarian' && (
      user?._id === currentBook?.librarianId || 
      user?.email === currentBook?.librarianEmail
    );

  const isAvailable = (currentBook?.quantity || 0) > 0 && deliveryStatus === 'Available';

  const handleDeliveryAction = () => {
    if (!isAuthenticated) {
      toast.error("Authentication Required! Please register or log in.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });

      router.push("/signin")
      return;
    }
    setDeliveryStatus('Pending Delivery');
  };

  const handleAddNewReview = (newReview) => {
    setReviewsList([newReview, ...reviewsList]);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#192230] text-slate-800 dark:text-white transition-colors duration-300 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Book Information Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white dark:bg-[#2c2f38] p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-gray-800 shadow-xs">
          
          <div className="lg:col-span-4 flex items-center justify-center bg-slate-100/50 dark:bg-[#192230]/30 rounded-2xl p-6 min-h-75 sm:min-h-100">
            <div className="relative w-40 h-56 sm:w-48 sm:h-72">
              <Image 
                src={currentBook?.coverImage} 
                alt={currentBook?.title}
                fill
                priority
                unoptimized
                className="object-contain"
              />
            </div>
          </div>

          <div className="lg:col-span-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-[#856a26]/10 text-[#856a26] dark:bg-[#ffcd00]/10 dark:text-[#ffcd00] px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                  {currentBook?.genre}
                </span>
                
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                  deliveryStatus === 'Pending Delivery'
                    ? 'bg-amber-100 text-amber-800 dark:bg-amber-500/10 dark:text-amber-400'
                    : deliveryStatus === 'Delivered'
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-400'
                      : isAvailable 
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-400' 
                        : 'bg-rose-100 text-rose-800 dark:bg-rose-500/10 dark:text-rose-400'
                }`}>
                  {deliveryStatus === 'Pending Delivery' 
                    ? 'Pending Delivery' 
                    : deliveryStatus === 'Delivered'
                      ? 'Delivered'
                      : isAvailable 
                        ? `Available (${currentBook?.quantity || 0})` 
                        : 'Checked Out'
                  }
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
                {currentBook?.title}
              </h1>

              <p className="text-slate-600 dark:text-slate-300 text-sm">
                by <span className="font-semibold">{currentBook?.author}</span>
              </p>

              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-gray-800 pt-4">
                {currentBook?.description}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm border-t border-slate-100 dark:border-gray-800 pt-4 items-center">
                <div>
                  <span className="text-slate-400 block text-xs">Delivery Fee</span>
                  <span className="font-bold text-base">${currentBook?.deliveryFee?.toFixed(2)}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs">Date Cataloged</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    {currentBook?.createdAt ? new Date(currentBook.createdAt).toLocaleDateString() : ''}
                  </span>
                </div>
                
                {librarian && (
                  <div className="col-span-2 md:col-span-1 border-t md:border-t-0 border-slate-100 dark:border-gray-800 pt-3 md:pt-0">
                    <span className="text-slate-400 block text-xs mb-1.5">Librarian</span>
                    <div className="flex items-center gap-2.5">
                      <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 border border-slate-200 dark:border-gray-800">
                        <Image 
                          src={librarian?.image || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=80"} 
                          alt={librarian?.name}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                      <div className="min-w-0">
                        <span className="font-bold block text-xs truncate text-slate-700 dark:text-slate-300 leading-tight">
                          {librarian?.name}
                        </span>
                        <span className="text-[10px] text-slate-400 block truncate leading-tight mt-0.5">
                          {librarian?.email}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 dark:border-gray-800">
              {isOwner ? (
                <LibrarianControls
                  book={currentBook} 
                  onUpdate={(updatedData) => setCurrentBook(updatedData)} 
                />
              ) : (
                <DeliveryRequestButton 
                  bookId={currentBook?._id}
                  deliveryFee={currentBook?.deliveryFee}
                  isAuthenticated={isAuthenticated}
                  isAvailable={isAvailable}
                  isOwner={isOwner}
                  deliveryStatus={deliveryStatus}
                  deliveryInfo={deliveryInfo}
                  onRequest={handleDeliveryAction}
                />
              )}
            </div>
          </div>

        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-4">
            <ReviewStats reviews={reviewsList} />
          </div>

          <div className="lg:col-span-8 space-y-6">
            
            <PassingReview 
              bookId={currentBook?._id}
              bookName={currentBook?.title}
              currentUser={user}
              isAuthenticated={isAuthenticated}
              deliveryInfo={deliveryInfo}
              onAddReview={handleAddNewReview}
              librarianId={currentBook?.librarianId} // Passed librarianId down here
            />

            {reviewsList.length === 0 ? (
              <NoReviews />
            ) : (
              <AllReviews reviews={reviewsList} />
            )}

          </div>

        </div>

      </div>
    </div>
  );
}