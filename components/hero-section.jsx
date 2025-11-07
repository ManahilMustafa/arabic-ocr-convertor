"use client"

import { Zap, BookOpen, Download } from "lucide-react"
import { ConversionSection } from "./conversion-section"

export function HeroSection() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-background pt-20 pb-20">
 {/* ✅ LOGO - CENTER ON MOBILE */}
  <div className="absolute top-6 left-1/2 -translate-x-1/2 lg:left-40 lg:translate-x-0 z-30 flex items-center">
    <img src="/logo-ocr.png" alt="logo" className="h-7 w-auto" />
  </div>
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
          <source src="/person.mp4" type="video/mp4" />
        </video>

        {/* ✅ OVERLAY TO DIM VIDEO */}
        <div className="absolute inset-0 bg-black/60 pointer-events-none" />

      </div>

      {/* ✅ CENTERED CONTENT ONLY */}
      <div className="relative z-20 text-center sm:px-6 lg:px-8 max-w-4xl mx-auto mt-20">
      <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full 
    bg-gradient-to-r from-[#A52785] via-[#C62955] to-[#AD0C49]
 animate-fade-in-up text-sm text-white">
  <Zap className="w-3.5 h-3.5 text-white" />
  <p className="font-sm">AI-Powered Note Conversion</p>
</div>



        <h1 className="text-4xl sm:text-5xl lg:text-5xl font-bold tracking-tight mb-4 animate-fade-in-up text-white">
          Transform Handwritten <br />
          <span className="text-white">Notes to Digital</span>
        </h1>

        <p className="text-base sm:text-md text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in-up">
          Upload your handwritten notes, instantly convert them to editable text, and export as PDF or Word documents
          with beautiful formatting.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto animate-fade-in-up">
          <div className="p-4 rounded-lg bg-white/20 border border-white/30 animate-fade-in-up text-sm text-white transition-smooth">
            <BookOpen className="w-5 h-5 text-[#ffff] mx-auto mb-2" />
            <p className="text-sm font-medium">Upload & Convert</p>
          </div>
          <div className="p-4 rounded-lg bg-white/20 border border-white/30 animate-fade-in-up text-sm text-white transition-smooth">
            <Zap className="w-5 h-5 text-[#ffff] mx-auto mb-2" />
            <p className="text-sm font-medium">AI Processing</p>
          </div>
          <div className="p-4 rounded-lg bg-white/20 border border-white/30 animate-fade-in-up text-sm text-white transition-smooth">
            <Download className="w-5 h-5 text-[#ffff] mx-auto mb-2" />
            <p className="text-sm font-medium">Export Instantly</p>
          </div>
        </div>
      </div>

      {/* ✅ FULL WIDTH CONVERSION SECTION */}
      <div className="relative z-20 w-full mt-0">
        <ConversionSection />
      </div>

    </section>
  )
}