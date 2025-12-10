'use client';

import { motion } from 'framer-motion';
import GlassCard from './ui/GlassCard';
import Image from 'next/image';
import Container from './ui/Container';

const AboutSection = () => {
    return (
        <section className="py-32 relative overflow-hidden">
            <Container className="flex flex-col md:flex-row gap-16 items-center z-10 relative">
                {/* Left: Image Mosaic */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="w-full md:w-1/2 relative h-[600px]"
                >
                    <div className="absolute top-0 left-0 w-3/4 h-3/4 overflow-hidden rounded-2xl z-10 glass p-1">
                        <div className="relative w-full h-full rounded-xl overflow-hidden">
                            <Image
                                src="https://i.ibb.co.com/JWbRd86f/download-17.jpg"
                                alt="Photographer 1"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                    <div className="absolute bottom-0 right-0 w-2/3 h-2/3 overflow-hidden rounded-2xl z-20 glass p-1 translate-y-8 translate-x-8">
                        <div className="relative w-full h-full rounded-xl overflow-hidden">
                            <Image
                                src="https://i.ibb.co.com/FC1dNr8/Square-format.jpg"
                                alt="Photographer 2"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                    {/* Decimal decoration */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[200px] font-bold text-white/5 z-0 pointer-events-none">
                        01
                    </div>
                </motion.div>

                {/* Right: Content */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="w-full md:w-1/2"
                >
                    <span className="text-[var(--color-accent)] font-bold tracking-[0.2em] uppercase text-sm mb-4 block">About Me</span>
                    <h2 className="text-5xl md:text-6xl font-bold text-white mb-8 leading-tight">
                        Chasing Light <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">Since 2023</span>
                    </h2>

                    <GlassCard className="p-8 border-l-4 border-l-[var(--color-accent)]">
                        <p className="text-[var(--color-dim)] text-lg leading-relaxed mb-6">
                            I’m not a professional photographer — just someone who became curious about capturing moments and slowly fell in love with it. Since 2023, I’ve been exploring photography and cinematography in my own way, learning step by step and trying to improve whenever I can.

                            I enjoy saving small memories, light, colors, and simple moments that feel special to me.
                        </p>
                        <p className="text-[var(--color-dim)] text-lg leading-relaxed">
                            My work is a blend of cinematic documentary and fine art, aiming not just to show you a scene, but to make you feel the atmosphere of that precise second in time.
                        </p>
                    </GlassCard>

                    <div className="mt-12 flex gap-12">
                        <div>
                            <h3 className="text-3xl font-bold text-white">50+</h3>
                            <p className="text-[var(--color-dim)] text-sm uppercase tracking-wider mt-1">Countries</p>
                        </div>
                        <div>
                            <h3 className="text-3xl font-bold text-white">200+</h3>
                            <p className="text-[var(--color-dim)] text-sm uppercase tracking-wider mt-1">Projects</p>
                        </div>
                        <div>
                            <h3 className="text-3xl font-bold text-white">12</h3>
                            <p className="text-[var(--color-dim)] text-sm uppercase tracking-wider mt-1">Awards</p>
                        </div>
                    </div>
                </motion.div>
            </Container>
        </section>
    );
};

export default AboutSection;
