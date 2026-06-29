import React from 'react';
import TransactionTable from '@/app/components/dashboard/TransactionTable';
import { getPurchesBooks } from '@/lib/api/books';

const TransactionPage = async () => {
    // Fetch global platform transactions record collection
    const purchesBooks = await getPurchesBooks();

    return (
        <div className="min-h-screen bg-[#121212] text-white w-full px-4 sm:px-6 md:px-8 py-8 font-sans">
            <div className="w-full mx-auto max-w-[100%]">

                {/* Section Header Component */}
                <div className="flex flex-row justify-between items-center mb-6 px-1">
                    <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-zinc-100">
                        Global Transactions Audit
                    </h2>
                    <span className="text-xs font-semibold text-zinc-400 bg-zinc-800/60 border border-zinc-800 px-3 py-1.5 rounded-full">
                        Ledger Entries: {purchesBooks?.length || 0}
                    </span>
                </div>

                {/* Full-Width Robust Table Framework Component */}
                <div className="w-full bg-[#1c1c1e] border border-zinc-800/80 rounded-xl shadow-2xl overflow-hidden">
                    <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
                        <table className="w-full min-w-[900px] text-left border-collapse table-auto">
                            <thead>
                                <tr className="border-b border-zinc-800/60 text-zinc-400 text-xs sm:text-sm font-medium tracking-wide bg-zinc-900/20">
                                    <th className="py-5 px-4 sm:px-6 select-none">Transaction ID</th>
                                    <th className="py-5 px-4 sm:px-6 select-none">Type</th>
                                    <th className="py-5 px-4 sm:px-6 select-none">User / Writer Email</th>
                                    <th className="py-5 px-4 sm:px-6 select-none">Date Logged</th>
                                    <th className="py-5 px-4 sm:px-6 text-right select-none">Amount</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-800/40">
                                {purchesBooks && purchesBooks.length > 0 ? (
                                    purchesBooks.map((transaction, index) => (
                                        <TransactionTable
                                            key={transaction._id}
                                            book={transaction}
                                            index={index}
                                        />
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="py-12 text-center text-sm text-zinc-500">
                                            No transactional records matched inside database storage.
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

export default TransactionPage;