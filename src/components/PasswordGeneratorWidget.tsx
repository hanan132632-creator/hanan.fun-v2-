import React, { useState, useEffect, useMemo } from 'react';
import { 
  KeyRound, 
  Copy, 
  Check, 
  RefreshCw, 
  ShieldCheck, 
  ShieldAlert, 
  Sparkles, 
  Lock, 
  Eye, 
  EyeOff, 
  Sliders, 
  Share2, 
  Layers, 
  Fingerprint, 
  Zap, 
  CheckCircle2, 
  AlertTriangle,
  Info
} from 'lucide-react';
import { Language } from '../types';

interface PasswordGeneratorWidgetProps {
  currentLang: Language;
}

type GeneratorMode = 'random' | 'passphrase' | 'pin';

const WORD_BANK_AR = [
  'نجم', 'صقر', 'نهر', 'بحر', 'قمر', 'شمس', 'جبل', 'واحة', 'فجر', 'درع', 
  'سيف', 'فارس', 'حكمة', 'نور', 'أمل', 'سلام', 'راية', 'عزم', 'قوة', 'مجد',
  'طاقة', 'سحاب', 'مطر', 'زهرة', 'ياقوت', 'زمرد', 'ذهب', 'فضة', 'بريق', 'أصيل'
];

const WORD_BANK_EN = [
  'Falcon', 'Summit', 'Oasis', 'Shield', 'Thunder', 'Knight', 'Orbit', 'Galaxy',
  'Mirage', 'Crystal', 'Matrix', 'Vector', 'Cyber', 'Zenith', 'Echo', 'Titan',
  'Radiant', 'Starlight', 'Aurora', 'Vortex', 'Phoenix', 'Quantum', 'Shadow', 'Beacon'
];

const UPPERCASE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWERCASE_CHARS = 'abcdefghijklmnopqrstuvwxyz';
const NUMBER_CHARS = '0123456789';
const SYMBOL_CHARS = '!@#$%^&*()_+-=[]{}|;:,.<>?';
const AMBIGUOUS_CHARS = 'il1Lo0O';

export const PasswordGeneratorWidget: React.FC<PasswordGeneratorWidgetProps> = ({ currentLang }) => {
  const isAr = currentLang === 'ar';

  const [mode, setMode] = useState<GeneratorMode>('random');
  const [length, setLength] = useState<number>(16);
  const [useUpper, setUseUpper] = useState<boolean>(true);
  const [useLower, setUseLower] = useState<boolean>(true);
  const [useNumbers, setUseNumbers] = useState<boolean>(true);
  const [useSymbols, setUseSymbols] = useState<boolean>(true);
  const [excludeAmbiguous, setExcludeAmbiguous] = useState<boolean>(false);

  // Passphrase options
  const [wordCount, setWordCount] = useState<number>(4);
  const [separator, setSeparator] = useState<string>('-');
  const [passphraseIncludeNumber, setPassphraseIncludeNumber] = useState<boolean>(true);
  const [passphraseLang, setPassphraseLang] = useState<'ar' | 'en'>(isAr ? 'ar' : 'en');

  // PIN options
  const [pinLength, setPinLength] = useState<number>(6);

  // Output states
  const [password, setPassword] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const [bulkList, setBulkList] = useState<string[]>([]);
  const [showBulk, setShowBulk] = useState<boolean>(false);
  const [copyBulkSuccess, setCopyBulkSuccess] = useState<boolean>(false);

  // Generate single password function
  const generatePassword = () => {
    let result = '';

    if (mode === 'random') {
      let charPool = '';
      let requiredChars: string[] = [];

      let cleanUpper = UPPERCASE_CHARS;
      let cleanLower = LOWERCASE_CHARS;
      let cleanNumbers = NUMBER_CHARS;
      let cleanSymbols = SYMBOL_CHARS;

      if (excludeAmbiguous) {
        cleanUpper = cleanUpper.split('').filter(c => !AMBIGUOUS_CHARS.includes(c)).join('');
        cleanLower = cleanLower.split('').filter(c => !AMBIGUOUS_CHARS.includes(c)).join('');
        cleanNumbers = cleanNumbers.split('').filter(c => !AMBIGUOUS_CHARS.includes(c)).join('');
      }

      if (useUpper) {
        charPool += cleanUpper;
        requiredChars.push(cleanUpper[Math.floor(Math.random() * cleanUpper.length)]);
      }
      if (useLower) {
        charPool += cleanLower;
        requiredChars.push(cleanLower[Math.floor(Math.random() * cleanLower.length)]);
      }
      if (useNumbers) {
        charPool += cleanNumbers;
        requiredChars.push(cleanNumbers[Math.floor(Math.random() * cleanNumbers.length)]);
      }
      if (useSymbols) {
        charPool += cleanSymbols;
        requiredChars.push(cleanSymbols[Math.floor(Math.random() * cleanSymbols.length)]);
      }

      if (!charPool) {
        charPool = cleanLower || LOWERCASE_CHARS;
      }

      // Fill remaining length
      const targetLen = Math.max(requiredChars.length, length);
      for (let i = requiredChars.length; i < targetLen; i++) {
        const randomIndex = Math.floor(Math.random() * charPool.length);
        requiredChars.push(charPool[randomIndex]);
      }

      // Shuffle securely
      for (let i = requiredChars.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [requiredChars[i], requiredChars[j]] = [requiredChars[j], requiredChars[i]];
      }

      result = requiredChars.join('');

    } else if (mode === 'passphrase') {
      const words = passphraseLang === 'ar' ? WORD_BANK_AR : WORD_BANK_EN;
      const selectedWords: string[] = [];
      for (let i = 0; i < wordCount; i++) {
        const randomWord = words[Math.floor(Math.random() * words.length)];
        selectedWords.push(randomWord);
      }
      result = selectedWords.join(separator);
      if (passphraseIncludeNumber) {
        const num = Math.floor(10 + Math.random() * 90);
        result += `${separator}${num}`;
      }

    } else if (mode === 'pin') {
      for (let i = 0; i < pinLength; i++) {
        result += Math.floor(Math.random() * 10).toString();
      }
    }

    setPassword(result);
    setCopied(false);
  };

  // Generate on mount and when settings change
  useEffect(() => {
    generatePassword();
  }, [mode, length, useUpper, useLower, useNumbers, useSymbols, excludeAmbiguous, wordCount, separator, passphraseIncludeNumber, passphraseLang, pinLength]);

  // Bulk Generator
  const generateBulk = () => {
    const list: string[] = [];
    for (let i = 0; i < 5; i++) {
      let item = '';
      if (mode === 'random') {
        let pool = '';
        if (useUpper) pool += UPPERCASE_CHARS;
        if (useLower) pool += LOWERCASE_CHARS;
        if (useNumbers) pool += NUMBER_CHARS;
        if (useSymbols) pool += SYMBOL_CHARS;
        if (!pool) pool = LOWERCASE_CHARS;
        for (let j = 0; j < length; j++) {
          item += pool[Math.floor(Math.random() * pool.length)];
        }
      } else if (mode === 'passphrase') {
        const words = passphraseLang === 'ar' ? WORD_BANK_AR : WORD_BANK_EN;
        const w = [words[Math.floor(Math.random() * words.length)], words[Math.floor(Math.random() * words.length)], words[Math.floor(Math.random() * words.length)]];
        item = w.join(separator) + (passphraseIncludeNumber ? `${separator}${Math.floor(10 + Math.random() * 90)}` : '');
      } else {
        for (let j = 0; j < pinLength; j++) item += Math.floor(Math.random() * 10).toString();
      }
      list.push(item);
    }
    setBulkList(list);
    setShowBulk(true);
  };

  // Calculate Entropy and Security Strength
  const strengthInfo = useMemo(() => {
    if (!password) {
      return { score: 0, label: 'فارغة', color: 'bg-slate-300', crackTime: '0 ثانية', entropy: 0 };
    }

    let poolSize = 0;
    if (/[a-z]/.test(password)) poolSize += 26;
    if (/[A-Z]/.test(password)) poolSize += 26;
    if (/[0-9]/.test(password)) poolSize += 10;
    if (/[^a-zA-Z0-9]/.test(password)) poolSize += 32;
    if (poolSize === 0) poolSize = 10;

    const entropy = Math.round(password.length * Math.log2(poolSize));

    let score = 1;
    let label = isAr ? 'ضعيفة جداً' : 'Very Weak';
    let color = 'bg-red-500';
    let crackTime = isAr ? 'أقل من ثانية' : 'Instant (< 1 sec)';

    if (entropy >= 80) {
      score = 4;
      label = isAr ? 'حماية عسكرية فائقة 🛡️' : 'Military Grade 🛡️';
      color = 'bg-emerald-500';
      crackTime = isAr ? 'أكثر من 500 مليون سنة' : '500+ Million Years';
    } else if (entropy >= 60) {
      score = 3;
      label = isAr ? 'قوية جداً 🚀' : 'Very Strong 🚀';
      color = 'bg-teal-500';
      crackTime = isAr ? 'حوالي 250 ألف سنة' : '~250,000 Years';
    } else if (entropy >= 40) {
      score = 2;
      label = isAr ? 'متوسطة ⚠️' : 'Moderate ⚠️';
      color = 'bg-amber-500';
      crackTime = isAr ? 'عدة أيام إلى شهور' : 'A few days to months';
    } else if (entropy >= 25) {
      score = 1;
      label = isAr ? 'ضعيفة ❌' : 'Weak ❌';
      color = 'bg-orange-500';
      crackTime = isAr ? 'دقائق معدودة' : 'Few minutes';
    }

    return { score, label, color, crackTime, entropy };
  }, [password, isAr]);

  // Copy to clipboard handler
  const handleCopy = async () => {
    if (!password) return;
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = password;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleCopyBulk = async () => {
    if (bulkList.length === 0) return;
    try {
      await navigator.clipboard.writeText(bulkList.join('\n'));
      setCopyBulkSuccess(true);
      setTimeout(() => setCopyBulkSuccess(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleShare = () => {
    const text = isAr 
      ? `🔐 جرّب أداة توليد كلمات المرور القوية وفحص أمان الحسابات مجاناً على:\nhttps://www.hanan.fun`
      : `🔐 Generate unbreakable passwords and test account security for free on:\nhttps://www.hanan.fun`;
    if (navigator.share) {
      navigator.share({ title: 'أداة توليد كلمات المرور القوية', text, url: 'https://www.hanan.fun' }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div id="password-generator-tool" className="relative rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden my-12 transition-all">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-emerald-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <div className="relative p-6 sm:p-8 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25">
            <KeyRound className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                {isAr ? 'أداة توليد كلمات المرور القوية والآمنة' : 'Ultra-Secure Strong Password Generator'}
              </h2>
              <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-300">
                <Sparkles className="w-3 h-3" />
                {isAr ? 'مجاني 100%' : '100% Free'}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500 inline shrink-0" />
              <span>{isAr ? 'توليد محلي فوري وآمن داخل متصفحك دون حفظ أو إرسال أي بيانات' : 'Client-side generation with zero logging and maximum cryptographic security'}</span>
            </p>
          </div>
        </div>

        {/* Action Badges */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-all"
            title={isAr ? 'مشاركة الأداة' : 'Share Tool'}
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{isAr ? 'مشاركة' : 'Share'}</span>
          </button>

          <button
            onClick={generateBulk}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/60 dark:hover:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 transition-all border border-indigo-200/50 dark:border-indigo-800/50"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{isAr ? 'توليد 5 كلمات دفعة واحدة' : 'Generate Batch (5)'}</span>
          </button>
        </div>
      </div>

      <div className="p-6 sm:p-8 space-y-8">
        {/* Mode Selector Tabs */}
        <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800/80 max-w-xl">
          <button
            onClick={() => setMode('random')}
            className={`flex-1 min-w-[120px] py-2.5 px-4 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 ${
              mode === 'random'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>{isAr ? 'عشوائي مشفر (Random)' : 'Strong Random'}</span>
          </button>

          <button
            onClick={() => setMode('passphrase')}
            className={`flex-1 min-w-[120px] py-2.5 px-4 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 ${
              mode === 'passphrase'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>{isAr ? 'عبارة سهلة التذكر (Memorable)' : 'Passphrase'}</span>
          </button>

          <button
            onClick={() => setMode('pin')}
            className={`flex-1 min-w-[100px] py-2.5 px-4 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 ${
              mode === 'pin'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Fingerprint className="w-3.5 h-3.5" />
            <span>{isAr ? 'رمز PIN رقمي' : 'PIN Code'}</span>
          </button>
        </div>

        {/* Main Password Display Box */}
        <div className="space-y-3">
          <div className="relative rounded-2xl bg-slate-900 text-white p-4 sm:p-6 border border-slate-800 shadow-inner flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex-1 overflow-x-auto py-1 scrollbar-none">
              <span className={`font-mono text-lg sm:text-2xl font-bold tracking-wider select-all break-all ${showPassword ? 'text-white' : 'text-slate-500 blur-sm'}`}>
                {showPassword ? password : '••••••••••••••••••••'}
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all"
                title={showPassword ? (isAr ? 'إخفاء' : 'Hide') : (isAr ? 'إظهار' : 'Show')}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>

              <button
                onClick={generatePassword}
                className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-indigo-400 hover:text-indigo-300 transition-all active:rotate-180 duration-300"
                title={isAr ? 'توليد كلمة جديدة' : 'Regenerate'}
              >
                <RefreshCw className="w-4 h-4" />
              </button>

              <button
                onClick={handleCopy}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all ${
                  copied
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                    : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-indigo-500/20 active:scale-95'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>{isAr ? 'تم النسخ!' : 'Copied!'}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>{isAr ? 'نسخ الكلمة' : 'Copy Password'}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Strength Analysis Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-slate-400">{isAr ? 'مستوى الأمان:' : 'Strength:'}</span>
              <span className="font-black text-slate-800 dark:text-slate-200">{strengthInfo.label}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-400">{isAr ? 'وقت الكسر المتوقع:' : 'Crack Time:'}</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">{strengthInfo.crackTime}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-400">{isAr ? 'مستوى الإنتروبيا:' : 'Entropy:'}</span>
              <span className="font-bold text-indigo-600 dark:text-indigo-400">{strengthInfo.entropy} Bits</span>
            </div>
          </div>

          {/* Strength Bar */}
          <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
            <div 
              className={`h-full ${strengthInfo.color} transition-all duration-500 rounded-full`}
              style={{ width: `${(strengthInfo.score / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* Customization Controls */}
        {mode === 'random' && (
          <div className="space-y-6 pt-2">
            {/* Length Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-slate-700 dark:text-slate-300">
                <span className="flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                  <span>{isAr ? 'طول كلمة المرور (عدد الحروف):' : 'Password Length:'}</span>
                </span>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setLength(Math.max(6, length - 1))}
                    className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 flex items-center justify-center font-bold"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-mono font-black text-sm">
                    {length}
                  </span>
                  <button 
                    onClick={() => setLength(Math.min(64, length + 1))}
                    className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 flex items-center justify-center font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              <input
                type="range"
                min="6"
                max="64"
                value={length}
                onChange={(e) => setLength(parseInt(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-800 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>6 {isAr ? 'حروف (ضعيف)' : 'chars'}</span>
                <span>16 {isAr ? 'حرف (موصى به)' : 'chars (Optimal)'}</span>
                <span>32 {isAr ? 'حرف (فائق)' : 'chars'}</span>
                <span>64 {isAr ? 'حرف (قصوى)' : 'chars (Max)'}</span>
              </div>
            </div>

            {/* Checkbox Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <label className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 cursor-pointer hover:border-indigo-400 transition-all select-none">
                <input
                  type="checkbox"
                  checked={useUpper}
                  onChange={(e) => setUseUpper(e.target.checked)}
                  className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 accent-indigo-600 cursor-pointer"
                />
                <div>
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    {isAr ? 'أحرف كبيرة (A-Z)' : 'Uppercase (A-Z)'}
                  </div>
                  <div className="text-[10px] text-slate-400">ABCDEF...</div>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 cursor-pointer hover:border-indigo-400 transition-all select-none">
                <input
                  type="checkbox"
                  checked={useLower}
                  onChange={(e) => setUseLower(e.target.checked)}
                  className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 accent-indigo-600 cursor-pointer"
                />
                <div>
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    {isAr ? 'أحرف صغيرة (a-z)' : 'Lowercase (a-z)'}
                  </div>
                  <div className="text-[10px] text-slate-400">abcdef...</div>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 cursor-pointer hover:border-indigo-400 transition-all select-none">
                <input
                  type="checkbox"
                  checked={useNumbers}
                  onChange={(e) => setUseNumbers(e.target.checked)}
                  className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 accent-indigo-600 cursor-pointer"
                />
                <div>
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    {isAr ? 'أرقام (0-9)' : 'Numbers (0-9)'}
                  </div>
                  <div className="text-[10px] text-slate-400">012345...</div>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 cursor-pointer hover:border-indigo-400 transition-all select-none">
                <input
                  type="checkbox"
                  checked={useSymbols}
                  onChange={(e) => setUseSymbols(e.target.checked)}
                  className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 accent-indigo-600 cursor-pointer"
                />
                <div>
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    {isAr ? 'رموز خاصة (!@#$)' : 'Symbols (!@#$)'}
                  </div>
                  <div className="text-[10px] text-slate-400">!@#$%^&*...</div>
                </div>
              </label>
            </div>

            {/* Ambiguous filter */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/30 border border-slate-200/60 dark:border-slate-800 text-xs">
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-slate-400" />
                <span className="text-slate-600 dark:text-slate-300">
                  {isAr ? 'استبعاد الأحرف المتشابهة بصرياً لتجنب الخطأ (مثل l, 1, I, O, 0)' : 'Exclude ambiguous characters (e.g. l, 1, I, O, 0)'}
                </span>
              </div>
              <input
                type="checkbox"
                checked={excludeAmbiguous}
                onChange={(e) => setExcludeAmbiguous(e.target.checked)}
                className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 accent-indigo-600 cursor-pointer"
              />
            </div>
          </div>
        )}

        {/* Passphrase Controls */}
        {mode === 'passphrase' && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                {isAr ? 'عدد الكلمات:' : 'Number of Words:'}
              </label>
              <select
                value={wordCount}
                onChange={(e) => setWordCount(parseInt(e.target.value))}
                className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-white"
              >
                <option value={3}>3 {isAr ? 'كلمات' : 'words'}</option>
                <option value={4}>4 {isAr ? 'كلمات (موصى به)' : 'words (Recommended)'}</option>
                <option value={5}>5 {isAr ? 'كلمات' : 'words'}</option>
                <option value={6}>6 {isAr ? 'كلمات (أمان عالي)' : 'words (High Security)'}</option>
              </select>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                {isAr ? 'رمز الفاصل بين الكلمات:' : 'Word Separator:'}
              </label>
              <select
                value={separator}
                onChange={(e) => setSeparator(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-white"
              >
                <option value="-">فاصل شرطة ( - )</option>
                <option value=".">فاصل نقطة ( . )</option>
                <option value="_">فاصل سفلي ( _ )</option>
                <option value="#">فاصل شباك ( # )</option>
              </select>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                {isAr ? 'لغة الكلمات:' : 'Vocabulary Language:'}
              </label>
              <select
                value={passphraseLang}
                onChange={(e) => setPassphraseLang(e.target.value as 'ar' | 'en')}
                className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-white"
              >
                <option value="ar">العربية (Arabic)</option>
                <option value="en">English (الإنجليزية)</option>
              </select>
            </div>
          </div>
        )}

        {/* PIN Controls */}
        {mode === 'pin' && (
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 max-w-sm space-y-2">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
              {isAr ? 'عدد خانات رمز PIN:' : 'PIN Digits Count:'}
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[4, 6, 8, 12].map((num) => (
                <button
                  key={num}
                  onClick={() => setPinLength(num)}
                  className={`py-2 rounded-xl text-xs font-bold transition-all ${
                    pinLength === num
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {num} {isAr ? 'أرقام' : 'digits'}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Bulk List Modal / Accordion */}
        {showBulk && bulkList.length > 0 && (
          <div className="p-5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-indigo-950 dark:text-indigo-200 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>{isAr ? 'قائمة 5 كلمات مرور جاهزة للنسخ:' : '5 Generated Passwords List:'}</span>
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyBulk}
                  className="px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all flex items-center gap-1"
                >
                  {copyBulkSuccess ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copyBulkSuccess ? (isAr ? 'تم النسخ!' : 'Copied!') : (isAr ? 'نسخ الكل' : 'Copy All')}</span>
                </button>
                <button
                  onClick={() => setShowBulk(false)}
                  className="px-2.5 py-1 rounded-lg text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 text-xs font-bold"
                >
                  {isAr ? 'إغلاق' : 'Close'}
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              {bulkList.map((pw, i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded-xl bg-white dark:bg-slate-900 border border-indigo-100 dark:border-indigo-900 text-xs font-mono">
                  <span className="text-slate-800 dark:text-slate-200 font-bold select-all">{pw}</span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(pw);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                    className="p-1 rounded-lg text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                    title={isAr ? 'نسخ' : 'Copy'}
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Security Tips Section */}
        <div className="pt-6 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                {isAr ? 'لا تكرر كلمة المرور' : 'Never Reuse Passwords'}
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                {isAr ? 'استخدم كلمة سر فريدة لكل بريد إلكتروني، حساب بنكي، وشبكة تواصل.' : 'Assign unique credentials for each sensitive service.'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800">
            <div className="w-8 h-8 rounded-xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                {isAr ? 'فعّل التحقق بخطوتين (2FA)' : 'Enable 2FA Authentication'}
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                {isAr ? 'حتى لو كُشفت كلمة المرور، يمنع التحقق الثنائي أي دخول غير مصرح به.' : 'Two-factor auth prevents 99% of automated credential stuffing.'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800">
            <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                {isAr ? 'تجنب المعلومات الشخصية' : 'Avoid Personal Details'}
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                {isAr ? 'لا تضع تاريخ ميلادك أو رقم هاتفك أو اسمك داخل كلمة السر إطلاقاً.' : 'Never include birthdays, phone numbers, or public names.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
