'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';

interface BlogPost {
  _id: string;
  title: string;
  excerpt: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image?: any;
  imageUrl?: string;
  featuredImageUrl?: string;
  category: string;
  featured: boolean;
  order: number;
  slug?: { current: string };
}

function getImageUrl(post: BlogPost): string {
  if (post.featuredImageUrl) return post.featuredImageUrl;
  if (post.image?.asset) return urlFor(post.image).width(800).url();
  return post.imageUrl || 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80';
}

export default function BlogSection({ posts }: { posts: BlogPost[] }) {
  // Show max 3 latest posts
  const latestPosts = posts.slice(0, 3);

  if (latestPosts.length === 0) return null;

  return (
    <section className="py-32 border-t" style={{ borderColor: 'var(--border)' }}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="font-mono text-sm tracking-widest uppercase" style={{ color: 'var(--accent)' }}>
            05 —
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-semibold mt-2">Latest Thinking</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestPosts.map((post, i) => {
            const href = post.slug?.current ? `/magazine/${post.slug.current}` : '#';
            return (
              <motion.div
                key={post._id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <Link href={href} className="block group">
                  <div
                    className="relative rounded-2xl overflow-hidden"
                    style={{ height: 340 }}
                  >
                    <Image
                      src={getImageUrl(post)}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    {/* Dark overlay */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, rgba(10,10,40,0.85) 0%, rgba(10,10,40,0.2) 60%)',
                      }}
                    />
                    {/* Title overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6" dir="rtl">
                      <span
                        className="font-mono text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full mb-3 inline-block"
                        style={{
                          backgroundColor: 'rgba(255,255,255,0.12)',
                          color: 'rgba(255,255,255,0.8)',
                          backdropFilter: 'blur(8px)',
                        }}
                      >
                        {post.category}
                      </span>
                      <h3
                        className="font-heading text-lg font-semibold text-white leading-snug"
                        style={{ textAlign: 'right' }}
                      >
                        {post.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* View all link */}
        <div className="text-center mt-10">
          <Link
            href="/magazine"
            className="font-mono text-sm transition-colors hover:opacity-80 inline-flex items-center gap-2"
            style={{ color: 'var(--accent)' }}
          >
            View All Articles &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
