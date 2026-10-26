import React, { useState, useEffect } from 'react';
import { X, Sparkles, Check, Key, Sliders, ExternalLink, ShieldCheck, Code, Globe, HelpCircle, Layers } from 'lucide-react';
import { AdsterraConfig, getAdsterraConfig, saveAdsterraConfig, parseAdsterraKeyFromSnippet } from '../utils/adsterraConfig';
import { Language } from '../types';

interface AdsterraConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang?: Language;
}

export const AdsterraConfigModal: React.FC<AdsterraConfigModalProps> = ({
  isOpen,
  onClose,
  currentLang = 'ar',
}) => {
  const [config, setConfig] = useState<AdsterraConfig>(getAdsterraConfig());
  const [rawSnippet, setRawSnippet] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [parseMessage, setParseMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setConfig(getAdsterraConfig());
      setSaveSuccess(false);
      setParseMessage(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    saveAdsterraConfig(config);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      onClose();
    }, 1200);
  };

  const handleParseSnippet = () => {
    if (!rawSnippet.trim()) return;
    const parsed = parseAdsterraKeyFromSnippet(rawSnippet);

    if (parsed.isNative) {
      setConfig(prev => ({
        ...prev,
        nativeBannerContainerId: parsed.containerId || prev.nativeBannerContainerId,
        nativeBannerScriptUrl: parsed.scriptUrl || prev.nativeBannerScriptUrl,
      }));
      setParseMessage('تم بنجاح استخراج كود الإعلان الأصلي (Native Banner Widget)!');
      setRawSnippet('');
      return;
    }

    if (parsed.isPopunder && parsed.scriptUrl) {
      setConfig(prev => ({
        ...prev,
        popunderScriptUrl: parsed.scriptUrl!,
        directLinkUrl: parsed.scriptUrl!,
      }));
      setParseMessage('تم بنجاح استخراج رابط كود Popunder!');
      setRawSnippet('');
      return;
    }

    if (parsed.key) {
      // Determine format based on width/height
      if (parsed.width === 728 || parsed.height === 90) {
        setConfig(prev => ({ ...prev, banner728x90Key: parsed.key! }));
        setParseMessage(`تم استخراج مفتاح البانر (728x90): ${parsed.key}`);
      } else if (parsed.width === 300 || parsed.height === 250) {
        setConfig(prev => ({ ...prev, banner300x250Key: parsed.key! }));
        setParseMessage(`تم استخراج مفتاح المستطيل (300x250): ${parsed.key}`);
      } else if (parsed.width === 468 || parsed.height === 60) {
        setConfig(prev => ({ ...prev, banner468x60Key: parsed.key! }));
        setParseMessage(`تم استخراج مفتاح البانر (468x60): ${parsed.key}`);
      } else if (parsed.width === 320 || parsed.height === 50) {
        setConfig(prev => ({ ...prev, banner320x50Key: parsed.key! }));
        setParseMessage(`تم استخراج مفتاح الموبايل (320x50): ${parsed.key}`);
      } else {
        setConfig(prev => ({ ...prev, banner728x90Key: parsed.key! }));
        setParseMessage(`تم استخراج مفتاح Adsterra: ${parsed.key}`);
      }
      setRawSnippet('');
    } else {
      setParseMessage('يرجى لصق كود Adsterra بالكامل أو المفتاح.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        dir={currentLang === 'ar' ? 'rtl' : 'ltr'}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-red-600 via-orange-500 to-amber-500 flex items-center justify-center text-white shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900 dark:text-white">
                إدارة أكواد شبكة Adsterra الإعلانية
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                تم دمج أكوادك الإعلانية النشطة من أديسترا (728x90, 300x250, Native Banner, Popunder).
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 text-xs sm:text-sm">
          {/* Status banner */}
          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300">
            <ShieldCheck className="w-5 h-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
            <div>
              <div className="font-bold text-xs">أكواد Adsterra مفعلة ونشطة في الموقع بنجاح</div>
              <div className="text-[11px] opacity-90">جميع الوحدات الإعلانية مرتبطة بمفاتيح حسابك الرسمية في Adsterra.</div>
            </div>
          </div>

          {/* Smart Auto-Paste Extractor */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-3">
            <div className="flex items-center gap-2 font-bold text-slate-800 dark:text-slate-200 text-xs">
              <Code className="w-4 h-4 text-orange-500" />
              <span>مستخرج الكود التلقائي (لإضافة أو تبديل أي كود إعلاني):</span>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="الصق كود الإعلان من Adsterra هنا..."
                value={rawSnippet}
                onChange={(e) => setRawSnippet(e.target.value)}
                className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button
                type="button"
                onClick={handleParseSnippet}
                className="px-4 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-xl text-xs hover:opacity-90 transition shrink-0 cursor-pointer"
              >
                استخراج وتطبيق
              </button>
            </div>
            {parseMessage && (
              <div className="text-[11px] font-semibold text-orange-600 dark:text-orange-400">
                {parseMessage}
              </div>
            )}
          </div>

          {/* Form Fields for different Adsterra Formats */}
          <div className="space-y-4">
            <div className="font-bold text-slate-900 dark:text-white text-xs flex items-center justify-between">
              <span>الوحدات الإعلانية الحالية في الموقع:</span>
              <a
                href="https://publishers.adsterra.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
              >
                <span>لوحة تحكم Adsterra</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* 728x90 Leaderboard */}
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                <span>1. إعلان البانر الرئيسي (728x90 Leaderboard)</span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded">نشط</span>
              </label>
              <input
                type="text"
                placeholder="مفتاح 728x90..."
                value={config.banner728x90Key}
                onChange={(e) => setConfig({ ...config, banner728x90Key: e.target.value.trim() })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <div className="text-[10px] text-slate-400 font-mono">
                كود الاستدعاء: https://bauval.org/22/{config.banner728x90Key || '0b08b5dfb1ac0c289fe86d53b6afd7ae'}
              </div>
            </div>

            {/* 300x250 Medium Rectangle */}
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                <span>2. إعلان المستطيل المتوسط (300x250 Medium Rectangle)</span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded">نشط</span>
              </label>
              <input
                type="text"
                placeholder="مفتاح 300x250..."
                value={config.banner300x250Key}
                onChange={(e) => setConfig({ ...config, banner300x250Key: e.target.value.trim() })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <div className="text-[10px] text-slate-400 font-mono">
                كود الاستدعاء: https://bauval.org/22/{config.banner300x250Key || 'b562406eb2c26b3659aeff704c14eedb'}
              </div>
            </div>

            {/* Native Banner Widget */}
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                <span>3. إعلان المحتوى التوصيات الأصلي (Native Banner Widget)</span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded">نشط</span>
              </label>
              <input
                type="text"
                placeholder="معرف الحاوية (مثال: container-b97039801efb0b5f74f184e78b7b804b)..."
                value={config.nativeBannerContainerId}
                onChange={(e) => setConfig({ ...config, nativeBannerContainerId: e.target.value.trim() })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 mb-1"
              />
              <input
                type="text"
                placeholder="رابط اسكربت الودجت (مثال: https://bauval.org/21/b97039801efb0b5f74f184e78b7b804b)..."
                value={config.nativeBannerScriptUrl}
                onChange={(e) => setConfig({ ...config, nativeBannerScriptUrl: e.target.value.trim() })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            {/* Popunder / Direct link */}
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                <span>4. كود البوب اندر والرابط المباشر (Popunder / Direct Link)</span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded">نشط</span>
              </label>
              <input
                type="text"
                placeholder="رابط اسكربت Popunder (مثال: https://araplhn.org/4/d3989e991fb1c21847bb2d1b4081d92b)..."
                value={config.popunderScriptUrl}
                onChange={(e) => setConfig({ ...config, popunderScriptUrl: e.target.value.trim(), directLinkUrl: e.target.value.trim() })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/40">
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-slate-400" />
            <span>يتم الحفظ فورياً وتحديث الإعلانات بدون إعادة تحميل الصفحة.</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold transition cursor-pointer"
            >
              إغلاق
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-6 py-2.5 bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 text-white font-bold rounded-xl text-xs hover:opacity-90 transition flex items-center gap-1.5 shadow-md shadow-orange-500/20 cursor-pointer"
            >
              {saveSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>تم حفظ وتفعيل أكواد Adsterra!</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>تطبيق وحفظ التعديلات</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
