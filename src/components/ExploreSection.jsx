"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Container from "./ui/Container";

const exploreItems = [
  {
    id: 1,
    title: "VILLAGE SUNSET",
    location: "Dhaka, Bangladesh",
    src: "https://i.ibb.co.com/pNJ02D6/IMG-0098.jpg",
  },
  {
    id: 2,
    title: "MOUNTAIN MIST",
    location: "Bandarban, Bangladesh",
    src: "https://i.ibb.co.com/5hq4vf2F/IMG-1416.jpg",
  },
  {
    id: 3,
    title: "RIVER LIFE",
    location: "Rajshahi, Bangladesh",
    src: "https://i.ibb.co.com/XfqRDdfp/IMG-1178.jpg",
  },
  {
    id: 4,
    title: "HERITAGE WALK",
    location: "Old Dhaka, Bangladesh",
    src: "https://i.ibb.co.com/zVpk38mN/IMG-1088.jpg",
  },
  {
    id: 5,
    title: "GOLDEN SANDS",
    location: "Cox's Bazar, Bangladesh",
    src: "https://i.ibb.co.com/7dsS2CDr/IMG-1093.jpg",
  },
  {
    id: 6,
    title: "NEON NIGHTS",
    location: "Dhaka, Bangladesh",
    src: "https://i.ibb.co.com/CKjVHvXP/IMG-1147.jpg",
  },
  {
    id: 7,
    title: "SEA OF CLOUDS",
    location: "Chittagong, Bangladesh",
    src: "https://i.ibb.co.com/fYqYFt12/IMG-4225.jpg",
  },
  {
    id: 8,
    title: "HISTORIC RUINS",
    location: "Comilla, Bangladesh",
    src: "https://i.ibb.co.com/8nDTfXdp/IMG-1622.jpg",
  },
  {
    id: 9,
    title: "STUDIO PORTRAITS",
    location: "Dhaka, Bangladesh",
    src: "https://i.ibb.co.com/xS8rSsGf/IMG-1621.jpg",
  },
];

const ExploreSection = () => {
  return (
    <section className="py-12 md:py-24 h-auto md:h-[90vh] min-h-[700px] flex flex-col justify-center overflow-hidden bg-[#030303] px-6 md:px-8 lg:px-10">
      <div className="w-full max-w-[1400px] mx-auto h-full flex flex-col">
        <div className="text-center mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-bold text-white uppercase tracking-widest mb-1"
          >
            Way to <span className="text-red-500">Explore!</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[var(--color-dim)] text-xs md:text-sm font-medium tracking-widest uppercase"
          >
            Our world is amazing!
          </motion.p>
        </div>

        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 md:grid-rows-[repeat(3,1fr)] gap-4 h-full min-h-0">
          {exploreItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-xl border border-white/5 group bg-white/5 w-full h-full"
            >
              <Image
                src={item.src}
                alt={item.title || "Explore"}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />

              {/* Minimal Overlay */}
              <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:via-black/60 transition-all duration-500 h-2/3">
                <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                  <h3 className="text-sm md:text-lg font-bold text-white tracking-widest uppercase mb-1 drop-shadow-lg">
                    {item.title}
                  </h3>
                  <p className="text-[9px] md:text-[10px] text-white/80 uppercase tracking-[0.2em] font-medium">
                    {item.location}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExploreSection;
