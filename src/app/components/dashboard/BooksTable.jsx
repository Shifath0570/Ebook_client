'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BooksDeleteAlert } from './BooksDeleteAlert';

const BooksTable = ({ book, index }) => {
    const { _id, title, writerName, price, status: initialStatus } = book;
    const [status, setStatus] = useState(initialStatus || 'unpublished');
    const [loading, setLoading] = useState(false);

    // Status mapping logic styling following screenshot colors
    const getStatusStyles = (statusValue) => {
        switch (statusValue?.toLowerCase()) {
            case 'published':
            case 'active':
                return 'bg-emerald-950/40 text-emerald-400 border-emerald-800/30';
            case 'unpublished':
            case 'draft':
            default:
                return 'bg-zinc-800 text-zinc-300 border-zinc-700/50';
        }
    };

    // Toggle state workflow mutation fetch logic
    const handleToggleStatus = async () => {
        setLoading(true);
        const targetStatus = status === 'published' ? 'unpublished' : 'published';

        try {
            const res = await fetch(`/api/admin/books/status/${_id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: targetStatus })
            });
            if (res.ok) setStatus(targetStatus);
        } catch (err) {
            console.error("Administrative status update failure notification:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleGlobalRemoval = () => {
        if (confirm(`CRITICAL WARNING: Permanently delete and strip "${title}" from the platform index catalogs?`)) {
            console.log(`Executing global drop pipeline trigger for ID element: ${_id}`);
        }
    };

    return (
        <motion.tr
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: Math.min(index * 0.04, 0.4) }}
            className="hover:bg-zinc-800/30 transition-colors group border-b border-zinc-800/20"
        >
            {/* Column 1: Book Element Header Layout */}
            <td className="py-4 px-4 sm:px-6 font-medium text-zinc-100">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700/40 flex items-center justify-center text-xs text-zinc-400 group-hover:border-zinc-600 transition-colors shrink-0">
                        📖
                    </div>
                    <span className="truncate max-w-[200px] sm:max-w-xs block font-semibold text-zinc-200" title={title}>
                        {title || 'Untitled Publication'}
                    </span>
                </div>
            </td>

            {/* Column 2: Writer Info Display */}
            <td className="py-4 px-4 sm:px-6 text-zinc-400 text-sm truncate max-w-[150px]" title={writerName}>
                {writerName || 'Unverified Creator'}
            </td>

            {/* Column 3: Platform Retail Unit Price */}
            <td className="py-4 px-4 sm:px-6 text-zinc-300 text-sm font-medium whitespace-nowrap">
                {typeof price === 'number' ? `$${price.toFixed(2)}` : price || '$0.00'}
            </td>

            {/* Column 4: Visibility Badge System */}
            <td className="py-4 px-4 sm:px-6 whitespace-nowrap">
                <span className={`inline-block px-3 py-1 rounded-full text-[11px] sm:text-xs font-medium border tracking-wide uppercase min-w-[95px] text-center shadow-sm ${getStatusStyles(status)}`}>
                    {status}
                </span>
            </td>

            {/* Column 5: Action Triggers Layout */}
            <td className="py-4 px-4 sm:px-6 text-right whitespace-nowrap">
                <div className="flex items-center justify-end gap-3">

                    {/* Global Content Toggler Action */}
                    <button
                        onClick={handleToggleStatus}
                        disabled={loading}
                        className={`text-xs font-medium px-3 py-1.5 rounded-md border transition-all active:scale-95 disabled:opacity-50 ${status === 'published'
                                ? 'bg-amber-950/20 hover:bg-amber-950/50 text-amber-500 border-amber-900/40'
                                : 'bg-emerald-950/20 hover:bg-emerald-950/50 text-emerald-400 border-emerald-900/40'
                            }`}
                    >
                        {status === 'published' ? 'Unpublish' : 'Publish'}
                    </button>

                    {/* Hard Drop Content Action Button */}
                    {/* <button
                        onClick={handleGlobalRemoval}
                        className="text-xs font-medium bg-rose-950/20 hover:bg-rose-950/50 text-rose-400 border border-rose-900/30 px-3 py-1.5 rounded-md transition-all active:scale-95"
                    >
                        Delete
                    </button> */}
                    <BooksDeleteAlert bookId={book._id}></BooksDeleteAlert>

                </div>
            </td>
        </motion.tr>
    );
};

export default BooksTable;