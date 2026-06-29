
import { stripe } from '@/lib/stripe';
import Link from 'next/link';

export default async function Success({ searchParams }) {
    const { session_id } = await searchParams;

    if (!session_id)
        throw new Error('Please provide a valid session_id (`cs_test_...`)')

    const {
        status,
        metadata,
        customer_details: { email: customerEmail }
    } = await stripe.checkout.sessions.retrieve(session_id, {
        expand: ['line_items', 'payment_intent']
    })

    const paymentIntent = await stripe.paymentIntents.create({
        amount: 2000,
        currency: 'usd',
    });

    const transactionId = paymentIntent.id;
    console.log(transactionId);

    if (status === 'complete') {

        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
        const res = await fetch(`${baseUrl}/api/bookPayment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ sessionId: session_id, transactionId, price: metadata.price, userEmail: metadata.userEmail, userId: metadata.userId, title: metadata.title, writerId: metadata.writerId, genre: metadata.genre, description: metadata.description, userName: metadata.userName, writerName: metadata.writerName, coverImage: metadata.coverImage}),
        })

        const data = await res.json();
        console.log(data)

        console.log(metadata)

        return (
            <div className="min-h-screen bg-black flex flex-col justify-center items-center text-white px-4">
                <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold">✓</div>
                <h2 className="text-3xl font-black mb-2 text-white">Purchase Confirmed!</h2>
                <p className="text-zinc-400 mb-8 text-center">Thank you for your order. Your transaction was processed, and your library has been updated.</p>
                <Link href={"/browseEbook"} className="w-full bg-amber-600 text-center hover:bg-amber-500 py-3 rounded-xl font-bold transition-all">
                    Go To Library
                </Link>
            </div>
        );
    }
}