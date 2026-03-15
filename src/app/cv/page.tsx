import CVHero from '@/components/CVHero';
import CVTimeline from '@/components/CVTimeline';
import ToolkitSection from '@/components/ToolkitSection';
import ExperienceSection from '@/components/ExperienceSection';
import CTASection from '@/components/CTASection';
import { getSkills, getExperience, getCtaSection } from '@/lib/sanity-fetch';

export const revalidate = 60;

export const metadata = {
  title: 'CV — Amir Baldiga',
  description: 'Marketer, AI builder, community leader. 7+ years turning brands into movements.',
};

export default async function CVPage() {
  const [skills, experience, cta] = await Promise.all([
    getSkills(),
    getExperience(),
    getCtaSection(),
  ]);

  return (
    <div className="min-h-screen">
      <CVHero />

      {/* Bio / About */}
      <section className="py-24 border-t" style={{ borderColor: 'var(--border)' }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <span className="font-mono text-sm tracking-widest uppercase" style={{ color: 'var(--accent)' }}>
                01 —
              </span>
              <h2 className="font-heading text-3xl font-semibold mt-2">About</h2>
            </div>
            <div className="md:col-span-2 space-y-5" style={{ color: 'var(--muted-foreground)', lineHeight: 1.8 }}>
              <p>
                I&apos;ve always been what you might call a &quot;slasher&quot; — simultaneously working, managing,
                growing, and advising. Over the years I&apos;ve led 8-person teams, consulted dozens of enterprise
                companies, personally coached 100+ founders, built a community of 54,000 members, and put 7,000+
                students through my courses.
              </p>
              <p>
                My roots are in Kibbutz Reim. I served as an Air Traffic Controller in the Israeli Air Force.
                The discipline and systems-thinking from that role never left me — I apply it to every campaign,
                launch, and product I touch.
              </p>
              <p>
                Today I sit at the intersection of B2B GTM strategy, AI-powered workflows, and community building.
                My motto: <em style={{ color: 'var(--foreground)', fontStyle: 'normal', fontWeight: 500 }}>
                &quot;Whatever you do, do it as if you&apos;re already a role model.&quot;
                </em>
              </p>
              <div className="flex flex-wrap gap-6 pt-4">
                <div>
                  <p className="font-heading font-bold text-2xl" style={{ color: 'var(--foreground)' }}>54K</p>
                  <p className="text-xs font-mono uppercase tracking-wider" style={{ color: 'var(--muted-foreground)' }}>Community members</p>
                </div>
                <div>
                  <p className="font-heading font-bold text-2xl" style={{ color: 'var(--foreground)' }}>100+</p>
                  <p className="text-xs font-mono uppercase tracking-wider" style={{ color: 'var(--muted-foreground)' }}>Founders mentored</p>
                </div>
                <div>
                  <p className="font-heading font-bold text-2xl" style={{ color: 'var(--foreground)' }}>59×</p>
                  <p className="text-xs font-mono uppercase tracking-wider" style={{ color: 'var(--muted-foreground)' }}>ROI over 12 months</p>
                </div>
                <div>
                  <p className="font-heading font-bold text-2xl" style={{ color: 'var(--foreground)' }}>23%</p>
                  <p className="text-xs font-mono uppercase tracking-wider" style={{ color: 'var(--muted-foreground)' }}>CAC reduction</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CVTimeline />

      <ExperienceSection experience={experience} />

      <ToolkitSection skills={skills} />

      <CTASection
        eyebrow={cta.eyebrow}
        heading={cta.heading}
        buttonText={cta.buttonText}
        buttonLink={cta.buttonLink}
      />
    </div>
  );
}
