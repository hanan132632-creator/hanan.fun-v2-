import React, { useState } from 'react';
import { 
  Globe, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  Lock, 
  Server, 
  Award,
  ChevronRight,
  PhoneCall,
  Mail,
  MapPin
} from 'lucide-react';
import { Language, ActivePage } from '../types';
import { TRANSLATIONS } from '../locales/translations';

interface FooterProps {
  currentLang: Language;
  onNavigate: (page: ActivePage) => void;
}

export const Footer: React.FC<FooterProps> = ({ currentLang, onNavigate }) => {
  const t = TRANSLATIONS[currentLang];
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 transition-colors duration-200">
      {/* Upper Footer Highlight Bar */}
      <div className="border-b border-slate-800 py-6 px-4 sm:px-6 lg:px-8 bg-slate-950/60">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 text-start">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-white text-xs sm:text-sm">240+ مركز بيانات</div>
              <div className="text-[11px] text-slate-400">شبكة Edge Anycast عالمية</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-white text-xs sm:text-sm">حماية أمنية متقدمة</div>
              <div className="text-[11px] text-slate-400">جدار WAF وتشفير TLS 1.3</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-white text-xs sm:text-sm">امتثال GDPR & CCPA</div>
              <div className="text-[11px] text-slate-400">حماية وخصوصية البيانات 100%</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-600/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-white text-xs sm:text-sm">معايير AdSense & E-E-A-T</div>
              <div className="text-[11px] text-slate-400">محتوى تحريري عالي الجودة</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700 flex items-center justify-center text-white">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <span className="font-black text-lg text-white tracking-tight block">
                  {t.brand_title}
                </span>
                <span className="text-[10px] text-slate-400 font-mono tracking-wider block">
                  GLOBAL INTERNET SERVICES (GIS)
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              المنصة المتكاملة لحلول الويب والإنترنت: تصميم المواقع والمتاجر الإلكترونية، استضافة سحابية فائقة السرعة، حجز النطاقات، تحسين محركات البحث، وتوفير أدوات رقمية مجانية وموثوقة.
            </p>

            <div className="space-y-1.5 text-xs text-slate-400 pt-2 border-t border-slate-800">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>القرية الذكية (Smart Village)، الجيزة، جمهورية مصر العربية 🇪🇬</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span>support@gisnetwork.global</span>
              </div>
            </div>
          </div>

          {/* Quick Links: Core Services */}
          <div>
            <h4 className="font-bold text-white text-xs sm:text-sm mb-4 tracking-wider">
              {currentLang === 'ar' ? 'خدمات المنصة' : 'Core Services'}
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <button onClick={() => onNavigate('store')} className="hover:text-blue-400 transition-colors flex items-center gap-1.5 cursor-pointer">
                  <ChevronRight className="w-3 h-3 text-slate-500 rtl:rotate-180" />
                  <span>تصميم المواقع والمتاجر</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('store')} className="hover:text-blue-400 transition-colors flex items-center gap-1.5 cursor-pointer">
                  <ChevronRight className="w-3 h-3 text-slate-500 rtl:rotate-180" />
                  <span>الاستضافة السحابية و VPS</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('store')} className="hover:text-blue-400 transition-colors flex items-center gap-1.5 cursor-pointer">
                  <ChevronRight className="w-3 h-3 text-slate-500 rtl:rotate-180" />
                  <span>حجز وإدارة النطاقات</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('store')} className="hover:text-blue-400 transition-colors flex items-center gap-1.5 cursor-pointer">
                  <ChevronRight className="w-3 h-3 text-slate-500 rtl:rotate-180" />
                  <span>التسويق الرقمي وتصدر السيو</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('store')} className="hover:text-blue-400 transition-colors flex items-center gap-1.5 cursor-pointer">
                  <ChevronRight className="w-3 h-3 text-slate-500 rtl:rotate-180" />
                  <span>الأمن السيبراني وحماية WAF</span>
                </button>
              </li>
            </ul>
          </div>

          {/* AdSense and Legal Compliance Links */}
          <div>
            <h4 className="font-bold text-white text-xs sm:text-sm mb-4 tracking-wider">
              {t.footer_legal_links}
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-blue-400 transition-colors flex items-center gap-1.5 text-start cursor-pointer">
                  <ChevronRight className="w-3 h-3 text-slate-500 rtl:rotate-180" />
                  <span>{t.nav_about} (هيئة التحرير)</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('privacy')} className="hover:text-blue-400 transition-colors flex items-center gap-1.5 text-start cursor-pointer">
                  <ChevronRight className="w-3 h-3 text-slate-500 rtl:rotate-180" />
                  <span>{t.nav_privacy}</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('terms')} className="hover:text-blue-400 transition-colors flex items-center gap-1.5 text-start cursor-pointer">
                  <ChevronRight className="w-3 h-3 text-slate-500 rtl:rotate-180" />
                  <span>{t.nav_terms}</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('cookies')} className="hover:text-blue-400 transition-colors flex items-center gap-1.5 text-start cursor-pointer">
                  <ChevronRight className="w-3 h-3 text-slate-500 rtl:rotate-180" />
                  <span>{t.nav_cookies}</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('adsense-standards')} className="hover:text-blue-400 transition-colors flex items-center gap-1.5 text-start cursor-pointer">
                  <ChevronRight className="w-3 h-3 text-slate-500 rtl:rotate-180" />
                  <span>{t.nav_adsense_standards}</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-blue-400 transition-colors flex items-center gap-1.5 text-start cursor-pointer">
                  <ChevronRight className="w-3 h-3 text-slate-500 rtl:rotate-180" />
                  <span>{t.nav_contact} والدعم الفني</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter Form */}
          <div>
            <h4 className="font-bold text-white text-xs sm:text-sm mb-3">
              {t.footer_newsletter_title}
            </h4>
            <p className="text-xs text-slate-400 mb-3 leading-relaxed">
              {t.footer_newsletter_desc}
            </p>
            {subscribed ? (
              <div className="bg-emerald-950/60 border border-emerald-600/40 text-emerald-300 p-3 rounded-lg text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>شكراً لاشتراكك! ستصلك أحدث المقالات والعروض.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder={t.footer_newsletter_placeholder}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                />
                <button
                  type="submit"
                  className="w-full py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{t.footer_newsletter_btn}</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Payment Methods Trust Bar */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 space-y-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="text-xs font-bold text-slate-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>طرق الدفع المعتمدة والآمنة في مصر والعالم:</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-purple-300 text-xs font-bold">
                ⚡ إنستا باي (InstaPay)
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-amber-300 text-xs font-bold">
                🟡 فوري (Fawry)
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-blue-300 text-xs font-bold">
                🔵 أمان (Aman)
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-emerald-300 text-xs font-bold">
                💳 كارت ميزة (Meeza)
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-red-300 text-xs font-bold">
                📱 فودافون كاش
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-sky-300 text-xs font-bold">
                💳 Visa & Mastercard
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-6 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            جميع الحقوق محفوظة © 2026 منصة خدمات الإنترنت العالمية - Global Internet Services (GIS)
          </div>
          <div className="flex items-center gap-3 text-[11px]">
            <span>ISO 27001 Certified</span>
            <span>•</span>
            <span>SOC2 Type II</span>
            <span>•</span>
            <span>Google AdSense Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
