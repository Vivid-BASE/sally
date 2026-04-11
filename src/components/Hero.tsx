"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const heroImages = [
  "/images/top/LINE_ALBUM_sally宣材_260410_5.jpg",
  "/images/top/LINE_ALBUM_sally宣材_260410_12.jpg",
  "/images/top/LINE_ALBUM_sally宣材_260410_15.jpg",
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  // Cinematic Crossfade Interval
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 8000); // Slower interval for more elegance
    return () => clearInterval(timer);
  }, []);

  // GSAP Refinements
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
        y: 150,
        opacity: 0,
        filter: "blur(20px)",
      });

      // Logo Sweep Effect
      if (logoRef.current) {
        gsap.fromTo(
          logoRef.current,
          { opacity: 0, y: 30, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 2.5,
            ease: "expo.out",
            delay: 0.8,
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center"
    >
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.15 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 3, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 w-full h-full"
        >
          <Image
            src={heroImages[currentIndex]}
            alt="Bar Sally Ambiance"
            fill
            className="object-cover object-center filter brightness-[0.35]"
            priority
            quality={100}
          />
        </motion.div>
      </AnimatePresence>

      {/* Luxury Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black pointer-events-none" />
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />

      {/* Hero Content */}
      <div className="relative z-10 w-full flex flex-col items-center text-center px-6">
        
        {/* Logo with slight shine/sweep effect */}
        <div 
          ref={logoRef}
          className="relative w-[70vw] max-w-[420px] h-[120px] mb-12"
        >
          <Image 
            src="/LOGO/png/SALLY.png" 
            alt="Bar Sally Logo" 
            fill 
            className="object-contain brightness-0 invert" 
            priority
          />
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-20deg] w-1/2 h-full"
            initial={{ left: "-100%" }}
            animate={{ left: "200%" }}
            transition={{ duration: 3, delay: 2.5, ease: "easeInOut", repeat: Infinity, repeatDelay: 10 }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 2 }}
        >
          <motion.h1 
            className="font-cinzel text-lg md:text-2xl tracking-[0.6em] text-[var(--color-accent-main)] uppercase mb-8"
            initial={{ opacity: 0, letterSpacing: "0.2em" }}
            animate={{ opacity: 1, letterSpacing: "0.6em" }}
            transition={{ duration: 3, ease: "circOut", delay: 1.2 }}
          >
            Timeless Elegance
          </motion.h1>

          <motion.div 
            className="font-shippori text-sm md:text-base text-gray-300 tracking-[0.25em] leading-relaxed max-w-[600px] space-y-4"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2, ease: "easeOut", delay: 2 }}
          >
            <p className="overflow-hidden">
               <span className="block italic">大和郡山で紡ぐ、大人の隠れ家。</span>
            </p>
            <p>
               静寂のなかで、極上の一杯を。
            </p>
          </motion.div>
        </motion.div>

      </div>

      {/* Scroll Down Indicator */}
      <motion.div 
        className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-6 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 4, duration: 1.5 }}
      >
        <span className="font-cinzel text-[10px] tracking-[0.5em] uppercase text-gray-400">Scroll</span>
        <div className="relative w-[1px] h-[80px] bg-white/10 overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 w-full h-[40px] bg-gradient-to-b from-transparent via-[var(--color-accent-main)] to-transparent"
            animate={{ top: ["-100%", "200%"] }}
            transition={{ 
              duration: 2.5, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />
        </div>
      </motion.div>
    </section>
  );
}
