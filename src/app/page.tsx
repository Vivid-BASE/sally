"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import { client, NewsContent } from "@/lib/microcms";

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

const mockNews = [
  { img: "/images/bar/photo_image4_l.jpg", title: "Bar Night", delay: 0 },
  { img: "/images/photo/LINE_ALBUM_sally宣材_260410_53.jpg", title: "Event", delay: 0.1 },
  { img: "/images/curry/curry.jpg", title: "Nara Shikanai Curry", delay: 0.2 },
  { img: "/images/photo/LINE_ALBUM_sally宣材_260410_42.jpg", title: "Community", delay: 0.3 },
];

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [news, setNews] = useState<any[]>(mockNews);

  useEffect(() => {
    // Attempt to fetch from microCMS
    const fetchNews = async () => {
      try {
        const res = await client.get({ endpoint: 'news', queries: { limit: 4 } });
        if (res.contents && res.contents.length > 0) {
          setNews(res.contents.map((item: NewsContent, index: number) => ({
            img: item.image?.url || "/images/photo_image4_l.jpg",
            title: item.title,
            delay: index * 0.1
          })));
        }
      } catch (e) {
        console.log("microCMS fetch failed or keys missing, using mock data.");
      }
    };
    fetchNews();
  }, []);

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
  }, [news]); // Re-run animations if news items change

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !textRefs.current.includes(el)) {
      textRefs.current.push(el);
    }
  };

  return (
    <div ref={containerRef} className="bg-black text-white selection:bg-[var(--color-accent-main)] selection:text-black">
      <Hero />

      {/* --- Concept Section --- */}
      <section className="relative w-full py-32 md:py-48 px-6 overflow-hidden border-b border-white/5">
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
             <div className="absolute inset-0 border border-[var(--color-accent-main)]/20 shadow-[inset_0_0_50px_rgba(0,0,0,0.8)] pointer-events-none" />
          </div>
        </div>
      </section>

      {/* --- Master Section --- */}
      <section className="relative w-full py-32 md:py-48 px-6 bg-[#080808]">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
          {/* Image */}
          <div className="relative h-[60vh] md:h-[90vh] w-full overflow-hidden rounded-sm order-1" ref={addToRefs}>
             <div className="absolute inset-0 w-full h-[110%] -top-[5%]">
                <Image 
                  src="/images/1703_sally_sub-thumb-155xauto-13893.jpg" 
                  alt="Master Yutaka Nitta" 
                  fill 
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-1000 parallax-img"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
             </div>
             <div className="absolute inset-0 border border-[var(--color-accent-main)]/30 mix-blend-overlay pointer-events-none" />
          </div>

          {/* Text */}
          <div className="relative z-10 order-2" ref={addToRefs}>
            <span className="block font-cinzel text-xs tracking-[0.3em] text-[var(--color-accent-main)] uppercase mb-6">Profile</span>
            <h2 className="font-cinzel text-3xl md:text-5xl tracking-[0.15em] mb-12">
               Master <br />
               <span className="text-[var(--color-accent-main)]">Yutaka Nitta</span>
            </h2>
            
            <div className="font-shippori text-sm md:text-base text-gray-300 leading-[2.2] tracking-widest space-y-8">
              <p className="border-l-2 border-[var(--color-accent-main)]/50 pl-6">
                ならしか 代表 / Bar Sally 2代目Master<br />
                株式会社a-３なら創楽 実行委員長<br />
                なら３９project 事務局長<br />
                盛経塾大和 世話人
              </p>
              <p className="italic text-white">
                「人とのつながり」と「出会い」を大切に。<br />
                今宵も最高の一杯と空間をご用意して、皆様のお越しをお待ちしております。
              </p>
            </div>

            <div className="mt-16">
               <Link href="/master" className="group inline-flex items-center gap-4 font-cinzel text-sm tracking-[0.2em] uppercase text-[var(--color-accent-main)] overflow-hidden">
                 <span className="relative">
                   Master&apos;s Story
                   <span className="absolute bottom-0 left-0 w-full h-[1px] bg-current transform translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                 </span>
                 <svg className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                 </svg>
               </Link>
            </div>
          </div>
        </div>
      </section>

      {/* --- Special Menu Section --- */}
      <section className="relative w-full py-32 md:py-48 px-6 overflow-hidden">
        <div className="max-w-[1200px] mx-auto text-center mb-24" ref={addToRefs}>
            <span className="block font-cinzel text-xs tracking-[0.3em] text-[var(--color-accent-main)] uppercase mb-6">Signature Dish</span>
            <h2 className="font-cinzel text-3xl md:text-5xl tracking-[0.15em]">Special Menu</h2>
        </div>

        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
          <div className="order-2 md:order-1" ref={addToRefs}>
             <h3 className="font-shippori text-2xl md:text-3xl tracking-[0.1em] text-[var(--color-accent-main)] mb-8">Nara Shikanai Curry</h3>
             <p className="font-shippori text-sm md:text-base text-gray-300 leading-[2.5] tracking-widest text-justify">
                奈良のカレーグランプリでチャンピオンに輝いた逸品。<br />
                バーならではのこだわりが詰まった、お酒の締めにも最適な味わいです。<br />
                スパイスの香りと深いコクが、夜の余韻をさらに深めます。
             </p>
             <div className="mt-12">
                <Link href="/menu" className="inline-block border border-[var(--color-accent-main)]/30 hover:border-[var(--color-accent-main)] px-10 py-4 font-cinzel text-sm tracking-[0.2em] text-[var(--color-accent-main)] transition-all duration-500 uppercase">
                  View Full Menu
                </Link>
             </div>
          </div>
          <div className="order-1 md:order-2 relative aspect-[4/3] w-full overflow-hidden rounded-sm" ref={addToRefs}>
              <Image 
                src="/images/curry/curry.jpg" 
                alt="Nara Shikanai Curry" 
                fill 
                className="object-cover parallax-img"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-black/20" />
          </div>
        </div>
      </section>

      {/* --- Gallery Marquee --- */}
      <section className="relative w-full py-20 bg-[#050505] overflow-hidden">
        <div className="max-w-[1200px] mx-auto text-center mb-16 px-6" ref={addToRefs}>
            <span className="block font-cinzel text-xs tracking-[0.3em] text-[var(--color-accent-main)] uppercase mb-4">Atmosphere</span>
            <h2 className="font-cinzel text-2xl md:text-3xl tracking-[0.2em]">Gallery</h2>
        </div>
        <Marquee images={galleryImages} speed={50} />
      </section>

      {/* --- Latest Activities & Instagram --- */}
      <section className="relative w-full py-32 px-6">
        <div className="max-w-[1200px] mx-auto text-center" ref={addToRefs}>
          <span className="block font-cinzel text-xs tracking-[0.3em] text-[var(--color-accent-main)] uppercase mb-6">Latest Updates</span>
          <h2 className="font-cinzel text-3xl md:text-4xl tracking-[0.15em] mb-20 flex items-center justify-center gap-4">
            <InstagramIcon className="text-[var(--color-accent-main)]" size={32} />
            Instagram & News
          </h2>
        </div>

        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 px-4">
          {news.map((item, index) => (
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
                <span className="font-cinzel tracking-widest text-sm text-white uppercase text-center px-4">{item.title}</span>
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

      {/* --- Access Section --- */}
      <section className="relative w-full py-32 md:py-48 px-6 bg-[#080808]">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
           <div ref={addToRefs}>
              <span className="block font-cinzel text-xs tracking-[0.3em] text-[var(--color-accent-main)] uppercase mb-6">Information</span>
              <h2 className="font-cinzel text-3xl md:text-5xl tracking-[0.15em] mb-12 text-[var(--color-accent-main)]">Access</h2>
              
              <div className="font-shippori space-y-10">
                <div className="flex flex-col gap-2">
                   <span className="text-[var(--color-accent-main)] text-xs font-cinzel tracking-widest uppercase">Address</span>
                   <p className="text-lg md:text-xl text-gray-200 tracking-wider">
                      〒639-1160 奈良県大和郡山市北郡山町137-1
                   </p>
                </div>
                <div className="flex flex-col gap-2">
                   <span className="text-[var(--color-accent-main)] text-xs font-cinzel tracking-widest uppercase">Opening Hours</span>
                   <p className="text-lg md:text-xl text-gray-200 tracking-wider">
                      19:00 - Last (月曜定休)
                   </p>
                </div>
                <div className="flex flex-col gap-2">
                   <span className="text-[var(--color-accent-main)] text-xs font-cinzel tracking-widest uppercase">Contact</span>
                   <p className="text-lg md:text-xl text-[var(--color-accent-main)] tracking-wider">
                      0743-55-3001
                   </p>
                </div>
                <div className="mt-12">
                   <a 
                     href="https://maps.google.com/?q=Bar+Sally+大和郡山" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="inline-flex items-center gap-4 text-[var(--color-accent-main)] hover:text-white transition-colors group"
                   >
                     <span className="font-cinzel tracking-[0.2em] uppercase">View on Google Maps</span>
                     <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                     </svg>
                   </a>
                </div>
              </div>
           </div>

           {/* Access Image / Simple Map Placeholder */}
           <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm" ref={addToRefs}>
               <Image 
                 src="/images/photo_image1_l.jpg" 
                 alt="Bar Sally Entrance" 
                 fill 
                 className="object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-1000"
                 sizes="(max-width: 768px) 100vw, 50vw"
               />
               <div className="absolute inset-0 border border-[var(--color-accent-main)]/20 shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]" />
           </div>
        </div>
      </section>

    </div>
  );
}
