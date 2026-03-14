'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import AnimatedHeroBg from './AnimatedHeroBg';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] } },
};

interface HeroProps {
  eyebrow: string;
  heading: string;
  description: string;
  ctaButtons: Array<{
    _key: string;
    text: string;
    link: string;
    style: string;
    external: boolean;
  }>;
  profileImageUrl: string | null;
}

export default function HeroSection({ eyebrow, heading, description, ctaButtons, profileImageUrl }: HeroProps) {
  return (
    <section className="h-screen flex items-center pt-24 relative overflow-hidden">
      <AnimatedHeroBg />
      <div className="max-w-7xl mx-auto px-6 w-full relative" style={{ zIndex: 1 }}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
          <motion.div className="md:col-span-2" variants={containerVariants} initial="hidden" animate="visible">
            <motion.div
              className="eyebrow mb-8 w-fit text-xs font-mono tracking-wider uppercase px-3 py-1 rounded-md"
              variants={itemVariants}
            >
              {eyebrow}
            </motion.div>
            <motion.h1 className="font-heading text-6xl md:text-7xl font-bold leading-tight mb-8" variants={itemVariants}>
              {heading}
            </motion.h1>
            <motion.p className="text-lg mb-12 max-w-xl leading-relaxed" style={{ color: 'var(--muted-foreground)' }} variants={itemVariants}>
              {description}
            </motion.p>
            <motion.div className="flex flex-col md:flex-row gap-4" variants={itemVariants}>
              {ctaButtons?.map((btn) => {
                if (btn.external) {
                  return (
                    <a
                      key={btn._key}
                      href={btn.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={btn.style === 'primary' ? 'btn-primary' : 'btn-outline'}
                    >
                      {btn.text}
                      {btn.style === 'primary' && <ArrowRight className="ml-2 inline" size={18} />}
                    </a>
                  );
                }
                return (
                  <button key={btn._key} className={btn.style === 'primary' ? 'btn-primary' : 'btn-outline'}>
                    {btn.text}
                    {btn.style === 'primary' && <ArrowRight className="ml-2 inline" size={18} />}
                  </button>
                );
              })}
            </motion.div>
          </motion.div>
          <motion.div className="md:col-span-1 relative" variants={itemVariants} initial="hidden" animate="visible">
            <div className="relative">
              {/* Outer glow ring */}
              <div
                className="absolute -inset-4 blur-2xl opacity-30 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(196, 93, 62, 0.3) 0%, transparent 70%)',
                  clipPath: 'polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%)',
                }}
              />
              {/* Depth back layer */}
              <div
                className="absolute -bottom-6 -right-6 w-full h-full border-2"
                style={{
                  borderColor: 'rgba(196, 93, 62, 0.35)',
                  clipPath: 'polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%)',
                  boxShadow: '4px 4px 24px rgba(196, 93, 62, 0.1)',
                }}
              />
              {/* Inner depth layer */}
              <div
                className="absolute -bottom-3 -right-3 w-full h-full border"
                style={{
                  borderColor: 'rgba(196, 93, 62, 0.15)',
                  clipPath: 'polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%)',
                }}
              />
              <img
                src={profileImageUrl || '/amir-profile.jpg'}
                alt="Amir Baldiga"
                className="w-full relative"
                style={{
                  clipPath: 'polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%)',
                  filter: 'drop-shadow(0 8px 32px rgba(0,0,0,0.12))',
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent, var(--background))',
          zIndex: 2,
        }}
      />
    </section>
  );
}
