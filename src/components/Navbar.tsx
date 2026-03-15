'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

function AmirLogo() {
  return (
    <svg
      viewBox="0 0 220 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ height: 36, width: 'auto' }}
      aria-label="Amir Baldiga"
    >
      {/* "Amir" text */}
      <text x="0" y="32" fontFamily="Sora, Inter, sans-serif" fontWeight="700" fontSize="30" fill="white" letterSpacing="-0.5">Amir</text>

      {/* Planet system — sits between the two name parts */}
      <circle cx="101" cy="16" r="10" fill="url(#pg2)" />
      <ellipse cx="101" cy="16" rx="18" ry="5"
        fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.1"
        transform="rotate(-10 101 16)" />
      <circle cx="85" cy="18.5" r="2.5" fill="#C45D3E" />
      <circle cx="114" cy="12.5" r="1.7" fill="#C45D3E" />
      <circle cx="106" cy="22" r="2" fill="#E8845F" />

      {/* "Baldiga" text */}
      <text x="118" y="32" fontFamily="Sora, Inter, sans-serif" fontWeight="700" fontSize="30" fill="white" letterSpacing="-0.5">Baldiga</text>

      {/* Orange dash under B */}
      <rect x="118" y="37" width="18" height="3.5" rx="1.75" fill="#C45D3E" />

      <defs>
        <radialGradient id="pg2" cx="38%" cy="35%" r="65%" fx="38%" fy="35%">
          <stop offset="0%" stopColor="#E8845F" />
          <stop offset="50%" stopColor="#C45D3E" />
          <stop offset="100%" stopColor="#8B3A22" />
        </radialGradient>
      </defs>
    </svg>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
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
    <nav className="fixed top-4 left-0 right-0 z-40 flex justify-center px-6 transition-all duration-300">
      <div
        className="flex items-center gap-6 px-6 rounded-full transition-all duration-300"
        style={{
          height: 72,
          backgroundColor: scrolled ? 'rgba(22, 20, 18, 0.96)' : 'rgba(22, 20, 18, 0.88)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          border: '1px solid rgba(255,255,255,0.07)',
          boxShadow: scrolled
            ? '0 8px 32px rgba(0,0,0,0.32), 0 0 0 1px rgba(196,93,62,0.1)'
            : '0 4px 20px rgba(0,0,0,0.22)',
        }}
      >
        <Link href="/" aria-label="Amir Baldiga – Home" className="flex items-center shrink-0">
          <AmirLogo />
        </Link>

        <div style={{ width: 1, height: 20, backgroundColor: 'rgba(255,255,255,0.1)', flexShrink: 0 }} />

        <div className="flex items-center gap-1">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium rounded-full transition-all duration-200"
                style={{
                  color: isActive ? '#ffffff' : 'rgba(255,255,255,0.55)',
                  backgroundColor: isActive ? 'rgba(196, 93, 62, 0.22)' : 'transparent',
                  border: '1px solid transparent',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLElement).style.color = '#ffffff';
                    (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.07)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.55)';
                    (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
                  }
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
