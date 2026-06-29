"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, Button, TextField, Select, ListBox } from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const GENRES = ["Fantasy", "Sci-Fi", "Mystery", "Romance", "Thriller", "Non-Fiction"];

export default function ClientBrowse({ initialBooks = [] }) {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Read state indicators directly from url parameters synchronously
    const activeSearch = searchParams.get("search") || "";
    const activeGenre = searchParams.get("genre") || "";
    const activeSort = searchParams.get("sort") || "newest";

    // Unified function updating parameter keys dynamically without mounting cycles
    const updateQueryParam = (key, value) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        router.push(`/browse?${params.toString()}`);
    };

    const clearFilters = () => {
        router.push("/browse");
    };

    return (
        <div className="space-y-8">

            {/* FILTER CONTROLS BAR CONTAINER AREA */}
            <Card className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 p-4 rounded-2xl">
                <Card.Content className="p-0 grid grid-cols-1 md:grid-cols-12 gap-4 items-end">

                    {/* Text Input Search */}
                    <div className="md:col-span-5">
                        <TextField className="w-full">
                            <input
                                type="text"
                                placeholder="Search titles or authors..."
                                value={activeSearch}
                                onChange={(e) => updateQueryParam("search", e.target.value)}
                                className="w-full rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs text-slate-200 px-3 py-2.5 focus:outline-none focus:border-indigo-500 transition-colors placeholder-slate-600"
                            />
                        </TextField>
                    </div>

                    {/* Genre Selection Item */}
                    <div className="md:col-span-3">
                        <Select
                            value={activeGenre || null}
                            onChange={(val) => updateQueryParam("genre", val)}
                            className="w-full rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs text-slate-200 px-2 py-2.5"
                        >
                            <Select.Trigger className="w-full flex justify-between text-left">
                                <Select.Value placeholder="All Genres" />
                            </Select.Trigger>
                            <Select.Popover className="bg-slate-900 border border-slate-800 rounded-xl p-1 shadow-xl z-50">
                                <ListBox>
                                    {GENRES.map((g) => (
                                        <ListBox.Item key={g} id={g.toLowerCase()} className="px-3 py-2 text-xs rounded-lg hover:bg-slate-800 cursor-pointer text-slate-300">
                                            {g}
                                        </ListBox.Item>
                                    ))}
                                </ListBox>
                            </Select.Popover>
                        </Select>
                    </div>

                    {/* Sort Selection Menu */}
                    <div className="md:col-span-2">
                        <Select
                            value={activeSort || null}
                            onChange={(val) => updateQueryParam("sort", val)}
                            className="w-full rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs text-slate-200 px-2 py-2.5"
                        >
                            <Select.Trigger className="w-full flex justify-between text-left">
                                <Select.Value placeholder="Sort By" />
                            </Select.Trigger>
                            <Select.Popover className="bg-slate-900 border border-slate-800 rounded-xl p-1 shadow-xl z-50">
                                <ListBox>
                                    <ListBox.Item id="newest" className="px-3 py-2 text-xs rounded-lg hover:bg-slate-800 cursor-pointer text-slate-300">Newest</ListBox.Item>
                                    <ListBox.Item id="price-asc" className="px-3 py-2 text-xs rounded-lg hover:bg-slate-800 cursor-pointer text-slate-300">Price: Low to High</ListBox.Item>
                                    <ListBox.Item id="price-desc" className="px-3 py-2 text-xs rounded-lg hover:bg-slate-800 cursor-pointer text-slate-300">Price: High to Low</ListBox.Item>
                                </ListBox>
                            </Select.Popover>
                        </Select>
                    </div>

                    {/* Action Reset Widgets */}
                    <div className="md:col-span-2">
                        <Button onClick={clearFilters} className="w-full bg-slate-800 hover:bg-slate-700 font-medium text-slate-300 text-xs h-[38px] rounded-xl transition-all">
                            Reset Filters
                        </Button>
                    </div>

                </Card.Content>
            </Card>

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
                                    <Card.Content className="p-4 flex flex-col justify-between flex-grow">
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
                                    </Card.Content>

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
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.008 1.24l.885 1.77a2.25 2.25 0 0 0 2.007 1.24h1.98a2.25 2.25 0 0 0 2.007-1.24l.885-1.77a2.25 2.25 0 0 1 2.007-1.24h3.86m-18 0h18" />
                        </svg>
                    </div>
                    <div className="space-y-0.5">
                        <h3 className="text-base font-bold text-slate-300">No Ebooks Discovered</h3>
                        <p className="text-xs text-slate-500 max-w-xs mx-auto">We locate any manuscripts that match your current search criteria.</p>
                    </div>
                </div>
            )}

        </div>
    );
}