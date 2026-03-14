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
            const isHovered = hoveredCard === card._id;
            return (
              <motion.div
                key={card._id}
                className={`${card.colSpan} ${card.rowSpan || ''} relative overflow-hidden p-8 rounded-xl group cursor-pointer`}
                style={{
                  background: isHovered
                    ? 'rgba(255, 255, 255, 0.75)'
                    : 'rgba(255, 255, 255, 0.55)',
                  backdropFilter: 'blur(12px) saturate(160%)',
                  WebkitBackdropFilter: 'blur(12px) saturate(160%)',
                  border: isHovered
                    ? '1px solid rgba(196, 93, 62, 0.3)'
                    : '1px solid rgba(255, 255, 255, 0.75)',
                  boxShadow: isHovered
                    ? '0 12px 40px rgba(0, 0, 0, 0.10), 0 0 0 1px rgba(196, 93, 62, 0.1), 0 1px 0 rgba(255,255,255,0.9) inset'
                    : '0 4px 16px rgba(0, 0, 0, 0.05), 0 1px 0 rgba(255,255,255,0.9) inset',
                  transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onMouseEnter={() => setHoveredCard(card._id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.04) 40%, transparent 60%)',
                  }}
                />
                <div
                  className="absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-2xl"
                  style={{ background: 'radial-gradient(circle, rgba(196, 93, 62, 0.2) 0%, transparent 70%)' }}
                />
                {IconComponent && (
                  <div
                    className="mb-5 relative z-10 w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{
                      background: isHovered ? 'rgba(196, 93, 62, 0.12)' : 'rgba(196, 93, 62, 0.07)',
                      border: '1px solid rgba(196, 93, 62, 0.15)',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <IconComponent size={22} style={{ color: 'var(--accent)' }} />
                  </div>
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
