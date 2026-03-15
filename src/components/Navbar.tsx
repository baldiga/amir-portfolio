'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { href: '/build', label: 'Build' },
    { href: '/magazine', label: 'Magazine' },
    { href: '/cv', label: 'CV' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <nav
      className="fixed top-4 left-0 right-0 z-40 flex justify-center px-6 transition-all duration-300"
    >
      <div
        className="flex items-center gap-8 px-5 py-2.5 rounded-full transition-all duration-300"
        style={{
          backgroundColor: scrolled ? 'rgba(26, 26, 26, 0.92)' : 'rgba(26, 26, 26, 0.82)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: scrolled
            ? '0 8px 32px rgba(0,0,0,0.28), 0 0 0 1px rgba(196,93,62,0.12)'
            : '0 4px 24px rgba(0,0,0,0.18)',
        }}
      >
        <Link href="/" aria-label="Amir Baldiga - Home" className="flex items-center shrink-0">
          <Image
            src="/AmirBaldiga.png"
            alt="Amir Baldiga"
            width={120}
            height={40}
            style={{ width: '120px', height: 'auto', filter: 'brightness(0) invert(1)' }}
            priority
          />
        </Link>

        <div style={{ width: 1, height: 20, backgroundColor: 'rgba(255,255,255,0.12)' }} />

        <div className="flex items-center gap-1">
          {links.map((link) => {
            const isActive = pathname === link.href;
            const isCv = link.href === '/cv';
            return (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-3.5 py-1.5 text-sm font-medium rounded-full transition-all duration-200"
                style={{
                  color: isActive ? '#ffffff' : isCv ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.6)',
                  backgroundColor: isActive
                    ? 'rgba(196, 93, 62, 0.25)'
                    : isCv
                    ? 'rgba(196, 93, 62, 0.15)'
                    : 'transparent',
                  border: isCv ? '1px solid rgba(196,93,62,0.35)' : '1px solid transparent',
                }}
              >
                {link.label}
                {isCv && !isActive && (
                  <span
                    className="ml-1.5 text-[10px] font-mono uppercase tracking-wider px-1 py-0.5 rounded"
                    style={{
                      backgroundColor: 'rgba(196,93,62,0.3)',
                      color: '#C45D3E',
                      verticalAlign: 'middle',
                    }}
                  >
                    new
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
