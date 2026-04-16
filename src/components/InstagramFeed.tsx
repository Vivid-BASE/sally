"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { InstagramPost } from "@/lib/instagram";
import Script from "next/script";
import { useState } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const InstagramIcon = ({ className = "", size = 24 }: { className?: string; size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

interface InstagramFeedProps {
  posts: InstagramPost[];
}

export default function InstagramFeed({ posts }: InstagramFeedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [widgetLoaded, setWidgetLoaded] = useState(false);
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    // If no posts after 5 seconds, show fallback widget
    const timer = setTimeout(() => {
      if (posts.length === 0) setShowFallback(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, [posts]);

  useEffect(() => {
    if (!containerRef.current || posts.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.from(".insta-card", {
        opacity: 0,
        y: 40,
        rotateX: 10,
        duration: 2,
        stagger: 0.12,
        ease: "expo.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [posts]);

  const feedId = process.env.NEXT_PUBLIC_BEHOLD_FEED_ID;

  if (posts.length === 0 && !showFallback) {
    return (
      <div className="flex flex-col items-center justify-center py-20 opacity-50">
        <div className="w-10 h-10 border-t-2 border-[var(--color-accent-main)] border-solid rounded-full animate-spin mb-4" />
        <p className="font-cinzel tracking-widest text-xs">Curating Feed...</p>
      </div>
    );
  }

  if (showFallback || posts.length === 0) {
    if (!feedId) {
      return (
        <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
          <InstagramIcon className="mb-6 text-[var(--color-accent-main)] opacity-50" size={48} />
          <p className="font-cinzel tracking-[0.2em] text-xs text-white/40 mb-2">Connect your Instagram Feed</p>
          <p className="text-[10px] text-white/30 font-shippori leading-relaxed max-w-xs">
            NEXT_PUBLIC_BEHOLD_FEED_ID が設定されていません。管理画面で設定後、再デプロイしてください。
          </p>
        </div>
      );
    }
    return (
      <div className="w-full px-4 min-h-[400px] relative">
        <Script 
          src="https://w.behold.so/widget.js" 
          type="module" 
          onLoad={() => setWidgetLoaded(true)}
        />
        {/* @ts-ignore - custom element behold-widget defined in src/types/custom-elements.d.ts */}
        {feedId && <behold-widget feed-id={feedId}></behold-widget>}
        {!widgetLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-t-2 border-[var(--color-accent-main)] border-solid rounded-full animate-spin" />
          </div>
        )}
      </div>
    );
  }

  return (
    <div ref={containerRef} className="w-full">
      <div className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 px-4">
        {posts.slice(0, 4).map((post) => {
          const displayUrl = post.mediaType === 'VIDEO' && post.thumbnailUrl ? post.thumbnailUrl : post.mediaUrl;
          
          return (
            <div 
              key={post.id} 
              className="insta-card group relative aspect-square overflow-hidden rounded-sm border border-white/10 bg-[#0a0a0a]"
            >
              <Image 
                src={displayUrl} 
                alt={post.caption || "Bar Sally Instagram"} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                sizes="(max-width: 768px) 50vw, 300px"
                unoptimized={true}
              />
              
              <a 
                href={post.permalink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20"
              >
                <InstagramIcon className="text-white" size={24} />
              </a>
            </div>
          );
        })}
      </div>

      <div className="mt-24 text-center">
        <a 
          href="https://www.instagram.com/sally_master/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="group inline-flex items-center gap-6 border border-[var(--color-accent-main)]/40 hover:border-[var(--color-accent-main)] px-16 py-6 font-cinzel text-sm tracking-[0.5em] text-[var(--color-accent-main)] hover:bg-[var(--color-accent-main)] hover:text-black transition-all duration-1000 uppercase glass-panel shadow-2xl relative overflow-hidden"
        >
          <span className="relative z-10">Connect on Instagram</span>
          <div className="absolute inset-0 bg-[var(--color-accent-main)] translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-expo" />
        </a>
      </div>
    </div>
  );
}
