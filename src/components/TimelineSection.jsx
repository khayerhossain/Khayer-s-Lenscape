"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Container from "./ui/Container";
import { Calendar, MapPin, Camera } from "lucide-react";

const TimelineSection = ({ initialMoments = [] }) => {
  const displayMoments = initialMoments.slice(0, 4);
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  if (displayMoments.length === 0) return null;

  return (
    <section ref={sectionRef} className="relative py-28 md:py-40 overflow-hidden bg-[#060608]">

      {/* ── Parallax Background ── */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        <Image
          src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80"
          alt="Timeline Background"
          fill
          className="object-cover opacity-[0.06]"
          priority
        />
      </motion.div>

      {/* ── Ambient glow top ── */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-red-600/5 blur-[100px] rounded-full pointer-events-none z-0" />

      <Container className="relative z-10">

        {/* ── Section Header ── */}
        <div className="mb-20 md:mb-28 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-5"
          >
            <span className="w-8 h-px bg-red-500" />
            <p className="text-red-500 font-black tracking-[0.45em] uppercase text-[10px]">
              Milestones
            </p>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            viewport={{ once: true }}
            className="text-5xl md:text-8xl font-[family-name:var(--font-anton)] text-white uppercase leading-none tracking-tighter"
          >
            Lenscape{" "}
            <span
              style={{
                WebkitTextStroke: "1px rgba(255,255,255,0.15)",
                color: "transparent",
              }}
            >
              Timeline
            </span>
          </motion.h2>
        </div>

        {/* ── Timeline Cards Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.04] rounded-2xl overflow-hidden border border-white/[0.05]">
          {displayMoments.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.65 }}
              viewport={{ once: true }}
              className="group relative bg-[#060608] hover:bg-[#0d0d0f] transition-colors duration-500 p-7 flex flex-col gap-6 overflow-hidden"
            >
              {/* Index glow blob */}
              <div
                className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none blur-3xl"
                style={{ background: index === 0 ? "rgba(220,38,38,0.08)" : "rgba(255,255,255,0.03)" }}
              />

              {/* ── Top row: number + thumbnail ── */}
              <div className="flex items-start justify-between">
                <span className="text-5xl md:text-6xl font-[family-name:var(--font-anton)] text-white/[0.06] leading-none group-hover:text-white/[0.09] transition-colors duration-500">
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Thumbnail */}
                <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-white/10 shadow-xl shrink-0 group-hover:border-red-500/30 transition-colors duration-500">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    quality={75}
                  />
                  {/* Red tint on hover */}
                  <div className="absolute inset-0 bg-red-600/0 group-hover:bg-red-600/10 transition-colors duration-500" />
                </div>
              </div>

              {/* ── Meta row: date + location ── */}
              <div className="flex flex-col gap-1.5">
                {item.date && (
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-2.5 h-2.5 text-red-500 shrink-0" />
                    <span className="text-red-500 text-[9px] font-black tracking-[0.4em] uppercase">
                      {item.date}
                    </span>
                  </div>
                )}
                {item.location && (
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-2.5 h-2.5 text-white/20 shrink-0" />
                    <span className="text-white/25 text-[9px] font-bold tracking-[0.3em] uppercase">
                      {item.location}
                    </span>
                  </div>
                )}
              </div>

              {/* ── Title ── */}
              <h3 className="text-base md:text-lg font-bold text-white uppercase tracking-wide leading-snug group-hover:text-red-400 transition-colors duration-400">
                {item.title}
              </h3>

              {/* ── Description ── */}
              {item.description && (
                <p className="text-white/30 text-xs leading-relaxed line-clamp-3 flex-1">
                  {item.description}
                </p>
              )}

              {/* ── Category badge ── */}
              {item.category && (
                <div className="flex items-center gap-2 mt-auto pt-4 border-t border-white/[0.05]">
                  <Camera className="w-3 h-3 text-white/20" />
                  <span className="text-white/20 text-[9px] font-black uppercase tracking-[0.35em]">
                    {item.category}
                  </span>
                </div>
              )}

              {/* Bottom accent line — appears on hover */}
              <div
                className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-red-500 to-transparent w-0 group-hover:w-full transition-all duration-700"
              />
            </motion.div>
          ))}
        </div>

        {/* ── Bottom decorative row ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="flex items-center justify-between mt-8"
        >
          <p className="text-white/10 text-[10px] font-bold uppercase tracking-[0.4em]">
            {displayMoments.length} Featured Stories
          </p>
          <div className="flex items-center gap-2">
            {displayMoments.map((_, i) => (
              <span
                key={i}
                className={`h-px transition-all duration-300 ${i === 0 ? "w-8 bg-red-500" : "w-4 bg-white/10"}`}
              />
            ))}
          </div>
        </motion.div>

      </Container>
    </section>
  );
};

export default TimelineSection;
