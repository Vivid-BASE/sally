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
  "/images/top/LINE_ALBUM_sally宣材_260410_8.jpg",
  "/images/top/LINE_ALBUM_sally宣材_260410_9.jpg",
  "/images/top/LINE_ALBUM_sally宣材_260410_11.jpg",
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
    }, 5000); // 5 seconds interval
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
        y: 100,
        opacity: 0,
        // Removed expensive blur filter for 'Light & Luxury' performance
      });

      // Logo Entrance Refinement
      if (logoRef.current) {
        gsap.fromTo(
          logoRef.current,
          { opacity: 0, y: 20, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 2,
            ease: "power2.out",
            delay: 0.3,
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-screen overflow-hidden bg-transparent flex items-center justify-center"
    >
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full"
        >
          <Image
            src={heroImages[currentIndex]}
            alt="Bar Sally Ambiance"
            fill
            className="object-cover object-center filter brightness-[0.6] transition-opacity duration-1000"
            priority
            quality={100}
          />
        </motion.div>
      </AnimatePresence>

      {/* Luxury Overlay - Optimized for Visibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none" />
      <div className="absolute inset-0 bg-black/25 pointer-events-none" />

      {/* Hero Content */}
      <div className="relative z-10 w-full flex flex-col items-center text-center px-6">
        
        {/* Logo - Sharp and Prestigious */}
        <div 
          ref={logoRef}
          className="relative w-[85vw] max-w-[500px] h-[140px] mb-12 overflow-hidden"
        >
          <Image 
            src="/LOGO/png/SALLY.png" 
            alt="Bar Sally Logo" 
            fill 
            className="object-contain brightness-0 invert drop-shadow-[0_0_20px_rgba(255,215,0,0.15)]" 
            priority
          />
          {/* Subtle Shine Sweep */}
          <AnimatePresence>
            <motion.div 
              key={`shine-${currentIndex}`}
              className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
              initial={{ x: "-150%" }}
              animate={{ x: "250%" }}
              transition={{ 
                duration: 3.5, 
                delay: 0.5, 
                ease: "linear" 
              }}
            >
              <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-25deg]" />
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1.5 }}
          className="mt-8 px-4"
        >
          <motion.div 
            className="font-noto-serif font-bold text-base md:text-xl lg:text-2xl text-white tracking-[0.25em] md:tracking-[0.35em] leading-loose md:leading-relaxed max-w-[1000px] mx-auto space-y-4 md:space-y-6 text-shadow-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 1.0 }}
          >
            <p>
              大和郡山から、奈良の「ええもん」を全国へ。
            </p>
            <p>
              人と未来を繋ぐ、情熱が宿る隠れ家。
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
