"use client";

import Link from 'next/link';
import Image from 'next/image';

const InstagramIcon = ({ className = "", size = 24 }: { className?: string; size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const FacebookIcon = ({ className = "", size = 24 }: { className?: string; size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const navLinks = [
  { href: '/#concept', label: 'Concept' },
  { href: '/#menu', label: 'Menu' },
  { href: '/#master', label: 'Master' },
  { href: '/#gallery', label: 'Gallery' },
  { href: '/#instagram', label: 'Instagram' },
  { href: '/#access', label: 'Access' },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#080808] border-t border-[var(--color-accent-main)]/20 pt-16 pb-8 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          
          {/* Brand Info */}
          <div className="flex flex-col items-center text-center">
            <Link href="/" className="mb-6 block">
               <div className="relative w-[200px] h-[55px]">
                  <Image 
                    src="/LOGO/png/SALLY.png" 
                    alt="Bar Sally Logo" 
                    fill 
                    className="object-contain brightness-0 invert" 
                  />
               </div>
            </Link>
            <p className="font-shippori text-sm text-gray-400 leading-loose tracking-wider">
              1978年創業、大和郡山で紡ぐ<br />大人の隠れ家。<br />
              極上の美酒とくつろぎの時間を。
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center text-center">
            <h4 className="font-cinzel tracking-[0.2em] text-[var(--color-accent-main)] mb-6 text-sm">Navigation</h4>
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="font-cinzel text-xs tracking-[0.3em] uppercase text-gray-400 hover:text-[var(--color-accent-main)] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Access & Social */}
          <div className="flex flex-col items-center text-center">
            <h4 className="font-cinzel tracking-[0.2em] text-[var(--color-accent-main)] mb-6 text-sm">Access & Social</h4>
            <address className="not-italic font-shippori text-sm text-gray-400 leading-relaxed tracking-wider mb-6">
              〒639-1160<br />
              奈良県大和郡山市北郡山町137-1<br />
              0743-55-3001<br />
              19:00 - Last (月曜定休)
            </address>
            <div className="flex gap-4 justify-center">
              <a 
                href="https://www.instagram.com/sally_master/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center text-gray-400 hover:text-[var(--color-accent-main)] hover:border-[var(--color-accent-main)] hover:bg-[var(--color-accent-main)]/10 transition-all duration-300"
                aria-label="Instagram"
              >
                <InstagramIcon size={18} />
              </a>
              <a 
                href="https://www.facebook.com/narasally" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center text-gray-400 hover:text-[var(--color-accent-main)] hover:border-[var(--color-accent-main)] hover:bg-[var(--color-accent-main)]/10 transition-all duration-300"
                aria-label="Facebook"
              >
                <FacebookIcon size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Separator */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-800 to-transparent mb-8"></div>

        {/* Copyright & Stealth Link */}
        <div className="flex flex-col items-center gap-2 text-xs font-cinzel text-gray-600 tracking-widest text-center">
          <span>&copy; {new Date().getFullYear()} Bar Sally. All Rights Reserved.</span>
          <span className="hidden md:inline text-gray-700">|</span>
          <a 
            href="https://showtimeboxx.com/creative/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="opacity-20 hover:opacity-70 hover:text-[var(--color-accent-main)] transition-all duration-500 md:mt-0 mt-1"
          >
            Designed by SHOWTIMEBOXX CREATIVE
          </a>
        </div>
      </div>
    </footer>
  );
}
