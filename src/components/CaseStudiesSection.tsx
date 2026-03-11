'use client';

import { motion } from 'framer-motion';
import { useState, useRef, useMemo } from 'react';

interface CaseStudy {
  _id: string;
  category: string;
  title: string;
  subtitle: string;
  description: string;
  result: string;
  order: number;
}

export default function CaseStudiesSection({ caseStudies }: { caseStudies: CaseStudy[] }) {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(caseStudies.map((cs) => cs.category)));
    return ['All', ...cats];
  }, [caseStudies]);

  const filteredCaseStudies =
    selectedFilter === 'All' ? caseStudies : caseStudies.filter((cs) => cs.category === selectedFilter);

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
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className="font-mono text-xs px-4 py-2 rounded-full whitespace-nowrap transition-all duration-300"
              style={{
                backgroundColor: selectedFilter === cat ? 'var(--accent)' : 'transparent',
                color: selectedFilter === cat ? 'white' : 'var(--foreground)',
                border: `1px solid ${selectedFilter === cat ? 'var(--accent)' : 'var(--border)'}`,
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Case Study Cards Carousel */}
        <div className="overflow-x-auto pb-6" ref={scrollContainerRef}>
          <div className="flex gap-6 min-w-min">
            {filteredCaseStudies.map((cs, i) => (
              <motion.div
                key={cs._id}
                className="flex-shrink-0 w-80 p-6 border rounded-lg transition-all duration-300 group"
                style={{
                  borderColor: 'var(--border)',
                  backgroundColor: 'rgba(245, 243, 239, 0.3)',
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{
                  y: -4,
                  borderColor: 'rgba(196, 93, 62, 0.4)',
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                }}
              >
                <p className="font-mono text-xs tracking-wider uppercase mb-2" style={{ color: 'var(--accent)' }}>
                  {cs.category}
                </p>
                <h3 className="font-heading text-xl font-semibold mb-1">{cs.title}</h3>
                <p className="text-sm mb-3" style={{ color: 'var(--accent)' }}>
                  {cs.subtitle}
                </p>
                <p className="text-sm mb-4 leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                  {cs.description}
                </p>
                <div
                  className="p-3 rounded-md border"
                  style={{
                    backgroundColor: 'rgba(196, 93, 62, 0.08)',
                    borderColor: 'rgba(196, 93, 62, 0.2)',
                  }}
                >
                  <p className="font-mono text-xs font-semibold" style={{ color: 'var(--accent)' }}>
                    {cs.result}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
