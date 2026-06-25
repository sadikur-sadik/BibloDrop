import SuccessPageClient from '@/components/SuccessPageClient/SuccessPageClient'
import { adjustQuantity, PostingDeliveryInfo } from '@/lib/action/action'
import { stripe } from '@/lib/stripe'
import { redirect } from 'next/navigation'

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams

  if (!session_id) {
    throw new Error('Please provide a valid session_id (`cs_test_...`)')
  }

  // Retrieve the payment details from Stripe, expanding payment_intent
  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  })

  const { status, customer_details, metadata, payment_intent } = session
  const customerEmail = customer_details?.email || ''

  // Redirect the user home if the checkout session is still active/open
  if (status === 'open') {
    return redirect('/')
  }

  // Extract the transaction ID (Payment Intent ID)
  const transactionId = typeof payment_intent === 'string'
    ? payment_intent
    : payment_intent?.id;

  // Execute database writes only on a confirmed complete checkout status
  if (status === 'complete') {
    try {
      const bookId = metadata?.bookId;

      // Create a copy of metadata, convert 'paid' field, and add transactionId
      const processedMetadata = {
        ...metadata,
        paid: parseFloat(metadata?.paid || '0'),
        transactionId: transactionId
      };

      // 1. Pass the processed object to your database action
      await PostingDeliveryInfo(processedMetadata);

      // 2. Adjust the quantity of the purchased book
      if (bookId) {
        await adjustQuantity(bookId)
      }

    } catch (error) {
      console.error('Failed to register delivery info or adjust quantity upon successful checkout:', error);
    }

    // Return the animated success component once the tasks are handled
    return <SuccessPageClient customerEmail={customerEmail} />
  }

  // Fallback UI if status is not 'open' or 'complete' (e.g., if checkout expired)
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#192230] flex items-center justify-center text-slate-400 text-sm">
      Invalid or expired checkout session.
    </div>
  )
}