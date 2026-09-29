import React, { useState } from 'react';
import { 
  Smartphone, 
  Layers, 
  Code, 
  Download, 
  Copy, 
  Check, 
  ExternalLink, 
  RefreshCw, 
  Wifi, 
  WifiOff, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Globe, 
  Terminal, 
  Sliders, 
  Palette, 
  Zap, 
  Share2,
  Maximize2,
  ArrowLeft,
  ChevronRight,
  Info
} from 'lucide-react';
import { Language } from '../types';

interface KodularAppCompanionModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
}

export const KodularAppCompanionModal: React.FC<KodularAppCompanionModalProps> = ({
  isOpen,
  onClose,
  currentLang,
}) => {
  const [activeTab, setActiveTab] = useState<'quickstart' | 'components' | 'blocks' | 'assets' | 'preview'>('quickstart');
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [copiedBlock, setCopiedBlock] = useState<string | null>(null);

  if (!isOpen) return null;

  const appLiveUrl = typeof window !== 'undefined' 
    ? (window.location.origin.includes('localhost') ? 'https://hanan.fun' : window.location.origin) 
    : 'https://hanan.fun';

  const isAr = currentLang === 'ar';

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    if (id === 'url') {
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2500);
    } else {
      setCopiedBlock(id);
      setTimeout(() => setCopiedBlock(null), 2500);
    }
  };

  const downloadIcon = (size: number) => {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, size, size);
    gradient.addColorStop(0, '#1d4ed8');
    gradient.addColorStop(0.5, '#2563eb');
    gradient.addColorStop(1, '#4f46e5');

    // Rounded rectangle shape
    const radius = size * 0.22;
    ctx.beginPath();
    ctx.moveTo(radius, 0);
    ctx.lineTo(size - radius, 0);
    ctx.quadraticCurveTo(size, 0, size, radius);
    ctx.lineTo(size, size - radius);
    ctx.quadraticCurveTo(size, size, size - radius, size);
    ctx.lineTo(radius, size);
    ctx.quadraticCurveTo(0, size, 0, size - radius);
    ctx.lineTo(0, radius);
    ctx.quadraticCurveTo(0, 0, radius, 0);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    // Inner subtle glow
    ctx.lineWidth = size * 0.02;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.stroke();

    // Globe icon draw
    const cx = size / 2;
    const cy = size / 2;
    const r = size * 0.28;

    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = size * 0.035;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();

    // Latitude horizontal lines
    ctx.beginPath();
    ctx.moveTo(cx - r * 0.95, cy);
    ctx.lineTo(cx + r * 0.95, cy);
    ctx.stroke();

    // Longitude vertical ellipse
    ctx.beginPath();
    ctx.ellipse(cx, cy, r * 0.45, r, 0, 0, Math.PI * 2);
    ctx.stroke();

    // App text below or monogram
    ctx.fillStyle = '#ffffff';
    ctx.font = `bold ${size * 0.1}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.fillText('GIS', cx, size * 0.88);

    // Download PNG
    const link = document.createElement('a');
    link.download = `kodular_app_icon_${size}x${size}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const downloadJsonConfig = () => {
    const configData = {
      appName: "Global Internet Services",
      appPackageName: "com.gis.globalservices",
      versionCode: 1,
      versionName: "1.0.0",
      appUrl: appLiveUrl,
      themeColors: {
        primaryColor: "#2563eb",
        primaryColorDark: "#0f172a",
        accentColor: "#10b981",
        statusBarColor: "#0f172a",
        navigationBarColor: "#0f172a"
      },
      kodularComponents: [
        {
          type: "Screen1",
          properties: {
            TitleVisible: false,
            ShowStatusBar: true,
            StatusBarColor: "#0f172a",
            NavigationBarColor: "#0f172a",
            Scrollable: false,
            BackgroundColor: "#0f172a"
          }
        },
        {
          type: "SwipeRefreshLayout",
          properties: {
            Width: "Fill Parent",
            Height: "Fill Parent",
            Color: "#2563eb"
          }
        },
        {
          type: "CustomWebView",
          properties: {
            HomeUrl: appLiveUrl,
            EnableJS: true,
            SupportMultipleWindows: false,
            ZoomDisplay: false,
            EnableZoom: false,
            CacheMode: "LOAD_DEFAULT",
            DesktopMode: false,
            PromptForPermission: true,
            UsesLocation: true,
            AutoFitScreen: true
          }
        },
        {
          type: "LinearProgressBar",
          properties: {
            Width: "Fill Parent",
            Indeterminate: false,
            Color: "#3b82f6"
          }
        },
        {
          type: "Network",
          properties: {}
        },
        {
          type: "Notifier",
          properties: {}
        }
      ]
    };

    const blob = new Blob([JSON.stringify(configData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'kodular_gis_app_config.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-4xl overflow-hidden max-h-[92vh] flex flex-col my-auto text-slate-900 dark:text-slate-100">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 p-5 sm:p-6 text-white shrink-0 relative">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-inner text-yellow-300">
                <Smartphone className="w-7 h-7" />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-[11px] font-black bg-white/20 text-white mb-1">
                  <Sparkles className="w-3 h-3 text-yellow-300" />
                  <span>{isAr ? 'دليل كوديلار الرسمي للمشروع' : 'Official Kodular Project Guide'}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black tracking-tight">
                  {isAr ? 'إنشاء تطبيق أندرويد متكامل على Kodular' : 'Build Exact Kodular Android App'}
                </h2>
                <p className="text-xs sm:text-sm text-blue-100 opacity-90">
                  {isAr ? 'بنفس الستايل والسرعة، الصفحات الكاملة، السلة، الألعاب، والوضع الليلي' : 'Same styling, full pages, store, games, dark mode & live updates'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center">
              <a 
                href="https://c.kodular.io" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl bg-white text-blue-800 hover:bg-blue-50 font-bold text-xs flex items-center gap-1.5 shadow-md transition-all hover:scale-105"
              >
                <span>فتح منصة كوديلار</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-white/15 rounded-xl transition text-white"
                aria-label="Close"
              >
                ✕
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 p-2 bg-slate-100 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 overflow-x-auto shrink-0 scrollbar-none">
          <button
            onClick={() => setActiveTab('quickstart')}
            className={`py-2 px-3.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'quickstart'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>{isAr ? '1. البدء السريع (5 دقائق)' : '1. Quick Setup'}</span>
          </button>

          <button
            onClick={() => setActiveTab('components')}
            className={`py-2 px-3.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'components'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>{isAr ? '2. شجرة المكونات والخصائص' : '2. Components & Properties'}</span>
          </button>

          <button
            onClick={() => setActiveTab('blocks')}
            className={`py-2 px-3.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'blocks'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <Code className="w-4 h-4" />
            <span>{isAr ? '3. البلوكات البرمجية (Blocks)' : '3. Kodular Blocks'}</span>
          </button>

          <button
            onClick={() => setActiveTab('assets')}
            className={`py-2 px-3.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'assets'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <Download className="w-4 h-4" />
            <span>{isAr ? '4. حزمة الأيقونات والإعدادات' : '4. Icons & Assets'}</span>
          </button>

          <button
            onClick={() => setActiveTab('preview')}
            className={`py-2 px-3.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'preview'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>{isAr ? '5. محاكي الجوال الحي' : '5. Live Mockup'}</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 text-sm">
          
          {/* TAB 1: QUICKSTART */}
          {activeTab === 'quickstart' && (
            <div className="space-y-6 animate-fadeIn">
              {/* Highlight Banner */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/30 border border-blue-200 dark:border-blue-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300 font-bold text-xs">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <span>{isAr ? 'أفضل وأسرع طريقة لمطابقة الستايل بنسبة 100%' : 'Best 100% Match Strategy'}</span>
                  </div>
                  <div className="font-bold text-base text-slate-900 dark:text-white">
                    {isAr 
                      ? 'بناء تطبيق هجين احترافي عبر Custom WebView في Kodular' 
                      : 'Professional Custom WebView Hybrid Architecture in Kodular'}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {isAr
                      ? 'هذه الطريقة تضمن أن يحتفظ التطبيق بنفس التصميم الأصلي تماماً، مع الألعاب التفاعلية، الوضع الليلي التلقائي، والاتصال بالـ API، بالإضافة إلى أن أي تعديل تجرينه في الموقع يظهر فوراً في التطبيق لدى المستخدمين دون الحاجة لرفع تحديث جديد إلى متجر جوجل بلاي.'
                      : 'Ensures 100% pixel-perfect design, dynamic cart, dark mode, audio-to-video studio, and instant live sync without recompiling APK.'}
                  </p>
                </div>
              </div>

              {/* Live URL Box */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <Globe className="w-4 h-4 text-blue-500" />
                    {isAr ? 'رابط تطبيقك الرئيسي (ضعيه في HomeUrl داخل كوديلار):' : 'Your Live Web App URL (Paste in HomeUrl):'}
                  </span>
                  <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">
                    ✓ جاهز ومحمي بـ SSL
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 font-mono text-xs text-blue-600 dark:text-blue-400 select-all truncate">
                    {appLiveUrl}
                  </div>
                  <button
                    onClick={() => handleCopy(appLiveUrl, 'url')}
                    className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all shrink-0"
                  >
                    {copiedUrl ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedUrl ? (isAr ? 'تم النسخ!' : 'Copied!') : (isAr ? 'نسخ الرابط' : 'Copy')}</span>
                  </button>
                </div>
              </div>

              {/* Step by Step Timeline */}
              <div className="space-y-4">
                <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-black">
                    ✓
                  </span>
                  {isAr ? 'خطوات العمل الأربع على موقع Kodular Creator:' : 'Four Easy Steps in Kodular Creator:'}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Step 1 */}
                  <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 space-y-2 hover:border-blue-400 transition-all">
                    <div className="flex items-center gap-2 font-bold text-blue-600 dark:text-blue-400">
                      <span className="w-6 h-6 rounded-lg bg-blue-100 dark:bg-blue-900/60 flex items-center justify-center text-xs">1</span>
                      <h4>{isAr ? 'إنشاء مشروع جديد' : 'Create New Project'}</h4>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {isAr
                        ? 'ادخلي على c.kodular.io، اضغطي على "Create Project"، وسمّي المشروع باسم GIS_App أو Hanan_Global. واختاري Theme: Light أو Dark.'
                        : 'Visit c.kodular.io, click Create Project, name it GIS_App and choose standard theme.'}
                    </p>
                  </div>

                  {/* Step 2 */}
                  <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 space-y-2 hover:border-blue-400 transition-all">
                    <div className="flex items-center gap-2 font-bold text-indigo-600 dark:text-indigo-400">
                      <span className="w-6 h-6 rounded-lg bg-indigo-100 dark:bg-indigo-900/60 flex items-center justify-center text-xs">2</span>
                      <h4>{isAr ? 'سحب المكونات الأساسية' : 'Drag Components'}</h4>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {isAr
                        ? 'اسحبي SwipeRefreshLayout، وبداخله اسحبي WebViewer (أو CustomWebView). ثم أضيفي مكون Network ومكون Notifier وشريط LinearProgress.'
                        : 'Drag SwipeRefreshLayout, place WebViewer inside it, add Network, Notifier, and LinearProgress.'}
                    </p>
                  </div>

                  {/* Step 3 */}
                  <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 space-y-2 hover:border-blue-400 transition-all">
                    <div className="flex items-center gap-2 font-bold text-purple-600 dark:text-purple-400">
                      <span className="w-6 h-6 rounded-lg bg-purple-100 dark:bg-purple-900/60 flex items-center justify-center text-xs">3</span>
                      <h4>{isAr ? 'تركيب البلوكات البرمجية' : 'Connect Blocks'}</h4>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {isAr
                        ? 'انتقلي لتبويب Blocks وركبي البلوكات الموضحة في تبويب البلوكات (خاصة زر الرجوع BackPressed والتحديث السلس وفحص الإنترنت).'
                        : 'Switch to Blocks tab and snap the 4 vital events: BackPressed, SwipeRefresh, PageLoaded, and Offline check.'}
                    </p>
                  </div>

                  {/* Step 4 */}
                  <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 space-y-2 hover:border-blue-400 transition-all">
                    <div className="flex items-center gap-2 font-bold text-emerald-600 dark:text-emerald-400">
                      <span className="w-6 h-6 rounded-lg bg-emerald-100 dark:bg-emerald-900/60 flex items-center justify-center text-xs">4</span>
                      <h4>{isAr ? 'تصدير ملف الـ APK أو AAB' : 'Export APK / AAB'}</h4>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {isAr
                        ? 'اضغطي على Export من الأعلى واختاري "Android App (.apk)" للتثبيت المباشر على هاتفك وتجربته فوراً، أو (.aab) للنشر على Google Play.'
                        : 'Click Export at the top and choose Android App (.apk) for instant installation on any phone!'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Pro Tip */}
              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-xs flex items-start gap-3">
                <Info className="w-5 h-5 shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
                <div>
                  <div className="font-bold mb-0.5">{isAr ? 'نصيحة ذهبية للحصول على إحساس التطبيق الأصلي (Native Feel):' : 'Pro Tip for Native App Feel:'}</div>
                  <div>
                    {isAr
                      ? 'احرصي في إعدادات WebViewer على تعطيل خاصية ZoomControlsVisible وضبط DesktopMode = false. هذا يمنع ظهور أزرار التكبير/التصغير الشفافة ويجعل التطبيق يملأ الشاشة بسلاسة مثل التطبيقات الاحترافية كـ تويتر وإنستغرام.'
                      : 'Set ZoomControlsVisible to False and DesktopMode to False in WebViewer properties. This eliminates browser zoom buttons and gives smooth native app touch.'}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: COMPONENTS & PROPERTIES */}
          {activeTab === 'components' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">
                    {isAr ? 'قائمة المكونات وإعداداتها الدقيقة في مصمم كوديلار (Designer)' : 'Designer Component Tree & Exact Properties'}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {isAr ? 'اضبطي هذه الخصائص تماماً لتحصلي على نفس الألوان والستايل الاحترافي' : 'Match these exact properties for luxury look and feel'}
                  </p>
                </div>
                <button
                  onClick={downloadJsonConfig}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center gap-1.5 transition"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{isAr ? 'تحميل ملف JSON' : 'Export JSON'}</span>
                </button>
              </div>

              {/* Component Cards */}
              <div className="space-y-3">
                {/* Screen1 */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-md bg-blue-600 text-white font-mono text-[10px] font-bold">Component</span>
                      <span className="font-bold text-sm text-slate-900 dark:text-white">Screen1 (الشاشة الرئيسية)</span>
                    </div>
                    <span className="text-xs text-blue-600 dark:text-blue-400 font-bold">الواجهة والتحكم بالنظام</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs">
                    <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <div className="text-slate-500 dark:text-slate-400 text-[10px]">TitleVisible</div>
                      <div className="font-mono font-bold text-purple-600 dark:text-purple-400">False (إخفاء شريط العنوان القديم)</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <div className="text-slate-500 dark:text-slate-400 text-[10px]">ShowStatusBar</div>
                      <div className="font-mono font-bold text-emerald-600 dark:text-emerald-400">True (مع لون مخصص)</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <div className="text-slate-500 dark:text-slate-400 text-[10px]">StatusBarColor</div>
                      <div className="font-mono font-bold text-blue-600 dark:text-blue-400">#0f172a (أو #2563eb)</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <div className="text-slate-500 dark:text-slate-400 text-[10px]">NavigationBarColor</div>
                      <div className="font-mono font-bold text-blue-600 dark:text-blue-400">#0f172a (كحلي ملكي)</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <div className="text-slate-500 dark:text-slate-400 text-[10px]">Scrollable</div>
                      <div className="font-mono font-bold text-amber-600 dark:text-amber-400">False (التمرير داخل الويب فيو)</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <div className="text-slate-500 dark:text-slate-400 text-[10px]">AppName</div>
                      <div className="font-mono font-bold text-slate-800 dark:text-slate-200">Global Internet Services</div>
                    </div>
                  </div>
                </div>

                {/* WebViewer / CustomWebView */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-md bg-indigo-600 text-white font-mono text-[10px] font-bold">Main Engine</span>
                      <span className="font-bold text-sm text-slate-900 dark:text-white">CustomWebView / WebViewer</span>
                    </div>
                    <span className="text-xs text-indigo-600 dark:text-indigo-400 font-bold">محرك عرض الموقع والصفحات</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs">
                    <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 sm:col-span-2">
                      <div className="text-slate-500 dark:text-slate-400 text-[10px]">HomeUrl</div>
                      <div className="font-mono font-bold text-blue-600 dark:text-blue-400 truncate">{appLiveUrl}</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <div className="text-slate-500 dark:text-slate-400 text-[10px]">JavaScriptEnabled</div>
                      <div className="font-mono font-bold text-emerald-600 dark:text-emerald-400">True (أساسي لتشغيل التفاعل)</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <div className="text-slate-500 dark:text-slate-400 text-[10px]">ZoomControlsVisible</div>
                      <div className="font-mono font-bold text-red-600 dark:text-red-400">False (حتى لا تظهر أزرار + و -)</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <div className="text-slate-500 dark:text-slate-400 text-[10px]">EnableHardwareAcceleration</div>
                      <div className="font-mono font-bold text-emerald-600 dark:text-emerald-400">True (لسرعة فائقة 60fps)</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <div className="text-slate-500 dark:text-slate-400 text-[10px]">PromptForPermission</div>
                      <div className="font-mono font-bold text-purple-600 dark:text-purple-400">True (لرفع الملفات وأداة الصوت)</div>
                    </div>
                  </div>
                </div>

                {/* Helper Components */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 space-y-1.5">
                    <div className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-1.5">
                      <RefreshCw className="w-3.5 h-3.5 text-blue-500" />
                      <span>SwipeRefreshLayout</span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal">
                      ضعي الـ WebViewer بداخله لتمكين سحب الشاشة لأسفل لتحديث الموقع. Color = #2563eb.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 space-y-1.5">
                    <div className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-1.5">
                      <Wifi className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Network (الاتصال)</span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal">
                      مكون غير مرئي يفحص حالة اتصال الإنترنت في هاتف المستخدم ويعرض تنبيهاً في حال انقطاع الشبكة.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 space-y-1.5">
                    <div className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-1.5">
                      <Sliders className="w-3.5 h-3.5 text-purple-500" />
                      <span>LinearProgressBar</span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal">
                      شريط تقدم أنيق جداً يوضع أعلى الـ WebViewer يظهر بنسبة التحميل ويختفي عند اكتمال الصفحة.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: BLOCKS CODE */}
          {activeTab === 'blocks' && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  {isAr ? 'البلوكات البرمجية الأساسية في Kodular (Blocks)' : 'Essential Kodular Blocks Logic'}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {isAr ? 'ركبي هذه البلوكات بالترتيب لتحصلي على تجربة تطبيق احترافية 100%' : 'Assemble these blocks in your Blocks tab'}
                </p>
              </div>

              {/* Block 1: BackPressed Handler */}
              <div className="p-4 rounded-2xl bg-slate-900 text-slate-100 border border-slate-700 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500" />
                    <span className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="font-bold text-xs text-blue-400 ml-2">1. أهم بلوك: زر الرجوع بالهاتف (Back Button Handler)</span>
                  </div>
                  <button
                    onClick={() => handleCopy(`when Screen1.BackPressed do
  if call WebViewer1.CanGoBack then
    call WebViewer1.GoBack
  else
    call Notifier1.ShowChooseDialog(
      message: "هل تريد حقاً الخروج من التطبيق؟",
      title: "تأكيد الخروج",
      button1Text: "نعم خروج",
      button2Text: "البقاء",
      cancelable: true
    )
end`, 'b1')}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-300 flex items-center gap-1 border border-slate-700"
                  >
                    {copiedBlock === 'b1' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedBlock === 'b1' ? 'تم النسخ' : 'نسخ'}</span>
                  </button>
                </div>
                <div className="font-mono text-xs text-emerald-400 bg-slate-950 p-3 rounded-xl border border-slate-800 leading-relaxed overflow-x-auto">
                  <p className="text-yellow-300">// يمنع إغلاق التطبيق فجأة ويسمح بالرجوع بين صفحات الموقع</p>
                  <p><span className="text-purple-400">when</span> <span className="text-blue-300">Screen1</span>.<span className="text-yellow-200">BackPressed</span> <span className="text-purple-400">do</span></p>
                  <p className="pl-4"><span className="text-purple-400">if</span> <span className="text-cyan-300">call WebViewer1.CanGoBack</span> <span className="text-purple-400">then</span></p>
                  <p className="pl-8"><span className="text-cyan-300">call WebViewer1.GoBack</span></p>
                  <p className="pl-4"><span className="text-purple-400">else</span></p>
                  <p className="pl-8"><span className="text-cyan-300">call Notifier1.ShowChooseDialog</span> (message: &quot;هل تريد الخروج؟&quot;, title: &quot;إغلاق&quot;, btn1: &quot;نعم&quot;, btn2: &quot;إلغاء&quot;)</p>
                </div>
              </div>

              {/* Block 2: SwipeRefreshLayout */}
              <div className="p-4 rounded-2xl bg-slate-900 text-slate-100 border border-slate-700 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-indigo-400">2. بلوك سحب الشاشة للتحديث (Pull to Refresh)</span>
                  </div>
                  <button
                    onClick={() => handleCopy(`when SwipeRefreshLayout1.OnRefresh do
  call WebViewer1.Reload
  set SwipeRefreshLayout1.Refreshing to false
end`, 'b2')}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-300 flex items-center gap-1 border border-slate-700"
                  >
                    {copiedBlock === 'b2' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedBlock === 'b2' ? 'تم النسخ' : 'نسخ'}</span>
                  </button>
                </div>
                <div className="font-mono text-xs text-emerald-400 bg-slate-950 p-3 rounded-xl border border-slate-800 leading-relaxed overflow-x-auto">
                  <p><span className="text-purple-400">when</span> <span className="text-blue-300">SwipeRefreshLayout1</span>.<span className="text-yellow-200">OnRefresh</span> <span className="text-purple-400">do</span></p>
                  <p className="pl-4"><span className="text-cyan-300">call WebViewer1.Reload</span></p>
                  <p className="pl-4"><span className="text-purple-400">set</span> <span className="text-blue-300">SwipeRefreshLayout1.Refreshing</span> <span className="text-purple-400">to</span> <span className="text-red-400">false</span></p>
                </div>
              </div>

              {/* Block 3: Progress & Page Loading */}
              <div className="p-4 rounded-2xl bg-slate-900 text-slate-100 border border-slate-700 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-purple-400">3. شريط تقدم التحميل الأنيق (Progress Bar Indicator)</span>
                  </div>
                  <button
                    onClick={() => handleCopy(`when WebViewer1.ProgressChanged (progress) do
  set LinearProgressBar1.Visible to true
  set LinearProgressBar1.Progress to progress

when WebViewer1.PageLoaded do
  set LinearProgressBar1.Visible to false`, 'b3')}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-300 flex items-center gap-1 border border-slate-700"
                  >
                    {copiedBlock === 'b3' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedBlock === 'b3' ? 'تم النسخ' : 'نسخ'}</span>
                  </button>
                </div>
                <div className="font-mono text-xs text-emerald-400 bg-slate-950 p-3 rounded-xl border border-slate-800 leading-relaxed overflow-x-auto">
                  <p><span className="text-purple-400">when</span> <span className="text-blue-300">WebViewer1</span>.<span className="text-yellow-200">ProgressChanged</span> (<span className="text-orange-300">progress</span>) <span className="text-purple-400">do</span></p>
                  <p className="pl-4"><span className="text-purple-400">set</span> <span className="text-blue-300">LinearProgressBar1.Visible</span> <span className="text-purple-400">to</span> <span className="text-emerald-400">true</span></p>
                  <p className="pl-4"><span className="text-purple-400">set</span> <span className="text-blue-300">LinearProgressBar1.Progress</span> <span className="text-purple-400">to</span> <span className="text-orange-300">progress</span></p>
                  <p className="mt-2"><span className="text-purple-400">when</span> <span className="text-blue-300">WebViewer1</span>.<span className="text-yellow-200">PageLoaded</span> <span className="text-purple-400">do</span></p>
                  <p className="pl-4"><span className="text-purple-400">set</span> <span className="text-blue-300">LinearProgressBar1.Visible</span> <span className="text-purple-400">to</span> <span className="text-red-400">false</span></p>
                </div>
              </div>

              {/* Block 4: Offline Alert */}
              <div className="p-4 rounded-2xl bg-slate-900 text-slate-100 border border-slate-700 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-amber-400">4. فحص انقطاع الإنترنت (Offline Notification)</span>
                  </div>
                  <button
                    onClick={() => handleCopy(`when Network1.OnDisconnect do
  call Notifier1.ShowAlert("لا يوجد اتصال بالإنترنت، يرجى التحقق من اتصال الشبكة")`, 'b4')}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-300 flex items-center gap-1 border border-slate-700"
                  >
                    {copiedBlock === 'b4' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedBlock === 'b4' ? 'تم النسخ' : 'نسخ'}</span>
                  </button>
                </div>
                <div className="font-mono text-xs text-emerald-400 bg-slate-950 p-3 rounded-xl border border-slate-800 leading-relaxed overflow-x-auto">
                  <p><span className="text-purple-400">when</span> <span className="text-blue-300">Network1</span>.<span className="text-yellow-200">OnDisconnect</span> <span className="text-purple-400">do</span></p>
                  <p className="pl-4"><span className="text-cyan-300">call Notifier1.ShowAlert</span> (notice: &quot;لا يوجد اتصال بالإنترنت، يرجى التحقق من الواي فاي أو بيانات الهاتف&quot;)</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: ASSETS & ICONS */}
          {activeTab === 'assets' && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  {isAr ? 'حزمة الأيقونات والألوان الرسمية لتطبيق كوديلار' : 'Official Kodular App Icons & Brand Palette'}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {isAr ? 'حملي الأيقونات المصممة بدقة عالية لرفعها في لوحة أصول كوديلار (Assets)' : 'High resolution launcher icons ready to download and upload into Kodular'}
                </p>
              </div>

              {/* Icon Download Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* 512x512 Store Icon */}
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
                      <Globe className="w-8 h-8" />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-slate-900 dark:text-white">أيقونة التطبيق عالية الدقة</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">512 × 512 px (PNG)</div>
                      <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">مناسبة لمتجر جوجل بلاي</div>
                    </div>
                  </div>
                  <button
                    onClick={() => downloadIcon(512)}
                    className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition"
                  >
                    <Download className="w-4 h-4" />
                    <span>تحميل</span>
                  </button>
                </div>

                {/* 192x192 Launcher Icon */}
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                      <Globe className="w-7 h-7" />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-slate-900 dark:text-white">أيقونة شاشة الهاتف (Launcher)</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">192 × 192 px (PNG)</div>
                      <div className="text-[11px] text-blue-600 dark:text-blue-400 font-medium">مخصصة لـ Screen1.Icon</div>
                    </div>
                  </div>
                  <button
                    onClick={() => downloadIcon(192)}
                    className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition"
                  >
                    <Download className="w-4 h-4" />
                    <span>تحميل</span>
                  </button>
                </div>
              </div>

              {/* Hex Color Palette for Kodular */}
              <div className="space-y-3">
                <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <Palette className="w-4 h-4 text-blue-500" />
                  <span>{isAr ? 'أكواد الألوان الرسمية (ضعيه في إعدادات ألوان كوديلار):' : 'Hex Colors for Kodular Theme Settings:'}</span>
                </h4>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 flex flex-col justify-between">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-4 h-4 rounded-full bg-[#0f172a] border border-slate-400" />
                      <span className="font-medium text-slate-700 dark:text-slate-300">StatusBarColor</span>
                    </div>
                    <div className="flex items-center justify-between font-mono font-bold text-slate-900 dark:text-white">
                      <span>#0F172A</span>
                      <button onClick={() => handleCopy('#0F172A', 'c1')} className="hover:text-blue-500">
                        {copiedBlock === 'c1' ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 flex flex-col justify-between">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-4 h-4 rounded-full bg-[#2563eb]" />
                      <span className="font-medium text-slate-700 dark:text-slate-300">PrimaryColor</span>
                    </div>
                    <div className="flex items-center justify-between font-mono font-bold text-slate-900 dark:text-white">
                      <span>#2563EB</span>
                      <button onClick={() => handleCopy('#2563EB', 'c2')} className="hover:text-blue-500">
                        {copiedBlock === 'c2' ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 flex flex-col justify-between">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-4 h-4 rounded-full bg-[#10b981]" />
                      <span className="font-medium text-slate-700 dark:text-slate-300">AccentColor</span>
                    </div>
                    <div className="flex items-center justify-between font-mono font-bold text-slate-900 dark:text-white">
                      <span>#10B981</span>
                      <button onClick={() => handleCopy('#10B981', 'c3')} className="hover:text-blue-500">
                        {copiedBlock === 'c3' ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 flex flex-col justify-between">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-4 h-4 rounded-full bg-[#020617] border border-slate-400" />
                      <span className="font-medium text-slate-700 dark:text-slate-300">Background Dark</span>
                    </div>
                    <div className="flex items-center justify-between font-mono font-bold text-slate-900 dark:text-white">
                      <span>#020617</span>
                      <button onClick={() => handleCopy('#020617', 'c4')} className="hover:text-blue-500">
                        {copiedBlock === 'c4' ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: LIVE MOCKUP PREVIEW */}
          {activeTab === 'preview' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">
                    {isAr ? 'معاينة حية لتطبيق أندرويد عبر هاتف افتراضي' : 'Live Interactive Android Phone Mockup'}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {isAr ? 'هكذا سيبدو التطبيق تماماً للمستخدمين عند تثبيت ملف الـ APK المصدر من كوديلار' : 'This is exactly how your app looks and behaves when opened on Android'}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    <span>متصل بمحرك الويب المباشر</span>
                  </span>
                </div>
              </div>

              {/* Realistic Phone Frame */}
              <div className="max-w-sm mx-auto bg-slate-950 rounded-[44px] p-3 shadow-2xl border-4 border-slate-800 ring-1 ring-slate-700 relative overflow-hidden">
                {/* Speaker & Camera Notch */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-32 h-4 bg-slate-900 rounded-full flex items-center justify-center gap-3 z-30 border border-slate-800">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-blue-900" />
                  </div>
                  <div className="w-10 h-1 rounded-full bg-slate-800" />
                </div>

                {/* Simulated Android Status Bar */}
                <div className="bg-[#0f172a] text-slate-300 text-[10px] px-5 pt-3 pb-1.5 flex justify-between items-center rounded-t-[34px] font-mono select-none z-20">
                  <span className="font-bold text-white">09:41</span>
                  <div className="flex items-center gap-2">
                    <Wifi className="w-3 h-3 text-slate-300" />
                    <span className="text-[9px]">5G</span>
                    <span className="w-4 h-2 rounded-xs border border-slate-300 flex items-center p-0.5">
                      <span className="w-full h-full bg-emerald-400 rounded-2xs" />
                    </span>
                  </div>
                </div>

                {/* WebViewer Container inside Phone */}
                <div className="relative w-full h-[520px] bg-slate-900 rounded-b-[34px] overflow-hidden border-t border-slate-800">
                  <iframe
                    src={appLiveUrl}
                    title="Live App Preview"
                    className="w-full h-full border-0 select-none"
                    loading="lazy"
                  />

                  {/* Simulated Android Bottom Navigation Bar */}
                  <div className="absolute bottom-0 inset-x-0 h-6 bg-[#0f172a]/95 backdrop-blur-xs flex items-center justify-center gap-12 z-20 border-t border-slate-800/60 pointer-events-none">
                    <div className="w-3 h-3 border-r-2 border-b-2 border-slate-400 rotate-135" />
                    <div className="w-3 h-3 rounded-full border-2 border-slate-400" />
                    <div className="w-3 h-3 rounded-xs border-2 border-slate-400" />
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/90 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0 text-xs">
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>{isAr ? 'نسخة التطبيق متطابقة 100% مع هانم/حنان (hanan.fun) وتدعم كافة المتصفحات' : '100% compatible with Kodular 2026 Android App Engine'}</span>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={downloadJsonConfig}
              className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 font-bold transition flex items-center justify-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isAr ? 'تنزيل ملف الإعدادات' : 'Download Spec'}</span>
            </button>
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition shadow-sm"
            >
              {isAr ? 'حسناً، فهمت' : 'Done'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
