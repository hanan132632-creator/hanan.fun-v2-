import React, { useEffect, useRef, useState } from 'react';
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
  showConfigTrigger = false,
}) => {
  const [config, setConfig] = useState<AdsterraConfig>(getAdsterraConfig());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  // If format is native, route to native banner widget
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
        const key = slot || config.banner300x250Key || '';
        return {
          width: 300,
          height: 250,
          key,
          label: '300×250 (Medium Rectangle)',
          scriptSrc: key ? `https://bauval.org/22/${key}` : '',
        };
      }
      case '468x60': {
        const key = slot || config.banner468x60Key || '';
        return {
          width: 468,
          height: 60,
          key,
          label: '468×60 (Banner)',
          scriptSrc: key ? `https://bauval.org/22/${key}` : '',
        };
      }
      case '320x50': {
        const key = slot || config.banner320x50Key || '';
        return {
          width: 320,
          height: 50,
          key,
          label: '320×50 (Mobile Leaderboard)',
          scriptSrc: key ? `https://bauval.org/22/${key}` : '',
        };
      }
      case '160x600': {
        const key = slot || config.banner160x600Key || '';
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
        const key = slot || config.banner728x90Key || '';
        return {
          width: 728,
          height: 90,
          key,
          label: '728×90 (Leaderboard)',
          scriptSrc: key ? `https://bauval.org/22/${key}` : '',
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

  // When ads are active and key is present, inject inside safe sandboxed iframe
  useEffect(() => {
    if (!config.enabled || !key || !scriptSrc || !iframeRef.current) return;

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
  }, [config.enabled, key, width, height, scriptSrc]);

  // If ads are disabled or no ad key exists, render nothing
  if (!config.enabled || !key) {
    return null;
  }

  return (
    <aside
      aria-label="Advertisement"
      className={`my-6 w-full overflow-hidden transition-all duration-300 ${className}`}
    >
      <div className="flex flex-col items-center justify-center w-full">
        <div 
          className="flex flex-col items-center justify-center p-2 rounded-2xl bg-slate-50/50 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800/60 shadow-xs"
          style={{ minHeight: `${height + 20}px`, maxWidth: '100%' }}
        >
          <div className="overflow-x-auto max-w-full flex justify-center">
            <iframe
              ref={iframeRef}
              title={`Advertisement ${label}`}
              width={width}
              height={height}
              scrolling="no"
              frameBorder="0"
              style={{ border: 'none', overflow: 'hidden', maxWidth: '100%' }}
            />
          </div>
        </div>
      </div>

      {showConfigTrigger && (
        <AdsterraConfigModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          currentLang={currentLang}
        />
      )}
    </aside>
  );
};
