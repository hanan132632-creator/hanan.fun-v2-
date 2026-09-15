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
  const [essential] = useState(true); // Always true
  const [analytics, setAnalytics] = useState(true);
  const [advertising, setAdvertising] = useState(true);

  useEffect(() => {
    const consent = localStorage.getItem('gis_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setIsOpen(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem(
      'gis_cookie_consent',
      JSON.stringify({ essential: true, analytics: true, advertising: true, date: new Date().toISOString() })
    );
    setIsOpen(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem(
      'gis_cookie_consent',
      JSON.stringify({ essential: true, analytics, advertising, date: new Date().toISOString() })
    );
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-8 md:right-auto md:max-w-md z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-5 text-slate-800 dark:text-slate-200">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
              <Cookie className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                {t.cookies_title}
              </h4>
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                <Shield className="w-3 h-3" /> GDPR & Google AdSense Compliant
              </span>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
            aria-label="Close Banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
          نستخدم ملفات تعريف الارتباط وتقنيات التتبع المعتمدة لتقديم أفضل تجربة تصفح ممكنة، قياس أداء الخوادم، وتقديم إعلانات ملائمة عبر Google AdSense وفقاً لـ{' '}
          <button 
            onClick={() => {
              onNavigate('privacy');
              setIsOpen(false);
            }} 
            className="text-blue-600 dark:text-blue-400 underline font-semibold hover:opacity-80"
          >
            سياسة الخصوصية
          </button>.
        </p>

        {showSettings && (
          <div className="mb-4 pt-3 border-t border-slate-200 dark:border-slate-800 space-y-2.5 text-xs">
            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60">
              <div>
                <span className="font-bold text-slate-900 dark:text-white">ملفات أساسية إلزامية</span>
                <p className="text-[10px] text-slate-500">مطلوبة لتشغيل الموقع والحماية السحابية</p>
              </div>
              <span className="text-xs font-bold text-slate-400">مفعّلة دائماً</span>
            </div>

            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60">
              <div>
                <span className="font-bold text-slate-900 dark:text-white">ملفات قياس الأداء والتحليلات</span>
                <p className="text-[10px] text-slate-500">تساعدنا في قياس سرعة الصفحات ومؤشرات الأداء</p>
              </div>
              <input
                type="checkbox"
                checked={analytics}
                onChange={e => setAnalytics(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60">
              <div>
                <span className="font-bold text-slate-900 dark:text-white">ملفات الإعلانات التخصيصية (Google AdSense)</span>
                <p className="text-[10px] text-slate-500">عرض إعلانات ملائمة بواسطة ملفات تعريف ارتباط DART</p>
              </div>
              <input
                type="checkbox"
                checked={advertising}
                onChange={e => setAdvertising(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
              />
            </div>
          </div>
        )}

        <div className="flex items-center gap-2">
          {showSettings ? (
            <button
              onClick={handleSavePreferences}
              className="flex-1 py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-sm"
            >
              <Check className="w-3.5 h-3.5" />
              <span>{t.btn_save_preferences}</span>
            </button>
          ) : (
            <>
              <button
                onClick={handleAcceptAll}
                className="flex-1 py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Check className="w-3.5 h-3.5" />
                <span>{t.btn_accept_all_cookies}</span>
              </button>
              <button
                onClick={() => setShowSettings(true)}
                className="py-2 px-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1"
              >
                <Settings2 className="w-3.5 h-3.5" />
                <span>{t.btn_cookie_settings}</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
