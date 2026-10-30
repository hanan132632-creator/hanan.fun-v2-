import React from 'react';
import { Award, ShieldCheck, FileCheck } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../locales/translations';
import { AdsterraPlacement } from '../components/AdsterraPlacement';

interface AdSenseStandardsPageProps {
  currentLang: Language;
}

export const AdSenseStandardsPage: React.FC<AdSenseStandardsPageProps> = ({ currentLang }) => {
  const t = TRANSLATIONS[currentLang];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 text-xs font-bold">
          <Award className="w-3.5 h-3.5" />
          <span>معايير النشر وجودة المحتوى الرقمي</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
          {t.adsense_standards_title || 'معايير النشر والشفافية التحريرية'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          دليل الشفافية التامة والالتزام بأعلى معايير جودة المحتوى التقني وتجربة التصفح السريعة النظيفة
        </p>
      </div>

      <div className="space-y-8 text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
        {/* Core Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-blue-600 font-bold text-sm">
              <FileCheck className="w-4 h-4" />
              <span>محتوى أصلي وفريد ذو قيمة مضافة (Value-Add Content)</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              جميع مقالاتنا ودراساتنا الهندسية مكتوبة ومراجعة بواسطة خبراء معتمدين في البنية التحتية السحابية والأمن السيبراني، ونرفض رفضاً قاطعاً المحتوى المنسوخ أو منخفض الجودة.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
              <ShieldCheck className="w-4 h-4" />
              <span>تجربة تصفح نظيفة وخالية من الإزعاج</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              نلتزم بتوفير بيئة قراءة نقية للمستخدمين بدون نوافذ منبثقة مزعجة أو نصوص برمجية خارجية تبطئ الأداء أو تجمع بيانات دون إذن.
            </p>
          </div>
        </div>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">1. التزام صارم بأفضل ممارسات الويب وتجربة المستخدم</h2>
          <p>
            تلتزم منصة **خدمات الإنترنت العالمية** بكافة المعايير العالمية لتجربة التصفح الموثوقة:
          </p>
          <ul className="list-disc list-inside space-y-1.5 ps-2 text-slate-600 dark:text-slate-400">
            <li>حظر تام للنوافذ المنبثقة الإجبارية أو التحويلات القسرية.</li>
            <li>التركيز على سرعة التحميل الفائقة والتوافق مع مؤشرات Core Web Vitals.</li>
            <li>تطبيق معايير التحالف من أجل إعلانات أفضل (Coalition for Better Ads).</li>
            <li>حماية خصوصية المستخدمين وعدم تتبع البيانات بدون موافقة صريحة.</li>
          </ul>
        </section>

        <AdsterraPlacement currentLang={currentLang} format="in-article" />

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">2. معايير الخبرة والمصداقية (E-E-A-T)</h2>
          <p>
            وفقاً لإرشادات مقيمي الجودة، نضمن تطبيق عناصر **الخبرة (Experience)، والتخصص (Expertise)، والموثوقية (Authoritativeness)، والجدارة بالثقة (Trustworthiness)** عبر الكشف عن هويات كتاب المقالات، وخلفياتهم الأكاديمية والمهنية، ومصادر البيانات التقنية المعتمدة.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">3. قنوات التواصل والدعم الفني</h2>
          <p>
            إذا كان لديك أي استفسار أو ملاحظة حول المحتوى وجودة التصفح، يُرجى التواصل معنا عبر:
            <span className="font-bold text-pink-600 dark:text-pink-400 mx-1">support@hanan.fun</span>
            وسيقوم فريق التحرير والدعم الفني بمراجعة طلبك والرد خلال أقل من 24 ساعة.
          </p>
        </section>
      </div>
    </div>
  );
};
