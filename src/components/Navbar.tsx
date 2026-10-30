import React, { useState } from 'react';
import { 
  Sparkles, 
  Menu, 
  X, 
  Moon, 
  Sun, 
  ChevronDown, 
  Check,
  BookOpen,
  Video,
  Info,
  Mail,
  ShieldCheck,
  FileText
} from 'lucide-react';
import { Language, Currency, ActivePage } from '../types';
import { LANGUAGES, TRANSLATIONS } from '../locales/translations';

interface NavbarProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  currentCurrency?: Currency;
  onCurrencyChange?: (curr: Currency) => void;
  activePage: ActivePage;
  onNavigate: (page: ActivePage) => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  cartItems?: any[];
  onOpenCart?: () => void;
  onOpenAiAssistant?: () => void;
  onOpenMobileOptimizer?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onLanguageChange,
  activePage,
  onNavigate,
  isDarkMode,
  onToggleTheme,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const t = TRANSLATIONS[currentLang];
  const currentLangObj = LANGUAGES.find(l => l.code === currentLang) || LANGUAGES[0];

  const navLinks: { page: ActivePage; label: string; isHot?: boolean; icon?: string }[] = [
    { page: 'home', label: t.nav_home, icon: '🏠' },
    { page: 'american-style-game', label: currentLang === 'ar' ? 'ألعاب بنات 2026' : 'Girls Game', isHot: true, icon: '👑' },
    { page: 'audio-to-video', label: currentLang === 'ar' ? 'استوديو الفيديو' : 'Video Studio', icon: '🎬' },
    { page: 'blog', label: currentLang === 'ar' ? 'المقالات والمدونة' : t.nav_blog, icon: '📝' },
    { page: 'about', label: t.nav_about, icon: '✨' },
    { page: 'contact', label: t.nav_contact, icon: '✉️' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/90 dark:border-slate-800/90 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo / Branding */}
          <button 
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 group text-start focus:outline-none shrink-0"
            aria-label="استوديو حنان الرقمي - الرئيسية"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-rose-500 via-pink-500 to-amber-400 flex items-center justify-center text-white shadow-md shadow-pink-500/25 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="font-black text-base sm:text-xl tracking-tight text-slate-900 dark:text-white leading-tight font-sans">
                استوديو حنان الرقمي
              </div>
              <div className="text-[10px] sm:text-[11px] font-bold text-pink-600 dark:text-pink-400 tracking-wider">
                Hanan Studio & Web Portal
              </div>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map(link => {
              const isActive = activePage === link.page;
              return (
                <button
                  key={link.page}
                  onClick={() => onNavigate(link.page)}
                  className={`px-3.5 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap relative flex items-center gap-1.5 cursor-pointer ${
                    isActive 
                      ? 'text-pink-600 dark:text-pink-400 bg-pink-50/80 dark:bg-pink-950/40 shadow-xs' 
                      : 'text-slate-700 dark:text-slate-200 hover:text-pink-600 dark:hover:text-pink-400 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                  }`}
                >
                  {link.icon && <span className="text-sm">{link.icon}</span>}
                  <span>{link.label}</span>
                  {link.isHot && (
                    <span className="ms-1 px-1.5 py-0.2 rounded text-[10px] font-black bg-rose-500 text-white shadow-xs">
                      جديد
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 inset-x-3 h-0.5 bg-pink-600 dark:bg-pink-400 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Actions: "ألعاب بنات" Button + Theme Toggle + Lang Dropdown (NO CART ICON) */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Prominent Primary "ألعاب بنات" Button */}
            <button
              onClick={() => onNavigate('american-style-game')}
              className="px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 hover:from-pink-600 hover:to-rose-600 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-pink-500/25 hover:shadow-lg hover:scale-105 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap animate-pulse"
              title="لعبة تلبيس وأزياء بنات ستايل أمريكي 2026"
            >
              <span className="text-sm sm:text-base">👑</span>
              <span>ألعاب بنات</span>
            </button>

            {/* Language Selector */}
            <div className="relative hidden sm:block">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                aria-label="Language Selector"
              >
                <span>{currentLangObj.flag}</span>
                <span className="font-semibold">{currentLangObj.name}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 rtl:right-auto rtl:left-0 mt-2 w-44 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 py-1.5 z-50 animate-in fade-in slide-in-from-top-2">
                  {LANGUAGES.map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        onLanguageChange(lang.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3.5 py-2 text-xs text-start hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors ${
                        currentLang === lang.code ? 'font-bold text-pink-600 dark:text-pink-400 bg-pink-50 dark:bg-pink-950/40' : 'text-slate-700 dark:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span>{lang.flag}</span>
                        <span>{lang.nativeName}</span>
                      </div>
                      {currentLang === lang.code && <Check className="w-3.5 h-3.5 text-pink-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Dark / Light Toggle */}
            <button
              onClick={onToggleTheme}
              className="p-2 sm:p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Toggle Theme"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              aria-label="قائمة التصفح"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-8 space-y-3 max-h-[85vh] overflow-y-auto animate-in fade-in slide-in-from-top-4">
          
          {/* Girls Game Prominent Banner in Mobile Drawer */}
          <button
            onClick={() => {
              onNavigate('american-style-game');
              setMobileMenuOpen(false);
            }}
            className="w-full p-3 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 text-white font-black text-sm shadow-md flex items-center justify-between"
          >
            <div className="flex items-center gap-2.5">
              <span className="text-xl">👑</span>
              <div className="text-start">
                <div className="font-black">العاب بنات استايل أمريكي 2026</div>
                <div className="text-[11px] text-pink-100 font-normal">تشغيل وتلبيس وتنسيق مباشر في المتصفح</div>
              </div>
            </div>
            <span className="text-xs bg-white text-rose-600 font-bold px-2 py-1 rounded-lg">العب</span>
          </button>

          <div className="space-y-1">
            {navLinks.map(link => {
              const isActive = activePage === link.page;
              return (
                <button
                  key={link.page}
                  onClick={() => {
                    onNavigate(link.page);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-start px-3.5 py-2.5 rounded-xl text-sm font-bold flex items-center justify-between transition-colors ${
                    isActive 
                      ? 'bg-pink-50 dark:bg-pink-950/70 text-pink-600 dark:text-pink-400' 
                      : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span>{link.icon}</span>
                    <span>{link.label}</span>
                  </div>
                  {link.isHot && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-black bg-pink-500 text-white">
                      مميز
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Legal / Policy Quick Links */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-1.5 text-xs">
            <button
              onClick={() => {
                onNavigate('privacy');
                setMobileMenuOpen(false);
              }}
              className="p-2 rounded-lg text-start text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>{t.nav_privacy}</span>
            </button>

            <button
              onClick={() => {
                onNavigate('terms');
                setMobileMenuOpen(false);
              }}
              className="p-2 rounded-lg text-start text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5 text-indigo-500" />
              <span>{t.nav_terms}</span>
            </button>

            <button
              onClick={() => {
                onNavigate('cookies');
                setMobileMenuOpen(false);
              }}
              className="p-2 rounded-lg text-start text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5"
            >
              <span>🍪</span>
              <span>{t.nav_cookies}</span>
            </button>

            <button
              onClick={() => {
                onNavigate('contact');
                setMobileMenuOpen(false);
              }}
              className="p-2 rounded-lg text-start text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5 text-blue-500" />
              <span>{t.nav_contact}</span>
            </button>
          </div>

          {/* Languages Selector */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1.5">
            <div className="text-xs font-bold text-slate-400 px-1">
              اللغات (Language):
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {LANGUAGES.map(lang => (
                <button
                  key={lang.code}
                  onClick={() => {
                    onLanguageChange(lang.code);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs border transition-colors ${
                    currentLang === lang.code 
                      ? 'border-pink-600 bg-pink-50 dark:bg-pink-950 text-pink-600 font-bold' 
                      : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200'
                  }`}
                >
                  <span>{lang.flag}</span>
                  <span className="truncate">{lang.nativeName}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
