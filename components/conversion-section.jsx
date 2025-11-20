"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Upload, X, Copy, Check, FileText, Edit2, Download, Loader } from "lucide-react"
import { TextEditor } from "./text-editor"
import { TypingAnimation } from "./typing-animation"
import { generatePDF, generateDOCX } from "@/lib/export-utils"
import { extractArabicText } from "@/api/ocr"

export function ConversionSection() {
  const [images, setImages] = useState([])
  const [selectedImageId, setSelectedImageId] = useState(null)
  const [showExportOptions, setShowExportOptions] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [copied, setCopied] = useState(false)
  const [showConvertedSection, setShowConvertedSection] = useState(false)
  const fileInputRef = useRef(null)

  const selectedImage = images.find((img) => img.id === selectedImageId)

  const processImageWithAPI = async (imageId, file) => {
    try {
      const extractedText = await extractArabicText(file)
      const finalText = extractedText?.trim()
        ? extractedText
        : "No Arabic text detected. Try another image."
      setImages((prev) =>
        prev.map((img) =>
          img.id === imageId
            ? { ...img, isConverting: false, text: finalText, editedText: finalText }
            : img
        )
      )
      setSelectedImageId(imageId)
    } catch (error) {
      console.error("OCR error:", error)
      setImages((prev) =>
        prev.map((img) =>
          img.id === imageId
            ? {
                ...img,
                isConverting: false,
                text: "Unable to process image. Please try again.",
                editedText: "Unable to process image. Please try again.",
              }
            : img
        )
      )
    }
  }

  const handleFileUpload = (e) => {
    const files = e.target.files
    if (!files) return

    setShowConvertedSection(true)

    Array.from(files).forEach((file) => {
      if (!file.type.startsWith("image/")) return

      const reader = new FileReader()
      reader.onload = (event) => {
        const id = Date.now() + Math.random().toString()
        const preview = event.target?.result

        const newImage = {
          id,
          file,
          preview,
          isConverting: true,
          text: "",
          isEditing: false,
          editedText: "",
        }

        setImages((prev) => [...prev, newImage])
        processImageWithAPI(id, file)
      }
      reader.readAsDataURL(file)
    })

    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleRemoveImage = (id) => {
    setImages((prev) => {
      const updatedImages = prev.filter((img) => img.id !== id)

      if (updatedImages.length === 0) {
        setShowConvertedSection(false)
        setSelectedImageId(null)
      } else if (selectedImageId === id) {
        setSelectedImageId(updatedImages[0]?.id ?? null)
      }

      return updatedImages
    })
  }

  const handleEdit = (id) => {
    setImages((prev) =>
      prev.map((img) => (img.id === id ? { ...img, isEditing: true } : img))
    )
  }

  const handleCancelEdit = (id) => {
    setImages((prev) =>
      prev.map((img) =>
        img.id === id ? { ...img, isEditing: false, editedText: img.text } : img
      )
    )
  }

  const handleUpdateEditedText = (id, text) => {
    setImages((prev) =>
      prev.map((img) => (img.id === id ? { ...img, editedText: text } : img))
    )
  }

  const handleSaveEdit = (id) => {
    setImages((prev) =>
      prev.map((img) =>
        img.id === id ? { ...img, text: img.editedText, isEditing: false } : img
      )
    )
  }

  const handleCopyText = () => {
    if (selectedImage) {
      navigator.clipboard.writeText(selectedImage.text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleExport = async (format) => {
    if (!selectedImage) return
    setIsExporting(true)

    try {
      if (format === "pdf") {
        generatePDF(selectedImage.text, "converted-notes")
      } else {
        generateDOCX(selectedImage.text, "converted-notes")
      }
      setShowExportOptions(false)
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <section id="conversion" className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-transparent">
      <div className="max-w-7xl mx-auto">


        {/* ✅ UPLOAD FULL WIDTH */}
        <div className="w-full mb-6">
      
<div className="w-full mb-6">
  <div className="flex items-center justify-center">
    <div className="flex items-center w-full max-w-2xl bg-white rounded-full border border-[#B8ECFF] px-4 h-12  justify-between">

      {/* Hidden File Input */}
      <Input
        ref={fileInputRef}
        type=
        
        
        "file"
        multiple
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Left Placeholder Text */}
      <span className="flex-1 text-xs text-muted-foreground px-3 truncate">
        Upload images to convert...
      </span>

      {/* ✅ Right Side Upload Button */}
      <button
        onClick={() => fileInputRef.current?.click()}
        className="flex items-center gap-1 bg-linear-to-r from-[#0c98ff] to-[#0cd7b2]  text-white text-xs font-medium px-4 py-2 rounded-full hover:opacity-90 transition"
      >
        <Upload className="w-4 h-4" />
        Upload
      </button>

    </div>
  </div>
</div>



         {/* ✅ Uploaded Images RIGHT ABOVE Upload bar like GPT */}
{images.length > 0 && (
  <div className="flex flex-wrap gap-2 justify-center mb-3 max-w-2xl mx-auto">
    {images.map((img) => (
      <div
        key={img.id}
        onClick={() => setSelectedImageId(img.id)}
        className={`flex items-center gap-2 px-3 py-1.5 border rounded-full text-xs cursor-pointer transition ${
          selectedImageId === img.id
            ? "border-[#1177E5] bg-[#1177E5]/10 text-black"
            : "border-gray-300 bg-black hover:bg-gray-50"
        }`}
      >
        <img src={img.preview} className="w-5 h-5 rounded-full object-cover" />
        <span className="truncate max-w-[80px]">{img.file.name.substring(0, 10)}</span>

        <button
          onClick={(e) => {
            e.stopPropagation()
            handleRemoveImage(img.id)
          }}
          className="text-gray-500 hover:text-[#1177E5]"
        >
          <X className="w-3 h-3" />
        </button>
      </div>
    ))}
  </div>
)}

        </div>

        {/* ✅ CONVERTED TEXT BELOW UPLOAD */}
        {showConvertedSection && (
          <div className="w-full">
            {selectedImage ? (
              <div className="space-y-4">
                {selectedImage.isConverting ? (
                  <div className="space-y-2 max-w-2xl mx-auto">
                    <p className="text-xs font-medium text-black flex items-center gap-1.5">
                      <Loader className="w-3.5 h-3.5 text-[#1177E5] animate-spin" />
                      Converting...
                    </p>
                    <Card className="p-6 bg-muted/30 border border-[#1177E5] h-40 flex items-center justify-center max-w-2xl mx-auto">
                      <div className="text-center">
                        <div className="w-6 h-6 border-2 border-[#1177E5]/20 border-t-[#1177E5] rounded-full animate-spin mx-auto mb-2" />
                        <p className="text-xs text-black">OCR in progress...</p>
                      </div>
                    </Card>
                  </div>
                ) : (
                  <>
                    {selectedImage.isEditing ? (
                      <div className="space-y-2">
                        <p className="text-xs font-medium text-muted-black flex items-center gap-1.5">
                          <Edit2 className="w-3.5 h-3.5" />
                          Edit Text
                        </p>
                        <TextEditor
                          value={selectedImage.editedText ?? ""}
                          onChange={(text) => handleUpdateEditedText(selectedImage.id, text)}
                        />

                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleSaveEdit(selectedImage.id)}
                            className="flex-1 gap-2 text-xs h-9 bg-[#1177E5] text-white hover:bg-muted hover:text-black"
                          >
                            <Check className="w-3.5 h-3.5" />
                            Save Changes
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleCancelEdit(selectedImage.id)}
                            className="flex-1 text-xs h-9 hover:bg-[#1177E5]"
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="space-y-2">
                        
                         <Card className="p-4 border border-white/30 min-h-32 max-h-72 resize-y overflow-auto max-w-2xl mx-auto bg-white shadow-none ">

                            {selectedImage.text ? (
                              <TypingAnimation text={selectedImage.text ?? ""} />
                            ) : (
                              <p className="text-xs text-muted-foreground">
                                No image selected — converted text will appear here.
                              </p>
                            )}
                          </Card>
                        </div>

                       <div className="flex gap-2 pt-2 max-w-2xl mx-auto">

                          <Button
                            size="sm"
                            variant="outline"
                            onClick={handleCopyText}
                            className="flex-1 gap-1.5 text-xs h-9 bg-white hover:bg-muted hover:text-black shadow-none"
                          >
                            {copied ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-[#1177E5]" />
                                Copied
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5 text-[#1177E5]" />
                                Copy
                              </>
                            )}
                          </Button>

                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(selectedImage.id)}
                            className="flex-1 gap-1.5 text-xs h-9 bg-white hover:bg-muted hover:text-black shadow-none"
                          >
                            <Edit2 className="w-3.5 h-3.5  text-[#1177E5]" />
                            Edit
                          </Button>

                          <div className="relative">
                            <Button
                              size="sm"
                              onClick={() => setShowExportOptions(!showExportOptions)}
                              className="gap-1.5 text-xs h-9 px-3 bg-[#1177E5] hover:bg-muted hover:text-black"
                            >
                              <Download className="w-3.5 h-3.5" />
                              Export
                            </Button>

                            {showExportOptions && (
                              <div className="absolute top-full right-0 mt-2 bg-background border border-border rounded-lg  z-10 overflow-hidden min-w-40">
                                <button
                                  onClick={() => handleExport("pdf")}
                                  disabled={isExporting}
                                  className="w-full px-4 py-2 text-left text-xs hover:bg-muted flex items-center gap-2 disabled:opacity-50"
                                >
                                  <FileText className="w-3.5 h-3.5" />
                                  Export as PDF
                                </button>
                                <button
                                  onClick={() => handleExport("docx")}
                                  disabled={isExporting}
                                  className="w-full px-4 py-2 text-left text-xs hover:bg-muted flex items-center gap-2 disabled:opacity-50 border-t border-border"
                                >
                                  <FileText className="w-3.5 h-3.5" />
                                  Export as DOCX
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>
            ) : (
              <Card className="p-4 bg-muted/30 border border-border min-h-32 max-h-[600px] resize-y overflow-auto max-w-2xl mx-auto">
                <p className="text-xs text-muted-foreground">
                  Upload started — conversion in progress...
                </p>
              </Card>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
