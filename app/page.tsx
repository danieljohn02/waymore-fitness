import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import TickerStrip from "@/components/TickerStrip";
import PricingSection from "@/components/PricingSection";
import ClassesSection from "@/components/ClassesSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <HeroSection />
      <TickerStrip />
      <AboutSection />
      <PricingSection />
      <ClassesSection />
      <ContactSection />
      <Footer />
    </>
  );
}
