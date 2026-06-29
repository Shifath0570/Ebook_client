
'use client';

import React from 'react';
import { motion } from 'framer-motion';

const PurchesHistortyCard = ({ purchesHistry, index }) => {
  const { title, writerName, price, date, status } = purchesHistry;

  const getStatusStyles = (statusWord) => {
    const normalize = statusWord?.toLowerCase();
    switch (normalize) {
      case 'completed':
      case 'interviewing':
        return 'bg-[#14321a]/60 text-[#4ade80] border-[#166534]/40';
      case 'new':
      case 'pending':
        return 'bg-[#27272a] text-[#e4e4e7] border-[#3f3f46]/70';
      case 'reviewing':
      case 'processing':
        return 'bg-[#45230d]/50 text-[#fb923c] border-[#9a3412]/40';
      case 'rejected':
      case 'cancelled':
        return 'bg-[#4c1d1d]/50 text-[#f87171] border-[#991b1b]/40';
      default:
        return 'bg-[#27272a] text-[#e4e4e7] border-[#3f3f46]/70';
    }
  };

  return (
    <motion.tr
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: Math.min(index * 0.04, 0.4) }}
      className="hover:bg-zinc-800/30 transition-colors group border-b border-zinc-800/20"
    >
      {/* Ebook Name cell with responsive width clipping */}
      <td className="py-4.5 px-4 sm:px-6 font-medium text-zinc-100">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700/40 flex items-center justify-center text-xs text-zinc-400 group-hover:border-zinc-600 transition-colors shrink-0">
            {title ? title.charAt(0).toUpperCase() : 'B'}
          </div>
          <span className="truncate max-w-[180px] sm:max-w-[240px] md:max-w-xs block" title={title}>
            {title || 'Untitled Book'}
          </span>
        </div>
      </td>

      {/* Writer Column */}
      <td className="py-4.5 px-4 sm:px-6 text-zinc-400 text-sm truncate max-w-[140px]" title={writerName}>
        {writerName || 'Unknown Author'}
      </td>

      {/* Purchase Date Column */}
      <td className="py-4.5 px-4 sm:px-6 text-zinc-400 text-sm whitespace-nowrap">
        {date ? new Date(date).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        }) : 'Oct 24, 2023'}
      </td>

      {/* Price Column */}
      <td className="py-4.5 px-4 sm:px-6 text-zinc-300 text-sm font-medium whitespace-nowrap">
        {typeof price === 'number' ? `$${price.toFixed(2)}` : price || '$0.00'}
      </td>

      {/* Status Column */}
      <td className="py-4.5 px-4 sm:px-6 text-right whitespace-nowrap">
        <span className={`inline-block px-3 py-1 rounded-full text-[11px] sm:text-xs font-medium border tracking-wide shadow-sm min-w-[85px] text-center ${getStatusStyles(status)}`}>
          {status || 'New'}
        </span>
      </td>
    </motion.tr>
  );
};

export default PurchesHistortyCard;