import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'bentoCard',
  title: 'Bento Card',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'iconName',
      title: 'Icon Name',
      type: 'string',
      description: 'Lucide icon name (e.g., Target, Zap, Users, PenTool)',
    }),
    defineField({
      name: 'colSpan',
      title: 'Column Span',
      type: 'string',
      description: 'Tailwind col-span class (e.g., md:col-span-2)',
    }),
    defineField({
      name: 'rowSpan',
      title: 'Row Span',
      type: 'string',
      description: 'Tailwind row-span class (e.g., md:row-span-2)',
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'iconName' },
  },
});
