"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function AestheticBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { scrollYProgress } = useScroll();

  // Scroll-based parallax for gradients
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -400]);

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
        this.size = Math.random() * 1.5 + 0.5;
        this.speedY = -(Math.random() * 0.3 + 0.1); // float up
        this.speedX = Math.random() * 0.2 - 0.1;
        this.opacity = Math.random() * 0.5 + 0.1;
        this.pulse = Math.random() * 0.02;
      }

      update(w: number, h: number) {
        this.y += this.speedY;
        this.x += this.speedX;
        this.opacity += this.pulse;
        if (this.opacity > 0.6 || this.opacity < 0.1) this.pulse = -this.pulse;

        // Reset if off window
        if (this.y < 0) this.y = h;
        if (this.x < 0) this.x = w;
        if (this.x > w) this.x = 0;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = `rgba(212, 175, 55, ${this.opacity})`; // #d4af37 Gold
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Optional glow
        ctx.shadowBlur = 10;
        ctx.shadowColor = "rgba(212, 175, 55, 0.2)";
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
    <div className="fixed inset-0 w-full h-full -z-50 pointer-events-none overflow-hidden bg-[#050505]">
      {/* 1. Mesh Gradient Layers */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute -top-[20%] -left-[10%] w-[120%] h-[120%] opacity-80 mix-blend-screen"
      >
        <div 
          className="absolute top-[20%] left-[20%] w-[80%] h-[80%] blur-[100px] animate-pulse opacity-90" 
          style={{ 
            background: 'radial-gradient(circle, rgba(80, 50, 15, 0.9) 0%, transparent 60%)',
            animationDuration: '6s' 
          }} 
        />
        <div 
          className="absolute top-[40%] left-[50%] w-[70%] h-[70%] blur-[120px] animate-pulse opacity-70" 
          style={{ 
            background: 'radial-gradient(circle, rgba(30, 30, 60, 0.8) 0%, transparent 60%)',
            animationDuration: '10s' 
          }} 
        />
      </motion.div>

      <motion.div 
        style={{ y: y2 }}
        className="absolute top-[10%] right-[0%] w-[100%] h-[100%] opacity-70 mix-blend-screen"
      >
        <div 
          className="absolute top-[15%] right-[15%] w-[70%] h-[70%] blur-[140px] animate-pulse opacity-80" 
          style={{ 
            background: 'radial-gradient(circle, rgba(90, 60, 20, 0.9) 0%, transparent 60%)',
            animationDuration: '12s' 
          }} 
        />
      </motion.div>

      {/* 2. Floating Particles Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full opacity-60"
      />

      {/* 3. Noise Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] contrast-150 brightness-150 pointer-events-none" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />
      
      {/* 4. Vignette for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]" />
    </div>
  );
}
