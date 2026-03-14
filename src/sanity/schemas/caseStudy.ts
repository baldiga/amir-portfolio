import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  fields: [
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'result',
      title: 'Result',
      type: 'string',
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
    }),
    defineField({
      name: 'link',
      title: 'Project Link (external URL or /build/slug)',
      type: 'url',
      description: 'Link to article, video, landing page, or internal /build/[slug] page',
      validation: (Rule) => Rule.uri({ allowRelative: true }),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (for internal /build/[slug] page)',
      type: 'slug',
      description: 'Only needed for AI Projects with a dedicated project page',
      options: { source: 'title' },
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'icon',
      title: 'Icon (Lucide icon name)',
      type: 'string',
      description: 'e.g. Bot, Zap, MessageCircle — used for AI Projects cards',
    }),
    defineField({
      name: 'featured',
      title: 'Featured / Pinned',
      type: 'boolean',
      description: 'Pin this project to the top of its category',
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'category' },
  },
});
