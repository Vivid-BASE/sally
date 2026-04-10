"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ProfileContent } from "@/lib/microcms";

type MasterViewProps = {
  profile: ProfileContent;
};

export default function MasterView({ profile }: MasterViewProps) {
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
  }, [profile]);

  return (
    <div ref={containerRef} className="pt-32 pb-24 px-6 md:px-12 bg-[#050505] min-h-screen">
      <div className="max-w-[1000px] mx-auto">
        <header className="mb-24 text-center fade-up">
           <span className="block font-cinzel text-xs tracking-[0.4em] text-[var(--color-accent-main)] uppercase mb-4">The Custodian</span>
           <h1 className="font-cinzel text-4xl md:text-6xl tracking-[0.2em] mb-8">Master</h1>
           <div className="w-20 h-[1px] bg-[var(--color-accent-main)] mx-auto opacity-50" />
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start mb-32 fade-up">
           <div className="relative aspect-[3/4] overflow-hidden rounded-sm grayscale hover:grayscale-0 transition-all duration-1000 shadow-2xl">
              <Image 
                src={profile.image?.url || "/images/1703_sally_sub-thumb-155xauto-13893.jpg"} 
                alt={profile.name} 
                fill 
                className="object-cover"
              />
           </div>
           <div className="font-shippori text-gray-300 leading-loose space-y-8 tracking-widest">
              <h2 className="text-3xl text-white font-cinzel tracking-widest mb-4">
                {profile.name} <span className="text-[var(--color-accent-main)]">{profile.englishName}</span>
              </h2>
              <p className="text-sm font-cinzel text-[var(--color-accent-main)] uppercase tracking-[0.3em] mb-8">{profile.role}</p>
              
              <div className="whitespace-pre-wrap space-y-6">
                {profile.bio.split('\n').map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
              
              <div className="pt-8 border-t border-white/5 space-y-2 text-xs text-gray-500">
                <p>ならしか 代表</p>
                <p>株式会社a-３なら創楽 実行委員長</p>
                <p>なら３９project 事務局長</p>
                <p>盛経塾大和 世話人</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
