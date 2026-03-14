import { getCaseStudies } from '@/lib/sanity-fetch';
import BuildPageClient from '@/components/BuildPageClient';

export const revalidate = 0;

export const metadata = {
  title: 'Build Lab — Amir Baldiga',
  description: 'AI-powered tools, marketing systems, and automation projects by Amir Baldiga.',
};

export default async function BuildPage() {
  const caseStudies = await getCaseStudies();
  return <BuildPageClient caseStudies={caseStudies} />;
}
