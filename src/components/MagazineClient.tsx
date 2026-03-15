'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, ArrowRight, Bot, Hammer } from 'lucide-react';

interface Post {
  _id: string;
  title: string;
  excerpt?: string;
  featuredImageUrl?: string;
  category?: string;
  section?: 'build' | 'magazine';
  featured?: boolean;
  slug?: { current: string };
  publishedAt?: string;
  readingTime?: number;
  tags?: string[];
}

function PostCard({ post, index, featured }: { post: Post; index: number; featured?: boolean }) {
  const href = `/magazine/${post.slug?.current}`;
  const isAI = post.category === 'AI Projects';
  const isBuild = post.section === 'build';
  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('he-IL', { month: 'short', day: 'numeric', year: 'numeric' })
    : '';

  if (featured) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="col-span-12 md:col-span-8"
      >
        <Link href={href} className="block group h-full">
          <div
            className="relative rounded-2xl overflow-hidden h-full"
            style={{ minHeight: 460, border: '1px solid var(--border)' }}
          >
            {post.featuredImageUrl ? (
              <>
                <Image
                  src={post.featuredImageUrl}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 67vw"
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,40,0.92) 0%, rgba(10,10,40,0.3) 60%)' }} />
              </>
            ) : (
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #0d0f3d, #191C70)' }} />
            )}

            <div className="absolute inset-0 flex flex-col justify-end p-8">
              <div className="flex items-center gap-3 mb-3">
                {isBuild && (
                  <span
                    className="font-mono text-xs uppercase tracking-widest px-3 py-1 rounded-full flex items-center gap-1"
                    style={{ backgroundColor: 'rgba(221,153,51,0.25)', color: '#DD9933', border: '1px solid rgba(221,153,51,0.4)', backdropFilter: 'blur(8px)' }}
                  >
                    <Hammer size={10} /> Build
                  </span>
                )}
                <span
                  className="font-mono text-xs uppercase tracking-widest px-3 py-1 rounded-full"
                  style={{ backgroundColor: 'rgba(255,255,255,0.12)', color: '#fff', backdropFilter: 'blur(8px)' }}
                >
                  {isAI && <span className="mr-1">🤖</span>}{post.category}
                </span>
                <span className="font-mono text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>{date}</span>
                {post.readingTime && (
                  <span className="font-mono text-xs flex items-center gap-1" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    <Clock size={11} /> {post.readingTime} דקות
                  </span>
                )}
              </div>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-3 leading-tight" style={{ direction: 'rtl' }}>
                {post.title}
              </h2>
              {post.excerpt && (
                <p className="text-sm mb-4 line-clamp-2" style={{ color: 'rgba(255,255,255,0.65)', direction: 'rtl' }}>
                  {post.excerpt}
                </p>
              )}
              <span
                className="inline-flex items-center gap-2 font-mono text-sm font-medium transition-all duration-200 group-hover:gap-3"
                style={{ color: 'rgba(255,255,255,0.8)' }}
              >
                קרא את המאמר המלא <ArrowRight size={14} />
              </span>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="col-span-12 sm:col-span-6 md:col-span-4"
    >
      <Link href={href} className="block group h-full">
        <div
          className="rounded-2xl overflow-hidden h-full flex flex-col transition-all duration-300 group-hover:-translate-y-1"
          style={{
            border: '1px solid var(--border)',
            background: 'var(--card)',
            boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 40px -8px rgba(25,28,112,0.1)';
            (e.currentTarget as HTMLElement).style.borderColor = 'rgba(25,28,112,0.25)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.boxShadow = '0 1px 3px rgba(0,0,0,0.04)';
            (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
          }}
        >
          {/* Image */}
          {post.featuredImageUrl ? (
            <div className="relative overflow-hidden" style={{ height: 200 }}>
              <Image
                src={post.featuredImageUrl}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
              {isBuild && (
                <div
                  className="absolute top-3 right-3 font-mono text-xs px-2 py-1 rounded-full flex items-center gap-1"
                  style={{ backgroundColor: 'rgba(221,153,51,0.9)', color: '#fff', backdropFilter: 'blur(4px)' }}
                >
                  <Hammer size={9} /> Build
                </div>
              )}
            </div>
          ) : (
            <div
              className="relative flex items-center justify-center"
              style={{ height: 200, background: isBuild ? 'linear-gradient(135deg, rgba(221,153,51,0.1), rgba(221,153,51,0.2))' : 'linear-gradient(135deg, rgba(25,28,112,0.08), rgba(25,28,112,0.15))' }}
            >
              {isBuild ? (
                <Hammer size={40} style={{ color: 'rgba(221,153,51,0.4)' }} />
              ) : isAI ? (
                <Bot size={40} style={{ color: 'rgba(25,28,112,0.3)' }} />
              ) : null}
              {isBuild && (
                <div
                  className="absolute top-3 right-3 font-mono text-xs px-2 py-1 rounded-full flex items-center gap-1"
                  style={{ backgroundColor: 'rgba(221,153,51,0.2)', color: '#DD9933', border: '1px solid rgba(221,153,51,0.3)' }}
                >
                  <Hammer size={9} /> Build
                </div>
              )}
            </div>
          )}

          {/* Content */}
          <div className="p-5 flex flex-col flex-1" style={{ direction: 'rtl' }}>
            <div className="flex items-center gap-2 mb-3">
              <span
                className="font-mono text-[10px] uppercase tracking-wider"
                style={{ color: isBuild ? '#DD9933' : isAI ? '#191C70' : 'var(--accent)' }}
              >
                {post.category}
              </span>
              {post.readingTime && (
                <span className="font-mono text-[10px] flex items-center gap-1" style={{ color: 'var(--muted-foreground)' }}>
                  <Clock size={10} /> {post.readingTime} דקות
                </span>
              )}
            </div>
            <h3 className="font-heading text-base font-semibold mb-2 leading-snug flex-1" style={{ color: 'var(--foreground)' }}>
              {post.title}
            </h3>
            {post.excerpt && (
              <p className="text-sm mb-4 line-clamp-2" style={{ color: 'var(--muted-foreground)', lineHeight: 1.6 }}>
                {post.excerpt.slice(0, 120)}
              </p>
            )}
            <span
              className="inline-flex items-center gap-1.5 font-mono text-xs font-medium mt-auto transition-all duration-200 group-hover:gap-2"
              style={{ color: isBuild ? '#DD9933' : '#191C70' }}
            >
              קרא עוד <ArrowRight size={12} />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

interface MagazineClientProps {
  posts: Post[];
  pageTitle?: string;
  pageDescription?: string;
}

export default function MagazineClient({ posts, pageTitle, pageDescription }: MagazineClientProps) {
  const [selectedFilter, setSelectedFilter] = useState('הכל');

  // Section filters always at the top
  const sectionFilters = [
    { label: 'הכל', value: 'הכל' },
    { label: '🔨 Build', value: 'build' },
    { label: '📰 Magazine', value: 'magazine' },
  ];

  // Category filters derived from posts
  const categoryFilters = useMemo(() => {
    const cats = Array.from(new Set(posts.map((p) => p.category).filter((c): c is string => Boolean(c))));
    return cats;
  }, [posts]);

  const filtered = useMemo(() => {
    if (selectedFilter === 'הכל') return posts;
    if (selectedFilter === 'build') return posts.filter((p) => p.section === 'build');
    if (selectedFilter === 'magazine') return posts.filter((p) => p.section === 'magazine');
    return posts.filter((p) => p.category === selectedFilter);
  }, [posts, selectedFilter]);

  const featuredPost = filtered.find((p) => p.featured);
  const restPosts = filtered.filter((p) => !p.featured || filtered.indexOf(p) > 0);

  const isBuildPage = pageTitle === 'Build';

  return (
    <div style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)', direction: 'rtl' }}>
      {/* ── Hero ── */}
      <section className="pt-36 pb-16 px-6 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span
            className="font-mono text-xs uppercase tracking-widest mb-4 inline-block"
            style={{ color: isBuildPage ? '#DD9933' : 'var(--accent)' }}
          >
            {pageTitle || 'Magazine'}
          </span>
          <h1
            className="font-heading font-bold mb-4"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', letterSpacing: '-0.03em' }}
          >
            {isBuildPage ? 'פרויקטי AI & Build' : 'מאמרים ותובנות'}
          </h1>
          <p className="text-lg max-w-xl" style={{ color: 'var(--muted-foreground)', lineHeight: 1.7 }}>
            {pageDescription || 'מדריכים מעמיקים על AI שיווקי, אוטומציה, כלים לעסקים ואסטרטגיה B2B — מניסיון ישיר מהשטח.'}
          </p>
        </motion.div>
      </section>

      {/* ── Filters ── */}
      <section className="max-w-7xl mx-auto px-6 pb-8">
        <div className="flex gap-3 flex-wrap">
          {/* Section filters */}
          {!isBuildPage && sectionFilters.map(({ label, value }) => {
            const isActive = selectedFilter === value;
            const isBuildFilter = value === 'build';
            return (
              <button
                key={value}
                onClick={() => setSelectedFilter(value)}
                className="font-mono text-xs px-5 py-2 rounded-full whitespace-nowrap transition-all duration-300"
                style={{
                  backgroundColor: isActive ? (isBuildFilter ? '#DD9933' : 'var(--accent)') : 'transparent',
                  color: isActive ? '#fff' : isBuildFilter ? '#DD9933' : 'var(--foreground)',
                  border: `1px solid ${isActive ? (isBuildFilter ? '#DD9933' : 'var(--accent)') : isBuildFilter ? 'rgba(221,153,51,0.4)' : 'var(--border)'}`,
                  fontWeight: isActive ? 600 : 400,
                }}
              >
                {label}
              </button>
            );
          })}

          {/* Divider */}
          {!isBuildPage && categoryFilters.length > 0 && (
            <div className="flex items-center" style={{ color: 'var(--border)' }}>|</div>
          )}

          {/* Category filters */}
          {categoryFilters.map((cat) => {
            const isActive = selectedFilter === cat;
            const isAICat = cat === 'AI Projects';
            return (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className="font-mono text-xs px-5 py-2 rounded-full whitespace-nowrap transition-all duration-300 flex items-center gap-1.5"
                style={{
                  backgroundColor: isActive ? (isAICat ? '#191C70' : 'var(--accent)') : 'transparent',
                  color: isActive ? '#fff' : isAICat ? '#191C70' : 'var(--foreground)',
                  border: `1px solid ${isActive ? (isAICat ? '#191C70' : 'var(--accent)') : isAICat ? 'rgba(25,28,112,0.35)' : 'var(--border)'}`,
                }}
              >
                {isAICat && <Bot size={11} />}
                {cat}
              </button>
            );
          })}
        </div>
      </section>

      {/* ── Grid ── */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-12 gap-6">
          <AnimatePresence mode="popLayout">
            {featuredPost && (
              <PostCard key={`featured-${featuredPost._id}`} post={featuredPost} index={0} featured />
            )}
            {/* Side mini-cards next to featured */}
            {featuredPost && restPosts.slice(0, 2).map((post, i) => (
              <div key={post._id} className="col-span-12 md:col-span-4 flex flex-col gap-6">
                <PostCard post={post} index={i + 1} />
              </div>
            ))}
            {/* Remaining posts */}
            {(featuredPost ? restPosts.slice(2) : filtered).map((post, i) => (
              <PostCard key={post._id} post={post} index={featuredPost ? i + 3 : i} />
            ))}
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="col-span-12 text-center py-20" style={{ color: 'var(--muted-foreground)' }}>
              <p>אין מאמרים בסינון זה עדיין.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
