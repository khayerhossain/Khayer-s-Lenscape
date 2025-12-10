'use client';

import { motion } from 'framer-motion';
import GlassCard from './ui/GlassCard';
import { Play } from 'lucide-react';
import Image from 'next/image';
import Container from './ui/Container';

const videos = [
    { id: 1, title: "Cinematic Reel", thumbnail: "https://i.ibb.co.com/KjmHHQjJ/download-21.jpg" },
    { id: 2, title: "Urban Stories", thumbnail: "https://i.ibb.co.com/VYrS792b/download-19.jpg" },
    { id: 3, title: "Nature's Breath", thumbnail: "https://i.ibb.co.com/TM0nS59J/download-20.jpg" },
];

const VideoSection = () => {
    return (
        <section className="py-24">
            <Container>
                <div className="flex flex-col md:flex-row items-end justify-between mb-12">
                    <div>
                        <h2 className="text-5xl font-bold text-white mb-4">Cinematic <span className="text-red-500">Films</span></h2>
                        <p className="text-[var(--color-dim)] text-lg max-w-md">Motion and emotion captured in frames per second.</p>
                    </div>
                    <button className="text-red-500 uppercase tracking-widest text-sm hover:text-white transition-colors mt-6 md:mt-0">
                        View All Projects
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {videos.map((video, index) => (
                        <motion.div
                            key={video.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <GlassCard className="p-0 group cursor-pointer h-[280px] hover:border-[var(--color-accent)]/50 transition-colors">
                                <div className="relative w-full h-full">
                                    <Image
                                        src={video.thumbnail}
                                        alt={video.title}
                                        fill
                                        className="object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-white/20">
                                            <Play className="w-6 h-6 text-white fill-white" />
                                        </div>
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
                                        <h3 className="text-xl font-bold text-white mb-1">{video.title}</h3>
                                        <p className="text-xs text-[var(--color-accent)] uppercase tracking-wider">Watch Now</p>
                                    </div>
                                </div>
                            </GlassCard>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </section>
    );
};

export default VideoSection;
