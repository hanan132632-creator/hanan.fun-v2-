import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, Sliders } from 'lucide-react';
import { Language } from '../types';
import { getAdsterraConfig, AdsterraConfig } from '../utils/adsterraConfig';
import { AdsterraConfigModal } from './AdsterraConfigModal';
import { AdsterraNativeBanner } from './AdsterraNativeBanner';

export type AdsterraFormat =
  | '728x90'
  | '300x250'
  | '468x60'
  | '320x50'
  | '160x600'
  | 'leaderboard'
  | 'rectangle'
  | 'in-article'
  | 'auto'
  | 'fluid'
  | 'native';

export interface AdsterraPlacementProps {
  currentLang?: Language;
  format?: AdsterraFormat;
  slot?: string;
  className?: string;
  showConfigTrigger?: boolean;
}

export const AdsterraPlacement: React.FC<AdsterraPlacementProps> = ({
  currentLang = 'ar',
  format = 'leaderboard',
  slot,
  className = '',
  showConfigTrigger = true,
}) => {
  const [config, setConfig] = useState<AdsterraConfig>(getAdsterraConfig());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  // If format is native, render native banner widget
  if (format === 'native') {
    return (
      <AdsterraNativeBanner
        currentLang={currentLang}
        className={className}
        showConfigTrigger={showConfigTrigger}
      />
    );
  }

  // Normalize ad format dimensions and keys
  const getDimensions = (): { width: number; height: number; key: string; label: string; scriptSrc: string } => {
    switch (format) {
      case '300x250':
      case 'rectangle':
      case 'in-article': {
        const key = slot || config.banner300x250Key || 'b562406eb2c26b3659aeff704c14eedb';
        return {
          width: 300,
          height: 250,
          key,
          label: '300×250 (Medium Rectangle)',
          scriptSrc: `https://bauval.org/22/${key}`,
        };
      }
      case '468x60': {
        const key = slot || config.banner468x60Key;
        return {
          width: 468,
          height: 60,
          key,
          label: '468×60 (Banner)',
          scriptSrc: key ? `https://bauval.org/22/${key}` : '',
        };
      }
      case '320x50': {
        const key = slot || config.banner320x50Key;
        return {
          width: 320,
          height: 50,
          key,
          label: '320×50 (Mobile Leaderboard)',
          scriptSrc: key ? `https://bauval.org/22/${key}` : '',
        };
      }
      case '160x600': {
        const key = slot || config.banner160x600Key;
        return {
          width: 160,
          height: 600,
          key,
          label: '160×600 (Skyscraper)',
          scriptSrc: key ? `https://bauval.org/22/${key}` : '',
        };
      }
      case '728x90':
      case 'leaderboard':
      case 'auto':
      case 'fluid':
      default: {
        const key = slot || config.banner728x90Key || '0b08b5dfb1ac0c289fe86d53b6afd7ae';
        return {
          width: 728,
          height: 90,
          key,
          label: '728×90 (Leaderboard)',
          scriptSrc: `https://bauval.org/22/${key}`,
        };
      }
    }
  };

  const { width, height, key, label, scriptSrc } = getDimensions();

  // Listen for config updates
  useEffect(() => {
    const handleUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<AdsterraConfig>;
      if (customEvent.detail) {
        setConfig(customEvent.detail);
      } else {
        setConfig(getAdsterraConfig());
      }
    };

    window.addEventListener('adsterra_config_updated', handleUpdate);
    return () => window.removeEventListener('adsterra_config_updated', handleUpdate);
  }, []);

  // When key is present, inject Adsterra code inside safe sandboxed iframe
  useEffect(() => {
    if (!key || !iframeRef.current) return;

    const doc = iframeRef.current.contentDocument || iframeRef.current.contentWindow?.document;
    if (!doc) return;

    doc.open();
    doc.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <base target="_blank">
          <style>
            body {
              margin: 0;
              padding: 0;
              overflow: hidden;
              display: flex;
              justify-content: center;
              align-items: center;
              background: transparent;
            }
          </style>
        </head>
        <body>
          <script type="text/javascript">
            atOptions = {
              'key' : '${key}',
              'format' : 'iframe',
              'height' : ${height},
              'width' : ${width},
              'params' : {}
            };
          </script>
          <script type="text/javascript" src="${scriptSrc}"></script>
        </body>
      </html>
    `);
    doc.close();
  }, [key, width, height, scriptSrc]);

  return (
    <aside
      aria-label="Adsterra Advertisement"
      className={`my-6 w-full overflow-hidden transition-all duration-300 adsterra-banner-container ${className}`}
    >
      <div className="flex flex-col items-center justify-center w-full">
        {key ? (
          /* Render Active Adsterra Banner inside sandboxed iframe */
          <div 
            className="flex flex-col items-center justify-center p-2 rounded-2xl bg-slate-50/50 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800/60 shadow-xs"
            style={{ minHeight: `${height + 20}px`, maxWidth: '100%' }}
          >
            <div className="text-[10px] text-slate-400 font-semibold mb-1 uppercase tracking-wider flex items-center gap-1">
              <span>إعلان شبكة Adsterra</span>
              {showConfigTrigger && (
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="text-slate-400 hover:text-orange-500 cursor-pointer transition ms-2"
                  title="تعديل أكواد Adsterra"
                >
                  <Sliders className="w-3 h-3" />
                </button>
              )}
            </div>
            <div className="overflow-x-auto max-w-full flex justify-center">
              <iframe
                ref={iframeRef}
                title={`Adsterra Ad ${label}`}
                width={width}
                height={height}
                scrolling="no"
                frameBorder="0"
                style={{ border: 'none', overflow: 'hidden', maxWidth: '100%' }}
              />
            </div>
          </div>
        ) : (
          /* Clean, modern placeholder showing readiness for Adsterra */
          <div 
            className="relative w-full rounded-2xl border-2 border-dashed border-orange-300/80 dark:border-orange-500/30 bg-gradient-to-br from-orange-50/60 via-amber-50/30 to-white dark:from-slate-900/80 dark:via-orange-950/20 dark:to-slate-900 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-start transition-all hover:border-orange-400"
            style={{ maxWidth: `${Math.max(width + 40, 680)}px` }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-600 dark:text-orange-400 shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm flex items-center justify-center sm:justify-start gap-2">
                  <span>مساحة إعلانية Adsterra Network</span>
                  <span className="px-2 py-0.5 rounded-md bg-orange-100 dark:bg-orange-950/80 text-orange-700 dark:text-orange-300 text-[10px] font-mono">
                    {label}
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  تم تهيئة المساحة لشبكة Adsterra.
                </div>
              </div>
            </div>

            {showConfigTrigger && (
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs shadow-sm hover:shadow transition flex items-center gap-1.5 shrink-0 cursor-pointer"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>إدارة أكواد Adsterra</span>
              </button>
            )}
          </div>
        )}
      </div>

      <AdsterraConfigModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currentLang={currentLang}
      />
    </aside>
  );
};
