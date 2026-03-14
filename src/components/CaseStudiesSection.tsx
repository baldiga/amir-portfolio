'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo } from 'react';
import { ExternalLink, ArrowRight, Bot } from 'lucide-react';

interface CaseStudy {
  _id: string;
  category: string;
  title: string;
  subtitle?: string;
  description: string;
  result: string;
  order: number;
  link?: string;
  slug?: { current: string };
  icon?: string;
  featured?: boolean;
  tags?: string[];
}

const AI_CATEGORY = 'AI Projects';

function CaseStudyCard({ cs, i }: { cs: CaseStudy; i: number }) {
  const isAI = cs.category === AI_CATEGORY;

  const href = cs.slug?.current
    ? `/build/${cs.slug.current}`
    : cs.link || null;

  return (
    <motion.div
      key={cs._id}
      className="flex-shrink-0 w-80 p-6 border rounded-lg transition-all duration-300 group flex flex-col"
      style={{
        borderColor: isAI ? 'rgba(25, 28, 112, 0.4)' : 'var(--border)',
        backgroundColor: isAI
          ? 'rgba(25, 28, 112, 0.06)'
          : 'rgba(245, 243, 239, 0.3)',
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ delay: i * 0.04 }}
      whileHover={{
        y: -4,
        borderColor: isAI ? 'rgba(25, 28, 112, 0.7)' : 'rgba(196, 93, 62, 0.4)',
        boxShadow: isAI
          ? '0 10px 30px -5px rgba(25, 28, 112, 0.15)'
          : '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* Category badge */}
      <div className="flex items-center gap-2 mb-2">
        {isAI && (
          <span
            className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-mono"
            style={{ backgroundColor: 'rgba(25, 28, 112, 0.12)', color: '#191C70' }}
          >
            <Bot size={11} />
            AI
          </span>
        )}
        <p
          className="font-mono text-xs tracking-wider uppercase"
          style={{ color: isAI ? '#191C70' : 'var(--accent)' }}
        >
          {cs.category}
        </p>
      </div>

      {/* Title */}
      <h3 className="font-heading text-xl font-semibold mb-1">{cs.title}</h3>

      {/* Subtitle */}
      {cs.subtitle && (
        <p className="text-sm mb-3" style={{ color: 'var(--accent)' }}>
          {cs.subtitle}
        </p>
      )}

      {/* Description */}
      <p className="text-sm mb-4 leading-relaxed flex-grow" style={{ color: 'var(--muted-foreground)' }}>
        {cs.description}
      </p>

      {/* Result */}
      <div
        className="p-3 rounded-md border mb-4"
        style={{
          backgroundColor: isAI ? 'rgba(25, 28, 112, 0.08)' : 'rgba(196, 93, 62, 0.08)',
          borderColor: isAI ? 'rgba(25, 28, 112, 0.2)' : 'rgba(196, 93, 62, 0.2)',
        }}
      >
        <p
          className="font-mono text-xs font-semibold"
          style={{ color: isAI ? '#191C70' : 'var(--accent)' }}
        >
          {cs.result}
        </p>
      </div>

      {/* CTA Link */}
      {href && (
        <a
          href={href}
          target={cs.slug?.current ? '_self' : '_blank'}
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold mt-auto transition-all duration-200 group/link"
          style={{ color: isAI ? '#191C70' : 'var(--accent)' }}
        >
          {cs.slug?.current ? (
            <>
              View Project <ArrowRight size={12} className="transition-transform duration-200 group-hover/link:translate-x-1" />
            </>
          ) : (
            <>
              View Work <ExternalLink size={12} className="transition-opacity duration-200 opacity-70 group-hover/link:opacity-100" />
            </>
          )}
        </a>
      )}
    </motion.div>
  );
}

export default function CaseStudiesSection({ caseStudies }: { caseStudies: CaseStudy[] }) {
  const [selectedFilter, setSelectedFilter] = useState('All');

  // Sort so AI Projects always comes first in the tab list
  const categories = useMemo(() => {
    const cats = Array.from(new Set(caseStudies.map((cs) => cs.category)));
    const sorted = cats.sort((a, b) => {
      if (a === AI_CATEGORY) return -1;
      if (b === AI_CATEGORY) return 1;
      return 0;
    });
    return ['All', ...sorted];
  }, [caseStudies]);

  const filteredCaseStudies = useMemo(() => {
    const filtered =
      selectedFilter === 'All'
        ? caseStudies
        : caseStudies.filter((cs) => cs.category === selectedFilter);
    // Within results, put AI Projects first
    return [...filtered].sort((a, b) => {
      if (a.category === AI_CATEGORY && b.category !== AI_CATEGORY) return -1;
      if (b.category === AI_CATEGORY && a.category !== AI_CATEGORY) return 1;
      return (a.order ?? 99) - (b.order ?? 99);
    });
  }, [caseStudies, selectedFilter]);

  return (
    <section className="py-32 border-t" style={{ borderColor: 'var(--border)' }}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="font-mono text-sm tracking-widest uppercase" style={{ color: 'var(--accent)' }}>
            03 —
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-semibold mt-2">Case Studies</h2>
        </motion.div>

        {/* Filter Pills */}
        <div className="flex gap-3 mb-12 overflow-x-auto pb-4">
          {categories.map((cat) => {
            const isAICat = cat === AI_CATEGORY;
            const isActive = selectedFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className="font-mono text-xs px-4 py-2 rounded-full whitespace-nowrap transition-all duration-300 flex items-center gap-1.5"
                style={{
                  backgroundColor: isActive
                    ? isAICat ? '#191C70' : 'var(--accent)'
                    : 'transparent',
                  color: isActive ? 'white' : isAICat ? '#191C70' : 'var(--foreground)',
                  border: `1px solid ${
                    isActive
                      ? isAICat ? '#191C70' : 'var(--accent)'
                      : isAICat ? 'rgba(25, 28, 112, 0.4)' : 'var(--border)'
                  }`,
                  fontWeight: isAICat ? 600 : 400,
                }}
              >
                {isAICat && <Bot size={11} />}
                {cat}
              </button>
            );
          })}
        </div>

        {/* Case Study Cards Carousel */}
        <div className="overflow-x-auto pb-6">
          <motion.div className="flex gap-6 min-w-min" layout>
            <AnimatePresence mode="popLayout">
              {filteredCaseStudies.map((cs, i) => (
                <CaseStudyCard key={cs._id} cs={cs} i={i} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
