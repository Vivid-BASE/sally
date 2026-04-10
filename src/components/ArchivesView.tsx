"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

type ArchivesViewProps = {
  activities: any[];
};

export default function ArchivesView({ activities }: ArchivesViewProps) {
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
  }, [activities]);

  return (
    <div ref={containerRef} className="pt-32 pb-24 px-6 md:px-12 bg-black min-h-screen">
      <div className="max-w-[1200px] mx-auto">
        <header className="mb-24 text-center fade-up">
           <span className="block font-cinzel text-xs tracking-[0.4em] text-[var(--color-accent-main)] uppercase mb-4">Journey</span>
           <h1 className="font-cinzel text-4xl md:text-6xl tracking-[0.2em] mb-8">Archives</h1>
           <div className="w-20 h-[1px] bg-[var(--color-accent-main)] mx-auto opacity-50" />
        </header>

        {activities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 fade-up">
            {activities.map((item) => (
              <div key={item.id} className="bg-[#080808] border border-white/5 rounded-sm overflow-hidden group">
                 <div className="relative aspect-video overflow-hidden">
                    <Image 
                      src={item.thumbnail?.url} 
                      alt={item.title} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                 </div>
                 <div className="p-8">
                    <span className="text-[var(--color-accent-main)] font-cinzel text-[10px] tracking-[0.2em] uppercase mb-2 block">
                       {new Date(item.publishedAt).toLocaleDateString('ja-JP')}
                    </span>
                    <h3 className="text-xl font-shippori text-white mb-4">{item.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">{item.description}</p>
                 </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-48 fade-up">
             <p className="font-shippori text-gray-500 tracking-widest italic">記録がまだありません。</p>
             <p className="text-xs text-gray-700 mt-4 font-cinzel uppercase tracking-widest text-balance">microCMSにて「活動実績(activities)」を追加するとここに表示されます。</p>
          </div>
        )}
      </div>
    </div>
  );
}
