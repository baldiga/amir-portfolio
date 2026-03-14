'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, ExternalLink, Bot, Star, Zap } from 'lucide-react';

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

/* ── Animated grid background ── */
function GridCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const cellSize = 50;

    function resize() {
      if (!canvas) return;
      canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.offsetHeight || 600;
    }

    function draw() {
      if (!canvas || !ctx) return;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const time = Date.now() * 0.001;
      const cols = Math.ceil(w / cellSize) + 1;
      const rows = Math.ceil(h / cellSize) + 1;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (let i = 0; i <= cols; i++) {
        for (let j = 0; j <= rows; j++) {
          const x = i * cellSize;
          const y = j * cellSize;
          const dx = mx - x;
          const dy = my - y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const influence = Math.max(0, 1 - dist / 200);
          const wave = Math.sin(time + i * 0.3 + j * 0.2) * 0.3 + 0.7;
          const alpha = 0.03 + influence * 0.12 + wave * 0.02;

          ctx.beginPath();
          ctx.arc(x, y, 1.5 + influence * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(25, 28, 112, ${alpha})`;
          ctx.fill();

          if (influence > 0.1) {
            ctx.strokeStyle = `rgba(25, 28, 112, ${influence * 0.08})`;
            ctx.lineWidth = 0.5;
            if (i < cols) {
              ctx.beginPath();
              ctx.moveTo(x, y);
              ctx.lineTo(x + cellSize, y);
              ctx.stroke();
            }
            if (j < rows) {
              ctx.beginPath();
              ctx.moveTo(x, y);
              ctx.lineTo(x, y + cellSize);
              ctx.stroke();
            }
          }
        }
      }
      animId = requestAnimationFrame(draw);
    }

    const handleResize = () => resize();
    const handleMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousemove', handleMouse);
    resize();
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}
    />
  );
}

/* ── Bento Card Component ── */
function BentoCard({
  cs,
  size,
  index,
}: {
  cs: CaseStudy;
  size: 'featured' | 'wide' | 'medium' | 'side';
  index: number;
}) {
  const isAI = cs.category === AI_CATEGORY;
  const href = cs.slug?.current ? `/build/${cs.slug.current}` : cs.link || null;
  const isInternal = !!cs.slug?.current;

  const sizeClasses: Record<string, string> = {
    featured: 'md:col-span-8 md:row-span-2',
    wide: 'md:col-span-6',
    medium: 'md:col-span-4',
    side: 'md:col-span-4',
  };

  const isFeatured = size === 'featured';

  const cardContent = (
    <motion.div
      className={`relative rounded-2xl border overflow-hidden cursor-pointer flex flex-col justify-end col-span-12 ${sizeClasses[size]}`}
      style={{
        borderColor: isFeatured ? 'rgba(255,255,255,0.08)' : 'var(--border)',
        background: isFeatured
          ? 'linear-gradient(145deg, #0d0f3d 0%, #191C70 40%, #2a2d8a 100%)'
          : 'var(--card)',
        padding: isFeatured ? '40px' : '28px',
        minHeight: isFeatured ? '420px' : size === 'wide' ? '240px' : '260px',
        color: isFeatured ? '#fff' : 'var(--foreground)',
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 15, scale: 0.97 }}
      transition={{ delay: index * 0.06, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{
        y: isFeatured ? -8 : -6,
        boxShadow: isFeatured
          ? '0 25px 80px -15px rgba(25,28,112,0.4)'
          : '0 20px 60px -15px rgba(25,28,112,0.12)',
        borderColor: isFeatured ? 'rgba(255,255,255,0.15)' : 'rgba(25,28,112,0.3)',
      }}
    >
      {/* Featured decorations */}
      {isFeatured && (
        <>
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              position: 'absolute',
              width: 300,
              height: 300,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(196,93,62,0.2) 0%, transparent 70%)',
              top: -80,
              right: -60,
              pointerEvents: 'none',
            }}
          />
          <span
            className="absolute top-6 right-6 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full"
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              color: 'rgba(255,255,255,0.8)',
            }}
          >
            <Star size={10} />
            Featured
          </span>
        </>
      )}

      {/* Category */}
      <div className="flex items-center gap-2 mb-2">
        {isAI && (
          <span
            className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full font-mono"
            style={{
              backgroundColor: isFeatured ? 'rgba(255,255,255,0.1)' : 'rgba(25,28,112,0.1)',
              color: isFeatured ? 'rgba(255,255,255,0.7)' : '#191C70',
            }}
          >
            <Bot size={10} />
            AI
          </span>
        )}
        <span
          className="font-mono text-[11px] tracking-wider uppercase"
          style={{ color: isFeatured ? 'rgba(255,255,255,0.5)' : 'var(--accent)' }}
        >
          {cs.category}
        </span>
      </div>

      {/* Title */}
      <h3
        className="font-heading font-semibold mb-2 leading-tight"
        style={{ fontSize: isFeatured ? '2rem' : size === 'wide' ? '1.25rem' : '1.15rem' }}
      >
        {cs.title}
      </h3>

      {/* Subtitle */}
      {cs.subtitle && (
        <p
          className="text-sm mb-3"
          style={{ color: isFeatured ? 'rgba(255,255,255,0.6)' : 'var(--accent)' }}
        >
          {cs.subtitle}
        </p>
      )}

      {/* Description */}
      <p
        className="text-sm leading-relaxed mb-4"
        style={{
          color: isFeatured ? 'rgba(255,255,255,0.6)' : 'var(--muted-foreground)',
          maxWidth: isFeatured ? 480 : undefined,
        }}
      >
        {cs.description}
      </p>

      {/* Result badge */}
      {cs.result && (
        <span
          className="inline-block font-mono text-[11px] font-medium px-3 py-1.5 rounded-lg mb-4 self-start"
          style={{
            backgroundColor: isFeatured ? 'rgba(255,255,255,0.08)' : 'rgba(25,28,112,0.06)',
            border: `1px solid ${isFeatured ? 'rgba(255,255,255,0.15)' : 'rgba(25,28,112,0.12)'}`,
            color: isFeatured ? 'rgba(255,255,255,0.85)' : '#191C70',
          }}
        >
          {cs.result}
        </span>
      )}

      {/* Tags */}
      {cs.tags && cs.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {cs.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[10px] px-2.5 py-1 rounded-full"
              style={{
                backgroundColor: isFeatured ? 'rgba(255,255,255,0.08)' : 'var(--secondary)',
                border: `1px solid ${isFeatured ? 'rgba(255,255,255,0.12)' : 'var(--border)'}`,
                color: isFeatured ? 'rgba(255,255,255,0.6)' : 'var(--muted-foreground)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* CTA */}
      {href && (
        <span
          className="inline-flex items-center gap-1.5 font-mono text-xs font-medium mt-auto self-start px-4 py-2 rounded-lg border transition-all duration-200"
          style={{
            borderColor: isFeatured ? 'rgba(255,255,255,0.25)' : 'var(--border)',
            color: isFeatured ? '#fff' : 'var(--foreground)',
          }}
        >
          {isInternal ? 'View Project' : 'View Work'}
          {isInternal ? <ArrowRight size={13} /> : <ExternalLink size={13} />}
        </span>
      )}
    </motion.div>
  );

  if (!href) return cardContent;

  if (isInternal) {
    return (
      <Link href={href} className="contents">
        {cardContent}
      </Link>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="contents">
      {cardContent}
    </a>
  );
}

/* ── Main Build Page Client ── */
export default function BuildPageClient({ caseStudies }: { caseStudies: CaseStudy[] }) {
  const [selectedFilter, setSelectedFilter] = useState('All');

  // Sort categories with AI first
  const categories = useMemo(() => {
    const cats = Array.from(new Set(caseStudies.map((cs) => cs.category)));
    cats.sort((a, b) => {
      if (a === AI_CATEGORY) return -1;
      if (b === AI_CATEGORY) return 1;
      return 0;
    });
    return ['All', ...cats];
  }, [caseStudies]);

  const filteredStudies = useMemo(() => {
    const filtered =
      selectedFilter === 'All'
        ? caseStudies
        : caseStudies.filter((cs) => cs.category === selectedFilter);
    return [...filtered].sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      if (a.category === AI_CATEGORY && b.category !== AI_CATEGORY) return -1;
      if (b.category === AI_CATEGORY && a.category !== AI_CATEGORY) return 1;
      return (a.order ?? 99) - (b.order ?? 99);
    });
  }, [caseStudies, selectedFilter]);

  // Assign sizes: first featured item gets "featured", then alternate wide/medium/side
  const getSizeForIndex = (index: number, cs: CaseStudy): 'featured' | 'wide' | 'medium' | 'side' => {
    if (index === 0 && cs.featured) return 'featured';
    const adjustedIndex = cs.featured && filteredStudies[0]?.featured ? index - 1 : index;
    const pattern: Array<'side' | 'side' | 'wide' | 'wide' | 'medium' | 'medium' | 'medium'> = [
      'side', 'side', 'wide', 'wide', 'medium', 'medium', 'medium',
    ];
    return pattern[adjustedIndex % pattern.length];
  };

  return (
    <div style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden" style={{ padding: '140px 0 80px' }}>
        <GridCanvas />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span
              className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase px-4 py-1.5 rounded-full mb-6"
              style={{
                color: '#191C70',
                background: 'rgba(25,28,112,0.06)',
                border: '1px solid rgba(25,28,112,0.15)',
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: '#191C70', animation: 'pulse 2s ease-in-out infinite' }}
              />
              Build Lab
            </span>
            <h1
              className="font-heading font-bold mb-4"
              style={{
                fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                letterSpacing: '-0.03em',
                background: 'linear-gradient(135deg, var(--foreground) 0%, #191C70 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              What I Build
            </h1>
            <p className="text-lg max-w-xl" style={{ color: 'var(--muted-foreground)', lineHeight: 1.7 }}>
              AI-powered tools, marketing systems, and automation projects. Each one built to solve a real problem — and documented so you can learn from the process.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Filters ── */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 pb-10">
        <div className="flex gap-3 flex-wrap">
          {categories.map((cat) => {
            const isAICat = cat === AI_CATEGORY;
            const isActive = selectedFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className="font-mono text-xs px-5 py-2 rounded-full whitespace-nowrap transition-all duration-300 flex items-center gap-1.5"
                style={{
                  backgroundColor: isActive ? (isAICat ? '#191C70' : 'var(--accent)') : 'transparent',
                  color: isActive ? '#fff' : isAICat ? '#191C70' : 'var(--foreground)',
                  border: `1px solid ${isActive ? (isAICat ? '#191C70' : 'var(--accent)') : isAICat ? 'rgba(25,28,112,0.4)' : 'var(--border)'}`,
                  fontWeight: isAICat ? 600 : 400,
                }}
              >
                {isAICat && <Bot size={11} />}
                {cat}
              </button>
            );
          })}
        </div>
      </section>

      {/* ── Bento Grid ── */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 pb-24">
        <motion.div
          className="grid grid-cols-12 gap-5"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredStudies.map((cs, i) => (
              <BentoCard key={cs._id} cs={cs} size={getSizeForIndex(i, cs)} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="text-center pb-24 px-6">
        <p className="text-lg mb-6" style={{ color: 'var(--muted-foreground)' }}>
          More projects are being added regularly.
        </p>
        <Link
          href="/#contact"
          className="inline-flex items-center gap-2 font-mono text-sm font-medium px-8 py-3.5 rounded-lg transition-all duration-300 hover:-translate-y-0.5"
          style={{
            backgroundColor: 'var(--accent)',
            color: '#fff',
            boxShadow: '0 2px 8px rgba(196,93,62,0.2)',
          }}
        >
          <Zap size={15} />
          Let&apos;s Talk
        </Link>
      </section>

      {/* Pulse animation keyframes */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}
