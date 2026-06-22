'use client';

import React from 'react';

export default function DeliveryRequestButton({ 
  bookId, 
  deliveryFee, 
  isAuthenticated, 
  isAvailable, 
  isOwner, 
  deliveryStatus, 
  deliveryInfo,
  onRequest 
}) {
  // Extract the actual delivery object from the array index 0 (if present)
  const actualDelivery = deliveryInfo && deliveryInfo.length > 0 ? deliveryInfo[0] : null;
  const hasOrdered = !!actualDelivery;
  
  const isDeliveryDisabled = !isAvailable || isOwner || hasOrdered;

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <button 
          type="button"
          onClick={onRequest} // Triggers login prompt/alert in parent component
          className="py-2.5 px-6 rounded-xl font-semibold transition-all text-sm tracking-wide shadow-sm bg-[#192230] hover:bg-[#2c2f38] text-white dark:bg-[#ffcd00] dark:text-[#192230] dark:hover:bg-[#ffe066] cursor-pointer"
        >
          Log in to Request Delivery
        </button>
        <span className="text-xs text-[#856a26] dark:text-[#ffcd00] font-medium">
          Authentication required to book deliveries.
        </span>
      </div>
    );
  }

  // Determine button text dynamically
  const getButtonText = () => {
    if (isOwner) return 'Owned by You';

    if (actualDelivery) {
      const status = actualDelivery.status || actualDelivery.deliveryStatus;
      if (status === 'delivered' || status === 'Delivered') {
        return 'Delivered';
      }
      return 'Processing Delivery';
    }

    if (deliveryStatus === 'Pending Delivery') {
      return 'Processing Delivery';
    }

    if (!isAvailable) {
      return 'Out of Stock';
    }

    return `Request Delivery ($${deliveryFee?.toFixed(2)})`;
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
      
      <form action="/api/checkout_sessions" method="POST" className="shrink-0">
        {/* Hidden input to pass the book ID securely through standard POST data */}
        <input type="hidden" name="bookId" value={bookId || ''} />
        
        <section>
          <button 
            type="submit" 
            role="link"
            disabled={isDeliveryDisabled}
            className={`py-2.5 px-6 rounded-xl font-semibold transition-all text-sm tracking-wide shadow-sm shrink-0 text-center ${
              isDeliveryDisabled 
                ? 'bg-slate-200 dark:bg-gray-800 text-slate-400 dark:text-slate-600 cursor-not-allowed' 
                : 'bg-[#192230] hover:bg-[#2c2f38] text-white dark:bg-[#ffcd00] dark:text-[#192230] dark:hover:bg-[#ffe066] cursor-pointer'
            }`}
          >
            {getButtonText()}
          </button>
        </section>
      </form>

      {!isAvailable && !hasOrdered && (
        <span className="text-xs text-rose-500 font-medium">
          This item is currently checked out.
        </span>
      )}
    </div>
  );
}