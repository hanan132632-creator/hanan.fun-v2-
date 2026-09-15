import React, { useState } from 'react';
import { 
  Globe, 
  Mail, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  Lock, 
  Server, 
  Award,
  ChevronRight
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
      <div className="border-b border-slate-800 py-8 px-4 sm:px-6 lg:px-8 bg-slate-950/40">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 text-center md:text-start">
          <div className="flex items-center justify-center md:justify-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-600/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-white text-sm">240+ Global Data Hubs</div>
              <div className="text-xs text-slate-400">Ultra-low latency edge CDN</div>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-600/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-white text-sm">Enterprise Zero Trust</div>
              <div className="text-xs text-slate-400">Multi-tier DDoS & WAF Shield</div>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-600/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-white text-sm">GDPR & CCPA Compliant</div>
              <div className="text-xs text-slate-400">100% Data Privacy & Security</div>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-600/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-white text-sm">Google AdSense Certified</div>
              <div className="text-xs text-slate-400">High E-E-A-T Quality Standard</div>
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
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white">
                <Globe className="w-5 h-5" />
              </div>
              <span className="font-black text-xl text-white tracking-tight">
                {t.brand_title}
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              {t.footer_desc} {t.tagline}.
            </p>
            <div className="text-xs text-slate-500">
              ISO/IEC 27001:2022 Certified | SOC 2 Type II Certified | PCI-DSS Compliant
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="font-bold text-white text-sm mb-4 tracking-wider">
              {t.footer_quick_links}
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-blue-400 transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-slate-500 rtl:rotate-180" />
                  {t.nav_home}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('store')} className="hover:text-blue-400 transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-slate-500 rtl:rotate-180" />
                  {t.nav_store}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('blog')} className="hover:text-blue-400 transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-slate-500 rtl:rotate-180" />
                  {t.nav_blog}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('diagnostics')} className="hover:text-blue-400 transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-slate-500 rtl:rotate-180" />
                  {t.nav_diagnostics}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    onNavigate('home');
                    setTimeout(() => {
                      document.getElementById('password-generator-tool')?.scrollIntoView({ behavior: 'smooth' });
                    }, 150);
                  }} 
                  className="hover:text-indigo-400 text-indigo-300 transition-colors flex items-center gap-1 font-bold"
                >
                  <ChevronRight className="w-3 h-3 text-indigo-400 rtl:rotate-180" />
                  <span>مولد كلمات السر 🔐</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    onNavigate('home');
                    setTimeout(() => {
                      document.getElementById('arabic-games-hub')?.scrollIntoView({ behavior: 'smooth' });
                    }, 150);
                  }} 
                  className="hover:text-emerald-400 text-emerald-300 transition-colors flex items-center gap-1 font-bold"
                >
                  <ChevronRight className="w-3 h-3 text-emerald-400 rtl:rotate-180" />
                  <span>خمّن الكلمة العربية 🟩</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-blue-400 transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-slate-500 rtl:rotate-180" />
                  {t.nav_about}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-blue-400 transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-slate-500 rtl:rotate-180" />
                  {t.nav_contact}
                </button>
              </li>
            </ul>
          </div>

          {/* AdSense and Legal Compliance Links */}
          <div>
            <h4 className="font-bold text-white text-sm mb-4 tracking-wider">
              {t.footer_legal_links}
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => onNavigate('privacy')} className="hover:text-blue-400 transition-colors flex items-center gap-1 text-start">
                  <ChevronRight className="w-3 h-3 text-slate-500 rtl:rotate-180" />
                  {t.nav_privacy}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('terms')} className="hover:text-blue-400 transition-colors flex items-center gap-1 text-start">
                  <ChevronRight className="w-3 h-3 text-slate-500 rtl:rotate-180" />
                  {t.nav_terms}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('cookies')} className="hover:text-blue-400 transition-colors flex items-center gap-1 text-start">
                  <ChevronRight className="w-3 h-3 text-slate-500 rtl:rotate-180" />
                  {t.nav_cookies}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('adsense-standards')} className="hover:text-blue-400 transition-colors flex items-center gap-1 text-start">
                  <ChevronRight className="w-3 h-3 text-slate-500 rtl:rotate-180" />
                  {t.nav_adsense_standards}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-blue-400 transition-colors flex items-center gap-1 text-start">
                  <ChevronRight className="w-3 h-3 text-slate-500 rtl:rotate-180" />
                  {t.nav_contact}
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter Form */}
          <div>
            <h4 className="font-bold text-white text-sm mb-3">
              {t.footer_newsletter_title}
            </h4>
            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              {t.footer_newsletter_desc}
            </p>
            {subscribed ? (
              <div className="bg-emerald-950/60 border border-emerald-600/40 text-emerald-300 p-3 rounded-lg text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>شكراً لاشتراكك! ستصلك رسالة تأكيد قريباً.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder={t.footer_newsletter_placeholder}
                    className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{t.footer_newsletter_btn}</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            {t.footer_copyright}
          </div>
          <div className="flex items-center gap-4">
            <span>TLS 1.3 256-Bit SSL</span>
            <span>•</span>
            <span>Anycast DNS v6</span>
            <span>•</span>
            <span>Google AdSense Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
