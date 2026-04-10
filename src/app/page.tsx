"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero from "@/components/Hero";

const InstagramIcon = ({ className = "", size = 24 }: { className?: string; size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Fade in text from bottom on scroll
      textRefs.current.forEach((ref) => {
        if (!ref) return;
        gsap.fromTo(
          ref,
          { y: 60, opacity: 0, filter: "blur(5px)" },
          {
            scrollTrigger: {
              trigger: ref,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.2,
            ease: "expo.out",
          }
        );
      });

      // Image parallax effect
      gsap.utils.toArray<HTMLElement>('.parallax-img').forEach(img => {
        gsap.fromTo(img, 
          { y: -30, scale: 1.05 },
          {
            scrollTrigger: {
              trigger: img.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
            y: 30,
            scale: 1,
            ease: "none"
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !textRefs.current.includes(el)) {
      textRefs.current.push(el);
    }
  };

  return (
    <div ref={containerRef} className="bg-black text-white selection:bg-[var(--color-accent-main)] selection:text-black">
      <Hero />

      {/* --- Concept Section --- */}
      <section className="relative w-full py-32 md:py-48 px-6 overflow-hidden">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
          
          {/* Text */}
          <div className="order-2 md:order-1 relative z-10" ref={addToRefs}>
            <span className="block font-cinzel text-xs tracking-[0.3em] text-[var(--color-accent-main)] uppercase mb-6">Since 1978</span>
            <h2 className="font-cinzel text-3xl md:text-5xl tracking-[0.15em] mb-12">Concept</h2>
            
            <div className="font-shippori text-sm md:text-base text-gray-300 leading-[2.5] tracking-widest space-y-8 text-justify mix-blend-difference break-keep">
              <p>
                1978年の創業以来、大和郡山の人々に愛され続けてきた Bar Sally。
              </p>
              <p>
                奈良の木材をふんだんに使用した、温かく重厚な空間。
                そこはまるで、古き良き時代から時が止まったかのような、大人のためのサンクチュアリ。
              </p>
              <p>
                「人とのつながり」と「出会い」を大切に。
                今宵も最高の一杯をご用意して、皆様のお越しをお待ちしております。
              </p>
            </div>

            <div className="mt-16">
               <Link href="/concept" className="group inline-flex items-center gap-4 font-cinzel text-sm tracking-[0.2em] uppercase text-[var(--color-accent-main)] overflow-hidden">
                 <span className="relative">
                   Discover More
                   <span className="absolute bottom-0 left-0 w-full h-[1px] bg-current transform translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                 </span>
                 <svg className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                 </svg>
               </Link>
            </div>
          </div>

          {/* Image */}
          <div className="order-1 md:order-2 relative h-[50vh] md:h-[80vh] w-full overflow-hidden rounded-sm" ref={addToRefs}>
             <div className="absolute inset-0 w-full h-[120%] -top-[10%]">
                <Image 
                  src="/images/photo_image2_l.jpg" 
                  alt="Bar Sally Interior" 
                  fill 
                  className="object-cover image-sepia parallax-img"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
             </div>
             {/* Luxury Edge Overlay */}
             <div className="absolute inset-0 border border-[var(--color-accent-main)]/20 shadow-[inset_0_0_50px_rgba(0,0,0,0.8)] pointer-events-none" />
          </div>

        </div>
      </section>

      {/* --- Divider --- */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--color-accent-main)]/30 to-transparent my-10" />

      {/* --- Latest Activities & Instagram (Mock integration) --- */}
      <section className="relative w-full py-32 px-6">
        <div className="max-w-[1200px] mx-auto text-center" ref={addToRefs}>
          <span className="block font-cinzel text-xs tracking-[0.3em] text-[var(--color-accent-main)] uppercase mb-6">Latest Updates</span>
          <h2 className="font-cinzel text-3xl md:text-4xl tracking-[0.15em] mb-20 flex items-center justify-center gap-4">
            <InstagramIcon className="text-[var(--color-accent-main)]" size={32} />
            Instagram & News
          </h2>
        </div>

        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 px-4">
          {/* Mock Instagram / CMS items grid */}
          {[
            { img: "/images/bar/photo_image4_l.jpg", title: "Bar Night", delay: 0 },
            { img: "/images/photo/LINE_ALBUM_sally宣材_260410_53.jpg", title: "Event", delay: 0.1 },
            { img: "/images/curry/curry.jpg", title: "Nara Shikanai Curry", delay: 0.2 },
            { img: "/images/photo/LINE_ALBUM_sally宣材_260410_42.jpg", title: "Community", delay: 0.3 },
          ].map((item, index) => (
            <div 
              key={index} 
              className="group relative aspect-square overflow-hidden cursor-pointer"
              ref={addToRefs}
            >
              <Image 
                src={item.img} 
                alt={item.title} 
                fill 
                className="object-cover filter grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out" 
                sizes="(max-width: 768px) 100vw, 25vw"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center pointer-events-none">
                <InstagramIcon className="text-[var(--color-accent-main)] mb-3" size={24} />
                <span className="font-cinzel tracking-widest text-sm text-white uppercase">{item.title}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center" ref={addToRefs}>
          <a 
            href="https://www.instagram.com/sally_master/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block border border-[var(--color-accent-main)] px-10 py-4 font-cinzel text-sm tracking-[0.2em] text-[var(--color-accent-main)] hover:bg-[var(--color-accent-main)] hover:text-black transition-colors duration-500 uppercase"
          >
            Follow on Instagram
          </a>
        </div>
      </section>

    </div>
  );
}
