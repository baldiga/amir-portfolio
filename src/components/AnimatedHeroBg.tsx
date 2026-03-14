'use client';

export default function AnimatedHeroBg() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {/* Dot grid */}
      <div className="hero-dot-grid absolute inset-0" />

      {/* Floating gradient orbs */}
      <div className="hero-orb hero-orb-1" />
      <div className="hero-orb hero-orb-2" />
      <div className="hero-orb hero-orb-3" />

      {/* Subtle horizontal lines — tech grid feel */}
      <div className="hero-scanlines absolute inset-0" />
    </div>
  );
}
