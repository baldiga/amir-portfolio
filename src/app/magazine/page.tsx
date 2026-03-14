import { getBlogPosts } from '@/lib/sanity-fetch';
import MagazineClient from '@/components/MagazineClient';

export const revalidate = 0;

export const metadata = {
  title: 'Magazine — Amir Baldiga',
  description: 'מאמרים, מדריכים ותובנות על AI, שיווק ואוטומציה מאת עמיר בלדיגה.',
};

export default async function MagazinePage() {
  const posts = await getBlogPosts();
  return <MagazineClient posts={posts} />;
}
