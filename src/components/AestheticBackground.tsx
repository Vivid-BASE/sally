"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function AestheticBackground() {
  const { scrollYProgress } = useScroll();
  const yDrift = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <div className="fixed inset-0 w-full h-full -z-50 pointer-events-none overflow-hidden bg-[#020205]">
      {/* 1. Luminous Foundation - High Visibility Gradient Stack */}
      {/* Boosted Opacity and Vividness to eliminate 'pitch black' issue */}
      <div 
        className="absolute inset-0 w-full h-full opacity-60 mix-blend-screen"
        style={{
          background: `
            radial-gradient(at 10% 10%, rgba(255, 215, 0, 0.45) 0%, transparent 60%),
            radial-gradient(at 90% 20%, rgba(0, 255, 127, 0.25) 0%, transparent 50%),
            radial-gradient(at 50% 90%, rgba(138, 43, 226, 0.35) 0%, transparent 60%)
          `
        }}
      />

      {/* 2. Gilded Radiant Ribbons - Dynamic but Lightweight */}
      <motion.div 
        style={{ y: yDrift }}
        className="absolute inset-0 w-full h-full"
      >
        {/* Major Golden Band - Top-Right to Center */}
        <motion.div 
          animate={{ x: ["-10%", "10%"], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[15%] -right-[20%] w-[100%] h-[2px] bg-gradient-to-l from-[var(--color-accent-main)] via-[var(--color-accent-main)] to-transparent rotate-[-25deg] shadow-[0_0_25px_rgba(255,215,0,0.5)]"
        />

        {/* Emerald Ethereal Ribbon - Center Left */}
        <motion.div 
          animate={{ x: ["10%", "-10%"], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute top-[50%] -left-[15%] w-[80%] h-[1.5px] bg-gradient-to-r from-[#00FF7F] to-transparent rotate-[15deg] shadow-[0_0_20px_rgba(0,255,127,0.3)]"
        />

        {/* Deep Amber Flow - Bottom Right */}
        <motion.div 
          animate={{ x: ["-5%", "5%"], y: ["0%", "5%"] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[10%] -right-[10%] w-[120%] h-[150px] opacity-40"
          style={{ background: 'radial-gradient(ellipse at bottom right, rgba(230, 160, 0, 0.5) 0%, transparent 70%)' }}
        />
      </motion.div>

      {/* 3. Luxury Grain Texture - For high-end material feel */}
      <div 
        className="absolute inset-0 opacity-[0.06] pointer-events-none mix-blend-overlay" 
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />

      {/* 4. Strategic Vignette - Contrast Enhancer */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.85)_100%)] opacity-90" />
      
      {/* 5. Glimmer Flare - A bright 'Wow' point */}
      <motion.div 
        animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-radial-gradient from-[var(--color-accent-main)]/30 to-transparent blur-[120px] mix-blend-screen"
        style={{ background: 'radial-gradient(circle, rgba(255, 215, 0, 0.25) 0%, transparent 70%)' }}
      />
    </div>
  );
}
