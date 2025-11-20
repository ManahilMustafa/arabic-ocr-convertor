"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Zap, BookOpen, Download, ArrowRight } from "lucide-react"
import { ConversionSection } from "./conversion-section"

if (typeof window !== "undefined" && !gsap.core.globals().ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger)
}

export function HeroSection() {
  const heroRef = useRef(null)
  const badgeRef = useRef(null)
  const headingRef = useRef(null)
  const descriptionRef = useRef(null)
  const cardRefs = useRef([])
  const conversionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-nav", {
        y: -20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      })

      gsap.from([badgeRef.current, headingRef.current, descriptionRef.current], {
        opacity: 0,
        y: 30,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.15,
        delay: 0.2,
      })

      gsap.from(cardRefs.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.12,
        delay: 0.5,
      })

      if (conversionRef.current) {
        gsap.from(conversionRef.current, {
          opacity: 0,
          y: 60,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: conversionRef.current,
            start: "top 85%",
          },
        })
      }
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={heroRef} className="relative w-full min-h-screen overflow-hidden ">
      <div className="absolute inset-0">
        <div className="absolute inset-0 " />
        <div className="absolute inset-0 bg-[url('/Header.png')] bg-cover bg-center " />
      </div>

      <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 lg:pt-6">
        {/* Navigation */}
        <div className="hero-nav flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="logo" className="h-10 w-auto" />
            <div className="hidden sm:flex flex-col leading-tight text-slate-700">
             
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#how-it-works" className="hover:text-[#0c7fd7] transition-colors">
              How it works
            </a>
            <a href="#features" className="hover:text-[#0c7fd7] transition-colors">
              Features
            </a>
            <a href="#pricing" className="hover:text-[#0c7fd7] transition-colors">
              Pricing
            </a>
          </nav>

          <button className="inline-flex items-center gap-2 rounded-full bg-[#2584F4] px-6 py-2 text-white text-sm font-semibold ">
            Login
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Hero copy */}
        <div className="mt-12 text-center">
          <div
            ref={badgeRef}
            className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-[#0c98ff] to-[#0cd7b2] px-5 py-2 text-xs font-semibold text-white "
          >
            <Zap className="w-4 h-4" />
            AI-Powered Note Conversion
          </div>

          <h1
            ref={headingRef}
            className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900"
          >
            Transform <span className="text-transparent bg-clip-text bg-linear-to-r from-[#0c7fd7] to-[#00cfc8]">Handwritten</span>
            <br />
            Arabic Notes to <span className="text-transparent bg-clip-text bg-linear-to-r from-[#00cfc8] to-[#0a8bff]">Digital</span>
          </h1>

          <p
            ref={descriptionRef}
            className="mt-4 text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed"
          >
            Upload your handwritten notes, instantly convert them to editable text, and export as PDF or Word documents
            with beautiful formatting.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 text-slate-700 text-sm font-medium">
            <div
              ref={(el) => (cardRefs.current[0] = el)}
              className="flex w-full max-w-[200px] flex-col items-center rounded-2xl bg-white/80 border border-white/60 px-5 py-4 "
            >
              <div className="mb-2 flex h-8 w-8 items-center justify-center text-[#1177E5]">
                <BookOpen className="w-5 h-5" />
              </div>
              <p className="text-sm font-semibold">Upload & Convert</p>
            </div>
            <div
              ref={(el) => (cardRefs.current[1] = el)}
              className="flex w-full max-w-[200px] flex-col items-center rounded-2xl bg-white/80 border border-white/60 px-5 py-4"
            >
              <div className="mb-2 flex h-8 w-8 items-center justify-center text-[#1177E5]">
                <Zap className="w-5 h-5" />
              </div>
              <p className="text-sm font-semibold">AI Processing</p>
            </div>
            <div
              ref={(el) => (cardRefs.current[2] = el)}
              className="flex w-full max-w-[200px] flex-col items-center rounded-2xl bg-white/80 border border-white/60 px-5 py-4"
            >
              <div className="mb-2 flex h-8 w-8 items-center justify-center text-[#1177E5]">
                <Download className="w-5 h-5" />
              </div>
              <p className="text-sm font-semibold">Export Instantly</p>
            </div>
          </div>
        </div>
      </div>

      {/* Conversion section */}
      <div ref={conversionRef} className="relative z-20 w-full mt-1">
        <ConversionSection />
      </div>
    </section>
  )
}