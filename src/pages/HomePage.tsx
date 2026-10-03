import React, { useState } from 'react';
import { 
  Globe, 
  Zap, 
  ShieldCheck, 
  Server, 
  ArrowRight, 
  CheckCircle2, 
  Star, 
  Clock, 
  Cpu, 
  Sparkles,
  ChevronRight,
  TrendingUp,
  Layout,
  Compass,
  Video,
  Search,
  Check,
  PhoneCall,
  Activity,
  Layers,
  Lock,
  Headphones
} from 'lucide-react';
import { Language, Currency, ActivePage, ServiceItem, CartItem } from '../types';
import { TRANSLATIONS, CURRENCIES } from '../locales/translations';
import { GLOBAL_SERVICES, BLOG_POSTS, SERVER_NODES, TESTIMONIALS } from '../data/mockData';
import { AdSensePlacement } from '../components/AdSensePlacement';

const SpeedTestWidget = React.lazy(() => import('../components/SpeedTestWidget').then(m => ({ default: m.SpeedTestWidget })));
const InteractiveGamesSection = React.lazy(() => import('../components/InteractiveGamesSection').then(m => ({ default: m.InteractiveGamesSection })));
const PasswordGeneratorWidget = React.lazy(() => import('../components/PasswordGeneratorWidget').then(m => ({ default: m.PasswordGeneratorWidget })));

interface HomePageProps {
  currentLang: Language;
  currentCurrency: Currency;
  onNavigate: (page: ActivePage) => void;
  onAddToCart: (service: ServiceItem) => void;
  onSelectBlog: (slug: string) => void;
  onOpenAiAssistant: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  currentLang,
  currentCurrency,
  onNavigate,
  onAddToCart,
  onSelectBlog,
  onOpenAiAssistant,
}) => {
  const t = TRANSLATIONS[currentLang];
  const currentCurrObj = CURRENCIES.find(c => c.code === currentCurrency) || CURRENCIES[0];

  const [activeServiceTab, setActiveServiceTab] = useState<string>('all');
  const [activeToolTab, setActiveToolTab] = useState<'video' | 'password' | 'speed' | 'wordle'>('video');

  // Domain Search state
  const [domainQuery, setDomainQuery] = useState('');
  const [domainExtension, setDomainExtension] = useState('.com');
  const [domainChecked, setDomainChecked] = useState(false);
  const [domainAvailable, setDomainAvailable] = useState(true);

  const formatPrice = (usd: number) => {
    const converted = usd * currentCurrObj.rate;
    return `${currentCurrObj.symbol} ${converted.toFixed(2)}`;
  };

  const handleDomainCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!domainQuery.trim()) return;
    const cleanDomain = domainQuery.trim().toLowerCase().replace(/^(https?:\/\/)?(www\.)?/, '').split('.')[0];
    setDomainChecked(true);
    // Deterministic simulation
    setDomainAvailable(cleanDomain.length > 3 && !['google', 'apple', 'meta', 'amazon', 'egypt', 'cairo'].includes(cleanDomain));
  };

  const domainPricing = [
    { tld: '.com', priceUSD: 12.99, tag: 'الأكثر شعبية' },
    { tld: '.net', priceUSD: 14.99, tag: 'للشبكات والتقنية' },
    { tld: '.org', priceUSD: 13.99, tag: 'للمنظمات والمنصات' },
    { tld: '.ai', priceUSD: 69.99, tag: 'للذكاء الاصطناعي' },
    { tld: '.sa', priceUSD: 39.99, tag: 'المملكة العربية السعودية' },
    { tld: '.eg', priceUSD: 24.99, tag: 'جمهورية مصر العربية' },
  ];

  const serviceCategories = [
    { id: 'all', label: currentLang === 'ar' ? 'جميع الخدمات' : 'All Services' },
    { id: 'web-design', label: currentLang === 'ar' ? 'تصميم المواقع والمتاجر' : 'Web & Store Design' },
    { id: 'cloud', label: currentLang === 'ar' ? 'الاستضافة والسيرفرات السحابية' : 'Cloud Hosting & VPS' },
    { id: 'domains', label: currentLang === 'ar' ? 'حجز وإدارة النطاقات' : 'Domain Management' },
    { id: 'marketing', label: currentLang === 'ar' ? 'التسويق الرقمي والسيو' : 'SEO & Digital Marketing' },
    { id: 'security', label: currentLang === 'ar' ? 'الأمن السيبراني والدعم' : 'Security & Support' },
  ];

  const filteredServices = activeServiceTab === 'all'
    ? GLOBAL_SERVICES
    : GLOBAL_SERVICES.filter(s => s.category === activeServiceTab);

  return (
    <div className="space-y-16 sm:space-y-24 pb-16 overflow-x-hidden">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-16 md:pt-16 md:pb-24 bg-gradient-to-b from-blue-50/60 via-slate-50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Hero Copy */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-start">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100/80 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300 text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                <span>{t.hero_badge}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.2] font-sans" style={{ textWrap: 'balance' }}>
                {t.hero_title_1}{' '}
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 bg-clip-text text-transparent">
                  {t.hero_title_accent}
                </span>{' '}
                <br className="hidden sm:block" />
                {t.hero_title_2}
              </h1>

              <p className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                منصة رقمية رائدة تقدم حلولاً هندسية شاملة: تصميم وتطوير المواقع والمتاجر، استضافة سحابية فائقة السرعة، حجز النطاقات العالمية، حملات التسويق الرقمي وتصدر محركات البحث، مع دعم فني هندسي 24/7.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
                <button
                  onClick={() => onNavigate('store')}
                  className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-all hover:scale-[1.02] flex items-center gap-2 cursor-pointer"
                >
                  <span>{t.btn_explore_store}</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </button>

                <button
                  onClick={() => onNavigate('contact')}
                  className="px-6 py-3.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-bold text-sm border border-slate-200 dark:border-slate-700 shadow-sm transition-all flex items-center gap-2 cursor-pointer"
                >
                  <PhoneCall className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span>{currentLang === 'ar' ? 'طلب استشارة مخصصة' : 'Book Tech Consultation'}</span>
                </button>

                <button
                  onClick={() => onNavigate('audio-to-video')}
                  className="px-5 py-3.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 hover:bg-indigo-100 text-indigo-700 dark:text-indigo-300 font-bold text-sm border border-indigo-200 dark:border-indigo-800 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Video className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span>{currentLang === 'ar' ? 'استوديو الفيديو 🎬' : 'Video Studio 🎬'}</span>
                </button>
              </div>

              {/* Trust Guarantees */}
              <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-slate-600 dark:text-slate-400 border-t border-slate-200/80 dark:border-slate-800/80">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>ضمان تشغيل 99.99% SLA</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>تفعيل سحابي فوري مؤتمت</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>دعم فني هندسي على مدار الساعة</span>
                </div>
              </div>
            </div>

            {/* Hero Live Infrastructure Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md rounded-2xl bg-slate-900 p-6 text-white shadow-2xl border border-slate-800">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                    <span className="font-bold text-xs tracking-wider uppercase text-slate-300">
                      Global Anycast Mesh
                    </span>
                  </div>
                  <span className="text-[11px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded font-mono">
                    240+ Edge Nodes
                  </span>
                </div>

                {/* Node Status Grid */}
                <div className="py-4 space-y-2.5">
                  <div className="text-xs font-semibold text-slate-400">
                    أقرب نقاط التوجيه السحابي (Live Edge PoPs):
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {SERVER_NODES.slice(0, 4).map(node => (
                      <div key={node.id} className="p-2.5 rounded-xl bg-slate-800/70 border border-slate-700/60 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-base">{node.flag}</span>
                          <span className="font-bold text-slate-200">{node.city}</span>
                        </div>
                        <span className="text-xs font-mono font-bold text-emerald-400">{node.pingMs}ms</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Metrics */}
                <div className="pt-4 border-t border-slate-800 grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 rounded-lg bg-slate-800/40">
                    <div className="text-base font-black text-blue-400">99.99%</div>
                    <div className="text-[10px] text-slate-400">SLA Uptime</div>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-800/40">
                    <div className="text-base font-black text-emerald-400">&lt; 15ms</div>
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

      {/* 2. Google AdSense Leaderboard Placement */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdSensePlacement currentLang={currentLang} format="leaderboard" />
      </div>

      {/* 3. The 5 Core Pillars: Comprehensive Services Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <div className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
            الحلول والخدمات الشاملة المتكاملة
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white font-sans">
            ركائز منظومة خدمات الإنترنت العالمية
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            نوفر لشركتك وموقعك الإلكتروني بنية تقنية وتسويقية متكاملة تضمن لك الأداء الأسرع والأمان المطلق.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-start sm:justify-center gap-1.5 p-1.5 bg-slate-100 dark:bg-slate-800/80 rounded-2xl overflow-x-auto max-w-4xl mx-auto mb-8">
          {serviceCategories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveServiceTab(cat.id)}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeServiceTab === cat.id
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map(service => (
            <div
              key={service.id}
              className={`rounded-2xl p-6 bg-white dark:bg-slate-900 border transition-all hover:shadow-lg flex flex-col justify-between relative ${
                service.popular 
                  ? 'border-blue-500/80 dark:border-blue-500/80 ring-2 ring-blue-500/20' 
                  : 'border-slate-200 dark:border-slate-800'
              }`}
            >
              {service.badge && (
                <span className="absolute -top-3 right-6 rtl:right-auto rtl:left-6 bg-blue-600 text-white text-[11px] font-bold px-3 py-0.5 rounded-full shadow-sm">
                  {service.badge}
                </span>
              )}

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                    {service.category === 'web-design' && <Layout className="w-6 h-6" />}
                    {service.category === 'marketing' && <TrendingUp className="w-6 h-6" />}
                    {service.category === 'cloud' && <Server className="w-6 h-6" />}
                    {service.category === 'domains' && <Compass className="w-6 h-6" />}
                    {service.category === 'security' && <ShieldCheck className="w-6 h-6" />}
                    {service.category === 'ai' && <Sparkles className="w-6 h-6" />}
                    {service.category === 'enterprise' && <Server className="w-6 h-6" />}
                  </div>
                  <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{service.rating} ({service.reviewsCount})</span>
                  </div>
                </div>

                <div>
                  <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white leading-snug">
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
                <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 pt-2">
                  {(service.features[currentLang] || service.features.en).slice(0, 3).map((feat, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span className="truncate">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price & Action */}
              <div className="pt-5 mt-5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
                <div>
                  <span className="text-[11px] text-slate-400 block">السعر:</span>
                  <div className="text-lg font-black text-slate-900 dark:text-white">
                    {formatPrice(service.basePriceUSD)}
                    <span className="text-xs font-normal text-slate-400">
                      /{service.period === 'month' ? t.billing_monthly : (service.period === 'year' ? 'سنة' : 'مرة واحدة')}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onAddToCart(service)}
                    className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-all cursor-pointer whitespace-nowrap"
                  >
                    <span>{t.btn_add_to_cart}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Interactive Domain Name Search Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 p-6 sm:p-10 text-white border border-slate-800 shadow-xl space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-500/30">
              <Compass className="w-3.5 h-3.5" />
              <span>فحص وتفعيل النطاقات العالمية فوري ومباشر 🌐</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black">
              ابحث عن اسم نطاقك التجاري وسجله في ثوانٍ
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              حماية خصوصية WHOIS مجانية مدى الحياة، إدارة سجلات DNS فائقة السرعة، وربط تلقائي بالاستضافة السحابية.
            </p>
          </div>

          {/* Search Form */}
          <form onSubmit={handleDomainCheck} className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={domainQuery}
                onChange={e => {
                  setDomainQuery(e.target.value);
                  setDomainChecked(false);
                }}
                placeholder="اكتب اسم الموقع المطلوب (مثلاً: mycompany)"
                className="w-full px-4 py-3 bg-slate-800/90 border border-slate-700 rounded-xl text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500 text-sm font-medium"
              />
            </div>
            <select
              value={domainExtension}
              onChange={e => {
                setDomainExtension(e.target.value);
                setDomainChecked(false);
              }}
              className="px-3 py-3 bg-slate-800/90 border border-slate-700 rounded-xl text-white text-sm font-bold focus:outline-none focus:border-blue-500"
            >
              <option value=".com">.com (شائع)</option>
              <option value=".net">.net</option>
              <option value=".org">.org</option>
              <option value=".ai">.ai (ذكاء اصطناعي)</option>
              <option value=".sa">.sa (السعودية)</option>
              <option value=".eg">.eg (مصر)</option>
            </select>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <Search className="w-4 h-4" />
              <span>فحص التوفر</span>
            </button>
          </form>

          {/* Domain Check Result */}
          {domainChecked && domainQuery.trim() && (
            <div className="max-w-2xl mx-auto p-4 rounded-xl bg-slate-800/80 border border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-3 animate-in fade-in">
              <div className="flex items-center gap-2">
                {domainAvailable ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                ) : (
                  <span className="text-amber-400 font-bold">⚠️</span>
                )}
                <div>
                  <span className="font-mono font-bold text-white text-sm">
                    {domainQuery.trim().toLowerCase().split('.')[0]}{domainExtension}
                  </span>
                  <span className="text-xs text-slate-300 block">
                    {domainAvailable ? 'متاح للتسجيل الفوري الآن!' : 'هذا النطاق محجوز مسبقاً، يمكنك اختيار لاحقة أخرى'}
                  </span>
                </div>
              </div>

              {domainAvailable && (
                <button
                  onClick={() => {
                    const domainService = GLOBAL_SERVICES.find(s => s.id === 'premium-dns-domain-hub');
                    if (domainService) onAddToCart(domainService);
                  }}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer"
                >
                  حجز النطاق فوراً
                </button>
              )}
            </div>
          )}

          {/* TLDs Pricing Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 pt-2 border-t border-slate-800">
            {domainPricing.map(item => (
              <div key={item.tld} className="p-2.5 rounded-xl bg-slate-800/50 border border-slate-700/60 text-center">
                <div className="font-mono font-black text-sm text-blue-400">{item.tld}</div>
                <div className="text-xs font-bold text-white mt-0.5">{formatPrice(item.priceUSD)}/سنة</div>
                <div className="text-[10px] text-slate-400 mt-0.5 truncate">{item.tag}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Dedicated Interactive Tools Hub (Tabbed & Seamless) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8 space-y-2">
          <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
            حزمة الأدوات التفاعلية الحصرية
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-sans">
            مركز الأدوات السحابية والتطبيقات المجانية
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            أدوات تقنية وتفاعلية تعمل مباشرة وسحابياً في متصفحك لخدمة أصحاب المواقع وصناع المحتوى.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          <button
            onClick={() => setActiveToolTab('video')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeToolTab === 'video'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-blue-500'
            }`}
          >
            <span>🎬</span>
            <span>استوديو الصوت لفيديو</span>
          </button>

          <button
            onClick={() => setActiveToolTab('password')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeToolTab === 'password'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-blue-500'
            }`}
          >
            <span>🔐</span>
            <span>مولد كلمات السر التشفيري</span>
          </button>

          <button
            onClick={() => setActiveToolTab('speed')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeToolTab === 'speed'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-blue-500'
            }`}
          >
            <span>⚡</span>
            <span>فاحص سرعة الشبكة والـ CDN</span>
          </button>

          <button
            onClick={() => setActiveToolTab('wordle')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeToolTab === 'wordle'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-blue-500'
            }`}
          >
            <span>🟩</span>
            <span>لعبة تخمين الكلمة العربية</span>
          </button>
        </div>

        {/* Tab Content */}
        <div>
          {activeToolTab === 'video' && (
            <div className="rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 p-8 sm:p-12 text-white shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="space-y-4 max-w-2xl text-center lg:text-start">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-black tracking-wider uppercase">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>أداة مجانية 100% بدون اشتراك</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black leading-snug">
                  استوديو تحويل الصوتيات والتسجيلات إلى فيديو رقمي احترافي 🎬
                </h3>
                <p className="text-blue-100 text-xs sm:text-sm leading-relaxed">
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
            <React.Suspense fallback={<div className="h-64 animate-pulse bg-slate-100 dark:bg-slate-800 rounded-3xl" />}>
              <div id="password-generator-tool">
                <PasswordGeneratorWidget currentLang={currentLang} />
              </div>
            </React.Suspense>
          )}

          {activeToolTab === 'speed' && (
            <React.Suspense fallback={<div className="h-64 animate-pulse bg-slate-100 dark:bg-slate-800 rounded-3xl" />}>
              <SpeedTestWidget currentLang={currentLang} />
            </React.Suspense>
          )}

          {activeToolTab === 'wordle' && (
            <React.Suspense fallback={<div className="h-64 animate-pulse bg-slate-100 dark:bg-slate-800 rounded-3xl" />}>
              <div id="arabic-games-hub">
                <InteractiveGamesSection currentLang={currentLang} />
              </div>
            </React.Suspense>
          )}
        </div>
      </section>

      {/* 6. Why Choose GIS: Enterprise Architecture */}
      <section className="bg-slate-100/80 dark:bg-slate-900/60 py-16 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-sans">
              {t.sec_why_us}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              بنية تحتية هندسية صلبة تضمن لك التفوق في سرعة التحميل وتصدر محركات البحث
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

      {/* 7. Curated Blog & Editorial Articles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-1">
              المعرفة التقنية والربح من الويب
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-sans">
              {t.sec_latest_blog}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              مقالات ودراسات تحريرية موثقة وفق أعلى معايير E-E-A-T وجودة المحتوى.
            </p>
          </div>
          <button
            onClick={() => onNavigate('blog')}
            className="self-start md:self-auto px-4 py-2 text-xs font-bold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/50 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
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
              className="group cursor-pointer rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
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
                  <div className="text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                    {post.category}
                  </div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
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

      {/* 8. Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-sans">
            {t.sec_testimonials}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
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
                <div className="text-[11px] text-blue-600 dark:text-blue-400 mt-0.5">{item.country}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. Final High-Impact CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-800 p-8 sm:p-12 text-white shadow-xl text-center space-y-4">
          <h2 className="text-2xl sm:text-4xl font-black">
            جاهز لإطلاق موقعك وتطوير أعمالك الرقمية؟
          </h2>
          <p className="text-xs sm:text-sm text-blue-100 max-w-xl mx-auto leading-relaxed">
            فريقنا الهندسي مستعد لتصميم موقعك، حجز الدومين، تجهيز الاستضافة السحابية، وتقديم خطة تسويقية شاملة.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => onNavigate('contact')}
              className="px-6 py-3.5 rounded-xl bg-white text-blue-900 hover:bg-slate-100 font-bold text-sm shadow-md transition-all cursor-pointer"
            >
              تواصل مع مهندسنا المختص الآن
            </button>
            <button
              onClick={() => onNavigate('store')}
              className="px-6 py-3.5 rounded-xl bg-blue-700/80 hover:bg-blue-700 text-white font-bold text-sm border border-blue-400/40 transition-all cursor-pointer"
            >
              استعراض كافة باقات الخدمات
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
