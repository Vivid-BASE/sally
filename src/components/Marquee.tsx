"use client";

import Image from "next/image";

interface MarqueeProps {
  images: string[];
  speed?: number; // Duration in seconds
  reverse?: boolean;
}

export default function Marquee({ images, speed = 40, reverse = false }: MarqueeProps) {
  // Duplicate images for seamless loop
  const displayImages = [...images, ...images];

  return (
    <div className="relative w-full overflow-hidden py-10">
      <div 
        className={`flex w-max gap-4 px-2 ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}
        style={{ animationDuration: `${speed}s` }}
      >
        {displayImages.map((src, index) => (
          <div 
            key={index} 
            className="relative w-[300px] md:w-[450px] aspect-[4/3] flex-shrink-0 overflow-hidden rounded-sm group shadow-2xl"
          >
            <Image
              src={src}
              alt={`Gallery image ${index + 1}`}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[0.2] group-hover:grayscale-0"
              sizes="(max-width: 768px) 300px, 450px"
            />
            <div className="absolute inset-0 border border-white/5 pointer-events-none" />
          </div>
        ))}
      </div>

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee {
          animation: marquee linear infinite;
        }
        .animate-marquee-reverse {
          animation: marquee-reverse linear infinite;
        }
      `}</style>
    </div>
  );
}
