"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

export function TextEditor({ value, onChange }) {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      className={cn(
        "w-full h-32 p-4 rounded-lg border-2 bg-background/50 resize-none font-medium",
        "transition-all outline-none focus:ring-2 focus:ring-offset-2",
        isFocused ? "border-[#1177E5] focus:ring-[#1177E5]/50" : "border-border"
      )}
      placeholder="Edit your converted text here..."
    />
  )
}
