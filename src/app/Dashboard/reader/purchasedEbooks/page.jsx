
import PurchaseEbookCard from '@/app/components/dashboard/PurcheseEbookCard';
import { getUserSession } from '@/lib/core/session';
import React from 'react';

const PurchasedEbookPage = async () => {
  const user = await getUserSession();
   const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';
   
   const res = await fetch(`${baseUrl}/api/bookPurches/${user.id}`, {
     cache: 'no-store'
   });
   const purchasedBooks = await res.json();

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-default-900">
          My Library
        </h1>
        <p className="text-default-500 text-sm">
          Access and read your purchased interactive e-books.
        </p>
      </div>

      {purchasedBooks.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[300px] rounded-2xl border-2 border-dashed border-default-200 p-8 text-center">
          <p className="text-default-400 font-medium">No ebooks purchased yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {purchasedBooks.map((purchase) => (
            <PurchaseEbookCard 
              key={purchase._id} 
              purchaseData={purchase} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PurchasedEbookPage;