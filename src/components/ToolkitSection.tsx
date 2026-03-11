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
    y: [0, -20, 0],
    x: [0, Math.random() * 10 - 5, 0],
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
      return 'w-24 h-24 text-base';
    case 'medium':
      return 'w-20 h-20 text-sm';
    case 'small':
      return 'w-16 h-16 text-xs';
    default:
      return 'w-20 h-20 text-sm';
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
          <div className="relative h-96 flex items-center justify-center">
            <div className="relative w-full h-full flex flex-wrap gap-4 items-center justify-center content-center">
              {aiSkills.map((skill, i) => (
                <motion.div
                  key={skill._id}
                  className={`${getBubbleSize(skill.size)} flex items-center justify-center text-center p-2 rounded-full border transition-all duration-300 group cursor-pointer overflow-hidden`}
                  style={{
                    backgroundColor: 'rgba(196, 93, 62, 0.1)',
                    borderColor: 'rgba(196, 93, 62, 0.3)',
                  }}
                  variants={floatingVariants(i * 0.1, 3 + Math.random() * 2)}
                  animate="animate"
                  whileHover={{ scale: 1.1, borderColor: 'rgba(196, 93, 62, 0.7)' }}
                >
                  <span
                    className="font-mono text-xs font-semibold transition-colors leading-tight"
                    style={{ color: 'var(--accent)', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
                  >
                    {skill.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Marketing Skills */}
          <div className="relative h-96 flex items-center justify-center">
            <div className="relative w-full h-full flex flex-wrap gap-4 items-center justify-center content-center">
              {marketingSkills.map((skill, i) => (
                <motion.div
                  key={skill._id}
                  className={`${getBubbleSize(skill.size)} flex items-center justify-center text-center p-2 rounded-full border transition-all duration-300 group cursor-pointer overflow-hidden`}
                  style={{
                    backgroundColor: 'rgba(26, 26, 26, 0.05)',
                    borderColor: 'rgba(26, 26, 26, 0.2)',
                  }}
                  variants={floatingVariants(i * 0.15, 3.5 + Math.random() * 2)}
                  animate="animate"
                  whileHover={{ scale: 1.1, borderColor: 'rgba(26, 26, 26, 0.5)' }}
                >
                  <span
                    className="font-mono text-xs font-semibold transition-colors leading-tight"
                    style={{ color: 'var(--foreground)', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
                  >
                    {skill.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
