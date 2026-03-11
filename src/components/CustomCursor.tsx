'use client';

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const trailPosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
      }
    };

    const animateTrail = () => {
      if (trailRef.current) {
        trailPosRef.current.x += (posRef.current.x - trailPosRef.current.x) * 0.15;
        trailPosRef.current.y += (posRef.current.y - trailPosRef.current.y) * 0.15;
        trailRef.current.style.transform = `translate(${trailPosRef.current.x - 3}px, ${trailPosRef.current.y - 3}px)`;
      }
      requestAnimationFrame(animateTrail);
    };

    window.addEventListener('mousemove', handleMouseMove);
    const trailAnimation = requestAnimationFrame(animateTrail);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(trailAnimation);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed w-2 h-2 rounded-full pointer-events-none z-50"
        style={{
          backgroundColor: 'var(--accent)',
          willChange: 'transform',
          transition: 'opacity 0.2s',
        }}
      />
      <div
        ref={trailRef}
        className="fixed w-1.5 h-1.5 rounded-full pointer-events-none z-50 opacity-50"
        style={{
          backgroundColor: 'var(--accent)',
          willChange: 'transform',
        }}
      />
    </>
  );
}
