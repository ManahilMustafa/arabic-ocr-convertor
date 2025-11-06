"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Upload, X, Copy, Check, FileText, Edit2, Download, Loader } from "lucide-react"
import { TextEditor } from "./text-editor"
import { TypingAnimation } from "./typing-animation"
import { generatePDF, generateDOCX } from "@/lib/export-utils"

export function ConversionSection() {
  const [images, setImages] = useState([])
  const [selectedImageId, setSelectedImageId] = useState(null)
  const [showExportOptions, setShowExportOptions] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [copied, setCopied] = useState(false)
  const [showConvertedSection, setShowConvertedSection] = useState(false)
  const fileInputRef = useRef(null)

  const selectedImage = images.find((img) => img.id === selectedImageId)

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

        setTimeout(() => {
          const mockTexts = [
            "The quick brown fox jumps over the lazy dog.\nHandwritten notes are now digital!\nEnjoy the seamless conversion experience.",
            "Important meeting notes:\n- Project deadline: Next Friday\n- Team sync at 2 PM\n- Budget review completed",
            "Shopping list:\n- Milk and eggs\n- Fresh vegetables\n- Bread and butter\n- Coffee beans",
          ]
          const randomText = mockTexts[Math.floor(Math.random() * mockTexts.length)]

          setImages((prev) =>
            prev.map((img) =>
              img.id === id
                ? { ...img, isConverting: false, text: randomText, editedText: randomText }
                : img
            )
          )
          setSelectedImageId(id)
        }, 2500)
      }
      reader.readAsDataURL(file)
    })

    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleRemoveImage = (id) => {
    setImages((prev) => prev.filter((img) => img.id !== id))
    if (selectedImageId === id) {
      setSelectedImageId(images.find((img) => img.id !== id)?.id || null)
    }
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
    <div className="flex items-center w-full max-w-2xl bg-white rounded-full border border-[#c82949] px-4 h-12 shadow-sm">

      <button
        onClick={() => fileInputRef.current?.click()}
        className="text-[#c82949] hover:opacity-70"
      >
        <Upload className="w-5 h-5" />
      </button>

      <Input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
      />

      <span className="flex-1 text-xs text-muted-foreground px-3 truncate">
        Upload images to convert...
      </span>

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
            ? "border-[#c82949] bg-[#c82949]/10 text-white"
            : "border-gray-300 bg-white hover:bg-gray-50"
        }`}
      >
        <img src={img.preview} className="w-5 h-5 rounded-full object-cover" />
        <span className="truncate max-w-[80px]">{img.file.name.substring(0, 10)}</span>

        <button
          onClick={(e) => {
            e.stopPropagation()
            handleRemoveImage(img.id)
          }}
          className="text-gray-500 hover:text-red-500"
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
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                      <Loader className="w-3.5 h-3.5 text-[#c82949] animate-spin" />
                      Converting...
                    </p>
                    <Card className="p-6 bg-muted/30 border border-[#c82949] h-40 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-6 h-6 border-2 border-[#c82949]/20 border-t-[#c82949] rounded-full animate-spin mx-auto mb-2" />
                        <p className="text-xs text-muted-foreground">OCR in progress...</p>
                      </div>
                    </Card>
                  </div>
                ) : (
                  <>
                    {selectedImage.isEditing ? (
                      <div className="space-y-2">
                        <p className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                          <Edit2 className="w-3.5 h-3.5" />
                          Edit Text
                        </p>
                        <TextEditor
                          value={selectedImage.editedText}
                          onChange={(text) => handleUpdateEditedText(selectedImage.id, text)}
                        />

                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleSaveEdit(selectedImage.id)}
                            className="flex-1 gap-2 text-xs h-9 bg-[#c82949] text-white hover:bg-muted hover:text-black"
                          >
                            <Check className="w-3.5 h-3.5" />
                            Save Changes
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleCancelEdit(selectedImage.id)}
                            className="flex-1 text-xs h-9 hover:bg-[#c82949]"
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="space-y-2">
                        
                         <Card className="p-4 bg-muted/30 border border-white/30 min-h-32 max-h-72 resize-y overflow-auto max-w-2xl mx-auto bg-white/20 ">

                            {selectedImage.text ? (
                              <TypingAnimation text={selectedImage.text} />
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
                            className="flex-1 gap-1.5 text-xs h-9 bg-white hover:bg-muted hover:text-black"
                          >
                            {copied ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-[#c82949]" />
                                Copied
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5 text-[#c82949]" />
                                Copy
                              </>
                            )}
                          </Button>

                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(selectedImage.id)}
                            className="flex-1 gap-1.5 text-xs h-9 bg-white hover:bg-muted hover:text-black"
                          >
                            <Edit2 className="w-3.5 h-3.5  text-[#c82949]" />
                            Edit
                          </Button>

                          <div className="relative">
                            <Button
                              size="sm"
                              onClick={() => setShowExportOptions(!showExportOptions)}
                              className="gap-1.5 text-xs h-9 px-3 bg-[#c82949] hover:bg-muted hover:text-black"
                            >
                              <Download className="w-3.5 h-3.5" />
                              Export
                            </Button>

                            {showExportOptions && (
                              <div className="absolute top-full right-0 mt-2 bg-background border border-border rounded-lg shadow-lg z-10 overflow-hidden min-w-40">
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
              <Card className="p-4 bg-muted/30 border border-border min-h-32 max-h-[600px] resize-y overflow-auto">
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
