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
        photoRef.current.style.transform = `translate(${dx * 14}px, ${dy * 8}px)`;
      }
      if (orbitRef.current) {
        orbitRef.current.style.transform = `translate(${dx * -10}px, ${dy * -6}px) rotate(${dx * 4}deg)`;
      }
    };

    const handleMouseLeave = () => {
      if (photoRef.current) photoRef.current.style.transform = 'translate(0,0)';
      if (orbitRef.current) orbitRef.current.style.transform = 'translate(0,0) rotate(0deg)';
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
    visible: { opacity: 1, transition: { staggerChildren: 0.13, delayChildren: 0.25 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] } },
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--background)',
        display: 'grid',
        gridTemplateColumns: '50% 50%',
      }}
    >
      {/* ── LEFT HALF: full-bleed photo column ── */}
      <motion.div
        className="relative overflow-hidden"
        style={{ minHeight: '100vh' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.1 }}
      >
        {/* Planet orbital — positioned in upper-center of photo column */}
        <div
          ref={orbitRef}
          style={{
            position: 'absolute',
            width: 380,
            height: 380,
            top: '38%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            transition: 'transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        >
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 260, height: 260, borderRadius: '50%',
            background: 'radial-gradient(circle at 38% 35%, #E8845F 0%, #C45D3E 45%, #8B3A22 100%)',
            boxShadow: '0 0 120px rgba(196,93,62,0.18), inset -28px -18px 55px rgba(0,0,0,0.28)',
          }} />
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }} viewBox="0 0 380 380">
            <ellipse cx="190" cy="190" rx="178" ry="48"
              fill="none" stroke="rgba(26,26,26,0.4)" strokeWidth="1.5"
              style={{ transform: 'rotate(-8deg)', transformOrigin: '190px 190px' }} />
            <path d="M 12 190 A 178 48 0 0 0 368 190"
              fill="none" stroke="rgba(26,26,26,0.65)" strokeWidth="1.5"
              style={{ transform: 'rotate(-8deg)', transformOrigin: '190px 190px' }} />
          </svg>
          <style>{`
            @keyframes orb1f { from { transform: rotate(-8deg) translateX(178px) rotate(8deg); } to { transform: rotate(352deg) translateX(178px) rotate(-352deg); } }
            @keyframes orb2f { from { transform: rotate(188deg) translateX(178px) rotate(-188deg); } to { transform: rotate(548deg) translateX(178px) rotate(-548deg); } }
            @keyframes orb3f { from { transform: rotate(98deg) translateX(136px) rotate(-98deg); } to { transform: rotate(458deg) translateX(136px) rotate(-458deg); } }
            .obf { position: absolute; border-radius: 50%; top: 50%; left: 50%; }
            .obf1 { width: 15px; height: 15px; margin: -7.5px; background: #C45D3E; box-shadow: 0 0 15px #C45D3E88; animation: orb1f 6s linear infinite; }
            .obf2 { width: 10px; height: 10px; margin: -5px; background: #C45D3E; box-shadow: 0 0 10px #C45D3E88; animation: orb2f 6s linear infinite; }
            .obf3 { width: 7px; height: 7px; margin: -3.5px; background: #E8845F; box-shadow: 0 0 8px #E8845F88; animation: orb3f 9s linear infinite; }
          `}</style>
          <div className="obf obf1" /><div className="obf obf2" /><div className="obf obf3" />
        </div>

        {/* Photo — anchored to bottom, full column width */}
        <div
          ref={photoRef}
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
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
              objectFit: 'cover',
              objectPosition: 'top center',
              filter: 'grayscale(100%) contrast(1.05)',
              maxHeight: '95vh',
            }}
          />
        </div>
      </motion.div>

      {/* ── RIGHT HALF: text content ── */}
      <motion.div
        className="flex flex-col justify-center px-12 xl:px-20"
        style={{ paddingTop: 100, paddingBottom: 60 }}
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
          className="font-heading font-bold leading-tight mb-5"
          style={{ fontSize: 'clamp(3rem, 4.5vw, 5.5rem)', lineHeight: 1.05, letterSpacing: '-0.025em' }}
        >
          I&apos;m Amir<br />
          <span style={{ color: 'var(--accent)' }}>Baldiga.</span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-base font-semibold mb-3 tracking-wide"
          style={{ color: 'var(--foreground)', letterSpacing: '0.02em' }}
        >
          Marketer · AI Builder · Role Model · FIFA Enjoyer
        </motion.p>

        <motion.p
          variants={itemVariants}
          className="mb-10 leading-relaxed"
          style={{ color: 'var(--muted-foreground)', fontSize: '1rem', maxWidth: 440 }}
        >
          In 2018, one week after my IDF discharge, I started my first business as a campaign manager.
          Since then I&apos;ve turned marketing into a hobby, a profession, and a global mission —
          building brands, communities, and products that actually move people.
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mb-14">
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

        <motion.div variants={itemVariants} className="flex flex-wrap gap-10">
          {[
            { label: 'Years in marketing', value: '7+' },
            { label: 'Community members', value: '54K' },
            { label: 'Course graduates', value: '7K+' },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="font-heading font-bold" style={{ fontSize: '2rem', color: 'var(--foreground)', lineHeight: 1 }}>{stat.value}</p>
              <p className="text-xs font-mono uppercase tracking-wider mt-1" style={{ color: 'var(--muted-foreground)' }}>{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
