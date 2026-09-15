import React, { useState, useEffect, useCallback } from 'react';
import { 
  Sparkles, 
  Trophy, 
  RotateCcw, 
  HelpCircle, 
  Share2, 
  Flame, 
  Award, 
  CheckCircle2, 
  AlertCircle, 
  Volume2,
  Calendar,
  Zap,
  ChevronRight,
  Lightbulb,
  Gamepad2
} from 'lucide-react';
import { Language } from '../types';

interface ArabicWordleGameProps {
  currentLang: Language;
}

interface WordEntry {
  word: string; // The target word (4 or 5 letters)
  hint: string; // Meaning or clue
  category: string;
}

const ARABIC_WORDS: WordEntry[] = [
  { word: 'ابداع', hint: 'ابتكار وخلق أفكار جديدة متميزة وغير مسبوقة', category: 'تفكير وابتكار' },
  { word: 'تفاؤل', hint: 'النظر إلى الجانب الإيجابي والأمل في الغد', category: 'مشاعر وحكمة' },
  { word: 'معرفة', hint: 'الإدراك والتعلم وفهم الحقائق والعلوم', category: 'علم وثقافة' },
  { word: 'سلام', hint: 'الأمان والسكينة ونقيض الحرب والنزاع', category: 'قيم إنسانية' },
  { word: 'حكمة', hint: 'وضع الأمور في نصابها وحسن التصرف والتفكير', category: 'قيم وحكمة' },
  { word: 'شجاعة', hint: 'الجرأة والإقدام والقوة في مواجهة الصعاب', category: 'شيم عربية' },
  { word: 'نجاح', hint: 'تحقيق الأهداف والتفوق بعد الجد والاجتهاد', category: 'إنجاز' },
  { word: 'قرآن', hint: 'كتاب الله المعجز المنزّل على نبينا محمد ﷺ', category: 'إسلاميات' },
  { word: 'تاريخ', hint: 'سجل أحداث الماضي وحكايات الأمم السابقة', category: 'ثقافة عامة' },
  { word: 'كواكب', hint: 'أجرام سماوية تدور حول الشمس في الفضاء', category: 'علوم وفلك' },
  { word: 'أندلس', hint: 'الفردوس المفقود وحضارة عربية زاهرة في أوروبا', category: 'تاريخ وجغرافيا' },
  { word: 'رياض', hint: 'عاصمة المملكة العربية السعودية وواحة النماء', category: 'عواصم عربية' },
  { word: 'القاهرة', hint: 'مدينة الألف مئذنة وعاصمة جمهورية مصر', category: 'عواصم عربية' },
  { word: 'تطوير', hint: 'التحسين المستمر والارتقاء بالأداء', category: 'تقنية وعمل' },
  { word: 'سعاده', hint: 'شعور بالبهجة والرضا وراحة البال', category: 'مشاعر' },
  { word: 'كرامه', hint: 'عزة النفس والمكانة الرفيعة للإنسان', category: 'أخلاق' },
  { word: 'صداقة', hint: 'رابطة المودة والإخلاص بين الأوفياء', category: 'علاقات' },
  { word: 'إخلاص', hint: 'صدق النية والوفاء في العمل والقول', category: 'قيم إسلامية' },
  { word: 'شروق', hint: 'بزوغ الشمس وبداية يوم جديد بالأمل', category: 'طبيعة' },
  { word: 'ياسمين', hint: 'زهرة بيضاء عطرية فواحة تشتهر بها دمشق', category: 'طبيعة وجمال' },
  { word: 'فيروز', hint: 'حجر كريم بلون أزرق سماوي نادر وجميل', category: 'أحجار وطبيعة' },
  { word: 'أمانه', hint: 'حفظ الودائع والصدق في المعاملات', category: 'أخلاق نبيلة' },
  { word: 'برمجة', hint: 'لغة التخاطب مع الحواسيب وكتابة الأكواد', category: 'تقنية ومعلومات' },
  { word: 'سحاب', hint: 'غيوم ماطرة وتكنولوجيا التخزين الحديثة', category: 'علوم وتقنية' },
];

const KEYBOARD_ROWS = [
  ['ض', 'ص', 'ث', 'ق', 'ف', 'غ', 'ع', 'ه', 'خ', 'ح', 'ج', 'د'],
  ['ش', 'س', 'ي', 'ب', 'ل', 'ا', 'ت', 'ن', 'م', 'ك', 'ط'],
  ['ENTER', 'ئ', 'ء', 'ؤ', 'ر', 'لا', 'ى', 'ة', 'و', 'ز', 'ظ', 'BACKSPACE']
];

// Helper to normalize Arabic characters for relaxed matching
const normalizeChar = (char: string) => {
  if (['أ', 'إ', 'آ', 'ا'].includes(char)) return 'ا';
  if (['ة', 'ه'].includes(char)) return 'ه';
  if (['ى', 'ي'].includes(char)) return 'ي';
  return char;
};

export const ArabicWordleGame: React.FC<ArabicWordleGameProps> = ({ currentLang }) => {
  const maxAttempts = 6;
  
  // Choose daily word based on date index
  const getDailyIndex = () => {
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
    return dayOfYear % ARABIC_WORDS.length;
  };

  const [wordIndex, setWordIndex] = useState<number>(getDailyIndex);
  const [targetEntry, setTargetEntry] = useState<WordEntry>(ARABIC_WORDS[getDailyIndex()]);
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState<string>('');
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing');
  const [showHint, setShowHint] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [streak, setStreak] = useState<number>(() => {
    const saved = localStorage.getItem('gis_wordle_streak');
    return saved ? parseInt(saved, 10) : 3;
  });
  const [totalWins, setTotalWins] = useState<number>(() => {
    const saved = localStorage.getItem('gis_wordle_wins');
    return saved ? parseInt(saved, 10) : 12;
  });

  const wordLength = targetEntry.word.length;

  // Show temporary toast
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Switch to next word (free practice)
  const handleNextWord = (nextIdx?: number) => {
    const newIdx = nextIdx !== undefined ? nextIdx : (wordIndex + 1) % ARABIC_WORDS.length;
    setWordIndex(newIdx);
    setTargetEntry(ARABIC_WORDS[newIdx]);
    setGuesses([]);
    setCurrentGuess('');
    setGameStatus('playing');
    setShowHint(false);
  };

  // Key Status Calculator (for on-screen keyboard coloring)
  const getKeyStatuses = () => {
    const statuses: Record<string, 'correct' | 'present' | 'absent'> = {};
    const targetNorm = targetEntry.word.split('').map(normalizeChar);

    guesses.forEach(guess => {
      const guessNorm = guess.split('').map(normalizeChar);
      guessNorm.forEach((char, i) => {
        const originalChar = guess[i];
        if (char === targetNorm[i]) {
          statuses[originalChar] = 'correct';
        } else if (targetNorm.includes(char) && statuses[originalChar] !== 'correct') {
          statuses[originalChar] = 'present';
        } else if (!statuses[originalChar]) {
          statuses[originalChar] = 'absent';
        }
      });
    });

    return statuses;
  };

  const keyStatuses = getKeyStatuses();

  // Evaluate letter match status
  const getCellStatus = (letter: string, index: number, target: string): 'correct' | 'present' | 'absent' => {
    const targetNorm = target.split('').map(normalizeChar);
    const letterNorm = normalizeChar(letter);

    if (letterNorm === targetNorm[index]) {
      return 'correct';
    }
    if (targetNorm.includes(letterNorm)) {
      return 'present';
    }
    return 'absent';
  };

  // Handle Input
  const handleLetterPress = useCallback((char: string) => {
    if (gameStatus !== 'playing') return;

    if (char === 'BACKSPACE') {
      setCurrentGuess(prev => prev.slice(0, -1));
      return;
    }

    if (char === 'ENTER') {
      if (currentGuess.length < wordLength) {
        triggerToast(`الكلمة يجب أن تتكون من ${wordLength} أحرف!`);
        return;
      }

      const newGuesses = [...guesses, currentGuess];
      setGuesses(newGuesses);
      setCurrentGuess('');

      // Check win
      const guessNorm = currentGuess.split('').map(normalizeChar).join('');
      const targetNorm = targetEntry.word.split('').map(normalizeChar).join('');

      if (guessNorm === targetNorm) {
        setGameStatus('won');
        const newStreak = streak + 1;
        const newWins = totalWins + 1;
        setStreak(newStreak);
        setTotalWins(newWins);
        localStorage.setItem('gis_wordle_streak', newStreak.toString());
        localStorage.setItem('gis_wordle_wins', newWins.toString());
        triggerToast('🎉 أحسنت! إجابة عبقرية وصحيحة!');
      } else if (newGuesses.length >= maxAttempts) {
        setGameStatus('lost');
        setStreak(0);
        localStorage.setItem('gis_wordle_streak', '0');
        triggerToast(`انتهت المحاولات! الكلمة الصحيحة هي: ${targetEntry.word}`);
      }
      return;
    }

    // Normal letter input
    if (currentGuess.length < wordLength) {
      // Filter out non-arabic
      const arabicRegex = /[\u0600-\u06FF]/;
      if (arabicRegex.test(char)) {
        setCurrentGuess(prev => prev + char);
      }
    }
  }, [currentGuess, gameStatus, guesses, maxAttempts, streak, targetEntry.word, totalWins, wordLength]);

  // Physical Keyboard Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Backspace') {
        handleLetterPress('BACKSPACE');
      } else if (e.key === 'Enter') {
        handleLetterPress('ENTER');
      } else {
        const char = e.key;
        if (/^[\u0600-\u06FF]$/.test(char)) {
          handleLetterPress(char);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleLetterPress]);

  // Share Result Handler
  const handleShare = () => {
    const attemptsCount = gameStatus === 'won' ? guesses.length : 'X';
    const gridEmojis = guesses.map(guess => {
      return guess.split('').map((letter, i) => {
        const st = getCellStatus(letter, i, targetEntry.word);
        if (st === 'correct') return '🟩';
        if (st === 'present') return '🟨';
        return '⬛';
      }).join('');
    }).join('\n');

    const shareText = `🎯 لغز خمّن الكلمة العربية (${attemptsCount}/${maxAttempts})\n${gridEmojis}\n\nتحدّ أصدقاءك والعب الآن مجاناً عبر: https://www.hanan.fun`;

    if (navigator.share) {
      navigator.share({
        title: 'خمّن الكلمة العربية - لغز اليوم',
        text: shareText,
        url: 'https://www.hanan.fun'
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(shareText);
      triggerToast('📋 تم نسخ النتيجة بنجاح! شاركها الآن على واتساب وفيسبوك');
    }
  };

  return (
    <div id="arabic-wordle-container" className="w-full max-w-2xl mx-auto space-y-6">
      {/* Header & Stats Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 text-white p-5 sm:p-6 rounded-3xl shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/20 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-yellow-300">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight flex items-center gap-2">
                <span>خمّن الكلمة العربية</span>
                <span className="text-xs bg-yellow-400 text-slate-900 px-2 py-0.5 rounded-full font-extrabold">
                  لغز اليوم
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-emerald-100">
                لديك 6 محاولات لاكتشاف الكلمة المخفية المكونة من {wordLength} أحرف
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleNextWord()}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-white/15 hover:bg-white/25 text-white text-xs font-bold rounded-xl transition backdrop-blur-sm"
              title="كلمة جديدة"
            >
              <RotateCcw className="w-4 h-4" />
              <span>تغيير الكلمة</span>
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-2 text-center pt-1">
          <div className="bg-black/15 rounded-2xl p-2.5 backdrop-blur-sm">
            <div className="flex items-center justify-center gap-1 text-amber-300 text-xs font-bold mb-0.5">
              <Flame className="w-3.5 h-3.5" />
              <span>الحماس المتواصل</span>
            </div>
            <div className="text-lg font-black">{streak} أيام 🔥</div>
          </div>

          <div className="bg-black/15 rounded-2xl p-2.5 backdrop-blur-sm">
            <div className="flex items-center justify-center gap-1 text-emerald-300 text-xs font-bold mb-0.5">
              <Trophy className="w-3.5 h-3.5" />
              <span>إجمالي الفوز</span>
            </div>
            <div className="text-lg font-black">{totalWins} لغزاً 🌟</div>
          </div>

          <div className="bg-black/15 rounded-2xl p-2.5 backdrop-blur-sm">
            <div className="flex items-center justify-center gap-1 text-blue-200 text-xs font-bold mb-0.5">
              <Award className="w-3.5 h-3.5" />
              <span>التصنيف</span>
            </div>
            <div className="text-lg font-black">فصيح وذكي 🧠</div>
          </div>
        </div>
      </div>

      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-6 py-3 rounded-2xl shadow-2xl text-sm font-bold flex items-center gap-2 animate-bounce border border-slate-700">
          <Zap className="w-4 h-4 text-yellow-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Rules & Colors Guide */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-wrap items-center justify-around gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
        <div className="flex items-center gap-1.5">
          <span className="w-5 h-5 rounded-md bg-emerald-500 text-white flex items-center justify-center font-bold text-[10px]">
            🟩
          </span>
          <span>الحرف صحيح وبمكانه</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-5 h-5 rounded-md bg-amber-500 text-white flex items-center justify-center font-bold text-[10px]">
            🟨
          </span>
          <span>الحرف موجود بمكان آخر</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-5 h-5 rounded-md bg-slate-400 text-white flex items-center justify-center font-bold text-[10px]">
            ⬛
          </span>
          <span>الحرف غير موجود</span>
        </div>
      </div>

      {/* Clue / Hint Box */}
      <div className="bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/80 p-3.5 rounded-2xl flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-blue-800 dark:text-blue-200 font-medium">
          <Lightbulb className="w-4 h-4 text-amber-500 shrink-0" />
          <span>
            {showHint 
              ? `💡 تلميح: ${targetEntry.hint} (تصنيف: ${targetEntry.category})`
              : `تصنيف الكلمة: ${targetEntry.category}`}
          </span>
        </div>
        {!showHint && (
          <button
            onClick={() => setShowHint(true)}
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition shrink-0"
          >
            كشف تلميح
          </button>
        )}
      </div>

      {/* Wordle Game Grid */}
      <div className="flex flex-col items-center gap-2 py-4">
        {Array.from({ length: maxAttempts }).map((_, rowIndex) => {
          const isCurrentRow = rowIndex === guesses.length;
          const guess = guesses[rowIndex] || (isCurrentRow ? currentGuess : '');
          const isSubmitted = rowIndex < guesses.length;

          return (
            <div key={rowIndex} className="flex gap-2 justify-center">
              {Array.from({ length: wordLength }).map((_, colIndex) => {
                const letter = guess[colIndex] || '';
                let statusClass = 'bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white';

                if (isSubmitted && letter) {
                  const st = getCellStatus(letter, colIndex, targetEntry.word);
                  if (st === 'correct') {
                    statusClass = 'bg-emerald-500 border-emerald-600 text-white shadow-md shadow-emerald-500/20';
                  } else if (st === 'present') {
                    statusClass = 'bg-amber-500 border-amber-600 text-white shadow-md shadow-amber-500/20';
                  } else {
                    statusClass = 'bg-slate-400 dark:bg-slate-700 border-slate-500 text-white';
                  }
                } else if (isCurrentRow && letter) {
                  statusClass = 'bg-slate-50 dark:bg-slate-800 border-2 border-blue-500 text-blue-600 dark:text-blue-400 scale-105 shadow-sm';
                }

                return (
                  <div
                    key={colIndex}
                    className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center font-black text-xl sm:text-2xl transition-all duration-200 select-none ${statusClass}`}
                  >
                    {letter}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Win / Loss Result Card */}
      {gameStatus !== 'playing' && (
        <div className={`p-6 rounded-3xl text-center space-y-4 shadow-xl border animate-fadeIn ${
          gameStatus === 'won' 
            ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white border-emerald-400' 
            : 'bg-gradient-to-br from-slate-800 to-slate-950 text-white border-slate-700'
        }`}>
          <div className="w-14 h-14 mx-auto rounded-2xl bg-white/20 flex items-center justify-center text-3xl">
            {gameStatus === 'won' ? '🏆' : '💡'}
          </div>

          <div>
            <h3 className="text-2xl font-black">
              {gameStatus === 'won' ? 'مبارك! لقد اكتشفت الكلمة بنجاح 👏🎉' : 'حاولت ببراعة! حظاً أوفر في الكلمة القادمة 💫'}
            </h3>
            <p className="text-sm mt-1 text-emerald-100">
              الكلمة الصحيحة هي: <strong className="text-xl underline font-black px-1.5">{targetEntry.word}</strong> — {targetEntry.hint}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-6 py-3 bg-white text-emerald-700 font-extrabold text-sm rounded-2xl hover:bg-emerald-50 transition shadow-lg hover:scale-105"
            >
              <Share2 className="w-4 h-4" />
              <span>مشاركة النتيجة على واتساب والتواصل</span>
            </button>

            <button
              onClick={() => handleNextWord()}
              className="flex items-center gap-2 px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-sm rounded-2xl transition shadow-lg"
            >
              <RotateCcw className="w-4 h-4" />
              <span>العب كلمة جديدة فوراً</span>
            </button>
          </div>
        </div>
      )}

      {/* On-Screen Arabic Keyboard */}
      <div className="bg-slate-100 dark:bg-slate-900/80 p-3 sm:p-4 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-2">
        {KEYBOARD_ROWS.map((row, rIdx) => (
          <div key={rIdx} className="flex justify-center gap-1 sm:gap-1.5">
            {row.map((key) => {
              const isSpecial = key === 'ENTER' || key === 'BACKSPACE';
              const status = keyStatuses[key];

              let keyBg = 'bg-white dark:bg-slate-800 text-slate-800 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700';

              if (status === 'correct') {
                keyBg = 'bg-emerald-500 text-white hover:bg-emerald-600 border-emerald-600';
              } else if (status === 'present') {
                keyBg = 'bg-amber-500 text-white hover:bg-amber-600 border-amber-600';
              } else if (status === 'absent') {
                keyBg = 'bg-slate-400 dark:bg-slate-700 text-slate-200 opacity-60';
              }

              return (
                <button
                  key={key}
                  onClick={() => handleLetterPress(key)}
                  className={`py-3 sm:py-3.5 rounded-xl font-bold text-sm sm:text-base transition-all active:scale-95 shadow-xs select-none ${keyBg} ${
                    isSpecial ? 'px-3 sm:px-4 text-xs font-black bg-blue-600 text-white hover:bg-blue-700' : 'flex-1 max-w-[42px]'
                  }`}
                >
                  {key === 'BACKSPACE' ? '⌫ مسح' : key === 'ENTER' ? '↵ تأكيد' : key}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
