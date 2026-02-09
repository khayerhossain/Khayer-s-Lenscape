"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import portfolioData from "../data/portfolio.json";
import Container from "./ui/Container";

const PortfolioCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % portfolioData.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const currentItem = portfolioData[currentIndex];

  return (
    <section className="py-20 bg-[#030303] overflow-hidden relative">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-red-500/5 blur-[120px] rounded-full pointer-events-none" />

      <Container>
        <div className="relative h-[600px] md:h-[700px] w-full rounded-3xl overflow-hidden border border-white/10 bg-white/[0.02] backdrop-blur-sm">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentItem.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 flex flex-col md:flex-row"
            >
              {/* Left Content Side - Glassy */}
              <div className="w-full md:w-[40%] p-8 md:p-16 flex flex-col justify-center relative z-10 bg-black/40 md:bg-transparent backdrop-blur-md md:backdrop-blur-none">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >
                  <span className="text-red-500 font-bold uppercase tracking-[0.3em] text-xs mb-4 block">
                    Portfolio
                  </span>
                  <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                    {currentItem.title}
                  </h2>
                  <div className="w-12 h-[2px] bg-white/20 mb-8" />
                  <p className="text-[var(--color-dim,rgba(255,255,255,0.6))] text-lg leading-relaxed mb-10 max-w-md">
                    {currentItem.description}
                  </p>

                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                      <span className="text-white/30 uppercase text-[10px] tracking-widest font-bold">
                        Date
                      </span>
                      <span className="text-white/80 font-medium">
                        {currentItem.date}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-white/30 uppercase text-[10px] tracking-widest font-bold">
                        Category
                      </span>
                      <span className="text-white/80 font-medium">
                        {currentItem.category}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Right Image Side */}
              <div className="w-full md:w-[60%] relative h-full">
                <motion.div
                  initial={{ scale: 1.1, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1.2 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={currentItem.img}
                    alt={currentItem.title}
                    fill
                    className="object-cover"
                    priority
                  />
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent hidden md:block" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:hidden" />
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Indicators */}
          <div className="absolute bottom-8 left-8 md:left-16 flex gap-3 z-20">
            {portfolioData.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1 transition-all duration-500 rounded-full ${
                  currentIndex === idx
                    ? "w-8 bg-red-500"
                    : "w-4 bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Glassy Floating Text (Optional/Reference matches) */}
          <div className="absolute top-8 right-8 z-20 hidden md:block">
            <div className="px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
              <span className="text-white/50 text-xs font-medium tracking-widest uppercase">
                {String(currentIndex + 1).padStart(2, "0")} /{" "}
                {String(portfolioData.length).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default PortfolioCarousel;
