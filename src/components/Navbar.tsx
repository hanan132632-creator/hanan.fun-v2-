import React, { useState } from 'react';
import { 
  Globe, 
  ShoppingBag, 
  Menu, 
  X, 
  Moon, 
  Sun, 
  Sparkles, 
  ChevronDown, 
  ShieldCheck, 
  Activity,
  Check,
  Gamepad2,
  KeyRound,
  Smartphone,
  Award
} from 'lucide-react';
import { Language, Currency, ActivePage, CartItem } from '../types';
import { LANGUAGES, CURRENCIES, TRANSLATIONS } from '../locales/translations';
import { BLOG_POSTS } from '../data/mockData';

interface NavbarProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  currentCurrency: Currency;
  onCurrencyChange: (curr: Currency) => void;
  activePage: ActivePage;
  onNavigate: (page: ActivePage) => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  cartItems: CartItem[];
  onOpenCart: () => void;
  onOpenAiAssistant: () => void;
  onOpenMobileOptimizer: () => void;
  onOpenAdSenseReport: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onLanguageChange,
  currentCurrency,
  onCurrencyChange,
  activePage,
  onNavigate,
  isDarkMode,
  onToggleTheme,
  cartItems,
  onOpenCart,
  onOpenAiAssistant,
  onOpenMobileOptimizer,
  onOpenAdSenseReport,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  const t = TRANSLATIONS[currentLang];
  const currentLangObj = LANGUAGES.find(l => l.code === currentLang) || LANGUAGES[0];
  const currentCurrencyObj = CURRENCIES.find(c => c.code === currentCurrency) || CURRENCIES[0];

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const scrollToGames = () => {
    if (activePage !== 'home') {
      onNavigate('home');
      setTimeout(() => {
        const el = document.getElementById('arabic-games-hub');
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      const el = document.getElementById('arabic-games-hub');
      el?.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const scrollToPasswordGenerator = () => {
    if (activePage !== 'home') {
      onNavigate('home');
      setTimeout(() => {
        const el = document.getElementById('password-generator-tool');
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      const el = document.getElementById('password-generator-tool');
      el?.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const navLinks: { page: ActivePage; label: string }[] = [
    { page: 'home', label: t.nav_home },
    { page: 'audio-to-video', label: currentLang === 'ar' ? 'استوديو الصوت لفيديو 🎬' : 'Audio to Video 🎬' },
    { page: 'store', label: t.nav_store },
    { page: 'blog', label: t.nav_blog },
    { page: 'diagnostics', label: t.nav_diagnostics },
    { page: 'about', label: t.nav_about },
    { page: 'contact', label: t.nav_contact },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      {/* Top micro bar for global notice */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-medium">{t.hero_badge}</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-blue-100">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
              <span>SOC2 & ISO 27001</span>
            </span>
            <span className="flex items-center gap-1">
              <Activity className="w-3.5 h-3.5 text-emerald-300" />
              <span>99.99% Uptime SLA</span>
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo */}
          <button 
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 group text-start focus:outline-none"
            aria-label="Home"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Globe className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="font-black text-lg sm:text-xl tracking-tight text-slate-900 dark:text-white leading-tight">
                {t.brand_title}
              </div>
              <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 hidden xs:block">
                GIS Network Global
              </div>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => {
              const isActive = activePage === link.page;
              return (
                <button
                  key={link.page}
                  onClick={() => onNavigate(link.page)}
                  className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all inline-flex items-center gap-1.5 ${
                    isActive 
                      ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400' 
                      : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.page === 'blog' && (
                    <span className="px-1.5 py-0.2 rounded-full text-[10px] font-black bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300">
                      {BLOG_POSTS.length}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action Tools & Switchers */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Google AdSense Site Report Button */}
            <button
              id="navbar-adsense-report-btn"
              onClick={onOpenAdSenseReport}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-black bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-sm shadow-amber-500/25 transition-all hover:scale-105 active:scale-95"
              title="تقرير جوجل أدسنس للموقع والتحقق من حالة المراجعة"
            >
              <Award className="w-3.5 h-3.5 text-amber-100" />
              <span>تقرير أدسنس 📊</span>
            </button>

            {/* Password Generator Button */}
            <button
              onClick={scrollToPasswordGenerator}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-black bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-sm shadow-indigo-500/20 transition-all hover:scale-105 active:scale-95"
              title="مولد كلمات المرور وفحص الأمان"
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>مولد كلمات السر 🔐</span>
            </button>

            {/* Arabic Wordle Game Button */}
            <button
              onClick={scrollToGames}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-black bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-sm shadow-emerald-500/20 transition-all hover:scale-105 active:scale-95"
              title="خمّن الكلمة العربية ولغز اليوم"
            >
              <Gamepad2 className="w-3.5 h-3.5" />
              <span>خمّن الكلمة 🟩</span>
            </button>

            {/* Mobile Optimizer Button */}
            <button
              onClick={onOpenMobileOptimizer}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-black bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-sm shadow-emerald-500/20 transition-all hover:scale-105 active:scale-95"
              title="تحسين أداء الجوال Google Search Console"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>تحسين الجوال 📱</span>
            </button>

            {/* AI Assistant Button */}
            <button
              onClick={onOpenAiAssistant}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-sm transition-all hover:scale-102"
              title="AI Tech Advisor"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.btn_ask_ai}</span>
            </button>

            {/* Language Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setLangDropdownOpen(!langDropdownOpen);
                  setCurrencyDropdownOpen(false);
                }}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                aria-label="Language Selector"
              >
                <span>{currentLangObj.flag}</span>
                <span>{currentLangObj.name}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 rtl:right-auto rtl:left-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 py-1 z-50 animate-in fade-in slide-in-from-top-2">
                  {LANGUAGES.map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        onLanguageChange(lang.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3.5 py-2 text-xs text-start hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors ${
                        currentLang === lang.code ? 'font-bold text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-950/30' : 'text-slate-700 dark:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-base">{lang.flag}</span>
                        <span>{lang.nativeName} ({lang.name})</span>
                      </div>
                      {currentLang === lang.code && <Check className="w-3.5 h-3.5 text-blue-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Currency Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setCurrencyDropdownOpen(!currencyDropdownOpen);
                  setLangDropdownOpen(false);
                }}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                aria-label="Currency Selector"
              >
                <span>{currentCurrencyObj.symbol}</span>
                <span>{currentCurrencyObj.code}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {currencyDropdownOpen && (
                <div className="absolute right-0 rtl:right-auto rtl:left-0 mt-2 w-40 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 py-1 z-50 animate-in fade-in slide-in-from-top-2">
                  {CURRENCIES.map(curr => (
                    <button
                      key={curr.code}
                      onClick={() => {
                        onCurrencyChange(curr.code as Currency);
                        setCurrencyDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3.5 py-2 text-xs text-start hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors ${
                        currentCurrency === curr.code ? 'font-bold text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-950/30' : 'text-slate-700 dark:text-slate-200'
                      }`}
                    >
                      <span>{curr.name} ({curr.symbol})</span>
                      {currentCurrency === curr.code && <Check className="w-3.5 h-3.5 text-blue-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Dark / Light Toggle */}
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle Dark Mode"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/60 transition-colors"
              aria-label="View Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1 -right-1 rtl:-right-auto rtl:-left-1 bg-red-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                  {totalCartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu & Cart trigger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenCart}
              className="relative p-2 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400"
              aria-label="View Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1 -right-1 rtl:-right-auto rtl:-left-1 bg-red-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalCartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col gap-1">
            {navLinks.map(link => {
              const isActive = activePage === link.page;
              return (
                <button
                  key={link.page}
                  onClick={() => {
                    onNavigate(link.page);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-start px-4 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-between ${
                    isActive 
                      ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400' 
                      : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.page === 'blog' && (
                    <span className="px-2 py-0.5 rounded-full text-xs font-black bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300">
                      {BLOG_POSTS.length} مقالاً
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
            <button
              id="mobile-drawer-adsense-report-btn"
              onClick={() => {
                onOpenAdSenseReport();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg text-xs font-black bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white shadow-sm w-full justify-center"
            >
              <Award className="w-4 h-4 text-amber-100" />
              <span>تقرير جوجل أدسنس للموقع 📊</span>
            </button>

            <button
              onClick={scrollToPasswordGenerator}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-black bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-sm"
            >
              <KeyRound className="w-4 h-4" />
              <span>مولد كلمات السر 🔐</span>
            </button>

            <button
              onClick={scrollToGames}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-black bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-sm"
            >
              <Gamepad2 className="w-4 h-4" />
              <span>خمّن الكلمة العربية 🟩</span>
            </button>

            <button
              onClick={() => {
                onOpenMobileOptimizer();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-black bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-sm w-full justify-center"
            >
              <Smartphone className="w-4 h-4" />
              <span>تحسين أداء الجوال (Search Console) 📱</span>
            </button>

            <button
              onClick={() => {
                onOpenAiAssistant();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.btn_ask_ai}</span>
            </button>

            <button
              onClick={onToggleTheme}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
              <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
          </div>

          {/* Mobile Languages list */}
          <div className="pt-2">
            <div className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">
              Select Language (اختيار اللغة):
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {LANGUAGES.map(lang => (
                <button
                  key={lang.code}
                  onClick={() => {
                    onLanguageChange(lang.code);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs border ${
                    currentLang === lang.code 
                      ? 'border-blue-600 bg-blue-50 dark:bg-blue-950 text-blue-600 font-bold' 
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
