import React, { useState } from 'react';
import { Cookie, Shield, Check, Info, AlertCircle } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../locales/translations';
import { AdSensePlacement } from '../components/AdSensePlacement';

interface CookiePolicyPageProps {
  currentLang: Language;
}

export const CookiePolicyPage: React.FC<CookiePolicyPageProps> = ({ currentLang }) => {
  const t = TRANSLATIONS[currentLang];
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);
  const [adEnabled, setAdEnabled] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    localStorage.setItem(
      'gis_cookie_consent',
      JSON.stringify({
        essential: true,
        analytics: analyticsEnabled,
        advertising: adEnabled,
        date: new Date().toISOString(),
      })
    );
    setSaved(true);
    setTimeout(() => setSaved(false), 4000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 text-xs font-bold">
          <Cookie className="w-3.5 h-3.5" />
          <span>سياسة ملفات تعريف الارتباط وإدارة التفضيلات (Cookie Policy)</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
          {t.cookies_title}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          توجيهات الشفافية واستخدام ملفات DART وإعلانات Google AdSense المخصصة
        </p>
      </div>

      <div className="space-y-6 text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
        <p>
          تشرح هذه السياسة كيفية استخدام موقع **خدمات الإنترنت العالمية** لملفات تعريف الارتباط (Cookies) والتقنيات المشابهة للتعرف عليك عند زيارتك لمنصتنا، وكيفية التحكم في هذه التقنيات وفقاً لمعايير الخصوصية الدولية.
        </p>

        {/* Interactive Preferences Center */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h2 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-500" />
            <span>مركز إدارة تفضيلات ملفات تعريف الارتباط التفاعلي</span>
          </h2>

          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900 dark:text-white block">1. ملفات تعريف الارتباط الأساسية والتقنية (Strictly Necessary)</span>
                <span className="text-xs text-slate-500">ضرورية للحماية ضد DDoS وإدارة جلسات التصفح وتأمين المعاملات.</span>
              </div>
              <span className="text-xs font-bold text-slate-400">مفعلة دائماً</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900 dark:text-white block">2. ملفات تحليل الأداء والسرعة (Performance & Speed Analytics)</span>
                <span className="text-xs text-slate-500">تساعدنا في قياس زمن الاستجابة (TTFB) ومؤشرات Core Web Vitals.</span>
              </div>
              <input
                type="checkbox"
                checked={analyticsEnabled}
                onChange={e => setAnalyticsEnabled(e.target.checked)}
                className="w-5 h-5 rounded text-blue-600 focus:ring-blue-500"
              />
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900 dark:text-white block">3. ملفات الإعلانات التخصيصية (Google AdSense & DART Cookies)</span>
                <span className="text-xs text-slate-500">تُستخدم لعرض إعلانات ملائمة لاهتماماتك التقنية وتفادي تكرار الإعلانات نفسها.</span>
              </div>
              <input
                type="checkbox"
                checked={adEnabled}
                onChange={e => setAdEnabled(e.target.checked)}
                className="w-5 h-5 rounded text-blue-600 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <button
              onClick={handleSave}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>حفظ خياراتي وتطبيقها فوراً</span>
            </button>

            {saved && (
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-1 animate-in fade-in">
                <Check className="w-4 h-4" /> تم حفظ التفضيلات بنجاح في متصفحك!
              </span>
            )}
          </div>
        </div>

        <AdSensePlacement currentLang={currentLang} format="in-article" />

        <section className="space-y-2 pt-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">كيف يمكنك مسح ملفات الكوكيز من متصفحك؟</h2>
          <p>
            تتيح معظم متصفحات الويب (Google Chrome, Mozilla Firefox, Apple Safari, Microsoft Edge) التحكم في ملفات تعريف الارتباط من خلال إعدادات التفضيلات الخاصة بها. يمكنك في أي وقت حذف الملفات المخزنة أو حظر ملفات الطرف الثالث تماماً.
          </p>
        </section>
      </div>
    </div>
  );
};
