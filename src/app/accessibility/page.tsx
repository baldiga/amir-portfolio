export const metadata = {
  title: 'הצהרת נגישות — Amir Baldiga',
  description: 'הצהרת נגישות עבור amirbaldiga.com',
};

export default function AccessibilityPage() {
  return (
    <div dir="rtl" style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
      <div className="max-w-3xl mx-auto px-6 pt-36 pb-24">
        <h1 className="font-heading text-4xl font-bold mb-10">הצהרת נגישות</h1>
        <div className="space-y-5 text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>

          <p>האתר מותאם לגלישה של אנשים עם מוגבלויות באמצעות התאמות קוד מקור ותוכן, המאפשרות עמידה בתקנים בינלאומיים לנגישות.</p>

          <p>אתר נגיש מאפשר לאנשים עם מוגבלויות ולאנשים מבוגרים לגלוש ביעילות שווה. מחקרים מצביעים על כך ש-20-25 אחוז מהאוכלוסייה נתקלת בקשיי שימוש באינטרנט ונהנית מתכנים נגישים יותר.</p>

          <p>האתר עומד בדרישות החוק הישראלי בהתאם לתקן ת&quot;י 5568, בהתאמה להנחיות W3C בסטנדרט WCAG 2.0 מדצמבר 2008, שאומץ גם כתקן בינלאומי ISO/IEC 40500 מאוקטובר 2012.</p>

          <p>למרות מאמצים רבים, ייתכנו אי-דיוקים מסוימים. משתמשים הנתקלים בבעיות נגישות מוזמנים לפנות לרכז הנגישות באמצעות טופס יצירת הקשר בעמוד הבית.</p>

          <h2 className="font-heading text-xl font-semibold mt-8 mb-3" style={{ color: 'var(--foreground)' }}>יכולות הגלישה המותאמת</h2>
          <p>האתר תומך בארבעה ממשקי פלט עיקריים: הקראת תוכן בעברית או משולב, גלישה סטנדרטית ללא הקראה, הגדלה והקטנה של גופנים ותוכן, והתאמת צבעים לעיוורי צבעים וכבדי ראייה.</p>

          <h2 className="font-heading text-xl font-semibold mt-8 mb-3" style={{ color: 'var(--foreground)' }}>רכז הנגישות</h2>
          <p style={{ color: 'var(--foreground)' }}>
            <strong>אמיר בלדיגה</strong><br />
            קיבוץ רעים ת.ד 38<br />
            054-7915656<br />
            Baldiga@amirbaldiga.com
          </p>
        </div>
      </div>
    </div>
  );
}
