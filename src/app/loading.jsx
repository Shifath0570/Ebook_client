"use client"
import React from "react";
import { motion } from "framer-motion";
import { ProgressBar } from "@heroui/react";

export default function LoadingPage() {
    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen bg-[#0e1111] text-amber-50 overflow-hidden selection:bg-amber-800/40">

            {/* Atmospheric background glow */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.15, 0.22, 0.15]
                    }}
                    transition={{
                        duration: 9,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-amber-700/10 blur-[140px]"
                />
            </div>

            {/* Main Content Layout */}
            <div className="z-10 flex flex-col items-center max-w-sm px-6 text-center">

                {/* Editorial Custom Animated Book Emblem */}
                <div className="relative w-20 h-16 mb-8 flex items-center justify-center">
                    <div className="absolute left-2 w-8 h-12 bg-amber-900/40 border border-amber-700/30 rounded-l shadow-md transform origin-right" />
                    <div className="absolute right-2 w-8 h-12 bg-amber-900/40 border border-amber-700/30 rounded-r shadow-md transform origin-left" />
                    <div className="absolute w-[2px] h-[46px] bg-amber-600/50" />

                    <motion.div
                        animate={{ rotateY: [0, -180, -180, 0] }}
                        transition={{
                            duration: 2.2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            times: [0, 0.45, 0.55, 1]
                        }}
                        style={{ originX: 0 }}
                        className="absolute right-2 w-[30px] h-[42px] bg-amber-100 border-y border-r border-amber-900/20 rounded-r shadow-sm flex items-center justify-center backface-hidden"
                    >
                        <div className="w-4 h-[2px] bg-amber-800/20 mb-1" />
                    </motion.div>
                </div>

                {/* Brand Typography */}
                <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="space-y-1"
                >
                    <h1 className="text-3xl font-extrabold tracking-widest text-transparent uppercase bg-clip-text bg-gradient-to-b from-amber-50 to-amber-200/70 font-serif">
                        Fable
                    </h1>
                    <p className="text-[10px] font-sans tracking-[0.3em] uppercase text-amber-500/60 font-semibold">
                        Book House
                    </p>
                </motion.div>

                {/* HeroUI v3 Compound ProgressBar */}
                <div className="w-40 mt-7 mb-4">
                    <ProgressBar
                        isIndeterminate
                        aria-label="Opening the library doors"
                        size="sm"
                        color="accent" // HeroUI v3 uses "accent" instead of v2's "primary/secondary"
                        className="w-full drop-shadow-[0_0_12px_rgba(245,158,11,0.2)]"
                    >
                        <ProgressBar.Track className="bg-neutral-900/80 border border-neutral-800/40">
                            <ProgressBar.Fill className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700" />
                        </ProgressBar.Track>
                    </ProgressBar>
                </div>

                {/* CSS Ticker */}
                <div className="h-5 overflow-hidden relative w-64">
                    <div className="flex flex-col items-center animate-[bookHouseTicker_10s_infinite_ease-in-out]">
                        <p className="h-5 text-xs font-serif italic tracking-wide text-amber-100/50 flex items-center justify-center">Dusting off old paperbacks...</p>
                        <p className="h-5 text-xs font-serif italic tracking-wide text-amber-100/50 flex items-center justify-center">Brewing a fresh pot of coffee...</p>
                        <p className="h-5 text-xs font-serif italic tracking-wide text-amber-100/50 flex items-center justify-center">Sorting tales alphabetically...</p>
                        <p className="h-5 text-xs font-serif italic tracking-wide text-amber-100/50 flex items-center justify-center">Finding a cozy corner spot...</p>
                    </div>
                </div>

            </div>
        </div>
    );
}