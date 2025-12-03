"use client"

import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ServicesCarousel } from "@/components/services-carousel"
import { BenefitsSection } from "@/components/benefits-section"
import { PortfolioSection } from "@/components/portfolio-section"
import { ProcessSection } from "@/components/process-section"
import { PricingSection } from "@/components/pricing-section"
import { CtaSection } from "@/components/cta-section"
import { Footer } from "@/components/footer"
import { AnimatedBackground } from "@/components/animated-background"

export default function HomePage() {
  return (
    <div id="top" className="min-h-screen relative">
      <AnimatedBackground />
      <Header />
      <main>
        <HeroSection />
        <BenefitsSection />
        <ServicesCarousel />
        <PortfolioSection />
        <ProcessSection />
        <PricingSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  )
}
