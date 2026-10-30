import React from 'react';
import { ActivePage, Language } from '../types';
import { Server, Globe, ShieldCheck, Mail, ArrowUp } from 'lucide-react';

interface FooterProps {
  currentLang?: Language;
  onNavigate: (page: ActivePage) => void;
}

export const Footer: React.FC<FooterProps> = ({ currentLang = 'ar', onNavigate }) => {
  const isAr = currentLang === 'ar';

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-8">
        
        {/* Top Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand & Mission */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                <Server className="w-5 h-5" />
              </div>
              <div className="font-black text-white text-base">
                {isAr ? 'خدمات الإنترنت العالمية' : 'Global Internet Services'}
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {isAr
                ? 'منظومة عالمية متخصصة في البنية التحتية السحابية، السيرفرات فائقة الأداء، شبكات توزيع المحتوى Anycast CDN، والأمن السيبراني، ومكتبة المعرفة التقنية.'
                : 'Enterprise cloud infrastructure, Anycast CDN networks, high-concurrency virtualization, cyber defense, and authoritative technical knowledge.'}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              {isAr ? 'الخدمات والحلول' : 'Solutions & Cloud'}
            </div>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigate('store')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  {isAr ? 'سيرفرات Cloud VPS Pro' : 'Cloud VPS Pro Servers'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('store')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  {isAr ? 'شبكة Anycast CDN Turbo' : 'Anycast CDN Turbo'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('store')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  {isAr ? 'درع الأمان السيبراني WAF' : 'CyberShield Enterprise'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('store')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  {isAr ? 'إدارة النطاقات والـ DNS' : 'Anycast DNS & Domains'}
                </button>
              </li>
            </ul>
          </div>

          {/* Tools & Knowledge */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              {isAr ? 'الأدوات والمقالات' : 'Tools & Knowledge'}
            </div>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigate('blog')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  {isAr ? 'المدونة التقنية (36 مقال متخصص)' : 'Technical Blog (36 Articles)'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('diagnostics')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  {isAr ? 'فاحص سرعة المواقع والشبكة' : 'Network & Ping Tester'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('audio-to-video')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  {isAr ? 'استوديو الصوت إلى فيديو' : 'Audio to Video Studio'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('sitemap-checker')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  {isAr ? 'فاحص ملفات sitemap و robots' : 'Sitemap & SEO Checker'}
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Compliance */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              {isAr ? 'الامتثال والشفافية' : 'Compliance & Legal'}
            </div>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigate('privacy')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  {isAr ? 'سياسة الخصوصية (Privacy Policy)' : 'Privacy Policy'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('terms')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  {isAr ? 'شروط الاستخدام (Terms of Service)' : 'Terms of Service'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('cookies')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  {isAr ? 'ملفات تعريف الارتباط (Cookie Policy)' : 'Cookie Policy'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('adsense-standards')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  {isAr ? 'معايير النشر وجودة AdSense' : 'Editorial & AdSense Standards'}
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Global Edge Node Points Indicator */}
        <div className="py-4 border-t border-b border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-cyan-400 shrink-0" />
            <span className="font-semibold text-slate-300">
              {isAr ? 'مراكز وعقد الحضور السحابية الرئيسية:' : 'Primary Cloud Presence PoPs:'}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono">
            <span>🇪🇬 Cairo (EG-IX)</span>
            <span>🇸🇦 Riyadh</span>
            <span>🇦🇪 Dubai</span>
            <span>🇩🇪 Frankfurt</span>
            <span>🇬🇧 London</span>
            <span>🇺🇸 New York</span>
            <span>🇸🇬 Singapore</span>
            <span>🇯🇵 Tokyo</span>
          </div>
        </div>

        {/* Bottom Copyright & Contact */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © 2026 منظومة خدمات الإنترنت العالمية - Global Internet Services (GIS Network).
            <span className="block sm:inline sm:ms-2">
              جميع الحقوق محفوظة | <span className="font-semibold text-cyan-400">hanan.fun</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="mailto:support@hanan.fun"
              className="text-cyan-400 hover:text-cyan-300 hover:underline font-bold transition-colors flex items-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>support@hanan.fun</span>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
