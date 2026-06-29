"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const PricingSection = () => {
    const [isYearly, setIsYearly] = useState(false);

    const plans = [
        {
            name: 'Basic',
            price: 0.00,
            description: 'AI chatbot, personalized, recommendations.',
            features: [
                'An AI chatbot that can understand your queries.',
                'Personalized recommendations based on your preferences.',
                'Ability to explore the app and its features without any cost.'
            ],
            buttonText: 'Get Started',
            action: 'free'
        },
        {
            name: 'Premium',
            price: 9.99,
            description: 'Advanced AI chatbot, Priority support, Analytics dashboard.',
            features: [
                'An advance AI chatbot that can understand complex queries.',
                'An Analytics dashboard to track your conversation.',
                'Priority Support to solve issues quickly.'
            ],
            buttonText: 'Get Started',
            action: 'premium',
            popular: true
        },
        {
            name: 'Enterprise',
            price: 20.50,
            description: 'Custom AI chatbot, Advanced analytics, Dedicated account.',
            features: [
                'An advance AI chatbot that can understand complex queries.',
                'An Analytics dashboard to track your conversation.',
                'Priority Support to solve issues quickly.'
            ],
            buttonText: 'Contact Us',
            action: 'enterprise'
        }
    ];

    const calculatePrice = (price) => {
        if (price === 0) return '0.00';
        // 30% discount applied to the monthly baseline if paid yearly
        const finalPrice = isYearly ? (price * 12 * 0.7) / 12 : price;
        return finalPrice.toFixed(2);
    };

    const handleCheckout = async (planAction) => {
        if (planAction === 'free') {
            //  window.location.href = '/dashboard';
            return
        }

        try {
            // Endpoint mapping to your Node/Express backend Stripe integration
            const response = await fetch('/api/billing/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ planAction, interval: isYearly ? 'year' : 'month' }),
            });
            const data = await response.json();
            // if (data.url) window.location.href = data.url;
        } catch (err) {
            console.error('Checkout initialization failed:', err);
        }
    };

    return (
        <div className="relative min-h-screen bg-[#0b0813] text-white flex flex-col items-center justify-center px-4 py-16 overflow-hidden font-sans">

            {/* Futuristic Background Ambient Orbs */}
            <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-teal-500/10 rounded-full blur-[150px] pointer-events-none" />

            {/* Decorative Floating Spheres */}
            <div className="absolute top-20 right-[15%] w-4 h-4 bg-teal-400/30 rounded-full blur-xs animate-bounce duration-3000" />
            <div className="absolute bottom-40 left-[12%] w-6 h-6 bg-purple-400/20 rounded-full blur-xs" />

            {/* Header Text */}
            <div className="text-center z-10 max-w-2xl mb-12">
                <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-100 mb-4">
                    Single Payment, Lifetime Access
                </h1>
                <p className="text-slate-400 text-sm md:text-base">
                    Pricing plan for you at every stage of growth.
                </p>
            </div>

            {/* Toggle Custom Switch Component */}
            <div className="flex flex-col items-center justify-center gap-2 mb-16 z-10">
                <div className="flex items-center gap-4 bg-[#161224]/60 border border-slate-800 p-1.5 rounded-full backdrop-blur-md">
                    <span className={`text-sm px-4 py-1.5 rounded-full transition-colors cursor-pointer ${!isYearly ? 'text-white' : 'text-slate-400'}`} onClick={() => setIsYearly(false)}>
                        Monthly
                    </span>
                    <button
                        onClick={() => setIsYearly(!isYearly)}
                        className="w-12 h-6 bg-teal-400/20 border border-teal-500/40 rounded-full relative p-0.5 transition-colors focus:outline-hidden"
                    >
                        <motion.div
                            layout
                            className="w-4 h-4 bg-teal-400 rounded-full"
                            animate={{ x: isYearly ? 24 : 0 }}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                    </button>
                    <span className={`text-sm px-4 py-1.5 rounded-full transition-colors cursor-pointer ${isYearly ? 'text-white' : 'text-slate-400'}`} onClick={() => setIsYearly(true)}>
                        Yearly
                    </span>
                </div>
                {isYearly && (
                    <span className="text-xs text-teal-400 font-medium tracking-wide">
                        Save 30% off
                    </span>
                )}
            </div>

            {/* Pricing Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full z-10 px-2">
                {plans.map((plan, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        className={`relative flex flex-col justify-between p-8 rounded-3xl backdrop-blur-xl border bg-gradient-to-b transition-all duration-300 min-h-[520px] ${plan.popular
                            ? 'border-purple-500/40 shadow-[0_0_40px_rgba(147,51,234,0.15)] bg-[#17122a]/70 scale-105 z-20'
                            : 'border-slate-800/60 bg-[#120e20]/50 hover:border-slate-700/60'
                            }`}
                    >
                        {/* Soft internal glass glow element */}
                        <div className="absolute inset-0 rounded-3xl bg-radial from-white/5 to-transparent pointer-events-none" />

                        <div>
                            <h3 className="text-2xl font-medium tracking-wide text-slate-100 mb-2">
                                {plan.name}
                            </h3>
                            <p className="text-xs text-slate-400/80 leading-relaxed mb-6 h-10 line-clamp-2">
                                {plan.description}
                            </p>

                            <div className="flex items-baseline gap-1 mb-8">
                                <span className="text-3xl font-medium text-slate-300">$</span>
                                <span className="text-5xl font-semibold tracking-tight text-white">
                                    {calculatePrice(plan.price)}
                                </span>
                                <span className="text-xs text-slate-400 ml-1">
                                    /{isYearly ? 'mo' : 'mo'}
                                </span>
                            </div>

                            {/* Dividers & Features */}
                            <div className="w-full h-px bg-slate-800/80 mb-8" />

                            <ul className="space-y-4">
                                {plan.features.map((feature, fIdx) => (
                                    <li key={fIdx} className="flex items-start gap-3 text-sm text-slate-300 leading-normal">
                                        <span className="mt-1 flex items-center justify-center min-w-[16px] h-4 rounded-full bg-purple-500/20 text-purple-400 text-[10px]">
                                            ✓
                                        </span>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* CTA Action Button */}
                        <form action={'/api/subscription'} method='POST'>
                            <button
                            // onClick={() => handleCheckout(plan.action)}
                            type='submit'
                            className={`w-full mt-8 py-3 px-6 rounded-full text-sm font-medium tracking-wide border transition-all duration-200 cursor-pointer ${plan.popular
                                ? 'bg-transparent border-purple-500 text-purple-300 hover:bg-purple-500 hover:text-white'
                                : 'bg-transparent border-slate-700 text-slate-300 hover:border-slate-500 hover:text-white'
                                }`}
                        >
                            {plan.buttonText}
                        </button>
                        </form>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default PricingSection;