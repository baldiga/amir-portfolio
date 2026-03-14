'use client';

import { motion } from 'framer-motion';

interface Skill {
  _id: string;
  name: string;
  size: string;
  category: string;
  order: number;
}

const floatingVariants = (delay: number, duration: number) => ({
  animate: {
    y: [0, -14, 0],
    x: [0, Math.random() * 8 - 4, 0],
    transition: {
      duration,
      delay,
      repeat: Infinity,
    },
  },
});

const getBubbleSize = (size: string) => {
  switch (size) {
    case 'large':
      return { className: 'text-xs', minW: 110, minH: 110 };
    case 'medium':
      return { className: 'text-xs', minW: 95, minH: 95 };
    case 'small':
      return { className: 'text-[11px]', minW: 80, minH: 80 };
    default:
      return { className: 'text-xs', minW: 95, minH: 95 };
  }
};

export default function ToolkitSection({ skills }: { skills: Skill[] }) {
  const aiSkills = skills.filter((s) => s.category === 'ai');
  const marketingSkills = skills.filter((s) => s.category === 'marketing');

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
            02 —
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-semibold mt-2">My Toolkit</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* AI Skills */}
          <div className="relative flex items-center justify-center" style={{ minHeight: 420 }}>
            <div className="relative w-full flex flex-wrap gap-4 items-center justify-center content-center py-4">
              {aiSkills.map((skill, i) => {
                const bubble = getBubbleSize(skill.size);
                return (
                  <motion.div
                    key={skill._id}
                    className="flex items-center justify-center text-center rounded-full border transition-all duration-300 cursor-pointer"
                    style={{
                      minWidth: bubble.minW,
                      minHeight: bubble.minH,
                      padding: '12px 10px',
                      backgroundColor: 'rgba(196, 93, 62, 0.1)',
                      borderColor: 'rgba(196, 93, 62, 0.3)',
                    }}
                    variants={floatingVariants(i * 0.1, 3 + Math.random() * 2)}
                    animate="animate"
                    whileHover={{ scale: 1.1, borderColor: 'rgba(196, 93, 62, 0.7)' }}
                  >
                    <span
                      className={`font-mono ${bubble.className} font-semibold transition-colors leading-tight text-center`}
                      style={{ color: 'var(--accent)', wordBreak: 'break-word', hyphens: 'auto' }}
                    >
                      {skill.name}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Marketing Skills */}
          <div className="relative flex items-center justify-center" style={{ minHeight: 420 }}>
            <div className="relative w-full flex flex-wrap gap-4 items-center justify-center content-center py-4">
              {marketingSkills.map((skill, i) => {
                const bubble = getBubbleSize(skill.size);
                return (
                  <motion.div
                    key={skill._id}
                    className="flex items-center justify-center text-center rounded-full border transition-all duration-300 cursor-pointer"
                    style={{
                      minWidth: bubble.minW,
                      minHeight: bubble.minH,
                      padding: '12px 10px',
                      backgroundColor: 'rgba(26, 26, 26, 0.05)',
                      borderColor: 'rgba(26, 26, 26, 0.2)',
                    }}
                    variants={floatingVariants(i * 0.15, 3.5 + Math.random() * 2)}
                    animate="animate"
                    whileHover={{ scale: 1.1, borderColor: 'rgba(26, 26, 26, 0.5)' }}
                  >
                    <span
                      className={`font-mono ${bubble.className} font-semibold transition-colors leading-tight text-center`}
                      style={{ color: 'var(--foreground)', wordBreak: 'break-word', hyphens: 'auto' }}
                    >
                      {skill.name}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
