
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { WriterEbookDeleteAlert } from './WriterEbookDeleteAlert';
import UpdateBook from './UpdateBook';

const ManageEbooksTable = ({ book, index }) => {
  const { _id, title, price, status: initialStatus } = book;
  const [status, setStatus] = useState(initialStatus || 'unpublished');

  // Handle live visibility toggling
  const togglePublishStatus = async () => {
    const nextStatus = status === 'published' ? 'unpublished' : 'published';
    setStatus(nextStatus);
    
    try {
      await fetch(`/api/books/status/${_id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus })
      });
    } catch (err) {
      console.error("Failed to sync visibility update:", err);
    }
  };

  return (
    <motion.tr
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: Math.min(index * 0.04, 0.4) }}
      className="hover:bg-zinc-800/30 transition-colors group border-b border-zinc-800/20"
    >
      {/* Title Block with Circular Icon matching Image Layout */}
      <td className="py-4.5 px-4 sm:px-6 font-medium text-zinc-100">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700/40 flex items-center justify-center text-xs text-zinc-400 group-hover:border-zinc-600 transition-colors shrink-0">
            📖
          </div>
          <span className="truncate max-w-[220px] sm:max-w-xs block font-semibold text-zinc-200" title={title}>
            {title || 'Untitled Ebook'}
          </span>
        </div>
      </td>

      {/* Price Block */}
      <td className="py-4.5 px-4 sm:px-6 text-zinc-300 text-sm font-medium whitespace-nowrap">
        {typeof price === 'number' ? `$${price.toFixed(2)}` : price || '$0.00'}
      </td>

      {/* Dynamic Status Badge (Mirrors screenshot design matching exact status) */}
      <td className="py-4.5 px-4 sm:px-6 whitespace-nowrap">
        <span className={`inline-block px-3 py-1 rounded-full text-[11px] sm:text-xs font-medium border tracking-wide min-w-[95px] text-center uppercase ${
          status?.toLowerCase() === 'published'
            ? 'bg-emerald-950/40 text-emerald-400 border-emerald-800/30'
            : 'bg-zinc-800 text-zinc-400 border-zinc-700/50'
        }`}>
          {status}
        </span>
      </td>

      {/* Actions Interactive Column Wrapper */}
      <td className="py-4.5 px-4 sm:px-6 text-right whitespace-nowrap">
        <div className="flex items-center justify-end gap-2.5">
          
          {/* Toggle Visibility Action */}
          <button
            onClick={togglePublishStatus}
            className={`text-xs font-medium px-2.5 py-1.5 rounded-md border transition-all ${
              status === 'published' 
                ? 'bg-amber-950/20 hover:bg-amber-950/40 text-amber-500 border-amber-900/40' 
                : 'bg-emerald-950/20 hover:bg-emerald-950/40 text-emerald-400 border-emerald-900/40'
            }`}
          >
            {status === 'published' ? 'Unpublish' : 'Publish'}
          </button>

          <UpdateBook book={book}></UpdateBook>
      
          <WriterEbookDeleteAlert bookId={book._id}></WriterEbookDeleteAlert>

        </div>
      </td>
    </motion.tr>
  );
};

export default ManageEbooksTable;