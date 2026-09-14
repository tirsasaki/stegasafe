import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import { FAQSection, HowItWorks, SecuritySection } from "@/components/InfoSections";
import SteganographyTool from "@/components/SteganographyTool";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <SteganographyTool />
        <HowItWorks />
        <SecuritySection />
        <FAQSection />
      </main>
      <Footer />
    </>
  );
}
