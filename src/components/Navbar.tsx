'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

function AmirLogo() {
  return (
    <svg
      viewBox="0 0 210 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ height: 28, width: 'auto' }}
      aria-label="Amir Baldiga"
    >
      {/* "Amir" text */}
      <text x="0" y="28" fontFamily="Sora, Inter, sans-serif" fontWeight="700" fontSize="26" fill="white" letterSpacing="-0.5">Amir</text>

      {/* Planet system — sits between the two name parts, above baseline */}
      {/* Main orange sphere */}
      <circle cx="96" cy="14" r="9" fill="url(#planetGrad)" />

      {/* Orbital ring — thin ellipse */}
      <ellipse cx="96" cy="14" rx="16" ry="4.5"
        fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1"
        transform="rotate(-10 96 14)" />

      {/* Orbiting dots */}
      <circle cx="82" cy="16" r="2.2" fill="#C45D3E" />
      <circle cx="108" cy="11" r="1.5" fill="#C45D3E" />
      <circle cx="101" cy="19" r="1.8" fill="#E8845F" />

      {/* "Baldiga" text */}
      <text x="112" y="28" fontFamily="Sora, Inter, sans-serif" fontWeight="700" fontSize="26" fill="white" letterSpacing="-0.5">Baldiga</text>

      {/* Orange accent dash under the B */}
      <rect x="112" y="32" width="16" height="3" rx="1.5" fill="#C45D3E" />

      <defs>
        <radialGradient id="planetGrad" cx="38%" cy="35%" r="65%" fx="38%" fy="35%">
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
        className="flex items-center gap-6 px-5 rounded-full transition-all duration-300"
        style={{
          height: 52,
          backgroundColor: scrolled ? 'rgba(22, 20, 18, 0.95)' : 'rgba(22, 20, 18, 0.85)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255,255,255,0.07)',
          boxShadow: scrolled
            ? '0 6px 28px rgba(0,0,0,0.32), 0 0 0 1px rgba(196,93,62,0.1)'
            : '0 3px 18px rgba(0,0,0,0.2)',
        }}
      >
        <Link href="/" aria-label="Amir Baldiga – Home" className="flex items-center shrink-0">
          <AmirLogo />
        </Link>

        <div style={{ width: 1, height: 16, backgroundColor: 'rgba(255,255,255,0.1)', flexShrink: 0 }} />

        <div className="flex items-center gap-0.5">
          {links.map((link) => {
            const isActive = pathname === link.href;
            const isCv = link.href === '/cv';
            return (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-200"
                style={{
                  color: isActive ? '#ffffff' : isCv ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.55)',
                  backgroundColor: isActive
                    ? 'rgba(196, 93, 62, 0.22)'
                    : isCv && !isActive
                    ? 'rgba(196, 93, 62, 0.12)'
                    : 'transparent',
                  border: isCv ? '1px solid rgba(196,93,62,0.3)' : '1px solid transparent',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLElement).style.color = '#ffffff';
                    (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.07)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLElement).style.color = isCv ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.55)';
                    (e.currentTarget as HTMLElement).style.backgroundColor = isCv ? 'rgba(196, 93, 62, 0.12)' : 'transparent';
                  }
                }}
              >
                {link.label}
                {isCv && !isActive && (
                  <span
                    className="ml-1 text-[9px] font-mono uppercase tracking-wider px-1 py-0.5 rounded"
                    style={{ backgroundColor: 'rgba(196,93,62,0.25)', color: '#C45D3E', verticalAlign: 'middle' }}
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
