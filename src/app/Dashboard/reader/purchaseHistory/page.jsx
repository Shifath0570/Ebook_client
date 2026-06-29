
import React from 'react';
import PurchesHistortyCard from '@/app/components/dashboard/PurchesHistortyCard';
import { getUserSession } from '@/lib/core/session';

const PurchesHistortyPage = async () => {
  const user = await getUserSession();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';
  
  const res = await fetch(`${baseUrl}/api/bookPurches/${user.id}`, {
    cache: 'no-store'
  });
  const booksPurches = await res.json();

  return (
    <div className="min-h-screen bg-[#121212] text-white w-full px-4 sm:px-6 md:px-8 py-8 font-sans">
      {/* Container forced to take maximum horizontal workspace safely */}
      <div className="w-full mx-auto max-w-[100%]">
        
        {/* Header container handling responsively on small scales */}
        <div className="flex flex-row justify-between items-center mb-6 px-1">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-zinc-100">
            Purchase Book History
          </h2>
          <button className="text-xs sm:text-sm font-medium text-zinc-400 hover:text-white transition-colors">
            View all
          </button>
        </div>

        {/* Responsive Table Wrapper - allows swiping on mobile screens instead of breaking layout */}
        <div className="w-full bg-[#1c1c1e] border border-zinc-800/80 rounded-xl shadow-2xl overflow-hidden">
          <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
            <table className="w-full min-w-[700px] text-left border-collapse table-auto">
              <thead>
                <tr className="border-b border-zinc-800/60 text-zinc-400 text-xs sm:text-sm font-medium tracking-wide bg-zinc-900/20">
                  <th className="py-5 px-4 sm:px-6 select-none">Ebook Name</th>
                  <th className="py-5 px-4 sm:px-6 select-none">Writer</th>
                  <th className="py-5 px-4 sm:px-6 select-none">Purchase Date</th>
                  <th className="py-5 px-4 sm:px-6 select-none">Price</th>
                  <th className="py-5 px-4 sm:px-6 text-right select-none">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/40">
                {booksPurches && booksPurches.length > 0 ? (
                  booksPurches.map((bookPurchesHistory, index) => (
                    <PurchesHistortyCard 
                      key={bookPurchesHistory._id} 
                      purchesHistry={bookPurchesHistory}
                      index={index}
                    />
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="py-12 text-center text-sm text-zinc-500">
                      No purchase records available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PurchesHistortyPage;