export function isInsideAndroidApp(): boolean {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return false;
  }

  try {
    const params = new URLSearchParams(window.location.search);
    if (params.get('source') === 'app' || params.get('app') === '1') {
      return true;
    }
  } catch {
    // Ignore malformed query strings
  }

  const ua = navigator.userAgent || '';
  if (/; wv\)/i.test(ua)) {
    return true;
  }

  if (typeof (window as unknown as Record<string, unknown>).AppInventor !== 'undefined') {
    return true;
  }

  return false;
}
