"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ProfileContent } from "@/lib/microcms";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import AestheticBackground from "./AestheticBackground";
import InstagramFeed from "./InstagramFeed";
import { fetchInstagramFeed, InstagramPost } from "@/lib/instagram";
import { useState, useEffect } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// galleryImages are used as a fallback when the Instagram feed is unavailable or loading
const staticGalleryImages = [
  "/images/photo_image3_l.jpg",
  "/images/photo_image1_l.jpg",
  "/images/320x320_rect_6e44d35aa2dffcc94b4d7b787e49f124.jpg",
  "/images/79155427_3106792099350824_8629136699835809792_n.jpg",
  "/images/117236925_3744322492264445_8705478074068095151_n.jpg",
  "/images/117335765_3744322478931113_3807033421426319937_n.jpg",
  "/images/72691422_2987949857901716_5146671822036533248_n.jpg",
  "/images/101195328_3540812025948827_5725311338234773504_n.jpg",
  "/images/117040332_3744323535597674_8103100777321416032_n.jpg",
  "/images/99299332_3540811972615499_7490206605246464000_n.jpg",
];

type HomeViewProps = {
  news: {
    img: string;
    title: string;
    delay: number;
  }[];
  profile: ProfileContent;
};

export default function HomeView({ news, profile }: HomeViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [instaPosts, setInstaPosts] = useState<InstagramPost[]>([]);

  useEffect(() => {
    const loadInsta = async () => {
      const posts = await fetchInstagramFeed();
      setInstaPosts(posts);
    };
    loadInsta();
  }, []);
  
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>(".reveal-section");
      
      sections.forEach((section) => {
        const imageOuter = section.querySelector(".reveal-image");
        const imageInner = section.querySelector(".reveal-image-inner");
        const content = section.querySelector(".reveal-content");
        const title = section.querySelector(".reveal-title");
        const text = section.querySelector(".reveal-text");
        const isReverse = section.classList.contains("reverse");

        // 1. Cinematic Shutter Reveal (Images) - Unified Direction & Extreme Expo
        if (imageOuter) {
          gsap.fromTo(imageOuter, 
            { 
              opacity: 0,
              clipPath: "inset(0 100% 0 0)",
              x: -80,
              scale: 1.1,
            },
            {
              opacity: 1,
              clipPath: "inset(0 0% 0 0)",
              x: 0,
              scale: 1,
              duration: 2.5,
              ease: "expo.out",
              scrollTrigger: {
                trigger: section,
                start: "top 80%",
                toggleActions: "play none none none"
              }
            }
          );
        }

        // 2. INNER PARALLAX REVEAL (Independent Image Movement)
        if (imageInner) {
          gsap.to(imageInner, {
            y: -40,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: true
            }
          });
        }

        // 3. Staggered Content Reveal
        if (content) {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top 75%",
              toggleActions: "play none none none"
            }
          });

          if (title) {
            tl.fromTo(title, 
              { opacity: 0, x: isReverse ? -40 : 40, skewX: isReverse ? 5 : -5 },
              { opacity: 1, x: 0, skewX: 0, duration: 1.6, ease: "expo.out" }
            );
          }

          if (text) {
            const children = Array.from(text.children);
            tl.fromTo(children, 
              { opacity: 0, y: 20, filter: "blur(4px)" },
              { 
                opacity: 1, 
                y: 0, 
                filter: "blur(0px)",
                duration: 1.2, 
                stagger: 0.12, 
                ease: "power3.out" 
              },
              "-=1.2"
            );
          }
        }
      });

      // Unified Reveal for Access & News (Cards)
      gsap.from(".news-card", {
        opacity: 0,
        y: 40,
        duration: 1.5,
        stagger: 0.1,
        ease: "expo.out",
        scrollTrigger: {
          trigger: ".news-grid",
          start: "top 85%"
        }
      });

      gsap.from(".access-reveal", {
        opacity: 0,
        y: 60,
        duration: 2,
        ease: "expo.out",
        scrollTrigger: {
          trigger: ".access-reveal",
          start: "top 90%"
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-transparent text-white selection:bg-[var(--color-accent-main)] selection:text-black">
      <Hero />

      {/* --- 1. Concept Section --- */}
      <section id="concept" className="reveal-section reverse relative w-full py-40 md:py-72 px-6 overflow-hidden border-b border-white/5 bg-transparent">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 md:gap-32 items-center">
          {/* Image Left */}
          <div className="order-1 flex justify-center md:justify-start">
            <div className="reveal-image relative w-full max-w-[500px] aspect-square overflow-hidden rounded-sm group shadow-[0_0_80px_rgba(0,0,0,0.8)] border border-white/10">
               <div className="reveal-image-inner relative w-full h-full scale-110">
                  <Image src="/images/bar/CONCEPT.jpg" alt="Bar Sally Concept" fill className="object-cover" sizes="(max-width: 768px) 100vw, 500px" />
               </div>
               <div className="absolute inset-0 border border-[var(--color-accent-main)]/10 group-hover:border-[var(--color-accent-main)]/30 transition-colors duration-1000 pointer-events-none" />
            </div>
          </div>
          {/* Text Right */}
          <div className="reveal-content order-2 relative z-10">
            <h2 className="reveal-title font-cinzel text-5xl md:text-7xl tracking-[0.35em] mb-16 text-[var(--color-accent-main)] uppercase text-shadow-lg">Concept</h2>
            <div className="reveal-text font-noto-serif font-bold text-base md:text-lg text-white leading-loose md:leading-[2.5] tracking-wide space-y-10 break-keep text-shadow-md">
              <p>1978年の創業以来、大和郡山の人々に愛され続けてきた Bar Sally。</p>
              <p>奈良の木材をふんだんに使用した、温かく重厚な空間。<br className="hidden md:block" />そこはまるで、古き良き時代から時が止まったかのような、大人のためのサンクチュアリ。</p>
              <p>「人とのつながり」と「出会い」を大切に。<br className="hidden md:block" />今宵も最高の一杯をご用意して、皆様のお越しをお待ちしております。</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- 2. Menu Section --- */}
      <section id="menu" className="reveal-section reverse relative w-full py-40 md:py-72 px-6 overflow-hidden bg-transparent border-b border-white/5">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 md:gap-32 items-center text-shadow-sm">
          {/* Text Left */}
          <div className="reveal-content order-2 md:order-1">
             <h2 className="reveal-title font-cinzel text-5xl md:text-7xl tracking-[0.25em] mb-12 text-shadow-lg text-[var(--color-accent-main)]">Menu</h2>
             <div className="reveal-text font-shippori text-base md:text-2xl text-gray-200 leading-[2.5] tracking-[0.15em]">
                <div className="space-y-4">
                  <p className="flex items-center gap-6">
                    <span className="text-white text-sm font-cinzel tracking-widest uppercase opacity-70">Night</span>
                    <span>1,500円～</span>
                  </p>
                  <p className="flex flex-col gap-2 pt-8">
                    <span className="text-white text-sm font-cinzel tracking-widest uppercase opacity-70 mb-2">Table Charge</span>
                    <span className="text-lg md:text-xl">男性 1,000円 / 女性 500円</span>
                  </p>
                </div>
                <div className="mt-20">
                  <Link href="/menu" className="inline-block border border-[var(--color-accent-main)]/50 hover:border-[var(--color-accent-main)] px-16 py-6 font-cinzel text-sm tracking-[0.4em] text-[var(--color-accent-main)] hover:bg-[var(--color-accent-main)] hover:text-black transition-all duration-1000 uppercase glass-panel shadow-xl">Explore Full Menu</Link>
                </div>
             </div>
          </div>
          {/* Image Right */}
          <div className="order-1 md:order-2 flex justify-center md:justify-end">
            <div className="reveal-image relative aspect-square w-full max-w-[500px] overflow-hidden rounded-sm group shadow-[0_0_100px_rgba(0,0,0,1)] border border-white/10">
               <div className="reveal-image-inner relative w-full h-full">
                  <Image 
                    src="/images/bar/menu.jpg" 
                    alt="Bar Sally Menu" 
                    fill 
                    className="object-cover" 
                    sizes="(max-width: 768px) 100vw, 500px"
                    priority
                  />
               </div>
               <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-1000" />
            </div>
          </div>
        </div>
      </section>

      {/* --- 3. Master Section --- */}
      <section id="master" className="reveal-section reverse relative w-full py-40 md:py-72 px-6 bg-black/10 backdrop-blur-md border-y border-white/5">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 md:gap-32 items-center">
          <div className="flex justify-center md:justify-start">
             <div className="reveal-image relative w-full max-w-[500px] aspect-square overflow-hidden rounded-sm group shadow-[0_0_80px_rgba(0,0,0,0.8)] border border-white/10">
                <div className="reveal-image-inner relative w-full h-full scale-110">
                   <Image src={profile.image?.url || "/images/master2.png"} alt={profile.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 500px" />
                </div>
                <div className="absolute inset-0 border border-[var(--color-accent-main)]/10 group-hover:border-[var(--color-accent-main)]/30 transition-colors duration-1000 pointer-events-none" />
             </div>
          </div>
          <div className="reveal-content relative z-10">
            <h2 className="reveal-title font-cinzel text-5xl md:text-7xl tracking-[0.35em] mb-16 text-[var(--color-accent-main)] uppercase text-shadow-lg">Master</h2>
            <div className="reveal-text font-noto-serif font-bold space-y-10 text-shadow-md">
               <h3 className="text-4xl md:text-5xl text-white tracking-[0.1em] mb-6">{profile.name} {profile.englishName}</h3>
               <div className="text-base md:text-lg text-gray-300 leading-loose tracking-widest space-y-8">
                 <p className="border-l-4 border-[var(--color-accent-main)] pl-8 py-1">
                   {profile.role}
                 </p>
                 <div className="pl-8 opacity-90 font-medium space-y-2">
                    <p>奈良繋ぎ人.ブランドプロデューサー</p>
                    <p>ご縁ジニア / 奈良のヒト.モノ.コト<br />おまかせください！</p>
                 </div>
               </div>
               <div className="pt-12">
                  <Link href="/master" className="group inline-flex items-center gap-8 font-cinzel text-sm tracking-[0.4em] uppercase text-[var(--color-accent-main)] overflow-hidden">
                    <span className="relative pb-2">Master&apos;s Story</span>
                    <svg width="24" height="24" className="w-6 h-6 transform group-hover:translate-x-4 transition-transform duration-1000" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
               </div>
            </div>
          </div>
        </div>
      </section>

      <section id="gallery" className="relative w-full py-40 bg-transparent overflow-hidden border-t border-white/5 shadow-[inset_0_0_100px_rgba(0,0,0,0.9)]">
        <div className="max-w-[1200px] mx-auto text-center mb-24 px-6">
            <span className="block font-cinzel text-xs tracking-[0.7em] text-[var(--color-accent-main)] uppercase mb-8 opacity-60">Archive</span>
            <h2 className="font-cinzel text-4xl md:text-5xl tracking-[0.35em] text-shadow-lg text-[var(--color-accent-main)] uppercase">Gallery</h2>
        </div>
        <Marquee 
          images={instaPosts.length > 0 ? instaPosts.map(p => p.mediaUrl) : staticGalleryImages} 
          speed={35} 
        />
      </section>

      {/* --- 5. Instagram Integrated Grid (New Section) --- */}
      <section id="instagram" className="reveal-section relative w-full py-40 md:py-64 bg-transparent overflow-hidden border-t border-white/5">
        <div className="max-w-[1200px] mx-auto text-center mb-24 px-6">
          <span className="block font-cinzel text-xs tracking-[0.7em] text-[var(--color-accent-main)] uppercase mb-8 opacity-60">Social</span>
          <h2 className="reveal-title font-cinzel text-4xl md:text-6xl tracking-[0.35em] text-shadow-lg flex items-center justify-center gap-8">
            Instagram
          </h2>
          <p className="mt-8 font-cinzel text-sm tracking-[0.4em] text-white/50 lowercase">@sally_master</p>
        </div>

        <InstagramFeed posts={instaPosts} />
      </section>

      {/* --- 6. Access Section (Heavy Unified Reveal) --- */}
      <section id="access" className="reveal-section access-reveal relative w-full py-40 md:py-80 px-6 bg-transparent border-t border-white/5 shadow-[inset_0_50px_150px_rgba(0,0,0,1)]">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-24 items-start">
           <div className="reveal-content md:sticky md:top-40">
              <span className="block font-cinzel text-xs tracking-[0.6em] text-[var(--color-accent-main)] uppercase mb-10 opacity-60">Location</span>
              <h2 className="reveal-title font-cinzel text-5xl md:text-7xl tracking-[0.25em] mb-24 text-[var(--color-accent-main)] text-shadow-lg">Access</h2>
              <div className="reveal-text font-shippori space-y-16">
                <div className="flex flex-col gap-6"><span className="text-[var(--color-accent-main)] text-[10px] font-cinzel tracking-[0.5em] uppercase opacity-60">Address</span><p className="text-2xl md:text-3xl text-gray-200 tracking-[0.2em] leading-relaxed font-bold">〒639-1160<br/>奈良県大和郡山市北郡山町137-1</p></div>
                <div className="flex flex-col gap-6 border-y border-white/5 py-10"><span className="text-[var(--color-accent-main)] text-[10px] font-cinzel tracking-[0.5em] uppercase opacity-60">Opening Hours</span><p className="text-2xl md:text-3xl text-gray-200 tracking-[0.2em] font-bold">19:00 - Last (月曜定休)</p></div>
                <div className="flex flex-col gap-6"><span className="text-[var(--color-accent-main)] text-[10px] font-cinzel tracking-[0.5em] uppercase opacity-60">Contact</span><p className="text-3xl md:text-4xl text-[var(--color-accent-main)] tracking-[0.1em] font-cinzel font-bold">0743-55-3001</p></div>
                <div className="mt-20 pt-16"><a href="https://maps.google.com/?q=Bar+Sally+%E5%A4%A7%E5%92%8C%E9%83%A1%E5%B1%B1" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-10 text-[var(--color-accent-main)] hover:text-white transition-all"><span className="font-cinzel tracking-[0.5em] text-sm uppercase">Open in Google Maps</span><div className="relative"><svg width="32" height="32" className="w-8 h-8 transform group-hover:translate-x-6 transition-transform duration-1000" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg></div></a></div>
              </div>
           </div>
           <div className="flex justify-center md:justify-end">
             <div className="reveal-image relative aspect-[3/4] w-full max-w-[500px] overflow-hidden rounded-sm group shadow-[0_0_100px_rgba(0,0,0,1)] border border-white/10">
                <div className="reveal-image-inner relative w-full h-full scale-110">
                   <Image src="/images/photo_image1_l.jpg" alt="Bar Sally Entrance" fill className="object-cover opacity-60 grayscale group-hover:scale-110 transition-all duration-2000" sizes="(max-width: 768px) 100vw, 50vw" />
                </div>
                <div className="absolute inset-0 border border-[var(--color-accent-main)]/10 group-hover:border-[var(--color-accent-main)]/30 transition-colors duration-1000 shadow-[inset_0_0_150px_rgba(0,0,0,0.9)]" />
             </div>
           </div>
        </div>
      </section>

      <AestheticBackground />
    </div>
  );
}
