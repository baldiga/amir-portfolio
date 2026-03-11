import HeroSection from '@/components/HeroSection';
import BentoGrid from '@/components/BentoGrid';
import ToolkitSection from '@/components/ToolkitSection';
import CaseStudiesSection from '@/components/CaseStudiesSection';
import ExperienceSection from '@/components/ExperienceSection';
import BlogSection from '@/components/BlogSection';
import CTASection from '@/components/CTASection';
import {
  getHero,
  getBentoCards,
  getSkills,
  getCaseStudies,
  getExperience,
  getBlogPosts,
  getCtaSection,
} from '@/lib/sanity-fetch';
import { urlFor } from '@/sanity/lib/image';

export const revalidate = 60;

export default async function HomePage() {
  const [hero, bentoCards, skills, caseStudies, experience, blogPosts, cta] = await Promise.all([
    getHero(),
    getBentoCards(),
    getSkills(),
    getCaseStudies(),
    getExperience(),
    getBlogPosts(),
    getCtaSection(),
  ]);

  let profileImageUrl: string | null = null;
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const heroData = hero as any;
    if (heroData.profileImage?.asset) {
      profileImageUrl = urlFor(heroData.profileImage).width(800).url();
    }
  } catch {
    profileImageUrl = null;
  }

  return (
    <div className="min-h-screen">
      <HeroSection
        eyebrow={hero.eyebrow}
        heading={hero.heading}
        description={hero.description}
        ctaButtons={hero.ctaButtons}
        profileImageUrl={profileImageUrl}
      />
      <BentoGrid cards={bentoCards} />
      <ToolkitSection skills={skills} />
      <CaseStudiesSection caseStudies={caseStudies} />
      <ExperienceSection experience={experience} />
      <BlogSection posts={blogPosts} />
      <CTASection
        eyebrow={cta.eyebrow}
        heading={cta.heading}
        buttonText={cta.buttonText}
        buttonLink={cta.buttonLink}
      />
    </div>
  );
}
