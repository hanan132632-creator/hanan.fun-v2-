import React, { useEffect, useRef } from 'react';
import { Language } from '../types';

export interface AdSensePlacementProps {
  currentLang?: Language;
  format?: 'auto' | 'fluid' | 'rectangle' | 'leaderboard' | 'in-article' | '300x250' | '728x90' | 'native';
  slot?: string;
  className?: string;
  client?: string;
  responsive?: boolean;
}

export const ADSENSE_CLIENT_ID = 'ca-pub-8161307018337815';

declare global {
  interface Window {
    adsbygoogle?: Array<Record<string, unknown>>;
  }
}

export const AdSensePlacement: React.FC<AdSensePlacementProps> = ({
  currentLang = 'ar',
  format = 'auto',
  slot,
  className = '',
  client = ADSENSE_CLIENT_ID,
  responsive = true,
}) => {
  const adRef = useRef<HTMLModElement | null>(null);
  const pushedRef = useRef(false);

  useEffect(() => {
    if (pushedRef.current) return;
    try {
      if (typeof window !== 'undefined') {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        pushedRef.current = true;
      }
    } catch {
      // Suppress duplicate push or blocker warnings in client
    }
  }, []);

  const isArticle = format === 'in-article';
  const isLeaderboard = format === '728x90' || format === 'leaderboard';
  const isRectangle = format === '300x250' || format === 'rectangle';

  return (
    <aside
      aria-label="Google Advertisement"
      className={`my-6 w-full flex flex-col items-center justify-center overflow-hidden ${className}`}
    >
      <div className="w-full flex justify-center text-center">
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{
            display: 'block',
            textAlign: isArticle ? 'center' : undefined,
            minHeight: isLeaderboard ? '90px' : isRectangle ? '250px' : '60px',
            width: '100%',
          }}
          data-ad-client={client}
          {...(slot ? { 'data-ad-slot': slot } : {})}
          {...(isArticle
            ? { 'data-ad-layout': 'in-article', 'data-ad-format': 'fluid' }
            : { 'data-ad-format': 'auto' })}
          data-full-width-responsive={responsive ? 'true' : 'false'}
        />
      </div>
    </aside>
  );
};

export default AdSensePlacement;
