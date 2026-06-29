
import { getPurchesBookDetails } from '@/lib/api/books';
import BookDetails from './BookDetails';
import React from 'react';

const BookDetailsPage = async ({ params }) => {
    const { id } = await params; 
    
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
     const res = await fetch(`${baseUrl}/api/bookPurchesDetails/${id}`);
    const book = await res.json();
    console.log(book)

    if (!book) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <h2 className="text-2xl font-bold text-default-800">Ebook Not Found</h2>
                <p className="text-default-500 mt-2">The book you are looking for does not exist or has been removed.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <BookDetails book={book} />
        </div>
    );
};

export default BookDetailsPage;