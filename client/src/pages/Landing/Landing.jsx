import Navbar from "../../components/Navbar";
import Hero from "../../components/Hero";
import Features from "../../components/Features";
import { HowItWorks, Pricing, Testimonials, CTA, Footer } from "../../components/LandingSections";

export default function Landing() {
  return (
    <div className="bg-bg text-textPrimary min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Pricing />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}
