'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-2 left-0 right-0 z-40 px-6 py-4 transition-all duration-300 ${
        scrolled ? 'backdrop-blur-md border-b' : ''
      }`}
      style={{
        backgroundColor: scrolled ? 'rgba(250, 249, 246, 0.8)' : 'transparent',
        borderColor: scrolled ? 'var(--border)' : 'transparent',
      }}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="font-heading font-semibold tracking-widest text-sm">
          AMIR BALDIGA
        </Link>

        <div className="flex gap-8 text-sm font-medium">
          <Link href="/build" className="hover:text-accent transition-colors">
            Build
          </Link>
          <Link href="/magazine" className="hover:text-accent transition-colors">
            Magazine
          </Link>
          <Link href="/contact" className="hover:text-accent transition-colors">
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}
