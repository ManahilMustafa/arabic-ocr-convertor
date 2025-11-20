import Image from "next/image"
import { Star } from "lucide-react"
import reviewImg from "@/public/woman.png"
import aiExportImg from "@/public/pricing.png"

const perfectForItems = [
  "Students organizing notes",
  "Professionals digitizing meetings",
  "Researchers archiving fieldwork",
  "Teams sharing handwritten ideas",
  "Personal note backup",
  "Document organization",
]

export function ZigzagSection() {
  return (
    <section className="relative w-full py-20 overflow-hidden bg-white">
      <div className="absolute inset-0 " />
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Perfect For */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
           
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Perfect For</h2>
            <p className="text-slate-500 text-sm sm:text-base mt-3 max-w-lg">
              Highlight the people who benefit most from your Arabic OCR workflow.
            </p>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {perfectForItems.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <Star className="mt-1 h-4 w-4 text-[#1177E5] fill-[#1177E5] shrink-0" />
                  <span className="text-slate-700 text-sm sm:text-base">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative flex justify-center">
         
            <div className="relative rounded-[32px] p-4">
              <Image src={reviewImg} alt="Happy customer" />
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl sm:text-4xl font-bold text-slate-900">
              Boost your productivity with advanced Arabic OCR performance.
            </h3>
            <p className="text-slate-500 text-sm sm:text-base mt-5">
              Ideal for students, researchers, and small teams. Process images, PDFs, and documents instantly with
              reliable OCR accuracy tailored specifically to Arabic scripts.
            </p>
          </div>
          <div className="relative flex justify-center lg:justify-end">
           
            <div className="relative overflow-hidden">
              <Image src={aiExportImg} alt="Arabic OCR dashboard preview" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
