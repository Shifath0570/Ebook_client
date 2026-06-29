import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '@/lib/stripe';
import { getUserSession } from '@/lib/core/session';


export async function POST(request) {
  try {
    const headersList = await headers()
    const origin = headersList.get('origin')

    const user = await getUserSession()

    const formData = await request.formData();
    const price = formData.get('price')
    const title = formData.get('title')
    const productId = formData.get('productId')
    const description = formData.get('description')
    const genre = formData.get('genre')
    const writerName = formData.get('writerName')
    const coverImage = formData.get('coverImage')
    const writerId = formData.get('writerId')

    const session = await stripe.checkout.sessions.create({
      customer_email: user?.email,
      line_items: [
        {
          // Provide the exact Price ID (for example, price_1234) of the product you want to sell
          price_data:{
            currency: "usd",
            unit_amount: Number (price) * 100,
            product_data: {
                name: title,
            }
          },
          quantity: 1,
        },
      ],
      metadata:{
        price : Number(price),
        userId: user?.id,
        userEmail: user?.email,
        userName: user?.name,
        coverImage,
        writerId,
        writerName,
        title,
        productId,
        description,
        genre,
      },
      mode: 'payment',
      success_url: `${origin}/pricing/success?session_id={CHECKOUT_SESSION_ID}`,
    });
    return NextResponse.redirect(session.url, 303)
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    )
  }
}