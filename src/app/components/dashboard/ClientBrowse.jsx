
"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card } from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const CATEGORIES = [
    "All",
    "Fantasy",
    "Sci-Fi",
    "Mystery",
    "Romance",
    "Thriller",
    "Non-Fiction",
];

const SORT_OPTIONS = [
    { key: "alpha-asc", label: "Alphabetical (A-Z)" },
    { key: "alpha-desc", label: "Alphabetical (Z-A)" },
    { key: "newest", label: "Newest First" },
    { key: "price-asc", label: "Price: Low to High" },
    { key: "price-desc", label: "Price: High to Low" },
];

export default function ClientBrowse({ initialBooks = [] }) {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Read state indicators directly from URL parameters
    const activeSearch = searchParams.get("search") || "";
    const activeGenre = searchParams.get("genre") || "All";
    const activeSort = searchParams.get("sort") || "alpha-asc";

    // Unified function updating parameter keys dynamically
    const updateQueryParam = (key, value) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value && value !== "All") {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        router.push(`/browse?${params.toString()}`);
    };

    return (
        <div className="space-y-8">
            {/* FILTER CONTROLS BAR CONTAINER AREA */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 p-6 rounded-2xl shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">

                    {/* SEARCH CATALOG INPUT */}
                    <div className="md:col-span-6 flex flex-col gap-2">
                        <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                            Search Catalog
                        </label>
                        <div className="relative flex items-center">
                            <div className="absolute left-3.5 pointer-events-none text-slate-400">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    className="w-4 h-4"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                                    />
                                </svg>
                            </div>
                            <input
                                type="text"
                                placeholder="Search recipes, ingredients, titles..."
                                value={activeSearch}
                                onChange={(e) => updateQueryParam("search", e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 text-sm text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all"
                            />
                        </div>
                    </div>

                    {/* FILTER CATEGORY SELECT */}
                    <div className="md:col-span-3 flex flex-col gap-2">
                        <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                            Filter Category
                        </label>
                        <select
                            value={activeGenre}
                            onChange={(e) => updateQueryParam("genre", e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all cursor-pointer"
                        >
                            {CATEGORIES.map((category) => (
                                <option key={category} value={category} className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* SORT METRICS SELECT */}
                    <div className="md:col-span-3 flex flex-col gap-2">
                        <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                            Sort Metrics
                        </label>
                        <select
                            value={activeSort}
                            onChange={(e) => updateQueryParam("sort", e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all cursor-pointer"
                        >
                            {SORT_OPTIONS.map((option) => (
                                <option key={option.key} value={option.key} className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>

                </div>
            </div>

            {/* GALLERY GRID VIEW DISPLAY LOGIC ENGINE */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                <AnimatePresence mode="popLayout">
                    {initialBooks.filter(Boolean).map((book) => (
                        <motion.div
                            key={book._id}
                            layout
                            initial={{ opacity: 0, scale: 0.96 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                        >
                            <Link href={`/browseEbook/${book._id}`}>
                                <Card className="bg-slate-900/40 border border-slate-800/80 rounded-2xl overflow-hidden flex flex-col h-[380px] group hover:border-slate-700/60 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-2xl">
                                    {/* Cover Thumbnail Frame */}
                                    <div className="relative aspect-[3/4] w-full bg-slate-950 overflow-hidden">
                                        {book.coverImage && (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img
                                                src={book.coverImage}
                                                alt={book.title}
                                                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                                            />
                                        )}

                                        {book.status === "sold" && (
                                            <div className="absolute top-2.5 right-2.5 z-10">
                                                <span className="px-2.5 py-0.5 rounded-md text-[9px] font-black bg-red-500/20 backdrop-blur-md text-red-400 uppercase tracking-widest border border-red-500/30 shadow-sm">
                                                    Sold
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Info Metadata */}
                                    <div className="p-4 flex flex-col justify-between flex-grow">
                                        <div className="space-y-0.5">
                                            <h4 className="font-bold text-slate-200 text-sm line-clamp-1 group-hover:text-indigo-400 transition-colors">
                                                {book.title}
                                            </h4>
                                            <p className="text-xs text-slate-400 line-clamp-1">
                                                By {book.writerName || book.author || "Fable Contributor"}
                                            </p>
                                        </div>

                                        <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-800/40">
                                            <span className="text-[10px] text-indigo-400 font-bold tracking-wider uppercase bg-indigo-500/10 px-2 py-0.5 rounded-md">
                                                {book.genre || "Story"}
                                            </span>
                                            <span className="text-emerald-400 font-extrabold text-sm">
                                                ${book.price?.toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                </Card>
                            </Link>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* EMPTY RESULT PRESENTATION FALLBACK */}
            {initialBooks.length === 0 && (
                <div className="flex flex-col items-center justify-center text-center py-24 space-y-3">
                    <div className="p-4 bg-slate-900/60 rounded-full border border-slate-800/80 text-slate-600">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-7 h-7"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.008 1.24l.885 1.77a2.25 2.25 0 0 0 2.007 1.24h1.98a2.25 2.25 0 0 0 2.007-1.24l.885-1.77a2.25 2.25 0 0 1 2.007-1.24h3.86m-18 0h18"
                            />
                        </svg>
                    </div>
                    <div className="space-y-0.5">
                        <h3 className="text-base font-bold text-slate-300">
                            No Ebooks Discovered
                        </h3>
                        <p className="text-xs text-slate-500 max-w-xs mx-auto">
                            We locate any manuscripts that match your current search criteria.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}