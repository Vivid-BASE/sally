"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ProfileContent } from "@/lib/microcms";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import AestheticBackground from "./AestheticBackground";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type HomeViewProps = {
  news: {
    img: string;
    title: string;
    delay: number;
  }[];
  profile: ProfileContent;
};

const InstagramIcon = ({ className = "", size = 24 }: { className?: string; size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const galleryImages = [
  "/images/photo_image3_l.jpg",
  "/images/photo_image4_l.jpg",
  "/images/320x320_rect_6e44d35aa2dffcc94b4d7b787e49f124.jpg",
  "/images/79155427_3106792099350824_8629136699835809792_n.jpg",
  "/images/117236925_3744322492264445_8705478074068095151_n.jpg",
  "/images/117335765_3744322478931113_3807033421426319937_n.jpg",
  "/images/72691422_2987949857901716_5146671822036533248_n.jpg",
  "/images/101195328_3540812025948827_5725311338234773504_n.jpg",
  "/images/117040332_3744323535597674_8103100777321416032_n.jpg",
  "/images/99299332_3540811972615499_7490206605246464000_n.jpg",
];

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
            const children = Array.from(text.children);
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

      // Staggered News Cards (Instagram Grid)
      gsap.from(".news-card", {
        opacity: 0,
        y: 40,
        duration: 1.5,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".news-grid",
          start: "top 80%"
        }
      });

      // Special handling for Access section
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

      {/* --- 1. Concept Section --- */}
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

      {/* --- 2. Master Section (Restored Correct Context/Styling) --- */}
      <section className="reveal-section reverse relative w-full py-40 md:py-64 px-6 bg-black/5 backdrop-blur-sm shadow-[inset_0_0_100px_rgba(0,0,0,0.5)]">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 md:gap-32 items-center">
          <div className="flex justify-center md:justify-start">
             <div className="reveal-image relative w-full max-w-[450px] aspect-square overflow-hidden rounded-sm group shadow-2xl border border-white/10">
                <Image src={profile.image?.url || "/images/master2.png"} alt={profile.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 450px" />
                <div className="absolute inset-0 border border-[var(--color-accent-main)]/10 group-hover:border-[var(--color-accent-main)]/30 transition-colors duration-1000 pointer-events-none" />
             </div>
          </div>
          <div className="reveal-content relative z-10">
            <h2 className="reveal-title font-cinzel text-4xl md:text-6xl tracking-[0.3em] mb-12 text-[var(--color-accent-main)] uppercase shadow-sm">Master</h2>
            
            <div className="reveal-text font-noto-serif font-bold space-y-8 text-shadow-sm">
               <h3 className="text-3xl md:text-4xl text-white tracking-[0.1em] mb-4">{profile.name} {profile.englishName}</h3>
               <div className="text-base md:text-lg text-gray-300 leading-loose tracking-widest space-y-6">
                 <p className="border-l-2 border-[var(--color-accent-main)] pl-6">
                   {profile.role}
                 </p>
                 <div className="pl-6 opacity-90 font-medium">
                    <p>奈良繋ぎ人.ブランドプロデューサー</p>
                    <p>ご縁ジニア / 奈良のヒト.モノ.コト<br />おまかせください！</p>
                 </div>
               </div>
               
               <div className="pt-8">
                  <Link href="/master" className="group inline-flex items-center gap-6 font-cinzel text-sm tracking-[0.3em] uppercase text-[var(--color-accent-main)] overflow-hidden">
                    <span className="relative pb-2">
                      Master&apos;s Story
                      <span className="absolute bottom-0 left-0 w-full h-[1px] bg-current transform translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-700 ease-out" />
                    </span>
                    <svg width="20" height="20" className="w-5 h-5 transform group-hover:translate-x-3 transition-transform duration-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- 3. Special Menu Section (Restored Curry) --- */}
      <section className="reveal-section relative w-full py-40 md:py-64 px-6 overflow-hidden bg-transparent">
        <div className="max-w-[1200px] mx-auto text-center mb-32">
            <span className="block font-cinzel text-xs tracking-[0.5em] text-[var(--color-accent-main)] uppercase mb-8">Signature Selection</span>
            <h2 className="reveal-title font-cinzel text-4xl md:text-6xl tracking-[0.2em] text-shadow-sm">Special Menu</h2>
        </div>

        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 md:gap-32 items-center text-shadow-sm">
          <div className="reveal-content order-2 md:order-1">
             <h3 className="reveal-title font-shippori text-3xl md:text-4xl tracking-[0.15em] text-[var(--color-accent-main)] mb-10">Nara Shikanai Curry</h3>
             <div className="reveal-text font-shippori text-base md:text-lg text-gray-300 leading-[2.8] tracking-widest text-justify">
                <p>
                  奈良のカレーグランプリでチャンピオンに輝いた逸品。<br />
                  バーならではのこだわりが詰まった、お酒の締めにも最適な味わいです。<br />
                  スパイスの香りと深いコクが、夜の余韻をさらに深めます。
                </p>
                <div className="mt-16">
                  <Link href="/menu" className="inline-block border border-[var(--color-accent-main)]/40 hover:border-[var(--color-accent-main)] px-12 py-5 font-cinzel text-sm tracking-[0.3em] text-[var(--color-accent-main)] hover:bg-[var(--color-accent-main)] hover:text-black transition-all duration-700 uppercase glass-panel">
                    Explore Full Menu
                  </Link>
                </div>
             </div>
          </div>
          <div className="order-1 md:order-2 flex justify-center md:justify-end">
            <div className="reveal-image relative aspect-[4/3] w-full max-w-[550px] overflow-hidden rounded-sm group shadow-2xl border border-white/5">
                <Image src="/images/curry/curry.jpg" alt="Nara Shikanai Curry" fill className="object-cover" sizes="(max-width: 768px) 100vw, 450px" />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors duration-1000" />
            </div>
          </div>
        </div>
      </section>

      {/* --- 4. Gallery Marquee (Restored) --- */}
      <section id="gallery" className="relative w-full py-24 bg-transparent overflow-hidden border-y border-white/5">
        <div className="max-w-[1200px] mx-auto text-center mb-20 px-6">
            <span className="block font-cinzel text-xs tracking-[0.5em] text-[var(--color-accent-main)] uppercase mb-6">Archive</span>
            <h2 className="font-cinzel text-3xl md:text-4xl tracking-[0.3em] text-shadow-sm">Gallery</h2>
        </div>
        <Marquee images={galleryImages} speed={40} />
      </section>

      {/* --- 5. Latest Updates & Instagram (Connect Section) --- */}
      <section className="relative w-full py-40 px-6 bg-black/10">
        <div className="max-w-[1200px] mx-auto text-center mb-20">
          <span className="block font-cinzel text-xs tracking-[0.5em] text-[var(--color-accent-main)] uppercase mb-8">Latest Updates</span>
          <h2 className="font-cinzel text-3xl md:text-5xl tracking-[0.2em] flex items-center justify-center gap-6">
            <InstagramIcon className="text-[var(--color-accent-main)]" size={40} />
            Connect
          </h2>
        </div>

        <div className="news-grid max-w-[1600px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 px-4 overflow-hidden">
          {news.map((item, index) => (
            <div key={index} className="news-card group relative aspect-square overflow-hidden cursor-pointer">
              <Image src={item.img} alt={item.title} fill className="object-cover filter grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 ease-out" sizes="(max-width: 768px) 50vw, 25vw" />
              <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex flex-col items-center justify-center pointer-events-none p-6">
                <InstagramIcon className="text-[var(--color-accent-main)] mb-4" size={28} />
                <span className="font-cinzel tracking-[0.2em] text-xs text-[var(--color-accent-main)] uppercase mb-2">Instagram</span>
                <span className="font-shippori tracking-widest text-sm text-white text-center line-clamp-2">{item.title}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 text-center">
          <a href="https://www.instagram.com/sally_master/" target="_blank" rel="noopener noreferrer" className="inline-block border border-[var(--color-accent-main)] px-14 py-5 font-cinzel text-sm tracking-[0.4em] text-[var(--color-accent-main)] hover:bg-[var(--color-accent-main)] hover:text-black transition-all duration-700 uppercase">
            Visit Instagram
          </a>
        </div>
      </section>

      {/* --- 6. Access Section (Restored Correct Info) --- */}
      <section id="access" className="access-reveal relative w-full py-40 md:py-64 px-6 bg-transparent border-t border-white/5 shadow-[inset_0_20px_100px_rgba(0,0,0,0.8)]">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-24 items-start">
           <div className="md:sticky md:top-40">
              <span className="block font-cinzel text-xs tracking-[0.5em] text-[var(--color-accent-main)] uppercase mb-8">Location</span>
              <h2 className="font-cinzel text-4xl md:text-6xl tracking-[0.2em] mb-20 text-[var(--color-accent-main)]">Access</h2>
              
              <div className="font-shippori space-y-12">
                <div className="flex flex-col gap-4">
                   <span className="text-[var(--color-accent-main)] text-[10px] font-cinzel tracking-[0.4em] uppercase opacity-60">Address</span>
                   <p className="text-xl md:text-2xl text-gray-200 tracking-[0.15em] leading-relaxed">
                      〒639-1160<br/>奈良県大和郡山市北郡山町137-1
                   </p>
                </div>
                <div className="flex flex-col gap-4">
                   <span className="text-[var(--color-accent-main)] text-[10px] font-cinzel tracking-[0.4em] uppercase opacity-60">Opening Hours</span>
                   <p className="text-xl md:text-2xl text-gray-200 tracking-[0.15em]">
                      19:00 - Last (月曜定休)
                   </p>
                </div>
                <div className="flex flex-col gap-4">
                   <span className="text-[var(--color-accent-main)] text-[10px] font-cinzel tracking-[0.4em] uppercase opacity-60">Contact</span>
                   <p className="text-2xl md:text-3xl text-[var(--color-accent-main)] tracking-[0.1em] font-cinzel">
                      0743-55-3001
                   </p>
                </div>
                <div className="mt-16 pt-12 border-t border-white/5">
                   <a 
                     href="https://maps.google.com/?q=Bar+Sally+大和郡山" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="inline-flex items-center gap-8 text-[var(--color-accent-main)] hover:text-white transition-all group"
                   >
                     <span className="font-cinzel tracking-[0.4em] text-sm uppercase">Open in Google Maps</span>
                     <div className="relative">
                        <svg width="24" height="24" className="w-6 h-6 transform group-hover:translate-x-2 transition-transform duration-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                     </div>
                   </a>
                </div>
              </div>
           </div>

           <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm group shadow-2xl border border-white/5">
               <Image 
                 src="/images/photo_image1_l.jpg" 
                 alt="Bar Sally Entrance" 
                 fill 
                 className="object-cover opacity-40 grayscale group-hover:scale-110 transition-all duration-2000"
                 sizes="(max-width: 768px) 100vw, 50vw"
               />
               <div className="absolute inset-0 border border-[var(--color-accent-main)]/10 group-hover:border-[var(--color-accent-main)]/30 transition-colors duration-1000 shadow-[inset_0_0_150px_rgba(0,0,0,0.9)]" />
           </div>
        </div>
      </section>

      <AestheticBackground />
    </div>
  );
}
