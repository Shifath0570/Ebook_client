
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Next.js native optimized Image
import { Card, Button } from '@heroui/react';
import { motion } from 'framer-motion';

const PurchaseEbookCard = ({ purchaseData }) => {
  // Destructure with fallbacks based on your API structure
  const { _id, coverImage, title, writerName,  } = purchaseData || {};
//   const {
//     _id: bookMongoId,
//     title = 'Untitled Masterpiece',
//     coverImage = 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=400',
//     author = 'Unknown Author'
//   } = bookId || {};

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <Card 
        variant="default"
        className="w-full h-[420px] overflow-hidden border-none bg-background/60 dark:bg-default-100/50 backdrop-blur-md shadow-md hover:shadow-xl transition-shadow duration-300"
      >
        {/* Next.js Image wrapper container */}
        <Card.Content className="p-0 relative h-[75%] w-full overflow-hidden">
          <Image
            alt={title}
            src={coverImage}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw"
            priority={false}
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
        </Card.Content>
        
        {/* Footer actions */}
        <Card.Footer className="flex flex-col justify-between items-start h-[25%] p-4 gap-2">
          <div className="w-full overflow-hidden">
            <h3 className="font-bold text-default-800 text-base truncate w-full">
              {title}
            </h3>
            <p className="text-xs text-default-500 truncate w-full">
              By {writerName}
            </p>
          </div>
          
          <Link
            href={`/Dashboard/reader/purchasedEbooks/${_id}`}
            className="w-full bg-gradient-to-r from-primary to-secondary text-white font-medium text-xs shadow-md"
            size="sm"
            variant="default"
          >
            Read Ebook
          </Link>
        </Card.Footer>
      </Card>
    </motion.div>
  );
};

export default PurchaseEbookCard;