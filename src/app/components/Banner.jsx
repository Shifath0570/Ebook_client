"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@heroui/react";

const Banner = () => {
    // Animation configurations for crisp layouts
    const fadeUpVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: (custom) => ({
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 20,
                delay: custom * 0.15,
            },
        }),
    };

    const floatVariants = (duration, delay, yOffset = 15) => ({
        animate: {
            y: [0, -yOffset, 0],
            transition: {
                duration: duration,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: delay,
            },
        },
    });

    return (
        <div className="relative min-h-[calc(100vh-4rem)] w-full overflow-hidden bg-background flex items-center justify-center py-12 lg:py-20">

            {/* Premium Background Mesh Gradients */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-primary/10 blur-[120px]" />
                <div className="absolute bottom-[-5%] right-[-5%] h-[600px] w-[600px] rounded-full bg-purple-500/10 blur-[150px]" />
                {/* Subtle grid pattern for texture */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

                    {/* Left Side Content Column */}
                    <div className="col-span-1 lg:col-span-6 flex flex-col justify-center text-center lg:text-left">

                        {/* Tagline/Badge */}
                        <motion.div
                            custom={0}
                            initial="hidden"
                            animate="visible"
                            variants={fadeUpVariants}
                            className="inline-flex items-center justify-center lg:justify-start gap-2 mb-5"
                        >
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 backdrop-blur-md">
                                ✨ Next-Gen Self-Publishing Hub
                            </span>
                        </motion.div>

                        {/* Main Premium Heading */}
                        <motion.h1
                            custom={1}
                            initial="hidden"
                            animate="visible"
                            variants={fadeUpVariants}
                            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1]"
                        >
                            Discover & Read{" "}
                            <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                                Original Ebooks
                            </span>
                        </motion.h1>

                        {/* Platform Description */}
                        <motion.p
                            custom={2}
                            initial="hidden"
                            animate="visible"
                            variants={fadeUpVariants}
                            className="mt-6 text-base sm:text-lg text-default-500 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed"
                        >
                            Step into Fable. Explore a vast digital archive filled with indie masterpieces,
                            or unleash your inner creator, secure corporate royalties via Stripe, and publish your own stories to readers worldwide.
                        </motion.p>

                        {/* Call to Actions */}
                        <motion.div
                            custom={3}
                            initial="hidden"
                            animate="visible"
                            variants={fadeUpVariants}
                            className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
                        >
                            <Button
                                as={Link}
                                href="/browse"
                                color="primary"
                                size="lg"
                                className="w-full sm:w-auto font-semibold rounded-xl text-medium px-8 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
                            >
                                Browse Ebooks
                            </Button>
                            <Button
                                as={Link}
                                href="/dashboard"
                                variant="bordered"
                                color="default"
                                size="lg"
                                className="w-full sm:w-auto font-semibold rounded-xl text-medium px-8 hover:bg-default-100 transition-all duration-300 border-default-200"
                            >
                                Become Writer
                            </Button>
                        </motion.div>
                    </div>

                    {/* Right Side Illustration & Floating Cards Column */}
                    <div className="col-span-1 lg:col-span-6 relative flex items-center justify-center lg:justify-end min-h-[400px] sm:min-h-[500px]">

                        {/* Interactive Centered Main Book/Device Graphic Layer */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.85, rotate: -2 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            transition={{ type: "spring", stiffness: 60, damping: 20, delay: 0.3 }}
                            className="relative w-72 h-96 sm:w-80 sm:h-[440px] bg-gradient-to-br from-primary/30 to-purple-600/30 rounded-2xl border border-white/10 p-4 shadow-2xl backdrop-blur-sm z-10 flex flex-col justify-end overflow-hidden group"
                        >
                            {/* Internal Art/Cover for Graphic */}
                            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=600')] bg-cover bg-center mix-blend-overlay opacity-60 transition-transform duration-700 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                            <div className="relative z-20 text-white">
                                <span className="text-xs uppercase tracking-wider font-bold text-primary-300">Featured Fable</span>
                                <h3 className="text-xl font-bold mt-1">The Chronicles of Eternity</h3>
                                <p className="text-xs text-default-300 mt-1">By Arthur Pendelton</p>
                            </div>
                        </motion.div>

                        {/* Floating Book Card 1: Top Left */}
                        <motion.div
                            variants={floatVariants(6, 0, 15)}
                            animate="animate"
                            className="absolute top-4 left-4 sm:left-12 z-20 bg-background/80 dark:bg-content1/80 backdrop-blur-md border border-default-100 p-3 rounded-xl shadow-xl flex items-center gap-3 w-48 pointer-events-none"
                        >
                            <div className="h-12 w-9 bg-primary/20 rounded-md overflow-hidden flex-shrink-0">
                                <div className="h-full w-full bg-[url('https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=150')] bg-cover bg-center" />
                            </div>
                            <div className="flex flex-col min-w-0">
                                <span className="text-xs font-bold text-foreground truncate">Neon Odyssey</span>
                                <span className="text-[10px] text-default-400">Sci-Fi</span>
                                <span className="text-[11px] font-semibold text-primary mt-1">$4.99</span>
                            </div>
                        </motion.div>

                        {/* Floating Book Card 2: Bottom Right */}
                        <motion.div
                            variants={floatVariants(5, 1.5, 20)}
                            animate="animate"
                            className="absolute bottom-6 right-2 sm:right-8 z-20 bg-background/80 dark:bg-content1/80 backdrop-blur-md border border-default-100 p-3 rounded-xl shadow-xl flex items-center gap-3 w-52 pointer-events-none"
                        >
                            <div className="h-12 w-9 bg-purple-500/20 rounded-md overflow-hidden flex-shrink-0">
                                <div className="h-full w-full bg-[url('https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=150')] bg-cover bg-center" />
                            </div>
                            <div className="flex flex-col min-w-0">
                                <span className="text-xs font-bold text-foreground truncate">Midnight Symphony</span>
                                <span className="text-[10px] text-default-400">Mystery</span>
                                <span className="text-[11px] font-bold text-success mt-1">Free</span>
                            </div>
                        </motion.div>

                        {/* Floating Decorative Metric Card: Top Right */}
                        <motion.div
                            variants={floatVariants(7, 0.7, 12)}
                            animate="animate"
                            className="absolute top-16 right-0 sm:right-4 z-20 bg-background/90 dark:bg-content2/90 border border-default-100 px-4 py-2 rounded-full shadow-lg flex items-center gap-2 pointer-events-none"
                        >
                            <span className="flex h-2 w-2 rounded-full bg-success animate-pulse" />
                            <span className="text-xs font-medium text-default-600">
                                <strong className="text-foreground font-bold">14.2k+</strong> Active Readers
                            </span>
                        </motion.div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;