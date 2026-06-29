"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Card } from "@heroui/react";

const EbookGenres = () => {
    const router = useRouter();

    // Custom configuration containing specific vector shapes and dynamic accents
    const genres = [
        {
            name: "Fantasy",
            slug: "fantasy",
            color: "from-purple-500/10 to-indigo-500/10 hover:border-purple-500/50 text-purple-500",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-7 h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21l8.904-4.43c.969-.482 2.094-.482 3.063 0L21 17l-5.096-9.813a1.13 1.13 0 00-1.96 0L9.813 15.904z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v3.375M12 3a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
                </svg>
            ),
        },
        {
            name: "Mystery",
            slug: "mystery",
            color: "from-blue-500/10 to-slate-500/10 hover:border-blue-500/50 text-blue-500",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-7 h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
        },
        {
            name: "Romance",
            slug: "romance",
            color: "from-rose-500/10 to-pink-500/10 hover:border-rose-500/50 text-rose-500",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-7 h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
            ),
        },
        {
            name: "Sci-Fi",
            slug: "sci-fi",
            color: "from-cyan-500/10 to-teal-500/10 hover:border-cyan-500/50 text-cyan-500",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-7 h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
            ),
        },
        {
            name: "Horror",
            slug: "horror",
            color: "from-orange-600/10 to-red-600/10 hover:border-orange-600/50 text-orange-600",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-7 h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            ),
        },
        {
            name: "Adventure",
            slug: "adventure",
            color: "from-amber-500/10 to-emerald-500/10 hover:border-amber-500/50 text-amber-600",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-7 h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8m-6-3h.008v.008H9V14zm6-3h.008v.008H15V11zM2.25 12a9.75 9.75 0 1119.5 0 9.75 9.75 0 01-19.5 0z" />
                </svg>
            ),
        },
        {
            name: "History",
            slug: "history",
            color: "from-yellow-600/10 to-stone-600/10 hover:border-yellow-600/50 text-yellow-600",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-7 h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
            ),
        },
    ];

    const handleGenreClick = (slug) => {
        // Navigates natively to the collection view appended with selected url states
        router.push(`/browse?genre=${slug}`);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.08 },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, scale: 0.95, y: 15 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { type: "spring", stiffness: 100, damping: 15 },
        },
    };

    return (
        <div className="py-20 w-full bg-background relative overflow-hidden">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Header Block layout */}
                <div className="flex flex-col mb-12">
                    <span className="text-xs uppercase tracking-widest font-bold text-primary">Explore Categories</span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground mt-1">
                        Browse by Genre
                    </h2>
                    <p className="text-default-500 mt-2 max-w-xl">
                        Find exactly what you are looking for. Select from our carefully organized collections to filter original publications.
                    </p>
                </div>

                {/* Dynamic Responsive Category Grid Layout */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4"
                >
                    {genres.map((genre) => (
                        <motion.div
                            key={genre.slug}
                            variants={cardVariants}
                            whileHover={{ scale: 1.04, y: -4 }}
                            whileTap={{ scale: 0.98 }}
                            className="h-full cursor-pointer"
                            onClick={() => handleGenreClick(genre.slug)}
                        >
                            <Card
                                className={`h-full p-6 flex flex-col items-center justify-center text-center gap-4 bg-gradient-to-br border border-default-100 dark:border-default-50 transition-colors duration-300 rounded-2xl shadow-sm ${genre.color}`}
                            >
                                {/* Embedded dynamic vector background circle */}
                                <div className="p-3 bg-background dark:bg-content1 rounded-xl shadow-inner border border-default-100/40">
                                    {genre.icon}
                                </div>

                                <span className="font-bold text-sm tracking-tight text-foreground">
                                    {genre.name}
                                </span>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default EbookGenres;