import SuccessPageClient from '@/components/SuccessPageClient/SuccessPageClient'
import { PostingDeliveryInfo } from '@/lib/action/action'
import { stripe } from '@/lib/stripe'
import { redirect } from 'next/navigation'
export default async function Success({ searchParams }) {
  const { session_id } = await searchParams

  if (!session_id) {
    throw new Error('Please provide a valid session_id (`cs_test_...`)')
  }

  // Retrieve the payment details from Stripe
  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  })

  const { status, customer_details, metadata } = session
  const customerEmail = customer_details?.email || ''

  // Redirect the user home if the checkout session is still active/open
  if (status === 'open') {
    return redirect('/')
  }
  // Execute database writes only on a confirmed complete checkout status
  // ... existing code
  if (status === 'complete') {
    try {
      // Create a copy of metadata and convert the 'paid' field
      const processedMetadata = {
        ...metadata,
        // Use parseFloat to handle decimal values like "5.99"
        paid: parseFloat(metadata.paid)
      };

      // Pass the processed object to your database action
      await PostingDeliveryInfo(processedMetadata);
    } catch (error) {
      console.error('Failed to register delivery info upon successful checkout:', error);
    }

    return <SuccessPageClient customerEmail={customerEmail} />
  }
  // ...
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#192230] flex items-center justify-center text-slate-400 text-sm">
      Processing validation...
    </div>
  )
}