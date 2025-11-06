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
      className={`flex flex-col ${reverse ? "flex-col-reverse md:flex-row-reverse" : "md:flex-row"} items-center max-w-6xl mx-auto py-12`}
    >
      <div
        className={`md:w-1/2 transition-all duration-700 ${
          inView
            ? "opacity-100 translate-x-0"
            : reverse
            ? "opacity-0 translate-x-12"
            : "opacity-0 -translate-x-12"
        } md:pr-8 md:pl-8`}
      >
        <h2 className="text-3xl font-bold mb-4">{heading}</h2>
        <p className="text-gray-500 sm:text-md ">{subheading}</p>
      </div>
      <div
        className={`md:w-1/2 mt-6 md:mt-0 transition-all duration-700 ${
          inView
            ? "opacity-100 translate-x-0"
            : reverse
            ? "opacity-0 -translate-x-12"
            : "opacity-0 translate-x-12"
        }`}
      >
        <img src={imgSrc} alt={heading} className="rounded-lg  mx-auto md:mx-0" />
      </div>
    </div>
  );
}

export function ZigzagSection() {
  const sections = [
  {
    heading: "How Arabic OCR Works",
    subheading:
      "Arabic OCR (Optical Character Recognition) uses advanced AI models to recognize and digitize Arabic handwritten and printed text. Transkribus can be trained on historical Arabic manuscripts, modern handwritten notes, or scanned documents to accurately convert them into editable text. The 'Universal Arabic' model, for example, has been trained on millions of words from diverse Arabic scripts, enabling it to read different calligraphy styles and handwriting nuances.",
    imgSrc: "/editor.jpg",
  },
  {
    heading: "Understanding Arabic Handwriting",
    subheading:
      "Arabic handwriting varies greatly in style, including Naskh, Ruq'ah, Diwani, and Thuluth scripts. OCR systems for Arabic need to account for connected letters, diacritics, and right-to-left text flow. With Transkribus, historical manuscripts and modern Arabic texts can be digitized efficiently, preserving the text's accuracy and style while making it searchable and editable.",
    imgSrc: "/editor.jpg",
  },

  ];

  return (
    <div className="space-y-20 bg-gray-50">
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
