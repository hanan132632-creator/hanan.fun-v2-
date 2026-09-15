import React from 'react';
import { 
  Globe, 
  Zap, 
  ShieldCheck, 
  Server, 
  ArrowRight, 
  CheckCircle2, 
  Star, 
  Activity, 
  Clock, 
  Cpu, 
  Sparkles,
  ChevronRight,
  TrendingUp,
  Layers,
  Video,
  Award
} from 'lucide-react';
import { Language, Currency, ActivePage, ServiceItem, CartItem } from '../types';
import { TRANSLATIONS, CURRENCIES } from '../locales/translations';
import { GLOBAL_SERVICES, BLOG_POSTS, SERVER_NODES, TESTIMONIALS } from '../data/mockData';
import { SpeedTestWidget } from '../components/SpeedTestWidget';
import { AdSensePlacement } from '../components/AdSensePlacement';
import { InteractiveGamesSection } from '../components/InteractiveGamesSection';
import { PasswordGeneratorWidget } from '../components/PasswordGeneratorWidget';

interface HomePageProps {
  currentLang: Language;
  currentCurrency: Currency;
  onNavigate: (page: ActivePage) => void;
  onAddToCart: (service: ServiceItem) => void;
  onSelectBlog: (slug: string) => void;
  onOpenAiAssistant: () => void;
  onOpenAdSenseReport?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  currentLang,
  currentCurrency,
  onNavigate,
  onAddToCart,
  onSelectBlog,
  onOpenAiAssistant,
  onOpenAdSenseReport,
}) => {
  const t = TRANSLATIONS[currentLang];
  const currentCurrObj = CURRENCIES.find(c => c.code === currentCurrency) || CURRENCIES[0];

  const formatPrice = (usd: number) => {
    const converted = usd * currentCurrObj.rate;
    return `${currentCurrObj.symbol} ${converted.toFixed(2)}`;
  };

  return (
    <div className="space-y-16 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 bg-gradient-to-b from-blue-50/70 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Hero Text */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-start">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold shadow-xs">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
                <span>{t.hero_badge}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.15]">
                {t.hero_title_1}{' '}
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  {t.hero_title_accent}
                </span>{' '}
                <br className="hidden sm:block" />
                {t.hero_title_2}
              </h1>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                {t.hero_desc}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
                <button
                  id="home-hero-adsense-report-btn"
                  onClick={onOpenAdSenseReport}
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-700 text-white font-black text-sm shadow-lg shadow-amber-500/25 transition-all hover:scale-105 flex items-center gap-2"
                >
                  <Award className="w-4 h-4 text-amber-200" />
                  <span>{currentLang === 'ar' ? 'تقرير جوجل أدسنس للموقع 📊' : 'Google AdSense Report 📊'}</span>
                </button>

                <button
                  onClick={() => onNavigate('audio-to-video')}
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-black text-sm shadow-lg shadow-purple-500/25 transition-all hover:scale-105 flex items-center gap-2"
                >
                  <Video className="w-4 h-4 text-amber-300" />
                  <span>{currentLang === 'ar' ? 'استوديو الصوت لفيديو (مجاناً) 🎬' : 'Audio to Video Studio 🎬'}</span>
                </button>

                <button
                  onClick={() => onNavigate('store')}
                  className="px-5 py-3.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-bold text-sm border border-slate-200 dark:border-slate-700 shadow-sm transition-all flex items-center gap-2"
                >
                  <span>{t.btn_explore_store}</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </button>

                <button
                  onClick={onOpenAiAssistant}
                  className="px-4 py-3.5 rounded-xl text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 font-semibold text-sm transition-colors flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  <span>{t.btn_ask_ai}</span>
                </button>

                <button
                  onClick={() => onNavigate('blog')}
                  className="px-5 py-3.5 rounded-xl text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-semibold text-sm transition-colors"
                >
                  {t.btn_read_articles}
                </button>
              </div>

              {/* Mini Guarantees */}
              <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800/80">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>ضمان استرجاع 30 يوماً</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>تفعيل فوري خلال دقيقة</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>دعم فني هندسي 24/7</span>
                </div>
              </div>
            </div>

            {/* Hero Visual Card / Interactive Network Globe */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 p-6 text-white shadow-2xl border border-slate-800">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                    <span className="font-bold text-xs tracking-wider uppercase text-slate-300">
                      Global Network Mesh
                    </span>
                  </div>
                  <span className="text-[11px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-md font-mono">
                    Anycast BGP Active
                  </span>
                </div>

                {/* Node Status Grid */}
                <div className="py-5 space-y-3">
                  <div className="text-xs font-semibold text-slate-400">
                    أقرب خوادم التوجيه المباشرة (Active PoPs):
                  </div>
                  <div className="grid grid-cols-2 gap-2.5">
                    {SERVER_NODES.slice(0, 4).map(node => (
                      <div key={node.id} className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-base">{node.flag}</span>
                          <span className="font-bold text-slate-200">{node.city}</span>
                        </div>
                        <span className="text-xs font-mono font-bold text-emerald-400">{node.pingMs}ms</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Network Performance Metrics */}
                <div className="pt-4 border-t border-slate-800 grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 rounded-lg bg-slate-800/40">
                    <div className="text-base font-black text-blue-400">{t.hero_stat_uptime}</div>
                    <div className="text-[10px] text-slate-400">SLA Uptime</div>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-800/40">
                    <div className="text-base font-black text-emerald-400">{t.hero_stat_speed}</div>
                    <div className="text-[10px] text-slate-400">Avg Latency</div>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-800/40">
                    <div className="text-base font-black text-purple-400">180 Tbps</div>
                    <div className="text-[10px] text-slate-400">Backbone</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Google AdSense Placement 1 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdSensePlacement currentLang={currentLang} format="leaderboard" />
      </div>

      {/* Interactive Arabic Games & Wordle Hub */}
      <InteractiveGamesSection currentLang={currentLang} />

      {/* Audio to Video Feature Spotlight Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="relative z-10 max-w-2xl space-y-4 text-center lg:text-start">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-black tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>{currentLang === 'ar' ? 'أداة مجانية 100% بدون اشتراك' : '100% Free Creator Tool'}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-snug">
              {currentLang === 'ar' 
                ? 'حوّلي تسجيلاتك وصوتياتك إلى فيديو احترافي في ثوانٍ 🎬' 
                : 'Convert Any Audio into Engaging Video in Seconds 🎬'}
            </h2>
            <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
              {currentLang === 'ar' 
                ? 'اصنعي فيديوهات لليوتيوب وشورتس وتيك توك مع صورة الغلاف وموجات صوتية متحركة ملونة مباشرة من التابلت دون برامج معقدة.' 
                : 'Turn your voice notes, podcasts, and articles into YouTube & TikTok ready videos with animated waveform bars.'}
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={() => onNavigate('audio-to-video')}
              className="px-8 py-4 rounded-2xl bg-white text-indigo-900 hover:bg-slate-100 font-black text-base shadow-xl transition-all hover:scale-105 active:scale-95 flex items-center gap-2.5"
            >
              <Video className="w-5 h-5 text-indigo-600" />
              <span>{currentLang === 'ar' ? 'فتح استوديو الفيديو الآن' : 'Open Video Studio Now'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Featured Services Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-1">
              خدمات الويب والبنية التحتية
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              {t.sec_featured_services}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              {t.sec_featured_services_sub}
            </p>
          </div>
          <button
            onClick={() => onNavigate('store')}
            className="self-start md:self-auto px-4 py-2 text-xs font-bold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/50 rounded-lg transition-colors flex items-center gap-1"
          >
            <span>{t.btn_explore_store}</span>
            <ChevronRight className="w-4 h-4 rtl:rotate-180" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {GLOBAL_SERVICES.slice(0, 3).map(service => (
            <div
              key={service.id}
              className={`rounded-2xl p-6 bg-white dark:bg-slate-900 border transition-all hover:shadow-xl flex flex-col justify-between relative ${
                service.popular 
                  ? 'border-blue-500 dark:border-blue-500 ring-2 ring-blue-500/20' 
                  : 'border-slate-200 dark:border-slate-800'
              }`}
            >
              {service.badge && (
                <span className="absolute -top-3 right-6 rtl:right-auto rtl:left-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-sm">
                  {service.badge}
                </span>
              )}

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                    <Server className="w-6 h-6" />
                  </div>
                  <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{service.rating} ({service.reviewsCount})</span>
                  </div>
                </div>

                <div>
                  <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">
                    {service.name[currentLang] || service.name.en}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                    {service.shortDesc[currentLang] || service.shortDesc.en}
                  </p>
                </div>

                {/* Specs Box */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  {service.specs.slice(0, 4).map((spec, i) => (
                    <div key={i} className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50 text-xs">
                      <span className="text-slate-400 block text-[10px]">
                        {spec.label[currentLang] || spec.label.en}
                      </span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Key Features */}
                <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300 pt-2">
                  {(service.features[currentLang] || service.features.en).slice(0, 3).map((feat, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price & Action */}
              <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 block">السعر الأساسي:</span>
                  <div className="text-xl font-black text-slate-900 dark:text-white">
                    {formatPrice(service.basePriceUSD)}
                    <span className="text-xs font-normal text-slate-400">/{service.period === 'month' ? t.billing_monthly : 'سنة'}</span>
                  </div>
                </div>

                <button
                  onClick={() => onAddToCart(service)}
                  className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-all flex items-center gap-1.5"
                >
                  <span>{t.btn_add_to_cart}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Speed Test & Diagnostics Interactive Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SpeedTestWidget currentLang={currentLang} />
      </section>

      {/* Cyber Security Strong Password Generator Tool */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PasswordGeneratorWidget currentLang={currentLang} />
      </section>

      {/* Why Choose GIS Section */}
      <section className="bg-slate-100/70 dark:bg-slate-900/60 py-16 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              {t.sec_why_us}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
              بنية تحتية هندسية صلبة تضمن لك التفوق في تجربة المستخدم وتصدر محركات البحث
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-xl bg-red-50 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                {t.feat_ddos_title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {t.feat_ddos_desc}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                {t.feat_cdn_title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {t.feat_cdn_desc}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                {t.feat_support_title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {t.feat_support_desc}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                {t.feat_adsense_title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {t.feat_adsense_desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Blog Articles Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-1">
              المعرفة التقنية والربح من الويب
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              {t.sec_latest_blog}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              {t.sec_latest_blog_sub}
            </p>
          </div>
          <button
            onClick={() => onNavigate('blog')}
            className="self-start md:self-auto px-4 py-2 text-xs font-bold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/50 rounded-lg transition-colors flex items-center gap-1"
          >
            <span>{t.btn_read_articles}</span>
            <ChevronRight className="w-4 h-4 rtl:rotate-180" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BLOG_POSTS.map(post => (
            <article
              key={post.id}
              onClick={() => {
                onSelectBlog(post.slug);
                onNavigate('blog');
              }}
              className="group cursor-pointer rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.coverImage}
                    alt={post.title[currentLang] || post.title.en}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-3 right-3 rtl:right-auto rtl:left-3 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-md">
                    {post.readTimeMin} {t.blog_read_time}
                  </span>
                </div>

                <div className="p-5 space-y-2.5">
                  <div className="text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                    {post.category}
                  </div>
                  <h3 className="font-extrabold text-base text-slate-900 dark:text-white leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
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
                    className="w-6 h-6 rounded-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <span className="text-slate-700 dark:text-slate-300 font-semibold">{post.author.name}</span>
                </div>
                <span className="pt-3">{post.publishDate}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            {t.sec_testimonials}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            ثقة أكثر من 150,000 موقع وتطبيق عالمي في 180 دولة
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((item, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4"
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
                <div className="text-[11px] text-blue-600 dark:text-blue-400 mt-1">{item.country}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
