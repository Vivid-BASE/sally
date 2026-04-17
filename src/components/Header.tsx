"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/#concept', label: 'Concept' },
  { href: '/#menu', label: 'Menu' },
  { href: '/#master', label: 'Master' },
  { href: '/#gallery', label: 'Gallery' },
  { href: '/#instagram', label: 'Instagram' },
  { href: '/#access', label: 'Access' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Lock scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <>
      <header 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${
          isScrolled ? 'bg-black/40 backdrop-blur-xl py-4 border-b border-white/10' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex justify-between items-center">
          
          <Link 
            href="/" 
            className="relative z-50 flex items-center group"
            onClick={(e) => {
              if (pathname === '/') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          >
            {/* Logo Image */}
            <div className="relative w-[180px] h-[50px] transition-transform duration-500 group-hover:scale-105">
              <Image 
                src="/LOGO/png/SALLY.png" 
                alt="Bar Sally Logo" 
                fill 
                className="object-contain brightness-0 invert" 
                priority
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="group relative overflow-hidden">
                <span className="font-cinzel tracking-widest text-sm uppercase text-gray-300 group-hover:text-[var(--color-accent-main)] transition-colors duration-300">
                  {link.label}
                </span>
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[var(--color-accent-main)] transform translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-out" />
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden relative z-50 p-2 text-white hover:text-[var(--color-accent-main)] transition-colors focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "メニューを閉じる" : "メニューを開く"}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {/* Fullscreen Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ type: "spring", bounce: 0, duration: 0.7 }}
            className="fixed inset-0 z-40 bg-[#0f0f0f]/95 backdrop-blur-xl flex flex-col items-center justify-center pt-20"
          >
            <nav className="flex flex-col items-center gap-8 w-full px-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                >
                  <Link 
                    href={link.href} 
                    className="font-cinzel text-3xl tracking-widest text-[var(--color-accent-main)] hover:text-white transition-colors block text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="mt-12 w-full max-w-xs border-t border-[var(--color-accent-main)]/30 pt-8 text-center"
              >
                <p className="font-shippori text-sm text-gray-400 mb-4 tracking-widest">営業時間 19:00 - Last (月曜定休)</p>
                <Link href="/access" className="inline-block border border-[var(--color-accent-main)] px-8 py-3 font-cinzel tracking-widest text-[var(--color-accent-main)] hover:bg-[var(--color-accent-main)] hover:text-black transition-colors duration-300">
                  RESERVE
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
