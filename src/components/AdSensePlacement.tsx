import React from 'react';
import { ExternalLink, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../locales/translations';

interface AdSensePlacementProps {
  currentLang: Language;
  format?: 'leaderboard' | 'in-article' | 'sidebar' | 'rectangle';
  className?: string;
}

export const AdSensePlacement: React.FC<AdSensePlacementProps> = ({
  currentLang,
  format = 'leaderboard',
  className = '',
}) => {
  const t = TRANSLATIONS[currentLang];

  return (
    <aside aria-label="Advertisement" className={`my-8 max-w-full overflow-hidden ${className}`}>
      {/* Policy Label */}
      <div className="flex items-center justify-between px-2 py-1 text-[10px] uppercase font-bold tracking-widest text-slate-500 dark:text-slate-400">
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
          {t.ad_sponsored}
        </span>
        <span className="flex items-center gap-1 text-[9px] hover:underline cursor-pointer">
          <Sparkles className="w-2.5 h-2.5 text-blue-500" />
          <span>Google AdSense Unit</span>
          <ExternalLink className="w-2.5 h-2.5" />
        </span>
      </div>

      {/* Visual Ad Unit Container */}
      <div className="relative rounded-xl border border-dashed border-slate-300 dark:border-slate-700 bg-gradient-to-r from-slate-100 via-blue-50/50 to-slate-100 dark:from-slate-900 dark:via-blue-950/20 dark:to-slate-900 p-4 flex flex-col sm:flex-row items-center justify-between gap-4 transition-all hover:border-blue-400 dark:hover:border-blue-600">
        <div className="flex items-center gap-4 text-start">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-black text-xl shrink-0 shadow-sm">
            Ad
          </div>
          <div>
            <div className="font-bold text-sm text-slate-800 dark:text-slate-200">
              حلول استضافة السيرفرات السحابية والشبكات العالمية | Global Edge Servers
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
              سرعات فائقة تصل إلى 10Gbps، دعم فني متواصل على مدار الساعة، وحماية DDoS شاملة.
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <span className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 bg-blue-100/60 dark:bg-blue-900/40 px-2.5 py-1 rounded-md">
            GIS Verified Partner
          </span>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all shadow-sm">
            اكتشف العروض
          </button>
        </div>
      </div>
    </aside>
  );
};
