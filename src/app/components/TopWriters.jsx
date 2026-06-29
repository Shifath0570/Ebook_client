"use client";

import { motion } from "framer-motion";
import { Avatar, Card } from "@heroui/react";

const TopWriters = () => {
    // Mock data representing the top 3 high-performing authors on Fable
    const writers = [
        {
            id: "1",
            name: "Elena Rostova",
            avatar: "https://heroui.com/images/avatar-1.png",
            totalSales: "$45,210",
            totalBooks: 14,
            rank: 1,
            badge: "👑 Top Earner",
        },
        {
            id: "2",
            name: "Marcus Vance",
            avatar: "https://heroui.com/images/avatar-2.png",
            totalSales: "$32,840",
            totalBooks: 9,
            rank: 2,
            badge: "🔥 Rising Star",
        },
        {
            id: "3",
            name: "Seraphina Vance",
            avatar: "https://heroui.com/images/avatar-3.png",
            totalSales: "$28,150",
            totalBooks: 11,
            rank: 3,
            badge: "⭐ Elite Author",
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 70, damping: 16 },
        },
    };

    return (
        <div className="relative py-24 w-full bg-background overflow-hidden">

            {/* Decorative localized blurred mesh background to amplify glass contrast */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[800px] rounded-full bg-purple-500/5 blur-[120px]" />
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">

                {/* Section Heading Layout */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-xs uppercase tracking-widest font-bold text-primary">Master Storytellers</span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground mt-1">
                        Top Creators This Month
                    </h2>
                    <p className="text-default-500 mt-3 text-base">
                        Meet the top independent writers shaping narratives, cultivating massive readerships, and earning direct royalty pipelines.
                    </p>
                </div>

                {/* Responsive Grid Layer */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch"
                >
                    {writers.map((writer) => (
                        <motion.div key={writer.id} variants={cardVariants} className="h-full">
                            <Card
                                className="relative h-full p-8 flex flex-col items-center text-center overflow-hidden transition-all duration-300 hover:-translate-y-2 rounded-3xl group
                           bg-white/5 dark:bg-black/10 backdrop-blur-xl border border-white/10 dark:border-default-100/30 shadow-[0_8px_32px_0_rgba(0,0,0,0.08)]"
                            >
                                {/* Subtle internal glowing hover gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                {/* Premium Rank Rank Banner Badge */}
                                <div className="absolute top-4 right-4">
                                    <span className="inline-flex items-center px-3 py-1 rounded-xl text-xs font-bold bg-white/10 dark:bg-default-100/50 text-foreground border border-white/10 backdrop-blur-md">
                                        {writer.badge}
                                    </span>
                                </div>

                                {/* Avatar Stage Graphic */}
                                <div className="relative mt-4 mb-6">
                                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary to-purple-500 blur-md opacity-40 group-hover:opacity-70 transition-opacity duration-300" />
                                    <Avatar
                                        src={writer.avatar}
                                        name={writer.name}
                                        className="w-24 h-24 text-large ring-4 ring-background/50 relative z-10"
                                    />
                                    <div className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground font-black text-xs h-7 w-7 rounded-full flex items-center justify-center border-2 border-background shadow-md z-20">
                                        #{writer.rank}
                                    </div>
                                </div>

                                {/* Name & Credentials */}
                                <h3 className="font-bold text-xl text-foreground tracking-tight group-hover:text-primary transition-colors duration-200">
                                    {writer.name}
                                </h3>
                                <p className="text-xs text-default-400 font-medium mt-1">Independent Creator</p>

                                {/* Glassmorphic Metrics Summary Block */}
                                <div className="w-full grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-white/5 dark:border-default-100/20">
                                    <div className="flex flex-col items-center">
                                        <span className="text-[10px] uppercase font-bold text-default-400 tracking-wider">Total Sales</span>
                                        <span className="text-lg font-black text-foreground mt-1 tracking-tight">
                                            {writer.totalSales}
                                        </span>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <span className="text-[10px] uppercase font-bold text-default-400 tracking-wider">Ebooks</span>
                                        <span className="text-lg font-black text-foreground mt-1 tracking-tight">
                                            {writer.totalBooks}
                                        </span>
                                    </div>
                                </div>

                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default TopWriters;