"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ProfileContent } from "@/lib/microcms";
import Hero from "./Hero";
import AestheticBackground from "./AestheticBackground";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface HomeViewProps {
  news: {
    img: string;
    title: string;
    delay: number;
  }[];
  profile: ProfileContent;
}

export default function HomeView({ news, profile }: HomeViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>(".reveal-section");
      
      sections.forEach((section) => {
        const image = section.querySelector(".reveal-image");
        const content = section.querySelector(".reveal-content");
        const title = section.querySelector(".reveal-title");
        const text = section.querySelector(".reveal-text");
        const isReverse = section.classList.contains("reverse");

        // 1. Image Reveal (Mask Wipe + Slide)
        if (image) {
          gsap.fromTo(image, 
            { 
              clipPath: isReverse ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)",
              x: isReverse ? 60 : -60,
              scale: 1.1
            },
            {
              clipPath: "inset(0 0% 0 0)",
              x: 0,
              scale: 1,
              duration: 2.2,
              ease: "expo.out",
              scrollTrigger: {
                trigger: section,
                start: "top 75%",
                toggleActions: "play none none none"
              }
            }
          );

          // Subtle Image Parallax
          gsap.to(image, {
            y: -40,
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 1
            }
          });
        }

        // 2. Content Reveal (Opposite Side Slide + Stagger)
        if (content) {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top 70%",
              toggleActions: "play none none none"
            }
          });

          if (title) {
            tl.fromTo(title, 
              { opacity: 0, x: isReverse ? -40 : 40 },
              { opacity: 1, x: 0, duration: 1.5, ease: "power3.out" }
            );
          }

          if (text) {
            const children = text.children;
            tl.fromTo(children, 
              { opacity: 0, y: 20 },
              { 
                opacity: 1, 
                y: 0, 
                duration: 1.2, 
                stagger: 0.2, 
                ease: "power2.out" 
              },
              "-=1.0"
            );
          }
        }
      });

      // Staggered News Cards
      gsap.from(".news-card", {
        opacity: 0,
        y: 40,
        duration: 1.5,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".news-grid",
          start: "top 80%"
        }
      });

      // Special handling for Service/Access section
      gsap.from(".access-reveal", {
        opacity: 0,
        y: 40,
        duration: 2,
        ease: "expo.out",
        scrollTrigger: {
          trigger: ".access-reveal",
          start: "top 85%"
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-transparent text-white selection:bg-[var(--color-accent-main)] selection:text-black">
      <Hero />

      {/* --- Concept Section --- */}
      <section className="reveal-section relative w-full py-40 md:py-64 px-6 overflow-hidden border-b border-white/5 bg-transparent">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 md:gap-32 items-center">
          <div className="reveal-content order-2 md:order-1 relative z-10">
            <h2 className="reveal-title font-cinzel text-4xl md:text-6xl tracking-[0.3em] mb-12 text-[var(--color-accent-main)] uppercase shadow-sm">Concept</h2>
            <div className="reveal-text font-noto-serif font-bold text-base md:text-lg text-white leading-loose md:leading-[2.2] tracking-wide space-y-8 break-keep text-shadow-sm">
              <p>1978年の創業以来、大和郡山の人々に愛され続けてきた Bar Sally。</p>
              <p>奈良の木材をふんだんに使用した、温かく重厚な空間。<br className="hidden md:block" />そこはまるで、古き良き時代から時が止まったかのような、大人のためのサンクチュアリ。</p>
              <p>「人とのつながり」と「出会い」を大切に。<br className="hidden md:block" />今宵も最高の一杯をご用意して、皆様のお越しをお待ちしております。</p>
            </div>
          </div>
          <div className="order-1 md:order-2 flex justify-center md:justify-end">
            <div className="reveal-image relative w-full max-w-[450px] aspect-square overflow-hidden rounded-sm group shadow-2xl border border-white/10">
                <Image src="/images/bar/CONCEPT.jpg" alt="Bar Sally Concept" fill className="object-cover" sizes="(max-width: 768px) 100vw, 450px" />
                <div className="absolute inset-0 border border-[var(--color-accent-main)]/10 group-hover:border-[var(--color-accent-main)]/30 transition-colors duration-1000 pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* --- News Section (Restored) --- */}
      <section className="relative w-full py-40 md:py-64 px-6 bg-black/5 overflow-hidden">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex justify-between items-end mb-16 px-4">
            <h2 className="font-cinzel text-4xl md:text-6xl tracking-[0.3em] text-[var(--color-accent-main)] uppercase">News</h2>
            <Link href="/archives" className="font-cinzel text-xs tracking-[0.4em] opacity-40 hover:opacity-100 transition-opacity pb-2">View All</Link>
          </div>
          
          <div className="news-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {news.map((item, index) => (
              <div key={index} className="news-card group relative">
                <div className="relative aspect-[4/5] overflow-hidden rounded-sm mb-6 border border-white/5 group-hover:border-[var(--color-accent-main)]/30 transition-colors duration-700">
                  <Image src={item.img} alt={item.title} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-all duration-1000" />
                </div>
                <h3 className="font-noto-serif text-sm md:text-base font-bold tracking-widest text-center group-hover:text-[var(--color-accent-main)] transition-colors duration-500">{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Master Section --- */}
      <section className="reveal-section reverse relative w-full py-40 md:py-64 px-6 bg-transparent border-t border-white/5">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 md:gap-32 items-center">
          <div className="flex justify-center md:justify-start">
             <div className="reveal-image relative w-full max-w-[450px] aspect-square overflow-hidden rounded-sm group shadow-2xl border border-white/10">
                <Image src={profile.image?.url || "/images/master2.png"} alt={profile.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 450px" />
                <div className="absolute inset-0 border border-[var(--color-accent-main)]/10 group-hover:border-[var(--color-accent-main)]/30 transition-colors duration-1000 pointer-events-none" />
             </div>
          </div>
          <div className="reveal-content relative z-10">
            <h2 className="reveal-title font-cinzel text-4xl md:text-6xl tracking-[0.3em] mb-12 text-[var(--color-accent-main)] uppercase shadow-sm">Master</h2>
            <div className="reveal-text font-noto-serif font-bold text-base md:text-lg text-white leading-loose md:leading-[2.2] tracking-wide space-y-6 break-keep text-shadow-sm">
              <p className="text-xl md:text-2xl mb-4 text-[var(--color-accent-main)]">{profile.name} {profile.englishName}</p>
              <p>{profile.role}</p>
              <div className="whitespace-pre-wrap opacity-90 font-medium">
                {profile.bio}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Service/Philosophy Section (Business) --- */}
      <section className="reveal-section relative w-full py-40 md:py-64 px-6 overflow-hidden bg-black/10">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 md:gap-32 items-center">
          <div className="reveal-content order-2 md:order-1 relative z-10">
            <h2 className="reveal-title font-cinzel text-4xl md:text-6xl tracking-[0.3em] mb-12 text-[var(--color-accent-main)] uppercase shadow-sm">Creation</h2>
            <div className="reveal-text font-noto-serif font-bold text-base md:text-lg text-white leading-loose md:leading-relaxed tracking-wider space-y-8 break-keep text-shadow-sm">
              <p>
                「奈良のええもんを、世界へ。」<br />
                Bar Sally は単なる飲食店ではなく、奈良のクリエイティブ、ヒト、モノを繋ぐハブとしての役割を担っています。
              </p>
              <p>
                ブランドプロデューサー、そして「ご縁ジニア」としての経験を活かし、<br className="hidden md:block" />
                新しい価値の創造、ビジネスのマッチング、そして奈良の魅力発信をサポートします。
              </p>
              <div className="pt-8">
                <Link href="/archives" className="group relative inline-flex items-center gap-4 text-sm tracking-[0.4em] uppercase hover:text-[var(--color-accent-main)] transition-colors duration-500">
                  <span className="w-12 h-[1px] bg-[var(--color-accent-main)] transition-all duration-500 group-hover:w-20" />
                  View Archives
                </Link>
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2 flex justify-center md:justify-end">
            <div className="reveal-image relative w-full max-w-[450px] aspect-[4/5] overflow-hidden rounded-sm group shadow-2xl border border-white/10">
                <Image src="/images/bar/BAR_INTERIOR.jpg" alt="Bar Sally Production" fill className="object-cover" sizes="(max-width: 768px) 100vw, 450px" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all duration-1000" />
            </div>
          </div>
        </div>
      </section>

      {/* --- Visual Break / Accent --- */}
      <div className="w-full h-[60vh] relative overflow-hidden">
         <Image src="/images/bar/photo_image4_l.jpg" alt="Atmospheric Bar" fill className="object-cover brightness-50" />
         <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black" />
      </div>

      {/* --- Access Section --- */}
      <section id="access" className="access-reveal relative w-full py-40 md:py-64 px-6 bg-transparent border-t border-white/5">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="font-cinzel text-4xl md:text-6xl tracking-[0.3em] mb-24 text-center text-[var(--color-accent-main)] uppercase shadow-sm">Access</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            {/* Info */}
            <div className="space-y-12 font-noto-serif text-white tracking-wider">
              <div className="group border-l border-[var(--color-accent-main)]/30 pl-8 py-2">
                <h3 className="font-cinzel text-xs tracking-[0.4em] text-[var(--color-accent-main)] uppercase mb-4 opacity-60">Address</h3>
                <p className="text-xl md:text-2xl font-bold">〒639-1132 奈良県大和郡山市高田町9-1</p>
                <p className="mt-2 text-gray-400">JR大和郡山駅より 徒歩1分</p>
              </div>

              <div className="group border-l border-[var(--color-accent-main)]/30 pl-8 py-2">
                <h3 className="font-cinzel text-xs tracking-[0.4em] text-[var(--color-accent-main)] uppercase mb-4 opacity-60">Hours</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-end border-b border-white/5 pb-2">
                    <span className="text-lg">月曜 - 土曜</span>
                    <span className="text-xl font-bold">18:00 - 24:00</span>
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="text-gray-500">日曜・祝日</span>
                    <span className="text-gray-500">定休日</span>
                  </div>
                </div>
              </div>

              <div className="group border-l border-[var(--color-accent-main)]/30 pl-8 py-2">
                <h3 className="font-cinzel text-xs tracking-[0.4em] text-[var(--color-accent-main)] uppercase mb-4 opacity-60">Contact</h3>
                <p className="text-xl md:text-3xl font-bold tracking-tighter">0743-52-1234</p>
              </div>
            </div>

            {/* Map Placeholder with Luxury Styling */}
            <div className="relative w-full aspect-video md:aspect-square lg:aspect-video rounded-sm overflow-hidden border border-white/10 grayscale hover:grayscale-0 transition-all duration-1000 shadow-2xl bg-black/40">
               {/* Map could be an iframe or a styled static map */}
               <div className="absolute inset-0 flex items-center justify-center text-gray-600 font-cinzel tracking-widest text-xs">
                  Google Map Visualization
               </div>
            </div>
          </div>
        </div>
      </section>

      <AestheticBackground />
    </div>
  );
}
