import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import CollageSection from "../components/CollageSection";
import VideoSection from "../components/VideoSection";
import AboutSection from "../components/AboutSection";
import TimelineSection from "../components/TimelineSection";
import ContactForm from "../components/ContactForm";

import Footer from "../components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <CollageSection />
      <VideoSection />
      <TimelineSection />
      <ContactForm />
      <Footer />
    </main>
  );
}
