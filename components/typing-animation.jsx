"use client"

import { useState, useEffect } from "react"

export function TypingAnimation({ text, speed = 20 }) {
  const [displayedText, setDisplayedText] = useState("")

  useEffect(() => {
    setDisplayedText("")
    let index = 0

    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText((prev) => prev + text[index])
        index++
      } else {
        clearInterval(interval)
      }
    }, speed)

    return () => clearInterval(interval)
  }, [text, speed])

  return (
    <div className="whitespace-pre-wrap text-foreground font-medium leading-relaxed">
      {displayedText}
      {displayedText !== text && (
        <span className="ml-1 inline-block w-2 h-6 bg-[#8b3dff] animate-pulse" />
      )}
    </div>
  )
}
