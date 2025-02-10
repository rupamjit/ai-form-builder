import Footer from "@/components/Footer";
import HeroSection from "@/components/Hero";
import PricingPage from "@/components/PricingPage";
import React from "react";

const HomePage = () => {
  return (
    <div>
      <div className="grid items-center justify-items-center min-h-screen p-8 gap-16 sm:p-20">
        <HeroSection />
        <PricingPage />
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
