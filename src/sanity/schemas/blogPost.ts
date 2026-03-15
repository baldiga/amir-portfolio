import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'blogPost',
  title: 'Blog Post / Article',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'seo', title: 'SEO & Meta' },
    { name: 'settings', title: 'Settings' },
  ],
  fields: [
    // ── Core ──
    defineField({ name: 'title', title: 'Title', type: 'string', group: 'content' }),
    defineField({ name: 'excerpt', title: 'Excerpt / Description', type: 'text', group: 'content' }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      group: 'settings',
    }),
    defineField({
      name: 'wpSlug',
      title: 'WordPress Original Slug (for redirects)',
      type: 'string',
      description: 'The original slug from the WordPress site — used to set up URL redirects',
      group: 'settings',
    }),
    // ── Section & Category ──
    defineField({
      name: 'section',
      title: 'Section',
      type: 'string',
      group: 'settings',
      description: 'Build = appears in Build section + Magazine. Magazine = appears only in Magazine.',
      options: {
        list: [
          { title: '🔨 Build — AI Projects & Builds (appears in Build + Magazine)', value: 'build' },
          { title: '📰 Magazine — SEO Articles (appears only in Magazine)', value: 'magazine' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'category',
      title: 'Category Tag',
      type: 'string',
      group: 'settings',
      description: 'Display label shown on article cards (e.g. "AI Projects", "Tools")',
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
    // ── Images ──
    defineField({
      name: 'featuredImageUrl',
      title: 'Featured Image URL (WordPress / External)',
      type: 'url',
      description: 'External image URL — used for WP-imported articles. Takes priority over uploaded image.',
      group: 'content',
    }),
    defineField({
      name: 'image',
      title: 'Featured Image (Upload)',
      type: 'image',
      options: { hotspot: true },
      description: 'Upload a header image directly — used when no external URL is set.',
      group: 'content',
    }),
    // ── Content ──
    defineField({
      name: 'content',
      title: 'Article Body (Rich Text Editor)',
      type: 'array',
      group: 'content',
      description: 'Use this to write or edit article content. Supports headings, images, links, and more.',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Heading 2', value: 'h2' },
            { title: 'Heading 3', value: 'h3' },
            { title: 'Heading 4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' },
          ],
          lists: [
            { title: 'Bullet List', value: 'bullet' },
            { title: 'Numbered List', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
              { title: 'Code', value: 'code' },
              { title: 'Underline', value: 'underline' },
            ],
            annotations: [
              {
                title: 'Link',
                name: 'link',
                type: 'object',
                fields: [
                  defineField({ name: 'href', title: 'URL', type: 'url' }),
                  defineField({
                    name: 'blank',
                    title: 'Open in new tab',
                    type: 'boolean',
                    initialValue: true,
                  }),
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'caption', title: 'Caption', type: 'string' }),
            defineField({ name: 'alt', title: 'Alt text (accessibility & SEO)', type: 'string' }),
          ],
        },
        {
          type: 'object',
          name: 'codeBlock',
          title: 'Code Block',
          fields: [
            defineField({ name: 'language', title: 'Language', type: 'string', initialValue: 'javascript' }),
            defineField({ name: 'code', title: 'Code', type: 'text', rows: 12 }),
          ],
          preview: { select: { title: 'language' } },
        },
      ],
    }),
    defineField({
      name: 'rawHtml',
      title: 'HTML Content (WordPress Import — reference)',
      type: 'text',
      description: 'Original HTML imported from WordPress. Rendered as fallback when Rich Text is empty. To edit, use the Rich Text editor above.',
      rows: 20,
      group: 'content',
    }),
    // ── SEO ──
    defineField({
      name: 'metaDescription',
      title: 'Meta Description (SEO)',
      type: 'text',
      rows: 3,
      group: 'seo',
    }),
    defineField({
      name: 'faq',
      title: 'FAQ (for SEO / AI search)',
      type: 'array',
      group: 'seo',
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
    // ── Settings ──
    defineField({ name: 'featured', title: 'Featured', type: 'boolean', initialValue: false, group: 'settings' }),
    defineField({ name: 'publishedAt', title: 'Published At', type: 'datetime', group: 'settings' }),
    defineField({ name: 'readingTime', title: 'Reading Time (minutes)', type: 'number', group: 'settings' }),
    defineField({ name: 'tags', title: 'Tags', type: 'array', of: [{ type: 'string' }], group: 'settings' }),
    defineField({ name: 'order', title: 'Display Order', type: 'number', group: 'settings' }),
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      section: 'section',
      media: 'image',
      hasHtml: 'rawHtml',
    },
    prepare({ title, category, section, media, hasHtml }: {
      title?: string;
      category?: string;
      section?: string;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      media?: any;
      hasHtml?: string;
    }) {
      const sectionLabel = section === 'build' ? '🔨 Build' : section === 'magazine' ? '📰 Magazine' : '⚠ No section set';
      const contentLabel = hasHtml ? '✓ has content' : '⚠ empty';
      return {
        title: title || '(untitled)',
        subtitle: [sectionLabel, category, contentLabel].filter(Boolean).join(' · '),
        media,
      };
    },
  },
  orderings: [
    { title: 'Published Date (Newest)', name: 'publishedAtDesc', by: [{ field: 'publishedAt', direction: 'desc' }] },
    { title: 'Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
});
