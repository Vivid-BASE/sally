"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const menuItems = [
  { category: "Signature", name: "Nara Shikanai Curry", price: "¥1,200", desc: "奈良のカレーグランプリ優勝作品" },
  { category: "Whisky", name: "Single Malt Selection", price: "¥1,000 ~", desc: "厳選されたシングルモルト" },
  { category: "Cocktail", name: "Standard Cocktails", price: "¥800 ~", desc: "お好みに合わせた一杯を" },
];

export default function MenuPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".fade-up", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out"
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="pt-32 pb-24 px-6 md:px-12 bg-black min-h-screen">
      <div className="max-w-[1000px] mx-auto">
        <header className="mb-24 text-center fade-up">
           <span className="block font-cinzel text-xs tracking-[0.4em] text-[var(--color-accent-main)] uppercase mb-4">Menu & Price</span>
           <h1 className="font-cinzel text-4xl md:text-6xl tracking-[0.2em] mb-8">Menu</h1>
           <div className="w-20 h-[1px] bg-[var(--color-accent-main)] mx-auto opacity-50" />
        </header>

        <section className="mb-24 fade-up">
           <div className="relative aspect-[21/9] w-full mb-16 overflow-hidden rounded-sm">
              <Image 
                src="/images/curry/curry.jpg" 
                alt="Signature Menu" 
                fill 
                className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              />
           </div>

           <div className="space-y-16">
              {menuItems.map((item, i) => (
                <div key={i} className="flex justify-between items-end border-b border-white/10 pb-6 group">
                   <div>
                      <span className="block font-cinzel text-[10px] tracking-[0.3em] text-[var(--color-accent-main)] uppercase mb-2">{item.category}</span>
                      <h3 className="font-shippori text-xl md:text-2xl text-white group-hover:text-[var(--color-accent-main)] transition-colors">{item.name}</h3>
                      <p className="font-shippori text-sm text-gray-500 mt-2">{item.desc}</p>
                   </div>
                   <div className="font-cinzel text-xl text-white">
                      {item.price}
                   </div>
                </div>
              ))}
           </div>
        </section>

        <footer className="text-center text-gray-500 font-shippori text-xs tracking-widest fade-up pt-12">
           <p>※ 表示価格は税込価格です。別途チャージ料金を頂戴しております。</p>
           <p className="mt-2 text-[var(--color-accent-main)]">詳細なメニューは店舗にてご確認ください。</p>
        </footer>
      </div>
    </div>
  );
}
