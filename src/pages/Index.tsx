
import React from "react";
import Navbar from "@/components/index/Navbar";
import HeroSection from "@/components/index/HeroSection";
import FeaturesSection from "@/components/index/FeaturesSection";
import HowItWorksSection from "@/components/index/HowItWorksSection";
import PricingSection from "@/components/index/PricingSection";
import CTASection from "@/components/index/CTASection";
import Footer from "@/components/index/Footer";

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-white">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <PricingSection />
      <CTASection />
      <Footer />
    </div>
  );
}
