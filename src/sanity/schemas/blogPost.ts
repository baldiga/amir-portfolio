import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'blogPost',
  title: 'Blog Post / Article',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'excerpt', title: 'Excerpt / Description', type: 'text' }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
    }),
    defineField({
      name: 'wpSlug',
      title: 'WordPress Original Slug (for redirects)',
      type: 'string',
      description: 'The original slug from the WordPress site — used to set up URL redirects',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'AI Projects', value: 'AI Projects' },
          { title: 'Marketing', value: 'Marketing' },
          { title: 'Growth', value: 'Growth' },
          { title: 'Tools', value: 'Tools' },
          { title: 'General', value: 'General' },
        ],
      },
    }),
    defineField({ name: 'featured', title: 'Featured', type: 'boolean', initialValue: false }),
    defineField({
      name: 'featuredImageUrl',
      title: 'Featured Image URL',
      type: 'url',
      description: 'External image URL (from WordPress or elsewhere)',
    }),
    defineField({
      name: 'image',
      title: 'Featured Image (Sanity)',
      type: 'image',
      options: { hotspot: true },
      description: 'Use this for new posts created directly in Sanity',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
    }),
    defineField({
      name: 'readingTime',
      title: 'Reading Time (minutes)',
      type: 'number',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description (SEO)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'rawHtml',
      title: 'Article Content (HTML)',
      type: 'text',
      description: 'Full HTML content — migrated from WordPress or entered manually',
      rows: 20,
    }),
    defineField({
      name: 'content',
      title: 'Article Content (Portable Text)',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Use this for posts authored directly in Sanity (new posts)',
    }),
    defineField({
      name: 'faq',
      title: 'FAQ (for SEO / AI search)',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'faqItem',
          title: 'FAQ Item',
          fields: [
            defineField({ name: 'question', title: 'Question', type: 'string' }),
            defineField({ name: 'answer', title: 'Answer', type: 'text', rows: 4 }),
          ],
          preview: { select: { title: 'question' } },
        },
      ],
    }),
    defineField({ name: 'tags', title: 'Tags', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'order', title: 'Display Order', type: 'number' }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'category', media: 'image' },
  },
  orderings: [
    { title: 'Published Date (Newest)', name: 'publishedAtDesc', by: [{ field: 'publishedAt', direction: 'desc' }] },
    { title: 'Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
});
