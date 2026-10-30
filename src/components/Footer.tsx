import React from 'react';
import { ActivePage } from '../types';

interface FooterProps {
  currentLang?: string;
  onNavigate: (page: ActivePage) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 text-center space-y-4">
        {/* Main Copyright & Domain */}
        <div className="space-y-1">
          <div className="text-sm sm:text-base font-bold text-white tracking-wide">
            © 2026 استوديو حنان الرقمي - Hanan Studio
          </div>
          <div className="text-xs text-slate-400">
            جميع الحقوق محفوظة | <span className="font-semibold text-pink-400">hanan.fun</span>
          </div>
        </div>

        {/* Links: الرئيسية | ألعاب بنات | سياسة الخصوصية | اتصل بنا */}
        <nav aria-label="روابط الفوتر" className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm font-medium text-slate-300">
          <span className="text-slate-500 font-bold">روابط:</span>
          <button
            onClick={() => onNavigate('home')}
            className="hover:text-pink-400 transition-colors cursor-pointer"
          >
            الرئيسية
          </button>
          <span className="text-slate-600">|</span>
          <button
            onClick={() => onNavigate('american-style-game')}
            className="hover:text-pink-400 text-pink-300 font-semibold transition-colors cursor-pointer"
          >
            ألعاب بنات
          </button>
          <span className="text-slate-600">|</span>
          <button
            onClick={() => onNavigate('privacy')}
            className="hover:text-pink-400 transition-colors cursor-pointer"
          >
            سياسة الخصوصية
          </button>
          <span className="text-slate-600">|</span>
          <button
            onClick={() => onNavigate('contact')}
            className="hover:text-pink-400 transition-colors cursor-pointer"
          >
            اتصل بنا
          </button>
        </nav>

        {/* Email */}
        <div className="pt-2 border-t border-slate-800/80 text-xs text-slate-400">
          ايميل:{' '}
          <a
            href="mailto:support@hanan.fun"
            className="font-bold text-pink-400 hover:text-pink-300 hover:underline transition-colors"
          >
            support@hanan.fun
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
