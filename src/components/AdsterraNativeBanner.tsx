import React, { useEffect, useRef, useState } from 'react';
import { Language } from '../types';
import { getAdsterraConfig, AdsterraConfig } from '../utils/adsterraConfig';
import { AdsterraConfigModal } from './AdsterraConfigModal';

export interface AdsterraNativeBannerProps {
  currentLang?: Language;
  className?: string;
  showConfigTrigger?: boolean;
}

export const AdsterraNativeBanner: React.FC<AdsterraNativeBannerProps> = ({
  currentLang = 'ar',
  className = '',
  showConfigTrigger = false,
}) => {
  const [config, setConfig] = useState<AdsterraConfig>(getAdsterraConfig());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

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

  const containerId = config.nativeBannerContainerId;
  const scriptUrl = config.nativeBannerScriptUrl;

  useEffect(() => {
    if (!config.enabled || !containerId || !scriptUrl || !iframeRef.current) return;
    const doc = iframeRef.current.contentDocument || iframeRef.current.contentWindow?.document;
    if (!doc) return;

    doc.open();
    doc.write(`
      <!DOCTYPE html>
      <html dir="${currentLang === 'ar' ? 'rtl' : 'ltr'}">
        <head>
          <meta charset="utf-8">
          <base target="_blank">
          <style>
            body {
              margin: 0;
              padding: 6px;
              overflow: hidden;
              background: transparent;
              font-family: system-ui, -apple-system, sans-serif;
            }
            #${containerId} {
              width: 100%;
              min-height: 180px;
              display: flex;
              flex-wrap: wrap;
              justify-content: center;
              gap: 12px;
            }
          </style>
        </head>
        <body>
          <script async="async" data-cfasync="false" src="${scriptUrl}"></script>
          <div id="${containerId}"></div>
        </body>
      </html>
    `);
    doc.close();
  }, [config.enabled, containerId, scriptUrl, currentLang]);

  // If ads are disabled or no native banner code is set, render nothing
  if (!config.enabled || !containerId || !scriptUrl) {
    return null;
  }

  return (
    <aside
      aria-label="Sponsored Recommendation"
      className={`my-8 w-full overflow-hidden transition-all duration-300 ${className}`}
    >
      <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto">
        <div className="w-full flex flex-col items-center justify-center p-3 sm:p-4 rounded-3xl bg-slate-50/70 dark:bg-slate-900/60 border border-slate-200/70 dark:border-slate-800/70 shadow-xs">
          <div className="w-full flex justify-center overflow-hidden">
            <iframe
              ref={iframeRef}
              title="Native Recommendation Widget"
              className="w-full rounded-2xl"
              style={{
                border: 'none',
                minHeight: '220px',
                width: '100%',
                overflow: 'hidden',
              }}
              scrolling="no"
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
