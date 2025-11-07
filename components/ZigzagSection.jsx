// components/ZigzagSection.jsx
import React, { useEffect, useRef, useState } from "react";

function ZigzagItem({ heading, subheading, imgSrc, reverse }) {
  const ref = useRef();
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`flex flex-col ${reverse ? "flex-col-reverse md:flex-row-reverse" : "md:flex-row"} items-center max-w-6xl mx-auto py-8 md:py-12 px-4 md:px-0`}
    >
      {/* Text */}
      <div
        className={`w-full md:w-1/2 transition-all duration-700 ${
          inView
            ? "opacity-100 translate-x-0"
            : reverse
            ? "opacity-0 translate-x-6 md:translate-x-12"
            : "opacity-0 -translate-x-6 md:-translate-x-12"
        } mb-6 md:mb-0 md:pr-6 md:pl-6`}
      >
        <h2 className="text-2xl sm:text-3xl lg:text-3xl font-bold mb-4 text-gray-900">{heading}</h2>
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{subheading}</p>
      </div>

      {/* Image */}
      <div
        className={`w-full md:w-1/2 transition-all duration-700 ${
          inView
            ? "opacity-100 translate-x-0"
            : reverse
            ? "opacity-0 -translate-x-6 md:-translate-x-12"
            : "opacity-0 translate-x-6 md:translate-x-12"
        }`}
      >
        <img src={imgSrc} alt={heading} className="rounded-lg w-full h-auto object-cover" />
      </div>
    </div>
  );
}

export function ZigzagSection() {
  const sections = [
    {
      heading: "How Arabic OCR Works",
      subheading:
        "Arabic OCR (Optical Character Recognition) uses advanced AI technology to read, understand, and convert handwritten or printed Arabic text into digital, editable content. Transkribus can be trained on historical manuscripts, modern handwritten notes, and scanned documents, making it highly accurate for different writing styles. The Universal Arabic model has been trained on millions of words from various Arabic scripts, allowing it to recognize different calligraphic styles, handwriting patterns, and complex letter shapes with impressive accuracy.",
      imgSrc: "/editor.jpg",
    },
    {
      heading: "Understanding Arabic Handwriting",
      subheading:
        "Arabic handwriting comes in many styles—such as Naskh, Ruq'ah, Diwani, and Thuluth—each with unique shapes and stroke patterns. Unlike English, Arabic letters change form depending on their position in a word and are written right-to-left, with added diacritics for pronunciation. Because of these complexities, Arabic OCR systems must be highly intelligent to accurately read and convert handwritten text. With Transkribus, both historical manuscripts and modern handwritten Arabic notes can be digitized efficiently—preserving accuracy, style, and making the text fully searchable and editable.",
      imgSrc: "/editor.jpg",
    },
  ];

  return (
    <div className="space-y-12 md:space-y-20 bg-[#f9f9fa]">
      {sections.map((item, index) => (
        <ZigzagItem
          key={index}
          heading={item.heading}
          subheading={item.subheading}
          imgSrc={item.imgSrc}
          reverse={index % 2 !== 0}
        />
      ))}
    </div>
  );
}
