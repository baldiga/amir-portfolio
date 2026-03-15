'use client';

import { motion } from 'framer-motion';

const milestones = [
  {
    year: '2018',
    title: 'First Business & IDF Discharge',
    description: 'One week after my military service ended, I launched my first business as a Campaign Manager. Simultaneously ran youth coordination at Kibbutz Reim while building the company from scratch.',
    tags: ['Freelance', 'Campaign Management'],
  },
  {
    year: '2019',
    title: 'PPC & Social Media Manager — LaserWar',
    description: 'Joined LaserWar as PPC & Organic Social Media Manager. Managed paid campaigns across Google and Meta while growing organic channels. Also made a major personal decision — getting engaged.',
    tags: ['PPC', 'Meta Ads', 'Google Ads', 'LaserWar'],
  },
  {
    year: '2020',
    title: 'Social Growth Manager — Roomate',
    description: 'Took on a Social Growth Manager role at Roomate, directing acquisition campaigns that drove measurable CAC reductions. In parallel, started learning blockchain and built an ERC-20 token — early signal of my curiosity toward emerging tech.',
    tags: ['Growth', 'Acquisition', 'Web3', 'Roomate'],
  },
  {
    year: '2021',
    title: 'Head of Marketing — GettingReach',
    description: 'Promoted to Head of Marketing at GettingReach LTD, managing an 8-person team. Delivered 59x ROI over 12 months through full-funnel B2B GTM strategy. Also appeared on Channel 12 TV — first national media appearance.',
    tags: ['Leadership', 'B2B GTM', 'Team of 8', 'TV Feature'],
  },
  {
    year: '2023',
    title: 'Freelance Consultant & Community Builder',
    description: 'Started independent consulting. Built and led a community of 54,000 members, mentored 100+ founders through personal coaching, and taught 7,000+ course graduates. Began positioning as a leading voice in AI-driven marketing.',
    tags: ['Consulting', 'Community', 'Coaching', 'AI Marketing'],
  },
  {
    year: '2024',
    title: 'International Speaker & GTM Strategist',
    description: 'Led a major conference with Mizrahi Bank and SMOOVE in attendance. Flew to Canada for a keynote training session. Deepened specialization in B2B lead generation and AI-powered outbound workflows.',
    tags: ['Speaking', 'Canada', 'Lead Gen', 'AI'],
  },
  {
    year: '2025–26',
    title: 'Building Milla — AI Marketing Assistant',
    description: 'Launched Milla, an AI marketing assistant on WhatsApp — 369 pages of code, built for sales professionals. Pursuing an MBA in High-Tech Marketing. Still consulting, still building, still at eye level with the people I work with.',
    tags: ['AI', 'WhatsApp', 'MVP', 'MBA', 'Milla'],
  },
];

export default function CVTimeline() {
  return (
    <section className="py-32 border-t" style={{ borderColor: 'var(--border)' }}>
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <span className="font-mono text-sm tracking-widest uppercase" style={{ color: 'var(--accent)' }}>
            02 —
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-semibold mt-2">The Journey</h2>
          <p className="mt-4 max-w-xl" style={{ color: 'var(--muted-foreground)' }}>
            From a kibbutz kid to building AI products — every stop shaped the next.
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-[22px] top-0 bottom-0 w-px"
            style={{ backgroundColor: 'var(--border)' }}
          />

          <div className="space-y-10">
            {milestones.map((m, i) => (
              <motion.div
                key={m.year}
                className="relative flex gap-10"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
              >
                {/* Dot */}
                <div className="relative shrink-0" style={{ width: 44 }}>
                  <div
                    className="absolute top-1.5 w-[11px] h-[11px] rounded-full border-2"
                    style={{
                      left: '50%',
                      transform: 'translateX(-50%)',
                      backgroundColor: 'var(--accent)',
                      borderColor: 'var(--background)',
                      boxShadow: '0 0 0 3px rgba(196,93,62,0.2)',
                    }}
                  />
                </div>

                {/* Card */}
                <div
                  className="flex-1 mb-2 p-6 rounded-xl border transition-all duration-300 group cursor-default"
                  style={{ borderColor: 'var(--border)', backgroundColor: 'rgba(245,243,239,0.4)' }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(196,93,62,0.35)';
                    (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(196,93,62,0.04)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
                    (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(245,243,239,0.4)';
                  }}
                >
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span
                      className="font-mono text-xs font-bold tracking-widest px-2 py-0.5 rounded"
                      style={{ color: 'var(--accent)', backgroundColor: 'rgba(196,93,62,0.1)' }}
                    >
                      {m.year}
                    </span>
                    <h3 className="font-heading text-lg font-semibold">{m.title}</h3>
                  </div>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--muted-foreground)' }}>
                    {m.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {m.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-mono px-2 py-0.5 rounded-full border"
                        style={{ borderColor: 'var(--border)', color: 'var(--muted-foreground)' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
