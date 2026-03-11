'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Target, Zap, Users, PenTool, type LucideIcon } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Target,
  Zap,
  Users,
  PenTool,
};

interface BentoCard {
  _id: string;
  title: string;
  iconName: string;
  colSpan: string;
  rowSpan: string;
  order: number;
}

export default function BentoGrid({ cards }: { cards: BentoCard[] }) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

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
            01 —
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-semibold mt-2">What I Build</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, i) => {
            const IconComponent = iconMap[card.iconName];
            return (
              <motion.div
                key={card._id}
                className={`${card.colSpan} ${card.rowSpan || ''} relative overflow-hidden p-8 border rounded-lg transition-all duration-300 hover:shadow-lg group cursor-pointer`}
                style={{
                  borderColor: hoveredCard === card._id ? 'rgba(196, 93, 62, 0.4)' : 'var(--border)',
                  backgroundColor: 'rgba(245, 243, 239, 0.3)',
                  transform: hoveredCard === card._id ? 'translateY(-4px)' : 'translateY(0)',
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onMouseEnter={() => setHoveredCard(card._id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(255,255,255,0) 100%)',
                  }}
                />
                {IconComponent && (
                  <IconComponent className="mb-4 relative z-10" size={32} style={{ color: 'var(--accent)' }} />
                )}
                <h3 className="font-heading text-xl md:text-2xl font-semibold relative z-10">{card.title}</h3>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
