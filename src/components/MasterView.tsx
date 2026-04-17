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
        <header className="mb-16 text-center fade-up">
           <span className="block font-cinzel text-xs tracking-[0.4em] text-[var(--color-accent-main)] uppercase mb-4">The Custodian</span>
           <h1 className="font-cinzel text-4xl md:text-6xl tracking-[0.2em] mb-6">Master</h1>
           <div className="w-20 h-[1px] bg-[var(--color-accent-main)] mx-auto opacity-50" />
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start mb-24 fade-up">
           <div className="relative aspect-[3/4] overflow-hidden rounded-sm grayscale hover:grayscale-0 transition-all duration-1000 shadow-2xl">
              <Image 
                src={profile.image?.url || "/images/master2.png"}
                alt={profile.name} 
                fill 
                className="object-cover"
              />
           </div>
           <div className="font-shippori text-gray-300 space-y-4 tracking-wider">
              <h2 className="text-3xl text-white font-cinzel tracking-widest mb-2">
                {profile.name} {profile.englishName && <span className="text-[var(--color-accent-main)]">{profile.englishName}</span>}
              </h2>
              <p className="text-sm font-cinzel text-[var(--color-accent-main)] uppercase tracking-[0.3em] mb-6">{profile.role}</p>
              
              {/* microCMSのbioがHTML（リッチテキスト）の場合はそのままレンダリング。
                  管理画面でリンクやbold等を自由に追加できます。
                  プレーンテキストの場合は改行で段落分割されます。 */}
              <div
                className="leading-[2] space-y-3 prose prose-invert prose-sm max-w-none
                  [&_a]:text-[var(--color-accent-main)] [&_a]:underline [&_a]:underline-offset-4
                  [&_a:hover]:opacity-70 [&_a]:transition-opacity"
                dangerouslySetInnerHTML={{
                  __html: profile.bio.includes('<')
                    ? profile.bio
                    : profile.bio
                        .split('\n')
                        .map(line => `<p>${line}</p>`)
                        .join('')
                }}
              />
           </div>
        </div>
      </div>
    </div>
  );
}
