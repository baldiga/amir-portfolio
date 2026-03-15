import { getBuildPosts } from '@/lib/sanity-fetch';
import MagazineClient from '@/components/MagazineClient';

export const revalidate = 0;

export const metadata = {
  title: 'Build — Amir Baldiga',
  description: 'פרויקטי AI, כלים ואוטומציות שבניתי מ-Zero ל-Production.',
};

export default async function BuildPage() {
  const posts = await getBuildPosts();
  return (
    <MagazineClient
      posts={posts}
      pageTitle="Build"
      pageDescription="פרויקטי AI, כלים ואוטומציות שבניתי מ-Zero ל-Production."
    />
  );
}
