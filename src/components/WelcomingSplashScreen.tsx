import React, { useState, useEffect } from 'react';
import { Server, ShieldCheck, Zap, ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';

interface WelcomingSplashScreenProps {
  currentLang: Language;
  onFinish?: () => void;
}

export const WelcomingSplashScreen: React.FC<WelcomingSplashScreenProps> = ({ currentLang, onFinish }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const [progress, setProgress] = useState(15);
  const isAr = currentLang === 'ar';

  useEffect(() => {
    // Progress animation
    const timer1 = setTimeout(() => setProgress(45), 150);
    const timer2 = setTimeout(() => setProgress(85), 450);
    const timer3 = setTimeout(() => setProgress(100), 750);

    // Auto fade-out after 850ms
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
      const removeTimer = setTimeout(() => {
        setIsVisible(false);
        if (onFinish) onFinish();
      }, 400); // 400ms fade transition
      return () => clearTimeout(removeTimer);
    }, 850);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(fadeTimer);
    };
  }, [onFinish]);

  const handleSkip = () => {
    setIsFading(true);
    setTimeout(() => {
      setIsVisible(false);
      if (onFinish) onFinish();
    }, 250);
  };

  if (!isVisible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center p-6 text-white select-none transition-all duration-400 ease-out bg-slate-950 ${
        isFading ? 'opacity-0 scale-98 pointer-events-none' : 'opacity-100 scale-100'
      }`}
      style={{
        background: 'radial-gradient(circle at 50% 35%, #1e293b 0%, #0f172a 65%, #020617 100%)',
      }}
    >
      {/* Background radial glow */}
      <div className="absolute w-80 h-80 rounded-full bg-blue-600/20 blur-3xl pointer-events-none" />
      <div className="absolute w-64 h-64 rounded-full bg-cyan-500/15 blur-3xl pointer-events-none -bottom-10" />

      <div className="relative z-10 flex flex-col items-center text-center max-w-md w-full space-y-5">
        {/* Animated Brand Logo */}
        <div className="relative">
          <div className="absolute -inset-3 rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 opacity-40 blur-xl animate-pulse" />
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 p-0.5 shadow-2xl shadow-blue-500/40">
            <div className="w-full h-full bg-slate-900/60 backdrop-blur-md rounded-[22px] flex items-center justify-center border border-white/20">
              <Server className="w-10 h-10 sm:w-12 sm:h-12 text-white animate-pulse" />
            </div>
          </div>
        </div>

        {/* Brand Titles */}
        <div className="space-y-1.5">
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {isAr ? 'منظومة خدمات الإنترنت العالمية' : 'Global Internet Services'}
          </h1>
          <p className="text-xs sm:text-sm font-bold text-cyan-400 tracking-wide font-sans">
            GIS Network • Cloud &amp; Infrastructure
          </p>
        </div>

        {/* Welcoming Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/80 text-xs sm:text-sm font-semibold text-slate-200 shadow-sm backdrop-blur-md">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping shrink-0" />
          <span>{isAr ? 'أهلاً بك في المنظومة السحابية المتقدمة' : 'Welcome to Advanced Cloud Services'}</span>
        </div>

        {/* Quick Highlights Pills */}
        <div className="grid grid-cols-3 gap-2 w-full pt-1">
          <div className="p-2.5 rounded-2xl bg-slate-900/80 border border-slate-800/80 text-center flex flex-col items-center justify-center gap-1 shadow-xs">
            <Zap className="w-4 h-4 text-amber-400" />
            <span className="text-[10px] sm:text-[11px] font-bold text-slate-300">
              {isAr ? 'سيرفرات فائقة' : 'Ultra Fast'}
            </span>
          </div>
          <div className="p-2.5 rounded-2xl bg-slate-900/80 border border-slate-800/80 text-center flex flex-col items-center justify-center gap-1 shadow-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="text-[10px] sm:text-[11px] font-bold text-slate-300">
              {isAr ? 'حماية WAF' : 'WAF Shield'}
            </span>
          </div>
          <div className="p-2.5 rounded-2xl bg-slate-900/80 border border-slate-800/80 text-center flex flex-col items-center justify-center gap-1 shadow-xs">
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            <span className="text-[10px] sm:text-[11px] font-bold text-slate-300">
              {isAr ? '39 دراسة أصيلة' : '39 Studies'}
            </span>
          </div>
        </div>

        {/* Animated Progress Bar */}
        <div className="w-full max-w-xs space-y-2 pt-2">
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700/50">
            <div
              className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-500 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium px-1">
            <span>{isAr ? 'تهيئة العقد السحابية...' : 'Initializing cloud nodes...'}</span>
            <span className="font-mono text-cyan-400 font-bold">{progress}%</span>
          </div>
        </div>

        {/* Direct Start / Skip Button */}
        <button
          onClick={handleSkip}
          className="mt-2 px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 text-xs font-bold text-slate-200 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer border border-white/10"
        >
          <span>{isAr ? 'دخول فوري للمنظومة' : 'Enter Dashboard'}</span>
          {isAr ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
        </button>
      </div>
    </div>
  );
};
