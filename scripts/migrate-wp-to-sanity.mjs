/**
 * WordPress → Sanity migration script
 * Fetches all posts from amirbaldiga.com WordPress REST API
 * and creates/updates blogPost documents in Sanity.
 *
 * Usage: node scripts/migrate-wp-to-sanity.mjs
 */

import { createClient } from '@sanity/client';

const sanity = createClient({
  projectId: 'jgfn3h3h',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN, // Set via: SANITY_API_TOKEN=sk... node scripts/migrate-wp-to-sanity.mjs
  useCdn: false,
});

const WP_API = 'https://amirbaldiga.com/wp-json/wp/v2';

// Map WP post ID/slug → clean Sanity slug + metadata
const SLUG_MAP = {
  15752: { slug: 'mila-ai-whatsapp-bot',       category: 'AI Projects', order: 1, reading_time: 8  },
  15772: { slug: 'twitter-ai-lead-hunter',     category: 'AI Projects', order: 2, reading_time: 7  },
  15829: { slug: 'ai-sdr-agent-manus',         category: 'AI Projects', order: 3, reading_time: 12 },
  15794: { slug: 'openclaw-vs-manus-ai',       category: 'AI Projects', order: 4, reading_time: 15 },
  15814: { slug: 'build-vs-buy-ai-marketing',  category: 'Marketing',   order: 5, reading_time: 10 },
  15838: { slug: 'ai-agent-10-minutes',        category: 'AI Projects', order: 6, reading_time: 6  },
  15648: { slug: 'linkedin-formatter-tool',    category: 'Tools',       order: 7, reading_time: 5  },
};

// FAQ per article (AI-generated, for SEO / AI search engines)
const FAQ_MAP = {
  15752: [
    { question: 'כמה זמן לוקח לבנות בוט שיווק בוואטסאפ מבוסס AI?', answer: 'ניתן לבנות בוט וואטסאפ AI פונקציונלי בין 34 ל-60 ימים, תלוי בסוג הכלים שבוחרים ובמורכבות האינטגרציות. עם כלים ללא קוד כמו Make ו-Manychat ניתן להגיע לגרסת MVP מהירה יותר.' },
    { question: 'האם צריך ידע בתכנות כדי לבנות בוט AI בוואטסאפ?', answer: 'לא בהכרח. עם פלטפורמות No-Code כמו Make.com, Manychat או n8n ניתן לבנות בוט מתוחכם מבלי לכתוב שורת קוד אחת. כמובן שידע טכני בסיסי יאיץ את התהליך.' },
    { question: 'מה ההבדל בין Mila לבין כלי AI שיווקי רגיל?', answer: 'Mila הוא סוכן AI שפועל ישירות בוואטסאפ, הפלטפורמה שבה כבר נמצאים הלקוחות. הוא יכול לנהל שיחות, לסנן לידים, לשלוח תוכן אוטומטי ולתאם פגישות — הכל ללא התערבות אנושית.' },
    { question: 'מה הם הכלים הטכניים שמשמשים לבניית בוט שיווק בוואטסאפ?', answer: 'הכלים הנפוצים ביותר: WhatsApp Business API, Make.com לאוטומציה, Manychat לממשק שיחות, ו-OpenAI API לעיבוד שפה טבעית. לדף נחיתה ניתן להשתמש ב-Notion, Webflow או WordPress.' },
    { question: 'האם ניתן לשלב CRM עם בוט וואטסאפ AI?', answer: 'כן. עם Make.com ניתן לחבר את הבוט ל-HubSpot, Pipedrive, Salesforce, Google Sheets ועוד. כך כל ליד שנוצר ישמר אוטומטית ב-CRM שלך.' },
  ],
  15772: [
    { question: 'כיצד עובד סוכן AI לציד לידים בטוויטר X?', answer: 'הסוכן סורק ציוצים ופרופילים לפי מילות מפתח ורלוונטיות, מזהה פוטנציאל לידים, ושולח הודעות ישירות מותאמות אישית — הכל באופן אוטונומי, 24/7, ללא התערבות אנושית.' },
    { question: 'האם אוטומציה של פנייה לידים בטוויטר X מותרת?', answer: 'X מאפשרת אוטומציה מסוימת דרך ה-API הרשמי שלה, אך יש מגבלות. חשוב לפעול בהתאם לתנאי השירות ולהשתמש בקצב פנייה סביר כדי לא להיחסם.' },
    { question: 'מה התוצאות שאפשר לצפות מסוכן AI SDR בטוויטר?', answer: 'תוצאות משתנות לפי הנישה, אך ניתן לצפות ל-3-8% אחוז תגובה להודעות מותאמות אישית. היתרון הגדול הוא עבודה 24/7 ללא עלות כוח אדם.' },
    { question: 'מה ההבדל בין SDR אנושי לבין סוכן AI SDR?', answer: 'SDR אנושי מוגבל לשעות עבודה, קצב עבודה ועלות גבוהה. סוכן AI SDR פועל ברציפות, מעבד מאות אנשי קשר ביום, ולמד לאורך זמן — אך חסר את האינטואיציה האנושית לניואנסים חברתיים.' },
    { question: 'אילו כלים צריך כדי לבנות סוכן ציד לידים בטוויטר?', answer: 'ניתן לבנות עם שילוב של: Twitter/X API, Make.com או Zapier לאוטומציה, Claude או ChatGPT API לכתיבת הודעות, ו-Airtable או Google Sheets למעקב.' },
  ],
  15829: [
    { question: 'מה זה Manus AI וכיצד הוא שונה מסוכני AI אחרים?', answer: 'Manus AI הוא סוכן AI אוטונומי שיכול לבצע משימות ריבוי-שלביות: לחפש מידע ברשת, לכתוב, לנתח ולשלב מקורות מרובים — הכל ללא פיקוח אנושי מתמיד. הוא נועד לאוטומציה של תהליכים עסקיים מורכבים.' },
    { question: 'כיצד בונים סוכן AI SDR אוטונומי עם Manus AI?', answer: 'התהליך כולל: הגדרת קריטריוני לידים (ICP), בניית פלואו חיפוש ואיסוף מידע, כתיבת פרומפטים לפרסונליזציה, וחיבור ל-CRM לשמירת הנתונים. Manus AI מבצע את כל השלבים ברצף.' },
    { question: 'האם Manus AI מתאים לעסקים קטנים ובינוניים?', answer: 'Manus AI מתאים בעיקר לעסקים שכבר מבצעים פעולות SDR, מבינים את ה-ICP שלהם, ומחפשים לאוטומט תהליכים קיימים. לעסקים קטנים מאוד ייתכן שפתרונות פשוטים יותר יהיו מספקים.' },
    { question: 'מה הסיכונים של שימוש בסוכן AI אוטונומי לאאוטריץ B2B?', answer: 'הסיכונים העיקריים: שגיאות פרסונליזציה, פנייה לאנשים שאינם מתאימים, פגיעה בתדמית המותג בפנייה גסה מדי, וחסימה בפלטפורמות. חשוב לפקח ולכייל את הסוכן בשלבים ראשוניים.' },
    { question: 'מה ההבדל בין Manus AI לבין n8n או Make.com?', answer: 'Make.com ו-n8n הם כלי אוטומציה מבוססי-זרימה שמחברים אפליקציות. Manus AI הוא סוכן AI שיכול לפעול באופן עצמאי לחלוטין — לחשוב, לחפש ולהחליט — ולא רק לבצע פעולות מוגדרות מראש.' },
  ],
  15794: [
    { question: 'מה ההבדל בין OpenClaw ל-Manus AI?', answer: 'Manus AI הוא כלי מנוהל (SaaS) עם ממשק פשוט, תמיכה ועדכונים אוטומטיים — מתאים לצוותים שרוצים להתחיל מהר. OpenClaw הוא פתרון קוד פתוח שנותן שליטה מלאה, אך דורש ידע טכני להתקנה והפעלה.' },
    { question: 'מתי כדאי לבחור בפתרון קוד פתוח על פני כלי AI מנוהל?', answer: 'עדיף קוד פתוח כאשר: יש צוות טכני מיומן, נדרשת שליטה מלאה על הנתונים (פרטיות/רגולציה), התקציב נמוך, או שיש צורך בהתאמות מיוחדות שכלי SaaS לא מאפשרים.' },
    { question: 'מה עדיף לשיווק B2B — OpenClaw או Manus AI?', answer: 'לצוותי שיווק ללא מפתחים — Manus AI עדיף בשל הפשטות. לחברות B2B עם צוות DevOps, OpenClaw נותן גמישות ועלות נמוכה יותר לאורך זמן. ההחלטה תלויה בגודל הצוות ומטרות הטווח הארוך.' },
    { question: 'מה ה-ROI של שימוש בכלי AI לשיווק B2B ב-2026?', answer: 'לפי נתונים ממוצעים בשוק, אימוץ כלי AI לשיווק B2B מפחית עלויות תפעוליות ב-20-40% ומגדיל יצור לידים ב-15-30%. ה-ROI תלוי בגודל הצוות, נפח הפעילות ואיכות האינטגרציה.' },
    { question: 'האם ניתן לשלב OpenClaw עם CRM קיים?', answer: 'כן. OpenClaw כפלטפורמת קוד פתוח ניתן לאינטגרציה עם HubSpot, Salesforce, Pipedrive ועוד — אך זה דורש עבודת פיתוח. לעומת זאת, Manus AI מציע אינטגרציות built-in.' },
  ],
  15814: [
    { question: 'מתי כדאי לבנות כלי AI פנימי ומתי לקנות פתרון קיים?', answer: 'כדאי לבנות כשיש ידע טכני פנימי, צרכים מאוד ספציפיים, ותקציב ארוך טווח. כדאי לקנות כשצריך להתחיל מהר, אין צוות פיתוח, ומחפשים פתרון מוכח עם תמיכה.' },
    { question: 'מה הסיכונים של בניית כלי AI פנימי?', answer: 'הסיכונים כוללים: עלויות פיתוח גבוהות מהצפוי, תלות בבאגים פנימיים, קושי לשמור pace עם התפתחות AI, ועומס על צוות ה-IT. חשוב לקחת בחשבון "true cost of ownership".' },
    { question: 'מה הם הקריטריונים לבחירת כלי AI שיווקי?', answer: 'הקריטריונים העיקריים: התאמה ל-use case, קלות אינטגרציה עם מערכות קיימות, איכות תמיכה, מחיר לטווח ארוך, יכולת scale, ופרטיות נתונים. תמיד מומלץ לעשות POC לפני התחייבות.' },
    { question: 'כמה עולה לפתח כלי AI שיווקי פנימי?', answer: 'עלות ממוצעת לפיתוח כלי AI שיווקי בסיסי: $10K-$50K לפיתוח ראשוני, ועוד $2K-$10K לחודש לתחזוקה ושיפורים. לעומת SaaS שנע בין $200-$2000 לחודש לצוות קטן.' },
    { question: 'אילו כלי AI שיווק מומלצים לצוותים קטנים?', answer: 'לצוותים קטנים (1-5 אנשים): Make.com לאוטומציה, Claude או ChatGPT לכתיבה, HubSpot עם AI features לCRM, Jasper.ai לתוכן, ו-Instantly.ai לאאוטריץ. כולם SaaS פשוטים לתפעול.' },
  ],
  15838: [
    { question: 'האם ניתן לבנות סוכן AI בחינם ובלי לכתוב קוד?', answer: 'כן. פלטפורמות כמו n8n Cloud, Make.com (בחינם עד 1000 פעולות), Langflow ו-Flowise מאפשרות לבנות סוכני AI מתוחכמים ללא קוד ובלי עלות.' },
    { question: 'מה ניתן לעשות עם סוכן AI שנבנה תוך 10 דקות?', answer: 'סוכן בסיסי יכול: לענות על שאלות, לסכם מסמכים, לחפש מידע ברשת, לשלוח מיילים אוטומטיים, ולתעד נתונים ב-Google Sheets. ככל שמוסיפים integrations, היכולות מתרחבות.' },
    { question: 'מה ההבדל בין סוכן AI לבין chatbot רגיל?', answer: 'Chatbot מגיב לפקודות ספציפיות מראש. סוכן AI יכול לחשוב בצורה עצמאית, לפרק משימות לשלבים, להשתמש בכלים שונים, ולקבל החלטות לפי הקשר — כמו עוזר אנושי.' },
    { question: 'אילו פלטפורמות מציעות סוכני AI בחינם לעסקים?', answer: 'הפלטפורמות הטובות לסוכני AI בחינם: n8n (self-hosted חינמי), Make.com (freemium), Voiceflow (תכנית חינמית), Zapier (freemium), ו-Langflow (קוד פתוח). לכולן יש תכניות בחינם להתחלה.' },
    { question: 'כמה זמן לוקח ללמוד לבנות סוכני AI?', answer: 'רוב האנשים יכולים לבנות סוכן AI ראשוני ב-1-2 שעות למידה. שליטה מלאה בכלים נו-קוד מתקדמים לוקחת 2-4 שבועות של תרגול שוטף.' },
  ],
  15648: [
    { question: 'כיצד ניתן להוסיף עיצוב טקסט בפוסטים של לינקדאין?', answer: 'לינקדאין לא תומכת בעיצוב HTML רגיל, אך ניתן להשתמש בתווי Unicode מיוחדים שנראים כ-Bold, Italic או עם עיצוב אחר. כלי כמו LinkedIn Text Formatter ממיר את הטקסט שלך אוטומטית.' },
    { question: 'האם שימוש בטקסט מעוצב בלינקדאין משפיע על האלגוריתם?', answer: 'קיימת מחלוקת בנושא. חלק מהמשווקים מדווחים על ירידה בהגעה אורגנית בשל שימוש מוגזם. מומלץ להשתמש בעיצוב במינון — רק לדגש נקודות מפתח.' },
    { question: 'מהם הסוגים של עיצוב טקסט הזמינים בלינקדאין?', answer: 'ניתן להשתמש ב: Bold (𝗡𝗶𝗴𝗿𝗮), Italic (𝘐𝘵𝘢𝘭𝘪𝘤), Monospace, Strikethrough ועוד. שים לב שחלק מהסגנונות עשויים שלא להציג כראוי בכל מכשיר.' },
    { question: 'האם יש כלים חינמיים לעיצוב טקסט בלינקדאין?', answer: 'כן. LinkedIn Text Formatter של עמיר בלדיגה, YayText, LingJam ועוד הם כלים חינמיים לחלוטין, ללא הרשמה, שמאפשרים המרה מיידית של טקסט רגיל לסגנונות Unicode מיוחדים.' },
    { question: 'האם העיצוב נשמר גם בתגובות ובהודעות פרטיות בלינקדאין?', answer: 'כן! ניתן להשתמש בטקסט Unicode מעוצב גם בתגובות, בהודעות פרטיות ובסעיף "אודות" בפרופיל. ההמרה עובדת בכל שדה טקסט בלינקדאין.' },
  ],
};

async function decodeWpSlug(encodedSlug) {
  return decodeURIComponent(encodedSlug);
}

async function fetchWpPosts() {
  console.log('Fetching WordPress posts...');
  const res = await fetch(`${WP_API}/posts?per_page=50&_embed`);
  if (!res.ok) throw new Error(`WP API error: ${res.status}`);
  const posts = await res.json();
  console.log(`Found ${posts.length} posts`);
  return posts;
}

function stripHtmlTags(html) {
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

function estimateReadingTime(html) {
  const words = stripHtmlTags(html).split(' ').length;
  return Math.max(3, Math.ceil(words / 200));
}

async function migratePost(post) {
  const mapping = SLUG_MAP[post.id];
  if (!mapping) {
    console.warn(`  ⚠ No slug mapping for post ID ${post.id} — skipping`);
    return null;
  }

  const wpSlugDecoded = await decodeWpSlug(post.slug);
  const title = post.title.rendered.replace(/&amp;/g, '&').replace(/&#8211;/g, '—').replace(/&#8216;/g, "'").replace(/&#8217;/g, "'").replace(/&nbsp;/g, ' ');
  const excerpt = stripHtmlTags(post.excerpt.rendered).slice(0, 300);
  const rawHtml = post.content.rendered;
  const publishedAt = post.date;
  const readingTime = mapping.reading_time || estimateReadingTime(rawHtml);

  let featuredImageUrl = '';
  try {
    featuredImageUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';
  } catch {}

  const faq = (FAQ_MAP[post.id] || []).map((item, idx) => ({
    _key: `faq-${mapping.slug}-${idx}`,
    _type: 'faqItem',
    question: item.question,
    answer: item.answer,
  }));

  const doc = {
    _id: `blog-${mapping.slug}`,
    _type: 'blogPost',
    title,
    excerpt,
    slug: { _type: 'slug', current: mapping.slug },
    wpSlug: wpSlugDecoded,
    category: mapping.category,
    featured: mapping.order <= 2,
    featuredImageUrl,
    publishedAt,
    readingTime,
    rawHtml,
    faq,
    order: mapping.order,
    tags: [],
  };

  console.log(`  → Creating: ${mapping.slug} (${title.slice(0, 50)}...)`);

  try {
    const result = await sanity.createOrReplace(doc);
    console.log(`  ✓ Done: ${result._id}`);
    return result;
  } catch (err) {
    console.error(`  ✗ Error: ${err.message}`);
    return null;
  }
}

async function main() {
  console.log('\n🚀 Starting WordPress → Sanity migration\n');
  const posts = await fetchWpPosts();

  let success = 0;
  for (const post of posts) {
    console.log(`\nProcessing post ${post.id}: ${post.slug.slice(0, 40)}`);
    const result = await migratePost(post);
    if (result) success++;
  }

  console.log(`\n✅ Migration complete: ${success}/${posts.length} posts migrated\n`);
}

main().catch(console.error);
