'use client';

import { motion } from 'framer-motion';
import { urlFor } from '@/sanity/lib/image';

interface BlogPost {
  _id: string;
  title: string;
  excerpt: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image?: any;
  imageUrl?: string;
  category: string;
  featured: boolean;
  order: number;
}

function getImageUrl(post: BlogPost): string {
  if (post.image?.asset) {
    return urlFor(post.image).width(600).url();
  }
  return post.imageUrl || 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80';
}

export default function BlogSection({ posts }: { posts: BlogPost[] }) {
  const featuredPost = posts.find((p) => p.featured) || posts[0];
  const otherPosts = posts.filter((p) => p._id !== featuredPost?._id);

  if (!featuredPost) return null;

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Featured Post */}
          <motion.article
            className="md:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="mb-6 overflow-hidden rounded-lg">
              <img
                src={getImageUrl(featuredPost)}
                alt={featuredPost.title}
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <span className="font-mono text-xs tracking-wider uppercase" style={{ color: 'var(--accent)' }}>
              {featuredPost.category}
            </span>
            <h3 className="font-heading text-2xl font-semibold mt-4 mb-3 group">
              <span className="relative inline-block">
                {featuredPost.title}
                <span
                  className="absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300"
                  style={{ backgroundColor: 'var(--accent)' }}
                />
              </span>
            </h3>
            <p className="mb-4" style={{ color: 'var(--muted-foreground)' }}>
              {featuredPost.excerpt}
            </p>
            <a href="#" className="font-mono text-xs transition-colors" style={{ color: 'var(--accent)' }}>
              Read More &rarr;
            </a>
          </motion.article>

          {/* Other Posts */}
          <div className="space-y-8">
            {otherPosts.map((post, i) => (
              <motion.article
                key={post._id}
                className="flex gap-6 group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <img
                  src={getImageUrl(post)}
                  alt={post.title}
                  className="w-24 h-24 object-cover rounded-lg flex-shrink-0 hover:scale-105 transition-transform duration-300"
                />
                <div>
                  <span className="font-mono text-xs tracking-wider uppercase" style={{ color: 'var(--accent)' }}>
                    {post.category}
                  </span>
                  <h4 className="font-heading text-lg font-semibold mt-2 mb-2 relative inline-block">
                    {post.title}
                    <span
                      className="absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300"
                      style={{ backgroundColor: 'var(--accent)' }}
                    />
                  </h4>
                  <p className="text-sm line-clamp-2" style={{ color: 'var(--muted-foreground)' }}>
                    {post.excerpt}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
