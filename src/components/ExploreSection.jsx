"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Container from "./ui/Container";

const exploreItems = [
  {
    id: 1,
    title: "GUAVA MARKET",
    location: "Barisal, Bangladesh",
    src: "https://i.ibb.co.com/2Yq6srY8/IMG20240408171721.jpg",
  },
  {
    id: 2,
    title: "MORNING ROUTINE",
    location: "Dhaka, Bangladesh",
    src: "https://i.ibb.co.com/7NRPpcYz/IMG20240408164947-1.jpg",
  },
  {
    id: 3,
    title: "RAINFOREST PATH",
    location: "Sylhet, Bangladesh",
    src: "https://i.ibb.co.com/1GdBTpTD/IMG20240223191338.jpg",
  },
  {
    id: 4,
    title: "RED UMBRELLA",
    location: "Kyoto, Japan",
    src: "https://i.ibb.co.com/xS8rSsGf/IMG-1621.jpg",
  },
  {
    id: 5,
    title: "MOUNTAIN SUNSET",
    location: "Chittagong, Bangladesh",
    src: "https://i.ibb.co.com/v6v5Hk1Z/IMG-20240429-204848-107.jpg",
  },
  {
    id: 6,
    title: "CYBERPUNK VIBES",
    location: "Dhaka, Bangladesh",
    src: "https://i.ibb.co.com/BV8KYKbX/IMG-7464.jpg",
  },
  {
    id: 7,
    title: "RIVER CROSSING",
    location: "Rajshahi, Bangladesh",
    src: "https://i.ibb.co.com/6538rkZ/IMG-7463.jpg",
  },
  {
    id: 8,
    title: "STREET MUSICIAN",
    location: "Dhaka, Bangladesh",
    src: "https://i.ibb.co.com/svhpxJWq/IMG-7460.jpg",
  },
  {
    id: 9,
    title: "WATERFALL RUSH",
    location: "Sylhet, Bangladesh",
    src: "https://i.ibb.co.com/QjQKNKt0/IMG-7447.jpg",
  },
];

const ExploreSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);
  const [cardsToShow, setCardsToShow] = useState(4);

  useEffect(() => {
    const updateCardsToShow = () => {
      if (window.innerWidth < 640) setCardsToShow(1);
      else if (window.innerWidth < 1024) setCardsToShow(2);
      else setCardsToShow(4);
    };

    updateCardsToShow();
    window.addEventListener("resize", updateCardsToShow);
    return () => window.removeEventListener("resize", updateCardsToShow);
  }, []);

  const nextSlide = () => {
    setCurrentIndex(
      (prev) => (prev + 1) % (exploreItems.length - cardsToShow + 1),
    );
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) =>
        (prev - 1 + (exploreItems.length - cardsToShow + 1)) %
        (exploreItems.length - cardsToShow + 1),
    );
  };

  // Adjust current index if it goes out of bounds when changing screen size
  useEffect(() => {
    const maxIndex = Math.max(0, exploreItems.length - cardsToShow);
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [cardsToShow, currentIndex]);

  return (
    <section className="py-20 md:py-32 bg-black overflow-hidden min-h-screen">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-xl">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-red-600 font-bold tracking-[0.4em] uppercase text-xs mb-4"
            >
              Discover the beauty
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-7xl font-[family-name:var(--font-anton)] text-white leading-tight uppercase tracking-tighter"
            >
              Explore <br /> <span className="text-white/20">The Unseen</span>
            </motion.h2>
          </div>
        </div>

        <div className="relative h-[55vh] md:h-[65vh] w-full flex gap-1 group/accordion overflow-hidden rounded-3xl">
          {exploreItems.slice(0, 5).map((item, index) => (
            <motion.div
              key={item.id}
              className="relative flex-1 hover:flex-[2.5] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] overflow-hidden cursor-pointer"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
            >
              {/* Background Image */}
              <Image
                src={item.src}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-[2s] hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
                priority={index < 2}
              />

              {/* Overlays */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
              <div className="absolute inset-0 bg-red-600/10 opacity-0 hover:opacity-100 transition-opacity duration-700" />

              {/* Vertical Text (Visible when not expanded) */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-100 transition-opacity duration-300">
                <p className="text-white/30 text-[10px] uppercase tracking-[0.5em] font-bold origin-center -rotate-90 whitespace-nowrap mb-24">
                  {item.location.split(",")[0]}
                </p>
              </div>

              {/* Expanded Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 opacity-0 hover:opacity-100 transition-opacity duration-500 delay-100">
                <div className="text-left space-y-6">
                  <div>
                    <p className="text-red-500 text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase mb-2">
                      {item.location}
                    </p>
                    <h3 className="text-3xl md:text-6xl font-[family-name:var(--font-anton)] text-white leading-none uppercase tracking-tighter">
                      {item.title}
                    </h3>
                  </div>

                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-[1px] bg-red-500" />
                      <span className="text-white/60 text-[10px] font-black tracking-widest uppercase">
                        National Moment
                      </span>
                    </div>

                    <p className="text-white/30 text-[10px] uppercase tracking-[0.3em] font-medium">
                      Lens №00{item.id}
                    </p>
                  </div>
                </div>
              </div>

              {/* Border Overlay */}
              <div className="absolute inset-0 border-r border-white/5 last:border-0" />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default ExploreSection;
