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


           <div className="space-y-32">
              {categories.map((cat, idx) => (
                <div key={idx} className="fade-up">
                  <div className="flex items-center gap-6 mb-12">
                    <h2 className="font-cinzel text-2xl tracking-[0.2em] text-[var(--color-accent-main)] uppercase">{cat}</h2>
                    <div className="flex-1 h-[1px] bg-[var(--color-accent-main)]/20" />
                  </div>
                  
                  <div className="grid grid-cols-1 gap-12">
                    {menuItems.filter(item => item.category === cat).map((item) => (
                        <div key={item.id} className="flex flex-col md:flex-row md:items-start justify-between border-b border-white/5 pb-10 group">
                           <div className="flex-1">
                              <h3 className="font-shippori text-xl md:text-2xl text-white group-hover:text-[var(--color-accent-main)] transition-colors duration-500 mb-4">{item.name}</h3>
                              {item.description && (
                                <div 
                                  className="font-shippori text-sm text-gray-500 leading-[2] tracking-wider max-w-2xl
                                    [&_a]:text-[var(--color-accent-main)] [&_a]:underline [&_a]:underline-offset-4
                                    [&_a:hover]:opacity-70 [&_a]:transition-opacity"
                                  dangerouslySetInnerHTML={{
                                    __html: item.description.includes('<')
                                      ? item.description
                                      : item.description
                                          .split('\n')
                                          .map(line => `<p>${line}</p>`)
                                          .join('')
                                  }}
                                />
                              )}
                           </div>
                           <div className="mt-6 md:mt-2 font-cinzel text-xl md:text-2xl text-white text-right md:min-w-[120px]">
                              {item.price}
                           </div>
                        </div>
                    ))}
                  </div>
                </div>
              ))}
           </div>

        <footer className="text-center text-gray-500 font-shippori text-xs tracking-widest fade-up pt-12 border-t border-white/5 mt-32">
           <p>※ 表示価格は税込価格です。別途チャージ料金を頂戴しております。</p>
           <p className="mt-4 text-[var(--color-accent-main)] opacity-70">詳細なメニューは店舗にてご確認ください。</p>
        </footer>
      </div>
    </div>
  );
}
