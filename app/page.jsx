"use client"

import { HeroSection } from "@/components/hero-section"
// import { ConversionSection } from "@/components/conversion-section"
import { HowToSection } from "@/components/how-to-section"
import { Footer } from "@/components/footer"
import { ZigzagSection } from "@/components/ZigzagSection"
import CounterSection  from "@/components/CounterSection";
export default function Home() {
  return (
    <main className="w-full">
      <HeroSection />
      {/* <ConversionSection /> */}
      <HowToSection />
      <ZigzagSection />
      <CounterSection />
      <Footer />
    </main>
  )
}
