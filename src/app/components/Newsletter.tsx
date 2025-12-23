'use client';

import React, { useState } from 'react';
import { FiSend, FiMail, FiBell } from 'react-icons/fi';

export default function Newsletter() {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            setSubscribed(true);
            setEmail('');
        }
    };

    return (
        <section className="py-20 px-4 relative overflow-hidden">
            <div className="max-w-6xl mx-auto relative z-10">
                <div className="bg-gradient-to-br from-teal-600 to-emerald-700 rounded-[3rem] p-8 md:p-16 text-white shadow-2xl relative overflow-hidden group">
                    {/* Decorative Background Elements */}
                    <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-700"></div>
                    <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-64 h-64 bg-teal-400/20 rounded-full blur-2xl"></div>

                    <div className="flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
                        {/* Text Content */}
                        <div className="flex-1 text-center lg:text-left">
                            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-white/20">
                                <FiBell className="animate-bounce" />
                                <span>Don't miss the latest updates!</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
                                Join the <span className="text-teal-200">Nemo Squad</span> & <br />
                                Get <span className="underline decoration-teal-300 underline-offset-8">20% Off</span>
                            </h2>
                            <p className="text-teal-50 text-lg md:text-xl font-medium max-w-xl opacity-90 leading-relaxed">
                                Be the first to know about new arrivals, exclusive sales, and grooming tips delivered straight to your inbox.
                            </p>
                        </div>

                        {/* Subscription Form */}
                        <div className="w-full lg:w-auto flex-shrink-0">
                            {subscribed ? (
                                <div className="bg-white/10 backdrop-blur-xl border border-white/30 p-8 rounded-3xl text-center animate-in fade-in zoom-in duration-500">
                                    <div className="w-16 h-16 bg-white text-teal-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                                        <FiSend />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-2">Welcome to the Club!</h3>
                                    <p className="text-teal-100">Check your email for your welcome discount.</p>
                                </div>
                            ) : (
                                <form
                                    onSubmit={handleSubmit}
                                    className="bg-white p-2 rounded-3xl md:rounded-full flex flex-col md:flex-row items-stretch md:items-center gap-2 shadow-2xl w-full max-w-md lg:max-w-lg transition-transform hover:scale-[1.02] duration-300"
                                >
                                    <div className="flex-1 flex items-center px-4 md:px-6 py-2 md:py-0 bg-gray-50 md:bg-transparent rounded-2xl md:rounded-none">
                                        <FiMail className="text-gray-400 text-xl flex-shrink-0" />
                                        <input
                                            type="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Enter your email address"
                                            className="w-full py-3 md:py-4 px-3 text-gray-800 placeholder-gray-400 outline-none font-medium bg-transparent"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-4 px-10 rounded-2xl md:rounded-full transition-all duration-300 shadow-lg hover:shadow-teal-900/40 flex items-center justify-center gap-2 group/btn"
                                    >
                                        <span>Subscribe</span>
                                        <FiSend className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                                    </button>
                                </form>
                            )}
                            <p className="mt-6 text-sm text-teal-100/60 text-center lg:text-left flex items-center justify-center lg:justify-start gap-2">
                                <span className="w-1 h-1 bg-teal-200 rounded-full"></span>
                                No spam, only quality content. Unsubscribe anytime.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}