"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function ConceptPage() {
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
      <div className="max-w-[1000px] mx-auto">
        <header className="mb-24 text-center fade-up">
           <span className="block font-cinzel text-xs tracking-[0.4em] text-[var(--color-accent-main)] uppercase mb-4">Philosophy</span>
           <h1 className="font-cinzel text-4xl md:text-6xl tracking-[0.2em] mb-8">Concept</h1>
           <div className="w-20 h-[1px] bg-[var(--color-accent-main)] mx-auto opacity-50" />
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-32 fade-up">
           <div className="relative aspect-[3/4] overflow-hidden rounded-sm">
              <Image 
                src="/images/photo_image2_l.jpg" 
                alt="Concept" 
                fill 
                className="object-cover image-sepia"
              />
           </div>
           <div className="font-shippori text-gray-300 leading-relaxed space-y-8 tracking-widest transition-all">
              <p className="text-xl text-white font-cinzel tracking-widest mb-12">Timeless Elegance</p>
              <p>
                1978年の創業以来、大和郡山の人々に愛され続けてきた Bar Sally。
              </p>
              <p>
                奈良の木材をふんだんに使用した、温かく重厚な空間。
                そこはまるで、古き良き時代から時が止まったかのような、大人のためのサンクチュアリ。
              </p>
              <p>
                私たちは、単にお酒を提供する場所ではありません。
                「人とのつながり」と「新しい出会い」が生まれる場所。
                一日の終わりに、自分自身に帰れる場所。
              </p>
              <p>
                カウンター越しに交わされる言葉のひとつひとつが、
                この場所の空気を作り上げています。
              </p>
           </div>
        </div>

        {/* Vision / History Placeholder */}
        <div className="bg-[#080808] p-12 md:p-24 border border-white/5 fade-up">
           <h2 className="font-cinzel text-2xl tracking-[0.2em] text-[var(--color-accent-main)] mb-12 text-center">Our Vision</h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              <div>
                 <span className="block font-cinzel text-3xl mb-4 text-white">01</span>
                 <p className="font-shippori text-sm text-gray-400">Authenticity<br/>伝統と本物の追求</p>
              </div>
              <div>
                 <span className="block font-cinzel text-3xl mb-4 text-white">02</span>
                 <p className="font-shippori text-sm text-gray-400">Hospitality<br/>心からのもてなし</p>
              </div>
              <div>
                 <span className="block font-cinzel text-3xl mb-4 text-white">03</span>
                 <p className="font-shippori text-sm text-gray-400">Connection<br/>人との繋がり</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
