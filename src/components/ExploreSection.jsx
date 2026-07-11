"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { MapPin } from "lucide-react";
import Container from "./ui/Container";

const ExploreSection = ({ initialExploreItems = [] }) => {
  const exploreItems = initialExploreItems;
  const [hoveredIndex, setHoveredIndex] = useState(null);

  if (exploreItems.length === 0) return null;

  return (
    <section className="py-20 md:py-32 bg-black overflow-hidden min-h-screen">
      <Container>
        {/* ── Section Header ── */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-5"
            >
              <span className="w-8 h-px bg-red-500" />
              <p className="text-red-500 font-black tracking-[0.45em] uppercase text-[10px]">
                Discover the Beauty
              </p>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl font-[family-name:var(--font-anton)] text-white leading-tight uppercase tracking-tighter"
            >
              Explore{" "}
              <span
                style={{
                  WebkitTextStroke: "1px rgba(255,255,255,0.18)",
                  color: "transparent",
                }}
              >
                The Unseen
              </span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="text-white/30 text-xs uppercase tracking-[0.3em] font-bold max-w-[160px] text-right hidden md:block"
          >
            Hover to reveal
          </motion.p>
        </div>

        {/* ── Accordion Panels ── */}
        <div className="relative h-[55vh] md:h-[70vh] w-full flex gap-[3px] overflow-hidden rounded-2xl">
          {exploreItems.slice(0, 5).map((item, index) => (
            <motion.div
              key={item.id}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative overflow-hidden cursor-pointer"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.08, duration: 0.7 }}
              viewport={{ once: true }}
              animate={{
                flex: hoveredIndex === index ? 3 : hoveredIndex !== null ? 0.6 : 1,
              }}
              style={{ transition: "flex 0.7s cubic-bezier(0.25,1,0.5,1)" }}
            >
              {/* Background Image */}
              <Image
                src={item.src}
                alt={item.title}
                fill
                className="object-cover"
                style={{
                  transform: hoveredIndex === index ? "scale(1.04)" : "scale(1)",
                  transition: "transform 1.8s cubic-bezier(0.25,1,0.5,1)",
                }}
                sizes="(max-width: 768px) 100vw, 33vw"
                priority={index < 2}
              />

              {/* Base gradient — always visible */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/85" />

              {/* Red tint overlay on hover */}
              <div
                className="absolute inset-0 bg-red-700/10"
                style={{
                  opacity: hoveredIndex === index ? 1 : 0,
                  transition: "opacity 0.6s ease",
                }}
              />

              {/* ── Collapsed label (always visible, fades on hover) ── */}
              <div
                className="absolute bottom-6 left-0 right-0 flex items-end justify-center px-3 pointer-events-none"
                style={{
                  opacity: hoveredIndex === index ? 0 : 1,
                  transition: "opacity 0.35s ease",
                }}
              >
                <div className="flex flex-col items-center gap-1.5">
                  <span className="text-white/30 text-[8px] font-black uppercase tracking-[0.4em] [writing-mode:vertical-rl] rotate-180">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="w-px h-6 bg-red-500/60" />
                </div>
              </div>

              {/* ── Expanded Content (visible on hover) ── */}
              <div
                className="absolute inset-0 flex flex-col justify-end p-7 md:p-10 pointer-events-none"
                style={{
                  opacity: hoveredIndex === index ? 1 : 0,
                  transform: hoveredIndex === index ? "translateY(0)" : "translateY(12px)",
                  transition: "opacity 0.45s ease 0.15s, transform 0.45s ease 0.15s",
                }}
              >
                {/* Location row */}
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-3 h-3 text-red-500 shrink-0" />
                  <p className="text-red-400 text-[10px] font-black tracking-[0.45em] uppercase">
                    {item.location}
                  </p>
                </div>

                {/* Title */}
                <h3 className="text-3xl md:text-5xl font-[family-name:var(--font-anton)] text-white uppercase tracking-tight leading-none mb-5">
                  {item.title}
                </h3>

                {/* Divider line + badge */}
                <div className="flex items-center gap-3">
                  <span className="w-10 h-px bg-red-500" />
                  <span className="text-white/40 text-[9px] font-black tracking-[0.4em] uppercase">
                    Photo Story
                  </span>
                </div>
              </div>

              {/* Thin right border separator */}
              <div className="absolute inset-y-0 right-0 w-px bg-white/[0.04]" />
            </motion.div>
          ))}
        </div>

        {/* ── Bottom caption row ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="flex items-center justify-between mt-6"
        >
          <p className="text-white/15 text-[10px] font-bold uppercase tracking-[0.35em]">
            {exploreItems.slice(0, 5).length} Locations
          </p>
          <div className="flex gap-1">
            {exploreItems.slice(0, 5).map((_, i) => (
              <span
                key={i}
                className="w-6 h-px transition-all duration-300"
                style={{
                  background: hoveredIndex === i ? "rgb(239,68,68)" : "rgba(255,255,255,0.12)",
                }}
              />
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default ExploreSection;
