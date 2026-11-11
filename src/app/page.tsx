import SmoothScroll from "@/components/SmoothScroll";
import RevealObserver from "@/components/RevealObserver";
import ThemeController from "@/components/ThemeController";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import FeatureStrip from "@/components/sections/FeatureStrip";
import Reel from "@/components/sections/Reel";
import Shards from "@/components/sections/Shards";
import Apps from "@/components/sections/Apps";
import Modules from "@/components/sections/Modules";
import AI from "@/components/sections/AI";
import Gamify from "@/components/sections/Gamify";
import Security from "@/components/sections/Security";
import Pricing from "@/components/sections/Pricing";
import Enterprise from "@/components/sections/Enterprise";
import Faq from "@/components/sections/Faq";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Nav />
      <main>
        <Hero />
        {/* everything below the hero sits on one stage whose colours morph per section */}
        <div id="stage" className="stage">
          <FeatureStrip />
          <Reel />
          <Shards />
          <Apps />
          <Modules />
          <AI />
          <Gamify />
          <Security />
          <Pricing />
          <Enterprise />
          <Faq />
          <Contact />
        </div>
      </main>
      <Footer />
      <ThemeController />
      <RevealObserver />
    </>
  );
}
