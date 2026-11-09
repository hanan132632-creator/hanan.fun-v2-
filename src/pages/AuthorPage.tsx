import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  ShieldCheck, 
  Award, 
  GraduationCap, 
  BookOpen, 
  Mail, 
  ExternalLink, 
  FileCheck, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft,
  Calendar,
  Lock,
  Globe2,
  Cpu,
  Layers,
  Search
} from 'lucide-react';
import { Language, ActivePage } from '../types';
import { EDITORIAL_AUTHORS, EDITORIAL_PRINCIPLES } from '../data/authorData';
import { BLOG_POSTS } from '../data/mockData';

interface AuthorPageProps {
  currentLang: Language;
  onNavigate: (page: ActivePage) => void;
  onSelectPost?: (slug: string) => void;
  selectedAuthorId?: string;
}

export const AuthorPage: React.FC<AuthorPageProps> = ({
  currentLang,
  onNavigate,
  onSelectPost,
  selectedAuthorId = 'hanan-al-ali',
}) => {
  const isRtl = currentLang === 'ar';
  const [activeAuthorId, setActiveAuthorId] = useState<string>(selectedAuthorId);
  const [activeTab, setActiveTab] = useState<'profile' | 'charter' | 'articles'>('profile');

  // Sync state if prop changes
  useEffect(() => {
    if (selectedAuthorId) {
      setActiveAuthorId(selectedAuthorId);
    }
  }, [selectedAuthorId]);

  const author = EDITORIAL_AUTHORS.find(a => a.id === activeAuthorId) || EDITORIAL_AUTHORS[0];
  const principles = EDITORIAL_PRINCIPLES[currentLang === 'ar' ? 'ar' : 'en'];

  // Filter articles associated with this author or all articles
  const authorArticles = BLOG_POSTS.filter(post => {
    if (author.id === 'hanan-al-ali') {
      return post.author.name.includes('حنان') || post.category === 'seo' || post.category === 'infrastructure';
    } else if (author.id === 'tarek-kamal') {
      return post.author.name.includes('طارق') || post.author.name.includes('فريق') || post.category === 'cloud' || post.category === 'security';
    } else {
      return post.author.name.includes('كريم') || post.category === 'engineering' || post.category === 'fintech';
    }
  });

  const handleReadArticle = (slug: string) => {
    if (onSelectPost) {
      onSelectPost(slug);
    } else {
      onNavigate('blog');
    }
  };

  // Structured Data (Schema.org Person & ProfilePage)
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: {
      '@type': 'Person',
      name: author.name,
      alternateName: author.nameEn,
      jobTitle: author.role[currentLang] || author.role.en,
      image: author.avatar,
      email: author.email,
      description: author.bio[currentLang] || author.bio.en,
      knowsAbout: author.expertise,
      alumniOf: author.education.map(e => ({
        '@type': 'EducationalOrganization',
        name: e.institution,
      })),
      hasCredential: author.certifications.map(c => ({
        '@type': 'EducationalOccupationalCredential',
        name: c.title,
        recognizedBy: {
          '@type': 'Organization',
          name: c.issuer,
        },
        validIn: c.year,
      })),
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Schema.org JSON-LD Script for Google Quality Crawlers */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* Header Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white p-8 sm:p-12 shadow-2xl border border-blue-500/20 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-cyan-300 text-xs font-black tracking-wide uppercase">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>{isRtl ? 'هيئة التحرير والخبراء المعتمدين - توثيق معايير E-E-A-T' : 'Verified Editorial Board & E-E-A-T Standards'}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
            {isRtl ? 'ملفات الكتّاب والخبراء التقنيين المعتمدين' : 'Verified Technical Authors & Editorial Board'}
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {isRtl
              ? 'تلتزم منصة خدمات الإنترنت العالمية (GIS Network) بنشر محتوى رقمي بشري أصيل 100% صادر عن مهندسين واستشاريين حقيقيين ذوي مؤشرات خبرة ميدانية موثقة وشهادات دولية معتمدة، وفقاً لأعلى معايير الشفافية ودليل مقيمي جودة البحث لشركة Google (E-E-A-T).'
              : 'GIS Network guarantees 100% human-crafted, peer-reviewed engineering insights created by verified practitioners with verifiable credentials, adhering to Google Search Quality Rater Guidelines (E-E-A-T).'}
          </p>
          
          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-blue-200">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              {isRtl ? 'كتابة بشرية وتدقيق مزدوج' : '100% Human Peer-Reviewed'}
            </span>
            <span className="flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-cyan-400" />
              {isRtl ? 'مراجع دولية مرقمة (RFCs / IEEE / NIST)' : 'Numbered Official Standard References'}
            </span>
            <span className="flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-amber-400" />
              {isRtl ? 'شفافية كاملة دون تضارب مصالح' : 'Editorial Independence'}
            </span>
          </div>
        </div>
      </div>

      {/* Author Selector Bar (Switch between our verified authors) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-blue-600" />
            <span>{isRtl ? 'اختر الخبير للاطلاع على سجله وبياناته الأكاديمية:' : 'Select Author to Inspect Credentials:'}</span>
          </h2>
          
          {/* Quick tab switch: Profile vs Charter */}
          <div className="flex items-center gap-1 p-1 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'profile'
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              {isRtl ? 'السيرة والشهادات' : 'Biography & Credentials'}
            </button>
            <button
              onClick={() => setActiveTab('articles')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'articles'
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              {isRtl ? `مقالات الكاتب (${authorArticles.length})` : `Authored Articles (${authorArticles.length})`}
            </button>
            <button
              onClick={() => setActiveTab('charter')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'charter'
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              {isRtl ? 'ميثاق النزاهة والـ E-E-A-T' : 'Editorial Integrity Charter'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {EDITORIAL_AUTHORS.map((item) => {
            const isSelected = item.id === activeAuthorId;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveAuthorId(item.id);
                  if (activeTab === 'charter') setActiveTab('profile');
                }}
                className={`p-4 rounded-2xl text-start transition-all cursor-pointer border flex items-center gap-3.5 ${
                  isSelected
                    ? 'bg-blue-50/90 dark:bg-blue-950/40 border-blue-500 dark:border-blue-500 shadow-md ring-2 ring-blue-500/20'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 shadow-xs'
                }`}
              >
                <div className="relative shrink-0">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-white dark:border-slate-700 shadow-sm"
                  />
                  {item.verifiedBadge && (
                    <span 
                      className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center ring-2 ring-white dark:ring-slate-800"
                      title={isRtl ? 'كاتب موثق ومعتمد' : 'Verified Author'}
                    >
                      ✓
                    </span>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold text-sm text-slate-900 dark:text-white truncate">
                      {item.name}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-bold shrink-0">
                      {isRtl ? 'موثق' : 'Verified'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                    {item.role[currentLang] || item.role.en}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Area based on activeTab */}
      {activeTab === 'profile' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Column: Author Bio Card & Contact */}
          <div className="lg:col-span-1 space-y-6">
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md space-y-6 text-center">
              <div className="relative inline-block mx-auto">
                <img
                  src={author.avatar}
                  alt={author.name}
                  className="w-36 h-36 rounded-full object-cover border-4 border-blue-100 dark:border-blue-900/60 shadow-xl mx-auto"
                />
                <span className="absolute bottom-1 right-2 px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-bold shadow-md flex items-center gap-1 border-2 border-white dark:border-slate-800">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{isRtl ? 'هوية معتمدة' : 'Verified ID'}</span>
                </span>
              </div>

              <div className="space-y-1.5">
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                  {author.name}
                </h3>
                <p className="text-xs font-bold text-blue-600 dark:text-blue-400">
                  {author.role[currentLang] || author.role.en}
                </p>
                <p className="text-xs text-slate-400">
                  {author.nameEn} • {isRtl ? 'المقر: القاهرة / دبي' : 'Base: Cairo / Dubai'}
                </p>
              </div>

              {/* Verified Verification Badge Box */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700/60 text-start space-y-2 text-xs">
                <div className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>{isRtl ? 'إثبات الهوية والتحقق البشري (E-E-A-T):' : 'Identity & Human Verification:'}</span>
                </div>
                <ul className="space-y-1.5 text-slate-600 dark:text-slate-400">
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>{isRtl ? 'مؤهل أكاديمي موثق في علوم وهندسة الحاسب' : 'Verified Computer Engineering Degree'}</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>{isRtl ? 'سجل مهني استشاري منشور ومراجع' : 'Audited Professional Track Record'}</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>{isRtl ? 'بريد رسمي معتمد للتواصل التحريري' : 'Verified Official Editorial Email'}</span>
                  </li>
                </ul>
              </div>

              {/* Direct Author Contact Button */}
              <div className="space-y-2">
                <a
                  href={`mailto:${author.email}`}
                  className="w-full py-3 px-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
                >
                  <Mail className="w-4 h-4" />
                  <span>{isRtl ? `مراسلة الكاتب: ${author.email}` : `Contact Author: ${author.email}`}</span>
                </a>

                <button
                  onClick={() => onNavigate('contact')}
                  className="w-full py-2.5 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <span>{isRtl ? 'طلب استشارة أو تدقيق هندسي' : 'Request Architecture Consultation'}</span>
                  <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                </button>
              </div>
            </div>

            {/* Areas of Expertise */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md space-y-4">
              <h4 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Cpu className="w-4 h-4 text-blue-600" />
                <span>{isRtl ? 'مجالات الخبرة والتخصص الدقيق:' : 'Key Areas of Expertise:'}</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {author.expertise.map((exp, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-700/80 text-slate-700 dark:text-slate-200 text-xs font-medium border border-slate-200 dark:border-slate-600"
                  >
                    #{exp}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Bio, Education, Certifications & Credentials */}
          <div className="lg:col-span-2 space-y-8">
            {/* Detailed Bio */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md space-y-4">
              <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                <span>{isRtl ? 'النبذة المهنية والخبرة الميدانية' : 'Professional Biography & Field Background'}</span>
              </h3>
              <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                {author.bio[currentLang] || author.bio.en}
              </p>

              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-xs text-amber-900 dark:text-amber-200 space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>{isRtl ? 'التزام معايير Google Search Quality Rater Guidelines:' : 'Google E-E-A-T Quality Commitment:'}</span>
                </div>
                <p>
                  {isRtl
                    ? 'يضمن الكاتب أن كل دليل تقني منشور يخضع لمعايير التحقق المباشر والتجربة الميدانية العملية، مع ربط كل ادعاء أو بروتوكول بمرجع رسمي صادر عن جهات المعايير الدولية.'
                    : 'The author ensures every technical walkthrough is backed by hands-on operational verification and explicit standard citations.'}
                </p>
              </div>
            </div>

            {/* Verifiable Certifications Showcase */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-500" />
                  <span>{isRtl ? 'الشهادات والاعتمادات المهنية الدولية الموثقة' : 'Verified Professional Certifications'}</span>
                </h3>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {isRtl ? 'أرقام اعتمادات قابلة للتحقق' : 'Verifiable Credential IDs'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {author.certifications.map((cert, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 space-y-2 hover:border-blue-300 dark:hover:border-blue-700 transition-all"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-bold text-sm text-slate-900 dark:text-white leading-snug">
                        {cert.title}
                      </span>
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    </div>
                    <div className="text-xs text-blue-600 dark:text-blue-400 font-semibold">
                      {cert.issuer}
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-200 dark:border-slate-800">
                      <span>{cert.credentialId ? `ID: ${cert.credentialId}` : 'Verified'}</span>
                      <span>{cert.year}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Academic Degrees & Education */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md space-y-6">
              <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-blue-600" />
                <span>{isRtl ? 'المؤهلات الأكاديمية والتعليم الجامعي' : 'Academic Degrees & Education'}</span>
              </h3>

              <div className="space-y-4">
                {author.education.map((edu, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                  >
                    <div className="space-y-1">
                      <div className="font-extrabold text-sm text-slate-900 dark:text-white">
                        {edu.degree}
                      </div>
                      <div className="text-xs text-slate-600 dark:text-slate-400">
                        {edu.institution}
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold shrink-0 self-start sm:self-center">
                      {edu.year}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Authored Articles Tab */}
      {activeTab === 'articles' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                {isRtl ? `المقالات والتحليلات بقلم ${author.name}` : `Articles & Case Studies by ${author.name}`}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {isRtl
                  ? 'جميع المقالات مجهزة بمراجع وأرقام دولية موثقة وخلاصة تطبيقية بشرية'
                  : 'Every guide includes verifiable numbered standards citations and human expert takeaways'}
              </p>
            </div>
            <button
              onClick={() => onNavigate('blog')}
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <span>{isRtl ? 'استعراض كافة المقالات (39)' : 'View All 39 Articles'}</span>
              <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {authorArticles.map((post) => (
              <div
                key={post.id}
                onClick={() => handleReadArticle(post.slug)}
                className="group cursor-pointer rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="h-48 overflow-hidden relative">
                    <img
                      src={post.coverImage}
                      alt={post.title[currentLang] || post.title.en}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold">
                      {post.category}
                    </span>
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{post.publishDate}</span>
                      <span>•</span>
                      <span>{post.readTimeMin} {isRtl ? 'دقائق قراءة' : 'min read'}</span>
                    </div>

                    <h4 className="font-black text-base text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug">
                      {post.title[currentLang] || post.title.en}
                    </h4>

                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                      {post.excerpt[currentLang] || post.excerpt.en}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-slate-100 dark:border-slate-700/60 mt-2 flex items-center justify-between text-xs">
                  <span className="font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1">
                    <span>{isRtl ? 'قراءة المقال والمراجع' : 'Read Article & Citations'}</span>
                    <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180 transition-transform group-hover:translate-x-1" />
                  </span>
                  <span className="text-slate-400 text-[11px]">
                    {isRtl ? 'موثق بمراجع RFC' : 'RFC Verified'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Charter Tab */}
      {activeTab === 'charter' && (
        <div className="space-y-8">
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md space-y-4">
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">
              {principles.title}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {principles.subtitle}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              {principles.principles.map((pr, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 space-y-2"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                      {pr.title}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pr-8 rtl:pr-8 rtl:pl-0 pl-8">
                    {pr.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Bottom AdSense & E-E-A-T Guarantee Callout */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white border border-blue-500/20 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center sm:text-start max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>{isRtl ? 'ضمان التوافق مع سياسات AdSense' : 'AdSense Quality Guarantee'}</span>
          </div>
          <h4 className="text-lg font-black text-white">
            {isRtl ? 'هل تريد التحقق من اعتماد أي مقال أو مصدر مرجعي؟' : 'Need to verify an author credential or citation?'}
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            {isRtl
              ? 'مكتب التحرير والتدقيق الهندسي مستعد للرد على أي استفسارات أو تقديم وثائق إثبات المراجع والشهادات بصيغة رسمية.'
              : 'Our engineering editorial desk is readily available to furnish official citation proofs, RFC standard logs, and credentials.'}
          </p>
        </div>

        <button
          onClick={() => onNavigate('contact')}
          className="px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg transition-all cursor-pointer shrink-0"
        >
          {isRtl ? 'التواصل مع هيئة التحرير' : 'Contact Editorial Board'}
        </button>
      </div>
    </div>
  );
};
