import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Clock, 
  Share2,
  Check,
  MessageSquare, 
  ArrowLeft, 
  ArrowRight, 
  Send, 
  CheckCircle2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../locales/translations';
import { BLOG_POSTS } from '../data/mockData';
import { AdSensePlacement } from '../components/AdSensePlacement';

interface BlogPageProps {
  currentLang: Language;
  selectedPostSlug?: string | null;
  onSelectPost: (slug: string | null) => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({
  currentLang,
  selectedPostSlug,
  onSelectPost,
}) => {
  const t = TRANSLATIONS[currentLang];
  const isRtl = currentLang === 'ar';
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Engagement states
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Comments state with localStorage persistence
  const [comments, setComments] = useState<Record<string, { id: string; name: string; text: string; date: string }[]>>(() => {
    try {
      const saved = localStorage.getItem('almahdi_blog_comments');
      if (saved) return JSON.parse(saved);
    } catch {}
    return {
      'google-adsense-monetization-2026': [
        { id: '1', name: 'م. أحمد خالد', text: 'مقال قيم جداً! تطبيق معايير Core Web Vitals ضاعف نسبة النقر إلى الظهور (CTR) في موقعي الإخباري.', date: 'منذ يومين' },
        { id: '2', name: 'Sara Miller', text: 'Excellent breakdown of DART cookies and GDPR transparency for AdSense publishers.', date: '3 days ago' },
      ],
    };
  });
  const [newCommentName, setNewCommentName] = useState('');
  const [newCommentText, setNewCommentText] = useState('');

  const categories = [
    { id: 'all', label: 'جميع المقالات (All Articles)' },
    { id: 'science', label: 'العلوم الطبيعية والكم (Science & Quantum Physics)' },
    { id: 'spirituality', label: 'السكينة والطب النبوي (Mindfulness & Dhikr)' },
    { id: 'security', label: 'الأمان وشهادات SSL (Security & SSL)' },
    { id: 'performance', label: 'السيو وسرعة المواقع (SEO & Performance)' },
    { id: 'ai', label: 'البرمجيات المتقدمة وهندسة النظم (Advanced Software & Systems)' },
    { id: 'culture', label: 'الألعاب الذهنية والمعرفة (Brain & Culture)' },
    { id: 'networking', label: 'الشبكات وسرعة النت (Networking & Wi-Fi)' },
    { id: 'monetization', label: 'الربح من جوجل أدسنس (AdSense)' },
    { id: 'cloud', label: 'البنية السحابية (Cloud)' },
  ];

  const activeArticle = BLOG_POSTS.find(p => p.slug === selectedPostSlug);
  const currentIndex = activeArticle ? BLOG_POSTS.findIndex(p => p.slug === activeArticle.slug) : -1;
  const prevArticle = currentIndex > 0 
    ? BLOG_POSTS[currentIndex - 1] 
    : (BLOG_POSTS.length > 1 ? BLOG_POSTS[BLOG_POSTS.length - 1] : null);
  const nextArticle = currentIndex >= 0 && currentIndex < BLOG_POSTS.length - 1
    ? BLOG_POSTS[currentIndex + 1]
    : (BLOG_POSTS.length > 1 ? BLOG_POSTS[0] : null);

  const handleNavigatePost = (slug: string) => {
    onSelectPost(slug);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const title = (post.title[currentLang] || post.title.en).toLowerCase();
    const excerpt = (post.excerpt[currentLang] || post.excerpt.en).toLowerCase();
    const q = searchQuery.toLowerCase();
    return matchesCategory && (title.includes(q) || excerpt.includes(q));
  });

  const handleShare = (slug: string) => {
    if (typeof navigator !== 'undefined') {
      const url = typeof window !== 'undefined' ? `${window.location.origin}/blog/${slug}` : '';
      if (navigator.clipboard) {
        navigator.clipboard.writeText(url).catch(() => {});
      }
      setCopiedLink(true);
      setToastMessage(isRtl ? '🔗 تم نسخ رابط المقال بنجاح للمشاركة!' : '🔗 Article link copied to clipboard!');
      setTimeout(() => {
        setCopiedLink(false);
        setToastMessage(null);
      }, 3000);
    }
  };

  const handleAddComment = (e: React.FormEvent, slug: string) => {
    e.preventDefault();
    if (!newCommentName.trim() || !newCommentText.trim()) return;

    const newComment = {
      id: String(Date.now()),
      name: newCommentName,
      text: newCommentText,
      date: isRtl ? 'الآن (مباشر)' : 'Just now',
    };

    setComments(prev => {
      const updated = {
        ...prev,
        [slug]: [...(prev[slug] || []), newComment],
      };
      try {
        localStorage.setItem('almahdi_blog_comments', JSON.stringify(updated));
      } catch {}
      return updated;
    });

    setNewCommentName('');
    setNewCommentText('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* If an article is open in detailed view */}
      {activeArticle ? (
        <article className="max-w-4xl mx-auto space-y-8 animate-in fade-in">
          {/* Top Bar with Back Button & Quick Jump Prev / Next */}
          <div className="flex items-center justify-between gap-3 flex-wrap pb-2">
            <button
              onClick={() => onSelectPost(null)}
              className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/60 px-3.5 py-2 rounded-xl transition-all shadow-xs border border-blue-100 dark:border-blue-900/40 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
              <span>{isRtl ? 'العودة لجميع المقالات' : 'Back to all articles'}</span>
            </button>

            {/* Quick Top Prev / Next Navigation Arrows */}
            <div className="flex items-center gap-2">
              {prevArticle && (
                <button
                  type="button"
                  onClick={() => handleNavigatePost(prevArticle.slug)}
                  title={isRtl ? `المقال السابق: ${prevArticle.title[currentLang] || prevArticle.title.en}` : `Previous: ${prevArticle.title[currentLang] || prevArticle.title.en}`}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 shadow-xs transition-all cursor-pointer"
                >
                  {isRtl ? <ArrowRight className="w-4 h-4 text-blue-600" /> : <ArrowLeft className="w-4 h-4 text-blue-600" />}
                  <span className="hidden sm:inline">{isRtl ? 'المقال السابق' : 'Prev Article'}</span>
                </button>
              )}

              {nextArticle && (
                <button
                  type="button"
                  onClick={() => handleNavigatePost(nextArticle.slug)}
                  title={isRtl ? `المقال التالي: ${nextArticle.title[currentLang] || nextArticle.title.en}` : `Next: ${nextArticle.title[currentLang] || nextArticle.title.en}`}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-all cursor-pointer"
                >
                  <span className="hidden sm:inline">{isRtl ? 'المقال التالي' : 'Next Article'}</span>
                  {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </button>
              )}
            </div>
          </div>

          {/* Article Header */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2.5 text-xs">
              <span className="bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 font-bold px-3 py-1 rounded-full">
                {activeArticle.category}
              </span>
              <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {activeArticle.readTimeMin} {t.blog_read_time}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white leading-tight">
              {activeArticle.title[currentLang] || activeArticle.title.en}
            </h1>

            {/* Author Meta & Share */}
            <div className="flex items-center justify-between py-4 border-y border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <img
                  src={activeArticle.author.avatar}
                  alt={activeArticle.author.name}
                  className="w-11 h-11 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <div className="font-bold text-sm text-slate-900 dark:text-white">
                    {activeArticle.author.name}
                  </div>
                  <div className="text-xs text-slate-500">
                    {activeArticle.author.role[currentLang] || activeArticle.author.role.en} • نشر في {activeArticle.publishDate}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleShare(activeArticle.slug)}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 shadow-xs transition-all cursor-pointer"
                title={isRtl ? 'نسخ رابط المقال' : 'Copy article link'}
              >
                {copiedLink ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-500" />
                    <span className="text-emerald-600 dark:text-emerald-400">{isRtl ? 'تم النسخ!' : 'Copied!'}</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4 text-blue-500" />
                    <span>{isRtl ? 'مشاركة' : 'Share'}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Cover image */}
          <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800 h-72 sm:h-96">
            <img
              src={activeArticle.coverImage}
              alt={activeArticle.title[currentLang] || activeArticle.title.en}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Article Main Text Content */}
          <div className="prose prose-slate dark:prose-invert max-w-none text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base space-y-4">
            <div className="whitespace-pre-wrap">
              {activeArticle.content[currentLang] || activeArticle.content.en}
            </div>
          </div>

          {/* Tags */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-400">الكلمات المفتاحية:</span>
            {activeArticle.tags.map((tag, i) => (
              <span key={i} className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs">
                #{tag}
              </span>
            ))}
          </div>

          {/* Bottom AdSense Unit */}
          <AdSensePlacement currentLang={currentLang} format="leaderboard" />

          {/* Dual Navigation Section: Previous Article & Next Article with Prominent Arrows */}
          <section className="pt-8 border-t-2 border-dashed border-slate-200 dark:border-slate-800 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
                <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white">
                  {isRtl ? 'التنقل بين المقالات (السابق والتالي)' : 'Article Navigation (Previous & Next)'}
                </h3>
              </div>
              <span className="text-xs text-slate-400 font-medium">
                {isRtl ? 'تابع القراءة واستكشف كافة الموضوعات' : 'Continue exploring related topics'}
              </span>
            </div>

            {/* Grid of Previous and Next Article Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Previous Article Card with Backward Arrow */}
              {prevArticle && (
                <div
                  onClick={() => handleNavigatePost(prevArticle.slug)}
                  className="group relative cursor-pointer overflow-hidden rounded-2xl bg-gradient-to-br from-slate-50 via-slate-100/50 to-white dark:from-slate-800/90 dark:via-slate-800/50 dark:to-slate-900 border-2 border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 p-5 sm:p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-slate-700 text-white shadow-sm">
                        {isRtl ? (
                          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                        ) : (
                          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
                        )}
                        <span>{isRtl ? 'المقال السابق' : 'Previous Article'}</span>
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {prevArticle.readTimeMin} {t.blog_read_time}
                      </span>
                    </div>

                    <h4 className="text-base sm:text-lg font-black text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug line-clamp-2">
                      {prevArticle.title[currentLang] || prevArticle.title.en}
                    </h4>

                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                      {prevArticle.excerpt[currentLang] || prevArticle.excerpt.en}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-200 dark:border-slate-700/80">
                    {prevArticle.coverImage && (
                      <div className="w-16 h-12 rounded-lg overflow-hidden shrink-0 border border-slate-200 dark:border-slate-700 bg-slate-100 shadow-xs">
                        <img
                          src={prevArticle.coverImage}
                          alt={prevArticle.title[currentLang] || prevArticle.title.en}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    )}
                    <button
                      type="button"
                      aria-label={isRtl ? 'الانتقال إلى المقال السابق' : 'Go to previous article'}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNavigatePost(prevArticle.slug);
                      }}
                      className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-100 text-xs font-bold flex items-center gap-1.5 shadow-xs border border-slate-200 dark:border-slate-600 group-hover:border-blue-300 transition-all cursor-pointer"
                    >
                      {isRtl ? (
                        <ArrowRight className="w-4 h-4 text-blue-600 dark:text-blue-400 transition-transform group-hover:translate-x-1" />
                      ) : (
                        <ArrowLeft className="w-4 h-4 text-blue-600 dark:text-blue-400 transition-transform group-hover:-translate-x-1" />
                      )}
                      <span>{isRtl ? 'الرجوع للمقال السابق' : 'Read Previous'}</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Next Article Card with Forward Arrow */}
              {nextArticle && (
                <div
                  onClick={() => handleNavigatePost(nextArticle.slug)}
                  className="group relative cursor-pointer overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50/90 via-indigo-50/50 to-slate-50 dark:from-slate-800/90 dark:via-blue-950/40 dark:to-slate-900 border-2 border-blue-200 dark:border-blue-900/60 hover:border-blue-500 dark:hover:border-blue-400 p-5 sm:p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-blue-600 text-white shadow-sm">
                        <span>{isRtl ? 'المقال التالي' : 'Next Article'}</span>
                        {isRtl ? (
                          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
                        ) : (
                          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                        )}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {nextArticle.readTimeMin} {t.blog_read_time}
                      </span>
                    </div>

                    <h4 className="text-base sm:text-lg font-black text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug line-clamp-2">
                      {nextArticle.title[currentLang] || nextArticle.title.en}
                    </h4>

                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                      {nextArticle.excerpt[currentLang] || nextArticle.excerpt.en}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-200 dark:border-slate-700/80">
                    {nextArticle.coverImage && (
                      <div className="w-16 h-12 rounded-lg overflow-hidden shrink-0 border border-slate-200 dark:border-slate-700 bg-slate-100 shadow-xs">
                        <img 
                          src={nextArticle.coverImage} 
                          alt={nextArticle.title[currentLang] || nextArticle.title.en}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    )}
                    <button
                      type="button"
                      aria-label={isRtl ? 'الانتقال إلى المقال التالي' : 'Go to next article'}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNavigatePost(nextArticle.slug);
                      }}
                      className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-blue-600/20 group-hover:scale-105 transition-all cursor-pointer"
                    >
                      <span>{isRtl ? 'متابعة للمقال التالي' : 'Read Next'}</span>
                      {isRtl ? (
                        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                      ) : (
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Comments Section */}
          <section className="pt-8 border-t border-slate-200 dark:border-slate-800 space-y-6">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-blue-600" />
              <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">
                التعليقات والمناقشات الهندسية ({(comments[activeArticle.slug] || []).length})
              </h3>
            </div>

            {/* Existing comments list */}
            <div className="space-y-3">
              {(comments[activeArticle.slug] || []).length === 0 ? (
                <div className="text-xs text-slate-400 py-4 text-center">
                  كن أول من يشارك بتعليق أو استفسار تقني حول هذا المقال.
                </div>
              ) : (
                (comments[activeArticle.slug] || []).map(comment => (
                  <div key={comment.id} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-[10px]">
                          {comment.name.charAt(0)}
                        </div>
                        <span className="font-bold text-slate-900 dark:text-white">{comment.name}</span>
                      </div>
                      <span className="text-slate-400">{comment.date}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 pt-1 leading-relaxed">
                      {comment.text}
                    </p>
                  </div>
                ))
              )}
            </div>

            {/* Add Comment Form */}
            <form onSubmit={e => handleAddComment(e, activeArticle.slug)} className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <h4 className="font-bold text-xs text-slate-800 dark:text-slate-200">
                إضافة تعليق مهني:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  type="text"
                  required
                  value={newCommentName}
                  onChange={e => setNewCommentName(e.target.value)}
                  placeholder="اسمك الكريم..."
                  className="px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500"
                />
              </div>
              <textarea
                required
                rows={3}
                value={newCommentText}
                onChange={e => setNewCommentText(e.target.value)}
                placeholder="اكتب رأيك أو استفسارك هنا بكل وضوح..."
                className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
                <span>إرسال التعليق</span>
              </button>
            </form>

            {/* Bottom Direct Next Article Navigation */}
            {nextArticle && (
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-50/80 to-indigo-50/60 dark:from-slate-800/90 dark:to-slate-800/60 border border-blue-200/80 dark:border-slate-700 shadow-sm">
                <div className="min-w-0 flex-1 w-full sm:w-auto text-start">
                  <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 block mb-0.5">
                    {isRtl ? 'متابعة القراءة • المقال التالي في السلسلة:' : 'Next article in this series:'}
                  </span>
                  <span className="text-sm font-extrabold text-slate-900 dark:text-white truncate block">
                    {nextArticle.title[currentLang] || nextArticle.title.en}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleNavigatePost(nextArticle.slug)}
                  className="w-full sm:w-auto px-5 py-2.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white rounded-xl text-xs font-black flex items-center justify-center gap-2 shadow-md transition-all shrink-0 cursor-pointer"
                >
                  <span>{isRtl ? 'المقال التالي' : 'Next Article'}</span>
                  {isRtl ? (
                    <ArrowLeft className="w-4 h-4" />
                  ) : (
                    <ArrowRight className="w-4 h-4" />
                  )}
                </button>
              </div>
            )}
          </section>
        </article>
      ) : (
        /* Blog Index View */
        <div className="space-y-10">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 text-xs font-bold">
                <BookOpen className="w-3.5 h-3.5" />
                <span>مركز المعرفة التقنية والربح من الويب</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-black border border-emerald-200 dark:border-emerald-800">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>إجمالي المقالات المنشورة: {BLOG_POSTS.length} مقالاً معتمداً</span>
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
              {t.blog_title}
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
              {t.blog_desc}
            </p>
          </div>

          {/* Search & Category Filter */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
                    selectedCategory === cat.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <span className="hidden sm:inline text-xs font-bold text-slate-500 dark:text-slate-400 whitespace-nowrap">
                (المعروض: {filteredPosts.length} من {BLOG_POSTS.length})
              </span>
              <div className="relative w-full md:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 rtl:left-auto rtl:right-3 top-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="بحث في المقالات..."
                  className="w-full pl-9 pr-4 rtl:pl-4 rtl:pr-9 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredPosts.map(post => (
              <article
                key={post.id}
                onClick={() => onSelectPost(post.slug)}
                className="group cursor-pointer rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.coverImage}
                      alt={post.title[currentLang] || post.title.en}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute top-3 right-3 rtl:right-auto rtl:left-3 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-md">
                      {post.readTimeMin} {t.blog_read_time}
                    </span>
                  </div>

                  <div className="p-5 space-y-2.5">
                    <div className="text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                      {post.category}
                    </div>
                    <h2 className="font-extrabold text-base text-slate-900 dark:text-white leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                      {post.title[currentLang] || post.title.en}
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {post.excerpt[currentLang] || post.excerpt.en}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-2 pt-3">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-6 h-6 rounded-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <span className="text-slate-700 dark:text-slate-300 font-semibold truncate max-w-[120px] sm:max-w-none">{post.author.name}</span>
                  </div>
                  <div className="pt-3 text-[11px] text-slate-500 dark:text-slate-400">
                    <span>{post.publishDate}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* AdSense Unit in Blog Index */}
          <AdSensePlacement currentLang={currentLang} format="leaderboard" />
        </div>
      )}

      {/* Floating Interactive Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300 pointer-events-none">
          <div className="bg-slate-900/95 dark:bg-white/95 text-white dark:text-slate-900 px-5 py-3 rounded-2xl shadow-2xl backdrop-blur-md border border-slate-700/50 dark:border-slate-200 text-xs sm:text-sm font-black flex items-center gap-2.5">
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
};
