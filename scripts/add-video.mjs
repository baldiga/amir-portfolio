import { createClient } from 'next-sanity';

const client = createClient({
  projectId: 'jgfn3h3h',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const doc = await client.fetch('*[_type == "blogPost" && slug.current == "ai-agent-10-minutes"][0]{_id, rawHtml}');
if (!doc) { console.log('Doc not found'); process.exit(1); }

const iframe = '<iframe title="איך ליצור סוכן AI בחינם בלי לכתוב קוד ובתוך 10 דקות" width="800" height="450" src="https://www.youtube.com/embed/n-7CF5hy9ww?feature=oembed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>';

if (doc.rawHtml && doc.rawHtml.includes('youtube.com/embed/n-7CF5hy9ww')) {
  console.log('Video already present');
  process.exit(0);
}

let newHtml = doc.rawHtml || '';
const h1End = newHtml.indexOf('</h1>');
if (h1End !== -1) {
  newHtml = newHtml.slice(0, h1End + 5) + '\n\n<div class="wp-block-embed">' + iframe + '</div>\n\n' + newHtml.slice(h1End + 5);
} else {
  newHtml = '<div class="wp-block-embed">' + iframe + '</div>\n\n' + newHtml;
}

await client.patch(doc._id).set({ rawHtml: newHtml }).commit();
console.log('Video added to ai-agent-10-minutes');
