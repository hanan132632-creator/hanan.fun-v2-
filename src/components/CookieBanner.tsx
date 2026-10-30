import React, { useState, useEffect } from 'react';
import { Cookie, Shield, Check, Settings2, X } from 'lucide-react';
import { Language, ActivePage } from '../types';
import { TRANSLATIONS } from '../locales/translations';

interface CookieBannerProps {
  currentLang: Language;
  onNavigate: (page: ActivePage) => void;
}

export const CookieBanner: React.FC<CookieBannerProps> = ({ currentLang, onNavigate }) => {
  const t = TRANSLATIONS[currentLang];
  const [isOpen, setIsOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Cookie preference states
  const [analytics, setAnalytics] = useState(true);
  const [advertising, setAdvertising] = useState(true);

  useEffect(() => {
    const consent = localStorage.getItem('hanan_cookie_consent') || localStorage.getItem('gis_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setIsOpen(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem(
      'hanan_cookie_consent',
      JSON.stringify({ essential: true, analytics: true, advertising: true, date: new Date().toISOString() })
    );
    setIsOpen(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem(
      'hanan_cookie_consent',
      JSON.stringify({ essential: true, analytics, advertising, date: new Date().toISOString() })
    );
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed bottom-0 inset-x-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 shadow-[0_-4px_20px_rgba(0,0,0,0.12)] px-4 py-2.5 sm:py-3 transition-transform animate-in slide-in-from-bottom-2 duration-300"
      role="region"
      aria-label="سياسة ملفات تعريف الارتباط والكوكيز"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
        
        {/* Information Notice */}
        <div className="flex items-center gap-2.5 text-slate-700 dark:text-slate-300 text-start w-full md:w-auto">
          <div className="w-8 h-8 rounded-xl bg-pink-100 dark:bg-pink-950/60 text-pink-600 dark:text-pink-400 flex items-center justify-center shrink-0">
            <Cookie className="w-4 h-4" />
          </div>
          <div className="leading-snug">
            <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
              <span>{t.cookies_title}</span>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold inline-flex items-center gap-0.5 bg-emerald-50 dark:bg-emerald-950/50 px-1.5 py-0.2 rounded border border-emerald-500/20">
                <Shield className="w-3 h-3" /> GDPR & Google AdSense
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              نستخدم ملفات الكوكيز لتحسين تجربة التصفح وعرض إعلانات ملائمة عبر Google AdSense وفق{' '}
              <button 
                onClick={() => onNavigate('privacy')} 
                className="text-pink-600 dark:text-pink-400 underline font-semibold cursor-pointer hover:text-pink-700"
              >
                سياسة الخصوصية
              </button>.
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end shrink-0">
          {showSettings && (
            <div className="flex items-center gap-3 px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-[11px]">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={e => setAnalytics(e.target.checked)}
                  className="w-3.5 h-3.5 rounded text-pink-600 focus:ring-pink-500 cursor-pointer"
                />
                <span>التحليلات</span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={advertising}
                  onChange={e => setAdvertising(e.target.checked)}
                  className="w-3.5 h-3.5 rounded text-pink-600 focus:ring-pink-500 cursor-pointer"
                />
                <span>الإعلانات (AdSense)</span>
              </label>
            </div>
          )}

          {showSettings ? (
            <button
              onClick={handleSavePreferences}
              className="px-3.5 py-1.5 bg-pink-600 hover:bg-pink-700 text-white rounded-lg font-bold text-xs transition-colors flex items-center gap-1 cursor-pointer whitespace-nowrap shadow-xs"
            >
              <Check className="w-3 h-3" />
              <span>حفظ الاختيارات</span>
            </button>
          ) : (
            <>
              <button
                onClick={handleAcceptAll}
                className="px-4 py-1.5 bg-pink-600 hover:bg-pink-700 text-white rounded-lg font-bold text-xs transition-colors flex items-center gap-1 cursor-pointer whitespace-nowrap shadow-xs"
              >
                <Check className="w-3 h-3" />
                <span>موافق وقبول الكل</span>
              </button>
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg font-medium text-xs transition-colors flex items-center gap-1 cursor-pointer whitespace-nowrap"
              >
                <Settings2 className="w-3 h-3 text-slate-500" />
                <span>تخصيص</span>
              </button>
            </>
          )}

          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="إغلاق البانر"
            title="إغلاق"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
