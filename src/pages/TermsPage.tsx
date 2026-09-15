import React from 'react';
import { FileText, ShieldCheck, CheckCircle2, AlertTriangle, Scale } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../locales/translations';
import { AdSensePlacement } from '../components/AdSensePlacement';

interface TermsPageProps {
  currentLang: Language;
}

export const TermsPage: React.FC<TermsPageProps> = ({ currentLang }) => {
  const t = TRANSLATIONS[currentLang];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 text-xs font-bold">
          <Scale className="w-3.5 h-3.5" />
          <span>شروط الاستخدام والاتفاقية القانونية (Terms of Service)</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
          {t.terms_title}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          تاريخ السريان: 25 أغسطس 2026 | النسخة المعتمدة رسمياً
        </p>
      </div>

      <div className="space-y-8 text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">1. قبول الشروط</h2>
          <p>
            باستخدامك لموقع وخدمات **خدمات الإنترنت العالمية (GIS)**، فإنك توافق على الالتزام بجميع بنود هذه الاتفاقية والسياسات الملحقة بها. إذا كنت لا توافق على أي جزء منها، يُرجى الامتناع عن استخدام خدماتنا.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">2. سياسة الاستخدام المقبول (AUP)</h2>
          <p>
            يحظر استخدام خوادم GIS أو شبكتنا في أي من الأنشطة التالية:
          </p>
          <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400 ps-2">
            <li>إرسال البريد المزعج (SPAM) أو الهجمات السيبرانية العكسية.</li>
            <li>استضافة أي برمجيات خبيثة أو مواقع تصيد احتيالي (Phishing).</li>
            <li>انتهاك حقوق الملكية الفكرية أو العلامات التجارية.</li>
            <li>ممارسة أنشطة النقر الاحتيالي (Invalid Click Activity) المحظورة في شبكة Google AdSense.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">3. اتفاقية مستوى الخدمة (99.99% SLA)</h2>
          <p>
            نضمن تشغيل السيرفرات السحابية وشبكة Anycast بنسبة توافر 99.99% شهرياً. في حال حدوث أي انقطاع غير مجدول يتجاوز هذه النسبة، يحق للعميل الحصول على رصيد تعويضي وفق جدول التعويضات المعتمد.
          </p>
        </section>

        <AdSensePlacement currentLang={currentLang} format="in-article" />

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">4. الدفع واسترداد الأموال</h2>
          <p>
            نقدم ضمان استرداد كامل للأموال لمدة 30 يوماً لجميع المشتركين الجدد في خطط الاستضافة السحابية والـ CDN في حال عدم الرضا عن جودة الخدمة. النطاقات وتراخيص البرمجيات الخارجية غير خاضعة للاسترجاع بموجب لوائح ICANN.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">5. إخلاء المسؤولية عن الروابط الخارجية</h2>
          <p>
            قد يحتوي موقعنا على روابط لمواقع خارجية وشبكات إعلانية تابعة لـ Google AdSense. نحن لا نتحمل أي مسؤولية عن محتوى أو سياسات خصوصية تلك المواقع الخارجية.
          </p>
        </section>
      </div>
    </div>
  );
};
