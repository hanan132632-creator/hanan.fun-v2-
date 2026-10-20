import React, { useEffect, useRef, useState } from 'react';
import { Language } from '../types';

declare global {
  interface Window {
    adsbygoogle?: any[];
  }
}

interface AdSensePlacementProps {
  currentLang?: Language;
  slot?: string;
  format?: 'auto' | 'fluid' | 'in-article' | 'leaderboard' | 'rectangle';
  className?: string;
}

export const AdSensePlacement: React.FC<AdSensePlacementProps> = ({
  slot,
  format = 'auto',
  className = '',
}) => {
  const adRef = useRef<HTMLModElement | null>(null);
  const containerRef = useRef<HTMLElement | null>(null);
  const [isUnfilled, setIsUnfilled] = useState(false);
  const [adLoaded, setAdLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let observer: MutationObserver | null = null;

    try {
      if (adRef.current) {
        observer = new MutationObserver((mutations) => {
          for (const mutation of mutations) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'data-ad-status') {
              const status = adRef.current?.getAttribute('data-ad-status');
              if (status === 'unfilled') {
                setIsUnfilled(true);
              } else if (status === 'filled') {
                setAdLoaded(true);
                setIsUnfilled(false);
              }
            }
          }
        });

        observer.observe(adRef.current, { attributes: true });

        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch {
      setIsUnfilled(true);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);

  if (isUnfilled) {
    return null;
  }

  return (
    <aside
      ref={containerRef}
      aria-label="Advertisement"
      className={`my-6 w-full overflow-hidden transition-all duration-300 ${adLoaded ? 'opacity-100' : 'opacity-90'} ${className}`}
      style={{ minHeight: adLoaded ? 'auto' : '0px' }}
    >
      <div className="w-full flex justify-center items-center text-center">
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{ display: 'block', width: '100%', minWidth: '250px' }}
          data-ad-client=""
          {...(slot ? { 'data-ad-slot': slot } : {})}
          data-ad-format={format === 'in-article' ? 'fluid' : 'auto'}
          data-full-width-responsive="true"
        />
      </div>
    </aside>
  );
};


