"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { Button, Input } from "@heroui/react";

const Footer = () => {
    // Setup React Hook Form for client-side evaluation
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm();

    const onSubscribe = async (data) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000)); // Mocking API delays
            alert(`Thank you for subscribing, ${data.email}!`);
            reset();
        } catch (err) {
            console.error(err);
        }
    };

    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full bg-background border-t border-default-100">
            <div className="mx-auto max-w-7xl px-4 pt-16 pb-8 sm:px-6 lg:px-8">

                {/* Main Grid Links Layout */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 xl:gap-8 pb-12">

                    {/* Section 1: About */}
                    <div className="md:col-span-4 flex flex-col gap-4">
                        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-foreground w-max">
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
                        <p className="text-sm text-default-500 max-w-sm leading-relaxed">
                            Fable is a next-generation self-publishing decentralized ecosystem empowering indie creators to publish masterpieces, reach global readers, and scale structural earnings directly.
                        </p>
                    </div>

                    {/* Section 2: Quick Links */}
                    <div className="sm:col-span-6 md:col-span-2 flex flex-col gap-3">
                        <h4 className="text-sm font-bold uppercase tracking-wider text-foreground">Quick Links</h4>
                        <ul className="flex flex-col gap-2.5">
                            <li>
                                <Link href="/" className="text-sm text-default-500 hover:text-primary transition-colors">Home</Link>
                            </li>
                            <li>
                                <Link href="/browse" className="text-sm text-default-500 hover:text-primary transition-colors">Browse Ebooks</Link>
                            </li>
                            <li>
                                <Link href="/dashboard" className="text-sm text-default-500 hover:text-primary transition-colors">Writer Dashboard</Link>
                            </li>
                            <li>
                                <Link href="/login" className="text-sm text-default-500 hover:text-primary transition-colors">Account Login</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Section 3: Contact Details */}
                    <div className="sm:col-span-6 md:col-span-3 flex flex-col gap-3">
                        <h4 className="text-sm font-bold uppercase tracking-wider text-foreground">Contact</h4>
                        <ul className="flex flex-col gap-2.5">
                            <li className="flex items-center gap-2 text-sm text-default-500">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4 flex-shrink-0 text-primary">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                </svg>
                                <span className="truncate">support@fable.com</span>
                            </li>
                            <li className="flex items-center gap-2 text-sm text-default-500">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4 flex-shrink-0 text-primary">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25a7.5 7.5 0 1115 0z" />
                                </svg>
                                <span>Silicon Valley, CA</span>
                            </li>
                        </ul>
                    </div>

                    {/* Section 4: Newsletter */}
                    <div className="md:col-span-3 flex flex-col gap-3">
                        <h4 className="text-sm font-bold uppercase tracking-wider text-foreground">Newsletter</h4>
                        <p className="text-xs text-default-500 leading-normal">
                            Stay tuned for newly curated independent novel releases and writer rewards updates.
                        </p>
                        <form onSubmit={handleSubmit(onSubscribe)} className="flex flex-col gap-2 mt-2 w-full">
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                size="sm"
                                variant="bordered"
                                radius="xl"
                                isInvalid={!!errors.email}
                                errorMessage={errors.email?.message}
                                {...register("email", {
                                    required: "Email address is required",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Invalid email address",
                                    },
                                })}
                                classNames={{
                                    inputWrapper: "border-default-200 hover:border-default-400 focus-within:!border-primary",
                                }}
                            />
                            <Button
                                type="submit"
                                color="primary"
                                size="sm"
                                radius="xl"
                                className="font-semibold w-full"
                                isLoading={isSubmitting}
                            >
                                Subscribe
                            </Button>
                        </form>
                    </div>
                </div>

                <hr className="my-4 bg-default-100" />

                {/* Section 5: Copyright & Social Media Icons Layout */}
                <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 pt-4">
                    <p className="text-xs text-default-400">
                        &copy; {currentYear} Fable Inc. All rights reserved. Built with Next.js 15.
                    </p>

                    {/* Social Icons Stack */}
                    <div className="flex items-center gap-4">
                        {/* X / Twitter Icon */}
                        <a href="https://x.com" target="_blank" rel="noreferrer" className="p-2 text-default-400 hover:text-primary hover:bg-default-100 rounded-xl transition-all">
                            <svg className="w-5 h-5 fill-currentColor" viewBox="0 0 24 24">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                        </a>
                        {/* GitHub Icon */}
                        <a href="https://github.com" target="_blank" rel="noreferrer" className="p-2 text-default-400 hover:text-primary hover:bg-default-100 rounded-xl transition-all">
                            <svg className="w-5 h-5 fill-currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.008.069-.008 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                            </svg>
                        </a>
                        {/* LinkedIn Icon */}
                        <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="p-2 text-default-400 hover:text-primary hover:bg-default-100 rounded-xl transition-all">
                            <svg className="w-5 h-5 fill-currentColor" viewBox="0 0 24 24">
                                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                            </svg>
                        </a>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;