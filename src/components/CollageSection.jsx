'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import GlassCard from './ui/GlassCard';
import Container from './ui/Container';

const allImages = [
    // Initial batch (8 images)
    { id: 1, src: "https://i.ibb.co.com/TM0nS59J/download-20.jpg", title: "Golden Hour", span: "md:col-span-2 md:row-span-2" },
    { id: 2, src: "https://i.ibb.co.com/VYrS792b/download-19.jpg", title: "Street Vibes", span: "md:col-span-1 md:row-span-1" },
    { id: 3, src: "https://i.ibb.co.com/JwpcQYyV/download-18.jpg", title: "Travel", span: "md:col-span-1 md:row-span-2" },
    { id: 4, src: "https://i.ibb.co.com/JWbRd86f/download-17.jpg", title: "Moments", span: "md:col-span-1 md:row-span-1" },
    { id: 5, src: "https://i.ibb.co.com/BKtxk40X/download-16.jpg", title: "Portraits", span: "md:col-span-1 md:row-span-1" },
    { id: 6, src: "https://i.ibb.co.com/38xYVfV/download-15.jpg", title: "Urban", span: "md:col-span-1 md:row-span-1" },
    { id: 7, src: "https://i.ibb.co.com/KjmHHQjJ/download-21.jpg", title: "Wild", span: "md:col-span-1 md:row-span-1" },
    { id: 8, src: "https://i.ibb.co.com/s9YYBZjM/download-7.jpg", title: "Culture", span: "md:col-span-1 md:row-span-1" },

    // Batch 2 (4 images)
    { id: 9, src: "https://i.ibb.co.com/VYrS792b/download-19.jpg", title: "City Lights", span: "md:col-span-2 md:row-span-1" },
    { id: 10, src: "https://i.ibb.co.com/TM0nS59J/download-20.jpg", title: "Serenity", span: "md:col-span-1 md:row-span-2" },
    { id: 11, src: "https://i.ibb.co.com/JWbRd86f/download-17.jpg", title: "Motion", span: "md:col-span-1 md:row-span-1" },
    { id: 12, src: "https://i.ibb.co.com/BKtxk40X/download-16.jpg", title: "Faces", span: "md:col-span-2 md:row-span-2" },

    // Batch 3 (4 images)
    { id: 13, src: "https://i.ibb.co.com/38xYVfV/download-15.jpg", title: "Life", span: "md:col-span-1 md:row-span-1" },
    { id: 14, src: "https://i.ibb.co.com/KjmHHQjJ/download-21.jpg", title: "Nature", span: "md:col-span-1 md:row-span-1" },
    { id: 15, src: "https://i.ibb.co.com/s9YYBZjM/download-7.jpg", title: "Abstract", span: "md:col-span-2 md:row-span-1" },
    { id: 16, src: "https://i.ibb.co.com/JwpcQYyV/download-18.jpg", title: "Deep Blue", span: "md:col-span-2 md:row-span-1" },
];

const CollageSection = () => {
    const [visibleCount, setVisibleCount] = useState(8);

    const handleToggleView = () => {
        if (visibleCount >= allImages.length) {
            // Scroll to top of grid smoothly
            const gridElement = document.getElementById('collage-grid');
            if (gridElement) {
                gridElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            setTimeout(() => setVisibleCount(8), 300); // Delay slightly for scroll start
        } else {
            setVisibleCount(prev => Math.min(prev + 4, allImages.length));
        }
    };

    const isAllVisible = visibleCount >= allImages.length;

    return (
        <section className="py-24">
            <Container>
                <div className="flex flex-col md:flex-row items-end justify-between mb-16">
                    <div>
                        <span className="text-[var(--color-accent)] font-bold tracking-[0.2em] uppercase text-sm">Portfolio</span>
                        <h2 className="text-5xl font-bold text-white mt-2">Selected Works</h2>
                    </div>
                    <div className="flex gap-4 mt-6 md:mt-0 text-[var(--color-dim)] text-sm uppercase tracking-wider font-semibold">
                        <span className="text-white border-b-2 border-[var(--color-accent)] cursor-pointer">All</span>
                        <span className="hover:text-white cursor-pointer transition-colors">Portrait</span>
                        <span className="hover:text-white cursor-pointer transition-colors">Landscape</span>
                        <span className="hover:text-white cursor-pointer transition-colors">Urban</span>
                    </div>
                </div>

                <div id="collage-grid" className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
                    <AnimatePresence>
                        {allImages.slice(0, visibleCount).map((img, i) => (
                            <motion.div
                                key={img.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.4 }}
                                className={`relative group ${img.span}`}
                            >
                                <GlassCard className="p-0 h-full w-full overflow-hidden relative cursor-pointer hover:border-[var(--color-accent)]/50 transition-colors">
                                    <Image
                                        src={img.src}
                                        alt={img.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                                        <span className="text-sm font-bold text-white tracking-widest uppercase border-y border-[var(--color-accent)]/50 py-2 px-4">{img.title}</span>
                                    </div>
                                </GlassCard>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                <div className="flex justify-center mt-20">
                    <motion.button
                        onClick={handleToggleView}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="group relative px-12 py-4 bg-transparent overflow-hidden rounded-full border border-[var(--color-accent)] text-white font-bold uppercase tracking-widest text-xs transition-all hover:shadow-[0_0_20px_rgba(230,81,0,0.4)]"
                    >
                        <span className="relative z-10 group-hover:text-black transition-colors duration-300 flex items-center gap-2">
                            {isAllVisible ? "- Show Less" : "+ Load More Photos"}
                        </span>
                        <div className="absolute inset-0 bg-[var(--color-accent)] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out" />
                    </motion.button>
                </div>
            </Container>
        </section>
    );
};

export default CollageSection;
