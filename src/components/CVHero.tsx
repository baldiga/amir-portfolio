'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function CVHero() {
  const orbitRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;

      if (photoRef.current) {
        photoRef.current.style.transform = `translateX(-50%) translate(${dx * 18}px, ${dy * 12}px)`;
      }
      if (orbitRef.current) {
        orbitRef.current.style.transform = `translate(-50%, -46%) translate(${dx * -10}px, ${dy * -8}px) rotate(${dx * 6}deg)`;
      }
    };

    const handleMouseLeave = () => {
      if (photoRef.current) photoRef.current.style.transform = 'translateX(-50%) translate(0,0)';
      if (orbitRef.current) orbitRef.current.style.transform = 'translate(-50%, -46%) translate(0,0) rotate(0deg)';
    };

    section.addEventListener('mousemove', handleMouseMove);
    section.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      section.removeEventListener('mousemove', handleMouseMove);
      section.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.13, delayChildren: 0.2 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] } },
  };

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex items-center pt-28 pb-16 relative overflow-hidden"
      style={{ backgroundColor: 'var(--background)' }}
    >
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* LEFT: Photo + Planet */}
          <motion.div
            className="relative flex justify-center order-2 lg:order-1"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
          >
            <div className="relative" style={{ width: 420, height: 520 }}>

              {/* Planet orbital system */}
              <div
                ref={orbitRef}
                style={{
                  position: 'absolute',
                  width: 360,
                  height: 360,
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -46%)',
                  transition: 'transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)',
                  zIndex: 0,
                }}
              >
                {/* Orange planet sphere */}
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 240,
                    height: 240,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle at 38% 35%, #E8845F 0%, #C45D3E 45%, #8B3A22 100%)',
                    boxShadow: '0 0 80px rgba(196,93,62,0.22), inset -28px -18px 55px rgba(0,0,0,0.28)',
                  }}
                />

                {/* Orbital ring SVG */}
                <svg
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}
                  viewBox="0 0 360 360"
                >
                  <ellipse cx="180" cy="180" rx="168" ry="44"
                    fill="none" stroke="rgba(26,26,26,0.5)" strokeWidth="1.5"
                    style={{ transform: 'rotate(-8deg)', transformOrigin: '180px 180px' }}
                  />
                  <path d="M 12 180 A 168 44 0 0 0 348 180"
                    fill="none" stroke="rgba(26,26,26,0.7)" strokeWidth="1.5"
                    style={{ transform: 'rotate(-8deg)', transformOrigin: '180px 180px' }}
                  />
                </svg>

                {/* Orbiting dots */}
                <style>{`
                  @keyframes orb1 { from { transform: rotate(-8deg) translateX(168px) rotate(8deg); } to { transform: rotate(352deg) translateX(168px) rotate(-352deg); } }
                  @keyframes orb2 { from { transform: rotate(188deg) translateX(168px) rotate(-188deg); } to { transform: rotate(548deg) translateX(168px) rotate(-548deg); } }
                  @keyframes orb3 { from { transform: rotate(98deg) translateX(130px) rotate(-98deg); } to { transform: rotate(458deg) translateX(130px) rotate(-458deg); } }
                  .orb-dot { position: absolute; border-radius: 50%; top: 50%; left: 50%; }
                  .orb-dot-1 { width: 14px; height: 14px; margin: -7px; background: #C45D3E; box-shadow: 0 0 14px #C45D3E99; animation: orb1 6s linear infinite; }
                  .orb-dot-2 { width: 10px; height: 10px; margin: -5px; background: #C45D3E; box-shadow: 0 0 10px #C45D3E99; animation: orb2 6s linear infinite; }
                  .orb-dot-3 { width: 7px; height: 7px; margin: -3.5px; background: #E8845F; box-shadow: 0 0 8px #E8845F99; animation: orb3 9s linear infinite; }
                `}</style>
                <div className="orb-dot orb-dot-1" />
                <div className="orb-dot orb-dot-2" />
                <div className="orb-dot orb-dot-3" />
              </div>

              {/* B&W Photo */}
              <div
                ref={photoRef}
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 300,
                  zIndex: 2,
                  transition: 'transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94)',
                }}
              >
                <img
                  src="https://amirbaldiga.com/wp-content/uploads/2024/03/Josef-15-1-671x1024.png"
                  alt="Amir Baldiga"
                  style={{
                    width: '100%',
                    display: 'block',
                    filter: 'grayscale(100%) contrast(1.05)',
                    objectFit: 'cover',
                  }}
                />
              </div>

            </div>
          </motion.div>

          {/* RIGHT: Text */}
          <motion.div
            className="order-1 lg:order-2"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <span
                className="font-mono text-xs tracking-widest uppercase px-3 py-1 rounded-md inline-block mb-8"
                style={{
                  color: 'var(--accent)',
                  backgroundColor: 'rgba(196,93,62,0.08)',
                  border: '1px solid rgba(196,93,62,0.2)',
                }}
              >
                Nice to meet you
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="font-heading font-bold leading-tight mb-6"
              style={{ fontSize: 'clamp(2.8rem, 5vw, 4.5rem)', lineHeight: 1.08, letterSpacing: '-0.02em' }}
            >
              I&apos;m Amir<br />
              <span style={{ color: 'var(--accent)' }}>Baldiga.</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg mb-3 font-medium"
              style={{ color: 'var(--foreground)' }}
            >
              Marketer · AI Builder · Role Model · FIFA Enjoyer
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="mb-10 leading-relaxed max-w-lg"
              style={{ color: 'var(--muted-foreground)', fontSize: '1.05rem' }}
            >
              In 2018, one week after my IDF discharge, I started my first business as a campaign manager.
              Since then I&apos;ve turned marketing into a hobby, a profession, and a global mission —
              building brands, communities, and products that actually move people.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              <Link href="/contact" className="btn-primary inline-flex items-center gap-2">
                Work with me <ArrowRight size={16} />
              </Link>
              <a
                href="https://linkedin.com/in/amirbaldiga"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline inline-flex items-center gap-2"
              >
                LinkedIn
              </a>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-12 flex flex-wrap gap-8">
              {[
                { label: 'Years in marketing', value: '7+' },
                { label: 'Community members', value: '54K' },
                { label: 'Course graduates', value: '7K+' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-heading font-bold text-2xl" style={{ color: 'var(--foreground)' }}>
                    {stat.value}
                  </p>
                  <p className="text-xs font-mono uppercase tracking-wider mt-0.5" style={{ color: 'var(--muted-foreground)' }}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>

        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, var(--background))', zIndex: 3 }}
      />
    </section>
  );
}
