import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Clock, 
  Eye, 
  ThumbsUp, 
  Share2, 
  MessageSquare, 
  Sparkles, 
  ArrowLeft, 
  Send, 
  User, 
  CheckCircle2,
  Bookmark,
  ChevronRight,
  ShieldCheck,
  Zap,
  Loader2
} from 'lucide-react';
import { Language, BlogPost } from '../types';
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
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [likes, setLikes] = useState<Record<string, number>>({
    'cloud-hosting-speed-optimization': 142,
    'google-adsense-monetization-2026': 218,
    'ddos-mitigation-zero-trust-architecture': 95,
  });
  const [hasLiked, setHasLiked] = useState<Record<string, boolean>>({});

  // Comments state
  const [comments, setComments] = useState<Record<string, { id: string; name: string; text: string; date: string }[]>>({
    'google-adsense-monetization-2026': [
      { id: '1', name: 'م. أحمد خالد', text: 'مقال قيم جداً! تطبيق معايير Core Web Vitals ضاعف نسبة النقر إلى الظهور (CTR) في موقعي الإخباري.', date: 'منذ يومين' },
      { id: '2', name: 'Sara Miller', text: 'Excellent breakdown of DART cookies and GDPR transparency for AdSense publishers.', date: '3 days ago' },
    ],
  });
  const [newCommentName, setNewCommentName] = useState('');
  const [newCommentText, setNewCommentText] = useState('');

  // AI Summary generator state
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [loadingAiSummary, setLoadingAiSummary] = useState(false);

  const categories = [
    { id: 'all', label: 'جميع المقالات (All Articles)' },
    { id: 'security', label: 'الأمان وشهادات SSL (Security & SSL)' },
    { id: 'performance', label: 'السيو وسرعة المواقع (SEO & Performance)' },
    { id: 'ai', label: 'الذكاء الاصطناعي والبرمجيات (AI & Software)' },
    { id: 'culture', label: 'الذكاء والألعاب الذهنية (Brain & Culture)' },
    { id: 'networking', label: 'الشبكات وسرعة النت (Networking & Wi-Fi)' },
    { id: 'monetization', label: 'الربح من جوجل أدسنس (AdSense)' },
    { id: 'cloud', label: 'البنية السحابية (Cloud)' },
  ];

  const activeArticle = BLOG_POSTS.find(p => p.slug === selectedPostSlug);

  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const title = (post.title[currentLang] || post.title.en).toLowerCase();
    const excerpt = (post.excerpt[currentLang] || post.excerpt.en).toLowerCase();
    const q = searchQuery.toLowerCase();
    return matchesCategory && (title.includes(q) || excerpt.includes(q));
  });

  const handleLike = (id: string) => {
    if (hasLiked[id]) return;
    setLikes(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    setHasLiked(prev => ({ ...prev, [id]: true }));
  };

  const handleAddComment = (e: React.FormEvent, slug: string) => {
    e.preventDefault();
    if (!newCommentName.trim() || !newCommentText.trim()) return;

    const newComment = {
      id: String(Date.now()),
      name: newCommentName,
      text: newCommentText,
      date: 'الآن (مباشر)',
    };

    setComments(prev => ({
      ...prev,
      [slug]: [...(prev[slug] || []), newComment],
    }));

    setNewCommentName('');
    setNewCommentText('');
  };

  const handleGenerateAiSummary = async (content: string) => {
    setLoadingAiSummary(true);
    setAiSummary(null);

    try {
      const res = await fetch('/api/gemini/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `يرجى تلخيص هذا المقال التقني في 3 نقاط رئيسية مركزة باللغة (${currentLang}):\n\n${content}`,
          language: currentLang,
        }),
      });
      const data = await res.json();
      setAiSummary(data.reply);
    } catch {
      setAiSummary('يقدم هذا المقال دليلاً استراتيجياً لتحسين سرعة وأمان المواقع الإلكترونية ومطابقتها لمعايير Google AdSense لتعزيز تجربة التصفح وزيادة العوائد الرقمية.');
    } finally {
      setLoadingAiSummary(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* If an article is open in detailed view */}
      {activeArticle ? (
        <article className="max-w-4xl mx-auto space-y-8 animate-in fade-in">
          {/* Back button */}
          <button
            onClick={() => {
              onSelectPost(null);
              setAiSummary(null);
            }}
            className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/60 px-3 py-1.5 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
            <span>العودة لجميع المقالات</span>
          </button>

          {/* Article Header */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 font-bold px-3 py-1 rounded-full">
                {activeArticle.category}
              </span>
              <span className="text-slate-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {activeArticle.readTimeMin} {t.blog_read_time}
              </span>
              <span className="text-slate-400 flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" />
                {activeArticle.views.toLocaleString()} {t.blog_views}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white leading-tight">
              {activeArticle.title[currentLang] || activeArticle.title.en}
            </h1>

            {/* Author Meta */}
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

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleLike(activeArticle.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                    hasLiked[activeArticle.id]
                      ? 'bg-red-50 dark:bg-red-950 text-red-600 border border-red-200 dark:border-red-800'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200'
                  }`}
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>{likes[activeArticle.id] || activeArticle.likes}</span>
                </button>
              </div>
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

          {/* AI Quick Summary Generator Tool */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950/30 dark:to-indigo-950/30 border border-purple-200 dark:border-purple-800/50 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-purple-700 dark:text-purple-300 font-bold text-sm">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span>ملخص الذكاء الاصطناعي (Gemini 3.7 AI Summary)</span>
              </div>
              {!aiSummary && (
                <button
                  onClick={() => handleGenerateAiSummary(activeArticle.content[currentLang] || activeArticle.content.en)}
                  disabled={loadingAiSummary}
                  className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1 shadow-sm disabled:opacity-50"
                >
                  {loadingAiSummary ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>جاري التلخيص...</span>
                    </>
                  ) : (
                    <span>توليد ملخص فوري</span>
                  )}
                </button>
              )}
            </div>

            {aiSummary && (
              <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed animate-in fade-in">
                {aiSummary}
              </div>
            )}
          </div>

          {/* In-Article AdSense Placement */}
          <AdSensePlacement currentLang={currentLang} format="in-article" />

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
                    <span className="text-slate-700 dark:text-slate-300 font-semibold">{post.author.name}</span>
                  </div>
                  <span className="pt-3">{post.publishDate}</span>
                </div>
              </article>
            ))}
          </div>

          {/* AdSense Unit in Blog Index */}
          <AdSensePlacement currentLang={currentLang} format="leaderboard" />
        </div>
      )}
    </div>
  );
};
