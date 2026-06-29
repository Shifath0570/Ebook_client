'use client';

import React from 'react';
import { motion } from 'framer-motion';

const TransactionTable = ({ book, index }) => {
  // Destructure transactional fields safely from document item
  const { transactionId, type, userEmail, price, date } = book;

  // Custom pill coloring logic corresponding to screenshot status elements
  const getTypeBadgeStyles = (transactionType) => {
    switch (transactionType?.toLowerCase()) {
      case 'purchase':
        return 'bg-emerald-950/40 text-emerald-400 border-emerald-800/30';
      case 'publishing fee':
      case 'fee':
        return 'bg-amber-950/40 text-amber-500 border-amber-800/30';
      default:
        return 'bg-zinc-800 text-zinc-300 border-zinc-700/50';
    }
  };

  return (
    <motion.tr
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: Math.min(index * 0.04, 0.4) }}
      className="hover:bg-zinc-800/30 transition-colors group border-b border-zinc-800/20"
    >
      {/* Column 1: Shortened Hash-style Transaction ID Column */}
      <td className="py-4.5 px-4 sm:px-6 font-mono text-xs text-zinc-400 tracking-wider">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700/40 flex items-center justify-center text-xs text-zinc-400 shrink-0">
            💳
          </div>
          <span className="text-zinc-300 font-medium group-hover:text-zinc-100 transition-colors" title={transactionId}>
            {transactionId ? `TXN-${String(transactionId).slice(-8).toUpperCase()}` : 'TXN-UNKNOWN'}
          </span>
        </div>
      </td>

      {/* Column 2: Operation Transaction Flow Classification Badge */}
      <td className="py-4.5 px-4 sm:px-6 whitespace-nowrap">
        <span className={`inline-block px-3 py-1 rounded-full text-[11px] sm:text-xs font-medium border tracking-wide uppercase min-w-[110px] text-center shadow-sm ${getTypeBadgeStyles(type)}`}>
          {type || 'Purchase'}
        </span>
      </td>

      {/* Column 3: User/Writer Target Account Email Entity */}
      <td className="py-4.5 px-4 sm:px-6 text-zinc-300 text-sm truncate max-w-[220px]" title={userEmail || 'system-ledger@fable.com'}>
        {userEmail || 'system-ledger@fable.com'}
      </td>

      {/* Column 4: System Event Date Log Timestamp Column */}
      <td className="py-4.5 px-4 sm:px-6 text-zinc-400 text-sm whitespace-nowrap">
        {date ? new Date(date).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }) : 'Jun 29, 2026'}
      </td>

      {/* Column 5: Financial Amount Value Column Indicator (Inward vs Outward Indicator Context) */}
      <td className="py-4.5 px-4 sm:px-6 text-right whitespace-nowrap font-medium">
        <span className={`text-sm ${
          type?.toLowerCase() === 'purchase' ? 'text-emerald-400 font-semibold' : 'text-zinc-200'
        }`}>
          {type?.toLowerCase() === 'purchase' ? '+' : ''}{typeof price === 'number' ? `$${price.toFixed(2)}` : price || '$0.00'}
        </span>
      </td>
    </motion.tr>
  );
};

export default TransactionTable;