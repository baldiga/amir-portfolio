# Amir Baldiga - Personal Portfolio

A Next.js website with Sanity CMS integration for Amir Baldiga's personal portfolio.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **CMS**: Sanity v3 (embedded Studio at `/studio`)
- **Styling**: Tailwind CSS + Custom CSS Variables
- **Animations**: Framer Motion
- **Fonts**: Sora, Inter, JetBrains Mono, Heebo, Rubik
- **Language**: TypeScript

## Design System

- **Accent**: Terracotta (#C45D3E)
- **Background**: Warm Cream (#FAF9F6)
- **Foreground**: Ink (#1A1A1A)

## Pages

- `/` - Homepage (Hero, Bento Grid, Toolkit, Case Studies, Experience, Blog, CTA)
- `/build` - Build page (placeholder)
- `/magazine` - Magazine page (placeholder)
- `/contact` - Contact page (placeholder)
- `/studio` - Sanity Studio (CMS admin)

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Create a `.env.local` file:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_token
```

## Sanity Studio

Access the embedded Sanity Studio at `/studio` to manage all content.

## Seeding Data

To seed Sanity with initial content:

```bash
node scripts/seed.mjs
```

## Deployment

Deploy to Vercel:

```bash
vercel --yes
```

Or connect the GitHub repo to Vercel for automatic deployments.
<\!-- staging branch -->