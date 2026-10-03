import React, { useState, useEffect, Suspense, lazy } from 'react';
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
import { HomePage } from './pages/HomePage';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Sparkles, ArrowUp } from 'lucide-react';

// Code-split all secondary pages to reduce initial JavaScript payload from 1.4MB to <300KB
const StorePage = lazy(() => import('./pages/StorePage').then(m => ({ default: m.StorePage })));
const BlogPage = lazy(() => import('./pages/BlogPage').then(m => ({ default: m.BlogPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage').then(m => ({ default: m.PrivacyPolicyPage })));
const TermsPage = lazy(() => import('./pages/TermsPage').then(m => ({ default: m.TermsPage })));
const CookiePolicyPage = lazy(() => import('./pages/CookiePolicyPage').then(m => ({ default: m.CookiePolicyPage })));
const AdSenseStandardsPage = lazy(() => import('./pages/AdSenseStandardsPage').then(m => ({ default: m.AdSenseStandardsPage })));
const AudioToVideoPage = lazy(() => import('./pages/AudioToVideoPage').then(m => ({ default: m.AudioToVideoPage })));
const SpeedTestWidget = lazy(() => import('./components/SpeedTestWidget').then(m => ({ default: m.SpeedTestWidget })));

// Code-split heavy interactive modals
const CartDrawer = lazy(() => import('./components/CartDrawer').then(m => ({ default: m.CartDrawer })));
const AiAssistantModal = lazy(() => import('./components/AiAssistantModal').then(m => ({ default: m.AiAssistantModal })));
const MobileOptimizerModal = lazy(() => import('./components/MobileOptimizerModal').then(m => ({ default: m.MobileOptimizerModal })));

const PageLoadingSkeleton = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-pulse space-y-6">
    <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded-xl w-48"></div>
    <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-lg w-96"></div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
      <div className="h-64 bg-slate-200 dark:bg-slate-800 rounded-2xl"></div>
      <div className="h-64 bg-slate-200 dark:bg-slate-800 rounded-2xl"></div>
      <div className="h-64 bg-slate-200 dark:bg-slate-800 rounded-2xl"></div>
    </div>
  </div>
);

export default function App() {
  // Language & Direction State
  const [currentLang, setCurrentLang] = useState<Language>(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('gis_lang') as Language : null;
    return saved || 'ar';
  });

  // Currency State
  const [currentCurrency, setCurrentCurrency] = useState<Currency>(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('gis_curr') as Currency : null;
    return saved || 'USD';
  });

  // URL Path to ActivePage resolver
  const getInitialPage = (): ActivePage => {
    if (typeof window === 'undefined') return 'home';
    const rawPath = window.location.pathname.toLowerCase().replace(/\/$/, '');
    let path = rawPath;
    try {
      path = decodeURIComponent(rawPath);
    } catch {}
    if (path.includes('ads.txt')) {
      window.location.replace('/ads.txt');
      return 'home';
    }
    const normalizedPath = path.replace(/\s+/g, '-').replace(/\/+/g, '/');

    if (
      normalizedPath === '/about' || normalizedPath.endsWith('/about') || 
      normalizedPath === '/عن' || normalizedPath.endsWith('/عن') || 
      normalizedPath === '/من-نحن' || normalizedPath.endsWith('/من-نحن')
    ) return 'about';

    if (
      normalizedPath === '/store' || normalizedPath.endsWith('/store') || 
      normalizedPath === '/متجر' || normalizedPath.endsWith('/متجر') || 
      normalizedPath === '/محل' || normalizedPath.endsWith('/محل') ||
      path.includes('محل') || path.includes('متجر') || path.includes('store') || path.includes('shop')
    ) return 'store';

    if (
      normalizedPath === '/blog' || normalizedPath.endsWith('/blog') || 
      normalizedPath === '/مدونة' || normalizedPath.endsWith('/مدونة') ||
      normalizedPath.startsWith('/blog/') || normalizedPath.startsWith('/مدونة/') ||
      path.includes('مدونة') || path.includes('blog')
    ) return 'blog';

    if (
      normalizedPath === '/contact' || normalizedPath.endsWith('/contact') || 
      normalizedPath === '/اتصل-بنا' || normalizedPath.endsWith('/اتصل-بنا') ||
      path.includes('اتصل') || path.includes('تواصل')
    ) return 'contact';

    if (
      normalizedPath === '/privacy' || normalizedPath === '/privacy-policy' || normalizedPath.endsWith('/privacy') || 
      normalizedPath === '/سياسة-الخصوصية' || normalizedPath.endsWith('/سياسة-الخصوصية') || 
      normalizedPath === '/خصوصية' || normalizedPath.endsWith('/خصوصية') ||
      path.includes('خصوصية') || path.includes('privacy')
    ) return 'privacy';

    if (
      normalizedPath === '/terms' || normalizedPath === '/terms-of-service' || normalizedPath.endsWith('/terms') || 
      normalizedPath === '/الشروط' || normalizedPath.endsWith('/الشروط') || 
      normalizedPath === '/شروط' || normalizedPath.endsWith('/شروط') || 
      normalizedPath === '/شروط-الاستخدام' || normalizedPath.endsWith('/شروط-الاستخدام') ||
      path.includes('شروط') || path.includes('terms')
    ) return 'terms';

    if (
      normalizedPath === '/cookies' || normalizedPath === '/cookie-policy' || normalizedPath.endsWith('/cookies') || 
      normalizedPath === '/كوكيز' || normalizedPath === '/ملفات-تعريف-الارتباط' ||
      path.includes('كوكيز') || path.includes('cookie')
    ) return 'cookies';
    if (path === '/adsense-standards' || path.endsWith('/adsense-standards')) return 'adsense-standards';
    if (path === '/audio-to-video' || path.endsWith('/audio-to-video')) return 'audio-to-video';
    if (path === '/diagnostics' || path.endsWith('/diagnostics')) return 'diagnostics';
    return 'home';
  };

  // Navigation State
  const [activePage, setActivePage] = useState<ActivePage>(getInitialPage);
  const [selectedBlogSlug, setSelectedBlogSlug] = useState<string | null>(() => {
    if (typeof window === 'undefined') return null;
    const path = window.location.pathname;
    if (path.startsWith('/blog/')) {
      return path.replace('/blog/', '').replace(/\/$/, '');
    }
    return null;
  });

  const handleSelectBlog = (slug: string | null) => {
    setSelectedBlogSlug(slug);
    if (slug) {
      setActivePage('blog');
      if (typeof window !== 'undefined') {
        try {
          window.history.pushState({ page: 'blog', slug }, '', `/blog/${slug}`);
        } catch {}
      }
    } else {
      if (typeof window !== 'undefined') {
        try {
          window.history.pushState({ page: 'blog' }, '', '/blog');
        } catch {}
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Dark Mode State
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const saved = localStorage.getItem('gis_dark');
    return saved ? saved === 'true' : false;
  });

  // Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = typeof window !== 'undefined' ? localStorage.getItem('gis_cart') : null;
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);

  // AI Assistant Modal State
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);
  const [mobileOptimizerOpen, setMobileOptimizerOpen] = useState(false);

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

  // Scroll listener with passive listener for max performance
  useEffect(() => {
    const checkScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', checkScroll, { passive: true });
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  // Listen to browser popstate (back/forward buttons)
  useEffect(() => {
    const handlePopState = () => {
      setActivePage(getInitialPage());
      if (typeof window !== 'undefined') {
        const path = window.location.pathname;
        if (path.startsWith('/blog/')) {
          setSelectedBlogSlug(path.replace('/blog/', '').replace(/\/$/, ''));
        } else if (path === '/blog') {
          setSelectedBlogSlug(null);
        }
      }
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
        } catch {}
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
      />

      {/* Main Page Content Router with Suspense for on-demand lazy pages */}
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
          />
        )}

        <Suspense fallback={<PageLoadingSkeleton />}>
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
              onSelectPost={handleSelectBlog}
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
        </Suspense>
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
          title="Technical Consultant"
        >
          <Sparkles className="w-4 h-4 animate-spin-slow" />
          <span className="hidden sm:inline">استشارة الدعم الفني السحابي</span>
        </button>
      </div>

      {/* Lazy Modals: only loaded when triggered */}
      {cartDrawerOpen && (
        <Suspense fallback={null}>
          <CartDrawer
            isOpen={cartDrawerOpen}
            onClose={() => setCartDrawerOpen(false)}
            cartItems={cartItems}
            onRemoveItem={handleRemoveCartItem}
            onClearCart={handleClearCart}
            currentLang={currentLang}
            currentCurrency={currentCurrency}
          />
        </Suspense>
      )}

      {aiAssistantOpen && (
        <Suspense fallback={null}>
          <AiAssistantModal
            isOpen={aiAssistantOpen}
            onClose={() => setAiAssistantOpen(false)}
            currentLang={currentLang}
          />
        </Suspense>
      )}

      {mobileOptimizerOpen && (
        <Suspense fallback={null}>
          <MobileOptimizerModal
            isOpen={mobileOptimizerOpen}
            onClose={() => setMobileOptimizerOpen(false)}
            currentLang={currentLang}
          />
        </Suspense>
      )}

      {/* Cookie Consent Banner */}
      <CookieBanner
        currentLang={currentLang}
        onNavigate={handleNavigate}
      />

      {/* Speed Insights */}
      <SpeedInsights />

      {/* Global Footer */}
      <Footer
        currentLang={currentLang}
        onNavigate={handleNavigate}
      />
    </div>
  );
}
