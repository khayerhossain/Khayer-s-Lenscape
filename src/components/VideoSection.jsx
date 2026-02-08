"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import Image from "next/image";
import Container from "./ui/Container";

const videos = [
  {
    id: 1,
    title: "Rivers",
    thumbnail:
      "https://i.ibb.co.com/RTwFJg5H/Screenshot-2026-02-08-at-8-10-13-PM.png", // Placeholder for Facebook video
    videoId: "1527322588352043", // Facebook Video ID
    type: "facebook",
  },
  {
    id: 2,
    title: "Sreemnagal",
    thumbnail: "https://img.youtube.com/vi/XfTWMyT-DfQ/maxresdefault.jpg",
    videoId: "XfTWMyT-DfQ",
    type: "youtube",
  },
  {
    id: 3,
    title: "Latargul Forest",
    thumbnail: "https://img.youtube.com/vi/O6m-PI8_zqw/maxresdefault.jpg",
    videoId: "O6m-PI8_zqw",
    type: "youtube",
  },
];

const VideoSection = () => {
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <section className="py-24">
      <Container>
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12">
          <div>
            <h2 className="text-5xl font-bold text-white mb-4">
              Cinematic <span className="text-red-500">Films</span>
            </h2>
            <p className="text-[var(--color-dim)] text-lg max-w-md">
              Motion and emotion captured in frames per second.
            </p>
          </div>
          <button className="text-red-500 uppercase tracking-widest text-sm hover:text-white transition-colors mt-6 md:mt-0">
            View All Projects
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Card without <a> to prevent redirect */}
              <div
                onClick={() => setActiveVideo(video)}
                className="block relative overflow-hidden rounded-[18px] group cursor-pointer h-[260px] transition-all"
              >
                <div className="relative w-full h-full">
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    className="object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-white/20">
                      <Play className="w-6 h-6 text-white fill-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
                    <h3 className="text-xl font-bold text-white mb-1">
                      {video.title}
                    </h3>
                    <p className="text-xs text-[var(--color-accent)] uppercase tracking-wider">
                      Watch Now
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>

      {/* Modal */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-[999] bg-black/90 flex items-center justify-center"
          onClick={() => setActiveVideo(null)}
        >
          <motion.div
            className="w-[90%] md:w-[70%] aspect-video"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            {activeVideo?.type === "youtube" ? (
              <iframe
                className="w-full h-full rounded-xl"
                src={`https://www.youtube.com/embed/${activeVideo.videoId}?autoplay=1&rel=0&modestbranding=1`}
                allow="autoplay; encrypted-media"
                allowFullScreen
                title="YouTube Video Player"
              />
            ) : (
              <iframe
                className="w-full h-full rounded-xl"
                src={`https://www.facebook.com/plugins/video.php?href=https://www.facebook.com/reel/${activeVideo.videoId}&show_text=0&autoplay=1`}
                allow="autoplay; encrypted-media"
                allowFullScreen
                title="Facebook Video Player"
              />
            )}
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default VideoSection;
