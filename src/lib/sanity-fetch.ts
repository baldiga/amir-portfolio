import { client } from '@/sanity/lib/client';
import {
  heroQuery,
  bentoCardsQuery,
  skillsQuery,
  caseStudiesQuery,
  caseStudyBySlugQuery,
  experienceQuery,
  blogPostsQuery,
  ctaSectionQuery,
  siteSettingsQuery,
} from '@/sanity/lib/queries';
import {
  fallbackHero,
  fallbackBentoCards,
  fallbackSkills,
  fallbackCaseStudies,
  fallbackExperience,
  fallbackBlogPosts,
  fallbackCta,
  fallbackSiteSettings,
} from './fallback-data';

async function safeFetch<T>(query: string, fallback: T): Promise<T> {
  try {
    const data = await client.fetch(query, {}, { next: { revalidate: 60 } });
    if (!data || (Array.isArray(data) && data.length === 0)) {
      return fallback;
    }
    return data;
  } catch (error) {
    console.error('Sanity fetch error:', error);
    return fallback;
  }
}

export async function getHero() {
  return safeFetch(heroQuery, fallbackHero);
}

export async function getBentoCards() {
  return safeFetch(bentoCardsQuery, fallbackBentoCards);
}

export async function getSkills() {
  return safeFetch(skillsQuery, fallbackSkills);
}

export async function getCaseStudies() {
  return safeFetch(caseStudiesQuery, fallbackCaseStudies);
}

export async function getExperience() {
  return safeFetch(experienceQuery, fallbackExperience);
}

export async function getBlogPosts() {
  return safeFetch(blogPostsQuery, fallbackBlogPosts);
}

export async function getCtaSection() {
  return safeFetch(ctaSectionQuery, fallbackCta);
}

export async function getSiteSettings() {
  return safeFetch(siteSettingsQuery, fallbackSiteSettings);
}

export async function getCaseStudyBySlug(slug: string) {
  try {
    const data = await client.fetch(caseStudyBySlugQuery, { slug }, { next: { revalidate: 60 } });
    return data || null;
  } catch (error) {
    console.error('Sanity fetch error:', error);
    return null;
  }
}

export async function getAllCaseStudySlugs(): Promise<string[]> {
  try {
    const data = await client.fetch(
      `*[_type == "caseStudy" && defined(slug.current)].slug.current`,
      {},
      { next: { revalidate: 60 } }
    );
    return data || [];
  } catch {
    return [];
  }
}
