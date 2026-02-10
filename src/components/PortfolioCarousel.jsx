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
    <section className="py-12 md:py-20 bg-[#030303] overflow-hidden relative">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] bg-red-500/5 blur-[120px] rounded-full pointer-events-none" />

      <Container>
        <div className="relative h-[450px] sm:h-[500px] md:h-[600px] lg:h-[700px] w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 bg-white/[0.02] backdrop-blur-sm">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentItem.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 flex flex-col md:flex-row"
            >
              {/* Left Content Side */}
              <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-16 lg:p-24 flex flex-col justify-center relative z-20">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="relative z-10"
                >
                  <span className="text-red-500 font-bold uppercase tracking-[0.4em] text-[10px] sm:text-xs mb-4 block">
                    Featured Work
                  </span>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 sm:mb-8 leading-[1.1] tracking-tight">
                    {currentItem.title}
                  </h2>
                  <div className="w-16 h-[2px] bg-red-600/50 mb-8 sm:mb-10" />
                  <p className="text-white/60 text-base sm:text-lg md:text-xl leading-relaxed mb-8 sm:mb-12 max-w-xl">
                    {currentItem.description}
                  </p>

                  <div className="grid grid-cols-2 gap-8 max-w-sm">
                    <div className="space-y-1">
                      <span className="text-white/20 uppercase text-[10px] tracking-widest font-bold">
                        Date
                      </span>
                      <p className="text-white/90 font-medium text-sm md:text-base">
                        {currentItem.date}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-white/20 uppercase text-[10px] tracking-widest font-bold">
                        Category
                      </span>
                      <p className="text-white/90 font-medium text-sm md:text-base">
                        {currentItem.category}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Right Image Side */}
              <div className="w-full md:w-1/2 relative h-full">
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
                  {/* Perfect Blending Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#030303] via-[#030303]/40 to-transparent hidden md:block" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent md:hidden" />
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Indicators */}
          <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-4 sm:left-8 md:left-16 flex gap-2 sm:gap-3 z-20">
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
          <div className="absolute top-4 sm:top-6 md:top-8 right-4 sm:right-8 z-20 hidden md:block">
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
