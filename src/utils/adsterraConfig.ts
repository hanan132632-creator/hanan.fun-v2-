// Ad Network Configuration and Integration Manager

export interface AdsterraConfig {
  enabled: boolean;
  banner728x90Key: string;
  banner300x250Key: string;
  banner468x60Key: string;
  banner320x50Key: string;
  banner160x600Key: string;
  nativeBannerContainerId: string;
  nativeBannerScriptUrl: string;
  socialBarScriptUrl: string;
  popunderScriptUrl: string;
  directLinkUrl: string;
  customScriptCode: string;
}

const STORAGE_KEY = 'adsterra_config_v3';

// All Adsterra codes deleted and disabled by default
export const DEFAULT_ADSTERRA_CONFIG: AdsterraConfig = {
  enabled: false,
  banner728x90Key: '',
  banner300x250Key: '',
  banner468x60Key: '',
  banner320x50Key: '',
  banner160x600Key: '',
  nativeBannerContainerId: '',
  nativeBannerScriptUrl: '',
  socialBarScriptUrl: '',
  popunderScriptUrl: '',
  directLinkUrl: '',
  customScriptCode: '',
};

export const getAdsterraConfig = (): AdsterraConfig => {
  if (typeof window === 'undefined') return DEFAULT_ADSTERRA_CONFIG;
  try {
    // Purge older localStorage keys that may have had Adsterra codes stored
    localStorage.removeItem('adsterra_config_v2');
    localStorage.removeItem('adsterra_config');

    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_ADSTERRA_CONFIG;
    const parsed = JSON.parse(raw);
    return {
      enabled: Boolean(parsed.enabled),
      banner728x90Key: parsed.banner728x90Key || '',
      banner300x250Key: parsed.banner300x250Key || '',
      banner468x60Key: parsed.banner468x60Key || '',
      banner320x50Key: parsed.banner320x50Key || '',
      banner160x600Key: parsed.banner160x600Key || '',
      nativeBannerContainerId: parsed.nativeBannerContainerId || '',
      nativeBannerScriptUrl: parsed.nativeBannerScriptUrl || '',
      socialBarScriptUrl: parsed.socialBarScriptUrl || '',
      popunderScriptUrl: parsed.popunderScriptUrl || '',
      directLinkUrl: parsed.directLinkUrl || '',
      customScriptCode: parsed.customScriptCode || '',
    };
  } catch {
    return DEFAULT_ADSTERRA_CONFIG;
  }
};

export const saveAdsterraConfig = (config: Partial<AdsterraConfig>): AdsterraConfig => {
  if (typeof window === 'undefined') return DEFAULT_ADSTERRA_CONFIG;
  try {
    const current = getAdsterraConfig();
    const updated = { ...current, ...config };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('adsterra_config_updated', { detail: updated }));
    applyGlobalAdsterraScripts(updated);
    return updated;
  } catch {
    return DEFAULT_ADSTERRA_CONFIG;
  }
};

export const clearAllAdsterraCodes = (): AdsterraConfig => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem('adsterra_config_v2');
      localStorage.removeItem('adsterra_config');
    } catch {}
    window.dispatchEvent(new CustomEvent('adsterra_config_updated', { detail: DEFAULT_ADSTERRA_CONFIG }));
    applyGlobalAdsterraScripts(DEFAULT_ADSTERRA_CONFIG);
  }
  return DEFAULT_ADSTERRA_CONFIG;
};

// Automatically manage Social Bar or Popunder scripts in DOM
export const applyGlobalAdsterraScripts = (config: AdsterraConfig) => {
  if (typeof window === 'undefined') return;

  // Social Bar script
  const existingSocialBar = document.getElementById('adsterra-socialbar-script');
  if (config.enabled && config.socialBarScriptUrl && config.socialBarScriptUrl.trim()) {
    const url = config.socialBarScriptUrl.trim();
    if (!existingSocialBar) {
      const script = document.createElement('script');
      script.id = 'adsterra-socialbar-script';
      script.type = 'text/javascript';
      script.src = url;
      script.async = true;
      document.head.appendChild(script);
    } else if (existingSocialBar instanceof HTMLScriptElement && existingSocialBar.src !== url) {
      existingSocialBar.src = url;
    }
  } else if (existingSocialBar) {
    existingSocialBar.remove();
  }

  // Popunder script
  const existingPopunder = document.getElementById('adsterra-popunder-script');
  if (config.enabled && config.popunderScriptUrl && config.popunderScriptUrl.trim()) {
    const url = config.popunderScriptUrl.trim();
    if (!existingPopunder) {
      const script = document.createElement('script');
      script.id = 'adsterra-popunder-script';
      script.type = 'text/javascript';
      script.src = url;
      script.async = true;
      document.body.appendChild(script);
    } else if (existingPopunder instanceof HTMLScriptElement && existingPopunder.src !== url) {
      existingPopunder.src = url;
    }
  } else if (existingPopunder) {
    existingPopunder.remove();
  }
};

export interface ParsedAdsterraSnippet {
  key?: string;
  width?: number;
  height?: number;
  scriptUrl?: string;
  containerId?: string;
  isNative?: boolean;
  isPopunder?: boolean;
}

// Helper parser: Extracts key/container/script if user inputs custom snippets in the future
export const parseAdsterraKeyFromSnippet = (snippet: string): ParsedAdsterraSnippet => {
  if (!snippet) return {};
  const cleaned = snippet.trim();
  
  // 1. Check for native container widget: <div id="container-..."> and <script src="https://bauval.org/21/...">
  const containerMatch = cleaned.match(/id=['"](container-[a-f0-9]{32})['"]/i);
  const nativeScriptMatch = cleaned.match(/src=['"](https?:\/\/[^'"]*bauval\.org\/21\/[a-f0-9]{32})['"]/i);
  if (containerMatch || nativeScriptMatch) {
    return {
      containerId: containerMatch ? containerMatch[1] : undefined,
      scriptUrl: nativeScriptMatch ? nativeScriptMatch[1] : undefined,
      isNative: true,
    };
  }

  // 2. Check for popunder / direct url: araplhn.org/... or similar domain
  if (/https?:\/\/(?:araplhn\.org|alwingulla\.com)\/\d+\/[a-f0-9]{32}/i.test(cleaned)) {
    const urlMatch = cleaned.match(/https?:\/\/[^\s"'<>]+/i);
    return {
      scriptUrl: urlMatch ? urlMatch[0] : cleaned,
      isPopunder: true,
    };
  }

  // 3. If it's just a 32-char hex string (zone key)
  if (/^[a-f0-9]{32}$/i.test(cleaned)) {
    return { key: cleaned };
  }

  // 4. Check for atOptions key
  const keyMatch = cleaned.match(/['"]key['"]\s*:\s*['"]([a-f0-9]{32})['"]/i);
  const widthMatch = cleaned.match(/['"]width['"]\s*:\s*(\d+)/i);
  const heightMatch = cleaned.match(/['"]height['"]\s*:\s*(\d+)/i);
  const scriptMatch = cleaned.match(/src=['"](https?:\/\/[^'"]+)['"]/i);

  if (keyMatch && keyMatch[1]) {
    return {
      key: keyMatch[1],
      width: widthMatch ? parseInt(widthMatch[1], 10) : undefined,
      height: heightMatch ? parseInt(heightMatch[1], 10) : undefined,
      scriptUrl: scriptMatch ? scriptMatch[1] : undefined,
    };
  }

  // 5. Check script src for key: //.../xxxxxxx/invoke.js or bauval.org/22/{key}
  const invokeMatch = cleaned.match(/(?:highperformanceformat\.com\/([a-f0-9]{32})\/invoke\.js|bauval\.org\/22\/([a-f0-9]{32}))/i);
  if (invokeMatch) {
    const key = invokeMatch[1] || invokeMatch[2];
    return { key };
  }

  return {};
};
