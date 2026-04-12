"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function AestheticBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { scrollYProgress } = useScroll();

  // Scroll-based vertical drift
  const yDrift = useTransform(scrollYProgress, [0, 1], [0, -300]);

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
        this.speedY = -(Math.random() * 0.2 + 0.05);
        this.speedX = Math.random() * 0.1 - 0.05;
        this.opacity = Math.random() * 0.3 + 0.1;
        this.pulse = Math.random() * 0.01;
      }

      update(w: number, h: number) {
        this.y += this.speedY;
        this.x += this.speedX;
        this.opacity += this.pulse;
        if (this.opacity > 0.4 || this.opacity < 0.1) this.pulse = -this.pulse;

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
      const particleCount = Math.floor((canvas.width * canvas.height) / 20000);
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
    <div className="fixed inset-0 w-full h-full -z-50 pointer-events-none overflow-hidden bg-[#020202]">
      {/* 1. Cinematic Aurora Bands */}
      <motion.div 
        style={{ y: yDrift }}
        className="absolute inset-0 w-full h-full opacity-60 mix-blend-screen"
      >
        {/* Deep Gold Aurora */}
        <motion.div 
          animate={{ 
            x: ["-10%", "10%", "-10%"],
            y: ["0%", "5%", "0%"],
            scale: [1, 1.2, 1],
            rotate: [0, 5, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[20%] -left-[20%] w-[120%] h-[80%] blur-[160px] opacity-80"
          style={{ background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.5) 0%, rgba(139, 101, 8, 0) 70%)' }}
        />

        {/* Midnight Indigo Aurora */}
        <motion.div 
          animate={{ 
            x: ["10%", "-5%", "10%"],
            y: ["10%", "0%", "10%"],
            scale: [1, 1.1, 1],
            rotate: [0, -3, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-[10%] -right-[10%] w-[100%] h-[70%] blur-[180px] opacity-40"
          style={{ background: 'linear-gradient(225deg, rgba(20, 20, 60, 0.6) 0%, rgba(0, 0, 0, 0) 80%)' }}
        />

        {/* Shifting Amber Light */}
        <motion.div 
          animate={{ 
            opacity: [0.3, 0.6, 0.3],
            x: ["-5%", "5%", "-5%"],
            scale: [1.1, 0.9, 1.1]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] left-[10%] w-[80%] h-[60%] blur-[140px] opacity-50"
          style={{ background: 'radial-gradient(circle, rgba(101, 67, 33, 0.7) 0%, transparent 60%)' }}
        />

        {/* High Light Flare */}
        <motion.div 
          animate={{ 
            x: ["-20%", "20%", "-20%"],
            rotate: [0, 10, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 w-full h-[40%] blur-[120px] opacity-30"
          style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(255, 230, 150, 0.2) 50%, transparent 100%)' }}
        />
      </motion.div>

      {/* 2. Floating Embers (Canvas) */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full opacity-40"
      />

      {/* 3. Global Perspective Texture */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-soft-light" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />
      
      {/* 4. Deep Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
    </div>
  );
}
