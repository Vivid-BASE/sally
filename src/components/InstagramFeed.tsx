"use client";

import Image from "next/image";
import { InstagramPost } from "@/lib/instagram";

interface InstagramFeedProps {
  posts: InstagramPost[];
}

const InstagramIcon = ({ className = "", size = 24 }: { className?: string; size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

export default function InstagramFeed({ posts }: InstagramFeedProps) {
  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 opacity-30">
        <div className="w-8 h-8 border-t-2 border-[var(--color-accent-main)] border-solid rounded-full animate-spin mb-4" />
        <p className="font-cinzel tracking-widest text-[10px]">Loading Feed...</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 px-4 overflow-visible">
        {posts.slice(0, 4).map((post) => {
          // Select thumbnail if video, otherwise mediaUrl
          const displayUrl = post.mediaType === 'VIDEO' && post.thumbnailUrl ? post.thumbnailUrl : post.mediaUrl;
          
          return (
            <div 
              key={post.id} 
              className="group relative aspect-square overflow-hidden rounded-sm border border-white/10 bg-black shadow-2xl"
            >
              <Image 
                src={displayUrl} 
                alt={post.caption || "Bar Sally Instagram"} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                sizes="(max-width: 768px) 50vw, 300px"
                unoptimized={true}
              />
              
              {/* Overlay with Link */}
              <a 
                href={post.permalink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20"
              >
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <InstagramIcon className="text-white" size={32} />
                </div>
              </a>
            </div>
          );
        })}
      </div>

      <div className="mt-20 text-center">
        <a 
          href="https://www.instagram.com/sally_master/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="group inline-flex items-center gap-6 border border-[var(--color-accent-main)]/40 hover:border-[var(--color-accent-main)] px-12 py-5 font-cinzel text-xs tracking-[0.4em] text-[var(--color-accent-main)] hover:bg-[var(--color-accent-main)] hover:text-black transition-all duration-700 uppercase"
        >
          View More on Instagram
        </a>
      </div>
    </div>
  );
}
