// components/CounterSection.jsx
import React, { useEffect, useRef, useState } from "react";

function AnimatedCounter({ target, suffix = "", duration = 2000, trigger = 0 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (trigger === 0) return;

    setCount(0);
    let start = 0;
    const stepTime = 20; // update every 20ms
    const totalSteps = duration / stepTime;
    const increment = target / totalSteps;

    const counter = setInterval(() => {
      start += increment;
      if (start >= target) {
        start = target;
        clearInterval(counter);
      }
      setCount(Math.floor(start));
    }, stepTime);

    return () => clearInterval(counter);
  }, [target, duration, trigger]);

  return <span>{count.toLocaleString()}{suffix}</span>;
}

export default function CounterSection() {
  const sectionRef = useRef(null);
  const [trigger, setTrigger] = useState(0);

  const counters = [
    { target: 10000, label: "Pages Processed", suffix: "+" },
    { target: 40000, label: "Registered Users", suffix: "+" },
    { target: 50, label: "Free Public AI Models", suffix: "+" },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTrigger((prev) => prev + 1);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="/Frame.png"
          alt="Background"
          className="w-full h-full object-cover"
        />
      
      </div>

      {/* Counter Content */}
      <div className="relative z-10 max-w-6xl mx-auto py-24 sm:py-32 px-4 flex flex-col sm:flex-row justify-between items-center gap-10 sm:gap-0">
        {counters.map((item, idx) => (
          <div
            key={idx}
            className="text-center sm:text-left flex-1"
          >
            <h2 className="text-4xl sm:text-5xl md:text-5xl font-bold text-white">
              <AnimatedCounter target={item.target} suffix={item.suffix} trigger={trigger} />
            </h2>
            <p className="mt-2 text-sm sm:text-base text-white/90">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
