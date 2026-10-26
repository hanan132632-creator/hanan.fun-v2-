import React, { useState, useEffect } from 'react';
import { X, Sparkles, Check, Key, Sliders, ExternalLink, ShieldCheck, Code, Globe, HelpCircle, Layers, Trash2, Power } from 'lucide-react';
import { AdsterraConfig, getAdsterraConfig, saveAdsterraConfig, clearAllAdsterraCodes, parseAdsterraKeyFromSnippet } from '../utils/adsterraConfig';
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

  const handleClearAll = () => {
    const cleared = clearAllAdsterraCodes();
    setConfig(cleared);
    setParseMessage('تم حذف وإلغاء جميع أكواد ومفاتيح الإعلانات بنجاح.');
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  const handleParseSnippet = () => {
    if (!rawSnippet.trim()) return;
    const parsed = parseAdsterraKeyFromSnippet(rawSnippet);

    if (parsed.isNative) {
      setConfig(prev => ({
        ...prev,
        enabled: true,
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
        enabled: true,
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
        setConfig(prev => ({ ...prev, enabled: true, banner728x90Key: parsed.key! }));
        setParseMessage(`تم استخراج مفتاح البانر (728x90): ${parsed.key}`);
      } else if (parsed.width === 300 || parsed.height === 250) {
        setConfig(prev => ({ ...prev, enabled: true, banner300x250Key: parsed.key! }));
        setParseMessage(`تم استخراج مفتاح المستطيل (300x250): ${parsed.key}`);
      } else if (parsed.width === 468 || parsed.height === 60) {
        setConfig(prev => ({ ...prev, enabled: true, banner468x60Key: parsed.key! }));
        setParseMessage(`تم استخراج مفتاح البانر (468x60): ${parsed.key}`);
      } else if (parsed.width === 320 || parsed.height === 50) {
        setConfig(prev => ({ ...prev, enabled: true, banner320x50Key: parsed.key! }));
        setParseMessage(`تم استخراج مفتاح الموبايل (320x50): ${parsed.key}`);
      } else {
        setConfig(prev => ({ ...prev, enabled: true, banner728x90Key: parsed.key! }));
        setParseMessage(`تم استخراج المفتاح: ${parsed.key}`);
      }
      setRawSnippet('');
    } else {
      setParseMessage('يرجى لصق كود الإعلان بالكامل أو المفتاح.');
    }
  };

  const hasAnyKey = Boolean(
    config.banner728x90Key ||
    config.banner300x250Key ||
    config.nativeBannerScriptUrl ||
    config.popunderScriptUrl
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        dir={currentLang === 'ar' ? 'rtl' : 'ltr'}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-900 dark:from-slate-600 dark:to-slate-800 flex items-center justify-center text-white shadow-md">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900 dark:text-white">
                إدارة الأكواد الإعلانية
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                حذف، تفعيل، أو تعديل الأكواد الإعلانية على المنصة.
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
          {hasAnyKey && config.enabled ? (
            <div className="flex items-center justify-between gap-3 p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800/60 text-amber-800 dark:text-amber-300">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 shrink-0 text-amber-600 dark:text-amber-400" />
                <div>
                  <div className="font-bold text-xs">أكواد إعلانية موجودة</div>
                  <div className="text-[11px] opacity-90">يمكنك حذف جميع الأكواد بنقرة زر أدناه.</div>
                </div>
              </div>
              <button
                type="button"
                onClick={handleClearAll}
                className="px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center gap-1 transition shadow-xs cursor-pointer shrink-0"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>حذف الكل</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300">
              <ShieldCheck className="w-5 h-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
              <div>
                <div className="font-bold text-xs">تم حذف جميع أكواد Adsterra بنجاح</div>
                <div className="text-[11px] opacity-90">الموقع نظيف وخالٍ تماماً من أي سكريبتات أو إعلانات طرف ثالث.</div>
              </div>
            </div>
          )}

          {/* Quick Clear All Button */}
          {hasAnyKey && (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleClearAll}
                className="px-4 py-2 bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/60 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/60 font-bold text-xs flex items-center gap-2 transition cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                <span>حذف وتفريغ جميع أكواد ومفاتيح الإعلانات فوراً</span>
              </button>
            </div>
          )}

          {/* Smart Auto-Paste Extractor */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-3">
            <div className="flex items-center gap-2 font-bold text-slate-800 dark:text-slate-200 text-xs">
              <Code className="w-4 h-4 text-blue-500" />
              <span>مستخرج الكود (في حال رغبت بإضافة كود إعلاني جديد):</span>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="الصق كود الإعلان هنا إذا أردت إضافته مستقبلاً..."
                value={rawSnippet}
                onChange={(e) => setRawSnippet(e.target.value)}
                className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={handleParseSnippet}
                className="px-4 py-2.5 bg-blue-600 text-white font-bold rounded-xl text-xs hover:bg-blue-700 transition shrink-0 cursor-pointer"
              >
                استخراج
              </button>
            </div>
            {parseMessage && (
              <div className="text-[11px] font-semibold text-blue-600 dark:text-blue-400">
                {parseMessage}
              </div>
            )}
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div className="font-bold text-slate-900 dark:text-white text-xs flex items-center justify-between">
              <span>حقول الوحدات الإعلانية (فارغة ومحذوفة):</span>
            </div>

            {/* 728x90 Leaderboard */}
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                <span>1. إعلان البانر (728x90 Leaderboard)</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${config.banner728x90Key ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60' : 'text-slate-400 bg-slate-100 dark:bg-slate-800'}`}>
                  {config.banner728x90Key ? 'محدد' : 'محذوف'}
                </span>
              </label>
              <input
                type="text"
                placeholder="لا يوجد مفتاح (محذوف)..."
                value={config.banner728x90Key}
                onChange={(e) => setConfig({ ...config, banner728x90Key: e.target.value.trim() })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* 300x250 Medium Rectangle */}
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                <span>2. إعلان المستطيل المتوسط (300x250 Medium Rectangle)</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${config.banner300x250Key ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60' : 'text-slate-400 bg-slate-100 dark:bg-slate-800'}`}>
                  {config.banner300x250Key ? 'محدد' : 'محذوف'}
                </span>
              </label>
              <input
                type="text"
                placeholder="لا يوجد مفتاح (محذوف)..."
                value={config.banner300x250Key}
                onChange={(e) => setConfig({ ...config, banner300x250Key: e.target.value.trim() })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Native Banner Widget */}
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                <span>3. إعلان التوصيات الأصلي (Native Banner Widget)</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${config.nativeBannerScriptUrl ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60' : 'text-slate-400 bg-slate-100 dark:bg-slate-800'}`}>
                  {config.nativeBannerScriptUrl ? 'محدد' : 'محذوف'}
                </span>
              </label>
              <input
                type="text"
                placeholder="معرف الحاوية (محذوف)..."
                value={config.nativeBannerContainerId}
                onChange={(e) => setConfig({ ...config, nativeBannerContainerId: e.target.value.trim() })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 mb-1"
              />
              <input
                type="text"
                placeholder="رابط اسكربت الودجت (محذوف)..."
                value={config.nativeBannerScriptUrl}
                onChange={(e) => setConfig({ ...config, nativeBannerScriptUrl: e.target.value.trim() })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Popunder / Direct link */}
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                <span>4. كود البوب اندر والرابط المباشر (Popunder / Direct Link)</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${config.popunderScriptUrl ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60' : 'text-slate-400 bg-slate-100 dark:bg-slate-800'}`}>
                  {config.popunderScriptUrl ? 'محدد' : 'محذوف'}
                </span>
              </label>
              <input
                type="text"
                placeholder="رابط اسكربت Popunder (محذوف)..."
                value={config.popunderScriptUrl}
                onChange={(e) => setConfig({ ...config, popunderScriptUrl: e.target.value.trim(), directLinkUrl: e.target.value.trim() })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/40">
          <button
            type="button"
            onClick={handleClearAll}
            className="px-4 py-2.5 rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>تفريغ الأكواد بالكامل</span>
          </button>

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
              className="px-6 py-2.5 bg-blue-600 text-white font-bold rounded-xl text-xs hover:bg-blue-700 transition flex items-center gap-1.5 shadow-md cursor-pointer"
            >
              {saveSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>تم حفظ الحالة!</span>
                </>
              ) : (
                <span>حفظ التغييرات</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
