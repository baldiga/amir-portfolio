'use client';

import DOMPurify from 'isomorphic-dompurify';

interface Props {
  rawHtml?: string;
}

export default function ArticleContent({ rawHtml }: Props) {
  if (!rawHtml) {
    return (
      <p style={{ color: 'var(--muted-foreground)' }}>
        התוכן המלא של המאמר יהיה זמין בקרוב.
      </p>
    );
  }

  const clean = DOMPurify.sanitize(rawHtml, {
    ALLOWED_TAGS: [
      'p', 'br', 'strong', 'b', 'em', 'i', 'u', 's', 'del',
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'ul', 'ol', 'li',
      'blockquote', 'pre', 'code',
      'a', 'img',
      'table', 'thead', 'tbody', 'tr', 'th', 'td',
      'div', 'span', 'figure', 'figcaption',
      'hr', 'section', 'article',
    ],
    ALLOWED_ATTR: [
      'href', 'src', 'alt', 'title', 'class', 'id',
      'target', 'rel', 'width', 'height', 'style',
    ],
    FORCE_BODY: true,
  });

  return (
    <>
      <style>{`
        .article-body {
          direction: rtl;
          text-align: right;
          line-height: 1.9;
          font-size: 1.05rem;
          color: var(--foreground);
        }
        .article-body h1,
        .article-body h2,
        .article-body h3,
        .article-body h4 {
          font-family: 'Sora', 'Heebo', system-ui, sans-serif;
          font-weight: 600;
          line-height: 1.3;
          margin-top: 2.5rem;
          margin-bottom: 1rem;
          color: var(--foreground);
          letter-spacing: -0.01em;
        }
        .article-body h2 { font-size: 1.6rem; }
        .article-body h3 { font-size: 1.3rem; }
        .article-body h4 { font-size: 1.1rem; }
        .article-body p {
          margin-bottom: 1.25rem;
          color: #333;
        }
        .article-body ul,
        .article-body ol {
          padding-right: 1.5rem;
          margin-bottom: 1.25rem;
        }
        .article-body li {
          margin-bottom: 0.5rem;
          color: #333;
        }
        .article-body a {
          color: #191C70;
          text-decoration: underline;
          text-underline-offset: 3px;
          transition: opacity 0.2s;
        }
        .article-body a:hover { opacity: 0.75; }
        .article-body blockquote {
          border-right: 4px solid #191C70;
          padding: 1rem 1.5rem;
          margin: 1.5rem 0;
          background: rgba(25,28,112,0.04);
          border-radius: 0 8px 8px 0;
          font-style: italic;
          color: #555;
        }
        .article-body pre,
        .article-body code {
          font-family: 'JetBrains Mono', monospace;
          background: #f4f4f4;
          border-radius: 6px;
          font-size: 0.875rem;
          direction: ltr;
          text-align: left;
        }
        .article-body pre {
          padding: 1rem 1.25rem;
          overflow-x: auto;
          margin-bottom: 1.25rem;
          border: 1px solid var(--border);
        }
        .article-body code {
          padding: 2px 6px;
        }
        .article-body img {
          max-width: 100%;
          height: auto;
          border-radius: 12px;
          margin: 1.5rem auto;
          display: block;
          box-shadow: 0 4px 24px rgba(0,0,0,0.08);
        }
        .article-body table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 1.5rem;
          font-size: 0.95rem;
        }
        .article-body th,
        .article-body td {
          border: 1px solid var(--border);
          padding: 0.75rem 1rem;
          text-align: right;
        }
        .article-body th {
          background: var(--secondary);
          font-weight: 600;
        }
        .article-body hr {
          border: none;
          border-top: 1px solid var(--border);
          margin: 2.5rem 0;
        }
        .article-body figure { margin: 1.5rem 0; }
        .article-body figcaption {
          text-align: center;
          font-size: 0.85rem;
          color: var(--muted-foreground);
          margin-top: 0.5rem;
        }
        /* WordPress-specific class overrides */
        .article-body .wp-block-image,
        .article-body .wp-block-embed { margin: 2rem 0; }
        .article-body .has-text-align-center { text-align: center; }
        .article-body .has-text-align-left { text-align: left; }
        .article-body .wp-block-quote {
          border-right: 4px solid #191C70;
          padding: 1rem 1.5rem;
          background: rgba(25,28,112,0.04);
          border-radius: 0 8px 8px 0;
        }
      `}</style>
      <div
        className="article-body"
        dangerouslySetInnerHTML={{ __html: clean }}
      />
    </>
  );
}
