import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';

const client = createClient({
  projectId: 'jgfn3h3h',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'sk23g8L12Ul6rfwkFsT9FjVAEHJZO0PXTG4WbjZsH5I3Wrelu8CVYX5B2RzP9tagx410N3pvU4iau3tOr3wPH8sfTghX04sI5XFqO1xNQ6d6ojy46tzwXLOESyl0Puc6k7GOSsnL7NqQq3awLlQP4v4qK7vhhiQcIbDZnyoZuNaMuCuFI3BP',
  useCdn: false,
});

async function uploadImage(filePath) {
  const imageBuffer = fs.readFileSync(filePath);
  const asset = await client.assets.upload('image', imageBuffer, {
    filename: path.basename(filePath),
  });
  return {
    _type: 'image',
    asset: {
      _type: 'reference',
      _ref: asset._id,
    },
  };
}

async function seed() {
  console.log('Starting seed...');

  // Upload profile image
  console.log('Uploading profile image...');
  let profileImage;
  try {
    profileImage = await uploadImage('./public/amir-profile.jpg');
    console.log('Profile image uploaded');
  } catch (e) {
    console.log('Image upload failed, continuing without it:', e.message);
    profileImage = null;
  }

  // 1. Site Settings
  console.log('Creating site settings...');
  await client.createOrReplace({
    _id: 'siteSettings',
    _type: 'siteSettings',
    title: 'Amir Baldiga - Marketing Consultant & AI Strategist',
    description: 'I help startups build demand engines that actually scale. Fractional marketing leadership for B2B startups.',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/amirbaldiga',
      twitter: 'https://twitter.com',
      email: 'amirbaldiga@gmail.com',
    },
  });

  // 2. Hero Section
  console.log('Creating hero...');
  const heroDoc = {
    _id: 'hero',
    _type: 'hero',
    eyebrow: 'B2B Marketers, AI Agents and system builders, AI for SMBs Advisor',
    heading: 'Shalom Haverim 😁',
    description: "I hope you're ready to get things done. My name is Amir Baldiga. I grew up in a kibbutz near Gaza, I love people, and I'm a data-driven Growth and GTM leader with 6+ years of experience building demand engines for B2B startups.",
    ctaButtons: [
      { _key: 'btn1', text: 'Scroll to Explore', link: '#', style: 'primary', external: false },
      { _key: 'btn2', text: 'Connect on LinkedIn', link: 'https://linkedin.com/in/amirbaldiga', style: 'outline', external: true },
    ],
  };
  if (profileImage) {
    heroDoc.profileImage = profileImage;
  }
  await client.createOrReplace(heroDoc);

  // 3. Bento Cards
  console.log('Creating bento cards...');
  const bentoCards = [
    { _id: 'bento-1', title: 'GTM Strategy & Positioning', iconName: 'Target', colSpan: 'md:col-span-2', rowSpan: '', order: 1 },
    { _id: 'bento-2', title: 'AI-Powered Sales Research — Velocity Seller framework', iconName: 'Zap', colSpan: 'md:col-span-1', rowSpan: 'md:row-span-2', order: 2 },
    { _id: 'bento-3', title: 'Community Building', iconName: 'Users', colSpan: 'md:col-span-1', rowSpan: '', order: 3 },
    { _id: 'bento-4', title: 'Content & Brand — SEO, LinkedIn, brand voice', iconName: 'PenTool', colSpan: 'md:col-span-2', rowSpan: '', order: 4 },
  ];
  for (const card of bentoCards) {
    await client.createOrReplace({ ...card, _type: 'bentoCard' });
  }

  // 4. Skills (AI)
  console.log('Creating AI skills...');
  const aiSkills = [
    { name: 'No-Code Automation', size: 'large', order: 1 },
    { name: 'API & MCPs Integration', size: 'large', order: 2 },
    { name: 'Agentic Systems', size: 'large', order: 3 },
    { name: 'Tools Building for SMBs', size: 'medium', order: 4 },
    { name: 'Prompt Engineering', size: 'medium', order: 5 },
    { name: 'Leading LLMs', size: 'medium', order: 6 },
    { name: 'Content Writing', size: 'small', order: 7 },
    { name: 'UGC & Video Creation', size: 'small', order: 8 },
    { name: 'Lead Nurturing & SDR', size: 'small', order: 9 },
  ];
  for (let i = 0; i < aiSkills.length; i++) {
    await client.createOrReplace({
      _id: `skill-ai-${i + 1}`,
      _type: 'skill',
      ...aiSkills[i],
      category: 'ai',
    });
  }

  // 5. Skills (Marketing)
  console.log('Creating marketing skills...');
  const marketingSkills = [
    { name: 'Growth & GTM Strategy', size: 'large', order: 10 },
    { name: 'Full-Funnel Marketing', size: 'large', order: 11 },
    { name: 'Team Leadership', size: 'large', order: 12 },
    { name: 'Paid Media & ABM', size: 'medium', order: 13 },
    { name: 'Marketing Automation', size: 'medium', order: 14 },
    { name: 'Content & Community', size: 'medium', order: 15 },
    { name: 'CRO', size: 'small', order: 16 },
    { name: 'Project Management', size: 'small', order: 17 },
    { name: 'Events & MarCom', size: 'small', order: 18 },
  ];
  for (let i = 0; i < marketingSkills.length; i++) {
    await client.createOrReplace({
      _id: `skill-mkt-${i + 1}`,
      _type: 'skill',
      ...marketingSkills[i],
      category: 'marketing',
    });
  }

  // 6. Case Studies (20)
  console.log('Creating case studies...');
  const caseStudies = [
    { id: 1, category: 'Sales Videos', title: 'Direct Sales B2B2C', subtitle: 'Business Event', description: 'Video edited after real event, 30% gross revenue per ticket', result: '3X ROI from tickets and up-sales' },
    { id: 2, category: 'Sales Videos', title: 'Direct Sales B2C', subtitle: 'Credit Cards Sale', description: 'TikTok trend turned into ad, CPM lower than 1 USD', result: 'Reach of 1.3M on <$1,300 budget' },
    { id: 3, category: 'Sales Videos', title: 'B2B/B2E Lead Gen', subtitle: 'Media Agency', description: 'B2B leads with LTV of 12+ months, some exceeding 36 months', result: '59× ROI in 12 months' },
    { id: 4, category: 'Sales Videos', title: 'Premium Lead Gen', subtitle: 'Finance Service', description: 'Avatar research to understand what makes them click AND close', result: '23% Lower CPL, 1.6× lower CAC' },
    { id: 5, category: 'Viral Posts', title: 'Lead Magnet Sign-Ups', subtitle: 'Video Tutorial', description: 'Tutorial post driving sign-ups', result: '1K reactions, 26 shares' },
    { id: 6, category: 'Viral Posts', title: 'Webinar Sign-Ups', subtitle: 'Facebook Post', description: 'Zoom webinar promotion post', result: '127 comments' },
    { id: 7, category: 'Viral Posts', title: 'Lead Magnet Sign-Ups', subtitle: 'Event Registration', description: 'Event registration viral post', result: '660 comments, 63+ shares' },
    { id: 8, category: 'Viral Posts', title: 'WhatsApp Community', subtitle: 'Group Building', description: 'Built branded community group', result: '924 members' },
    { id: 9, category: 'Ads Copy', title: 'Webinar Promotion', subtitle: 'Ad Copy', description: 'Paid promotion for webinar', result: '11 ILS per Sign-up' },
    { id: 10, category: 'Ads Copy', title: 'Tattooing Course', subtitle: 'Online Course', description: 'Ad copy for premium course', result: '45 ILS CPL (13K package)' },
    { id: 11, category: 'Ads Copy', title: 'Talent Acquisition', subtitle: 'Employer Branding', description: 'Recruitment campaign', result: '156 CVs, ZERO ad spend' },
    { id: 12, category: 'Webinars', title: 'Lead Generation', subtitle: 'On Stage Event', description: 'eTalks: 30 talks, 10K viewers from 25 countries', result: '16% viewers-to-qualified lead' },
    { id: 13, category: 'Webinars', title: 'SaaS Subscription', subtitle: 'Organic & Paid', description: 'Waalaxy SDR platform webinar, >50% response rate', result: '20+ clients onboarded in one sitting' },
    { id: 14, category: 'Landing Pages', title: 'SMB Business Event', subtitle: 'PPC Landing Page', description: 'Paid ads driving ticket sales', result: '18% CVR, 30% gross revenue' },
    { id: 15, category: 'Landing Pages', title: 'B2C Finance Service', subtitle: 'Lead Gen Page', description: 'Optimized for shorter sales cycles', result: '23% lower CPL, 30% more closes' },
    { id: 16, category: 'Landing Pages', title: 'Real Estate Buying', subtitle: 'Sales Page', description: 'Swapped CEO with sales reps on page', result: '3.5× ROI in 3 months' },
    { id: 17, category: 'Email Marketing', title: 'Cold SDR on LinkedIn', subtitle: 'POC', description: 'Lead gen through WhatsApp for C-level officers', result: '41% response rate, 10% answer-to-call' },
    { id: 18, category: 'Email Marketing', title: 'Crowdfunding', subtitle: 'B2C', description: 'Fundraising email across 5 countries', result: 'Raised ₪50,000' },
    { id: 19, category: 'Email Marketing', title: 'Lead Nurturing', subtitle: 'B2B2C', description: 'Mailing list with free digital products', result: '8.5% click rate, 34.1% open rate' },
    { id: 20, category: 'Email Marketing', title: 'Monthly Newsletter', subtitle: 'Community', description: 'WhatsApp newsletter to 1000+ subscribers', result: '70+ members monthly, 7% CVR' },
  ];
  for (const cs of caseStudies) {
    await client.createOrReplace({
      _id: `case-study-${cs.id}`,
      _type: 'caseStudy',
      category: cs.category,
      title: cs.title,
      subtitle: cs.subtitle,
      description: cs.description,
      result: cs.result,
      order: cs.id,
    });
  }

  // 7. Experience (5)
  console.log('Creating experience entries...');
  const experience = [
    { id: 1, title: 'Digital Marketing & Assets Manager', company: 'GNS & CaaB', period: '2025 - Today', description: 'Leading digital marketing operations across Israel and North America, driving AI adoption, and building custom tools.' },
    { id: 2, title: 'Marketing Consultant & Community Manager', company: 'Freelance, Movilim', period: 'Oct 2023 - 2025', description: 'Led volunteer marketing team, grew 3 communities to 35,000+ members, boosted engagement by 15%.' },
    { id: 3, title: 'Head of Marketing', company: 'GettingReach LTD', period: '2021 - 2023', description: 'Led 8-member team with $100K/month budget, cut CAC, extended customer LTV to 12+ months.' },
    { id: 4, title: 'Social Growth Manager', company: 'Roomate', period: '2020 - 2021', description: 'Generated 49,000+ visits and 8,000+ registrations in month one with 15%+ conversion.' },
    { id: 5, title: 'PPC & Organic Social Manager', company: 'LaserWar', period: '2019 - 2020', description: 'Managed paid and organic strategies, achieved 25% increase in clients.' },
  ];
  for (const exp of experience) {
    await client.createOrReplace({
      _id: `experience-${exp.id}`,
      _type: 'experience',
      title: exp.title,
      company: exp.company,
      period: exp.period,
      description: exp.description,
      order: exp.id,
    });
  }

  // 8. Blog Posts (3)
  console.log('Creating blog posts...');
  const blogPosts = [
    { id: 1, title: 'איך בניתי סוכן AI SDR אוטונומי', excerpt: 'הדרך שלי לבנות סוכן מכירות AI שעובד 24/7.', imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80', category: 'AI & Marketing', featured: true, slug: 'ai-sdr-agent' },
    { id: 2, title: 'הכלים שמשנים את עולם ה-B2B', excerpt: 'כלים שאני משתמש בהם כל יום.', imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=80', category: 'Tools', featured: false, slug: 'b2b-tools' },
    { id: 3, title: 'מדריך: אוטומציה של לידים עם AI', excerpt: 'איך לאוטומט את תהליך הלידים.', imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=80', category: 'Automation', featured: false, slug: 'ai-lead-automation' },
  ];
  for (const post of blogPosts) {
    await client.createOrReplace({
      _id: `blog-post-${post.id}`,
      _type: 'blogPost',
      title: post.title,
      excerpt: post.excerpt,
      imageUrl: post.imageUrl,
      category: post.category,
      featured: post.featured,
      slug: { _type: 'slug', current: post.slug },
      order: post.id,
    });
  }

  // 9. CTA Section
  console.log('Creating CTA section...');
  await client.createOrReplace({
    _id: 'ctaSection',
    _type: 'ctaSection',
    eyebrow: 'Ready to build?',
    heading: "Let's create your next growth engine.",
    buttonText: 'Connect on LinkedIn',
    buttonLink: 'https://linkedin.com/in/amirbaldiga',
  });

  console.log('Seed complete!');
}

seed().catch(console.error);
