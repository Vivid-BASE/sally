"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function AestheticBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { scrollYProgress } = useScroll();

  // Scroll-based parallax
  const yDrift = useTransform(scrollYProgress, [0, 1], [0, -400]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    class Particle {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      opacity: number;
      pulse: number;

      constructor(w: number, h: number) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.size = Math.random() * 2 + 0.5;
        this.speedY = -(Math.random() * 0.4 + 0.1);
        this.speedX = Math.random() * 0.2 - 0.1;
        this.opacity = Math.random() * 0.5 + 0.1;
        this.pulse = Math.random() * 0.02;
      }

      update(w: number, h: number) {
        this.y += this.speedY;
        this.x += this.speedX;
        this.opacity += this.pulse;
        if (this.opacity > 0.6 || this.opacity < 0.1) this.pulse = -this.pulse;

        if (this.y < 0) this.y = h;
        if (this.x < 0) this.x = w;
        if (this.x > w) this.x = 0;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = `rgba(212, 175, 55, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = [];
      const particleCount = Math.floor((canvas.width * canvas.height) / 15000);
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(canvas.width, canvas.height));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;
      particles.forEach((p) => {
        p.update(w, h);
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();
    window.addEventListener("resize", init);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", init);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full -z-50 pointer-events-none overflow-hidden bg-[#010101]">
      {/* 1. Vivid Aurora Layers - Sharper and More Diverse Colors */}
      <motion.div 
        style={{ y: yDrift }}
        className="absolute inset-0 w-full h-full opacity-80 mix-blend-screen"
      >
        {/* Emerald Flare (Main Aurora Color) */}
        <motion.div 
          animate={{ 
            x: ["-15%", "15%", "-15%"],
            y: ["0%", "10%", "0%"],
            scale: [1, 1.4, 1],
            rotate: [-5, 5, -5]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[10%] -left-[10%] w-full h-full blur-[90px] opacity-70"
          style={{ background: 'radial-gradient(ellipse at center, rgba(0, 255, 127, 0.5) 0%, rgba(0, 100, 50, 0) 70%)' }}
        />

        {/* Vivid Violet Cascade */}
        <motion.div 
          animate={{ 
            x: ["20%", "-10%", "20%"],
            y: ["5%", "15%", "5%"],
            scale: [1.2, 0.9, 1.2],
            rotate: [5, -10, 5]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[0%] -right-[10%] w-full h-full blur-[100px] opacity-60"
          style={{ background: 'linear-gradient(225deg, rgba(138, 43, 226, 0.6) 0%, rgba(40, 20, 80, 0) 70%)' }}
        />

        {/* Intense Gold Ribbon */}
        <motion.div 
          animate={{ 
            opacity: [0.5, 0.9, 0.5],
            x: ["-25%", "25%", "-25%"],
            y: ["20%", "30%", "20%"],
          }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] left-0 w-[120%] h-[50%] blur-[80px] opacity-80"
          style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(255, 215, 0, 0.6) 50%, transparent 100%)' }}
        />

        {/* Deep Ruby/Magenta Mystery Accent */}
        <motion.div 
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] blur-[150px] opacity-30"
          style={{ background: 'radial-gradient(circle, rgba(199, 21, 133, 0.4) 0%, transparent 60%)' }}
        />
      </motion.div>

      {/* 2. Enhanced Floating Embers (Canvas) */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full opacity-60"
      />

      {/* 3. Global Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none mix-blend-overlay" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />
      
      {/* 4. Contrast Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.8)_100%)]" />
    </div>
  );
}
