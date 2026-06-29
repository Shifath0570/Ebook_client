'use client';

import React from 'react';
import { motion } from 'framer-motion';

const SalesHistoryTable = ({ book, index }) => {
  // Destructuring keys representing sales documents
  const { title, userName, date, price } = book;

  return (
    <motion.tr
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: Math.min(index * 0.04, 0.4) }}
      className="hover:bg-zinc-800/30 transition-colors group border-b border-zinc-800/20"
    >
      {/* Column 1: Ebook Title along with avatar graphic placeholder */}
      <td className="py-4.5 px-4 sm:px-6 font-medium text-zinc-100">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700/40 flex items-center justify-center text-xs text-zinc-400 group-hover:border-zinc-600 transition-colors shrink-0">
            📚
          </div>
          <span className="truncate max-w-[200px] sm:max-w-xs block font-semibold text-zinc-200" title={title}>
            {title || 'Untitled Ebook'}
          </span>
        </div>
      </td>

      {/* Column 2: Buyer Name */}
      <td className="py-4.5 px-4 sm:px-6 text-zinc-300 text-sm font-medium tracking-normal truncate max-w-[150px]" title={userName}>
        {userName || 'Anonymous Reader'}
      </td>

      {/* Column 3: Date Format mapping */}
      <td className="py-4.5 px-4 sm:px-6 text-zinc-400 text-sm whitespace-nowrap">
        {date ? new Date(date).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        }) : 'Jun 29, 2026'}
      </td>

      {/* Column 4: Revenue Status Indicator (Styled like the reference screenshot green pill) */}
      <td className="py-4.5 px-4 sm:px-6 text-right whitespace-nowrap">
        <div className="flex items-center justify-end">
          <span className="inline-block px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold border tracking-wide bg-emerald-950/40 text-emerald-400 border-emerald-800/30 min-w-[80px] text-center">
            {typeof price === 'number' ? `+$${price.toFixed(2)}` : price || '+$0.00'}
          </span>
        </div>
      </td>
    </motion.tr>
  );
};

export default SalesHistoryTable;