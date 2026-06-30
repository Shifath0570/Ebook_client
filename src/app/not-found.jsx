"use client"
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";


export default function NotFound() {
    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen bg-[#0e1111] text-amber-50 overflow-hidden selection:bg-amber-800/40 px-6">


            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-amber-900/10 blur-[150px]" />
            </div>


            <div className="z-10 flex flex-col items-center max-w-md text-center">

                {/* Floating / Empty Book Shelf Graphic */}
                <div className="relative w-full h-40 flex items-end justify-center mb-6">
                    <motion.div
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="w-8 h-28 border border-dashed border-amber-700/30 rounded mx-1 self-end opacity-40"
                    />

                    <motion.div
                        animate={{
                            scale: [1, 0.97, 1],
                            opacity: [0.2, 0.4, 0.2]
                        }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="w-10 h-32 bg-gradient-to-t from-amber-950/20 to-transparent border border-amber-600/40 rounded shadow-inner mx-1 relative flex items-center justify-center"
                    >
                        <span className="text-xl font-serif text-amber-600/40">?</span>
                    </motion.div>

                    <motion.div
                        initial={{ rotate: -75 }}
                        animate={{ rotate: [-73, -76, -73] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        style={{ originX: 0, originY: "100%" }}
                        className="w-7 h-24 bg-amber-900/30 border border-amber-700/40 rounded shadow absolute bottom-1 left-[54%]"
                    />

                    <div className="absolute bottom-0 w-48 h-[3px] bg-gradient-to-r from-transparent via-amber-800/60 to-transparent rounded" />
                </div>

                <motion.h1
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-7xl font-black tracking-tight text-amber-100/20 font-serif"
                >
                    404
                </motion.h1>


                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.5 }}
                    className="space-y-3 mt-2"
                >
                    <h2 className="text-2xl font-serif text-amber-100/90 font-medium">
                        The Lost Chapter
                    </h2>
                    <p className="text-sm text-amber-200/60 font-sans max-w-xs mx-auto leading-relaxed">
                        The page you are looking for has been misplaced in our archives, or perhaps it was never written at all.
                    </p>
                </motion.div>


                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                    className="mt-8 flex flex-col sm:flex-row gap-3 w-full justify-center"
                >
                    <Link
                        href="/"
                        variant="solid"
                        radius="sm"
                        className="font-serif font-medium bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-600 hover:to-amber-700 text-amber-50 px-6 shadow-lg shadow-amber-950/50 transition-all border border-amber-600/30"
                    >
                        Return to Main Hall
                    </Link>

                    <Link
                        href="/browseEbook"
                        variant="bordered"
                        radius="sm"
                        className="font-sans font-medium text-amber-200/80 border-amber-800/60 hover:bg-amber-950/30 hover:text-amber-100 px-6 transition-colors"
                    >
                        Browse Catalog
                    </Link>
                </motion.div>

            </div>
        </div>
    );
}