"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Container from "./ui/Container";

const cards = [
  { src: "https://i.ibb.co.com/n8mY8bnt/IMG-0481.jpg", title: "Khayer" },
  { src: "https://i.ibb.co.com/0jM30yfc/IMG-0512.jpg", title: "Khayer" },
  { src: "https://i.ibb.co.com/Jj2TXrd1/IMG-0074.jpg", title: "Khayer" },
];

const HeroSection = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  return (
    <div className="relative h-screen w-full overflow-hidden flex items-end pb-12 md:pb-24">
      {/* Parallax Background */}
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <Image
          src="/green-background.jpg"
          alt="Lenscape Banner"
          fill
          className="object-cover"
          priority
          quality={100}
        />
        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />
      </motion.div>

      <Container className="relative z-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-12">
        {/* Left Content */}
        <div className="md:w-1/2 mb-8 md:mb-0">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="border-l-4 border-red-600 pl-6 py-2"
          >
            <div className="mb-8">
              <p className="text-red-500 text-xs md:text-sm tracking-[0.3em] font-bold uppercase mb-1">
                Where Every Frame Holds a Memory
              </p>
              <p className="text-white/60 text-[10px] md:text-xs tracking-widest font-medium uppercase">
                EST. 2023
              </p>
            </div>

            <h1 className="text-5xl sm:text-7xl md:text-9xl font-[family-name:var(--font-anton)] text-white leading-[0.85] mb-8 uppercase tracking-tighter">
              Through <br />
              Khayer’s <span className="text-red-500">Lens</span>
            </h1>

            <div className="flex items-center gap-4">
              <span className="text-white/40 font-serif italic text-lg">
                “ ”
              </span>
              <div className="w-12 h-[1px] bg-red-600/50" />
              <p className="text-red-500 font-[family-name:var(--font-hind-siliguri)] text-lg md:text-xl font-medium">
                প্রতিটি ফ্রেমে বন্দী থাকে এক একটি অনুভূতি!
              </p>
            </div>
          </motion.div>

          <motion.i
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-white/50 text-xs md:text-sm max-w-xl leading-relaxed mt-8 block pl-7"
          >
            I will one day frame the world with my photography and cinematic
            videos, turning simple moments into memories.
          </motion.i>

          {/* Signature */}
          <div className="mt-8 flex justify-start md:ml-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <span className="font-[family-name:var(--font-great-vibes)] text-5xl md:text-6xl text-red-500 block leading-none">
                Khayer Hossain
              </span>
            </motion.div>
          </div>
        </div>

        {/* Right Content: Mini Carousel */}
        <div className="w-full md:w-auto flex flex-col items-center md:items-end">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex gap-4"
          >
            {cards.map((card, i) => (
              <div
                key={i}
                className="group relative w-28 h-40 md:w-36 md:h-52 rounded-2xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-transform duration-500"
              >
                {/* Thin Transparent Border */}
                <div className="absolute inset-0 border border-white/10 rounded-2xl z-20 pointer-events-none" />

                {/* Highly Transparent Layer (No Blur) */}
                <div className="absolute inset-0 bg-white/[0.02] z-[5] group-hover:bg-white/[0.05] transition-colors duration-500" />

                <div className="relative w-full h-full p-[1px]">
                  <div className="relative w-full h-full rounded-2xl overflow-hidden">
                    <Image
                      src={card.src}
                      alt={card.title}
                      fill
                      className="object-cover transition-transform duration-700"
                      priority
                      quality={75}
                    />
                    {/* Minimal Inner Glow */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>

                {/* Subtitle/Overlay */}
                <div className="absolute inset-x-0 bottom-3 px-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-[8px] text-white/40 tracking-[0.3em] font-bold uppercase truncate">
                    {card.title}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Navigation & Progress */}
          <div className="flex items-center gap-6 mt-8 w-full justify-center md:justify-end">
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
