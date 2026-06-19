import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import CollageSection from "../components/CollageSection";
import VideoSection from "../components/VideoSection";
import AboutSection from "../components/AboutSection";
import TimelineSection from "../components/TimelineSection";
import ContactForm from "../components/ContactForm";
import ExploreSection from "../components/ExploreSection";
import PortfolioCarousel from "../components/PortfolioCarousel";
import Footer from "../components/Footer";

import { dbConnect, seedDatabase, PortfolioItem, MomentItem, ExploreItem, VideoItem } from "@/lib/db";

// Force dynamic rendering to ensure fresh database items load
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Home() {
  // Connect and seed on load if empty
  await dbConnect();
  await seedDatabase();

  // Fetch items from DB
  const portfolioPromise = PortfolioItem.find().sort({ createdAt: -1 }).lean();
  const momentsPromise = MomentItem.find().sort({ createdAt: -1 }).lean();
  const explorePromise = ExploreItem.find().sort({ createdAt: -1 }).lean();
  const videosPromise = VideoItem.find().sort({ createdAt: -1 }).lean();

  const [portfolioItemsRaw, momentsItemsRaw, exploreItemsRaw, videosItemsRaw] = await Promise.all([
    portfolioPromise,
    momentsPromise,
    explorePromise,
    videosPromise,
  ]);

  // Convert MongoDB documents to plain objects (handling _id and serializability)
  const portfolioItems = portfolioItemsRaw.map(item => ({
    id: item._id.toString(),
    title: item.title || "",
    description: item.description || "",
    date: item.date || "",
    img: item.img || "",
    category: item.category || "",
  }));

  const momentsItems = momentsItemsRaw.map(item => ({
    id: item._id.toString(),
    title: item.title || "",
    description: item.description || "",
    date: item.date || "",
    location: item.location || "",
    img: item.img || "",
    span: item.span || "md:col-span-1 md:row-span-1",
    category: item.category || "",
  }));

  const exploreItems = exploreItemsRaw.map(item => ({
    id: item._id.toString(),
    title: item.title || "",
    location: item.location || "",
    src: item.src || "",
  }));

  const videos = videosItemsRaw.map(item => ({
    id: item._id.toString(),
    title: item.title || "",
    description: item.description || "",
    thumbnail: item.thumbnail || "",
    videoId: item.videoId || "",
    type: item.type || "youtube",
  }));

  return (
    <main className="min-h-screen relative overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <CollageSection initialMoments={momentsItems} />
      <ExploreSection initialExploreItems={exploreItems} />
      <PortfolioCarousel initialPortfolio={portfolioItems} />
      <VideoSection initialVideos={videos} />
      <TimelineSection initialMoments={momentsItems} />
      <ContactForm />
      <Footer />
    </main>
  );
}

