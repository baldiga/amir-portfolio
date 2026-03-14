import Link from 'next/link';
import { Linkedin, Twitter, Mail } from 'lucide-react';

interface FooterProps {
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
}

export default function Footer({ socialLinks }: FooterProps) {
  const linkedin = socialLinks?.linkedin || 'https://linkedin.com/in/amirbaldiga';
  const twitter = socialLinks?.twitter || 'https://twitter.com';
  const email = socialLinks?.email || 'amirbaldiga@gmail.com';

  return (
    <footer className="border-t py-16" style={{ borderColor: 'var(--border)' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Copyright */}
          <div>
            <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
              &copy; 2026 Amir Baldiga. All rights reserved.
            </p>
            <p className="text-sm mt-2" style={{ color: 'var(--muted-foreground)' }}>
              The Transparent Builder.
            </p>
          </div>

          {/* Legal Links */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 md:justify-center">
            <Link
              href="/privacy-policy"
              className="text-xs transition-colors hover:opacity-75"
              style={{ color: 'var(--muted-foreground)' }}
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-xs transition-colors hover:opacity-75"
              style={{ color: 'var(--muted-foreground)' }}
            >
              Terms &amp; Conditions
            </Link>
            <Link
              href="/accessibility"
              className="text-xs transition-colors hover:opacity-75"
              style={{ color: 'var(--muted-foreground)' }}
            >
              הצהרת נגישות
            </Link>
            <Link
              href="/site-terms"
              className="text-xs transition-colors hover:opacity-75"
              style={{ color: 'var(--muted-foreground)' }}
            >
              תקנון אתר
            </Link>
          </div>

          {/* Social */}
          <div className="flex gap-6 md:justify-end">
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
              style={{ color: 'var(--muted-foreground)' }}
            >
              <Linkedin size={20} />
            </a>
            <a
              href={twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
              style={{ color: 'var(--muted-foreground)' }}
            >
              <Twitter size={20} />
            </a>
            <a
              href={`mailto:${email}`}
              className="hover:text-accent transition-colors"
              style={{ color: 'var(--muted-foreground)' }}
            >
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
