'use client';

import { motion } from 'framer-motion';
import GlassCard from './ui/GlassCard';
import Container from './ui/Container';

const ContactForm = () => {
    return (
        <section id="reviews" className="relative py-32 flex items-center justify-center min-h-screen overflow-hidden bg-[#0a0a0a]">
            {/* Ambient Background Glow - Red Touch */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-black/50 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-black/50 rounded-full blur-[150px] pointer-events-none" />

            <Container className="relative z-10 w-full max-w-6xl">
                <div className="flex flex-col md:flex-row gap-20 items-stretch">

                    {/* Left: Personal Note */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="w-full md:w-1/2 flex flex-col justify-center"
                    >
                        <span className="text-red-500 font-bold tracking-[0.3em] uppercase text-xs mb-8 flex items-center gap-3">
                            <span className="w-12 h-[1px] bg-red-500"></span>
                            Guestbook
                        </span>
                        <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-[0.9]">
                            Leave Your <br />
                            <span className="text-red-600">Mark.</span>
                        </h2>
                        <p className="text-white/60 text-lg leading-relaxed mb-10 max-w-md border-l inline-block pl-6 border-red-600/30">
                            Photography is a conversation without words. If these images spoke to you, I&apos;d love to hear what they said.
                        </p>

                        <div className="flex gap-6 text-white/30">
                            <div className="w-12 h-12 rounded-full border border-white/5 flex items-center justify-center hover:border-red-600 hover:text-red-600 hover:bg-red-600/10 transition-all cursor-pointer">
                                <span className="font-bold text-[10px] tracking-widest">IG</span>
                            </div>
                            <div className="w-12 h-12 rounded-full border border-white/5 flex items-center justify-center hover:border-red-600 hover:text-red-600 hover:bg-red-600/10 transition-all cursor-pointer">
                                <span className="font-bold text-[10px] tracking-widest">TW</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Review Form - Transparent & Red */}
                    <div className="w-full md:w-1/2">
                        <div className="h-full p-8 md:p-12 border border-white/20 bg-black/50 backdrop-blur-md rounded-3xl relative overflow-hidden">

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <h3 className="text-xl font-medium text-white mb-10 tracking-wide">Write a Review</h3>

                                <form className="space-y-6">
                                    <div className="group relative">
                                        <input
                                            type="text"
                                            className="w-full bg-black border border-white/10 rounded-xl px-6 py-4 text-lg text-white placeholder-transparent focus:outline-none focus:bg-black focus:border-white/30 transition-all peer"
                                            placeholder="Your Name"
                                            id="name"
                                        />
                                        <label
                                            htmlFor="name"
                                            className="absolute left-6 top-4 text-white/40 text-sm transition-all peer-placeholder-shown:text-lg peer-placeholder-shown:text-white/40 peer-placeholder-shown:top-4 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-white/80 peer-focus:bg-black/50 peer-focus:px-2 rounded-full pointer-events-none"
                                        >
                                            Your Name
                                        </label>
                                    </div>

                                    <div className="group relative">
                                        <textarea
                                            rows="4"
                                            className="w-full bg-black border border-white/10 rounded-xl px-6 py-4 text-lg text-white placeholder-transparent focus:outline-none focus:bg-black focus:border-white/30 transition-all resize-none peer"
                                            placeholder="Your Message"
                                            id="message"
                                        />
                                        <label
                                            htmlFor="message"
                                            className="absolute left-6 top-4 text-white/40 text-sm transition-all peer-placeholder-shown:text-lg peer-placeholder-shown:text-white/40 peer-placeholder-shown:top-4 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-white/80 peer-focus:bg-black/50 peer-focus:px-2 rounded-full pointer-events-none"
                                        >
                                            Your Message
                                        </label>
                                    </div>

                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full py-4 bg-white text-black font-bold uppercase tracking-widest text-sm rounded-xl hover:bg-gray-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                                    >
                                        Send Message
                                    </motion.button>
                                </form>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default ContactForm;
