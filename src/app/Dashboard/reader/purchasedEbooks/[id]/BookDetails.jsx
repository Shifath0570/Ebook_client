// src/app/dashboard/library/[id]/BookDetails.jsx
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, Button, Chip } from '@heroui/react';
import { motion } from 'framer-motion';

const BookDetails = ({ book }) => {
    const { _id, title, writerName, writerId, coverImage, description, price, genre, date} = book;

    return (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Column: High-Res Sticky Cover Image */}
            <motion.div 
                className="md:col-span-5 lg:col-span-4 md:sticky md:top-24"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
            >
                <Card variant="default" className="w-full overflow-hidden border-none shadow-xl bg-default-100/20 backdrop-blur-md">
                    <Card.Content className="p-0 aspect-[3/4] relative w-full">
                        <Image
                            src={coverImage}
                            alt={`Cover art for ${title}`}
                            fill
                            priority
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover"
                        />
                    </Card.Content>
                </Card>
            </motion.div>

            {/* Right Column: Comprehensive Ebook Information */}
            <motion.div 
                className="md:col-span-7 lg:col-span-8 flex flex-col gap-6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
            >
                {/* Meta Header */}
                <div className="flex flex-col gap-2">
                    <div className="flex flex-wrap gap-2 items-center">
                        <Chip variant="flat" color="primary" size="sm" className="capitalize">
                            {genre}
                        </Chip>
                        <span className="text-xs text-default-400">
                            Uploaded {date ? new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : "N/A"}
                        </span>
                    </div>
                    
                    <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-default-900 mt-1">
                        {title}
                    </h1>

                    <p className="text-lg text-default-500">
                        By{' '}
                        <Link 
                            href={`/authors/${writerId}`}
                            className="text-primary hover:underline font-medium transition-all inline-block"
                        >
                            {writerName}
                        </Link>
                    </p>
                </div>

                <hr className="border-default-100" />

                {/* Price Display */}
                <div className="flex items-baseline gap-2">
                    <span className="text-xs text-default-400 font-semibold uppercase tracking-wider">Price Paid</span>
                    <span className="text-3xl font-black text-default-900">
                        {price === 0 ? 'Free' : `$${Number(price).toFixed(2)}`}
                    </span>
                </div>

                {/* Description Text Content */}
                <div className="flex flex-col gap-3">
                    <h2 className="text-xl font-bold text-default-800">Synopsis</h2>
                    <p className="text-default-600 leading-relaxed text-base whitespace-pre-line">
                        {description}
                    </p>
                </div>
            </motion.div>

        </div>
    );
};

export default BookDetails;