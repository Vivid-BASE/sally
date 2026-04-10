"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { MenuContent } from "@/lib/microcms";

type MenuViewProps = {
  menuItems: MenuContent[];
};

export default function MenuView({ menuItems }: MenuViewProps) {
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
  }, [menuItems]);

  // Group items by category
  const categories = Array.from(new Set(menuItems.map(item => item.category)));

  return (
    <div ref={containerRef} className="pt-32 pb-24 px-6 md:px-12 bg-black min-h-screen">
      <div className="max-w-[1000px] mx-auto">
        <header className="mb-24 text-center fade-up">
           <span className="block font-cinzel text-xs tracking-[0.4em] text-[var(--color-accent-main)] uppercase mb-4">Menu & Price</span>
           <h1 className="font-cinzel text-4xl md:text-6xl tracking-[0.2em] mb-8">Menu</h1>
           <div className="w-20 h-[1px] bg-[var(--color-accent-main)] mx-auto opacity-50" />
        </header>

        <section className="mb-24 fade-up">
           <div className="relative aspect-[21/9] w-full mb-24 overflow-hidden rounded-sm">
              <Image 
                src="/images/curry/curry.jpg" 
                alt="Signature Menu" 
                fill 
                className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                priority
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute inset-0 flex items-center justify-center">
                 <h2 className="font-cinzel text-2xl md:text-4xl tracking-[0.3em] text-white uppercase drop-shadow-2xl">Selected Collections</h2>
              </div>
           </div>

           <div className="space-y-32">
              {categories.map((cat, idx) => (
                <div key={idx} className="fade-up">
                  <div className="flex items-center gap-6 mb-12">
                    <h2 className="font-cinzel text-2xl tracking-[0.2em] text-[var(--color-accent-main)] uppercase">{cat}</h2>
                    <div className="flex-1 h-[1px] bg-[var(--color-accent-main)]/20" />
                  </div>
                  
                  <div className="grid grid-cols-1 gap-12">
                    {menuItems.filter(item => item.category === cat).map((item) => (
                      <div key={item.id} className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/5 pb-8 group">
                         <div className="flex-1">
                            <h3 className="font-shippori text-xl md:text-2xl text-white group-hover:text-[var(--color-accent-main)] transition-colors duration-500">{item.name}</h3>
                            {item.description && (
                              <p className="font-shippori text-sm text-gray-500 mt-3 leading-relaxed tracking-wider max-w-2xl">{item.description}</p>
                            )}
                         </div>
                         <div className="mt-4 md:mt-0 font-cinzel text-xl md:text-2xl text-white text-right">
                            {item.price}
                         </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
           </div>
        </section>

        <footer className="text-center text-gray-500 font-shippori text-xs tracking-widest fade-up pt-12 border-t border-white/5 mt-32">
           <p>※ 表示価格は税込価格です。別途チャージ料金を頂戴しております。</p>
           <p className="mt-4 text-[var(--color-accent-main)] opacity-70">詳細なメニューは店舗にてご確認ください。</p>
        </footer>
      </div>
    </div>
  );
}
