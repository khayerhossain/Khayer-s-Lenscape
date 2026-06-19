"use client";

import { motion } from "framer-motion";
import GlassCard from "./ui/GlassCard";
import Image from "next/image";
import Container from "./ui/Container";

const TimelineSection = ({ initialMoments = [] }) => {
  const displayMoments = initialMoments.slice(0, 4);

  return (
    <section className="py-32 relative overflow-hidden bg-black">
      {/* Cinematic Background Image Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80"
          alt="Timeline Background"
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/40 to-black" />
      </div>

      <Container className="relative z-10">
        <div className="text-center mb-32">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-red-600 font-bold tracking-[0.5em] uppercase text-[10px] md:text-xs mb-4"
          >
            Milestones
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="text-6xl md:text-7xl font-[family-name:var(--font-anton)] text-white uppercase leading-none tracking-tighter"
          >
            Lenscape Timeline
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
          {displayMoments.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative group pb-12"
            >
              {/* Vertical Accent Line */}
              <div
                className={`absolute left-0 top-0 bottom-0 w-px ${index === 2 ? "bg-red-600" : "bg-white/10"}`}
              />

              {/* Dot Accent */}
              <div
                className={`absolute left-[-4px] top-0 w-2 h-2 rounded-full ${index === 2 ? "bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.8)]" : "bg-white/20"}`}
              />

              <div className="pl-8 pt-2">
                {/* Number and Image Row - Justify Between & Vertically Centered */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-white/10 text-4xl md:text-5xl font-[family-name:var(--font-anton)] flex items-center">
                    0{index + 1}
                  </span>
                  <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-2xl overflow-hidden border border-white/10 bg-white/5 shadow-xl">
                    <Image
                      src={item.img}
                      alt={item.title}
                      fill
                      className="object-cover"
                      quality={75}
                    />
                  </div>
                </div>

                <p className="text-red-500 text-[10px] font-bold tracking-[0.3em] uppercase mb-4">
                  {item.date}
                </p>

                <h3 className="text-lg md:text-xl font-bold text-white mb-4 leading-tight group-hover:text-red-500 transition-colors uppercase">
                  {item.title}
                </h3>

                <p className="text-white/40 text-xs leading-relaxed mb-6 line-clamp-3">
                  {item.description}
                </p>

                <p className="text-white/20 font-[family-name:var(--font-hind-siliguri)] text-[11px] md:text-xs italic leading-relaxed">
                  {item.title.toLowerCase().includes("sky")
                    ? "বাংলার নীল আকাশ ও মেঘের ভেলা"
                    : item.title.toLowerCase().includes("sunset")
                      ? "গোধূলি বেলার মায়াবী রং"
                      : item.title.toLowerCase().includes("river")
                        ? "শান্ত নদীর বুকে স্নিগ্ধ সকাল"
                        : item.title.toLowerCase().includes("mountain") ||
                            item.title.toLowerCase().includes("nature")
                          ? "প্রকৃতির স্নিগ্ধ ছোঁয়া"
                          : `স্মৃতিবিজড়িত ${item.title}`}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default TimelineSection;
