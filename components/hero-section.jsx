"use client"

import { Zap, BookOpen, Download } from "lucide-react"
import { SparklesCore } from "@/components/ui/sparkles"
import { ConversionSection } from "./conversion-section"

export function HeroSection() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-background pt-20 pb-20">

      {/* ✅ VIDEO BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          ref={(video) => { if(video) video.playbackRate = 0.5; }}
        >
          <source src="/bg.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-gradient-to-b from-[#8b3dff]/10 via-transparent to-black/10 pointer-events-none" />

      </div>

      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="blob blob1"></div>
        <div className="blob blob2"></div>
      </div>

      <div className="absolute inset-0 z-[11] pointer-events-none">
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1.0}
          particleDensity={180}
          className="w-full h-full"
          particleColor="#8b3dff"
        />
      </div>

      {/* ✅ CENTERED CONTENT ONLY */}
      <div className="relative z-20 text-center  sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full bg-[#8b3dff]/10 border border-[#8b3dff]/20 animate-fade-in-up text-sm">
          <Zap className="w-3.5 h-3.5 text-[#8b3dff]" />
          <p className="font-sm text-[#8b3dff]">AI-Powered Note Conversion</p>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-5xl font-bold tracking-tight mb-4 animate-fade-in-up text-foreground">
          Transform Handwritten <br />
          <span className="text-[#8b3dff]">Notes to Digital</span>
        </h1>

        <p className="text-base sm:text-md text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in-up">
          Upload your handwritten notes, instantly convert them to editable text, and export as PDF or Word documents
          with beautiful formatting.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto animate-fade-in-up">
          <div className="p-4 rounded-lg bg-card border border-border hover:border-primary/30 transition-smooth">
            <BookOpen className="w-5 h-5 text-[#8b3dff] mx-auto mb-2" />
            <p className="text-sm font-medium">Upload & Convert</p>
          </div>
          <div className="p-4 rounded-lg bg-card border border-border hover:border-primary/30 transition-smooth">
            <Zap className="w-5 h-5 text-[#8b3dff] mx-auto mb-2" />
            <p className="text-sm font-medium">AI Processing</p>
          </div>
          <div className="p-4 rounded-lg bg-card border border-border hover:border-primary/30 transition-smooth">
            <Download className="w-5 h-5 text-[#8b3dff] mx-auto mb-2" />
            <p className="text-sm font-medium">Export Instantly</p>
          </div>
        </div>
      </div>

      {/* ✅ NOW FULL WIDTH, ALIGNED PROPERLY */}
      <div className="relative z-20 w-full mt-0">
        <ConversionSection />
      </div>

    </section>
  )
}
