"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function AestheticBackground() {
  const { scrollYProgress } = useScroll();
  const yDrift = useTransform(scrollYProgress, [0, 1], [0, -150]);

  return (
    <div className="fixed inset-0 w-full h-full -z-50 pointer-events-none overflow-hidden bg-[#020202]">
      {/* 1. Lustrous Base - High Contrast Mesh-like Gradient */}
      {/* No Blur Filters Used. Pure CSS Gradient Performance. */}
      <div 
        className="absolute inset-0 w-full h-full opacity-40 mix-blend-screen"
        style={{
          background: `
            radial-gradient(at 0% 0%, rgba(212, 175, 55, 0.15) 0%, transparent 50%),
            radial-gradient(at 100% 0%, rgba(0, 255, 127, 0.08) 0%, transparent 40%),
            radial-gradient(at 50% 100%, rgba(40, 20, 80, 0.2) 0%, transparent 60%)
          `
        }}
      />

      {/* 2. Golden Veins - Sharp, Elegant Light Streaks */}
      <motion.div 
        style={{ y: yDrift }}
        className="absolute inset-0 w-full h-full"
      >
        {/* Top-Right Vein */}
        <motion.div 
          animate={{ x: ["-5%", "5%"], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] -right-[10%] w-[60%] h-[1px] bg-gradient-to-l from-[var(--color-accent-main)] to-transparent rotate-[-35deg]"
        />

        {/* Center-Left Vein */}
        <motion.div 
          animate={{ x: ["10%", "-10%"], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 5 }}
          className="absolute top-[60%] -left-[10%] w-[70%] h-[1px] bg-gradient-to-r from-[var(--color-accent-main)] to-transparent rotate-[25deg]"
        />

        {/* Deep Bottom Sweep */}
        <motion.div 
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[20%] left-0 w-full h-[30%] opacity-20"
          style={{ background: 'linear-gradient(0deg, rgba(80, 50, 15, 0.1) 0%, transparent 100%)' }}
        />
      </motion.div>

      {/* 3. Luxury Grain Texture - High Res Analog Feel */}
      <div 
        className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay" 
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />

      {/* 4. Elegant Vignette - Directs focus to center */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.8)_100%)] opacity-80" />
      
      {/* 5. Subtle Bottom Glow */}
      <div className="absolute bottom-0 left-0 w-full h-[20%] bg-gradient-to-t from-black to-transparent" />
    </div>
  );
}
