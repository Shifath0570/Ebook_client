"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, Button } from "@heroui/react";

const Featured = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch the latest 6 ebooks
    useEffect(() => {
        const fetchLatestEbooks = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/ebooks?limit=6`);
                const data = await response.json()
                setBooks(data);
            } catch (err) {
                console.error("Error fetching featured ebooks:", err);
                // Production fallback mockup if api routes are pending setup
                setBooks([
                    { _id: "1", title: "The Sovereign Code", writer: "Elena Rostova", price: 8.99, rating: 4.9, cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=400" },
                    { _id: "2", title: "Echoes of the Wasteland", writer: "Marcus Vance", price: 0.00, rating: 4.7, cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=400" },
                    { _id: "3", title: "Whispers of Alchemy", writer: "Seraphina Vance", price: 12.50, rating: 5.0, cover: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=400" },
                    { _id: "4", title: "Beyond the Event Horizon", writer: "Kaelen Drake", price: 4.99, rating: 4.6, cover: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=400" },
                    { _id: "5", title: "Mastering Next Architecture", writer: "Devon Lane", price: 29.99, rating: 4.9, cover: "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?q=80&w=400" },
                    { _id: "6", title: "Shadows Over Elvoria", writer: "Lyra Thorne", price: 3.49, rating: 4.8, cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=400" },
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchLatestEbooks();
    }, []);

    // Framer Motion staggered grid layout variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 80, damping: 15 },
        },
    };

    return (
        <div className="py-20 w-full bg-background relative overflow-hidden">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Section Title Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                    <div>
                        <span className="text-xs uppercase tracking-widest font-bold text-primary">Curated Masterpieces</span>
                        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground mt-1">
                            Featured Ebooks
                        </h2>
                        <p className="text-default-500 mt-2 max-w-xl">
                            Dive into the most read and critically acclaimed original self-published gems across the Fable universe today.
                        </p>
                    </div>
                    <Button
                        as={Link}
                        href="/browse"
                        variant="flat"
                        color="primary"
                        className="font-semibold rounded-xl self-start md:self-auto"
                    >
                        Explore Full Library &rarr;
                    </Button>
                </div>

                {/* Loading Skeletons */}
                {loading && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[...Array(6)].map((_, index) => (
                            <div key={index} className="w-full h-[460px] bg-default-100 rounded-2xl animate-pulse" />
                        ))}
                    </div>
                )}

                {/* Dynamic Interactive Books Grid */}
                {!loading && (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {books.map((book) => (
                            <motion.div key={book._id} variants={cardVariants} className="h-full">
                                <Card className="h-full p-4 bg-content1 border border-default-100 shadow-sm hover:shadow-xl transition-all duration-300 rounded-2xl group flex flex-col justify-between">
                                    <div>
                                        {/* Cover Wrap Layer */}
                                        <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-default-100 mb-4 shadow-sm">
                                            <img
                                                src={book.cover}
                                                alt={book.title}
                                                className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                                                loading="lazy"
                                            />
                                            {/* Floating Rating Tag Badge */}
                                            <div className="absolute top-3 left-3 bg-background/80 dark:bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-lg flex items-center gap-1 border border-white/10 shadow-sm">
                                                <svg className="w-3.5 h-3.5 text-warning fill-warning" viewBox="0 0 20 20" fill="currentColor">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                                <span className="text-xs font-bold text-foreground">{book.rating.toFixed(1)}</span>
                                            </div>
                                        </div>

                                        {/* Metadata Content */}
                                        <div className="px-1">
                                            <h3 className="font-bold text-lg text-foreground tracking-tight line-clamp-1 group-hover:text-primary transition-colors duration-200">
                                                {book.title}
                                            </h3>
                                            <p className="text-xs text-default-400 mt-0.5 font-medium">By {book.writer}</p>
                                        </div>
                                    </div>

                                    {/* Pricing / CTA Interaction Footer */}
                                    <div className="mt-5 px-1 flex items-center justify-between gap-4">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] uppercase font-semibold text-default-400 tracking-wider">Price</span>
                                            <span className="text-xl font-extrabold text-foreground">
                                                {book.price === 0 ? (
                                                    <span className="text-success text-lg font-bold">Free</span>
                                                ) : (
                                                    `$${book.price.toFixed(2)}`
                                                )}
                                            </span>
                                        </div>
                                        <Button
                                            as={Link}
                                            href={`/ebooks/${book._id}`}
                                            variant="solid"
                                            color="default"
                                            size="md"
                                            className="font-bold rounded-xl bg-default-100 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                                        >
                                            View Details
                                        </Button>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default Featured;