"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function AestheticBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const { scrollYProgress } = useScroll();

  // Scroll-based parallax (Disabled on mobile for CPU savings)
  const yDrift = useTransform(scrollYProgress, [0, 1], [0, -300]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const canvas = canvasRef.current;
    if (!canvas || window.innerWidth < 768) return; // Disable Canvas on mobile

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
        this.opacity = Math.random() * 0.4 + 0.1;
        this.pulse = Math.random() * 0.01;
      }

      update(w: number, h: number) {
        this.y += this.speedY;
        this.x += this.speedX;
        this.opacity += this.pulse;
        if (this.opacity > 0.5 || this.opacity < 0.1) this.pulse = -this.pulse;

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

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", init);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  if (isMobile) {
    // PERFORMANCE FIRST: Static Premium Gradient for Mobile
    return (
      <div className="fixed inset-0 w-full h-full -z-50 pointer-events-none bg-[#010101] overflow-hidden">
        <div 
          className="absolute inset-0 w-full h-full opacity-60 mix-blend-screen"
          style={{
            background: `
              radial-gradient(circle at 20% 20%, rgba(0, 255, 127, 0.25) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(138, 43, 226, 0.25) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, rgba(255, 215, 0, 0.15) 0%, transparent 60%)
            `
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.9)_100%)]" />
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" 
             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' sticthTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
        />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 w-full h-full -z-50 pointer-events-none overflow-hidden bg-[#010101] [transform:translateZ(0)]">
      {/* Dynamic Aurora for Desktop */}
      <motion.div 
        style={{ y: yDrift }}
        className="absolute inset-0 w-full h-full opacity-70 mix-blend-screen will-change-transform"
      >
        <motion.div 
          animate={{ x: ["-10%", "10%", "-10%"], y: ["0%", "8%", "0%"], scale: [1, 1.3, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[10%] -left-[10%] w-[120%] h-[90%] opacity-80 blur-[120px] [transform:translate3d(0,0,0)]"
          style={{ background: 'linear-gradient(135deg, rgba(0, 255, 127, 0.45) 0%, rgba(0, 100, 50, 0) 70%)' }}
        />
        <motion.div 
          animate={{ x: ["10%", "-10%", "10%"], y: ["15%", "5%", "15%"], scale: [1.2, 0.9, 1.2] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[0%] -right-[10%] w-full h-full opacity-60 blur-[140px] [transform:translate3d(0,0,0)]"
          style={{ background: 'linear-gradient(225deg, rgba(40, 20, 80, 0.55) 0%, rgba(138, 43, 226, 0) 70%)' }}
        />
        <motion.div 
          animate={{ opacity: [0.5, 0.9, 0.5], x: ["-20%", "20%", "-20%"] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[15%] left-0 w-[120%] h-[40%] opacity-80 blur-[90px] [transform:translate3d(0,0,0)]"
          style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(255, 215, 0, 0.5) 50%, transparent 100%)' }}
        />
      </motion.div>

      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-50 will-change-transform" />
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.85)_100%)]" />
    </div>
  );
}
