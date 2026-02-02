'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import GlassCard from './ui/GlassCard';
import Container from './ui/Container';

import moments from '../data/moments.json';

const allImages = moments.map(item => ({
    id: item.id,
    src: item.img,
    title: item.title,
    span: item.span || "md:col-span-1 md:row-span-1"
}));


const CollageSection = () => {
    const [visibleCount, setVisibleCount] = useState(12); // Show more initially since they are small
    const [selectedImage, setSelectedImage] = useState(null);

    const handleToggleView = () => {
        if (visibleCount >= allImages.length) {
            const gridElement = document.getElementById('collage-grid');
            if (gridElement) {
                gridElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            setTimeout(() => setVisibleCount(12), 300);
        } else {
            setVisibleCount(prev => Math.min(prev + 12, allImages.length));
        }
    };

    const isAllVisible = visibleCount >= allImages.length;

    return (
        <section className="py-24">
            <Container>
                <div className="flex flex-col md:flex-row items-end justify-between mb-16">
                    <div>
                        <span className="text-red-500 font-bold tracking-[0.2em] uppercase text-sm">Portfolio</span>
                        <h2 className="text-5xl font-bold text-white mt-2">Selected Works</h2>
                    </div>
                    <div className="flex gap-4 mt-6 md:mt-0 text-[var(--color-dim)] text-sm uppercase tracking-wider font-semibold">
                        <span className="text-white border-b-2 border-[var(--color-accent)] cursor-pointer">All</span>
                        <span className="hover:text-white cursor-pointer transition-colors">Portrait</span>
                        <span className="hover:text-white cursor-pointer transition-colors">Landscape</span>
                        <span className="hover:text-white cursor-pointer transition-colors">Urban</span>
                    </div>
                </div>

                <div id="collage-grid" className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 auto-rows-none">
                    <AnimatePresence>
                        {allImages.slice(0, visibleCount).map((img, i) => (
                            <motion.div
                                key={img.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.4 }}
                                className="relative aspect-square group overflow-hidden cursor-pointer"
                                onClick={() => setSelectedImage(img)}
                            >
                                <GlassCard className="p-0 h-full w-full overflow-hidden relative hover:border-[var(--color-accent)]/50 transition-colors">
                                    <Image
                                        src={img.src}
                                        alt={img.title}
                                        fill
                                        sizes="(max-width: 640px) 33vw, (max-width: 768px) 25vw, 16vw"
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        quality={60}
                                    />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                                        <span className="text-[10px] font-bold text-white tracking-widest uppercase border-y border-[var(--color-accent)]/50 py-1 px-2">{img.title}</span>
                                    </div>
                                </GlassCard>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Lightbox / Large View */}
                <AnimatePresence>
                    {selectedImage && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedImage(null)}
                            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
                        >
                            <motion.div
                                initial={{ scale: 0.9, y: 20 }}
                                animate={{ scale: 1, y: 0 }}
                                exit={{ scale: 0.9, y: 20 }}
                                className="relative max-w-5xl w-full h-[80vh] overflow-hidden rounded-2xl border border-white/10"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <Image
                                    src={selectedImage.src}
                                    alt={selectedImage.title}
                                    fill
                                    className="object-contain md:object-cover"
                                    priority
                                    quality={85}
                                />
                                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black to-transparent">
                                    <h3 className="text-3xl font-bold text-white">{selectedImage.title}</h3>
                                    <p className="text-[var(--color-dim)] mt-2 uppercase tracking-[0.2em] font-bold text-sm">Captured Moment</p>
                                </div>
                                <button 
                                    onClick={() => setSelectedImage(null)}
                                    className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors cursor-pointer"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                </button>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="flex justify-center mt-20">
                    <motion.button
                        onClick={handleToggleView}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="group relative px-6 py-4 bg-transparent overflow-hidden rounded-lg border border-red-500 text-white font-bold uppercase tracking-widest text-xs transition-all hover:shadow-red-500 cursor-pointer"
                    >
                        <span className="relative z-10 group-hover:text-black transition-colors duration-300 flex items-center gap-2">
                            {isAllVisible ? "- Show Less" : "+ Load More Photos"}
                        </span>
                        <div className="absolute inset-0 bg-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out" />
                    </motion.button>
                </div>
            </Container>
        </section>
    );
};


export default CollageSection;
