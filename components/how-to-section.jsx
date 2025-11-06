"use client"

import { Card } from "@/components/ui/card"
import { Upload, Zap, PenTool, Download } from "lucide-react"
import { useEffect, useState, useRef } from "react"

const steps = [
  { title: "Upload Your Notes", description: "Take a photo or select images of your handwritten notes. Multiple uploads supported!", icon: Upload },
  { title: "AI Converts to Text", description: "Our advanced OCR technology instantly recognizes your handwriting and converts it to digital text.", icon: Zap },
  { title: "Review & Edit", description: "Watch the typing animation as text appears. Edit any corrections right in the editor.", icon: PenTool },
  { title: "Export & Share", description: "Download as PDF, Word document, or copy to clipboard. Organize your knowledge instantly!", icon: Download },
]

const features = [
  {
    title: "Key Features",
    icon: Zap,
    color: "#8b3dff",
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
    color: "#8b3dff",
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
    <section className="w-full bg-background">
      <div className="max-w-6xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-2">How It Works</h2>
          <p className="text-sm text-muted-foreground">Four simple steps to transform your handwritten notes</p>
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
                <Card className="p-6 h-full flex flex-col shadow-none hover:shadow-md hover:border-[#8b3dff]/30 transition-all duration-500">
                  <div className="p-2.5 rounded-lg bg-[#8b3dff]/10 w-fit mb-4">
                    <IconComponent className="w-5 h-5 text-[#8b3dff]" />
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#8b3dff]/20 text-[#8b3dff] text-xs font-bold">
                      {index + 1}
                    </span>
                    <h3 className="font-semibold text-sm">{step.title}</h3>
                  </div>
                  <p className="text-muted-foreground text-xs leading-relaxed flex-1">{step.description}</p>
                </Card>
              </div>
            )
          })}
        </div>

    {/* Features Grid */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
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
        <Card
          className={`p-6 shadow-none transition-all duration-500 bg-gradient-to-br from-secondary/5 to-[#8b3dff]/5 border-secondary/20`}
        >
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <IconComponent className="w-5 h-5" style={{ color: feature.color }} />
            {feature.title}
          </h3>
          <ul className="space-y-2">
            {feature.items.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-xs">
                <div
                  className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                  style={{ backgroundColor: feature.color }}
                />
                <span className="text-foreground leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    )
  })}
</div>

      </div>
    </section>
  )
}
