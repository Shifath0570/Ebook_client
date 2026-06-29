"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, Dropdown, Button, cn } from "@heroui/react";
import { signOut, useSession } from "@/lib/auth-client";


const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const {data: session, isPending} = useSession()
    const user = session?.user;

    // console.log(user)

    const handleSignOut =async () =>{
        await signOut()
    }

    const pathname = usePathname();

    const desktopRoutes = [
        { name: "Home", path: "/" },
        { name: "Browse Ebooks", path: "/browseEbook" },
    ];

    const dashboardLinks = {
        reader: "/Dashboard/reader",
        writer: "/Dashboard/writer",
        admin: "/Dashboard/admin",
    }

    if(user?.email){
        desktopRoutes.push(
            {name: "Dashboard", path: dashboardLinks[user?.role || 'reader']}
        )
    }

    const mobileRoutes = [
        ...desktopRoutes,
        ...(!user ? [{ name: "Login", path: "/login" }] : []),
    ];

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-default-100 bg-background/70 backdrop-blur-md">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">

                    {/* Logo */}
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-foreground">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-6 w-6 text-primary"
                            >
                                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
                                <path d="M6 6h10M6 10h10M6 14h10" />
                            </svg>
                            <span className="tracking-tight bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                                Fable
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex items-center gap-1">
                        {desktopRoutes.map((route) => {
                            const isActive = pathname === route.path;
                            return (
                                <Link
                                    key={route.path}
                                    href={route.path}
                                    className={cn(
                                        "relative px-4 py-2 text-sm font-medium rounded-xl transition-colors duration-200 outline-none",
                                        isActive ? "text-primary" : "text-default-600 hover:text-default-900"
                                    )}
                                >
                                    <span className="relative z-10">{route.name}</span>
                                    {isActive && (
                                        <motion.span
                                            layoutId="activeNavBackground"
                                            className="absolute inset-0 bg-primary/10 rounded-xl"
                                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                        />
                                    )}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center gap-4">
                        {user ? (
                            <Dropdown placement="bottom-end">
                                <Dropdown.Trigger>
                                    <Link href={""} className="outline-none transition-transform active:scale-95">
                                        <Avatar color="primary" src={user.avatar} name={user.name} size="sm" />
                                    </Link>
                                </Dropdown.Trigger>
                                <Dropdown.Popover className="w-56 p-1 border border-default-100">
                                    <Dropdown.Menu aria-label="User actions profile menu">
                                        <Dropdown.Item id="profile-info" textValue="Signed In Profile" className="h-14 gap-2 opacity-100 pointer-events-none">
                                            <p className="font-semibold text-xs text-default-400">Signed in as</p>
                                            <p className="font-semibold text-sm text-default-800 truncate">{user.email}</p>
                                        </Dropdown.Item>
                                        <Dropdown.Item id="user-dashboard" textValue="Dashboard">
                                            <Link href="/dashboard" className="w-full block">Dashboard</Link>
                                        </Dropdown.Item>
                                        <Dropdown.Item id="logout" textValue="Log Out" className="text-danger" onClick={handleSignOut}>
                                            Log Out
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown.Popover>
                            </Dropdown>
                        ) : (
                            <>
                                <Link href="/auth/signin" color="primary" variant="solid" size="sm" className="font-medium rounded-xl">
                                    Login
                                </Link>

                                <Link href="/auth/signup" color="primary" variant="solid" size="sm" className="font-medium rounded-xl">
                                    Register
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Hamburger Trigger */}
                    <div className="flex md:hidden items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-xl text-default-600 hover:bg-default-100 focus:outline-none transition-colors"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                {isOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Drawer (Framer Motion) */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 top-16 z-40 bg-black/30 backdrop-blur-sm md:hidden h-[calc(100vh-4rem)]"
                        />

                        {/* Sidebar Sheet */}
                        <motion.div
                            initial={{ x: "100%", opacity: 0.9 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: "100%", opacity: 0.9 }}
                            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                            className="fixed inset-y-0 right-0 top-16 z-40 w-full max-w-sm border-l border-default-100 bg-background p-6 shadow-xl md:hidden flex flex-col justify-between h-[calc(100vh-4rem)]"
                        >
                            <div className="flex flex-col gap-1">
                                {mobileRoutes.map((route) => {
                                    const isActive = pathname === route.path;
                                    return (
                                        <Link
                                            key={route.path}
                                            href={route.path}
                                            onClick={() => setIsOpen(false)}
                                            className={cn(
                                                "w-full px-4 py-3 text-base font-semibold rounded-xl transition-all duration-200",
                                                isActive
                                                    ? "bg-primary/10 text-primary"
                                                    : "text-default-600 hover:bg-default-50 hover:text-default-900"
                                            )}
                                        >
                                            {route.name}
                                        </Link>
                                    );
                                })}
                            </div>

                            {/* Mobile Profile Block */}
                            {user && (
                                <div className="border-t border-default-100 pt-4 flex flex-col gap-4">
                                    <div className="flex items-center gap-3 px-2">
                                        <Avatar src={user.avatar} name={user.name} size="md" isBordered color="primary" />
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-default-800 leading-tight">{user.name}</span>
                                            <span className="text-xs text-default-500 truncate max-w-[200px]">{user.email}</span>
                                        </div>
                                    </div>
                                    <Button
                                        color="danger"
                                        variant="flat"
                                        className="w-full font-semibold rounded-xl" onClick={handleSignOut}>
                                        Log Out
                                    </Button>
                                </div>
                            )}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;