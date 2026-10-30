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
import { AdsterraPlacement } from '../components/AdsterraPlacement';

interface AboutPageProps {
  currentLang: Language;
  onNavigate: (page: ActivePage) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ currentLang, onNavigate }) => {
  const t = TRANSLATIONS[currentLang];

  const milestones = [
    { year: '2024', title: 'انطلاقة المنصة التحريرية', desc: 'بدء نشر أولى المقالات والدراسات المعرفية في مجالات التقنية، تصميم الويب، وتنسيق المحتوى.' },
    { year: '2025', title: 'تطوير أدوات الويب التفاعلية', desc: 'إطلاق استوديو تحويل الصوت إلى فيديو وفاحص السرعة ومولد كلمات المرور الآمنة لتسهيل مهام المستخدمين.' },
    { year: '2026', title: 'إطلاق الألعاب التفاعلية الحديثة', desc: 'برمجة وإطلاق لعبة تلبيس وأزياء بنات استايل أمريكي 2026 بتجربة فورية ممتعة، وتوسعة مكتبة المقالات لتتجاوز 36 مقالاً ثرياً.' },
  ];

  const leadership = [
    {
      name: 'حنان العلي (Hanan Al-Ali)',
      role: 'مؤسسة الاستوديو ومصممة الواجهات التفاعلية',
      bio: 'شغوفة بتصميم تجارب الويب الممتعة، وتطوير ألعاب وتطبيقات المتصفح الخفيفة التي تقدم قيمة ترفيهية وتعليمية راقية.',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'كريم المهدي (Kareem Al-Mahdi)',
      role: 'مهندس تطوير الويب والألعاب التفاعلية',
      bio: 'مطور برمجيات يركز على أداء الويب العالي، وضمان سلاسة تشغيل الألعاب وأدوات الفيديو مباشرة في المتصفح بدون أي بطء.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'نور الشامي (Nour Al-Shami)',
      role: 'محررة المحتوى الرقمي وأبحاث الموضة',
      bio: 'كاتبة ومحررة متخصصة في متابعة أحدث اتجاهات الموضة العالمية، وتنسيق مقالات إرشادية مفيدة ومكتوبة بأسلوب بشري جذاب.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 text-xs font-bold">
          <Globe className="w-3.5 h-3.5" />
          <span>عن استوديو حنان الرقمي | Hanan Studio</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white">
          مساحة إبداعية تصنع تجارب رقمية ممتعة، أدوات ويب ذكية، ومحتوى أصيل
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          انطلقت منصتنا بهدف إثراء المحتوى العربي الراقي على شبكة الإنترنت، وتوفير ألعاب وتطبيقات تفاعلية خفيفة تعمل فوراً في المتصفح، مع مقالات تحريرية ثرية ومفيدة تفيد كل قارئ ومهتم بالأناقة والتقنية والابتكار.
        </p>
      </div>

      {/* Genuine Stats Counter */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center shadow-sm">
          <div className="text-3xl sm:text-4xl font-black text-rose-500">36+</div>
          <div className="text-xs font-bold text-slate-500 mt-1">مقال ودراسة تحريرية أصلية</div>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center shadow-sm">
          <div className="text-3xl sm:text-4xl font-black text-indigo-500">5+</div>
          <div className="text-xs font-bold text-slate-500 mt-1">ألعاب وأدوات تفاعلية مجانية</div>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center shadow-sm">
          <div className="text-3xl sm:text-4xl font-black text-emerald-500">100%</div>
          <div className="text-xs font-bold text-slate-500 mt-1">تجربة آمنة وممتعة للعائلة</div>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center shadow-sm">
          <div className="text-3xl sm:text-4xl font-black text-amber-500">فوري</div>
          <div className="text-xs font-bold text-slate-500 mt-1">تشغيل مباشر بدون تثبيت</div>
        </div>
      </div>

      {/* Vision & Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg text-slate-900 dark:text-white">الإبداع والسهولة</h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            نؤمن بأن أفضل التجارب الرقمية هي تلك التي تجمع بين البساطة والجمال. صممنا كافة ألعابنا وأدواتنا لتعمل بنقرة واحدة دون تعقيدات تقنية.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg text-slate-900 dark:text-white">الأمان والخصوصية</h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            حماية بيانات زوارنا وأمان أطفالنا وعائلاتنا أولوية مطلقة. نلتزم بأعلى معايير الخصوصية ونقدم تجربة تصفح نظيفة خالية من البرمجيات الضارة.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg text-slate-900 dark:text-white">الصدق والأمانة التحريرية</h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            نكتب مقالاتنا بأيدينا وبخبرتنا الشخصية، ونراجع كل نص ومعلومة بعناية فائقة لنقدم لقرائنا قيمة مضافة حقيقية تدوم وتلهم.
          </p>
        </div>
      </div>

      {/* Adsterra Placement */}
      <AdsterraPlacement currentLang={currentLang} format="leaderboard" />

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
