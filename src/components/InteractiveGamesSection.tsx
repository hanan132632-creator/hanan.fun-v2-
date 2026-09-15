import React, { useState } from 'react';
import { 
  Sparkles, 
  Gamepad2, 
  Lightbulb, 
  Brain, 
  Trophy, 
  Flame, 
  Share2, 
  HelpCircle, 
  CheckCircle2, 
  RotateCcw,
  Star,
  Award
} from 'lucide-react';
import { Language } from '../types';
import { ArabicWordleGame } from './ArabicWordleGame';
import { AdSensePlacement } from './AdSensePlacement';

interface InteractiveGamesSectionProps {
  currentLang: Language;
}

export const InteractiveGamesSection: React.FC<InteractiveGamesSectionProps> = ({ currentLang }) => {
  const [activeGameTab, setActiveGameTab] = useState<'wordle' | 'riddles' | 'trivia'>('wordle');

  // Daily Riddles state
  const riddles = [
    {
      id: 1,
      question: 'ما هو الشيء الذي يمشي و يقف و ليس له أرجل؟',
      answer: 'الساعة',
      hint: 'نجده في معصم اليد أو معلقاً على الجدار لمعرفة الوقت.',
      explanation: 'الساعة تتحرك عقاربها باستمرار وتتوقف إذا نفدت بطاريتها دون أن يكون لها أرجل!'
    },
    {
      id: 2,
      question: 'ما هو الشيء الذي كلما أخذت منه كَبُر؟',
      answer: 'الحفرة',
      hint: 'تصنعها في الأرض أو الرمال عند الحفر.',
      explanation: 'كلما حفرت وأخذت تراباً أكثر من الحفرة، كلما ازداد حجمها واتساعها!'
    },
    {
      id: 3,
      question: 'أنا بيت ليس لي أبواب ولا نوافذ، وإذا كُسرت قشرتي أطعم الناس، فمن أنا؟',
      answer: 'البيضة',
      hint: 'نأكلها في وجبة الفطور ومصدر غني بالبروتين.',
      explanation: 'البيضة تحمي ما بداخلها بدون منافذ، وتؤكل بعد كسرها.'
    },
    {
      id: 4,
      question: 'ما هو الشيء الذي يرى كل شيء ولا يملك عيوناً؟',
      answer: 'المرآة',
      hint: 'تعكس صورتك اليومية بوضوح.',
      explanation: 'المرآة تعكس كل ما يقف أمامها بدون عيون حقيقية.'
    },
    {
      id: 5,
      question: 'شيء يملك أسناناً كثيرة ولكنه لا يعض أبداً؟',
      answer: 'المشط',
      hint: 'نستخدمه لتصفيف وترتيب الشعر.',
      explanation: 'مشط الشعر يحتوي على عشرات الأسنان لتسريح الشعر دون أن يعض.'
    }
  ];

  const [currentRiddleIndex, setCurrentRiddleIndex] = useState(0);
  const [riddleInput, setRiddleInput] = useState('');
  const [showRiddleHint, setShowRiddleHint] = useState(false);
  const [riddleResult, setRiddleResult] = useState<'correct' | 'wrong' | null>(null);
  const [riddleScore, setRiddleScore] = useState(0);

  const checkRiddle = () => {
    const cleanInput = riddleInput.trim().replace(/^ال/, '');
    const cleanAnswer = riddles[currentRiddleIndex].answer.replace(/^ال/, '');

    if (cleanInput.includes(cleanAnswer) || cleanAnswer.includes(cleanInput)) {
      setRiddleResult('correct');
      setRiddleScore(prev => prev + 50);
    } else {
      setRiddleResult('wrong');
    }
  };

  const nextRiddle = () => {
    setCurrentRiddleIndex((prev) => (prev + 1) % riddles.length);
    setRiddleInput('');
    setShowRiddleHint(false);
    setRiddleResult(null);
  };

  // Trivia Quiz state
  const triviaQuestions = [
    {
      question: 'ما هي عاصمة سلطنة عُمان؟',
      options: ['مسقط', 'صلالة', 'نزوى', 'صحار'],
      correct: 0,
      fact: 'مسقط هي العاصمة وتشتهر بجمال عمارتها الإسلامية وشواطئها الساحرة المطلة على بحر عمان.'
    },
    {
      question: 'كم عدد كواكب المجموعة الشمسية المعتمدة رسمياً؟',
      options: ['7 كواكب', '8 كواكب', '9 كواكب', '10 كواكب'],
      correct: 1,
      fact: 'المجموعة الشمسية تضم 8 كواكب رئيسية بعد إعادة تصنيف بلوتو ككوكب قزم.'
    },
    {
      question: 'ما هو أطول أنهار العالم؟',
      options: ['نهر النيل', 'نهر الأمازون', 'نهر المسيسيبي', 'نهر اليانغتسي'],
      correct: 0,
      fact: 'نهر النيل هو أطول أنهار العالم ويمتد لأكثر من 6,650 كيلومتر في قارة إفريقيا.'
    },
    {
      question: 'ما هي أكبر دولة عربية من حيث المساحة؟',
      options: ['الجزائر', 'السعودية', 'مصر', 'السودان'],
      correct: 0,
      fact: 'الجزائر هي الأكبر مساحة عربياً وإفريقياً بما يقارب 2.38 مليون كم².'
    }
  ];

  const [triviaIndex, setTriviaIndex] = useState(0);
  const [selectedTriviaOption, setSelectedTriviaOption] = useState<number | null>(null);
  const [triviaScore, setTriviaScore] = useState(0);

  const handleTriviaSelect = (idx: number) => {
    if (selectedTriviaOption !== null) return;
    setSelectedTriviaOption(idx);
    if (idx === triviaQuestions[triviaIndex].correct) {
      setTriviaScore(prev => prev + 25);
    }
  };

  const handleNextTrivia = () => {
    setSelectedTriviaOption(null);
    setTriviaIndex(prev => (prev + 1) % triviaQuestions.length);
  };

  return (
    <section id="arabic-games-hub" className="py-16 bg-gradient-to-b from-slate-50 via-emerald-50/30 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs sm:text-sm font-bold shadow-xs">
            <Gamepad2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>ركن التحدي والألعاب العربية التفاعلية</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            ألعاب ذكاء وألغاز يومية متجددة
          </h2>

          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base font-normal">
            اختبر ذكاءك اللغوي مع لعبة <strong className="text-emerald-600 dark:text-emerald-400 font-black">خمّن الكلمة العربية</strong>، فوازير الذكاء، وبنك المعلومات الثقافي!
          </p>
        </div>

        {/* Game Switcher Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10 bg-white dark:bg-slate-900 p-2 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm max-w-lg mx-auto">
          <button
            onClick={() => setActiveGameTab('wordle')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-extrabold text-sm transition-all ${
              activeGameTab === 'wordle'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-500/20 scale-102'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>خمّن الكلمة 🟩</span>
          </button>

          <button
            onClick={() => setActiveGameTab('riddles')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-extrabold text-sm transition-all ${
              activeGameTab === 'riddles'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md shadow-amber-500/20 scale-102'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Lightbulb className="w-4 h-4" />
            <span>فوازير ذكاء 💡</span>
          </button>

          <button
            onClick={() => setActiveGameTab('trivia')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-extrabold text-sm transition-all ${
              activeGameTab === 'trivia'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20 scale-102'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Brain className="w-4 h-4" />
            <span>ثقافة عامة 🧠</span>
          </button>
        </div>

        {/* Tab 1: Arabic Wordle (Primary & Most Engaging) */}
        {activeGameTab === 'wordle' && (
          <div className="animate-fadeIn">
            <ArabicWordleGame currentLang={currentLang} />
          </div>
        )}

        {/* Tab 2: Daily Riddles */}
        {activeGameTab === 'riddles' && (
          <div className="max-w-2xl mx-auto bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <span className="text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/80 px-3 py-1 rounded-full">
                لغز رقم {currentRiddleIndex + 1} من {riddles.length}
              </span>
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                نقاطك: +{riddleScore} نقطة 🌟
              </span>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-slate-800 dark:to-slate-800/80 p-8 rounded-3xl border border-amber-200/60 dark:border-slate-700 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-600 dark:text-amber-400 mx-auto flex items-center justify-center">
                <Lightbulb className="w-7 h-7 animate-pulse" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-relaxed">
                "{riddles[currentRiddleIndex].question}"
              </h3>
            </div>

            {showRiddleHint && (
              <div className="bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-200 p-4 rounded-2xl text-xs sm:text-sm flex items-start gap-3">
                <HelpCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold">تلميح للمساعدة:</strong>
                  <span>{riddles[currentRiddleIndex].hint}</span>
                </div>
              </div>
            )}

            {riddleResult === 'correct' && (
              <div className="bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 p-5 rounded-2xl text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <h4 className="text-lg font-black">إجابة صحيحة وذكية جداً! 🎉</h4>
                <p className="text-xs sm:text-sm text-emerald-700 dark:text-emerald-300">
                  {riddles[currentRiddleIndex].explanation}
                </p>
              </div>
            )}

            {riddleResult === 'wrong' && (
              <div className="bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-900 dark:text-rose-200 p-4 rounded-2xl text-center text-sm font-bold">
                إجابة غير صحيحة، حاول مجدداً أو استعن بالتلميح! 🤔
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={riddleInput}
                onChange={(e) => setRiddleInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && checkRiddle()}
                placeholder="اكتب إجابتك هنا..."
                className="flex-1 px-5 py-3 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 text-center font-bold text-base"
              />
              <button
                onClick={checkRiddle}
                className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-black rounded-2xl transition shadow-md"
              >
                تحقق
              </button>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => setShowRiddleHint(!showRiddleHint)}
                className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
              >
                <HelpCircle className="w-4 h-4" />
                <span>{showRiddleHint ? 'إخفاء التلميح' : 'طلب تلميح'}</span>
              </button>

              <button
                onClick={nextRiddle}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-xl transition flex items-center gap-1"
              >
                <span>اللغز التالي</span>
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Tab 3: Trivia Quiz */}
        {activeGameTab === 'trivia' && (
          <div className="max-w-2xl mx-auto bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/80 px-3 py-1 rounded-full">
                سؤال {triviaIndex + 1} من {triviaQuestions.length}
              </span>
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                نقاط الثقافة: +{triviaScore} نقطة 🌟
              </span>
            </div>

            <h3 className="text-xl font-black text-slate-900 dark:text-white text-center py-2">
              {triviaQuestions[triviaIndex].question}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {triviaQuestions[triviaIndex].options.map((option, idx) => {
                let btnStyle = 'bg-slate-50 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700';

                if (selectedTriviaOption !== null) {
                  if (idx === triviaQuestions[triviaIndex].correct) {
                    btnStyle = 'bg-emerald-500 text-white border-emerald-600 shadow-md';
                  } else if (idx === selectedTriviaOption) {
                    btnStyle = 'bg-rose-500 text-white border-rose-600';
                  } else {
                    btnStyle = 'opacity-40 bg-slate-100 dark:bg-slate-800 text-slate-500';
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleTriviaSelect(idx)}
                    disabled={selectedTriviaOption !== null}
                    className={`p-4 rounded-2xl font-bold text-sm transition-all text-center ${btnStyle}`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>

            {selectedTriviaOption !== null && (
              <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 text-xs sm:text-sm text-blue-900 dark:text-blue-200 space-y-2">
                <strong>معلومة إضافية:</strong>
                <p>{triviaQuestions[triviaIndex].fact}</p>
                <button
                  onClick={handleNextTrivia}
                  className="w-full mt-3 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition"
                >
                  السؤال التالي
                </button>
              </div>
            )}
          </div>
        )}

        {/* AdSense Placement underneath games to monetize high engagement */}
        <div className="mt-12">
          <AdSensePlacement currentLang={currentLang} format="rectangle" />
        </div>
      </div>
    </section>
  );
};
