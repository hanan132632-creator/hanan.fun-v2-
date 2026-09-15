import React from 'react';
import { 
  Globe, 
  Award, 
  ShieldCheck, 
  Users, 
  Target, 
  Server, 
  Activity, 
  Zap,
  CheckCircle2
} from 'lucide-react';
import { Language, ActivePage } from '../types';
import { TRANSLATIONS } from '../locales/translations';
import { AdSensePlacement } from '../components/AdSensePlacement';

interface AboutPageProps {
  currentLang: Language;
  onNavigate: (page: ActivePage) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ currentLang, onNavigate }) => {
  const t = TRANSLATIONS[currentLang];

  const milestones = [
    { year: '2021', title: 'تأسيس المنصة السحابية', desc: 'إطلاق أول 10 نقاط تواجد للشبكة (PoPs) في فرانكفورت والرياض ولندن.' },
    { year: '2023', title: 'توسعة Anycast DNS و DDoS Mitigation', desc: 'رفع قدرة الاستيعاب الشبكي إلى 80 Tbps مع حماية مدمجة ضد هجمات الطبقة 3 و 4 و 7.' },
    { year: '2025', title: 'اعتماد شراكة Google Certified Publishing Network', desc: 'تزويد أكثر من 150,000 موقع بالبنية التحتية المتوافقة بنسبة 100% مع Core Web Vitals.' },
    { year: '2026', title: 'إطلاق الجيل القادم لخدمات الإنترنت العالمية', desc: 'دمج الذكاء الاصطناعي التوليدي عبر Gemini 3.7 وربط 240+ مركز بيانات فائق السرعة.' },
  ];

  const leadership = [
    {
      name: 'د. طارق السعيد (Dr. Tarek Al-Saeed)',
      role: 'Chief Infrastructure Officer & Co-Founder',
      bio: 'خبير نظم سحابية معتمد من Google Cloud و AWS بخبرة تتجاوز 18 عاماً في بناء شبكات BGP Anycast فائقة الاعتمادية.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'م. ياسمين النجار (Eng. Yasmine Al-Najjar)',
      role: 'Head of Cybersecurity & Compliance',
      bio: 'متخصصة في تشفير البيانات وأمن Zero Trust، وقادت تطبيق معايير ISO 27001 و GDPR و SOC 2 Type II عبر كافة مراكزنا.',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'Alexandre Dubois',
      role: 'VP of Global Edge Architecture',
      bio: 'مهندس اتصالات وبنية تحتية قاد مشاريع الكابلات البحرية ومراكز التبادل الرقمي (IXPs) في أوروبا وآسيا والشرق الأوسط.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 text-xs font-bold">
          <Globe className="w-3.5 h-3.5" />
          <span>من نحن - خدمات الإنترنت العالمية (GIS Global)</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white">
          {t.about_title}
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          {t.about_mission}
        </p>
      </div>

      {/* Stats Counter */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center shadow-sm">
          <div className="text-3xl sm:text-4xl font-black text-blue-600 dark:text-blue-400">240+</div>
          <div className="text-xs font-bold text-slate-500 mt-1">مراكز بيانات عالمية (Edge PoPs)</div>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center shadow-sm">
          <div className="text-3xl sm:text-4xl font-black text-emerald-500">99.99%</div>
          <div className="text-xs font-bold text-slate-500 mt-1">اتفاقية مستوى الخدمة (SLA Uptime)</div>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center shadow-sm">
          <div className="text-3xl sm:text-4xl font-black text-purple-600 dark:text-purple-400">150,000+</div>
          <div className="text-xs font-bold text-slate-500 mt-1">موقع وتطبيق سحابي فعال</div>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center shadow-sm">
          <div className="text-3xl sm:text-4xl font-black text-amber-500">&lt; 20ms</div>
          <div className="text-xs font-bold text-slate-500 mt-1">متوسط زمن الاستجابة العالمي</div>
        </div>
      </div>

      {/* Vision & Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg text-slate-900 dark:text-white">رؤيتنا الاستراتيجية</h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            تمكين رواد الأعمال والشركات والمطورين حول العالم من الوصول إلى بنية تحتية سحابية موثوقة وفائقة السرعة، تلبي أرقى معايير الأمان وتحقق أقصى ربحية ممكنة عبر الإعلانات الرقمية.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg text-slate-900 dark:text-white">الأمان والموثوقية</h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            حماية بيانات العملاء وخصوصيتهم هي جوهر عملنا. نلتزم التزاماً صارماً بتشريعات GDPR واللائحة العامة لحماية البيانات، مع تطبيق عزل شبكي كامل وتشفير طرف إلى طرف.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg text-slate-900 dark:text-white">معايير الجودة E-E-A-T</h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            كافة مقالاتنا وخدماتنا تصاغ وتشرف عليها كوادر هندسية معتمدة لضمان الخبرة والمصداقية والشفافية التامة، بما يتوافق بالكامل مع متطلبات Google AdSense و Core Web Vitals.
          </p>
        </div>
      </div>

      {/* AdSense Placement */}
      <AdSensePlacement currentLang={currentLang} format="leaderboard" />

      {/* Leadership Team (E-E-A-T Requirement) */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            {t.about_team_title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            فريق قيادي هندسي يجمع بين الخبرة الدولية العميقة والشغف بالابتكار السحابي
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {leadership.map((member, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center text-center space-y-4"
            >
              <img
                src={member.avatar}
                alt={member.name}
                className="w-24 h-24 rounded-full object-cover border-2 border-blue-600 shadow-md"
                referrerPolicy="no-referrer"
              />
              <div className="space-y-1">
                <h3 className="font-black text-base text-slate-900 dark:text-white">{member.name}</h3>
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400 block">{member.role}</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Company Timeline */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            محطات في مسيرة التميز الرقمي
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            تطور مستمر نحو بناء أسرع شبكة إنترنت سحابية في العالم
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {milestones.map((m, i) => (
            <div key={i} className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <span className="text-xl font-black text-blue-600 dark:text-blue-400">{m.year}</span>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">{m.title}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
