import React from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Eye, 
  FileText, 
  Cookie, 
  Globe, 
  CheckCircle2, 
  ExternalLink,
  Mail
} from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../locales/translations';
import { AdSensePlacement } from '../components/AdSensePlacement';

interface PrivacyPolicyPageProps {
  currentLang: Language;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ currentLang }) => {
  const t = TRANSLATIONS[currentLang];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>وثيقة الخصوصية وحماية البيانات الرسمية (Privacy & Data Protection)</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
          {t.privacy_title}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          تاريخ آخر تحديث ومراجعة امتثال: 25 أغسطس 2026 | الإصدار 4.2 المتوافق مع Google AdSense و GDPR و CCPA
        </p>
      </div>

      {/* Overview Card */}
      <div className="p-6 rounded-2xl bg-blue-50/60 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60 text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-2">
        <h2 className="font-extrabold text-blue-900 dark:text-blue-300 text-base flex items-center gap-2">
          <Lock className="w-4 h-4 text-blue-600" />
          <span>مقدمة والتزام بحماية خصوصيتك</span>
        </h2>
        <p className="leading-relaxed">
          في منصة **خدمات الإنترنت العالمية (Global Internet Services - GIS)**، نعتبر خصوصية زوارنا وعملائنا ذات أهمية بالغة وخطاً أحمر لا تهاون فيه. توضح هذه الوثيقة الشاملة طبيعة البيانات الشخصية والتقنية التي نجمعها، وكيفية استخدامها وحمايتها، والتزامنا التام بسياسات برنامج **Google AdSense** الإعلاني ولوائح حماية البيانات العامة في الاتحاد الأوروبي (GDPR) وقانون خصوصية المستهلك في كاليفورنيا (CCPA).
        </p>
      </div>

      {/* Section 1: Google AdSense and DoubleClick DART Cookies */}
      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <Cookie className="w-5 h-5 text-amber-500" />
          <span>1. ملفات تعريف الارتباط DART وإعلانات Google AdSense</span>
        </h2>
        <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 space-y-3 leading-relaxed">
          <p>
            تستخدم شركة **Google** بصفتها مورداً لطرف ثالث ملفات تعريف الارتباط (Cookies) لخدمة وعرض الإعلانات على موقعنا:
          </p>
          <ul className="space-y-2 list-disc list-inside ps-2">
            <li>
              استخدام Google لملف تعريف الارتباط **DART** يتيح لها عرض الإعلانات للمستخدمين استناداً إلى زيارتهم لموقعنا والمواقع الأخرى على شبكة الإنترنت.
            </li>
            <li>
              يمكن للمستخدمين إلغاء الاشتراك في استخدام ملف تعريف الارتباط DART ومراجعة سياسة الخصوصية الخاصة بشبكة Google الإعلانية ومحتواها عبر زيارة:
              <a 
                href="https://policies.google.com/technologies/ads" 
                target="_blank" 
                rel="noreferrer"
                className="text-blue-600 dark:text-blue-400 font-bold underline inline-flex items-center gap-1 mx-1"
              >
                سياسة إعلانات Google
                <ExternalLink className="w-3 h-3" />
              </a>
            </li>
            <li>
              قد يستخدم شركاؤنا الإعلانيون الآخرون (مثل AdMob، شبكات التبادل الإعلاني الآلي) ملفات تعريف ارتباط وشيفرات جافاسكريبت لقياس فعالية حملاتهم الإعلانية وتخصيص محتوى الإعلانات.
            </li>
          </ul>
        </div>
      </section>

      {/* Section 2: Log Files */}
      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-500" />
          <span>2. ملفات السجل (Log Files)</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          مثل العديد من خوادم الويب العالمية، يستخدم موقع GIS ملفات السجل القياسية. تتضمن المعلومات الموجودة داخل ملفات السجل: عناوين بروتوكول الإنترنت (IP Addresses)، نوع المتصفح، مزود خدمة الإنترنت (ISP)، طابع التاريخ والوقت، صفحات الإحالة/الخروج، وعدد النقرات. يتم استخدام هذه المعلومات لتحليل الاتجاهات، إدارة الخوادم، مراقبة هجمات DDoS، وجمع معلومات ديموغرافية عامة غير مرتبطة بهوية المستخدم الشخصية المباشرة.
        </p>
      </section>

      {/* AdSense Placement */}
      <AdSensePlacement currentLang={currentLang} format="in-article" />

      {/* Section 3: User Rights under GDPR */}
      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <Globe className="w-5 h-5 text-emerald-500" />
          <span>3. حقوق حماية البيانات العامة في الاتحاد الأوروبي (GDPR Rights)</span>
        </h2>
        <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 space-y-2 leading-relaxed">
          <p>يحق لكل مستخدم في الاتحاد الأوروبي المطالبة بالحقوق التالية وفقاً للائحة GDPR:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <span className="font-bold text-slate-900 dark:text-white block">حق الوصول (Right to Access):</span>
              <span className="text-xs text-slate-500">طلب نسخ من بياناتك الشخصية المخزنة لدينا.</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <span className="font-bold text-slate-900 dark:text-white block">حق التصحيح (Right to Rectification):</span>
              <span className="text-xs text-slate-500">تصحيح أي بيانات غير دقيقة أو استكمالها.</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <span className="font-bold text-slate-900 dark:text-white block">حق الحذف (Right to Erasure):</span>
              <span className="text-xs text-slate-500">طلب مسح بياناتك الشخصية نهائياً من سجلاتنا.</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <span className="font-bold text-slate-900 dark:text-white block">حق نقل البيانات (Data Portability):</span>
              <span className="text-xs text-slate-500">نقل بياناتك بصيغة تقنية منظمة إلى مؤسسة أخرى.</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: CCPA Rights */}
      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-indigo-500" />
          <span>4. حقوق خصوصية المستهلك في كاليفورنيا (CCPA / CPRA)</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          بموجب قانون CCPA، نعلن بصراحة أننا **لا نبيع ولا نقوم بتأجير أو مقايضة بياناتك الشخصية على الإطلاق لأي أطراف ثالثة تجارية**. يمكنك ممارسة حقك في طلب الكشف عن الفئات المحددة من المعلومات التي جمعناها عنك في آخر 12 شهراً عبر التواصل مع مسؤول حماية البيانات لدينا.
        </p>
      </section>

      {/* Section 5: Children Information */}
      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <Eye className="w-5 h-5 text-red-500" />
          <span>5. حماية خصوصية الأطفال (COPPA Compliance)</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          جزء رئيسي آخر من أولوياتنا هو إضافة حماية للأطفال أثناء استخدام الإنترنت. نحن نشجع الآباء والأولياء على مراقبة نشاطهم على الإنترنت وتوجيهه. لا يقوم موقع GIS عن علم بجمع أي معلومات تعريف شخصية من الأطفال دون سن 13 عاماً.
        </p>
      </section>

      {/* DPO Contact Box */}
      <div className="p-6 rounded-2xl bg-slate-900 text-slate-200 space-y-3">
        <h3 className="font-bold text-white text-base flex items-center gap-2">
          <Mail className="w-5 h-5 text-blue-400" />
          <span>التواصل مع مسؤول حماية البيانات (Data Protection Officer - DPO)</span>
        </h3>
        <p className="text-xs text-slate-400 leading-relaxed">
          إذا كانت لديك أسئلة إضافية أو ترغب في الحصول على مزيد من المعلومات حول سياسة الخصوصية الخاصة بنا أو تقديم طلب استفسار قانوني، فلا تتردد في مراسلتنا:
        </p>
        <div className="text-xs font-mono text-blue-300">
          Email: privacy@gisnetwork.global | dpo@gisnetwork.global
        </div>
      </div>
    </div>
  );
};
