import FloatingBubbles from "@/components/FloatingBubbles";
import HeartCursor from "@/components/HeartCursor";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import LoveLetter from "@/components/LoveLetter";
import ReasonsILoveYou from "@/components/ReasonsILoveYou";
import MyQueen from "@/components/MyQueen";
import PhotoGallery from "@/components/PhotoGallery";
import Footer from "@/components/Footer";
import MusicPlayer from "@/components/MusicPlayer";

export default function Home() {
  return (
    <main className="relative min-h-screen" style={{ background: "linear-gradient(180deg, #fff9fb 0%, #fff1f6 40%, #fffbeb 100%)" }}>
      <FloatingBubbles />
      <HeartCursor />
      <Navbar />
      <Hero />
      <div id="letter"><LoveLetter /></div>
      <div id="reasons"><ReasonsILoveYou /></div>
      <div id="queen"><MyQueen /></div>
      <div id="photos"><PhotoGallery /></div>
      <Footer />
      <MusicPlayer />
    </main>
  );
}
