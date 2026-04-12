"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function AestheticBackground() {
  const { scrollYProgress } = useScroll();

  // Create different parallax depths for the 6 Byōbu panels
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const y5 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const y6 = useTransform(scrollYProgress, [0, 1], [0, -80]);

  const panels = [
    { y: y1, color: "rgba(212, 175, 55, 0.4)", delay: 0 },
    { y: y2, color: "rgba(255, 215, 0, 0.3)", delay: 0.1 },
    { y: y3, color: "rgba(0, 255, 127, 0.1)", delay: 0.2 },
    { y: y4, color: "rgba(212, 175, 55, 0.35)", delay: 0.3 },
    { y: y5, color: "rgba(138, 43, 226, 0.1)", delay: 0.4 },
    { y: y6, color: "rgba(255, 215, 0, 0.25)", delay: 0.5 },
  ];

  return (
    <div className="fixed inset-0 w-full h-full -z-50 pointer-events-none overflow-hidden bg-[#020202]">
      {/* 1. Digital Byōbu Panels (6 Panels) */}
      <div className="flex h-full w-[110%] -ml-[5%] perspective-[2000px]">
        {panels.map((panel, i) => (
          <motion.div
            key={i}
            style={{ y: panel.y }}
            className="relative flex-1 h-[120%] -top-[10%] border-r border-black/40 last:border-r-0 overflow-hidden"
          >
            {/* The Panel Background (Washi Texture + Gold Gradient) */}
            <div className="absolute inset-0 bg-[#080808] opacity-90" />
            
            {/* Gold Leaf Motif (Kinpaku) */}
            <div 
              className="absolute inset-0 w-full h-full opacity-60 mix-blend-screen"
              style={{
                background: `radial-gradient(at ${30 + i * 10}% 20%, ${panel.color} 0%, transparent 70%)`
              }}
            />

            {/* Subtle Vertical Fold Shadow */}
            <div className="absolute inset-y-0 right-0 w-[20px] bg-gradient-to-l from-black/60 to-transparent" />
            <div className="absolute inset-y-0 left-0 w-[10px] bg-gradient-to-r from-white/5 to-transparent" />
          </motion.div>
        ))}
      </div>

      {/* 2. Readability Mask (Visibility Guard) */}
      {/* Ensures the central text area has high contrast and is not obscured by gold patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.8)_80%)] opacity-95 pointer-events-none" />
      
      {/* 3. Global Washi Texture (Japanese Paper Grain) */}
      <div 
        className="absolute inset-0 opacity-[0.07] pointer-events-none mix-blend-overlay" 
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />

      {/* 4. Golden Accent Line (Byōbu Edge) */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--color-accent-main)]/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--color-accent-main)]/30 to-transparent" />
    </div>
  );
}
