import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

import { stripe } from '@/lib/stripe'
import { getUserSession } from '@/lib/core/session'
import { getSingleBook } from '@/lib/fetch/single-book'

export async function POST(req) {
  try {
    const formData = await req.formData()
    const data = Object.fromEntries(formData);
    
    // 1. Fetch user session and retrieve user information
    const user = await getUserSession()
    const userEmail = user?.email;
    const userId = user?._id || user?.id || '';
    const userName = user?.name || '';
    
    const bookId = data?.bookId;
    const book = await getSingleBook(bookId);

    if (!book) {
      return NextResponse.json({ error: 'Book not found' }, { status: 404 });
    }

    const headersList = await headers()
    const origin = headersList.get('origin')

    // Define the metadata payload securely
    // Note: Stripe metadata keys must be strings, with values up to 500 characters
    const checkoutMetadata = {
      bookId: bookId || '',
      bookTitle: book?.title || '',
      bookAuthor: book?.author || '',
      librarianId: book?.librarianId || '',
      librarianEmail:book?.librarianEmail || "",
      userId: userId || '',
      userEmail: userEmail || '',
      userName: userName || '',
      paid: book.deliveryFee
    };

    // Create a Stripe Checkout Session with dynamic metadata
    const session = await stripe.checkout.sessions.create({
      customer_email: userEmail || undefined, 
      metadata: checkoutMetadata,
      line_items: [
        {
          price_data: {
            currency: 'usd', 
            unit_amount: Math.round(book.deliveryFee * 100), 
            product_data: {
              name: book?.title || 'Book Delivery Request',
              description: book?.description || undefined,
              images: book?.coverImage ? [book?.coverImage] : undefined,
            },
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/books/${bookId}`,
    });

    return NextResponse.redirect(session.url, 303)
  } catch (err) {
    console.error('Stripe session creation error:', err);
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    )
  }
}