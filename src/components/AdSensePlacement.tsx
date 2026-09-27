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
  currentLang = 'ar',
  slot,
  format = 'auto',
  className = '',
}) => {
  const adRef = useRef<HTMLModElement | null>(null);
  const containerRef = useRef<HTMLElement | null>(null);
  const [isUnfilled, setIsUnfilled] = useState(false);
  const [adLoaded, setAdLoaded] = useState(false);

  useEffect(() => {
    // Only attempt to push in browser environment
    if (typeof window === 'undefined') return;

    let observer: MutationObserver | null = null;

    try {
      // Monitor the <ins> element for AdSense status changes
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

        // Push ad unit request to Google AdSense
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch {
      // In case AdSense is blocked by an adblocker or script error, collapse smoothly
      setIsUnfilled(true);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);

  // If AdSense returns no ad (unfilled) or fails to load, collapse completely (0 height, no empty box)
  // This guarantees Google AdSense and visitors never see an unutilized space or blank box.
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
      {/* Official AdSense Unit: No dummy text, no fake buttons, no fake ads */}
      <div className="w-full flex justify-center items-center text-center">
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{ display: 'block', width: '100%', minWidth: '250px' }}
          data-ad-client="ca-pub-3298241753177072"
          {...(slot ? { 'data-ad-slot': slot } : {})}
          data-ad-format={format === 'in-article' ? 'fluid' : 'auto'}
          data-full-width-responsive="true"
        />
      </div>
    </aside>
  );
};
