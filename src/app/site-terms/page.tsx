export const metadata = {
  title: 'תקנון אתר — Amir Baldiga',
  description: 'תקנון אתר amirbaldiga.com',
};

export default function SiteTermsPage() {
  return (
    <div dir="rtl" style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
      <div className="max-w-3xl mx-auto px-6 pt-36 pb-24">
        <h1 className="font-heading text-4xl font-bold mb-10">תקנון אתר</h1>
        <div className="space-y-5 text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>

          <h2 className="font-heading text-xl font-semibold mt-8 mb-3" style={{ color: 'var(--foreground)' }}>כללי</h2>
          <p>האתר שייך לאמיר בלדיגה (מס&apos; ח.פ: 316189596, קיבוץ רעים). השימוש באתר מהווה הסכמה לתנאים המפורטים בתקנון זה.</p>

          <h2 className="font-heading text-xl font-semibold mt-8 mb-3" style={{ color: 'var(--foreground)' }}>ביצוע עסקאות</h2>
          <p>המחירים באתר נקובים בשקלים חדשים וכוללים מע&quot;מ. העסק רשאי לשנות מחירים בכל עת. חיוב כרטיס אשראי מתבצע בעת ההזמנה. יש למסור פרטי זיהוי מדויקים בעת ביצוע רכישה.</p>

          <h2 className="font-heading text-xl font-semibold mt-8 mb-3" style={{ color: 'var(--foreground)' }}>זכויות קונים וביטולים</h2>
          <p>כרטיסים לאירועים מאפשרים כניסה בלבד לאירוע הרלוונטי. ניתן לבטל עסקה עד 14 ימים מביצועה, לפחות 7 ימים לפני האירוע. דמי ביטול: 5% מערך העסקה, לא יותר מ-100 ש&quot;ח. מוצרים דיגיטליים אינם ניתנים לביטול לאחר רכישה.</p>

          <h2 className="font-heading text-xl font-semibold mt-8 mb-3" style={{ color: 'var(--foreground)' }}>משלוח והחזרות</h2>
          <p>פריטי לבוש: אישור עד 48 שעות, הגעה עד 21 ימי עסקים. החזרה אפשרית רק עם אריזה סגורה, זיכוי מלא בתוך 7 ימי עסקים.</p>

          <h2 className="font-heading text-xl font-semibold mt-8 mb-3" style={{ color: 'var(--foreground)' }}>פרטיות ונתונים</h2>
          <p>העסק מתחייב שלא להעביר פרטים אישיים לצדדים שלישיים, אך אין ביכולתו להבטיח הגנה מוחלטת מפני פריצות אבטחה.</p>

          <h2 className="font-heading text-xl font-semibold mt-8 mb-3" style={{ color: 'var(--foreground)' }}>אחריות מוגבלת</h2>
          <p>האתר ניתן &quot;כמות שהוא&quot; (as is) ללא כל אחריות לתקלות טכניות, וירוסים, או נזקים עקיפים הנובעים מהשימוש באתר.</p>

          <h2 className="font-heading text-xl font-semibold mt-8 mb-3" style={{ color: 'var(--foreground)' }}>סמכות שיפוט</h2>
          <p>על תקנון זה חלים דיני מדינת ישראל בלבד. סמכות השיפוט הבלעדית נתונה לבתי המשפט במחוז תל-אביב.</p>
        </div>
      </div>
    </div>
  );
}
