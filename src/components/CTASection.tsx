'use client';

import { motion } from 'framer-motion';

interface CTAProps {
  eyebrow: string;
  heading: string;
  buttonText: string;
  buttonLink: string;
}

export default function CTASection({ eyebrow, heading, buttonText, buttonLink }: CTAProps) {
  return (
    <section className="py-32 border-t" style={{ borderColor: 'var(--border)' }}>
      <div className="max-w-3xl mx-auto px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="font-mono text-sm tracking-wider uppercase mb-4" style={{ color: 'var(--accent)' }}>
            {eyebrow}
          </p>
          <h2 className="font-heading text-5xl md:text-6xl font-bold mb-8">{heading}</h2>
          <a
            href={buttonLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-block mb-8"
          >
            {buttonText}
          </a>
          <p style={{ color: 'var(--muted-foreground)' }}>
            or find me on{' '}
            <a
              href={buttonLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
              style={{ color: 'var(--accent)' }}
            >
              LinkedIn
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
