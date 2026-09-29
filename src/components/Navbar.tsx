import React, { useState } from 'react';
import { 
  Globe, 
  ShoppingBag, 
  Menu, 
  X, 
  Moon, 
  Sun, 
  ChevronDown, 
  Check,
  Sparkles,
  PhoneCall,
  LayoutGrid,
  ShieldCheck,
  FileText,
  Lock,
  Server,
  Zap,
  BookOpen
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
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);

  const t = TRANSLATIONS[currentLang];
  const currentLangObj = LANGUAGES.find(l => l.code === currentLang) || LANGUAGES[0];
  const currentCurrencyObj = CURRENCIES.find(c => c.code === currentCurrency) || CURRENCIES[0];

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks: { page: ActivePage; label: string; isHot?: boolean }[] = [
    { page: 'home', label: t.nav_home },
    { page: 'store', label: currentLang === 'ar' ? 'الخدمات السحابية والويب' : t.nav_store },
    { page: 'audio-to-video', label: currentLang === 'ar' ? 'استوديو الفيديو' : 'Studio', isHot: true },
    { page: 'blog', label: currentLang === 'ar' ? 'المدونة التقنية' : t.nav_blog },
    { page: 'about', label: t.nav_about },
    { page: 'contact', label: t.nav_contact },
  ];

  const quickTools = [
    {
      id: 'studio',
      title: currentLang === 'ar' ? 'استوديو تحويل الصوت لفيديو' : 'Audio to Video Studio',
      desc: currentLang === 'ar' ? 'توليد فيديو رقمي بأمواج صوتية مجاناً' : 'Generate waveforms video for free',
      icon: '🎬',
      action: () => {
        onNavigate('audio-to-video');
        setToolsDropdownOpen(false);
        setMobileMenuOpen(false);
      }
    },
    {
      id: 'passwords',
      title: currentLang === 'ar' ? 'مولد كلمات المرور التشفيري' : 'Strong Password Generator',
      desc: currentLang === 'ar' ? 'توليد مفاتيح مرور غير قابلة للاختراق' : 'Client-side cryptographic entropy',
      icon: '🔐',
      action: () => {
        if (activePage !== 'home') onNavigate('home');
        setTimeout(() => {
          document.getElementById('password-generator-tool')?.scrollIntoView({ behavior: 'smooth' });
        }, 150);
        setToolsDropdownOpen(false);
        setMobileMenuOpen(false);
      }
    },
    {
      id: 'speed',
      title: currentLang === 'ar' ? 'فاحص سرعة الشبكة والـ CDN' : 'Network Speed & Latency Test',
      desc: currentLang === 'ar' ? 'قياس سرعة السيرفرات في محافظات مصر والعالم' : 'Sub-millisecond Edge latency probe',
      icon: '⚡',
      action: () => {
        onNavigate('diagnostics');
        setToolsDropdownOpen(false);
        setMobileMenuOpen(false);
      }
    },
    {
      id: 'games',
      title: currentLang === 'ar' ? 'لعبة تخمين الكلمة العربية' : 'Arabic Wordle Game',
      desc: currentLang === 'ar' ? 'تنشيط الذهن والمعجم اللغوي' : 'Daily linguistic vocabulary challenge',
      icon: '🟩',
      action: () => {
        if (activePage !== 'home') onNavigate('home');
        setTimeout(() => {
          document.getElementById('arabic-games-hub')?.scrollIntoView({ behavior: 'smooth' });
        }, 150);
        setToolsDropdownOpen(false);
        setMobileMenuOpen(false);
      }
    },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-200">
      {/* Top Luxury Micro Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1 px-4 border-b border-slate-800 hidden sm:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>SLA 99.99% Guaranteed</span>
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">
              {currentLang === 'ar' ? 'بنية تحتية سحابية متقدمة في 240+ مركز بيانات حول العالم' : 'Enterprise Cloud Infrastructure across 240+ Global PoPs'}
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <a 
              href="tel:+20233456789" 
              className="text-slate-300 hover:text-white transition-colors flex items-center gap-1 font-medium"
            >
              <PhoneCall className="w-3 h-3 text-blue-400" />
              <span dir="ltr">+20 2 3345-6789</span>
            </a>
            <span className="text-slate-600">|</span>
            <button 
              onClick={() => onNavigate('privacy')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              {t.nav_privacy}
            </button>
            <button 
              onClick={() => onNavigate('terms')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              {t.nav_terms}
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar: Strict 3-Zone Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Zone 1: Single Element Brand Mark */}
          <button 
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 group text-start focus:outline-none shrink-0"
            aria-label="Home"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Globe className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="font-black text-base sm:text-lg tracking-tight text-slate-900 dark:text-white leading-tight font-sans">
                {t.brand_title}
              </div>
              <div className="text-[10px] sm:text-[11px] font-semibold text-slate-500 dark:text-slate-400 tracking-wider">
                GLOBAL INTERNET SERVICES
              </div>
            </div>
          </button>

          {/* Zone 2: Navigation Links (Clean text, subtle hover, no pill boxes) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map(link => {
              const isActive = activePage === link.page;
              return (
                <button
                  key={link.page}
                  onClick={() => onNavigate(link.page)}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap relative ${
                    isActive 
                      ? 'text-blue-600 dark:text-blue-400 font-bold bg-blue-50/60 dark:bg-blue-950/40' 
                      : 'text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.isHot && (
                    <span className="ms-1.5 px-1.5 py-0.2 rounded text-[10px] font-black bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                      جديد
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 inset-x-3 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full" />
                  )}
                </button>
              );
            })}

            {/* Tools Dropdown Menu */}
            <div className="relative">
              <button
                onClick={() => {
                  setToolsDropdownOpen(!toolsDropdownOpen);
                  setLangDropdownOpen(false);
                  setCurrencyDropdownOpen(false);
                }}
                className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors flex items-center gap-1.5 whitespace-nowrap"
              >
                <LayoutGrid className="w-4 h-4 text-indigo-500" />
                <span>{currentLang === 'ar' ? 'مركز الأدوات' : 'Tools Hub'}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${toolsDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {toolsDropdownOpen && (
                <div className="absolute right-0 rtl:right-auto rtl:left-0 mt-2 w-72 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 p-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="text-[11px] font-bold text-slate-400 px-3 py-1.5">
                    {currentLang === 'ar' ? 'أدوات رقمية مجانية وفورية:' : 'Free Interactive Tools:'}
                  </div>
                  {quickTools.map(tool => (
                    <button
                      key={tool.id}
                      onClick={tool.action}
                      className="w-full text-start p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700/70 transition-colors flex items-start gap-3"
                    >
                      <span className="text-xl shrink-0 mt-0.5">{tool.icon}</span>
                      <div className="min-w-0">
                        <div className="font-bold text-xs text-slate-900 dark:text-white truncate">
                          {tool.title}
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                          {tool.desc}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Zone 3: Primary Actions & Utilities */}
          <div className="hidden sm:flex items-center gap-2">
            {/* Language Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setLangDropdownOpen(!langDropdownOpen);
                  setCurrencyDropdownOpen(false);
                  setToolsDropdownOpen(false);
                }}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-100/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 hover:bg-slate-200/80 dark:hover:bg-slate-700 transition-colors"
                aria-label="Language Selector"
              >
                <span>{currentLangObj.flag}</span>
                <span className="font-medium">{currentLangObj.name}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 rtl:right-auto rtl:left-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 py-1.5 z-50 animate-in fade-in slide-in-from-top-2">
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
                        <span>{lang.nativeName}</span>
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
                  setToolsDropdownOpen(false);
                }}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-100/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 hover:bg-slate-200/80 dark:hover:bg-slate-700 transition-colors"
                aria-label="Currency Selector"
              >
                <span>{'flag' in currentCurrencyObj ? (currentCurrencyObj as any).flag : '💱'}</span>
                <span className="font-mono text-xs">{currentCurrencyObj.code}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {currencyDropdownOpen && (
                <div className="absolute right-0 rtl:right-auto rtl:left-0 mt-2 w-52 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 py-1.5 z-50 animate-in fade-in slide-in-from-top-2 max-h-72 overflow-y-auto">
                  {CURRENCIES.map(curr => (
                    <button
                      key={curr.code}
                      onClick={() => {
                        onCurrencyChange(curr.code as Currency);
                        setCurrencyDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs text-start hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors ${
                        currentCurrency === curr.code ? 'font-bold text-blue-600 dark:text-blue-400 bg-blue-50/70 dark:bg-blue-950/40' : 'text-slate-700 dark:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-base">{(curr as any).flag || '💱'}</span>
                        <div>
                          <span className="font-semibold block">{currentLang === 'ar' ? ((curr as any).nativeName || curr.name) : curr.name}</span>
                          <span className="text-[10px] text-slate-400 font-mono">{curr.code} ({curr.symbol})</span>
                        </div>
                      </div>
                      {currentCurrency === curr.code && <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Dark / Light Toggle */}
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Toggle Theme"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950/50 transition-colors cursor-pointer"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1 -right-1 rtl:-right-auto rtl:-left-1 bg-blue-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* Primary Action Button */}
            <button
              onClick={() => onNavigate('contact')}
              className="ms-1 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-all whitespace-nowrap cursor-pointer hover:shadow-md"
            >
              <span>{currentLang === 'ar' ? 'طلب استشارة / خدمة' : 'Request Consultation'}</span>
            </button>
          </div>

          {/* Mobile Cart & Menu Trigger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Toggle Theme"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>

            <button
              onClick={onOpenCart}
              className="relative p-2 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1 -right-1 rtl:-right-auto rtl:-left-1 bg-blue-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
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
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-8 space-y-4 max-h-[85vh] overflow-y-auto animate-in fade-in slide-in-from-top-4">
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
                  className={`w-full text-start px-3.5 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-between transition-colors ${
                    isActive 
                      ? 'bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 font-bold' 
                      : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.isHot && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-black bg-amber-500/20 text-amber-600 dark:text-amber-400">
                      جديد 🎬
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick Tools Grid in Mobile Menu */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            <div className="text-xs font-bold text-slate-400 mb-2 px-1">
              {currentLang === 'ar' ? 'الأدوات التفاعلية المباشرة:' : 'Interactive Direct Tools:'}
            </div>
            <div className="grid grid-cols-2 gap-2">
              {quickTools.map(tool => (
                <button
                  key={tool.id}
                  onClick={tool.action}
                  className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 text-start text-xs font-bold text-slate-800 dark:text-slate-200 hover:border-blue-500 transition-colors flex items-center gap-2"
                >
                  <span className="text-lg">{tool.icon}</span>
                  <span className="truncate">{tool.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Legal & Standards Links */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-1.5 text-xs">
            <button
              onClick={() => {
                onNavigate('privacy');
                setMobileMenuOpen(false);
              }}
              className="p-2 rounded-lg text-start text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span className="truncate">{t.nav_privacy}</span>
            </button>

            <button
              onClick={() => {
                onNavigate('terms');
                setMobileMenuOpen(false);
              }}
              className="p-2 rounded-lg text-start text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5 text-indigo-500" />
              <span className="truncate">{t.nav_terms}</span>
            </button>

            <button
              onClick={() => {
                onNavigate('cookies');
                setMobileMenuOpen(false);
              }}
              className="p-2 rounded-lg text-start text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5"
            >
              <span>🍪</span>
              <span className="truncate">{t.nav_cookies}</span>
            </button>

            <button
              onClick={() => {
                onNavigate('adsense-standards');
                setMobileMenuOpen(false);
              }}
              className="p-2 rounded-lg text-start text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5"
            >
              <span>📜</span>
              <span className="truncate">{t.nav_adsense_standards}</span>
            </button>
          </div>

          {/* Mobile Languages Selector */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
            <div className="text-xs font-bold text-slate-400 px-1">
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
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs border transition-colors ${
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

          {/* Mobile Currencies Selector */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
            <div className="text-xs font-bold text-slate-400 px-1">
              Select Currency (اختيار العملة):
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {CURRENCIES.map(curr => (
                <button
                  key={curr.code}
                  onClick={() => {
                    onCurrencyChange(curr.code as Currency);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs border transition-colors ${
                    currentCurrency === curr.code 
                      ? 'border-blue-600 bg-blue-50 dark:bg-blue-950 text-blue-600 font-bold' 
                      : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200'
                  }`}
                >
                  <span>{(curr as any).flag || '💱'}</span>
                  <span className="truncate font-medium">{curr.code} ({curr.symbol})</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
