'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Container from './ui/Container';

const cards = [
    { src: "https://i.ibb.co.com/VYrS792b/download-19.jpg", title: "Nature" },
    { src: "https://i.ibb.co.com/JWbRd86f/download-17.jpg", title: "Desert" },
    { src: "https://i.ibb.co.com/BKtxk40X/download-16.jpg", title: "Peaks" },
];

const HeroSection = () => {
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 500], [0, 150]);

    return (
        <div className="relative h-screen w-full overflow-hidden flex items-end pb-12 md:pb-24">
            {/* Parallax Background */}
            <motion.div style={{ y }} className="absolute inset-0 z-0">
                <Image
                    src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2074&auto=format&fit=crop" // High Quality Adventure Nature
                    alt="Background"
                    fill
                    className="object-cover"
                    priority
                    quality={100}
                />
                {/* Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />
            </motion.div>

            <Container className="relative z-10 flex flex-col md:flex-row items-end justify-between gap-12">

                {/* Left Content */}
                <div className="md:w-1/2 mb-8 md:mb-0">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <p className="text-white/80 text-sm md:text-base tracking-wider mb-2 font-medium">Where Every Frame Holds a <span className="text-red-500">Memory</span></p>
                        <h1 className="text-5xl md:text-7xl font-bold text-white leading-[0.95] mb-6 uppercase">
                            Through <br />
                            Khayer’s <span className="text-red-500">Lens</span>
                        </h1>
                        <i className="text-white/70 text-sm md:text-base max-w-xl leading-relaxed mb-8">
                            I will one day frame the world with my photography and cinematic videos, turning simple moments into memories.</i>

                        {/* Signature (Replaces Buttons) */}
                        <div className="mt-8">
                            <span className="font-[family-name:var(--font-great-vibes)] text-5xl md:text-6xl text-red-600 -rotate-3 block ml-4">
                                Khayer's Lenscape
                            </span>
                        </div>
                    </motion.div>
                </div>

                {/* Right Content: Mini Carousel */}
                <div className="w-full md:w-auto flex flex-col items-end">
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex gap-4"
                    >
                        {cards.map((card, i) => (
                            <div key={i} className="w-32 h-44 md:w-40 md:h-56 rounded-2xl overflow-hidden relative border-2 border-white/20 shadow-2xl cursor-pointer hover:-translate-y-2 transition-transform duration-300">
                                <Image
                                    src={card.src}
                                    alt={card.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        ))}
                    </motion.div>

                    {/* Navigation & Progress */}
                    <div className="flex items-center gap-6 mt-8 w-full justify-end">
                        <div className="flex gap-2">
                            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white cursor-pointer hover:bg-white hover:text-black transition-colors">
                                <ChevronLeft className="w-5 h-5" />
                            </div>
                            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white cursor-pointer hover:bg-white hover:text-black transition-colors">
                                <ChevronRight className="w-5 h-5" />
                            </div>
                        </div>
                        <div className="flex items-center gap-4 text-white font-mono text-xl">
                            <div className="w-24 h-[1px] bg-white/30" />
                            <span>01</span>
                        </div>
                    </div>
                </div>

            </Container>
        </div>
    );
};

export default HeroSection;
