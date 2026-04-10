"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { client, ProfileContent } from "@/lib/microcms";

const mockProfile: ProfileContent = {
  id: "1",
  name: "新田 豊",
  englishName: "Yutaka Nitta",
  role: "2nd Generation Master",
  bio: `1978年に父が創業した Bar Sally。\n私はその二代目として、この場所を守り続けています。\n\n大和郡山という歴史ある街で、「人」と「人」が交差する瞬間を見守ってきました。\n「ただいまと、言いたくなる場所を目指して」\n\nお酒の知識はもちろんのこと、お客様が何を求めてこの扉を開けたのか。その気持ちに寄り添う最高の一杯を提供することを信条としています。`,
  image: {
    url: "/images/1703_sally_sub-thumb-155xauto-13893.jpg",
    width: 800,
    height: 1000
  },
  createdAt: "",
  updatedAt: "",
  publishedAt: "",
  revisedAt: ""
};

export default function MasterPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [profile, setProfile] = useState<ProfileContent>(mockProfile);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await client.get({ endpoint: 'profile' });
        // Since profile is likely a single object (singleton), microCMS might return it directly or in an array
        if (res.contents && res.contents.length > 0) {
          setProfile(res.contents[0]);
        } else if (res.name) {
          setProfile(res);
        }
      } catch (e) {
        console.log("microCMS profile fetch failed, using mock data.");
      }
    };
    fetchProfile();
  }, []);

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
                src={profile.image.url} 
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

