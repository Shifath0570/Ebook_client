'use client';

import React from 'react';
import { Card } from '@heroui/react';
import { motion } from 'framer-motion';

const BookMarkCard = ({ bookMark, index }) => {
    const {
        title = 'Untitled eBook',
        price = 'TBD',
        genre = 'Digital',
        description = 'No description available.',
        coverImage = ''
    } = bookMark;

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: index * 0.05, ease: 'easeOut' }}
            whileHover={{ y: -8, scale: 1.015, transition: { duration: 0.25 } }}
        >
            <Card
                isPressable
                className="group relative h-[380px] w-full border border-slate-800/50 bg-slate-900 shadow-2xl hover:border-slate-700/80 transition-all duration-300 rounded-2xl overflow-hidden"
            >
                {/* Full-bleed Native Image Layer */}
                {coverImage && (
                    <img
                        src={coverImage}
                        alt={`Cover for ${title}`}
                        className="absolute inset-0 w-full h-full object-cover z-0 group-hover:scale-105 transition-transform duration-500"
                    />
                )}

                {/* Text-Optimizing Gradient Overlay (Bottom-up Fade) */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/85 to-slate-900/30 z-10" />

                {/* Content Layout Wrapper */}
                <div className="relative w-full h-full flex flex-col justify-between p-6 z-20 text-left">

                    {/* Top Row: Meta Badge */}
                    <div className="flex items-center gap-2">
                        <span className="px-3 py-1 text-[10px] font-semibold tracking-wider uppercase rounded-full bg-slate-950/70 border border-slate-700/50 text-slate-300 backdrop-blur-sm">
                            {genre}
                        </span>
                    </div>

                    {/* Main Context Stack */}
                    <div className="space-y-4 w-full">

                        {/* Title & Description Stack */}
                        <div className="space-y-1.5">
                            <h4 className="text-2xl font-bold tracking-tight text-white line-clamp-2 leading-tight">
                                {title}
                            </h4>
                            <p className="text-sm text-slate-300 line-clamp-2 leading-relaxed font-light">
                                {description}
                            </p>
                        </div>

                        {/* Middle Dynamic Row: Smooth Hover Reveal Details Button */}
                        <div className="h-0 opacity-0 group-hover:h-10 group-hover:opacity-100 transition-all duration-300 ease-out overflow-hidden">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation(); // Prevents card pressing trigger
                                    alert(`Viewing details for: ${title}`);
                                }}
                                className="w-full h-10 flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 active:scale-[0.98] border border-white/10 hover:border-white/20 text-white rounded-xl text-xs font-semibold tracking-wide transition-all backdrop-blur-sm"
                            >
                                View Details
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </button>
                        </div>

                        {/* Bottom Card Footer: Pricing and Details */}
                        <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-700/40">
                            <span className="text-xs font-medium text-slate-400 group-hover:text-slate-300 transition-colors line-clamp-1">
                                eBook Gallery • Fable MERN
                            </span>

                            {/* Clean Price container */}
                            <span className="text-sm font-semibold tracking-wide text-white bg-slate-950/70 px-4 py-1.5 rounded-lg border border-slate-800/80 backdrop-blur-sm shadow-sm">
                                {typeof price === 'number' ? `$${price}` : price}
                            </span>
                        </div>
                    </div>

                </div>
            </Card>
        </motion.div>
    );
};

export default BookMarkCard;