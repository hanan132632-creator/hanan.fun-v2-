import React, { useState } from 'react';
import {
  Server,
  Globe,
  Search,
  CheckCircle2,
  Star,
  ShoppingBag,
  X,
  BookOpen,
  Download,
  ExternalLink,
  Mail,
  FileText,
} from 'lucide-react';
import { Language, Currency, ServiceItem } from '../types';
import { TRANSLATIONS, CURRENCIES } from '../locales/translations';
import { GLOBAL_SERVICES } from '../data/mockData';
import {
  DIGITAL_PRODUCTS,
  DigitalProduct,
  FREE_PRELAUNCH_CHECKLIST_AR,
  FREE_PRELAUNCH_CHECKLIST_EN,
} from '../data/digitalProducts';
import { AdSensePlacement } from '../components/AdSensePlacement';
import { isInsideAndroidApp } from '../utils/appEnvironment';

interface StorePageProps {
  currentLang: Language;
  currentCurrency: Currency;
  onAddToCart: (service: ServiceItem, billingCycle?: 'monthly' | 'annually') => void;
  cartCount?: number;
  onOpenCart?: () => void;
}

export const StorePage: React.FC<StorePageProps> = ({
  currentLang,
  currentCurrency,
  onAddToCart,
  cartCount = 0,
  onOpenCart,
}) => {
  const t = TRANSLATIONS[currentLang];
  const isAr = currentLang === 'ar';
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annually'>('monthly');
  const [selectedServiceForModal, setSelectedServiceForModal] = useState<ServiceItem | null>(null);
  const [selectedProductForModal, setSelectedProductForModal] = useState<DigitalProduct | null>(null);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const [downloadedChecklist, setDownloadedChecklist] = useState(false);
  const isAndroidApp = isInsideAndroidApp();

  const currentCurrObj = CURRENCIES.find(c => c.code === currentCurrency) || CURRENCIES[0];

  const categories = [
    { id: 'all', label: isAr ? 'جميع الخدمات' : 'All Services' },
    { id: 'web-design', label: isAr ? 'تصميم المواقع والمتاجر' : 'Web & Store Design' },
    { id: 'cloud', label: isAr ? 'الأدوات السحابية' : 'Digital Cloud Tools' },
    { id: 'domains', label: isAr ? 'حلول التطوير' : 'Web Dev Solutions' },
    { id: 'marketing', label: isAr ? 'التسويق والسيو' : 'SEO & Marketing' },
    { id: 'security', label: isAr ? 'الأمن السيبراني' : 'Cyber Security' },
    { id: 'ai', label: isAr ? 'البرمجيات والنظم' : 'Advanced Systems' },
  ];

  const filteredServices = GLOBAL_SERVICES.filter(service => {
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    const name = (service.name[currentLang] || service.name.en).toLowerCase();
    const desc = (service.shortDesc[currentLang] || service.shortDesc.en).toLowerCase();
    const query = searchQuery.toLowerCase();
    const matchesSearch = name.includes(query) || desc.includes(query);
    return matchesCategory && matchesSearch;
  });

  const formatPrice = (usd: number, period: 'month' | 'year' | 'one-time' = 'month') => {
    if (usd === 0) return isAr ? 'استشارة مجانية' : 'Free Quote';
    const multiplier = period === 'one-time' ? 1 : billingCycle === 'annually' ? 12 * 0.8 : 1;
    const converted = usd * multiplier * currentCurrObj.rate;
    return `${currentCurrObj.symbol} ${converted.toFixed(2)}`;
  };

  const handleDownloadFreeChecklist = () => {
    const content = isAr ? FREE_PRELAUNCH_CHECKLIST_AR : FREE_PRELAUNCH_CHECKLIST_EN;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = isAr ? 'gis-prelaunch-checklist-ar.txt' : 'gis-prelaunch-checklist-en.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setDownloadedChecklist(true);
    setTimeout(() => setDownloadedChecklist(false), 3500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-14">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <p className="text-xs font-semibold text-blue-600 dark:text-cyan-400">
          {isAr
            ? 'المنتجات الرقمية · الأدلة الهندسية · الخدمات التقنية'
            : 'Digital Toolkits · Technical Guides · Cloud Services'}
        </p>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white text-balance">
          {isAr ? 'المنتجات الرقمية والخدمات التقنية' : t.store_title}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          {isAr
            ? 'أدلة عملية وقوالب تقنية جاهزة للتحميل المباشر، إلى جانب خدمات تهيئة المواقع والسيو والبنية السحابية.'
            : t.store_desc}
        </p>

        {cartCount > 0 && onOpenCart && (
          <div className="pt-2">
            <button
              onClick={onOpenCart}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>
                {isAr ? `عرض سلة الطلبات (${cartCount})` : `View Order Cart (${cartCount})`}
              </span>
            </button>
          </div>
        )}
      </div>

      {/* SECTION 1: DIGITAL PRODUCTS & TOOLKITS */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="space-y-1">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">
              {isAr ? 'أدلة وقوالب رقمية جاهزة' : 'Digital Playbooks & Ready Kits'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              {isAndroidApp
                ? isAr
                  ? 'فهرس استعراضي للأدلة الهندسية ومحتوياتها وموارد التحضير المجانية.'
                  : 'Reference overview of our technical playbooks and free compliance checklist.'
                : isAr
                ? 'دفع آمن مباشرة عبر PayPal وتُسلم الملفات رقمياً إلى بريدك الإلكتروني.'
                : 'Secure one-time PayPal checkout with direct digital delivery to your email.'}
            </p>
          </div>
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 whitespace-nowrap">
            {isAndroidApp
              ? isAr
                ? 'نسخة استعراض المحتوى'
                : 'Reference Preview'
              : isAr
              ? 'دفع آمن عبر PayPal'
              : 'PayPal Verified Checkout'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DIGITAL_PRODUCTS.map(product => (
            <article
              key={product.id}
              id={product.id}
              className="scroll-mt-24 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col justify-between transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div>
                {/* 4:3 Product Cover */}
                <div className="aspect-[4/3] w-full bg-slate-100 dark:bg-slate-800 overflow-hidden relative">
                  {!failedImages[product.id] ? (
                    <img
                      src={product.coverImage}
                      alt={product.name[currentLang] || product.name.en}
                      referrerPolicy="no-referrer"
                      onError={() =>
                        setFailedImages(prev => ({ ...prev, [product.id]: true }))
                      }
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100 dark:bg-slate-800 p-6 text-center gap-2">
                      <BookOpen className="w-8 h-8 text-blue-600 dark:text-cyan-400" />
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
                        {product.name[currentLang] || product.name.en}
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-6 space-y-3">
                  {/* Quiet unboxed metadata */}
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <span>{product.formatLabel[currentLang] || product.formatLabel.en}</span>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums">{product.pagesOrFilesCount}</span>
                  </div>

                  <h3 className="text-lg font-extrabold text-slate-900 dark:text-white leading-snug">
                    {product.name[currentLang] || product.name.en}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {product.shortDesc[currentLang] || product.shortDesc.en}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-slate-400 block">
                      {isAr ? 'سعر الحزمة (دفعة واحدة):' : 'One-time price:'}
                    </span>
                    <span className="text-xl font-black text-slate-900 dark:text-white tabular-nums">
                      {formatPrice(product.basePriceUSD, 'one-time')}
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedProductForModal(product)}
                    className="text-xs font-semibold text-blue-600 dark:text-cyan-400 hover:underline whitespace-nowrap"
                  >
                    {isAr ? 'محتويات الحزمة' : 'View Contents'}
                  </button>
                </div>

                {isAndroidApp ? (
                  <button
                    onClick={() => setSelectedProductForModal(product)}
                    className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-2"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>{isAr ? 'استعراض محتويات الدليل' : 'Preview Guide Contents'}</span>
                  </button>
                ) : product.externalCheckoutUrl ? (
                  <div className="space-y-2">
                    <a
                      href={product.externalCheckoutUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 px-4 bg-[#0070ba] hover:bg-[#005ea6] text-white font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-2"
                    >
                      <span>
                        {isAr
                          ? `شراء الآن عبر PayPal ($${product.basePriceUSD})`
                          : `Buy with PayPal ($${product.basePriceUSD})`}
                      </span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <button
                      onClick={() => onAddToCart(product, 'monthly')}
                      className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-2"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>{isAr ? 'أو أضف للسلة مع طلبات أخرى' : 'Or Add to Cart'}</span>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => onAddToCart(product, 'monthly')}
                    className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>{isAr ? 'أضف الحزمة للسلة' : 'Add Toolkit to Cart'}</span>
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* Free Working Downloadable Resource */}
        <div
          id="free-checklist"
          className="scroll-mt-24 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6"
        >
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
              <FileText className="w-4 h-4" />
              <span>{isAr ? 'مورد مجاني للزوار · تحميل مباشر' : 'Free Resource · Direct Download'}</span>
            </div>
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
              {isAr
                ? 'قائمة الفحص المجانية قبل إطلاق موقعك وتقديمه لـ Google'
                : 'Free Pre-Launch Website & Google Compliance Checklist'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {isAr
                ? 'ملف عملي منسق تقدر تحفظه على جهازك الآن لمراجعة الأمان والسيو وصفحات السياسات مجاناً.'
                : 'Save our structured checklist to audit SSL, sitemaps, policy pages, and content readiness for free.'}
            </p>
          </div>
          <button
            onClick={handleDownloadFreeChecklist}
            className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 whitespace-nowrap shrink-0"
          >
            <Download className="w-4 h-4" />
            <span>
              {downloadedChecklist
                ? isAr
                  ? 'تم بدء التحميل'
                  : 'Download Started'
                : isAr
                ? 'تحميل القائمة مجاناً (.txt)'
                : 'Download Free Checklist'}
            </span>
          </button>
        </div>
      </section>

      {/* SECTION 2: CLOUD & TECHNICAL SERVICES */}
      <section className="space-y-6 pt-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="space-y-1">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">
              {isAr ? 'الخدمات الهندسية والاستشارات السحابية' : 'Cloud & Engineering Services'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              {isAr
                ? 'خدمات مخصصة لتجهيز المواقع، تحسين السرعة والسيو، وإدارة البنية التحتية.'
                : 'Tailored implementation packages for web architecture, SEO, and managed infrastructure.'}
            </p>
          </div>

          {/* Billing Cycle Switch */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-bold self-start md:self-auto">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-3.5 py-2 rounded-lg transition-colors whitespace-nowrap ${
                billingCycle === 'monthly'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              {t.billing_monthly}
            </button>
            <button
              onClick={() => setBillingCycle('annually')}
              className={`px-3.5 py-2 rounded-lg transition-colors whitespace-nowrap ${
                billingCycle === 'annually'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              {t.billing_annually} · {isAr ? 'وفر 20%' : 'Save 20%'}
            </button>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 rtl:left-auto rtl:right-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={isAr ? 'بحث في الخدمات...' : 'Search services...'}
              className="w-full pl-9 pr-4 rtl:pl-4 rtl:pr-9 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map(service => (
            <div
              key={service.id}
              className={`rounded-2xl p-6 bg-white dark:bg-slate-900 border flex flex-col justify-between transition-shadow hover:shadow-lg ${
                service.popular
                  ? 'border-blue-500 dark:border-blue-500'
                  : 'border-slate-200 dark:border-slate-800'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                    <Server className="w-5 h-5" />
                  </div>
                  <div className="flex items-center gap-1 text-xs font-bold text-amber-500 tabular-nums">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>
                      {service.rating} ({service.reviewsCount})
                    </span>
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

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  {service.specs.map((spec, idx) => (
                    <div key={idx} className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50 text-xs">
                      <span className="text-slate-400 block text-[10px]">
                        {spec.label[currentLang] || spec.label.en}
                      </span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>

                <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300 pt-2">
                  {(service.features[currentLang] || service.features.en).map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-slate-400 block">
                      {service.basePriceUSD === 0
                        ? isAr
                          ? 'تسعير مخصص حسب الطلب:'
                          : 'Custom quote:'
                        : service.period === 'one-time'
                        ? isAr
                          ? 'تكلفة لمرة واحدة:'
                          : 'One-time fee:'
                        : billingCycle === 'annually'
                        ? isAr
                          ? 'الاشتراك السنوي:'
                          : 'Annual rate:'
                        : isAr
                        ? 'الاشتراك الشهري:'
                        : 'Monthly rate:'}
                    </span>
                    <div className="text-xl font-black text-slate-900 dark:text-white tabular-nums">
                      {formatPrice(service.basePriceUSD, service.period)}
                      {service.basePriceUSD > 0 && service.period !== 'one-time' && (
                        <span className="text-xs font-normal text-slate-400">
                          /{billingCycle === 'annually' ? (isAr ? 'سنة' : 'yr') : isAr ? 'شهر' : 'mo'}
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedServiceForModal(service)}
                    className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {isAr ? 'التفاصيل' : 'Details'}
                  </button>
                </div>

                <button
                  onClick={() => onAddToCart(service, billingCycle)}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{t.btn_add_to_cart}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Transparent Partnerships / Sponsored Reviews Box */}
      <section className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1.5 max-w-2xl">
          <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
            {isAr
              ? 'شراكات المحتوى والمراجعات التقنية الموثقة'
              : 'Editorial Partnerships & Sponsored Tech Reviews'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {isAr
              ? 'نستقبل طلبات المراجعات التقنية الموضوعية أو الرعاية الإعلانية المباشرة لخدمات الاستضافة والسيرفرات وأدوات المطورين مع التزام كامل بالإفصاح التحريري.'
              : 'We collaborate with cloud, hosting, and security providers on transparent technical reviews and direct placements.'}
          </p>
        </div>
        <a
          href="mailto:support@hanan.fun?subject=Partnership%20Inquiry%20-%20GIS%20Network"
          className="px-5 py-3 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100 font-bold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 whitespace-nowrap shrink-0"
        >
          <Mail className="w-4 h-4" />
          <span>support@hanan.fun</span>
        </a>
      </section>

      {/* AdSense Unit */}
      <AdSensePlacement currentLang={currentLang} format="leaderboard" />

      {/* Digital Product Contents Modal */}
      {selectedProductForModal && (
        <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-4">
          <div
            onClick={() => setSelectedProductForModal(null)}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs"
          />
          <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 z-10 max-h-[90vh] overflow-y-auto space-y-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-xs font-semibold text-blue-600 dark:text-cyan-400">
                  {selectedProductForModal.formatLabel[currentLang] || selectedProductForModal.formatLabel.en}
                </span>
                <h3 className="text-xl font-black text-slate-900 dark:text-white mt-1">
                  {selectedProductForModal.name[currentLang] || selectedProductForModal.name.en}
                </h3>
              </div>
              <button
                onClick={() => setSelectedProductForModal(null)}
                className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                aria-label={isAr ? 'إغلاق' : 'Close'}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {selectedProductForModal.fullDesc[currentLang] || selectedProductForModal.fullDesc.en}
            </p>

            <div className="space-y-2.5">
              <h4 className="font-bold text-xs text-slate-800 dark:text-slate-200">
                {isAr ? 'ماذا ستستلم داخل الحزمة:' : 'What is included:'}
              </h4>
              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                {(isAr ? selectedProductForModal.includedItems.ar : selectedProductForModal.includedItems.en).map(
                  (item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  )
                )}
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-xs text-slate-400 block">{isAr ? 'السعر:' : 'Price:'}</span>
                <span className="font-black text-lg text-slate-900 dark:text-white tabular-nums">
                  {formatPrice(selectedProductForModal.basePriceUSD, 'one-time')}
                </span>
              </div>
              {isAndroidApp ? (
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {isAr
                    ? 'عرض معلوماتي فقط داخل تطبيق أندرويد.'
                    : 'Informational preview inside Android app.'}
                </span>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      onAddToCart(selectedProductForModal, 'monthly');
                      setSelectedProductForModal(null);
                    }}
                    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 font-bold text-xs rounded-xl transition-colors"
                  >
                    {isAr ? 'أضف للسلة' : 'Add to Cart'}
                  </button>
                  {selectedProductForModal.externalCheckoutUrl && (
                    <a
                      href={selectedProductForModal.externalCheckoutUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 bg-[#0070ba] hover:bg-[#005ea6] text-white font-bold text-xs rounded-xl transition-colors inline-flex items-center gap-1.5"
                    >
                      <span>
                        {isAr
                          ? `شراء عبر PayPal ($${selectedProductForModal.basePriceUSD})`
                          : `PayPal ($${selectedProductForModal.basePriceUSD})`}
                      </span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Service Detail Modal */}
      {selectedServiceForModal && (
        <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-4">
          <div
            onClick={() => setSelectedServiceForModal(null)}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs"
          />
          <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 z-10 max-h-[90vh] overflow-y-auto space-y-5">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase">GIS Cloud Infrastructure</span>
                <h3 className="text-xl font-black text-slate-900 dark:text-white mt-1">
                  {selectedServiceForModal.name[currentLang] || selectedServiceForModal.name.en}
                </h3>
              </div>
              <button
                onClick={() => setSelectedServiceForModal(null)}
                className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {selectedServiceForModal.fullDesc[currentLang] || selectedServiceForModal.fullDesc.en}
            </p>

            <div className="space-y-2">
              <h4 className="font-bold text-xs text-slate-800 dark:text-slate-200">
                {isAr ? 'المواصفات ومعايير التنفيذ:' : 'Technical Specifications:'}
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {selectedServiceForModal.specs.map((spec, i) => (
                  <div
                    key={i}
                    className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                  >
                    <span className="text-[10px] text-slate-400 block">
                      {spec.label[currentLang] || spec.label.en}
                    </span>
                    <span className="font-bold text-slate-900 dark:text-white">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60 text-xs text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <Globe className="w-4 h-4 text-blue-600 shrink-0" />
              <span>
                {isAr
                  ? 'خدمة واستشارة تقنية عن بُعد عبر البريد الرسمي support@hanan.fun.'
                  : 'Remote implementation & technical support via support@hanan.fun.'}
              </span>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 block">{isAr ? 'السعر:' : 'Price:'}</span>
                <span className="font-black text-lg text-slate-900 dark:text-white tabular-nums">
                  {formatPrice(selectedServiceForModal.basePriceUSD, selectedServiceForModal.period)}
                </span>
              </div>
              <button
                onClick={() => {
                  onAddToCart(selectedServiceForModal, billingCycle);
                  setSelectedServiceForModal(null);
                }}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-colors"
              >
                {isAr ? 'إضافة للسلة' : 'Add to Cart'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
