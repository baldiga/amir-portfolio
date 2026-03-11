import Link from 'next/link';

export const metadata = {
  title: 'Magazine - Amir Baldiga',
  description: 'Articles and insights by Amir Baldiga',
};

export default function MagazinePage() {
  return (
    <div className="min-h-screen flex items-center justify-center pt-32">
      <div className="text-center max-w-2xl mx-auto px-6">
        <span className="font-mono text-sm tracking-widest uppercase" style={{ color: 'var(--accent)' }}>
          Coming Soon
        </span>
        <h1 className="font-heading text-5xl md:text-6xl font-bold mt-4 mb-6">Magazine</h1>
        <p className="text-lg mb-8" style={{ color: 'var(--muted-foreground)' }}>
          Articles, insights, and deep dives into marketing, AI, and growth. This page is under construction.
        </p>
        <Link href="/" className="btn-primary inline-block">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
