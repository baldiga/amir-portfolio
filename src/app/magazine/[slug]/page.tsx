import { notFound } from 'next/navigation';
import { getBlogPostBySlug, getAllBlogPostSlugs } from '@/lib/sanity-fetch';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Clock, Calendar, ExternalLink, Mail } from 'lucide-react';
import ArticleContent from '@/components/ArticleContent';
import ArticleFaq from '@/components/ArticleFaq';

export const dynamicParams = true;
export const revalidate = 0;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllBlogPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return { title: 'Article Not Found' };
  return {
    title: `${post.title} — Amir Baldiga`,
    description: post.metaDescription || post.excerpt,
    openGraph: {
      title: post.title,
      description: post.metaDescription || post.excerpt,
      images: post.featuredImageUrl ? [{ url: post.featuredImageUrl }] : [],
      type: 'article',
    },
  };
}

function ArticleCta() {
  return (
    <div
      className="rounded-2xl p-8 my-10 flex flex-col md:flex-row items-center justify-between gap-6"
      style={{
        background: 'linear-gradient(135deg, #191C70 0%, #2a2d8a 100%)',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <div>
        <p className="font-mono text-xs uppercase tracking-widest mb-2" style={{ color: 'rgba(255,255,255,0.5)' }}>
          רוצה לעבוד ביחד?
        </p>
        <h3 className="font-heading text-xl font-semibold text-white leading-tight" style={{ maxWidth: 400 }}>
          נשמח לשמוע על האתגרים שלך בשיווק ו-AI
        </h3>
      </div>
      <div className="flex gap-3 flex-shrink-0">
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 font-mono text-sm font-semibold px-6 py-3 rounded-lg transition-all duration-200 hover:-translate-y-0.5"
          style={{ backgroundColor: '#C45D3E', color: '#fff', boxShadow: '0 4px 20px rgba(196,93,62,0.35)' }}
        >
          <Mail size={14} />
          צרו קשר
        </Link>
        <a
          href="https://linkedin.com/in/amirbaldiga"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-mono text-sm font-semibold px-6 py-3 rounded-lg transition-all duration-200 hover:bg-white/10"
          style={{ border: '1px solid rgba(255,255,255,0.25)', color: '#fff' }}
        >
          LinkedIn
          <ExternalLink size={13} />
        </a>
      </div>
    </div>
  );
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) notFound();

  const isAI = post.category === 'AI Projects';
  const publishedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('he-IL', { year: 'numeric', month: 'long', day: 'numeric' })
    : '';

  return (
    <div style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
      {/* ── Hero image + title ── */}
      <div className="relative w-full" style={{ minHeight: '55vh', maxHeight: 620, overflow: 'hidden' }}>
        {post.featuredImageUrl ? (
          <>
            <Image
              src={post.featuredImageUrl}
              alt={post.title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to bottom, rgba(10,10,40,0.3) 0%, rgba(10,10,40,0.85) 100%)',
              }}
            />
          </>
        ) : (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(135deg, #0d0f3d 0%, #191C70 100%)',
            }}
          />
        )}

        {/* Back nav */}
        <div className="absolute top-0 left-0 right-0 pt-28 px-6 z-10">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/magazine"
              className="inline-flex items-center gap-2 font-mono text-xs tracking-wider uppercase transition-all duration-200 hover:opacity-100"
              style={{ color: 'rgba(255,255,255,0.65)' }}
            >
              <ArrowLeft size={13} />
              חזרה למגזין
            </Link>
          </div>
        </div>

        {/* Title block */}
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-12 z-10">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <span
                className="font-mono text-xs uppercase tracking-widest px-3 py-1 rounded-full"
                style={{
                  backgroundColor: isAI ? 'rgba(25,28,112,0.6)' : 'rgba(196,93,62,0.6)',
                  border: `1px solid ${isAI ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.2)'}`,
                  color: '#fff',
                  backdropFilter: 'blur(8px)',
                }}
              >
                {post.category}
              </span>
              {post.readingTime && (
                <span className="font-mono text-xs flex items-center gap-1.5" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  <Clock size={12} />
                  {post.readingTime} דקות קריאה
                </span>
              )}
              {publishedDate && (
                <span className="font-mono text-xs flex items-center gap-1.5" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  <Calendar size={12} />
                  {publishedDate}
                </span>
              )}
            </div>
            <h1
              className="font-heading font-bold text-white leading-tight"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)', letterSpacing: '-0.02em', maxWidth: 780 }}
            >
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="mt-3 text-base" style={{ color: 'rgba(255,255,255,0.7)', maxWidth: 640 }}>
                {post.excerpt.slice(0, 160)}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ── Article Body ── */}
      <div className="max-w-4xl mx-auto px-6 py-12">

        {/* Top CTA */}
        <ArticleCta />

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-10">
            {post.tags.map((tag: string) => (
              <span
                key={tag}
                className="font-mono text-xs px-3 py-1 rounded-full"
                style={{ backgroundColor: 'var(--secondary)', border: '1px solid var(--border)', color: 'var(--muted-foreground)' }}
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* FAQ Section */}
        {post.faq && post.faq.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px flex-1" style={{ backgroundColor: 'var(--border)' }} />
              <span className="font-mono text-xs uppercase tracking-widest" style={{ color: 'var(--accent)' }}>
                שאלות נפוצות
              </span>
              <div className="h-px flex-1" style={{ backgroundColor: 'var(--border)' }} />
            </div>
            <ArticleFaq items={post.faq} />
          </section>
        )}

        {/* Main article content */}
        <article className="mb-12">
          <ArticleContent rawHtml={post.rawHtml} />
        </article>

        {/* Bottom CTA — same as top */}
        <ArticleCta />

        {/* Navigation */}
        <div className="flex items-center justify-between pt-8 mt-8" style={{ borderTop: '1px solid var(--border)' }}>
          <Link
            href="/magazine"
            className="inline-flex items-center gap-2 font-mono text-xs tracking-wider uppercase opacity-60 hover:opacity-100 transition-opacity"
          >
            <ArrowLeft size={13} />
            כל המאמרים
          </Link>
          {isAI && (
            <Link
              href="/build"
              className="inline-flex items-center gap-2 font-mono text-xs tracking-wider uppercase opacity-60 hover:opacity-100 transition-opacity"
            >
              עוד פרויקטי AI
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
