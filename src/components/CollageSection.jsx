"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import GlassCard from "./ui/GlassCard";
import Container from "./ui/Container";

import moments from "../data/moments.json";

const allImages = moments.map((item) => ({
  id: item.id,
  src: item.img,
  title: item.title,
  span: item.span || "md:col-span-1 md:row-span-1",
}));

const CollageSection = () => {
  const [visibleCount, setVisibleCount] = useState(12);
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Outdoor", "Nature", "River", "Sky", "Urban"];

  const filteredImages = allImages.filter((img) => {
    const moment = moments.find((m) => m.id === img.id);
    if (activeCategory === "All") return true;
    return moment?.category === activeCategory;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setVisibleCount(12);
  };

  const handleToggleView = () => {
    if (visibleCount >= filteredImages.length) {
      const gridElement = document.getElementById("collage-grid");
      if (gridElement) {
        gridElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      setTimeout(() => setVisibleCount(12), 300);
    } else {
      setVisibleCount((prev) => Math.min(prev + 12, filteredImages.length));
    }
  };

  const isAllVisible = visibleCount >= filteredImages.length;

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Visual background decoration */}
      <div className="absolute top-0 right-0 text-[20rem] font-bold text-white/[0.02] leading-none select-none pointer-events-none translate-x-20 -translate-y-20">
        02
      </div>

      <Container>
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-red-500 font-bold tracking-[0.3em] uppercase text-xs">
              Portfolio
            </span>
            <h2 className="text-4xl md:text-6xl font-bold text-white mt-2 uppercase tracking-tight">
              Captured <span className="text-red-500">Moments</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-4 md:gap-6 mt-8 md:mt-0 text-[var(--color-dim)] text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold"
          >
            {categories.map((cat) => (
              <span
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`cursor-pointer transition-all duration-300 pb-1 border-b-2 ${
                  activeCategory === cat
                    ? "text-white border-red-500"
                    : "border-transparent hover:text-white"
                }`}
              >
                {cat}
              </span>
            ))}
          </motion.div>
        </div>

        <motion.div
          id="collage-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          key={activeCategory}
          className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4"
        >
          {filteredImages.slice(0, visibleCount).map((img, i) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: (i % 12) * 0.05,
                ease: [0.21, 0.45, 0.32, 0.9],
              }}
              className="relative break-inside-avoid group cursor-pointer mb-4"
              onClick={() => setSelectedImage(img)}
            >
              <div className="glass-premium p-2 group-hover:bg-black/60 transition-all duration-500 group-hover:border-white/20">
                <div className="relative overflow-hidden rounded-[18px]">
                  <Image
                    src={img.src}
                    alt={img.title}
                    width={500}
                    height={500}
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="w-full h-auto object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-105"
                    quality={70}
                  />

                  {/* Subtle Reflection Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                  {/* Minimal Title Overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                    <h3 className="text-[9px] font-bold text-white tracking-[0.2em] uppercase mb-1 drop-shadow-lg">
                      {img.title}
                    </h3>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
            >
              <motion.div
                initial={{ scale: 0.9, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 30 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="relative max-w-6xl w-full max-h-[85vh] overflow-hidden rounded-3xl border border-white/10 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative w-full aspect-video md:aspect-[16/9]">
                  <Image
                    src={selectedImage.src}
                    alt={selectedImage.title}
                    fill
                    className="object-contain"
                    priority
                    quality={90}
                  />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black via-black/40 to-transparent">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <span className="text-red-500 font-bold tracking-[0.3em] uppercase text-[10px] mb-2 block">
                      Captured Moment
                    </span>
                    <h3 className="text-2xl md:text-4xl font-bold text-white uppercase tracking-tight">
                      {selectedImage.title}
                    </h3>
                  </motion.div>
                </div>

                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-6 right-6 text-white/50 hover:text-white transition-all cursor-pointer bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full p-3 group"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="group-hover:rotate-90 transition-transform duration-300"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
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
            className="group relative px-8 py-3 bg-transparent overflow-hidden rounded-full border border-white/10 text-white font-bold uppercase tracking-[0.2em] text-[10px] transition-all hover:border-red-500/50"
          >
            <span className="relative z-10 flex items-center gap-2">
              {isAllVisible ? "- Show Less" : "+ Explore Collection"}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.button>
        </div>
      </Container>
    </section>
  );
};

export default CollageSection;
