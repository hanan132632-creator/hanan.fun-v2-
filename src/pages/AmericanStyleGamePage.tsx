import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  Download, 
  Shuffle, 
  Camera, 
  Music, 
  Volume2, 
  VolumeX, 
  Trophy, 
  CheckCircle2, 
  RotateCcw, 
  Share2, 
  Heart, 
  Palette, 
  Shirt, 
  Crown, 
  Sun, 
  Layers, 
  ArrowRight,
  Sliders,
  Check,
  Award
} from 'lucide-react';
import { Language } from '../types';
import { AdSensePlacement } from '../components/AdSensePlacement';

interface AmericanStyleGamePageProps {
  currentLang?: Language;
  onNavigate?: (page: any) => void;
}

// Sound Synthesis using Web Audio API for zero-dependency instant SFX
const playSoundEffect = (type: 'click' | 'shuffle' | 'win' | 'camera') => {
  if (typeof window === 'undefined') return;
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;
    if (type === 'click') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(780, now + 0.08);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
      osc.start(now);
      osc.stop(now + 0.08);
    } else if (type === 'shuffle') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.linearRampToValueAtTime(800, now + 0.15);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
      osc.start(now);
      osc.stop(now + 0.15);
    } else if (type === 'camera') {
      osc.type = 'square';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(200, now + 0.12);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
      osc.start(now);
      osc.stop(now + 0.12);
    } else if (type === 'win') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.setValueAtTime(554, now + 0.1);
      osc.frequency.setValueAtTime(659, now + 0.2);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
      osc.start(now);
      osc.stop(now + 0.35);
    }
  } catch {}
};

// Data Structures for Items
interface FashionItem {
  id: string;
  nameAr: string;
  nameEn: string;
  color: string;
  icon: string;
  tag: string;
}

const SKIN_TONES = [
  { id: 'skin-1', nameAr: 'بشرة حنطية مشرق', hex: '#f8d5c2' },
  { id: 'skin-2', nameAr: 'بشرة برونزية دافئة', hex: '#e0a382' },
  { id: 'skin-3', nameAr: 'بشرة دافئة عسلية', hex: '#ba7a54' },
  { id: 'skin-4', nameAr: 'بشرة سمراء غنية', hex: '#8a4f2a' },
  { id: 'skin-5', nameAr: 'بشرة فاتحة ناعمة', hex: '#fde8dc' },
];

const HAIR_STYLES: FashionItem[] = [
  { id: 'hair-1', nameAr: 'شعر كيرلي نيويورك', nameEn: 'NYC Curly Afro', color: '#4a2c11', icon: '👩‍🦱', tag: 'street' },
  { id: 'hair-2', nameAr: 'شعر أملس كلاسيك', nameEn: 'Sleek Straight Blonde', color: '#e8be6b', icon: '👱‍♀️', tag: 'hollywood' },
  { id: 'hair-3', nameAr: 'تموجات كاليفورنيا الوردية', nameEn: 'LA Pastel Waves', color: '#e58cb3', icon: '👩‍🎤', tag: 'campus' },
  { id: 'hair-4', nameAr: 'ضفائر مانهاتن العصرية', nameEn: 'Manhattan Braids', color: '#1a100c', icon: '👩‍🦱', tag: 'street' },
  { id: 'hair-5', nameAr: 'قصة بوب بفرقة جانبية', nameEn: 'Hollywood Bob Cut', color: '#8d4f24', icon: '👩', tag: 'hollywood' },
];

const TOPS: FashionItem[] = [
  { id: 'top-1', nameAr: 'جاكيت جينز بالشارات (Denim Patched)', nameEn: 'Patched Denim Jacket', color: '#3b82f6', icon: '🧥', tag: 'street' },
  { id: 'top-2', nameAr: 'هودي باستيل واسع (Pastel Hoodie)', nameEn: 'Pastel Oversized Hoodie', color: '#f472b6', icon: '🥼', tag: 'campus' },
  { id: 'top-3', nameAr: 'توب أبيض مع جاكيت جلد (Crop Top & Leather)', nameEn: 'Biker Crop & Jacket', color: '#1e293b', icon: '🎽', tag: 'street' },
  { id: 'top-4', nameAr: 'كارديجان جامعة NY كلاسيك', nameEn: 'NYC Varsity Cardigan', color: '#991b1b', icon: '👔', tag: 'campus' },
  { id: 'top-5', nameAr: 'بلوزة هوليوود السهرة البرّاقة', nameEn: 'Hollywood Glam Metallic Top', color: '#eab308', icon: '✨', tag: 'hollywood' },
];

const BOTTOMS: FashionItem[] = [
  { id: 'bottom-1', nameAr: 'بنطال جينز ممزق (Distressed Jeans)', nameEn: 'Ripped Street Denim', color: '#2563eb', icon: '👖', tag: 'street' },
  { id: 'bottom-2', nameAr: 'تنورة مربعات قصيرة (Plaid Skirt)', nameEn: 'High-Waist Plaid Skirt', color: '#ef4444', icon: '👗', tag: 'campus' },
  { id: 'bottom-3', nameAr: 'بنطال كارجو واسع (Cargo Pants)', nameEn: 'Urban Cargo Joggers', color: '#4d7c0f', icon: '👖', tag: 'street' },
  { id: 'bottom-4', nameAr: 'تنورة جلد سوداء عصرية', nameEn: 'Leather Mini Skirt', color: '#0f172a', icon: '👗', tag: 'hollywood' },
  { id: 'bottom-5', nameAr: 'شورت جينز الساحل الغربي', nameEn: 'LA Sunset Shorts', color: '#60a5fa', icon: '🩳', tag: 'campus' },
];

const SHOES: FashionItem[] = [
  { id: 'shoe-1', nameAr: 'سنيكرز الشارع الضخم (Chunky Sneakers)', nameEn: 'Chunky Platform Sneakers', color: '#f8fafc', icon: '👟', tag: 'street' },
  { id: 'shoe-2', nameAr: 'حذاء هوليوود ذو كعب عالٍ', nameEn: 'Hollywood Stiletto Heels', color: '#dc2626', icon: '👠', tag: 'hollywood' },
  { id: 'shoe-3', nameAr: 'بوت جلد أسود عالي (Ankle Boots)', nameEn: 'Black Leather Ankle Boots', color: '#090d16', icon: '🥾', tag: 'street' },
  { id: 'shoe-4', nameAr: 'حذاء قماش كلاسيك (High-Top Canvas)', nameEn: 'High-Top Skate Shoes', color: '#0284c7', icon: '👟', tag: 'campus' },
];

const ACCESSORIES: FashionItem[] = [
  { id: 'acc-1', nameAr: 'نظارات هوليوود الشمسية الكبيرة', nameEn: 'Oversized Shades', color: '#0f172a', icon: '🕶️', tag: 'hollywood' },
  { id: 'acc-2', nameAr: 'قبعة بيسبول NY الأصلية', nameEn: 'NY Baseball Cap', color: '#1e3a8a', icon: '🧢', tag: 'street' },
  { id: 'acc-3', nameAr: 'حقيبة ظهر صغيرة أنيقة', nameEn: 'Mini Leather Backpack', color: '#d97706', icon: '🎒', tag: 'campus' },
  { id: 'acc-4', nameAr: 'حقيبة يد هوليوود الفاخرة', nameEn: 'Hollywood Luxury Clutch', color: '#ec4899', icon: '👜', tag: 'hollywood' },
  { id: 'acc-5', nameAr: 'كوب قهوة مانهاتن العصري', nameEn: 'NYC Iced Coffee Cup', color: '#a16207', icon: '🥤', tag: 'street' },
];

const BACKGROUNDS = [
  { id: 'bg-nyc', nameAr: '🏙️ شوارع نيويورك وسوهو', nameEn: 'NYC Soho Streets', style: 'from-amber-100 via-rose-100 to-sky-200' },
  { id: 'bg-la', nameAr: '🌴 شاطئ سانتا مونيكا كاليفورنيا', nameEn: 'Santa Monica Boardwalk', style: 'from-cyan-200 via-sky-100 to-amber-100' },
  { id: 'bg-hollywood', nameAr: '🌟 استوديو ممر مفاخر هوليوود', nameEn: 'Hollywood Walk of Fame', style: 'from-purple-900 via-indigo-950 to-slate-900', isDark: true },
  { id: 'bg-sunset', nameAr: '🌆 غروب ناطحات سحاب مانهاتن', nameEn: 'Manhattan Skyline Sunset', style: 'from-orange-400 via-pink-500 to-purple-800', isDark: true },
];

const CHALLENGES = [
  { id: 'ch-street', nameAr: '🔥 تحدي استايل الشارع العصرى (NYC Streetwear)', targetTag: 'street', descAr: 'اختر ملابس الشارع والأحذية الضخمة وقبعة البيسبول للحصول على 5 نجوم!' },
  { id: 'ch-campus', nameAr: '🎓 تحدي إطلالة الجامعة الأمريكية (Campus Look)', targetTag: 'campus', descAr: 'نسق الهودي الواسع مع التنورة المربعات وحقيبة الظهر!' },
  { id: 'ch-hollywood', nameAr: '✨ تحدي سهرة هوليوود البراقة (Hollywood Glam)', targetTag: 'hollywood', descAr: 'اعتمد التوب الذهبي أو الجلد مع الكعب العالي والنظارات الفاخرة!' },
];

export const AmericanStyleGamePage: React.FC<AmericanStyleGamePageProps> = ({
  currentLang = 'ar',
  onNavigate,
}) => {
  const isAr = currentLang === 'ar';

  // Game States
  const [selectedSkin, setSelectedSkin] = useState(SKIN_TONES[0]);
  const [selectedHair, setSelectedHair] = useState(HAIR_STYLES[0]);
  const [selectedTop, setSelectedTop] = useState(TOPS[0]);
  const [selectedBottom, setSelectedBottom] = useState(BOTTOMS[0]);
  const [selectedShoe, setSelectedShoe] = useState(SHOES[0]);
  const [selectedAcc, setSelectedAcc] = useState(ACCESSORIES[0]);
  const [selectedBg, setSelectedBg] = useState(BACKGROUNDS[0]);

  const [activeTab, setActiveTab] = useState<'hair' | 'top' | 'bottom' | 'shoes' | 'acc' | 'skin' | 'bg'>('top');
  const [activeChallenge, setActiveChallenge] = useState<typeof CHALLENGES[0] | null>(null);
  const [challengeScore, setChallengeScore] = useState<number | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [sparklesActive, setSparklesActive] = useState(true);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Trigger Sound Effect Helper
  const triggerSfx = (type: 'click' | 'shuffle' | 'win' | 'camera') => {
    if (soundEnabled) playSoundEffect(type);
  };

  // Smart Randomizer
  const handleRandomize = () => {
    triggerSfx('shuffle');
    setSelectedSkin(SKIN_TONES[Math.floor(Math.random() * SKIN_TONES.length)]);
    setSelectedHair(HAIR_STYLES[Math.floor(Math.random() * HAIR_STYLES.length)]);
    setSelectedTop(TOPS[Math.floor(Math.random() * TOPS.length)]);
    setSelectedBottom(BOTTOMS[Math.floor(Math.random() * BOTTOMS.length)]);
    setSelectedShoe(SHOES[Math.floor(Math.random() * SHOES.length)]);
    setSelectedAcc(ACCESSORIES[Math.floor(Math.random() * ACCESSORIES.length)]);
    setSelectedBg(BACKGROUNDS[Math.floor(Math.random() * BACKGROUNDS.length)]);
  };

  // Check Challenge Score
  useEffect(() => {
    if (!activeChallenge) {
      setChallengeScore(null);
      return;
    }
    const matches = [
      selectedHair.tag === activeChallenge.targetTag,
      selectedTop.tag === activeChallenge.targetTag,
      selectedBottom.tag === activeChallenge.targetTag,
      selectedShoe.tag === activeChallenge.targetTag,
      selectedAcc.tag === activeChallenge.targetTag,
    ];
    const matchCount = matches.filter(Boolean).length;
    const score = Math.round((matchCount / 5) * 100);
    setChallengeScore(score);
    if (score === 100) {
      triggerSfx('win');
    }
  }, [selectedHair, selectedTop, selectedBottom, selectedShoe, selectedAcc, activeChallenge]);

  // High-Resolution Snapshot Generator on HTML5 Canvas
  const handleDownloadSnapshot = () => {
    triggerSfx('camera');
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1350; // Instagram Portrait format
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background Gradient
    const bgGrad = ctx.createLinearGradient(0, 0, 0, 1350);
    if (selectedBg.id === 'bg-hollywood') {
      bgGrad.addColorStop(0, '#3b0764');
      bgGrad.addColorStop(1, '#0f172a');
    } else if (selectedBg.id === 'bg-sunset') {
      bgGrad.addColorStop(0, '#f97316');
      bgGrad.addColorStop(0.5, '#ec4899');
      bgGrad.addColorStop(1, '#581c87');
    } else if (selectedBg.id === 'bg-la') {
      bgGrad.addColorStop(0, '#a5f3fc');
      bgGrad.addColorStop(1, '#fef08a');
    } else {
      bgGrad.addColorStop(0, '#fef3c7');
      bgGrad.addColorStop(1, '#bae6fd');
    }
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1080, 1350);

    // Decorative Card Header
    ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.roundRect(60, 60, 960, 140, 30);
    ctx.fill();

    ctx.font = 'bold 42px system-ui, sans-serif';
    ctx.fillStyle = selectedBg.isDark ? '#ffffff' : '#0f172a';
    ctx.textAlign = 'center';
    ctx.fillText(isAr ? '✨ إطلالة فاشون استايل أمريكي 2026' : '✨ American Style Fashion Outfit 2026', 540, 125);
    ctx.font = '24px system-ui, sans-serif';
    ctx.fillStyle = selectedBg.isDark ? '#cbd5e1' : '#475569';
    ctx.fillText('Global Internet Services - hanan.fun/american-style-game', 540, 165);

    // Avatar Drawing Simulation
    const cx = 540;
    const cy = 720;

    // Body / Skin Tone
    ctx.fillStyle = selectedSkin.hex;
    ctx.beginPath();
    ctx.arc(cx, cy - 260, 90, 0, Math.PI * 2); // Head
    ctx.fill();

    ctx.fillRect(cx - 20, cy - 170, 40, 60); // Neck

    // Torso / Body
    ctx.beginPath();
    ctx.ellipse(cx, cy - 20, 110, 140, 0, 0, Math.PI * 2);
    ctx.fill();

    // Arms
    ctx.fillRect(cx - 150, cy - 100, 35, 220);
    ctx.fillRect(cx + 115, cy - 100, 35, 220);

    // Legs
    ctx.fillRect(cx - 70, cy + 110, 50, 300);
    ctx.fillRect(cx + 20, cy + 110, 50, 300);

    // Render Clothing Layers
    // 1. Bottoms
    ctx.fillStyle = selectedBottom.color;
    ctx.roundRect(cx - 85, cy + 60, 170, 220, 20);
    ctx.fill();

    // 2. Tops
    ctx.fillStyle = selectedTop.color;
    ctx.roundRect(cx - 110, cy - 110, 220, 180, 25);
    ctx.fill();

    // 3. Shoes
    ctx.fillStyle = selectedShoe.color;
    ctx.roundRect(cx - 80, cy + 390, 60, 45, 10);
    ctx.roundRect(cx + 20, cy + 390, 60, 45, 10);
    ctx.fill();

    // 4. Hair
    ctx.fillStyle = selectedHair.color;
    ctx.beginPath();
    ctx.arc(cx, cy - 290, 115, Math.PI, Math.PI * 2);
    ctx.fill();

    // 5. Item Labels Badge
    ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
    ctx.roundRect(80, 920, 920, 320, 24);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'left';
    ctx.font = 'bold 28px system-ui, sans-serif';
    ctx.fillText('🛍️ Outfit Breakdown:', 120, 970);

    ctx.font = '22px system-ui, sans-serif';
    ctx.fillStyle = '#93c5fd';
    ctx.fillText(`• Hair: ${selectedHair.nameAr} (${selectedHair.nameEn})`, 120, 1020);
    ctx.fillText(`• Top: ${selectedTop.nameAr}`, 120, 1060);
    ctx.fillText(`• Bottom: ${selectedBottom.nameAr}`, 120, 1100);
    ctx.fillText(`• Shoes: ${selectedShoe.nameAr}`, 120, 1140);
    ctx.fillText(`• Accessory: ${selectedAcc.nameAr}`, 120, 1180);

    ctx.fillStyle = '#f59e0b';
    ctx.font = 'bold 24px system-ui, sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText('Styled on hanan.fun 💖', 960, 1200);

    // Download Image File
    const imageURI = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `american-style-outfit-${Date.now()}.png`;
    link.href = imageURI;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8" dir={isAr ? 'rtl' : 'ltr'}>
      {/* Header & Title */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-blue-500/10 border border-pink-500/20 text-pink-600 dark:text-pink-400 text-xs font-bold shadow-xs">
          <Crown className="w-4 h-4 text-pink-500 animate-bounce" />
          <span>استوديو العاب تلبيس بنات استايل أمريكي 2026 التفاعلي</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight font-sans">
          {isAr ? 'العاب بنات استايل أمريكي 2026 (تنسيق وتنزيل مباشر)' : 'American Style Girls Styling Game 2026'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mx-auto leading-relaxed">
          {isAr 
            ? 'جربي أحدث صيحات الموضة الأمريكية، صممي إطلالة الشارع العصرية، واختبري مهاراتك في التنسيق ثم انزلي بطاقة الأزياء بدقة عالية مجاناً بدون إعلانات!'
            : 'Style modern American streetwear outfits, customize hair, makeup, accessories, and export high-res fashion snapshots directly in your browser!'}
        </p>
      </div>

      {/* AdSense Upper Banner Placement */}
      <AdSensePlacement currentLang={currentLang} format="leaderboard" />

      {/* Game Mode Controls & Challenges */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Interactive Avatar & Live Canvas Preview (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col items-center space-y-4 sticky top-24">
          
          {/* Main Visual Display Box */}
          <div 
            className={`relative w-full max-w-sm aspect-[3/4] rounded-3xl p-6 flex flex-col items-center justify-between shadow-2xl transition-all duration-500 border-4 border-white dark:border-slate-800 bg-gradient-to-b ${selectedBg.style}`}
          >
            {/* Top Toolbar overlay inside canvas */}
            <div className="w-full flex items-center justify-between text-xs font-bold text-white z-10 drop-shadow-md">
              <span className="px-3 py-1 rounded-full bg-black/30 backdrop-blur-sm flex items-center gap-1 text-[11px]">
                <span>{selectedBg.nameAr}</span>
              </span>
              <button
                type="button"
                onClick={() => setSparklesActive(!sparklesActive)}
                className={`p-2 rounded-full cursor-pointer transition ${sparklesActive ? 'bg-amber-400 text-slate-900' : 'bg-black/30 text-white'}`}
                title="تأثير البريق واللمعان"
              >
                <Sparkles className="w-4 h-4" />
              </button>
            </div>

            {/* Sparkles effect layer */}
            {sparklesActive && (
              <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
                <span className="absolute top-1/4 left-10 text-xl animate-ping opacity-75">✨</span>
                <span className="absolute top-1/3 right-8 text-lg animate-pulse text-amber-300">💖</span>
                <span className="absolute bottom-1/3 left-12 text-2xl animate-bounce text-pink-300">⭐</span>
              </div>
            )}

            {/* Avatar Graphics Render Layer */}
            <div className="relative w-full h-full flex items-center justify-center">
              
              {/* Shadow underneath model */}
              <div className="absolute bottom-4 w-40 h-6 bg-black/20 rounded-full blur-md" />

              {/* Head & Skin */}
              <div className="relative flex flex-col items-center">
                {/* Hair Layer (Top z-index) */}
                <div 
                  className="absolute -top-14 z-30 text-8xl drop-shadow-lg transition-all duration-300 transform hover:scale-105"
                  style={{ color: selectedHair.color }}
                >
                  {selectedHair.icon}
                </div>

                {/* Glasses / Cap Accessories Layer */}
                <div className="absolute -top-6 z-40 text-4xl">
                  {selectedAcc.icon}
                </div>

                {/* Model Face & Skin Tone Circle */}
                <div 
                  className="w-24 h-24 rounded-full border-2 border-black/10 shadow-inner flex items-center justify-center transition-colors duration-300 relative z-20"
                  style={{ backgroundColor: selectedSkin.hex }}
                >
                  {/* Face Features */}
                  <div className="flex gap-4 text-xs select-none">
                    <span>👁️</span>
                    <span>👁️</span>
                  </div>
                  <div className="absolute bottom-3 text-[10px]">👄</div>
                </div>

                {/* Torso & Top Outfit Layer */}
                <div className="relative -mt-3 z-20 flex flex-col items-center">
                  <div 
                    className="w-28 h-28 rounded-2xl flex items-center justify-center text-5xl shadow-md transition-all duration-300 transform hover:scale-105"
                    style={{ backgroundColor: selectedTop.color }}
                  >
                    <span>{selectedTop.icon}</span>
                  </div>

                  {/* Bottoms Outfit Layer */}
                  <div 
                    className="w-24 h-32 rounded-b-2xl -mt-2 flex items-center justify-center text-5xl shadow-sm transition-all duration-300"
                    style={{ backgroundColor: selectedBottom.color }}
                  >
                    <span>{selectedBottom.icon}</span>
                  </div>

                  {/* Shoes Layer */}
                  <div className="flex gap-4 -mt-2 z-10 text-3xl">
                    <span className="drop-shadow">{selectedShoe.icon}</span>
                    <span className="drop-shadow">{selectedShoe.icon}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Avatar Info Badge */}
            <div className="w-full bg-black/40 backdrop-blur-md rounded-2xl p-2.5 text-white text-center z-10 space-y-0.5">
              <div className="font-bold text-xs flex items-center justify-center gap-1.5">
                <Crown className="w-3.5 h-3.5 text-amber-400" />
                <span>إطلالة الموضة الأمريكية 2026</span>
              </div>
              <div className="text-[10px] text-slate-300 truncate">
                {selectedTop.nameAr} + {selectedBottom.nameAr}
              </div>
            </div>
          </div>

          {/* Quick Primary Actions Toolbar */}
          <div className="w-full max-w-sm flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={handleRandomize}
              className="flex-1 py-3 px-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-xs shadow-lg shadow-purple-500/25 transition flex items-center justify-center gap-1.5 cursor-pointer hover:scale-102"
            >
              <Shuffle className="w-4 h-4" />
              <span>تنسيق عشوائي</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadSnapshot}
              className="flex-1 py-3 px-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-xs shadow-lg shadow-emerald-500/25 transition flex items-center justify-center gap-1.5 cursor-pointer hover:scale-102"
            >
              {downloadSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>تم التنزيل!</span>
                </>
              ) : (
                <>
                  <Camera className="w-4 h-4" />
                  <span>تنزيل البطاقة HD</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`p-3 rounded-2xl border transition cursor-pointer ${soundEnabled ? 'bg-slate-100 dark:bg-slate-800 text-purple-600 border-purple-300 dark:border-purple-800' : 'bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700'}`}
              title="تفعيل/إيقاف الأصوات"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Right Column: Fashion Wardrobe & Styling Controls (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">

          {/* Active Challenge Card Header */}
          <div className="p-4 rounded-3xl bg-gradient-to-r from-pink-50 via-purple-50 to-indigo-50 dark:from-slate-900 dark:via-purple-950/40 dark:to-slate-900 border border-purple-200 dark:border-purple-800/60 space-y-3 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-xs sm:text-sm">
                <Trophy className="w-4 h-4 text-amber-500" />
                <span>تحديات الفاشون والموضة الأمريكية 2026:</span>
              </div>
              {challengeScore !== null && (
                <div className="px-3 py-1 rounded-full bg-amber-500 text-white font-black text-xs shadow-xs animate-pulse">
                  ⭐ النتيجة: {challengeScore}%
                </div>
              )}
            </div>

            {/* Challenge Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {CHALLENGES.map((ch) => (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => {
                    triggerSfx('click');
                    setActiveChallenge(activeChallenge?.id === ch.id ? null : ch);
                  }}
                  className={`p-2.5 rounded-2xl text-xs font-bold text-start transition border cursor-pointer ${
                    activeChallenge?.id === ch.id
                      ? 'bg-purple-600 text-white border-purple-600 shadow-sm'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-purple-300'
                  }`}
                >
                  <div className="truncate">{ch.nameAr}</div>
                </button>
              ))}
            </div>

            {activeChallenge && (
              <div className="text-[11px] text-purple-700 dark:text-purple-300 font-medium bg-purple-100/60 dark:bg-purple-950/80 p-2.5 rounded-xl border border-purple-200/60 dark:border-purple-800/60">
                🎯 {activeChallenge.descAr}
              </div>
            )}
          </div>

          {/* Wardrobe Navigation Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 text-xs font-bold">
            <button
              type="button"
              onClick={() => { triggerSfx('click'); setActiveTab('top'); }}
              className={`flex-1 min-w-[80px] py-2 px-3 rounded-xl transition cursor-pointer flex items-center justify-center gap-1 ${activeTab === 'top' ? 'bg-white dark:bg-slate-900 text-purple-600 shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'}`}
            >
              <span>🧥 الملابس العلويّة</span>
            </button>
            <button
              type="button"
              onClick={() => { triggerSfx('click'); setActiveTab('bottom'); }}
              className={`flex-1 min-w-[80px] py-2 px-3 rounded-xl transition cursor-pointer flex items-center justify-center gap-1 ${activeTab === 'bottom' ? 'bg-white dark:bg-slate-900 text-purple-600 shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'}`}
            >
              <span>👖 البنطال والتنانير</span>
            </button>
            <button
              type="button"
              onClick={() => { triggerSfx('click'); setActiveTab('shoes'); }}
              className={`flex-1 min-w-[80px] py-2 px-3 rounded-xl transition cursor-pointer flex items-center justify-center gap-1 ${activeTab === 'shoes' ? 'bg-white dark:bg-slate-900 text-purple-600 shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'}`}
            >
              <span>👟 الأحذية</span>
            </button>
            <button
              type="button"
              onClick={() => { triggerSfx('click'); setActiveTab('hair'); }}
              className={`flex-1 min-w-[80px] py-2 px-3 rounded-xl transition cursor-pointer flex items-center justify-center gap-1 ${activeTab === 'hair' ? 'bg-white dark:bg-slate-900 text-purple-600 shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'}`}
            >
              <span>💇‍♀️ تسريحة الشعر</span>
            </button>
            <button
              type="button"
              onClick={() => { triggerSfx('click'); setActiveTab('acc'); }}
              className={`flex-1 min-w-[80px] py-2 px-3 rounded-xl transition cursor-pointer flex items-center justify-center gap-1 ${activeTab === 'acc' ? 'bg-white dark:bg-slate-900 text-purple-600 shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'}`}
            >
              <span>🕶️ الإكسسوارات</span>
            </button>
            <button
              type="button"
              onClick={() => { triggerSfx('click'); setActiveTab('bg'); }}
              className={`flex-1 min-w-[80px] py-2 px-3 rounded-xl transition cursor-pointer flex items-center justify-center gap-1 ${activeTab === 'bg' ? 'bg-white dark:bg-slate-900 text-purple-600 shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'}`}
            >
              <span>🏙️ الخلفية</span>
            </button>
            <button
              type="button"
              onClick={() => { triggerSfx('click'); setActiveTab('skin'); }}
              className={`flex-1 min-w-[80px] py-2 px-3 rounded-xl transition cursor-pointer flex items-center justify-center gap-1 ${activeTab === 'skin' ? 'bg-white dark:bg-slate-900 text-purple-600 shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'}`}
            >
              <span>🎨 لون البشرة</span>
            </button>
          </div>

          {/* Wardrobe Items Grid Selector */}
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm min-h-[280px]">
            
            {/* 1. Tops Tab */}
            {activeTab === 'top' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {TOPS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => { triggerSfx('click'); setSelectedTop(item); }}
                    className={`p-3.5 rounded-2xl border text-start transition flex items-center justify-between cursor-pointer ${
                      selectedTop.id === item.id
                        ? 'bg-purple-50 dark:bg-purple-950/50 border-purple-500 ring-2 ring-purple-500/20'
                        : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/80 hover:border-purple-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shadow-xs shrink-0"
                        style={{ backgroundColor: item.color }}
                      >
                        {item.icon}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white text-xs">{item.nameAr}</div>
                        <div className="text-[10px] text-slate-400">{item.nameEn}</div>
                      </div>
                    </div>
                    {selectedTop.id === item.id && <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />}
                  </button>
                ))}
              </div>
            )}

            {/* 2. Bottoms Tab */}
            {activeTab === 'bottom' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {BOTTOMS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => { triggerSfx('click'); setSelectedBottom(item); }}
                    className={`p-3.5 rounded-2xl border text-start transition flex items-center justify-between cursor-pointer ${
                      selectedBottom.id === item.id
                        ? 'bg-purple-50 dark:bg-purple-950/50 border-purple-500 ring-2 ring-purple-500/20'
                        : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/80 hover:border-purple-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shadow-xs shrink-0"
                        style={{ backgroundColor: item.color }}
                      >
                        {item.icon}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white text-xs">{item.nameAr}</div>
                        <div className="text-[10px] text-slate-400">{item.nameEn}</div>
                      </div>
                    </div>
                    {selectedBottom.id === item.id && <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />}
                  </button>
                ))}
              </div>
            )}

            {/* 3. Shoes Tab */}
            {activeTab === 'shoes' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SHOES.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => { triggerSfx('click'); setSelectedShoe(item); }}
                    className={`p-3.5 rounded-2xl border text-start transition flex items-center justify-between cursor-pointer ${
                      selectedShoe.id === item.id
                        ? 'bg-purple-50 dark:bg-purple-950/50 border-purple-500 ring-2 ring-purple-500/20'
                        : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/80 hover:border-purple-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shadow-xs shrink-0"
                        style={{ backgroundColor: item.color }}
                      >
                        {item.icon}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white text-xs">{item.nameAr}</div>
                        <div className="text-[10px] text-slate-400">{item.nameEn}</div>
                      </div>
                    </div>
                    {selectedShoe.id === item.id && <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />}
                  </button>
                ))}
              </div>
            )}

            {/* 4. Hair Tab */}
            {activeTab === 'hair' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {HAIR_STYLES.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => { triggerSfx('click'); setSelectedHair(item); }}
                    className={`p-3.5 rounded-2xl border text-start transition flex items-center justify-between cursor-pointer ${
                      selectedHair.id === item.id
                        ? 'bg-purple-50 dark:bg-purple-950/50 border-purple-500 ring-2 ring-purple-500/20'
                        : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/80 hover:border-purple-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shadow-xs shrink-0"
                        style={{ backgroundColor: item.color }}
                      >
                        {item.icon}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white text-xs">{item.nameAr}</div>
                        <div className="text-[10px] text-slate-400">{item.nameEn}</div>
                      </div>
                    </div>
                    {selectedHair.id === item.id && <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />}
                  </button>
                ))}
              </div>
            )}

            {/* 5. Accessories Tab */}
            {activeTab === 'acc' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ACCESSORIES.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => { triggerSfx('click'); setSelectedAcc(item); }}
                    className={`p-3.5 rounded-2xl border text-start transition flex items-center justify-between cursor-pointer ${
                      selectedAcc.id === item.id
                        ? 'bg-purple-50 dark:bg-purple-950/50 border-purple-500 ring-2 ring-purple-500/20'
                        : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/80 hover:border-purple-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shadow-xs shrink-0"
                        style={{ backgroundColor: item.color }}
                      >
                        {item.icon}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white text-xs">{item.nameAr}</div>
                        <div className="text-[10px] text-slate-400">{item.nameEn}</div>
                      </div>
                    </div>
                    {selectedAcc.id === item.id && <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />}
                  </button>
                ))}
              </div>
            )}

            {/* 6. Backgrounds Tab */}
            {activeTab === 'bg' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {BACKGROUNDS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => { triggerSfx('click'); setSelectedBg(item); }}
                    className={`p-3.5 rounded-2xl border text-start transition flex items-center justify-between cursor-pointer ${
                      selectedBg.id === item.id
                        ? 'bg-purple-50 dark:bg-purple-950/50 border-purple-500 ring-2 ring-purple-500/20'
                        : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/80 hover:border-purple-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.style} border border-slate-300 shrink-0`} />
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white text-xs">{item.nameAr}</div>
                        <div className="text-[10px] text-slate-400">{item.nameEn}</div>
                      </div>
                    </div>
                    {selectedBg.id === item.id && <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />}
                  </button>
                ))}
              </div>
            )}

            {/* 7. Skin Tone Tab */}
            {activeTab === 'skin' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SKIN_TONES.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => { triggerSfx('click'); setSelectedSkin(item); }}
                    className={`p-3.5 rounded-2xl border text-start transition flex items-center justify-between cursor-pointer ${
                      selectedSkin.id === item.id
                        ? 'bg-purple-50 dark:bg-purple-950/50 border-purple-500 ring-2 ring-purple-500/20'
                        : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/80 hover:border-purple-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-8 h-8 rounded-full border border-black/20 shadow-xs shrink-0"
                        style={{ backgroundColor: item.hex }}
                      />
                      <div className="font-bold text-slate-900 dark:text-white text-xs">{item.nameAr}</div>
                    </div>
                    {selectedSkin.id === item.id && <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />}
                  </button>
                ))}
              </div>
            )}

          </div>

          {/* Direct Article CTA Card */}
          <div className="p-5 rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
            <div className="space-y-1 text-center sm:text-start">
              <div className="font-black text-sm sm:text-base flex items-center justify-center sm:justify-start gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>اقرئي دليل تنسيق أزياء ستايل الشارع الأمريكي لعام 2026</span>
              </div>
              <div className="text-xs text-blue-100 opacity-90">
                تعرفي على أسرار دمج الألوان والقطع العصرية وروابط اللعب والتنزيل الآمن عبر مقالنا الحصري.
              </div>
            </div>

            {onNavigate && (
              <button
                type="button"
                onClick={() => onNavigate('blog')}
                className="px-5 py-2.5 rounded-2xl bg-white text-slate-900 font-bold text-xs hover:bg-slate-100 transition shadow-md flex items-center gap-1.5 shrink-0 cursor-pointer"
              >
                <span>تصفح المقال بالمدونة</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </button>
            )}
          </div>

        </div>

      </div>

      {/* AdSense Lower Banner Placement */}
      <AdSensePlacement currentLang={currentLang} format="in-article" />
    </div>
  );
};

export default AmericanStyleGamePage;
