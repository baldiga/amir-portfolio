'use client';

import { motion } from 'framer-motion';

interface Experience {
  _id: string;
  title: string;
  company: string;
  period: string;
  description: string;
  order: number;
}

export default function ExperienceSection({ experience }: { experience: Experience[] }) {
  return (
    <section className="py-32 border-t" style={{ borderColor: 'var(--border)' }}>
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="font-mono text-sm tracking-widest uppercase" style={{ color: 'var(--accent)' }}>
            04 —
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-semibold mt-2">Experience</h2>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 md:transform md:-translate-x-1/2"
            style={{ backgroundColor: 'var(--border)' }}
          />

          {/* Timeline Items */}
          <div className="space-y-12">
            {experience.map((exp, i) => (
              <motion.div
                key={exp._id}
                className={`relative md:w-1/2 ${i % 2 === 0 ? 'md:ml-0 md:pr-12' : 'md:ml-auto md:pl-12'}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                {/* Timeline Dot */}
                <div
                  className="absolute left-0 top-2 w-4 h-4 rounded-full border-4 md:left-1/2 md:transform md:-translate-x-1/2 z-10"
                  style={{
                    backgroundColor: 'var(--accent)',
                    borderColor: 'var(--background)',
                  }}
                />

                {/* Content Card */}
                <div
                  className="ml-12 md:ml-0 p-6 border rounded-lg transition-all duration-300 hover:shadow-lg group"
                  style={{
                    borderColor: 'var(--border)',
                    backgroundColor: 'rgba(245, 243, 239, 0.3)',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(196, 93, 62, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
                  }}
                >
                  <p className="font-mono text-xs tracking-wider uppercase mb-2" style={{ color: 'var(--accent)' }}>
                    {exp.period}
                  </p>
                  <h3 className="font-heading text-xl font-semibold mb-1">{exp.title}</h3>
                  <p className="text-sm mb-3" style={{ color: 'var(--accent)' }}>
                    {exp.company}
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                    {exp.description}
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
