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
    <section className="py-20 md:py-32 bg-[#030303] overflow-hidden">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-xl">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-red-500 font-bold tracking-[0.4em] uppercase text-xs mb-4"
            >
              Discover the beauty
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-7xl font-bold text-white leading-tight uppercase tracking-tighter"
            >
              Explore <br /> <span className="text-white/20">The Unseen</span>
            </motion.h2>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={prevSlide}
              className="p-4 rounded-full border border-white/10 text-white hover:bg-white/5 transition-colors group disabled:opacity-30"
              disabled={currentIndex === 0}
            >
              <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
            </button>
            <button
              onClick={nextSlide}
              className="p-4 rounded-full border border-white/10 text-white hover:bg-white/5 transition-colors group disabled:opacity-30"
              disabled={currentIndex >= exploreItems.length - cardsToShow}
            >
              <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        <div className="relative overflow-visible" ref={containerRef}>
          <motion.div
            className="flex gap-6"
            animate={{
              x: `calc(-${currentIndex * (100 / cardsToShow)}% - ${currentIndex * (24 / cardsToShow)}px)`,
            }}
            transition={{ type: "spring", damping: 25, stiffness: 120 }}
          >
            {exploreItems.map((item, index) => (
              <motion.div
                key={item.id}
                className="relative flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] aspect-[3/4] overflow-hidden rounded-2xl group cursor-pointer border border-white/5"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                viewport={{ once: true }}
              >
                {/* Image */}
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-[2s] ease-out group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />

                {/* Dark Overlay with Text */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

                <div className="absolute inset-0 flex flex-col justify-end p-8 gap-4">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="flex flex-col gap-2"
                  >
                    <p className="text-white/60 text-[11px] font-bold tracking-[0.3em] uppercase">
                      TUR №{item.id}
                    </p>
                    <h3 className="text-xl md:text-2xl font-black text-white leading-tight uppercase tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-white/40 text-[10px] uppercase tracking-widest font-medium">
                      {item.location}
                    </p>
                  </motion.div>
                </div>

                {/* Glassy Border on Hover */}
                <div className="absolute inset-0 border border-white/0 group-hover:border-white/20 rounded-2xl transition-colors duration-700 pointer-events-none" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default ExploreSection;
