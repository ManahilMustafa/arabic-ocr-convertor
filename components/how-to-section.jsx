"use client"

import { Upload, Zap, PenTool, Download } from "lucide-react"
import { useEffect, useState, useRef } from "react"

const steps = [
  {
    title: "Upload Your Notes",
    description:
      "Take a photo or select images of your handwritten notes. Multiple uploads supported!",
    icon: Upload,
    image: "/upload.jpg",
  },
  {
    title: "AI Converts to Text",
    description:
      "Our advanced OCR technology instantly recognizes your handwriting and converts it to digital text.",
    icon: Zap,
    image: "/ai.jpg",
  },
  {
    title: "Review & Edit",
    description:
      "Watch the typing animation as text appears. Edit any corrections right in the editor.",
    icon: PenTool,
    image: "/edit.jpg",
  },
  {
    title: "Export & Share",
    description:
      "Download as PDF, Word document, or copy to clipboard. Organize your knowledge instantly!",
    icon: Download,
    image: "/export.JPG",
  },
]

const features = [
  {
    title: "Key Features",
    icon: Zap,
    color: "#c82949",
    image: "/k.JPG",
    items: [
      "Batch upload multiple notes",
      "Real-time OCR conversion",
      "Beautiful typing animation",
      "Full text editing capability",
      "Export to PDF & DOCX",
      "Copy to clipboard instantly",
    ],
  },
  {
    title: "Perfect For",
    icon: PenTool,
    color: "#c82949",
    image: "/per.JPG",
    items: [
      "Students organizing notes",
      "Professionals digitizing meetings",
      "Researchers archiving fieldwork",
      "Teams sharing handwritten ideas",
      "Personal note backup",
      "Document organization",
    ],
  },
]

export function HowToSection() {
  const [visibleElements, setVisibleElements] = useState([...steps.map(() => false), ...features.map(() => false)])
  const elementRefs = useRef([])

  const renderBadge = (index) => (
    <div className="flex items-center gap-2 text-xs font-semibold text-[#c82949]">
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/70 text-[#c82949] shadow-sm">
        {index + 1}
      </span>
      <span className="uppercase tracking-[0.2em] text-[10px] text-gray-500">Step</span>
    </div>
  )

  // Intersection Observer to trigger animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = elementRefs.current.indexOf(entry.target)
            if (index !== -1) {
              setVisibleElements((prev) => {
                const updated = [...prev]
                updated[index] = true
                return updated
              })
            }
          }
        })
      },
      { threshold: 0.2 }
    )

    elementRefs.current.forEach((ref) => ref && observer.observe(ref))
    return () => observer.disconnect()
  }, [])

  return (
    <section className="w-full bg-white">
      <div className="max-w-6xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-2">How It Works</h2>
          <p className="text-sm sm:text-base text-muted-foreground">Four simple steps to transform your handwritten notes</p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {steps.map((step, index) => {
            const IconComponent = step.icon
            return (
              <div
                key={index}
                ref={(el) => (elementRefs.current[index] = el)}
                className={`transform transition-all duration-700 ${
                  visibleElements[index] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${index * 0.15}s` }}
              >
                <div className="group relative h-full rounded-[32px] bg-white/90 shadow-lg ring-1 ring-black/5 overflow-hidden transition-all duration-500 hover:-translate-y-1">
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      backgroundImage: `url(${step.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                  <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/30 to-black/90 opacity-0 group-hover:opacity-90 transition-opacity duration-500" />
                  <div className="relative z-10 h-full flex flex-col">
                    <div className="relative p-6 pb-0">
                      <div className="mb-6 overflow-hidden rounded-[24px]">
                        <img
                          src={step.image}
                          alt={step.title}
                          className="h-48 w-full object-cover transition-all duration-500 group-hover:opacity-0"
                        />
                      </div>
                    </div>
                    <div className="relative z-10 flex flex-1 flex-col px-6 pb-6 pt-4 transition-all duration-500 group-hover:text-white group-hover:translate-y-1">
                      <div className="flex items-center justify-between mb-3">
                        {renderBadge(index)}
                        <span className="rounded-full bg-[#c82949]/10 px-3 py-1 text-[11px] text-[#c82949] group-hover:bg-white/20 group-hover:text-white">
                          <IconComponent className="mr-1 inline-block h-3.5 w-3.5" />
                          Action
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold">{step.title}</h3>
                      <p className="text-sm text-muted-foreground group-hover:text-white/80 transition-colors duration-500">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

    {/* Features Grid */}
<div className="relative mb-20 w-full">
  <div className="absolute inset-0">
    <img
      src="/background.png"
      alt="Features background"
      className="h-full w-full object-cover"
    />
    <div className="absolute inset-0 bg-black/70" />
  </div>
  <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 px-4 sm:px-8 lg:px-20 py-16">
    {features.map((feature, index) => {
  const IconComponent = feature.icon
  const refIndex = steps.length + index // offset index for features
  return (
    <div
      key={index}
      ref={(el) => (elementRefs.current[refIndex] = el)}
      className={`transform transition-all duration-700 ${
        visibleElements[refIndex] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{ transitionDelay: `${index * 0.15 + 0.3}s` }}
    >
        <div className="group relative h-full overflow-hidden rounded-[32px] bg-linear-to-br from-white via-white to-[#c82949]/10 shadow-lg ring-1 ring-white/40 transition-all duration-500 hover:-translate-y-1">
          <div
            className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              backgroundImage: `url(${feature.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/20 via-black/60 to-black/90 opacity-0 transition-opacity duration-500 group-hover:opacity-90" />
          <div className="relative z-10 h-full p-6 flex flex-col justify-between transition-colors duration-500 group-hover:text-white">
            <div>
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <IconComponent className="w-5 h-5" style={{ color: feature.color }} />
                {feature.title}
              </h3>
              <ul className="space-y-3 text-sm text-muted-foreground group-hover:text-white/80">
                {feature.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div
                      className="mt-2 h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: feature.color }}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6 text-xs uppercase tracking-[0.3em] text-[#c82949] group-hover:text-white/70">
              Premium Experience
            </div>
          </div>
        </div>
      </div>
    )
  })}
  </div>
</div>

    </section>
  )
}
