'use client';

import { motion } from 'framer-motion';
import GlassCard from './ui/GlassCard';
import Image from 'next/image';
import Container from './ui/Container';

const moments = [
    { date: "Oct 12, 2024", location: "Kyoto, Japan", title: "Autumn Silence", description: "Wandering through the bamboo groves at dawn.", img: "https://i.ibb.co.com/KjmHHQjJ/download-21.jpg" },
    { date: "Sep 08, 2024", location: "New York, USA", title: "Concrete Jungle", description: "The city that never sleeps, caught in a moment of pause.", img: "https://i.ibb.co.com/VYrS792b/download-19.jpg" },
    { date: "Aug 21, 2024", location: "Reykjavik, Iceland", title: "Northern Lights", description: "Dancing colors in the freezing night sky.", img: "https://i.ibb.co.com/TM0nS59J/download-20.jpg" },
    { date: "Jul 14, 2024", location: "Paris, France", title: "Seine Sunset", description: "Golden reflections on the water.", img: "https://i.ibb.co.com/JwpcQYyV/download-18.jpg" }
];

const TimelineSection = () => {
    return (
        <section className="py-24 relative">
            <Container className="max-w-5xl">
                <div className="text-center mb-20">
                    <span className="text-[var(--color-accent)] font-bold tracking-[0.2em] uppercase text-sm">Journal</span>
                    <h2 className="text-5xl font-bold text-white mt-2">Recent Moments</h2>
                </div>

                <div className="relative space-y-12">
                    {/* Vertical Line */}
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-white/10 md:-translate-x-1/2" />

                    {moments.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ delay: index * 0.1 }}
                            className={`relative flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                        >
                            {/* Center Dot */}
                            <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-[var(--color-background)] border-2 border-[var(--color-accent)] rounded-full z-10 md:-translate-x-1/2 shadow-[0_0_15px_var(--color-accent)]" />

                            {/* Content Card (Left/Right) */}
                            <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-12">
                                <GlassCard className="p-0 hover:border-[var(--color-accent)]/30 transition-colors group">
                                    <div className="flex flex-col sm:flex-row gap-6 p-6">
                                        <div className="relative w-full sm:w-24 h-48 sm:h-24 flex-shrink-0 rounded-lg overflow-hidden bg-black/50">
                                            <Image
                                                src={item.img}
                                                alt={item.title}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className="text-xs font-mono text-[var(--color-accent)] py-1 px-2 rounded bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20">
                                                    {item.date}
                                                </span>
                                            </div>
                                            <h3 className="text-xl text-white font-bold mb-1">{item.title}</h3>
                                            <p className="text-sm text-white/50 mb-3">{item.location}</p>
                                            <p className="text-[var(--color-dim)] text-sm leading-relaxed">{item.description}</p>
                                        </div>
                                    </div>
                                </GlassCard>
                            </div>

                            {/* Empty space for the other side */}
                            <div className="hidden md:block w-1/2" />
                        </motion.div>
                    ))}
                </div>
            </Container>
        </section>
    );
};

export default TimelineSection;
