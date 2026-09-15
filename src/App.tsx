import React, { useState, useEffect } from 'react';
import { 
  Language, 
  Currency, 
  ActivePage, 
  ServiceItem, 
  CartItem 
} from './types';
import { LANGUAGES } from './locales/translations';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CookieBanner } from './components/CookieBanner';
import { CartDrawer } from './components/CartDrawer';
import { AiAssistantModal } from './components/AiAssistantModal';
import { HomePage } from './pages/HomePage';
import { StorePage } from './pages/StorePage';
import { BlogPage } from './pages/BlogPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { CookiePolicyPage } from './pages/CookiePolicyPage';
import { AdSenseStandardsPage } from './pages/AdSenseStandardsPage';
import { AudioToVideoPage } from './pages/AudioToVideoPage';
import { SpeedTestWidget } from './components/SpeedTestWidget';
import { MobileOptimizerModal } from './components/MobileOptimizerModal';
import { AdSenseReportModal } from './components/AdSenseReportModal';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Sparkles, ShoppingBag, ArrowUp } from 'lucide-react';

export default function App() {
  // Language & Direction State
  const [currentLang, setCurrentLang] = useState<Language>(() => {
    const saved = localStorage.getItem('gis_lang') as Language;
    return saved || 'ar';
  });

  // Currency State
  const [currentCurrency, setCurrentCurrency] = useState<Currency>(() => {
    const saved = localStorage.getItem('gis_curr') as Currency;
    return saved || 'USD';
  });

  // URL Path to ActivePage resolver
  const getInitialPage = (): ActivePage => {
    if (typeof window === 'undefined') return 'home';
    const path = window.location.pathname.toLowerCase().replace(/\/$/, '');
    if (path.includes('ads.txt')) {
      window.location.replace('/ads.txt');
      return 'home';
    }
    if (path === '/about' || path.endsWith('/about')) return 'about';
    if (path === '/store' || path.endsWith('/store')) return 'store';
    if (path === '/blog' || path.endsWith('/blog')) return 'blog';
    if (path === '/contact' || path.endsWith('/contact')) return 'contact';
    if (path === '/privacy' || path === '/privacy-policy' || path.endsWith('/privacy')) return 'privacy';
    if (path === '/terms' || path === '/terms-of-service' || path.endsWith('/terms')) return 'terms';
    if (path === '/cookies' || path === '/cookie-policy' || path.endsWith('/cookies')) return 'cookies';
    if (path === '/adsense-standards' || path.endsWith('/adsense-standards')) return 'adsense-standards';
    if (path === '/audio-to-video' || path.endsWith('/audio-to-video')) return 'audio-to-video';
    if (path === '/diagnostics' || path.endsWith('/diagnostics')) return 'diagnostics';
    return 'home';
  };

  // Navigation State
  const [activePage, setActivePage] = useState<ActivePage>(getInitialPage);
  const [selectedBlogSlug, setSelectedBlogSlug] = useState<string | null>(null);

  // Dark Mode State
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('gis_dark');
    return saved ? saved === 'true' : false;
  });

  // Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('gis_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);

  // AI Assistant Modal State
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);
  const [mobileOptimizerOpen, setMobileOptimizerOpen] = useState(false);
  const [adSenseReportOpen, setAdSenseReportOpen] = useState(false);

  // Scroll to top button visibility
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Update HTML attributes and persistence on language change
  useEffect(() => {
    localStorage.setItem('gis_lang', currentLang);
    const langObj = LANGUAGES.find(l => l.code === currentLang);
    const dir = langObj?.dir || 'ltr';
    document.documentElement.dir = dir;
    document.documentElement.lang = currentLang;
  }, [currentLang]);

  // Update currency persistence
  useEffect(() => {
    localStorage.setItem('gis_curr', currentCurrency);
  }, [currentCurrency]);

  // Update Dark Mode on document root
  useEffect(() => {
    localStorage.setItem('gis_dark', String(isDarkMode));
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Cart persistence
  useEffect(() => {
    localStorage.setItem('gis_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Scroll listener
  useEffect(() => {
    const checkScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  // Listen to browser popstate (back/forward buttons)
  useEffect(() => {
    const handlePopState = () => {
      setActivePage(getInitialPage());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (page: ActivePage) => {
    setActivePage(page);
    if (typeof window !== 'undefined') {
      const targetPath = page === 'home' ? '/' : `/${page}`;
      if (window.location.pathname !== targetPath) {
        try {
          window.history.pushState({ page }, '', targetPath);
        } catch {
          // ignore if history api is restricted
        }
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (service: ServiceItem, billingCycle: 'monthly' | 'annually' = 'monthly') => {
    setCartItems(prev => {
      const existing = prev.find(item => item.service.id === service.id && item.billingCycle === billingCycle);
      if (existing) {
        return prev.map(item =>
          item.service.id === service.id && item.billingCycle === billingCycle
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { service, quantity: 1, billingCycle }];
    });
    setCartDrawerOpen(true);
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.service.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200 selection:bg-blue-600 selection:text-white">
      {/* Top Navigation */}
      <Navbar
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        currentCurrency={currentCurrency}
        onCurrencyChange={setCurrentCurrency}
        activePage={activePage}
        onNavigate={handleNavigate}
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode(!isDarkMode)}
        cartItems={cartItems}
        onOpenCart={() => setCartDrawerOpen(true)}
        onOpenAiAssistant={() => setAiAssistantOpen(true)}
        onOpenMobileOptimizer={() => setMobileOptimizerOpen(true)}
        onOpenAdSenseReport={() => setAdSenseReportOpen(true)}
      />

      {/* Main Page Content Router */}
      <main className="flex-1">
        {activePage === 'home' && (
          <HomePage
            currentLang={currentLang}
            currentCurrency={currentCurrency}
            onNavigate={handleNavigate}
            onAddToCart={handleAddToCart}
            onSelectBlog={(slug) => {
              setSelectedBlogSlug(slug);
              handleNavigate('blog');
            }}
            onOpenAiAssistant={() => setAiAssistantOpen(true)}
            onOpenAdSenseReport={() => setAdSenseReportOpen(true)}
          />
        )}

        {activePage === 'store' && (
          <StorePage
            currentLang={currentLang}
            currentCurrency={currentCurrency}
            onAddToCart={handleAddToCart}
          />
        )}

        {activePage === 'blog' && (
          <BlogPage
            currentLang={currentLang}
            selectedPostSlug={selectedBlogSlug}
            onSelectPost={setSelectedBlogSlug}
          />
        )}

        {activePage === 'diagnostics' && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">
            <SpeedTestWidget currentLang={currentLang} />
          </div>
        )}

        {activePage === 'about' && (
          <AboutPage
            currentLang={currentLang}
            onNavigate={handleNavigate}
          />
        )}

        {activePage === 'contact' && (
          <ContactPage
            currentLang={currentLang}
          />
        )}

        {activePage === 'privacy' && (
          <PrivacyPolicyPage
            currentLang={currentLang}
          />
        )}

        {activePage === 'terms' && (
          <TermsPage
            currentLang={currentLang}
          />
        )}

        {activePage === 'cookies' && (
          <CookiePolicyPage
            currentLang={currentLang}
          />
        )}

        {activePage === 'adsense-standards' && (
          <AdSenseStandardsPage
            currentLang={currentLang}
          />
        )}

        {activePage === 'audio-to-video' && (
          <AudioToVideoPage
            currentLang={currentLang}
          />
        )}
      </main>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 rtl:right-auto rtl:left-6 z-40 flex flex-col gap-2.5">
        {showScrollTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-11 h-11 rounded-full bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-lg flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-700 transition-all hover:scale-105"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}

        <button
          onClick={() => setAiAssistantOpen(true)}
          className="px-4 py-3 rounded-full bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold text-xs shadow-xl shadow-indigo-500/30 flex items-center gap-2 hover:scale-105 transition-all"
          title="AI Technical Consultant"
        >
          <Sparkles className="w-4 h-4 animate-spin-slow" />
          <span className="hidden sm:inline">استشارة الذكاء الاصطناعي</span>
        </button>
      </div>

      {/* Slide-out Cart Drawer */}
      <CartDrawer
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        cartItems={cartItems}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        currentLang={currentLang}
        currentCurrency={currentCurrency}
      />

      {/* AI Assistant Modal */}
      <AiAssistantModal
        isOpen={aiAssistantOpen}
        onClose={() => setAiAssistantOpen(false)}
        currentLang={currentLang}
      />

      {/* Mobile Search Console & Performance Modal */}
      <MobileOptimizerModal
        isOpen={mobileOptimizerOpen}
        onClose={() => setMobileOptimizerOpen(false)}
        currentLang={currentLang}
      />

      {/* Google AdSense Live Report & Verification Modal */}
      <AdSenseReportModal
        isOpen={adSenseReportOpen}
        onClose={() => setAdSenseReportOpen(false)}
        currentLang={currentLang}
        onNavigateToStandards={() => handleNavigate('adsense-standards')}
      />

      {/* Cookie Consent Banner */}
      <CookieBanner
        currentLang={currentLang}
        onNavigate={handleNavigate}
      />

      {/* Vercel Speed Insights */}
      <SpeedInsights />

      {/* Global Footer with All Policy and AdSense Links */}
      <Footer
        currentLang={currentLang}
        onNavigate={handleNavigate}
      />
    </div>
  );
}
