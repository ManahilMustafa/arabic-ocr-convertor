// components/CounterSection.jsx
import React, { useEffect, useState } from "react";

function AnimatedCounter({ target, suffix = "" }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 20);

    const counter = setInterval(() => {
      start += increment;
      if (start >= target) {
        start = target;
        clearInterval(counter);
      }
      setCount(Math.floor(start));
    }, 20);

    return () => clearInterval(counter);
  }, [target]);

  return <span>{count.toLocaleString()}{suffix}</span>;
}

export default function CounterSection() {
  return (
    <section className="relative w-full">

       {/* Background Image */}
  <div className="absolute inset-0">
    <img
      src="/ocrm.JPG"
      alt="Background"
      className="w-full h-full object-cover"
    />
    {/* red Overlay */}
    <div className="absolute inset-0 bg-[#c82949]/70"></div>
  </div>

      {/* Counters Content */}
      <div className="relative z-10 max-w-6xl mx-auto py-32 text-center text-white flex flex-col md:flex-row justify-around items-center space-y-10 md:space-y-0">
        <div>
          <h2 className="text-5xl font-bold">
            <AnimatedCounter target={10000} suffix="+" />
          </h2>
          <p className="mt-2 sm:text-md ">Pages Processed</p>
        </div>

        <div>
          <h2 className="text-5xl font-bold">
            <AnimatedCounter target={40000} suffix="+" />
          </h2>
          <p className="mt-2 sm:text-md ">Registered Users</p>
        </div>

        <div>
          <h2 className="text-5xl font-bold">
            <AnimatedCounter target={50} suffix="+" />
          </h2>
          <p className="mt-2 sm:text-md ">Free Public AI Models</p>
        </div>
      </div>
    </section>
  );
}
