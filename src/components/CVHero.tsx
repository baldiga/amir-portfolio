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
        photoRef.current.style.transform = `translateX(-50%) translate(${dx * 18}px, ${dy * 10}px)`;
      }
      if (orbitRef.current) {
        orbitRef.current.style.transform = `translate(-50%, -44%) translate(${dx * -12}px, ${dy * -8}px) rotate(${dx * 5}deg)`;
      }
    };

    const handleMouseLeave = () => {
      if (photoRef.current) photoRef.current.style.transform = 'translateX(-50%) translate(0,0)';
      if (orbitRef.current) orbitRef.current.style.transform = 'translate(-50%, -44%) translate(0,0) rotate(0deg)';
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
      className="min-h-screen flex items-center pt-20 pb-0 relative overflow-hidden"
      style={{ backgroundColor: 'var(--background)' }}
    >
      <div className="w-full max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-end gap-0">

          {/* LEFT: Photo + Planet — full height, bleeds to bottom */}
          <motion.div
            className="relative order-2 lg:order-1 flex justify-center"
            style={{ minHeight: '80vh' }}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
          >
            {/* Planet orbital system */}
            <div
              ref={orbitRef}
              style={{
                position: 'absolute',
                width: 420,
                height: 420,
                top: '44%',
                left: '50%',
                transform: 'translate(-50%, -44%)',
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
                  width: 280,
                  height: 280,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle at 38% 35%, #E8845F 0%, #C45D3E 45%, #8B3A22 100%)',
                  boxShadow: '0 0 100px rgba(196,93,62,0.2), inset -30px -20px 60px rgba(0,0,0,0.28)',
                }}
              />

              {/* Orbital ring SVG */}
              <svg
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}
                viewBox="0 0 420 420"
              >
                <ellipse cx="210" cy="210" rx="196" ry="52"
                  fill="none" stroke="rgba(26,26,26,0.45)" strokeWidth="1.5"
                  style={{ transform: 'rotate(-8deg)', transformOrigin: '210px 210px' }}
                />
                <path d="M 14 210 A 196 52 0 0 0 406 210"
                  fill="none" stroke="rgba(26,26,26,0.65)" strokeWidth="1.5"
                  style={{ transform: 'rotate(-8deg)', transformOrigin: '210px 210px' }}
                />
              </svg>

              {/* Orbiting dots */}
              <style>{`
                @keyframes orb1cv { from { transform: rotate(-8deg) translateX(196px) rotate(8deg); } to { transform: rotate(352deg) translateX(196px) rotate(-352deg); } }
                @keyframes orb2cv { from { transform: rotate(188deg) translateX(196px) rotate(-188deg); } to { transform: rotate(548deg) translateX(196px) rotate(-548deg); } }
                @keyframes orb3cv { from { transform: rotate(98deg) translateX(150px) rotate(-98deg); } to { transform: rotate(458deg) translateX(150px) rotate(-458deg); } }
                .orb-cv { position: absolute; border-radius: 50%; top: 50%; left: 50%; }
                .orb-cv-1 { width: 16px; height: 16px; margin: -8px; background: #C45D3E; box-shadow: 0 0 16px #C45D3E99; animation: orb1cv 6s linear infinite; }
                .orb-cv-2 { width: 11px; height: 11px; margin: -5.5px; background: #C45D3E; box-shadow: 0 0 11px #C45D3E99; animation: orb2cv 6s linear infinite; }
                .orb-cv-3 { width: 8px; height: 8px; margin: -4px; background: #E8845F; box-shadow: 0 0 9px #E8845F99; animation: orb3cv 9s linear infinite; }
              `}</style>
              <div className="orb-cv orb-cv-1" />
              <div className="orb-cv orb-cv-2" />
              <div className="orb-cv orb-cv-3" />
            </div>

            {/* B&W Photo — anchored to bottom, tall */}
            <div
              ref={photoRef}
              style={{
                position: 'absolute',
                bottom: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '75%',
                maxWidth: 480,
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
          </motion.div>

          {/* RIGHT: Text — vertically centered */}
          <motion.div
            className="order-1 lg:order-2 pb-16 lg:pb-24"
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
              style={{ fontSize: 'clamp(3rem, 5.5vw, 5rem)', lineHeight: 1.06, letterSpacing: '-0.02em' }}
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
                  <p className="font-heading font-bold text-2xl" style={{ color: 'var(--foreground)' }}>{stat.value}</p>
                  <p className="text-xs font-mono uppercase tracking-wider mt-0.5" style={{ color: 'var(--muted-foreground)' }}>{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
