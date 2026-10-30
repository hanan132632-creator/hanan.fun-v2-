import React, { useState } from 'react';
import { 
  Server, 
  Globe, 
  ShieldCheck, 
  Cpu, 
  Activity, 
  Zap, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  Clock, 
  Video, 
  Key, 
  BookOpen, 
  ExternalLink,
  ChevronRight,
  TrendingUp,
  MapPin,
  Lock,
  Sparkles
} from 'lucide-react';
import { Language, Currency, ActivePage } from '../types';
import { TRANSLATIONS } from '../locales/translations';
import { BLOG_POSTS, GLOBAL_SERVICES, SERVER_NODES, TESTIMONIALS } from '../data/mockData';
import { AdSensePlacement } from '../components/AdSensePlacement';

const SpeedTestWidget = React.lazy(() => import('../components/SpeedTestWidget').then(m => ({ default: m.SpeedTestWidget })));
const PasswordGeneratorWidget = React.lazy(() => import('../components/PasswordGeneratorWidget').then(m => ({ default: m.PasswordGeneratorWidget })));

interface HomePageProps {
  currentLang: Language;
  currentCurrency?: Currency;
  onNavigate: (page: ActivePage) => void;
  onAddToCart?: (service: any) => void;
  onSelectBlog: (slug: string) => void;
  onOpenAiAssistant?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  currentLang,
  onNavigate,
  onSelectBlog,
}) => {
  const t = TRANSLATIONS[currentLang];
  const isAr = currentLang === 'ar';
  const [activeToolTab, setActiveToolTab] = useState<'speed' | 'password' | 'video'>('speed');

  const featuredArticles = BLOG_POSTS.slice(0, 6);

  return (
    <div className="space-y-12 sm:space-y-16 pb-16 overflow-x-hidden bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      
      {/* 1. Hero Section - Enterprise Cloud & Infrastructure */}
      <section className="relative overflow-hidden pt-8 pb-12 md:pt-16 md:pb-16 bg-gradient-to-b from-slate-50 via-white to-white dark:from-slate-900 dark:via-slate-950 dark:to-slate-950 border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Hero Text */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-start">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-cyan-400 text-xs font-bold shadow-xs">
                <Globe className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
                <span>{isAr ? 'منظومة خدمات الإنترنت العالمية • Global Internet Services' : 'Enterprise Cloud & Global Infrastructure 2026'}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.2] font-sans">
                {isAr ? (
                  <>
                    بنية تحتية سحابية متقدمة{' '}
                    <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent">
                      فائقة الاستقرار والسرعة
                    </span>{' '}
                    <br className="hidden sm:block" />
                    لأعمالك الرقمية
                  </>
                ) : (
                  <>
                    High-Performance Cloud &{' '}
                    <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent">
                      Edge Infrastructure
                    </span>
                  </>
                )}
              </h1>

              <p className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                {isAr
                  ? 'منصة هندسية عالمية تقدم خدمات السيرفرات السحابية Cloud VPS، شبكات توزيع المحتوى Anycast CDN، جدران الحماية السيبرانية WAF، مع مكتبة معرفية تضم 36 مقالاً ودراسة تقنية متخصصة.'
                  : 'Engineered for peak performance, sub-millisecond Anycast routing, automated cyber defenses, and high-concurrency cloud computing across 240+ global Edge points of presence.'}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
                <button
                  onClick={() => onNavigate('store')}
                  className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-blue-600/25 transition-all hover:scale-105 flex items-center gap-2 cursor-pointer"
                >
                  <Server className="w-4 h-4" />
                  <span>{isAr ? 'استكشف السيرفرات والخدمات' : 'Explore Cloud Solutions'}</span>
                </button>

                <button
                  onClick={() => onNavigate('blog')}
                  className="px-5 py-3.5 rounded-2xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-bold text-sm border border-slate-200 dark:border-slate-700 shadow-xs transition-all flex items-center gap-2 cursor-pointer"
                >
                  <BookOpen className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
                  <span>{isAr ? 'المدونة والمعرفة التقنية (36 مقال)' : 'Read Articles (36 Posts)'}</span>
                </button>

                <button
                  onClick={() => onNavigate('diagnostics')}
                  className="px-5 py-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800/60 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-sm transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Activity className="w-4 h-4 text-emerald-500" />
                  <span>{isAr ? 'فاحص السرعة والشبكة' : 'Speed Test'}</span>
                </button>
              </div>

              {/* SLA & Performance Badges */}
              <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-slate-600 dark:text-slate-400 border-t border-slate-200/80 dark:border-slate-800/80">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>99.99% SLA Uptime</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>240+ Anycast PoPs</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>15+ Tbps DDoS Shield</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>36 مقال تقني أصيل</span>
                </div>
              </div>
            </div>

            {/* Hero Visual Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl p-6 sm:p-8 bg-slate-900 text-white shadow-2xl border border-slate-800 overflow-hidden">
                <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="relative z-10 space-y-5">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></div>
                      <span className="font-mono text-xs font-bold text-emerald-400">All Systems Operational</span>
                    </div>
                    <span className="text-xs text-slate-400 font-mono">Edge Tier 1</span>
                  </div>

                  <div className="space-y-3 font-mono text-xs">
                    <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex justify-between items-center">
                      <span className="text-slate-400">🇪🇬 Cairo (EG-IX Datacenter)</span>
                      <span className="text-emerald-400 font-bold">12ms • 100% SLA</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex justify-between items-center">
                      <span className="text-slate-400">🇸🇦 Riyadh Edge Node</span>
                      <span className="text-emerald-400 font-bold">16ms • Active</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex justify-between items-center">
                      <span className="text-slate-400">🇩🇪 Frankfurt Central Hub</span>
                      <span className="text-cyan-400 font-bold">14ms • Anycast</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex justify-between items-center">
                      <span className="text-slate-400">🇺🇸 New York Financial PoP</span>
                      <span className="text-emerald-400 font-bold">22ms • 10Gbps</span>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between text-xs">
                    <span className="text-slate-400">DDoS Mitigation:</span>
                    <span className="text-blue-400 font-bold">L3/L4/L7 Auto Active</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Primary Infrastructure Solutions (ركائز المنظومة) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-cyan-400 text-xs font-bold">
            <Layers className="w-3.5 h-3.5" />
            <span>{isAr ? 'ركائز منظومة خدمات الإنترنت العالمية' : 'Core Infrastructure Services'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white">
            {isAr ? 'حلول سحابية متكاملة مصممة لأعلى أداء' : 'Enterprise Cloud & Web Engineering'}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            {isAr
              ? 'تغطي المنظومة كافة احتياجات الشركات والمشاريع الرقمية من الاستضافة السريعة إلى الأمان وتوزيع المحتوى.'
              : 'End-to-end architectures designed for 99.99% uptime, data privacy compliance, and sub-millisecond edge latency.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {GLOBAL_SERVICES.slice(0, 6).map((service) => (
            <div
              key={service.id}
              className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-blue-500/40 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-cyan-400 flex items-center justify-center font-bold">
                    <Server className="w-6 h-6" />
                  </div>
                  {service.badge && (
                    <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-cyan-400 text-[11px] font-bold border border-blue-500/20">
                      {service.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-black text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                  {service.name[currentLang] || service.name.ar}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {service.shortDesc[currentLang] || service.shortDesc.ar}
                </p>

                <ul className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800/80 text-xs text-slate-600 dark:text-slate-400">
                  {(service.features[currentLang] || service.features.ar).slice(0, 3).map((feat, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-semibold block">
                    {isAr ? 'الترخيص والاعتماد' : 'Deployment Tier'}
                  </span>
                  <span className="text-sm font-black text-slate-900 dark:text-white">
                    {isAr ? 'معتمد للمؤسسات' : 'Enterprise SLA'}
                  </span>
                </div>

                <button
                  onClick={() => onNavigate('store')}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-blue-600 dark:bg-slate-800 dark:hover:bg-blue-600 text-slate-700 hover:text-white dark:text-slate-200 font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>{isAr ? 'التفاصيل' : 'Details'}</span>
                  <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Interactive Web & Diagnostics Suite */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-800 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-bold mb-2">
                <Activity className="w-3.5 h-3.5" />
                <span>{isAr ? 'أدوات الويب التفاعلية الحية' : 'Live Interactive Web Tools'}</span>
              </div>
              <h2 className="text-xl sm:text-3xl font-black text-white">
                {isAr ? 'فحص واختبار أداء الشبكة مباشرة في المتصفح' : 'Real-Time Edge Network & Diagnostics'}
              </h2>
            </div>

            {/* Tool Selection Tabs */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveToolTab('speed')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeToolTab === 'speed' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {isAr ? 'فاحص السرعة وزمن Ping' : 'Speed & Ping Test'}
              </button>
              <button
                onClick={() => setActiveToolTab('password')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeToolTab === 'password' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {isAr ? 'مولد كلمات المرور الآمنة' : 'Password Generator'}
              </button>
              <button
                onClick={() => onNavigate('audio-to-video')}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600/80 hover:bg-indigo-600 text-white transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Video className="w-3.5 h-3.5" />
                <span>{isAr ? 'استوديو الفيديو الرقمي' : 'Audio to Video Studio'}</span>
              </button>
            </div>
          </div>

          {/* Active Tool View */}
          <div className="bg-slate-950/70 p-4 sm:p-6 rounded-2xl border border-slate-800">
            {activeToolTab === 'speed' && (
              <React.Suspense fallback={<div className="h-40 flex items-center justify-center text-slate-500">Loading Speed Test...</div>}>
                <SpeedTestWidget currentLang={currentLang} />
              </React.Suspense>
            )}

            {activeToolTab === 'password' && (
              <React.Suspense fallback={<div className="h-40 flex items-center justify-center text-slate-500">Loading Tool...</div>}>
                <PasswordGeneratorWidget currentLang={currentLang} />
              </React.Suspense>
            )}
          </div>
        </div>
      </section>

      {/* 4. Featured 36 Technical Articles Library */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 text-xs font-bold mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{isAr ? 'مكتبة المعرفة والتقنية (36 مقال متخصص)' : 'Technical Knowledge Library (36 Posts)'}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white">
              {isAr ? 'أحدث المقالات والدراسات الهندسية' : 'Latest Architectural Articles & Guides'}
            </h2>
          </div>

          <button
            onClick={() => onNavigate('blog')}
            className="px-5 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer self-start md:self-auto"
          >
            <span>{isAr ? 'عرض كافة الـ 36 مقال' : 'Browse All 36 Articles'}</span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredArticles.map((post) => (
            <article
              key={post.id}
              onClick={() => onSelectBlog(post.slug)}
              className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-blue-500/40 transition-all flex flex-col justify-between group cursor-pointer"
            >
              <div>
                <div className="relative aspect-video overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img
                    src={post.coverImage}
                    alt={post.title[currentLang] || post.title.ar}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute top-3 right-3 rtl:right-auto rtl:left-3 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold">
                    {post.readTimeMin} {isAr ? 'دقائق' : 'min read'}
                  </div>
                </div>

                <div className="p-5 sm:p-6 space-y-3">
                  <div className="text-[11px] font-bold text-blue-600 dark:text-cyan-400 uppercase tracking-wider">
                    {post.category}
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors leading-snug">
                    {post.title[currentLang] || post.title.ar}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                    {post.excerpt[currentLang] || post.excerpt.ar}
                  </p>
                </div>
              </div>

              <div className="px-5 sm:px-6 pb-5 pt-2 flex items-center justify-between border-t border-slate-100 dark:border-slate-800/80 text-xs text-slate-500">
                <span>{post.publishDate}</span>
                <span className="font-bold text-blue-600 dark:text-cyan-400 flex items-center gap-1 group-hover:underline">
                  <span>{isAr ? 'قراءة المقال' : 'Read Article'}</span>
                  <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 5. Global Server Presence & Data Centers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="bg-slate-50 dark:bg-slate-900/60 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 space-y-6">
          <div className="flex items-center gap-2 text-blue-600 dark:text-cyan-400 font-bold text-xs uppercase tracking-wider">
            <MapPin className="w-4 h-4" />
            <span>{isAr ? 'خريطة الحضور السحابي والمراكز الدولية' : 'Global Datacenters & Anycast Nodes'}</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {SERVER_NODES.slice(0, 6).map((node) => (
              <div key={node.id} className="p-3.5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 text-center space-y-1">
                <div className="text-xl">{node.flag}</div>
                <div className="font-bold text-xs text-slate-900 dark:text-white">{node.city}</div>
                <div className="text-[11px] font-mono text-emerald-500 font-semibold">{node.pingMs}ms Ping</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AdSense Placement Box */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdSensePlacement slot="7890123456" format="auto" />
      </section>

    </div>
  );
};

export default HomePage;
