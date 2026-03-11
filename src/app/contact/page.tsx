import Link from 'next/link';

export const metadata = {
  title: 'Contact - Amir Baldiga',
  description: 'Get in touch with Amir Baldiga',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen flex items-center justify-center pt-32">
      <div className="text-center max-w-2xl mx-auto px-6">
        <span className="font-mono text-sm tracking-widest uppercase" style={{ color: 'var(--accent)' }}>
          Get in Touch
        </span>
        <h1 className="font-heading text-5xl md:text-6xl font-bold mt-4 mb-6">Contact</h1>
        <p className="text-lg mb-8" style={{ color: 'var(--muted-foreground)' }}>
          Want to work together? Reach out and let&apos;s talk. This page is under construction.
        </p>
        <a
          href="https://linkedin.com/in/amirbaldiga"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary inline-block mb-4"
        >
          Connect on LinkedIn
        </a>
        <br />
        <Link href="/" className="btn-outline inline-block mt-4">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
