import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Star, 
  Video, 
  ChevronRight,
  ShieldCheck,
  Heart,
  Palette,
  Play
} from 'lucide-react';
import { Language, Currency, ActivePage } from '../types';
import { TRANSLATIONS } from '../locales/translations';
import { BLOG_POSTS, TESTIMONIALS } from '../data/mockData';
import { AdSensePlacement } from '../components/AdSensePlacement';

const SpeedTestWidget = React.lazy(() => import('../components/SpeedTestWidget').then(m => ({ default: m.SpeedTestWidget })));
const InteractiveGamesSection = React.lazy(() => import('../components/InteractiveGamesSection').then(m => ({ default: m.InteractiveGamesSection })));
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
  const [activeToolTab, setActiveToolTab] = useState<'video' | 'password' | 'speed' | 'wordle'>('video');

  return (
    <div className="space-y-8 sm:space-y-12 pb-16 overflow-x-hidden bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      
      {/* 1. Hero Section - Sleek & zero empty bottom padding */}
      <section className="relative overflow-hidden pt-6 pb-8 md:pt-12 md:pb-10 bg-gradient-to-b from-pink-50/50 via-white to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 border-b border-pink-100/60 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Hero Text */}
            <div className="lg:col-span-7 space-y-5 text-center lg:text-start">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-100/80 dark:bg-pink-950/80 border border-pink-200 dark:border-pink-800 text-pink-700 dark:text-pink-300 text-xs font-bold shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>استوديو حنان الرقمي 2026</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.2] font-sans" style={{ textWrap: 'balance' }}>
                استوديو حنان الرقمي{' '}
                <span className="bg-gradient-to-r from-pink-600 via-rose-600 to-amber-500 bg-clip-text text-transparent">
                  ألعاب بنات ستايل أمريكي 2026
                </span>{' '}
                <br className="hidden sm:block" />
                وأدوات تفاعلية ومقالات
              </h1>

              <p className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                منصة ترفيهية ومعرفية عربية متكاملة تجمع بين لعبة تلبيس وتنسيق أزياء بنات ستايل أمريكي الحديثة، استوديو تحويل الصوت إلى فيديو، حزمة أدوات الويب الذكية، ومكتبة غنية بمقالات الموضة والأزياء الحصرية.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
                <button
                  onClick={() => onNavigate('american-style-game')}
                  className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 hover:from-pink-600 hover:to-rose-600 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-pink-500/25 transition-all hover:scale-105 flex items-center gap-2 cursor-pointer"
                >
                  <span className="text-xl">👑</span>
                  <span>العب لعبة بنات ستايل أمريكي 2026</span>
                </button>

                <button
                  onClick={() => onNavigate('audio-to-video')}
                  className="px-5 py-3.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 hover:bg-indigo-100 text-indigo-700 dark:text-indigo-300 font-bold text-sm border border-indigo-200 dark:border-indigo-800 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Video className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span>استوديو الفيديو الرقمي</span>
                </button>

                <button
                  onClick={() => onNavigate('blog')}
                  className="px-5 py-3.5 rounded-2xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-bold text-sm border border-slate-200 dark:border-slate-700 shadow-xs transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>تصفح المقالات</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </button>
              </div>

              {/* Trust Badges */}
              <div className="pt-3 grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs text-slate-600 dark:text-slate-400 border-t border-slate-200/80 dark:border-slate-800/80">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>لعب فوري مجاناً 100%</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>متوافق تماماً مع الجوال</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>بيئة آمنة ومعتمدة للعائلة</span>
                </div>
              </div>
            </div>

            {/* Hero Black Showcase Box */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 p-6 text-white shadow-2xl border border-slate-800">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-pink-400" />
                    <span className="font-bold text-xs tracking-wider uppercase text-slate-200">
                      إبداعات استوديو حنان
                    </span>
                  </div>
                  <span className="text-[11px] bg-pink-500/20 text-pink-300 border border-pink-500/30 px-2.5 py-0.5 rounded-full font-bold">
                    مساحة نشطة ومباشرة
                  </span>
                </div>

                {/* Highlights List */}
                <div className="py-4 space-y-3">
                  <button
                    onClick={() => onNavigate('american-style-game')}
                    className="w-full p-3.5 rounded-2xl bg-gradient-to-r from-pink-950/60 to-rose-900/40 border border-pink-800/50 hover:border-pink-500/80 flex items-center justify-between text-start transition-all group cursor-pointer shadow-inner"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-10 h-10 rounded-xl bg-pink-500/30 text-pink-200 flex items-center justify-center text-xl shrink-0 group-hover:scale-110 transition-transform">
                        👑
                      </span>
                      <div>
                        <div className="font-bold text-xs text-white group-hover:text-pink-300 transition-colors">
                          العاب بنات استايل أمريكي 2026
                        </div>
                        <div className="text-[11px] text-slate-400">
                          أزياء، مكياج، وتنسيقات ملابس عصرية
                        </div>
                      </div>
                    </div>
                    <span className="text-xs text-pink-400 font-bold shrink-0 flex items-center gap-1">
                      العب الآن <Play className="w-3 h-3 fill-pink-400" />
                    </span>
                  </button>

                  <button
                    onClick={() => onNavigate('audio-to-video')}
                    className="w-full p-3.5 rounded-2xl bg-slate-800/50 border border-slate-700/60 hover:border-indigo-500/50 flex items-center justify-between text-start transition-all group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-300 flex items-center justify-center text-xl shrink-0 group-hover:scale-110 transition-transform">
                        🎬
                      </span>
                      <div>
                        <div className="font-bold text-xs text-white group-hover:text-indigo-300 transition-colors">
                          استوديو الفيديو والأمواج الصوتية
                        </div>
                        <div className="text-[11px] text-slate-400">
                          توليد فيديو رقمي بأمواج بصرية فوراً
                        </div>
                      </div>
                    </div>
                    <span className="text-xs text-indigo-400 font-bold shrink-0">جرّب ←</span>
                  </button>

                  <button
                    onClick={() => onNavigate('blog')}
                    className="w-full p-3.5 rounded-2xl bg-slate-800/50 border border-slate-700/60 hover:border-pink-500/50 flex items-center justify-between text-start transition-all group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-10 h-10 rounded-xl bg-pink-500/20 text-pink-300 flex items-center justify-center text-xl shrink-0 group-hover:scale-110 transition-transform">
                        📝
                      </span>
                      <div>
                        <div className="font-bold text-xs text-white group-hover:text-pink-300 transition-colors">
                          المكتبة التحريرية الشاملة
                        </div>
                        <div className="text-[11px] text-slate-400">
                          مقالات حصرية في الموضة والأناقة وستايل البنات
                        </div>
                      </div>
                    </div>
                    <span className="text-xs text-pink-400 font-bold shrink-0">اقرأ ←</span>
                  </button>
                </div>

                {/* Metrics */}
                <div className="pt-3 border-t border-slate-800 grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 rounded-xl bg-slate-800/40">
                    <div className="text-base font-black text-pink-400">2026</div>
                    <div className="text-[10px] text-slate-400">أحدث صيحات الموضة</div>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-800/40">
                    <div className="text-base font-black text-indigo-400">حصرية</div>
                    <div className="text-[10px] text-slate-400">مقالات الموضة</div>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-800/40">
                    <div className="text-base font-black text-emerald-400">100%</div>
                    <div className="text-[10px] text-slate-400">مجاني دائماً</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Direct Spotlight: American Style Girls Game 2026 (Connects directly under hero, NO GAP) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-pink-600 via-rose-600 to-amber-500 p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl text-center lg:text-start">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-black uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>حصرياً على استوديو حنان 2026</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black leading-tight">
                ألعاب تلبيس وتنسيق بنات ستايل أمريكي 2026
              </h2>
              <p className="text-xs sm:text-sm text-pink-100 leading-relaxed font-normal">
                عالم متكامل من أحدث صيحات الموضة الأمريكية العصرية: ستايل الستريت وير النيويوركي، أزياء حفلات التخرج والبروم، الإطلالات الرياضية الأنيقة (Athleisure)، ومكياج هوليوود المتألق. العبي مباشرة في متصفحك وشاركي تصاميمك المميزة!
              </p>
              
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-1 text-xs">
                <span className="flex items-center gap-1.5 bg-black/20 px-3 py-1 rounded-lg">
                  <Palette className="w-3.5 h-3.5 text-amber-300" />
                  <span>تنسيقات ملابس لا حصر لها</span>
                </span>
                <span className="flex items-center gap-1.5 bg-black/20 px-3 py-1 rounded-lg">
                  <Heart className="w-3.5 h-3.5 text-pink-300" />
                  <span>ألوان وقصات شعر عصرية</span>
                </span>
                <span className="flex items-center gap-1.5 bg-black/20 px-3 py-1 rounded-lg">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                  <span>بدون تنزيل أو إعلانات مزعجة</span>
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0 w-full sm:w-auto">
              <button
                onClick={() => onNavigate('american-style-game')}
                className="px-8 py-4 rounded-2xl bg-white text-rose-600 hover:bg-pink-50 font-black text-sm sm:text-base shadow-xl transition-all hover:scale-105 cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <span className="text-xl">👑</span>
                <span>ابدأ اللعب الآن مجاناً</span>
              </button>

              <button
                onClick={() => {
                  onSelectBlog('american-style-girls-game-2026-fashion-guide');
                  onNavigate('blog');
                }}
                className="px-6 py-3 rounded-2xl bg-black/20 hover:bg-black/30 text-white font-bold text-xs sm:text-sm border border-white/30 transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
              >
                <span>قراءة دليل تنسيق الأزياء</span>
                <ChevronRight className="w-4 h-4 rtl:rotate-180" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Dedicated Interactive Tools Hub */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-6 space-y-1.5">
          <div className="text-xs font-bold text-pink-600 dark:text-pink-400 uppercase tracking-widest">
            حزمة الأدوات التفاعلية الحصرية
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-sans">
            مركز الأدوات السحابية والتطبيقات المجانية
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            أدوات تفاعلية وتقنية تعمل مباشرة وسحابياً في متصفحك لخدمة المتابعين وصناع المحتوى.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          <button
            onClick={() => setActiveToolTab('video')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeToolTab === 'video'
                ? 'bg-pink-600 text-white shadow-md'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-pink-500'
            }`}
          >
            <span>🎬</span>
            <span>استوديو الصوت لفيديو</span>
          </button>

          <button
            onClick={() => setActiveToolTab('password')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeToolTab === 'password'
                ? 'bg-pink-600 text-white shadow-md'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-pink-500'
            }`}
          >
            <span>🔐</span>
            <span>مولد كلمات السر التشفيري</span>
          </button>

          <button
            onClick={() => setActiveToolTab('speed')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeToolTab === 'speed'
                ? 'bg-pink-600 text-white shadow-md'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-pink-500'
            }`}
          >
            <span>⚡</span>
            <span>فاحص سرعة الشبكة والـ CDN</span>
          </button>

          <button
            onClick={() => setActiveToolTab('wordle')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeToolTab === 'wordle'
                ? 'bg-pink-600 text-white shadow-md'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-pink-500'
            }`}
          >
            <span>🟩</span>
            <span>لعبة تخمين الكلمة العربية</span>
          </button>
        </div>

        {/* Tab Content */}
        <div>
          {activeToolTab === 'video' && (
            <div className="rounded-3xl bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 p-8 sm:p-12 text-white shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="space-y-4 max-w-2xl text-center lg:text-start">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-black tracking-wider uppercase">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>أداة مجانية 100% بدون تسجيل</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black leading-snug">
                  استوديو تحويل الصوتيات والتسجيلات إلى فيديو رقمي احترافي 🎬
                </h3>
                <p className="text-indigo-100 text-xs sm:text-sm leading-relaxed">
                  اصنع فيديوهات رقمية لمنصات التواصل (يوتيوب، تيك توك، بودكاست) مع موجات صوتية ملونة متحركة وصور غلاف مخصصة مباشرة من المتصفح بدون أي تعقيد.
                </p>
              </div>

              <button
                onClick={() => onNavigate('audio-to-video')}
                className="px-8 py-4 rounded-2xl bg-white text-indigo-900 hover:bg-slate-100 font-black text-sm sm:text-base shadow-xl transition-all hover:scale-105 cursor-pointer flex items-center gap-2 whitespace-nowrap"
              >
                <Video className="w-5 h-5 text-indigo-600" />
                <span>فتح استوديو الفيديو الآن</span>
              </button>
            </div>
          )}

          {activeToolTab === 'password' && (
            <React.Suspense fallback={<div className="h-48 animate-pulse bg-slate-100 dark:bg-slate-800 rounded-3xl" />}>
              <div id="password-generator-tool">
                <PasswordGeneratorWidget currentLang={currentLang} />
              </div>
            </React.Suspense>
          )}

          {activeToolTab === 'speed' && (
            <React.Suspense fallback={<div className="h-48 animate-pulse bg-slate-100 dark:bg-slate-800 rounded-3xl" />}>
              <SpeedTestWidget currentLang={currentLang} />
            </React.Suspense>
          )}

          {activeToolTab === 'wordle' && (
            <React.Suspense fallback={<div className="h-48 animate-pulse bg-slate-100 dark:bg-slate-800 rounded-3xl" />}>
              <div id="arabic-games-hub">
                <InteractiveGamesSection currentLang={currentLang} />
              </div>
            </React.Suspense>
          )}
        </div>
      </section>

      {/* 4. Google AdSense Compliant Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdSensePlacement currentLang={currentLang} format="auto" />
      </section>

      {/* 5. Curated Blog & Editorial Articles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-bold text-pink-600 dark:text-pink-400 uppercase tracking-widest mb-1">
              المعرفة والمحتوى الحصري
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-sans">
              أحدث المقالات والأدلة التحريرية
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              مقالات ودراسات حصرية أعدها فريقنا بشغف لتزويدكم بأفضل الأفكار في عالم الموضة وتنسيق الأزياء والويب الرقمي.
            </p>
          </div>
          <button
            onClick={() => onNavigate('blog')}
            className="self-start md:self-auto px-4 py-2 text-xs font-bold text-pink-600 dark:text-pink-400 hover:bg-pink-50 dark:hover:bg-pink-950/50 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>{t.btn_read_articles}</span>
            <ChevronRight className="w-4 h-4 rtl:rotate-180" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BLOG_POSTS.slice(0, 3).map(post => (
            <article
              key={post.id}
              onClick={() => {
                onSelectBlog(post.slug);
                onNavigate('blog');
              }}
              className="group cursor-pointer rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img
                    src={post.coverImage}
                    alt={post.title[currentLang] || post.title.en}
                    loading="lazy"
                    decoding="async"
                    width="400"
                    height="192"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-3 right-3 rtl:right-auto rtl:left-3 bg-slate-900/85 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-md">
                    {post.readTimeMin} {t.blog_read_time}
                  </span>
                </div>

                <div className="p-5 space-y-2">
                  <div className="text-[11px] font-bold text-pink-600 dark:text-pink-400 uppercase tracking-wider">
                    {post.category}
                  </div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white leading-snug group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors line-clamp-2">
                    {post.title[currentLang] || post.title.en}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {post.excerpt[currentLang] || post.excerpt.en}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-2 pt-3">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    loading="lazy"
                    decoding="async"
                    width="24"
                    height="24"
                    className="w-6 h-6 rounded-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <span className="text-slate-700 dark:text-slate-300 font-semibold truncate max-w-[140px]">{post.author.name}</span>
                </div>
                <div className="pt-3 text-[11px] text-slate-500 dark:text-slate-400">
                  <span>{post.publishDate}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 6. Why Choose Hanan Studio */}
      <section className="bg-slate-50/80 dark:bg-slate-900/60 py-12 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-sans">
              لماذا استوديو حنان الرقمي؟
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              نحرص في منصتنا على تقديم تجربة رقمية إبداعية، آمنة، وممتعة لكافة الزوار والمبدعين.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-xl bg-pink-50 dark:bg-pink-950/60 text-pink-600 dark:text-pink-400 flex items-center justify-center text-xl">
                👑
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                ألعاب تفاعلية فورية
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                ألعاب تلبيس بنات ستايل أمريكي 2026 وتحديات ذكاء تعمل فوراً في المتصفح بكل سلاسة بدون الحاجة لتثبيت أي برامج خارجية.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-xl">
                🎬
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                استوديو فيديو ذكي
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                استوديو لتحويل المقاطع الصوتية إلى فيديوهات بأمواج مرئية، فاحص سرعة الشبكة، ومولد كلمات المرور الآمنة.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xl">
                🛡️
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                أمان وخصوصية للعائلة
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                بيئة تصفح نظيفة ومناسبة لكافة أفراد العائلة، مع التزام تام بالخصوصية وامتثال كامل لمعايير GDPR و Google AdSense.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center text-xl">
                ✍️
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                مقالات موثوقة ومفيدة
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                مكتبة مقالات ثرية أعدها فريقنا المتخصص لنقل أحدث صيحات الموضة والستايل والجمال وألعاب البنات.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-sans">
            آراء زوار استوديو حنان
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            مشاركات وانطباعات زوار ومتابعي منصتنا وألعابنا التفاعلية
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((item, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(item.rating)].map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 italic leading-relaxed">
                  "{item.text[currentLang] || item.text.en}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="font-bold text-sm text-slate-900 dark:text-white">{item.name}</div>
                <div className="text-xs text-slate-500">{item.role[currentLang] || item.role.en}</div>
                <div className="text-[11px] text-pink-600 dark:text-pink-400 mt-0.5">{item.country}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Final High-Impact CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-pink-600 via-rose-600 to-purple-700 p-8 sm:p-12 text-white shadow-xl text-center space-y-4">
          <h2 className="text-2xl sm:text-4xl font-black">
            استمتع بأحدث ألعاب وتطبيقات استوديو حنان الرقمي
          </h2>
          <p className="text-xs sm:text-sm text-pink-100 max-w-xl mx-auto leading-relaxed">
            العب لعبة أزياء بنات ستايل أمريكي 2026، أنتج فيديوهات بأمواج صوتية عبر استوديو الفيديو، وتصفح مقالاتنا الحصرية مجاناً.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => onNavigate('american-style-game')}
              className="px-8 py-3.5 rounded-2xl bg-white text-rose-600 hover:bg-pink-50 font-black text-sm sm:text-base shadow-md transition-all hover:scale-105 cursor-pointer flex items-center gap-2"
            >
              <span>👑</span>
              <span>العب الآن مجاناً</span>
            </button>
            <button
              onClick={() => onNavigate('blog')}
              className="px-6 py-3.5 rounded-2xl bg-white/20 hover:bg-white/30 text-white font-bold text-sm border border-white/30 transition-all cursor-pointer"
            >
              تصفح المقالات التحريرية
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
