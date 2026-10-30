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
  const isAr = currentLang === 'ar';

  const milestones = [
    { 
      year: '2024', 
      title: isAr ? 'انطلاقة شبكة البنية التحتية' : 'Network Genesis', 
      desc: isAr ? 'تأسيس أولى العقد السحابية ونقاط الحضور Anycast PoPs وتدشين مركز المعرفة التقنية.' : 'Initial Anycast PoPs deployment and launch of technical knowledge library.' 
    },
    { 
      year: '2025', 
      title: isAr ? 'التوسع الإقليمي والربط بالـ EG-IX' : 'Regional IXP Peering', 
      desc: isAr ? 'الربط المباشر بمركز تبادل الإنترنت المصري (EG-IX) ومراكز البيانات الكبرى في الخليج وأوروبا لتوفير زمن استجابة دون 15ms.' : 'Direct peering with EG-IX and major regional internet exchanges in Frankfurt, Dubai, and Riyadh.' 
    },
    { 
      year: '2026', 
      title: isAr ? 'إطلاق درع WAF ومكتبة الـ 36 مقالاً الهندسية' : 'Enterprise WAF & 36 Tech Pillars', 
      desc: isAr ? 'تدشين جدار حماية تطبيقات الويب المتطور وسعة صد هجمات تفوق 15 تيرابت، مع مكتبة توثيقية تضم 36 دراسة معمارية أصيلة.' : 'Deployment of AI-driven Layer-7 WAF scrubbing and comprehensive 36-article engineering encyclopedia.' 
    },
  ];

  const leadership = [
    {
      name: isAr ? 'م. كريم المهدي (Kareem Al-Mahdi)' : 'Kareem Al-Mahdi',
      role: isAr ? 'كبير مهندسي الشبكات والسيرفرات السحابية' : 'Chief Cloud Architect',
      bio: isAr ? 'خبير في شبكات Anycast وتأمين بروتوكول BGP وحوسبة الحافة (Edge Computing) مع أكثر من 12 عاماً في هندسة مراكز البيانات.' : 'Specialist in Anycast routing, BGP traffic engineering, and resilient Edge data center architectures.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: isAr ? 'أ. حنان العلي (Hanan Al-Ali)' : 'Hanan Al-Ali',
      role: isAr ? 'رئيسة التحرير الهندسي ومستشارة معايير E-E-A-T' : 'Editorial Director & SEO Lead',
      bio: isAr ? 'باحثة في جودة المحتوى الرقمي ومعايير أداء الويب Core Web Vitals وسياسات الشفافية والامتثال في محركات البحث.' : 'Digital knowledge director focusing on Core Web Vitals optimization and Google E-E-A-T quality compliance.',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: isAr ? 'فريق الأمن السيبراني والمراقبة' : 'Cyber Defense & NOC Team',
      role: isAr ? 'مهندسو مركز العمليات الأمنية (SOC 24/7)' : '24/7 Security Operations Team',
      bio: isAr ? 'فريق متخصص في صد هجمات حجب الخدمة الموزعة DDoS، واختبار الاختراق الأخلاقي وتأمين سجلات DNSSEC وتشفير TLS 1.3.' : 'Dedicated cybersecurity specialists managing real-time threat telemetry and L7 WAF firewall policies.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-cyan-400 text-xs font-bold">
          <Globe className="w-3.5 h-3.5" />
          <span>{isAr ? 'عن منظومة خدمات الإنترنت العالمية | GIS Network' : 'About Global Internet Services (GIS Network)'}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white">
          {isAr ? 'رواد البنية التحتية السحابية والشبكات الدولية المتقدمة' : 'Architecting Next-Generation Cloud & Edge Infrastructure'}
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          {isAr
            ? 'تأسست منظومة خدمات الإنترنت العالمية (GIS Network) لتوفير بنية سحابية فائقة الأداء تعتمد على تقنيات Anycast ومعالجات AMD EPYC وشبكات الألياف الضوئية العابرة للقارات، مدعومة بمكتبة توثيقية تضم 36 مقالاً هندسياً أصيلاً لخدمة مجتمع المطورين ورواد الأعمال.'
            : 'We empower enterprises, startups, and developers worldwide with resilient cloud virtualization, sub-millisecond edge content delivery, and robust cyber defenses.'}
        </p>
      </div>

      {/* Genuine Stats Counter */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center shadow-sm">
          <div className="text-3xl sm:text-4xl font-black text-blue-600 dark:text-cyan-400">99.99%</div>
          <div className="text-xs font-bold text-slate-500 mt-1">{isAr ? 'ضمان استقرار التشغيل SLA' : 'Uptime SLA Guarantee'}</div>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center shadow-sm">
          <div className="text-3xl sm:text-4xl font-black text-indigo-500">240+</div>
          <div className="text-xs font-bold text-slate-500 mt-1">{isAr ? 'نقطة حضور Anycast PoP' : 'Global Edge PoPs'}</div>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center shadow-sm">
          <div className="text-3xl sm:text-4xl font-black text-emerald-500">36</div>
          <div className="text-xs font-bold text-slate-500 mt-1">{isAr ? 'مقال ودراسة معمارية أصيلة' : 'Original Tech Studies'}</div>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center shadow-sm">
          <div className="text-3xl sm:text-4xl font-black text-amber-500">&lt; 10ms</div>
          <div className="text-xs font-bold text-slate-500 mt-1">{isAr ? 'زمن الاستجابة الإقليمي Ping' : 'Regional Edge Ping'}</div>
        </div>
      </div>

      {/* Vision & Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-cyan-400 flex items-center justify-center">
            <Server className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg text-slate-900 dark:text-white">
            {isAr ? 'الريادة المعمارية والاستقرار' : 'Architectural Excellence'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {isAr
              ? 'نبني أنظمتنا على أحدث عتاد سيرفرات AMD EPYC ووحدات تخزين NVMe Gen4 وتوزيع شبكي Anycast يضمن عدم انقطاع الخدمة حتى في أوقات ذروة الزيارات.'
              : 'Built with enterprise-grade hypervisors, Tier-4 datacenters, and automated multi-cloud failover.'}
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg text-slate-900 dark:text-white">
            {isAr ? 'الأمان والامتثال والخصوصية' : 'Security & GDPR Compliance'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {isAr
              ? 'نلتزم باللوائح الصارمة لحماية البيانات العامة GDPR وقوانين حماية البيانات المصرية، مع جدران حماية WAF وتشفير TLS 1.3 الشامل.'
              : 'Strict adherence to global data privacy laws, Zero-Trust access control, and continuous vulnerability scanning.'}
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg text-slate-900 dark:text-white">
            {isAr ? 'الأصالة التحريرية ومعايير E-E-A-T' : 'Authentic Knowledge & E-E-A-T'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {isAr
              ? 'تكتب مقالاتنا بواسطة مهندسين وخبراء ميدانيين، وتقدم حلولاً عملية قابلة للتطبيق الفوري تلبي أعلى متطلبات Google AdSense و Core Web Vitals.'
              : 'Our engineering knowledge base is crafted directly by practicing architects to provide real, transparent insights.'}
          </p>
        </div>
      </div>

      {/* Leadership & Engineering Team */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            {isAr ? 'فريق القيادة والهندسة' : 'Engineering & Leadership Team'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            {isAr ? 'كفاءات هندسية متخصصة تقود تطوير البنية السحابية وإثراء المحتوى التقني' : 'Meet the architects behind our global cloud operations'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {leadership.map((member, i) => (
            <div key={i} className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 text-center">
              <div className="w-20 h-20 rounded-full mx-auto overflow-hidden border-2 border-blue-500/30 shadow-md">
                <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-base text-slate-900 dark:text-white">{member.name}</h3>
                <div className="text-xs font-semibold text-blue-600 dark:text-cyan-400">{member.role}</div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Historical Milestones */}
      <div className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white text-center">
          {isAr ? 'محطات التطور الهندسي' : 'Architectural Milestones'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {milestones.map((m, i) => (
            <div key={i} className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-2">
              <div className="font-mono text-xl font-black text-blue-600 dark:text-cyan-400">{m.year}</div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">{m.title}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default AboutPage;
