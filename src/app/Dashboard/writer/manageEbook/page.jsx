
import React from 'react';
import ManageEbooksTable from '@/app/components/dashboard/ManageEbooksTable';
import { getUserSession } from '@/lib/core/session';

const ManageEbookPage = async () => {
  const user = await getUserSession();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';
  
  const res = await fetch(`${baseUrl}/api/bookswriter/${user.id}`, {
    cache: 'no-store'
  });
  const books = await res.json();

  return (
    <div className="min-h-screen bg-[#121212] text-white w-full px-4 sm:px-6 md:px-8 py-8 font-sans">
      <div className="w-full mx-auto max-w-[100%]">
        
        {/* Dashboard Header Element */}
        <div className="flex flex-row justify-between items-center mb-6 px-1">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-zinc-100">
            Writer Books Dashboard
          </h2>
          <span className="text-xs text-zinc-500 font-medium bg-zinc-800/40 border border-zinc-800 px-3 py-1 rounded-md">
            Total Ebooks: {books?.length || 0}
          </span>
        </div>

        {/* Full-Width Table Framework */}
        <div className="w-full bg-[#1c1c1e] border border-zinc-800/80 rounded-xl shadow-2xl overflow-hidden">
          <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
            <table className="w-full min-w-[800px] text-left border-collapse table-auto">
              <thead>
                <tr className="border-b border-zinc-800/60 text-zinc-400 text-xs sm:text-sm font-medium tracking-wide bg-zinc-900/20">
                  <th className="py-5 px-4 sm:px-6 select-none">Ebook Title</th>
                  <th className="py-5 px-4 sm:px-6 select-none">Price</th>
                  <th className="py-5 px-4 sm:px-6 select-none">Status</th>
                  <th className="py-5 px-4 sm:px-6 text-right select-none">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/40">
                {books && books.length > 0 ? (
                  books.map((book, index) => (
                    <ManageEbooksTable 
                      key={book._id} 
                      book={book} 
                      index={index}
                    />
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="py-12 text-center text-sm text-zinc-500">
                      No ebooks published yet. Get started by creating your first draft!
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

export default ManageEbookPage;

