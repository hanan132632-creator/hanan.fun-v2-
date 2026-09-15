import React, { useState } from 'react';
import { 
  Server, 
  ShieldCheck, 
  Globe, 
  Cpu, 
  Search, 
  Filter, 
  CheckCircle2, 
  Star, 
  ShoppingBag, 
  Zap, 
  HelpCircle,
  X,
  Layers,
  HardDrive,
  Activity
} from 'lucide-react';
import { Language, Currency, ServiceItem } from '../types';
import { TRANSLATIONS, CURRENCIES } from '../locales/translations';
import { GLOBAL_SERVICES } from '../data/mockData';
import { AdSensePlacement } from '../components/AdSensePlacement';

interface StorePageProps {
  currentLang: Language;
  currentCurrency: Currency;
  onAddToCart: (service: ServiceItem, billingCycle?: 'monthly' | 'annually') => void;
}

export const StorePage: React.FC<StorePageProps> = ({
  currentLang,
  currentCurrency,
  onAddToCart,
}) => {
  const t = TRANSLATIONS[currentLang];
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annually'>('monthly');
  const [selectedServiceForModal, setSelectedServiceForModal] = useState<ServiceItem | null>(null);

  const currentCurrObj = CURRENCIES.find(c => c.code === currentCurrency) || CURRENCIES[0];

  const categories = [
    { id: 'all', label: 'جميع الخدمات (All Services)' },
    { id: 'hosting', label: 'استضافة وسيرفرات (Cloud VPS)' },
    { id: 'security', label: 'الأمان السيبراني (Zero Trust)' },
    { id: 'cdn', label: 'تسريع المحتوى (Global CDN)' },
    { id: 'domain', label: 'النطاقات و DNS (Anycast DNS)' },
    { id: 'ai', label: 'الذكاء الاصطناعي (AI Gateway)' },
  ];

  const filteredServices = GLOBAL_SERVICES.filter(service => {
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    const name = (service.name[currentLang] || service.name.en).toLowerCase();
    const desc = (service.shortDesc[currentLang] || service.shortDesc.en).toLowerCase();
    const query = searchQuery.toLowerCase();
    const matchesSearch = name.includes(query) || desc.includes(query);
    return matchesCategory && matchesSearch;
  });

  const formatPrice = (usd: number) => {
    const multiplier = billingCycle === 'annually' ? 12 * 0.8 : 1;
    const converted = usd * multiplier * currentCurrObj.rate;
    return `${currentCurrObj.symbol} ${converted.toFixed(2)}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 text-xs font-bold">
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>المتجر الرقمي لخدمات الويب والسيرفرات</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
          {t.store_title}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
          {t.store_desc}
        </p>

        {/* Billing Cycle Switch */}
        <div className="pt-4 flex items-center justify-center gap-3 text-xs font-bold">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-4 py-2 rounded-xl transition-all ${
              billingCycle === 'monthly'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            {t.billing_monthly}
          </button>
          <button
            onClick={() => setBillingCycle('annually')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
              billingCycle === 'annually'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            <span>{t.billing_annually}</span>
            <span className="bg-amber-400 text-slate-900 text-[10px] font-black px-1.5 py-0.5 rounded-md">
              وفر 20%
            </span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 rtl:left-auto rtl:right-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="بحث في الخدمات..."
            className="w-full pl-9 pr-4 rtl:pl-4 rtl:pr-9 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map(service => (
          <div
            key={service.id}
            className={`rounded-2xl p-6 bg-white dark:bg-slate-900 border flex flex-col justify-between transition-all hover:shadow-xl relative ${
              service.popular 
                ? 'border-blue-500 ring-2 ring-blue-500/20' 
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

              {/* Specs Grid */}
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

              {/* Features List */}
              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300 pt-2">
                {(service.features[currentLang] || service.features.en).map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bottom pricing and Actions */}
            <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-400 block">
                    {billingCycle === 'annually' ? 'سعر الاشتراك السنوي (شامل الخصم):' : 'سعر الاشتراك الشهري:'}
                  </span>
                  <div className="text-xl font-black text-slate-900 dark:text-white">
                    {formatPrice(service.basePriceUSD)}
                    <span className="text-xs font-normal text-slate-400">/{billingCycle === 'annually' ? 'سنة' : 'شهر'}</span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedServiceForModal(service)}
                  className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                >
                  التفاصيل الهندسية
                </button>
              </div>

              <button
                onClick={() => onAddToCart(service, billingCycle)}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition-all shadow-sm flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{t.btn_add_to_cart}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* AdSense Unit in Store */}
      <AdSensePlacement currentLang={currentLang} format="leaderboard" />

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

            {/* Hardware & Spec highlights */}
            <div className="space-y-2">
              <h4 className="font-bold text-xs text-slate-800 dark:text-slate-200">
                المواصفات التقنية ومعايير التشغيل (Hardware SLA):
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {selectedServiceForModal.specs.map((spec, i) => (
                  <div key={i} className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <span className="text-[10px] text-slate-400 block">{spec.label[currentLang] || spec.label.en}</span>
                    <span className="font-bold text-slate-900 dark:text-white">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Datacenter locations */}
            <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60 text-xs text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <Globe className="w-4 h-4 text-blue-600 shrink-0" />
              <span>متاح للاختيار الفوري في مراكز بيانات: الرياض، فرانكفورت، لندن، نيويورك، وسنغافورة.</span>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 block">السعر:</span>
                <span className="font-black text-lg text-slate-900 dark:text-white">
                  {formatPrice(selectedServiceForModal.basePriceUSD)}
                </span>
              </div>
              <button
                onClick={() => {
                  onAddToCart(selectedServiceForModal, billingCycle);
                  setSelectedServiceForModal(null);
                }}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-all shadow-sm"
              >
                إضافة للسلة وتفعيل الخطة
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
