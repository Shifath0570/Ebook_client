"use client";

import React, { useState } from "react";
import { Card, Button } from "@heroui/react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ClientDetails({ book, bookMarks = [], user }) {
    // 1. Normalize the logged-in user's identifier
    const currentUserId = user?.id || user?._id;

    console.log(book)

    // 2. Pure function to cleanly evaluate if the current user has bookmarked this exact book
    const checkIsBookmarked = () => {
        // If no user is authenticated, nothing is bookmarked
        if (!currentUserId || !book?._id) return false;

        if (Array.isArray(bookMarks)) {
            return bookMarks.some(bm => {
                // Check incoming properties uniformly
                const targetBookId = bm?.productId || bm?.bookId || bm?._id;
                const targetUserId = bm?.userId;
                
                // Must explicitly match the specific book AND the current active user
                return targetBookId === book._id && targetUserId === currentUserId;
            });
        }
        
        // Single object fallback strategy
        const singleBookId = bookMarks?.productId || bookMarks?.bookId || bookMarks?._id;
        return singleBookId === book._id && bookMarks?.userId === currentUserId;
    };

    // Calculate dynamic states on evaluation passes without raw side effects
    const initialBookmarkState = checkIsBookmarked();
    const [clickedBookmarkState, setClickedBookmarkState] = useState(null);
    const [isRedirecting, setIsRedirecting] = useState(false);

    // Fall back to original incoming collection properties if user hasn't explicitly clicked yet
    const isBookmarked = clickedBookmarkState !== null ? clickedBookmarkState : initialBookmarkState;
    const hasPurchased = book?.isAlreadyPurchased || false;
    const isWriterTheBuyer = currentUserId === book?.writerId;

    const handleBookmarkToggle = async () => {
        if (!currentUserId) {
            alert("Authentication required. Please log in to bookmark books.");
            return;
        }

        const nextBookmarkState = !isBookmarked;
        
        // Optimistic UI update
        setClickedBookmarkState(nextBookmarkState);

        // Crucial: Omit the original book's `_id` so MongoDB creates a unique bookmark entry
        // instead of overwriting existing bookmark entries created by other users!
        const { _id, ...bookDetailsWithoutId } = book || {};

        const bookmarkPayload = {
            ...bookDetailsWithoutId,
            productId: book?._id, // Save the book reference under a unique key
            userId: currentUserId,
            userName: user?.name || "Fable Reader",
            date: new Date()
        };

        try {
            const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
            const res = await fetch(`${baseUrl}/api/bookmark`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookmarkPayload),
            });

            if (!res.ok) {
                // Revert interface status on network/database issues
                setClickedBookmarkState(isBookmarked);
            }
        } catch (err) {
            console.error("Bookmark sync failure:", err);
            setClickedBookmarkState(isBookmarked);
        }
    };

    const handlePurchaseRedirect = async () => {
        const bookPurchases = {
            ...book,
            userId: currentUserId,
            userName: user?.name || "Fable Buyer",
            userEmail: user?.email || "NotUserWriter@gmail.com",
            date: new Date()
        };

        try {
            const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
            await fetch(`${baseUrl}/api/bookPurches`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookPurchases),
            });
            setIsRedirecting(true);
        } catch (err) {
            console.error("Purchase processing runtime exception:", err);
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">

            {/* LEFT SECTION: COVER IMAGE & HISTORICAL METADATA */}
            <div className="md:col-span-5 space-y-6">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="relative aspect-[3/4] w-full rounded-3xl overflow-hidden bg-slate-950 border border-slate-800/80 shadow-2xl"
                >
                    {book?.coverImage && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={book.coverImage} alt={book.title || "Book Cover"} className="w-full h-full object-cover" />
                    )}
                </motion.div>

                {/* Informational Parameter Block */}
                <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5 grid grid-cols-2 gap-4 text-xs">
                    <div>
                        <span className="text-slate-500 font-bold uppercase tracking-wider block text-[10px]">Genre Class</span>
                        <span className="text-indigo-400 font-semibold mt-1 block">{book?.genre || "Fiction"}</span>
                    </div>
                    <div>
                        <span className="text-slate-500 font-bold uppercase tracking-wider block text-[10px]">Date Uploaded</span>
                        <span className="text-slate-300 font-semibold mt-1 block">
                            {book?.date ? new Date(book.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : "N/A"}
                        </span>
                    </div>
                </div>
            </div>

            {/* RIGHT SECTION: CORE INFORMATION & ACTION BUTTONS */}
            <div className="md:col-span-7 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/60 pb-6">
                    <div className="space-y-1.5">
                        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-100">{book?.title || "Untitled Manuscript"}</h1>
                        <p className="text-sm text-slate-400">
                            Penned by:{" "}
                            <Link href={`/browse?search=${encodeURIComponent(book?.writerName || "")}`} className="text-indigo-400 hover:text-indigo-300 underline font-medium transition-colors">
                                {book?.writerName || "Fable Contributor"}
                            </Link>
                        </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                        {/* Unified Action Toggle Bookmark Button */}
                        <button
                            type="button"
                            onClick={handleBookmarkToggle}
                            className={`p-3 rounded-xl border transition-all ${
                                isBookmarked
                                    ? "bg-rose-500/10 text-rose-500 border-rose-500/20 shadow-lg shadow-rose-500/5"
                                    : "bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200"
                            }`}
                            aria-label="Toggle bookmark item"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={isBookmarked ? "currentColor" : "none"} stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                            </svg>
                        </button>

                        {/* Status Indicator Badge */}
                        <span className={`px-3 py-1.5 rounded-xl text-xs font-bold border uppercase tracking-wider ${book?.status === "published" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-amber-500/10 text-amber-400 border-amber-500/20"}`}>
                            {book?.status === "published" ? "Available" : "Sold Out"}
                        </span>
                    </div>
                </div>

                {/* Pricing Layout */}
                <div className="flex items-baseline gap-2">
                    <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Acquisition Price</span>
                    <span className="text-3xl font-black text-emerald-400">${book?.price?.toFixed(2) || "0.00"}</span>
                </div>

                {/* Description/Preview Paragraph */}
                <div className="space-y-2">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Manuscript Preview</h3>
                    <p className="text-sm text-slate-300 leading-relaxed bg-slate-900/20 border border-slate-800/40 p-4 rounded-xl">
                        {book?.description || "No preview synopsis provided for this copy."}
                    </p>
                </div>

                <Card className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5 mt-6">
                    <Card.Content className="p-0 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div>
                            <h4 className="text-sm font-bold text-slate-200">Digital Identity Provision</h4>
                            <p className="text-xs text-slate-500 mt-0.5">Purchases authorize instant reading access across your account profile ledger.</p>
                        </div>

                        {hasPurchased ? (
                            <Button disabled className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold text-xs px-6 py-3 rounded-xl cursor-default">
                                Already Purchased
                            </Button>
                        ) : isWriterTheBuyer ? (
                            <Button disabled className="bg-slate-800 text-slate-500 font-medium text-xs px-6 py-3 rounded-xl cursor-not-allowed border border-slate-700/40">
                                Disabled (Your Ebook)
                            </Button>
                        ) : (
                            <form action={'/api/payment'} method="POST">
                                <div className="hidden">
                                    <input name="price" value={book?.price || 0} readOnly />
                                    <input name="title" value={book?.title || ""} readOnly />
                                    <input name="productId" value={book?._id || ""} readOnly />
                                    <input name="description" value={book?.description || ""} readOnly />
                                    <input name="genre" value={book?.genre || ""} readOnly />
                                    <input name="writerName" value={book?.writerName || ""} readOnly />
                                    <input name="coverImage" value={book?.coverImage || ""} readOnly />
                                    <input name="writerId" value={book?.writerId || ""} readOnly />
                                </div>
                                <Button
                                    onClick={handlePurchaseRedirect}
                                    type="submit"
                                    disabled={isRedirecting || book?.status !== "published"}
                                    className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs px-6 py-3 rounded-xl transition-all shadow-md shadow-indigo-600/20 disabled:opacity-40"
                                >
                                    {isRedirecting ? "Opening Stripe..." : "Buy Now"}
                                </Button>
                            </form>
                        )}
                    </Card.Content>
                </Card>

                {/* ENTIRE UNLOCKED SECURED MANUSCRIPT CONTENT CONTAINER */}
                {hasPurchased && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="border-t border-slate-800/80 pt-6 space-y-3">
                        <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-widest flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                            </svg>
                            Full Content Unlocked
                        </h3>
                        <div className="bg-slate-950/50 rounded-2xl p-6 text-slate-300 text-sm leading-relaxed border border-indigo-500/10 max-h-96 overflow-y-auto font-serif shadow-inner">
                            {book?.fullContent || "Streaming full manuscript text rows safely down from platform storage data vaults..."}
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}