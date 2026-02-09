"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Container from "./ui/Container";

const exploreItems = [
  {
    id: 1,
    title: "GUAVA MARKET",
    location: "Barisal, Bangladesh",
    src: "https://i.ibb.co.com/2Yq6srY8/IMG20240408171721.jpg",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    id: 2,
    title: "MORNING ROUTINE",
    location: "Dhaka, Bangladesh",
    src: "https://i.ibb.co.com/7NRPpcYz/IMG20240408164947-1.jpg",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    id: 3,
    title: "RAINFOREST PATH",
    location: "Sylhet, Bangladesh",
    src: "https://i.ibb.co.com/1GdBTpTD/IMG20240223191338.jpg",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    id: 4,
    title: "LATE NIGHT TEA",
    location: "Dhaka, Bangladesh",
    src: "https://i.ibb.co.com/8gXxp8jW/IMG20231204161303.jpg",
    span: "md:col-span-1 md:row-span-2",
  },
  {
    id: 5,
    title: "MOUNTAIN SUNSET",
    location: "Chittagong, Bangladesh",
    src: "https://i.ibb.co.com/v6v5Hk1Z/IMG-20240429-204848-107.jpg",
    span: "md:col-span-2 md:row-span-1",
  },
  {
    id: 6,
    title: "CYBERPUNK VIBES",
    location: "Dhaka, Bangladesh",
    src: "https://i.ibb.co.com/BV8KYKbX/IMG-7464.jpg",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    id: 7,
    title: "RIVER CROSSING",
    location: "Rajshahi, Bangladesh",
    src: "https://i.ibb.co.com/6538rkZ/IMG-7463.jpg",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    id: 8,
    title: "STREET MUSICIAN",
    location: "Dhaka, Bangladesh",
    src: "https://i.ibb.co.com/svhpxJWq/IMG-7460.jpg",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    id: 9,
    title: "WATERFALL RUSH",
    location: "Sylhet, Bangladesh",
    src: "https://i.ibb.co.com/QjQKNKt0/IMG-7447.jpg",
    span: "md:col-span-2 md:row-span-1",
  },
];

const ExploreSection = () => {
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
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="hidden md:block text-right"
          >
            <p className="text-white/40 text-sm max-w-[200px] font-medium leading-relaxed">
              A curated collection of moments captured across the vibrant
              landscapes of Bangladesh.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 auto-rows-[250px] gap-4">
          {exploreItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              viewport={{ once: true }}
              className={`relative overflow-hidden rounded-2xl group cursor-pointer ${item.span}`}
            >
              {/* Image with Parallax-like effect on hover */}
              <Image
                src={item.src}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />

              {/* Glassy Overlay Card */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6 md:p-8">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileHover={{ y: 0, opacity: 1 }}
                  className="transform transition-transform duration-500"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="h-[1px] w-8 bg-red-500" />
                    <span className="text-red-500 text-[10px] font-bold tracking-[0.3em] uppercase">
                      Moment {String(item.id).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2 tracking-tight uppercase">
                    {item.title}
                  </h3>
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10">
                    <p className="text-[10px] text-white/70 uppercase tracking-widest font-medium">
                      {item.location}
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Minimal Bottom Info (Visible by default) */}
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center group-hover:opacity-0 transition-opacity duration-300">
                <div className="bg-black/50 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/5">
                  <p className="text-[10px] text-white font-bold tracking-widest uppercase truncate max-w-[150px]">
                    {item.title}
                  </p>
                </div>
              </div>

              {/* Edge Shine Effect */}
              <div className="absolute inset-0 border border-white/0 group-hover:border-white/20 rounded-2xl transition-colors duration-700 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default ExploreSection;
