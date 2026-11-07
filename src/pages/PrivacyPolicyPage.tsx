import React from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Smartphone, 
  FileText, 
  Globe, 
  Key, 
  Eye, 
  Mail, 
  CheckCircle2,
  Sparkles,
  Award
} from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../locales/translations';

interface PrivacyPolicyPageProps {
  currentLang: Language;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ currentLang }) => {
  const t = TRANSLATIONS[currentLang];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Header Badge & Title */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 text-xs font-extrabold border border-blue-200 dark:border-blue-800">
          <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span>Google Play Developer & AdSense Compliant • Version 4.5</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white leading-tight">
          سياسة الخصوصية وحماية البيانات (Privacy Policy)
        </h1>
        <p className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          تاريخ آخر تحديث ومراجعة امتثال: <span className="text-blue-600 dark:text-blue-400 font-bold">25 أغسطس 2026</span> | الإصدار 4.5 المتوافق مع معايير <span className="text-emerald-600 dark:text-emerald-400 font-bold">Google Play Developer</span> وسياسات عائلة جوجل ولائحة <span className="text-indigo-600 dark:text-indigo-400 font-bold">GDPR</span> و <span className="text-purple-600 dark:text-purple-400 font-bold">CCPA</span>
        </p>
      </div>

      {/* Package Identity & Intro Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-blue-50/90 via-slate-50 to-indigo-50/80 dark:from-slate-900 dark:via-slate-900/90 dark:to-blue-950/40 border border-blue-200/80 dark:border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/25 shrink-0">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-extrabold text-slate-900 dark:text-white text-lg sm:text-xl">
              مقدمة والتزام بحماية خصوصيتك
            </h2>
            <div className="text-xs text-blue-600 dark:text-blue-400 font-mono font-bold flex flex-wrap gap-2 mt-1">
              <span className="px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/50">Package: com.hanan.gis</span>
              <span className="px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/50">Domain: hanan.fun</span>
            </div>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
          في منظومة <strong className="text-slate-900 dark:text-white font-black">خدمات الإنترنت العالمية (Global Internet Services - GIS Network)</strong> وتطبيقها الرسمي المتاح على متجر جوجل بلاي برمز حزمة (<strong className="text-blue-600 dark:text-blue-400 font-mono">com.hanan.gis</strong>) عبر النطاق المعتمد (<strong className="text-blue-600 dark:text-blue-400 font-mono">hanan.fun</strong>)، نعتبر خصوصية زوارنا ومستخدمي تطبيقنا ذات أهمية بالغة وخطاً أحمر لا تهاون فيه. توضح هذه الوثيقة الشاملة طبيعة البيانات التقنية التي نجمعها، وكيفية استخدامها وحمايتها، والتزامنا التام بمعايير الشفافية الإعلانية لشركاء جوجل (<strong className="text-emerald-600 dark:text-emerald-400">Google AdMob / AdSense</strong>) ولوائح حماية البيانات العامة في الاتحاد الأوروبي (<strong className="text-indigo-600 dark:text-indigo-400">GDPR</strong>) وقانون خصوصية المستهلك في كاليفورنيا (<strong className="text-purple-600 dark:text-purple-400">CCPA</strong>).
        </p>
      </div>

      {/* Section 1: App Access & Data Collection */}
      <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <Smartphone className="w-5 h-5" />
          </div>
          <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
            1. طبيعة وصول التطبيق والبيانات (App Access & Data Collection)
          </h2>
        </div>
        
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
          تطبيق خدمات الإنترنت العالمية (<span className="font-mono text-blue-600 dark:text-blue-400">com.hanan.gis</span>) هو تطبيق تصفح معرفي وخدمي مفتوح بالكامل للمستخدمين.
        </p>

        <div className="grid grid-cols-1 gap-3 pt-1">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-xs sm:text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>تسجيل الدخول:</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed ps-6">
              لا يتطلب التطبيق أي تسجيل دخول، ولا يطلب إنشاء حساب، ولا يجمع أو يطلب كلمات مرور أو أسماء مستخدمين.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-xs sm:text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>البيانات الحساسة:</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed ps-6">
              لا يقوم التطبيق بالوصول إلى صلاحيات الهاتف الحساسة مثل (الكاميرا، الميكروفون، الصور، الأسماء، أو الموقع الجغرافي الدقيق GPS).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-xs sm:text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>الإعلانات وملفات تعريف الارتباط:</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed ps-6">
              يعتمد التطبيق على شبكة <strong className="text-slate-900 dark:text-white">Google الإعلانية الرسمية</strong> كمورد خارجي، حيث تستخدم الشبكة ملفات تعريف الارتباط (Cookies) والمعرفات الرقمية الآمنة لعرض إعلانات ملائمة وسياقية تناسب اهتمامات المستخدمين وتمنع الاحتيال الإلكتروني وفقاً لسياسات برنامج مطوري Google Play.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Log Files & Technical Analytics */}
      <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
            2. ملفات السجل والتحليلات التقنية (Log Files & Analytics)
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          مثل العديد من منصات وخوادم الويب العالمية، تستخدم شبكة GIS Network عبر خوادمها الآمنة ملفات السجل القياسية المشفرة لتحسين الأداء (عبر استضافة Vercel). تتضمن هذه المعلومات: نوع المتصفح، نظام تشغيل الهاتف، طابع التاريخ والوقت، وصفحات الإحالة. يتم استخدام هذه المعلومات حصرياً لتحليل الاتجاهات، إدارة الخوادم، مراقبة أمان المنصة، وضمان توافق الأداء بنسبة 100% مع معايير Google Core Web Vitals وسرعة التصفح، وهي معلومات غير مرتبطة نهائياً بهوية المستخدم الشخصية.
        </p>
      </section>

      {/* Section 3: GDPR Rights */}
      <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
            <Globe className="w-5 h-5" />
          </div>
          <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
            3. حقوق حماية البيانات العامة في الاتحاد الأوروبي (GDPR Rights)
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          يحق لكل مستخدم المطالبة بالوصول إلى أي بيانات تقنية مخزنة، أو طلب حذف ملفات الارتباط الكوكيز الخاصة بتصفحه، أو تعديل خيارات التتبع الإعلاني المخصصة في أي وقت من خلال إعدادات جهازه أو المتصفح.
        </p>
      </section>

      {/* Section 4: CCPA / CPRA Rights */}
      <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
            <Key className="w-5 h-5" />
          </div>
          <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
            4. حقوق خصوصية المستهلك في كاليفورنيا (CCPA / CPRA)
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          بموجب قانون CCPA، نعلن بصراحة أننا لا نبيع، ولا نقوم بتأجير، أو مقايضة بيانات مستخدمينا على الإطلاق لأي أطراف ثالثة تجارية.
        </p>
      </section>

      {/* Section 5: COPPA Children Privacy Compliance */}
      <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
            <Eye className="w-5 h-5" />
          </div>
          <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
            5. حماية خصوصية الأطفال (COPPA Compliance)
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          إن حماية القاصرين أثناء استخدام الإنترنت هي أولوية قصوى لنا. لا يقوم تطبيق ومنظومة GIS Network عن علم بجمع أي معلومات تعريف شخصية من الأطفال دون سن 13 عاماً، وجميع خدماتنا ومقالاتنا التقنية البالغة (38 مقالاً) موجهة للمطورين والمؤسسات ورواد الأعمال البالغين سن الرشد القانوني.
        </p>
      </section>

      {/* Contact DPO Box */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-slate-100 border border-slate-800 shadow-2xl space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-pink-500/20 text-pink-400 flex items-center justify-center shrink-0 border border-pink-500/30">
            <Mail className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-extrabold text-white text-base sm:text-lg">
              التواصل مع مسؤول حماية البيانات (Data Protection Officer - DPO)
            </h3>
            <p className="text-xs text-slate-400">Google Play Console Developer Official Support Channel</p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          إذا كانت لديك أسئلة إضافية أو ترغب في تقديم طلب استفسار قانوني، فلا تتردد في مراسلتنا عبر البريد الإلكتروني الرسمي المعتمد للمطور في Google Play Console:
        </p>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-mono text-pink-300 flex items-center justify-between flex-wrap gap-2">
          <span className="font-bold select-all">Email: support@hanan.fun | privacy@hanan.fun</span>
          <span className="px-2 py-1 rounded bg-pink-500/10 text-pink-400 text-[11px] font-sans font-semibold">24/7 Response Guaranteed</span>
        </div>
      </div>
    </div>
  );
};
