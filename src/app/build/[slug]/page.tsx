import { notFound } from 'next/navigation';
import { getCaseStudyBySlug, getAllCaseStudySlugs } from '@/lib/sanity-fetch';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Bot, Tag } from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllCaseStudySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const project = await getCaseStudyBySlug(slug);
  if (!project) return { title: 'Project Not Found' };
  return {
    title: `${project.title} — Amir Baldiga`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getCaseStudyBySlug(slug);

  if (!project) notFound();

  const isAI = project.category === 'AI Projects';

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}
    >
      {/* Back nav */}
      <div className="max-w-4xl mx-auto px-6 pt-32 pb-6">
        <Link
          href="/#case-studies"
          className="inline-flex items-center gap-2 font-mono text-xs tracking-wider uppercase transition-opacity duration-200 opacity-60 hover:opacity-100"
          style={{ color: 'var(--foreground)' }}
        >
          <ArrowLeft size={14} />
          Back to Portfolio
        </Link>
      </div>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pb-16">
        {/* Category badge */}
        <div className="flex items-center gap-2 mb-6">
          {isAI && (
            <span
              className="inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full font-mono font-semibold"
              style={{ backgroundColor: 'rgba(25, 28, 112, 0.12)', color: '#191C70' }}
            >
              <Bot size={12} />
              AI Project
            </span>
          )}
          <span
            className="font-mono text-xs tracking-widest uppercase"
            style={{ color: 'var(--accent)' }}
          >
            {project.category}
          </span>
        </div>

        {/* Title */}
        <h1
          className="font-heading text-4xl md:text-6xl font-semibold mb-4 leading-tight"
          style={{ color: 'var(--foreground)' }}
        >
          {project.title}
        </h1>

        {/* Subtitle */}
        {project.subtitle && (
          <p className="text-xl mb-8" style={{ color: 'var(--accent)' }}>
            {project.subtitle}
          </p>
        )}

        {/* Result highlight */}
        {project.result && (
          <div
            className="inline-block px-6 py-4 rounded-xl border mb-12"
            style={{
              backgroundColor: isAI ? 'rgba(25, 28, 112, 0.08)' : 'rgba(196, 93, 62, 0.08)',
              borderColor: isAI ? 'rgba(25, 28, 112, 0.25)' : 'rgba(196, 93, 62, 0.25)',
            }}
          >
            <p className="font-mono text-xs uppercase tracking-wider mb-1 opacity-60">Key Result</p>
            <p
              className="font-mono text-lg font-bold"
              style={{ color: isAI ? '#191C70' : 'var(--accent)' }}
            >
              {project.result}
            </p>
          </div>
        )}

        {/* Divider */}
        <hr style={{ borderColor: 'var(--border)' }} className="mb-12" />

        {/* Description */}
        <div className="prose prose-lg max-w-none mb-12">
          <p
            className="text-lg leading-relaxed"
            style={{ color: 'var(--muted-foreground)' }}
          >
            {project.description}
          </p>
        </div>

        {/* Tags */}
        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-12">
            {project.tags.map((tag: string) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 font-mono text-xs px-3 py-1.5 rounded-full border"
                style={{
                  borderColor: 'var(--border)',
                  color: 'var(--muted-foreground)',
                }}
              >
                <Tag size={10} />
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* CTA buttons */}
        <div className="flex flex-wrap gap-4">
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-mono text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
              style={{
                backgroundColor: isAI ? '#191C70' : 'var(--accent)',
              }}
            >
              Read Full Article
              <ExternalLink size={14} />
            </a>
          )}
          <Link
            href="/#case-studies"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-mono text-sm font-semibold border transition-all duration-200 hover:opacity-70"
            style={{
              borderColor: 'var(--border)',
              color: 'var(--foreground)',
            }}
          >
            <ArrowLeft size={14} />
            All Projects
          </Link>
        </div>
      </section>
    </div>
  );
}
