import React, { useState } from 'react';
import { 
  Globe, 
  Menu, 
  X, 
  Moon, 
  Sun, 
  ChevronDown, 
  Check,
  Server,
  BookOpen,
  Activity,
  Video,
  Info,
  Mail,
  ShieldCheck,
  Zap
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

  const navLinks: { page: ActivePage; label: string; icon: any }[] = [
    { page: 'home', label: t.nav_home, icon: Globe },
    { page: 'store', label: currentLang === 'ar' ? 'الخدمات والحلول السحابية' : 'Services & Cloud', icon: Server },
    { page: 'blog', label: currentLang === 'ar' ? 'المدونة والمعرفة التقنية (36 مقال)' : 'Tech Blog (36 Articles)', icon: BookOpen },
    { page: 'diagnostics', label: currentLang === 'ar' ? 'فاحص السرعة والشبكة' : 'Speed & Ping Test', icon: Activity },
    { page: 'audio-to-video', label: currentLang === 'ar' ? 'استوديو الفيديو الرقمي' : 'Video Studio', icon: Video },
    { page: 'about', label: t.nav_about, icon: Info },
    { page: 'contact', label: t.nav_contact, icon: Mail },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/90 dark:border-slate-800/90 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo / GIS Branding */}
          <button 
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 group text-start focus:outline-none shrink-0 cursor-pointer"
            aria-label="منظومة خدمات الإنترنت العالمية - الرئيسية"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-blue-500/25 group-hover:scale-105 transition-transform">
              <Server className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="font-black text-base sm:text-xl tracking-tight text-slate-900 dark:text-white leading-tight font-sans">
                {currentLang === 'ar' ? 'خدمات الإنترنت العالمية' : 'Global Internet Services'}
              </div>
              <div className="text-[10px] sm:text-[11px] font-bold text-blue-600 dark:text-cyan-400 tracking-wider">
                GIS Network • Cloud & Infrastructure
              </div>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map(link => {
              const isActive = activePage === link.page;
              const Icon = link.icon;
              return (
                <button
                  key={link.page}
                  onClick={() => onNavigate(link.page)}
                  className={`px-3 py-2 rounded-xl text-xs xl:text-sm font-bold transition-all whitespace-nowrap relative flex items-center gap-1.5 cursor-pointer ${
                    isActive 
                      ? 'text-blue-600 dark:text-cyan-400 bg-blue-50/80 dark:bg-blue-950/40 shadow-xs' 
                      : 'text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-cyan-400 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-4 h-4 opacity-75" />
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 inset-x-3 h-0.5 bg-blue-600 dark:bg-cyan-400 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Actions: Contact Button + Theme Toggle + Lang Dropdown */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            <button
              onClick={() => onNavigate('contact')}
              className="hidden sm:flex px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-md shadow-blue-500/20 hover:scale-105 transition-all items-center gap-1.5 cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 text-amber-300" />
              <span>{currentLang === 'ar' ? 'طلب استشارة' : 'Consulting'}</span>
            </button>

            {/* Language Selector */}
            <div className="relative hidden sm:block">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
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
                        currentLang === lang.code ? 'font-bold text-blue-600 dark:text-cyan-400 bg-blue-50 dark:bg-blue-950/40' : 'text-slate-700 dark:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span>{lang.flag}</span>
                        <span>{lang.nativeName}</span>
                      </div>
                      {currentLang === lang.code && <Check className="w-3.5 h-3.5 text-blue-600" />}
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
          <div className="space-y-1">
            {navLinks.map(link => {
              const isActive = activePage === link.page;
              const Icon = link.icon;
              return (
                <button
                  key={link.page}
                  onClick={() => {
                    onNavigate(link.page);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-start px-3.5 py-2.5 rounded-xl text-sm font-bold flex items-center justify-between transition-colors ${
                    isActive 
                      ? 'bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-cyan-400' 
                      : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 opacity-75" />
                    <span>{link.label}</span>
                  </div>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-cyan-400" />}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">اللغة / Language</span>
            <div className="flex flex-wrap gap-1">
              {LANGUAGES.slice(0, 4).map(l => (
                <button
                  key={l.code}
                  onClick={() => {
                    onLanguageChange(l.code);
                    setMobileMenuOpen(false);
                  }}
                  className={`px-2 py-1 rounded text-xs font-bold ${
                    currentLang === l.code ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600'
                  }`}
                >
                  {l.flag} {l.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
