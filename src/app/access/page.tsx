"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

export default function AccessPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".fade-up", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="pt-32 pb-24 px-6 md:px-12 bg-black min-h-screen">
      <div className="max-w-[1200px] mx-auto">
        <header className="mb-24 text-center fade-up">
           <span className="block font-cinzel text-xs tracking-[0.4em] text-[var(--color-accent-main)] uppercase mb-4">Location</span>
           <h1 className="font-cinzel text-4xl md:text-6xl tracking-[0.2em] mb-8">Access</h1>
           <div className="w-20 h-[1px] bg-[var(--color-accent-main)] mx-auto opacity-50" />
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start mb-24 fade-up">
           <div className="space-y-12">
              <div className="space-y-2">
                 <span className="text-[var(--color-accent-main)] font-cinzel text-[10px] tracking-[0.3em] uppercase">Address</span>
                 <p className="text-xl md:text-2xl font-shippori text-white leading-relaxed">
                    〒639-1160<br/>奈良県大和郡山市北郡山町137-1
                 </p>
              </div>
              <div className="space-y-2">
                 <span className="text-[var(--color-accent-main)] font-cinzel text-[10px] tracking-[0.3em] uppercase">Opening Hours</span>
                 <p className="text-xl md:text-2xl font-shippori text-white leading-relaxed">
                    19:00 - Last (月曜定休)
                 </p>
              </div>
              <div className="space-y-2">
                 <span className="text-[var(--color-accent-main)] font-cinzel text-[10px] tracking-[0.3em] uppercase">Contact</span>
                 <p className="text-2xl md:text-3xl font-shippori text-[var(--color-accent-main)] font-bold">
                    0743-55-3001
                 </p>
              </div>
              
              <div className="pt-12">
                 <a 
                   href="https://maps.app.goo.gl/rjYPFAzxPsBVsfSt7" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="inline-block border border-[var(--color-accent-main)] px-12 py-5 font-cinzel text-sm tracking-[0.3em] text-[var(--color-accent-main)] hover:bg-[var(--color-accent-main)] hover:text-black transition-all duration-500 uppercase shadow-[0_0_20px_rgba(212,175,55,0.2)]"
                 >
                   Open in Google Maps
                 </a>
              </div>
           </div>

           <div className="relative aspect-square w-full rounded-sm overflow-hidden border border-white/10 group shadow-2xl">
              <Image 
                src="/images/photo_image1_l.jpg" 
                alt="Bar Sally Entrance" 
                fill 
                className="object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-black/40 pointer-events-none" />
           </div>
        </div>
      </div>
    </div>
  );
}
