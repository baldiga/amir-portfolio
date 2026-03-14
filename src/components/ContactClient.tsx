'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Linkedin, Send, CheckCircle, AlertCircle } from 'lucide-react';

const MAKE_WEBHOOK = 'https://hook.eu1.make.com/3an7bh2uuuostx5m5a5x53bebx4gxl5w';

type FormState = 'idle' | 'sending' | 'success' | 'error';

export default function ContactClient() {
  const [formState, setFormState] = useState<FormState>('idle');
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [consent, setConsent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setFormState('sending');

    try {
      const res = await fetch(MAKE_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          consent,
          source: 'amirbaldiga.com/contact',
          timestamp: new Date().toISOString(),
        }),
      });

      if (res.ok || res.status === 200) {
        setFormState('success');
        setForm({ name: '', email: '', message: '' });
      } else {
        setFormState('error');
      }
    } catch {
      setFormState('error');
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)', direction: 'rtl', minHeight: '100vh' }}>
      <div className="max-w-6xl mx-auto px-6 pt-36 pb-24">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="font-mono text-xs uppercase tracking-widest mb-4 inline-block" style={{ color: 'var(--accent)' }}>
            יצירת קשר
          </span>
          <h1
            className="font-heading font-bold mb-4"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', letterSpacing: '-0.03em' }}
          >
            בואו נדבר
          </h1>
          <p className="text-lg max-w-lg" style={{ color: 'var(--muted-foreground)', lineHeight: 1.7 }}>
            יש לך פרויקט, שאלה או סתם רוצה להתחבר? אני כאן.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-2 space-y-6"
          >
            <div>
              <h2 className="font-heading text-xl font-semibold mb-6">פרטי התקשרות</h2>
              <div className="space-y-4">
                <a
                  href="mailto:office@amirbaldiga.com"
                  className="flex items-center gap-3 group transition-all duration-200"
                  style={{ color: 'var(--foreground)' }}
                >
                  <span
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors"
                    style={{ background: 'rgba(25,28,112,0.08)', color: '#191C70' }}
                  >
                    <Mail size={18} />
                  </span>
                  <div>
                    <p className="font-mono text-xs uppercase tracking-widest mb-0.5" style={{ color: 'var(--muted-foreground)' }}>מייל</p>
                    <p className="text-sm font-medium group-hover:opacity-75 transition-opacity">office@amirbaldiga.com</p>
                  </div>
                </a>

                <a
                  href="tel:+972547915656"
                  className="flex items-center gap-3 group transition-all duration-200"
                  style={{ color: 'var(--foreground)' }}
                >
                  <span
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(25,28,112,0.08)', color: '#191C70' }}
                  >
                    <Phone size={18} />
                  </span>
                  <div>
                    <p className="font-mono text-xs uppercase tracking-widest mb-0.5" style={{ color: 'var(--muted-foreground)' }}>טלפון</p>
                    <p className="text-sm font-medium group-hover:opacity-75 transition-opacity" dir="ltr">054-791-5656</p>
                  </div>
                </a>

                <a
                  href="https://linkedin.com/in/amirbaldiga"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 group transition-all duration-200"
                  style={{ color: 'var(--foreground)' }}
                >
                  <span
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(25,28,112,0.08)', color: '#191C70' }}
                  >
                    <Linkedin size={18} />
                  </span>
                  <div>
                    <p className="font-mono text-xs uppercase tracking-widest mb-0.5" style={{ color: 'var(--muted-foreground)' }}>LinkedIn</p>
                    <p className="text-sm font-medium group-hover:opacity-75 transition-opacity">linkedin.com/in/amirbaldiga</p>
                  </div>
                </a>
              </div>
            </div>

            {/* What to expect */}
            <div
              className="rounded-xl p-5 mt-8"
              style={{ background: 'rgba(25,28,112,0.04)', border: '1px solid rgba(25,28,112,0.1)' }}
            >
              <h3 className="font-heading text-sm font-semibold mb-3" style={{ color: '#191C70' }}>מה תוכלו לצפות?</h3>
              <ul className="space-y-2 text-sm" style={{ color: 'var(--muted-foreground)' }}>
                <li className="flex items-start gap-2"><span style={{ color: '#191C70', marginTop: 2 }}>✓</span> תגובה תוך 24 שעות בימי עסקים</li>
                <li className="flex items-start gap-2"><span style={{ color: '#191C70', marginTop: 2 }}>✓</span> שיחת היכרות קצרה ללא עלות</li>
                <li className="flex items-start gap-2"><span style={{ color: '#191C70', marginTop: 2 }}>✓</span> הצעה מותאמת אישית לצרכים שלכם</li>
              </ul>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-3"
          >
            <div
              className="rounded-2xl p-8"
              style={{ background: 'var(--card)', border: '1px solid var(--border)', boxShadow: '0 4px 24px rgba(0,0,0,0.04)' }}
            >
              {formState === 'success' ? (
                <div className="text-center py-12">
                  <CheckCircle size={56} className="mx-auto mb-4" style={{ color: '#22c55e' }} />
                  <h3 className="font-heading text-2xl font-semibold mb-2">ההודעה נשלחה!</h3>
                  <p style={{ color: 'var(--muted-foreground)' }}>נחזור אליך בהקדם. תודה!</p>
                  <button
                    onClick={() => setFormState('idle')}
                    className="mt-6 font-mono text-sm px-6 py-2 rounded-lg transition-all hover:opacity-80"
                    style={{ background: 'var(--secondary)', color: 'var(--foreground)', border: '1px solid var(--border)' }}
                  >
                    שלח הודעה נוספת
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block font-mono text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--muted-foreground)' }}>
                      שם מלא *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="ישראל ישראלי"
                      className="w-full px-4 py-3 rounded-lg text-sm transition-all duration-200 outline-none"
                      style={{
                        background: 'var(--input)',
                        border: '1px solid var(--border)',
                        color: 'var(--foreground)',
                        fontFamily: 'inherit',
                      }}
                      onFocus={(e) => (e.target.style.borderColor = '#191C70')}
                      onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--muted-foreground)' }}>
                      כתובת מייל *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="email@example.com"
                      dir="ltr"
                      className="w-full px-4 py-3 rounded-lg text-sm transition-all duration-200 outline-none"
                      style={{
                        background: 'var(--input)',
                        border: '1px solid var(--border)',
                        color: 'var(--foreground)',
                        fontFamily: 'inherit',
                      }}
                      onFocus={(e) => (e.target.style.borderColor = '#191C70')}
                      onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--muted-foreground)' }}>
                      מה בראש שלך? *
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      placeholder="ספר לי על הפרויקט, האתגר, או פשוט שלח שלום..."
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg text-sm transition-all duration-200 outline-none resize-none"
                      style={{
                        background: 'var(--input)',
                        border: '1px solid var(--border)',
                        color: 'var(--foreground)',
                        fontFamily: 'inherit',
                      }}
                      onFocus={(e) => (e.target.style.borderColor = '#191C70')}
                      onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
                    />
                  </div>

                  {formState === 'error' && (
                    <div
                      className="flex items-center gap-2 p-3 rounded-lg text-sm"
                      style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.2)', color: '#dc2626' }}
                    >
                      <AlertCircle size={15} />
                      אירעה שגיאה בשליחה. נסה שוב או שלח מייל ישירות.
                    </div>
                  )}

                  {/* Consent checkbox */}
                  <label className="flex items-start gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="mt-1 w-4 h-4 rounded border-2 accent-[#191C70] cursor-pointer flex-shrink-0"
                      style={{ borderColor: 'var(--border)' }}
                    />
                    <span className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
                      אני מאשר/ת קבלת דיוור מאמיר בלדיגה
                    </span>
                  </label>

                  <button
                    type="submit"
                    disabled={formState === 'sending'}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-lg font-mono text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{
                      background: formState === 'sending' ? '#aaa' : '#191C70',
                      color: '#fff',
                      boxShadow: formState === 'sending' ? 'none' : '0 4px 20px rgba(25,28,112,0.25)',
                    }}
                  >
                    {formState === 'sending' ? (
                      <>שולח...</>
                    ) : (
                      <>
                        <Send size={15} />
                        שלח הודעה
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
