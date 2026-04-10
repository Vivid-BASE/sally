"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const heroImages = [
  "/images/top/LINE_ALBUM_sally宣材_260410_5.jpg",
  "/images/top/LINE_ALBUM_sally宣材_260410_12.jpg",
  "/images/top/LINE_ALBUM_sally宣材_260410_15.jpg",
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Cinematic Crossfade Interval
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 6000); // 6 seconds per slide
    return () => clearInterval(timer);
  }, []);

  // GSAP Parallax & Fade on Scroll
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Scale down and fade out hero on scroll
      gsap.to(containerRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        y: 100,
        opacity: 0.2, // Keep slightly visible for depth
        filter: "blur(10px)",
      });
      
      // Floating text effect
      gsap.fromTo(
        ".hero-text-content",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
          ease: "power4.out",
          delay: 0.5,
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-screen overflow-hidden bg-black"
    >
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full"
        >
          <Image
            src={heroImages[currentIndex]}
            alt="Bar Sally Ambiance"
            fill
            className="object-cover object-center filter brightness-[0.4]"
            priority
            quality={90}
          />
        </motion.div>
      </AnimatePresence>

      {/* Persistent Vignette Overlay for Luxury feel */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent to-[#0f0f0f] opacity-80 pointer-events-none" />

      {/* Hero Content */}
      <div className="relative z-10 w-full h-full flex flex-col justify-center items-center text-center px-6 hero-text-content">
        
        <div className="relative w-[80vw] max-w-[500px] h-[150px] mb-8">
          <Image 
            src="/LOGO/png/Bar%20Sally.png" 
            alt="Bar Sally Logo" 
            fill 
            className="object-contain" 
            priority
          />
        </div>

        <motion.h1 
          className="font-cinzel text-xl md:text-3xl tracking-[0.4em] text-[var(--color-accent-main)] uppercase mb-6"
          initial={{ letterSpacing: "0.1em", opacity: 0 }}
          animate={{ letterSpacing: "0.4em", opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut", delay: 1 }}
        >
          Timeless Elegance
        </motion.h1>

        <motion.p 
          className="font-shippori text-sm md:text-lg text-gray-300 tracking-widest leading-loose max-w-[600px]"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 1.5 }}
        >
          大和郡山で紡ぐ、大人の隠れ家。<br />
          静寂のなかで、極上の一杯を。
        </motion.p>

      </div>

      {/* Scroll Down Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-4 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 3, duration: 1 }}
      >
        <span className="font-cinzel text-xs tracking-widest uppercase">Scroll</span>
        <motion.div 
          className="w-[1px] h-[60px] bg-gradient-to-b from-white to-transparent"
          animate={{ 
            scaleY: [0, 1, 0], 
            transformOrigin: ["top", "top", "bottom"] 
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
      </motion.div>
    </section>
  );
}
