'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FaqItem {
  _key: string;
  question: string;
  answer: string;
}

export default function ArticleFaq({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
      {/* Schema.org FAQ markup for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: items.map((item) => ({
              '@type': 'Question',
              name: item.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: item.answer,
              },
            })),
          }),
        }}
      />

      {items.map((item, i) => (
        <div key={item._key || i} style={{ borderBottom: i < items.length - 1 ? '1px solid var(--border)' : 'none' }}>
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex items-center justify-between gap-4 text-right transition-colors duration-200 hover:bg-gray-50"
            style={{ padding: '1rem 1.25rem', background: openIndex === i ? 'rgba(25,28,112,0.03)' : 'transparent' }}
          >
            <span
              className="font-heading text-sm font-semibold leading-tight text-right"
              style={{ color: 'var(--foreground)' }}
            >
              {item.question}
            </span>
            <motion.div
              animate={{ rotate: openIndex === i ? 180 : 0 }}
              transition={{ duration: 0.25 }}
              style={{ flexShrink: 0, color: '#191C70' }}
            >
              <ChevronDown size={18} />
            </motion.div>
          </button>

          <AnimatePresence>
            {openIndex === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{ overflow: 'hidden' }}
              >
                <p
                  className="text-sm leading-relaxed"
                  style={{
                    padding: '0 1.25rem 1rem',
                    color: 'var(--muted-foreground)',
                    direction: 'rtl',
                    textAlign: 'right',
                  }}
                >
                  {item.answer}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
