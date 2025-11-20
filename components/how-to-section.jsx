"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image" // Assuming you are using Next.js and need Image component
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import {  CheckCircle } from "lucide-react"

// --- Image Imports ---
import folderImg from "@/public/Folder.png"
import aiExportImg from "@/public/ai-export.png"
import reviewImg from "@/public/review.png"
import exportImg from "@/public/exported.png"
import docOneImg from "@/public/docone.png"
import docTwoImg from "@/public/doctwo.png"
import starImg from "@/public/star.png"

if (typeof window !== "undefined" && !gsap.core.globals().ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger)
}

// =======================================================================
// 📚 DATA DEFINITIONS (REQUIRED for the component to function)
// =======================================================================

const steps = [
  {
    title: "1. Secure Upload",
    description:
      "Start by securely uploading images or scans of your handwritten notes from any device. We support multiple file types and batch processing.",
    bullets: [
      "Supported formats: JPEG, PNG, PDF, and HEIC.",
      "High-resolution image processing for optimal OCR.",
      "Instantaneous file organization into digital folders.",
    ],

    visual: "upload",
  },
  {
    title: "2. AI-Powered Recognition",
    description:
      "Our Next-Gen AI, specialized for complex Arabic script, instantly digitizes your notes, identifying handwriting, tables, and mixed content.",
    bullets: [
      "OCR optimized for diverse Arabic calligraphy and dialects.",
      "Automatic detection and separation of text blocks and diagrams.",
      "Progressive conversion tracking for large documents.",
    ],

    visual: "processing",
  },
  {
    title: "3. Review and Edit",
    description:
      "Before finalizing, review the digital transcription. Our side-by-side editor allows you to make quick corrections and structural adjustments.",
    bullets: [
      "Interactive editor with instant synchronization.",
      "Tools for adding formatting, headings, and lists.",
      "Optional manual review by a linguistic expert (premium feature).",
    ],

    visual: "review",
  },
  {
    title: "4. Export and Share",
    description:
      "Download your perfectly digitized notes in standard formats ready for sharing, archiving, or further editing.",
    bullets: [
      "Export to DOCX, PDF, or plain text.",
      "Direct integration with cloud storage services (Google Drive, Dropbox).",
      "Retain original note images linked to the digital file.",
    ],

    visual: "export",
  },
]

const keyFeatures = [
  {
    title: "Advanced Arabic OCR",
    description: "Specialized engine trained on millions of Arabic script samples for unparalleled accuracy.",
    icon: CheckCircle,
  },
  {
    title: "Contextual AI Parsing",
    description: "Intelligently understands content layout, including tables, lists, and hierarchical headings.",
    icon: CheckCircle,
  },
  {
    title: "Multi-Dialect Support",
    description: "Recognizes variations across different regional Arabic handwritings and styles.",
    icon: CheckCircle,
  },
    {
    title: "Multi-Dialect Support",
    description: "Recognizes variations across different regional Arabic handwritings and styles.",
    icon: CheckCircle,
  },
    {
    title: "Multi-Dialect Support",
    description: "Recognizes variations across different regional Arabic handwritings and styles.",
    icon: CheckCircle,
  },
    {
    title: "Multi-Dialect Support",
    description: "Recognizes variations across different regional Arabic handwritings and styles.",
    icon: CheckCircle,
  },
  
]

// =======================================================================
// 🎨 RENDER VISUAL HELPER FUNCTION (REQUIRED for the component to function)
// =======================================================================

const renderVisual = (step, floatingRefs) => {
  switch (step.visual) {
    case "upload":
      return (
        <div className="relative w-full max-w-xs sm:max-w-sm h-60 flex items-center justify-center">
          <div className="relative">
            <Image src={folderImg} alt="Digital Folder" width={150} height={120} className="relative z-10 w-32 sm:w-40 h-auto" />
          </div>
          <div className="absolute right-2 top-6 flex flex-col gap-4">
            <Image
              src={docOneImg}
              alt="Note Document 1"
              width={110}
              height={150}
              className="w-20 sm:w-24 rounded-lg border border-white/40 bg-white/80"
              ref={(el) => (floatingRefs.current.uploadDocOne = el)}
              style={{ transformOrigin: "left center" }}
            />
            <Image
              src={docTwoImg}
              alt="Note Document 2"
              width={110}
              height={150}
              className="w-20 sm:w-24 rounded-lg border border-white/40 bg-white/80 -mt-6"
              ref={(el) => (floatingRefs.current.uploadDocTwo = el)}
              style={{ transformOrigin: "left center" }}
            />
          </div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-36 sm:w-48">
            <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
              <span
                ref={(el) => (floatingRefs.current.uploadProgress = el)}
                className="block h-full rounded-full bg-[#1177E5]"
                style={{ width: "25%" }}
              />
            </div>
          </div>
        </div>
      )
    case "processing":
      return (
        <div className="relative w-full max-w-xs sm:max-w-sm h-60 flex items-center justify-center">
          <div className="relative">
            <Image src={aiExportImg} alt="AI Conversion" width={150} height={120} className="relative z-10 w-32 sm:w-40 h-auto" />
            <Image
              src={starImg}
              alt="Sparkle"
              className="absolute -top-5 -right-9 w-6 sm:w-8"
              ref={(el) => (floatingRefs.current.processingStarTop = el)}
            />
            <Image
              src={starImg}
              alt="Sparkle"
              className="absolute -bottom-3 -left-8 w-4 sm:w-6"
              ref={(el) => (floatingRefs.current.processingStarBottom = el)}
            />
          </div>
        </div>
      )
    case "review":
      return (
        <div className="relative w-full max-w-xs sm:max-w-sm h-60 flex items-center justify-center">
          <div className="relative">
            <Image src={reviewImg} alt="Review Editor" width={150} height={150} className="w-32 sm:w-40 h-auto" />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3">
              <div className="relative w-20 sm:w-40 h-20 sm:h-24 mr-[-50]">
                <Image
                  src={docOneImg}
                  alt="Doc layer 1"
                  width={70}
                  height={90}
                  className="absolute top-0 right-0 w-12 sm:w-14 rounded-lg bg-white/80 border border-white/40"
                />
                <Image
                  src={docTwoImg}
                  alt="Doc layer 2"
                  width={70}
                  height={90}
                  className="absolute top-4 right-3 w-12 sm:w-14 rounded-lg bg-white/80 border border-white/40"
                />
              </div>
            </div>
          </div>
        </div>
      )
    case "export":
      return (
        <div className="relative w-full max-w-sm h-64 flex justify-center items-center">
          <Image src={exportImg} alt="Exported Document" width={250} height={250}  />
        </div>
      )
    default:
      return null
  }
}

// =======================================================================
// 🏗️ MAIN COMPONENT
// =======================================================================

export function HowToSection() {
  const sectionRef = useRef(null)
  const stepRefs = useRef([])
  const featureRefs = useRef([])
  const floatingRefs = useRef({
    uploadDocOne: null,
    uploadDocTwo: null,
    uploadProgress: null,
    processingStarTop: null,
    processingStarBottom: null,
  })

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animation for Steps
      stepRefs.current.forEach((step) => {
        if (!step) return
        gsap.from(step, {
          opacity: 0,
          y: 50,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: step, start: "top 80%" },
        })
      })

      // Animation for Key Features (Fixing the missing featureRefs usage)
      featureRefs.current.forEach((card) => {
        if (!card) return
        gsap.from(card, {
          opacity: 0,
          y: 60,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 85%" },
        })
      })

      // Floating Animations
      const { uploadDocOne, uploadDocTwo, uploadProgress, processingStarTop, processingStarBottom } = floatingRefs.current
      if (uploadDocOne)
        gsap.fromTo(
          uploadDocOne,
          { rotationY: -6 },
          { rotationY: 10, duration: 1.8, repeat: -1, yoyo: true, ease: "sine.inOut" }
        )
      if (uploadDocTwo)
        gsap.fromTo(
          uploadDocTwo,
          { rotationY: 4 },
          { rotationY: -12, duration: 2.1, repeat: -1, yoyo: true, ease: "sine.inOut" }
        )
      if (uploadProgress)
        gsap.fromTo(
          uploadProgress,
          { width: "15%" },
          { width: "85%", duration: 2.4, repeat: -1, yoyo: true, ease: "power1.inOut" }
        )
      const sparkleAnimation = {
        from: { scale: 0.6, opacity: 0.4 },
        to: { scale: 1.2, opacity: 1, duration: 1.2, repeat: -1, yoyo: true, ease: "sine.inOut" },
      }
      if (processingStarTop)
        gsap.fromTo(processingStarTop, sparkleAnimation.from, sparkleAnimation.to)
      if (processingStarBottom)
        gsap.fromTo(
          processingStarBottom,
          sparkleAnimation.from,
          { ...sparkleAnimation.to, delay: 0.3 }
        )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    // 1. Removed py-20 and background classes from here.
    <section className="relative w-full overflow-hidden bg-white" ref={sectionRef}>
      
    
      <div className="relative w-full py-20 bg-white">
       
        <div className="absolute inset-0 bg-white" />
        <div className="absolute inset-0 bg-[url('/background.png')] bg-cover bg-center" />

      
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3 text-slate-900">How It Works</h2>
            <p className="text-sm sm:text-base text-slate-500">Four simple steps to transform your handwritten notes</p>
          </div>

          {/* Steps */}
          <div className="space-y-16">
            {steps.map((step, index) => {
              const IconComponent = step.icon
              const isReversed = index % 2 !== 0
              return (
                <div
                  key={step.title}
                  ref={(el) => (stepRefs.current[index] = el)}
                  className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16 md:items-center"
                >
                  <div className={`w-full flex justify-center ${isReversed ? "md:order-2" : "md:order-1"}`}>
                    {renderVisual(step, floatingRefs)}
                  </div>
                  <div className={`w-full ${isReversed ? "md:order-1" : "md:order-2"}`}>
                    <h3 className="text-2xl font-semibold text-slate-900 mb-3 flex items-center gap-3">
                    {step.title} 
                    </h3>
                    <p className="text-slate-600 text-sm sm:text-base mb-4">{step.description}</p>
                    <ul className="space-y-2 text-sm text-slate-600">
                      {step.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-3 leading-relaxed">
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#1177E5]" /> {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
   
      <div className="relative mt-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="relative z-10 py-12 bg-transparent max-w-6xl mx-auto">
          <div className="mb-10 text-left">
            <h3 className="text-3xl font-bold text-slate-900">Key Features</h3>
            <p className="text-sm text-slate-500 mt-1">Next-Gen OCR Optimized for Arabic Script</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {keyFeatures.map((feature, index) => {
              const FeatureIcon = feature.icon
              return (
                <div
                  key={feature.title}
                  ref={(el) => (featureRefs.current[index] = el)} // Added ref here
                  style={{ backgroundColor: "rgba(255,255,255,0.9)", boxShadow: "inset -12.74px -12.74px 50.96px 0.8px #D6E1F07D" }}
                  className="flex flex-col items-start gap-3 rounded-[24px] p-4 sm:p-5 ring-1 ring-white/80 transition hover:-translate-y-1"
                >
                  <div className="flex items-center justify-center h-14 w-14 rounded-2xl bg-[#f0f6ff]">
                    {/* Replaced placeholder div with actual icon component */}
                    <FeatureIcon className="h-8 w-8 text-[#1177E5]" />
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-slate-900">{feature.title}</h4>
                    <p className="text-xs text-slate-500 mt-1">{feature.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      {/* End of Key Features Section */}
    </section>
  )
}