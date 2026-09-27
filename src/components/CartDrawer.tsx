import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  CreditCard, 
  ShieldCheck,
  Tag,
  MapPin,
  Building2,
  Copy,
  Check,
  QrCode,
  Smartphone,
  Landmark,
  Zap,
  Clock,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Language, Currency, CartItem } from '../types';
import { TRANSLATIONS, CURRENCIES } from '../locales/translations';
import { EGYPT_GOVERNORATES } from '../data/egyptGovernorates';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  currentLang: Language;
  currentCurrency: Currency;
}

export type PaymentMethodId = 
  | 'instapay'
  | 'fawry'
  | 'aman'
  | 'meeza'
  | 'bank_transfer'
  | 'vodafone_cash'
  | 'credit_card';

export interface PaymentOption {
  id: PaymentMethodId;
  nameAr: string;
  nameEn: string;
  badge: string;
  iconType: 'instapay' | 'fawry' | 'aman' | 'meeza' | 'bank' | 'wallet' | 'card';
  descriptionAr: string;
  instantActive: boolean;
}

export const PAYMENT_METHODS: PaymentOption[] = [
  {
    id: 'instapay',
    nameAr: 'إنستا باي مصر (InstaPay)',
    nameEn: 'InstaPay Egypt (IPN Network)',
    badge: 'الأسرع والأكثر طلباً ⚡',
    iconType: 'instapay',
    descriptionAr: 'تحويل لحظي ومباشر بدون أي رسوم إضافية عبر تطبيق إنستا باي',
    instantActive: true,
  },
  {
    id: 'fawry',
    nameAr: 'فوري باي (Fawry Pay)',
    nameEn: 'Fawry Pay Service',
    badge: 'متوفر في 200,000+ منفذ 🟡',
    iconType: 'fawry',
    descriptionAr: 'ادفع عبر أي منفذ فوري أو تطبيق MyFawry برقم الخدمة والمرجع',
    instantActive: true,
  },
  {
    id: 'aman',
    nameAr: 'أمان للدفع الإلكتروني (Aman)',
    nameEn: 'Aman Electronic Payment',
    badge: 'منافذ وفروع أمان 🔵',
    iconType: 'aman',
    descriptionAr: 'سداد فوري عبر منافذ وفروع أمان في جميع المحافظات بكود الفاتورة',
    instantActive: true,
  },
  {
    id: 'meeza',
    nameAr: 'بطاقة ميزة الوطنية (Meeza)',
    nameEn: 'Meeza National Card',
    badge: 'كافة البنوك والبريد 💳',
    iconType: 'meeza',
    descriptionAr: 'دفع إلكتروني مباشر باستخدام بطاقة ميزة الصادرة من البنوك المصرية',
    instantActive: true,
  },
  {
    id: 'bank_transfer',
    nameAr: 'التحويل البنكي (الأهلي / CIB / بنك مصر)',
    nameEn: 'Direct Bank Transfer (NBE / CIB / Banque Misr)',
    badge: 'حسابات رسمية معتمدة 🏦',
    iconType: 'bank',
    descriptionAr: 'تحويل بنكي رسمي معتمد عبر IBAN ورقم الحساب البنكي',
    instantActive: true,
  },
  {
    id: 'vodafone_cash',
    nameAr: 'محافظ المحمول (فودافون كاش / أورنج / وي / اتصالات)',
    nameEn: 'Mobile Wallets (Vodafone / Orange / Etisalat / WE Pay)',
    badge: 'كاش فوري 📱',
    iconType: 'wallet',
    descriptionAr: 'تحويل لحظي من أي محفظة إلكترونية على الهاتف المحمول',
    instantActive: true,
  },
  {
    id: 'credit_card',
    nameAr: 'البطاقات الائتمانية الدولية (Visa / MasterCard)',
    nameEn: 'Credit & Debit Cards (Visa / Mastercard)',
    badge: 'تشفير 256-Bit 🔒',
    iconType: 'card',
    descriptionAr: 'قبول جميع بطاقات فيزا وماستركارد الدولية والمحلية بنظام 3D Secure',
    instantActive: true,
  },
];

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onRemoveItem,
  onClearCart,
  currentLang,
  currentCurrency,
}) => {
  const t = TRANSLATIONS[currentLang];
  const [step, setStep] = useState<'cart' | 'payment_select' | 'payment_process' | 'completed'>('cart');
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [selectedGovernorate, setSelectedGovernorate] = useState('cairo');
  const [selectedCountry, setSelectedCountry] = useState('EG');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethodId>('instapay');
  const [orderTicket, setOrderTicket] = useState('');
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [clientTxReference, setClientTxReference] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  if (!isOpen) return null;

  const currentCurrObj = CURRENCIES.find(c => c.code === currentCurrency) || CURRENCIES[0];
  const activeGov = EGYPT_GOVERNORATES.find(g => g.id === selectedGovernorate);
  const activePayment = PAYMENT_METHODS.find(p => p.id === selectedPaymentMethod) || PAYMENT_METHODS[0];

  const subtotalUSD = cartItems.reduce((acc, item) => {
    const multiplier = item.billingCycle === 'annually' ? 12 * 0.8 : 1;
    return acc + item.service.basePriceUSD * item.quantity * multiplier;
  }, 0);

  const discountUSD = subtotalUSD * (discountPercent / 100);
  const totalUSD = Math.max(0, subtotalUSD - discountUSD);
  const totalInSelectedCurrency = totalUSD * currentCurrObj.rate;
  const totalInEGP = totalUSD * 48.5; // EGP conversion for local Egyptian payment reference

  const formatPrice = (usd: number) => {
    const converted = usd * currentCurrObj.rate;
    return `${currentCurrObj.symbol} ${converted.toFixed(2)}`;
  };

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (code === 'GIS2026' || code === 'ADSENSE' || code === 'EGYPT' || code === 'INSTAPAY' || code === 'FAWRY') {
      setDiscountPercent(15);
    } else {
      alert('كوبون غير صالح. جرب "GIS2026" أو "EGYPT" للحصول على خصم 15%');
    }
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handleProceedToPayment = () => {
    if (cartItems.length === 0) return;
    setStep('payment_select');
  };

  const handleSelectMethodAndProceed = (methodId: PaymentMethodId) => {
    setSelectedPaymentMethod(methodId);
    setStep('payment_process');
  };

  const handleConfirmFinalPayment = () => {
    const ticket = 'GIS-ORD-' + Math.floor(100000 + Math.random() * 900000);
    setOrderTicket(ticket);
    setStep('completed');

    try {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 },
      });
    } catch {
      // safe fallback
    }
  };

  const handleResetOrder = () => {
    onClearCart();
    setStep('cart');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in"
      />

      <div className="absolute inset-y-0 right-0 rtl:right-auto rtl:left-0 max-w-full flex">
        <div className="w-screen max-w-lg bg-white dark:bg-slate-900 shadow-2xl border-l rtl:border-l-0 rtl:border-r border-slate-200 dark:border-slate-800 flex flex-col">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/40">
            <div className="flex items-center gap-2.5">
              {step !== 'cart' && step !== 'completed' && (
                <button
                  onClick={() => setStep(step === 'payment_process' ? 'payment_select' : 'cart')}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  title="الرجوع"
                >
                  <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
                </button>
              )}
              <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                  {step === 'cart' && 'سلة الخدمات والباقات السحابية'}
                  {step === 'payment_select' && 'اختيار طريقة الدفع المعتمدة'}
                  {step === 'payment_process' && `إتمام السداد: ${activePayment.nameAr}`}
                  {step === 'completed' && 'تأكيد التفعيل والطلب'}
                </h3>
                <span className="text-[11px] text-slate-400">
                  {step === 'cart' && `${cartItems.length} عنصر في السلة`}
                  {step === 'payment_select' && 'دعم إنستا باي، فوري، أمان، ميزة، تحويل بنكي'}
                  {step === 'payment_process' && 'بوابة الدفع الآمنة والربط الفوري'}
                  {step === 'completed' && 'سيرفرات جاهزة للعمل فوراً'}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content by Step */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            
            {/* STEP 1: CART REVIEW */}
            {step === 'cart' && (
              <>
                {cartItems.length === 0 ? (
                  <div className="text-center py-16 text-slate-400 space-y-3">
                    <ShoppingBag className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-600" />
                    <p className="text-sm font-medium">{t.cart_empty}</p>
                    <p className="text-xs text-slate-400">تصفح المتجر وأضف السيرفرات أو الخدمات التي تناسبك</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map(item => (
                      <div 
                        key={item.service.id}
                        className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 flex items-start justify-between gap-3 shadow-xs"
                      >
                        <div className="space-y-1">
                          <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                            {item.service.name[currentLang] || item.service.name.en}
                          </div>
                          <div className="text-[11px] text-slate-500 dark:text-slate-400">
                            دورة الفوترة: {item.billingCycle === 'annually' ? 'سنوي (خصم 20% مفعّل)' : 'شهري'}
                          </div>
                          <div className="font-bold text-blue-600 dark:text-blue-400 text-sm pt-0.5">
                            {formatPrice(
                              item.service.basePriceUSD * (item.billingCycle === 'annually' ? 12 * 0.8 : 1)
                            )}
                          </div>
                        </div>
                        <button
                          onClick={() => onRemoveItem(item.service.id)}
                          className="text-slate-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                          title="حذف من السلة"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}

                    {/* Location & Governorate Selector */}
                    <div className="p-3.5 rounded-xl border border-blue-200 dark:border-blue-900/50 bg-blue-50/50 dark:bg-blue-950/30 space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-200">
                          <MapPin className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                          <span>موقع خادم الاستضافة والمحافظة للفوترة:</span>
                        </div>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold">
                          {activeGov?.cdnLatencyMs || 15}ms Ping
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <select
                          value={selectedCountry}
                          onChange={e => setSelectedCountry(e.target.value)}
                          className="px-2.5 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-semibold text-slate-800 dark:text-slate-200"
                        >
                          <option value="EG">🇪🇬 مصر (Egypt)</option>
                          <option value="SA">🇸🇦 السعودية (KSA)</option>
                          <option value="AE">🇦🇪 الإمارات (UAE)</option>
                          <option value="GLOBAL">🌍 نطاق عالمي</option>
                        </select>

                        {selectedCountry === 'EG' ? (
                          <select
                            value={selectedGovernorate}
                            onChange={e => setSelectedGovernorate(e.target.value)}
                            className="px-2.5 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold text-blue-600 dark:text-blue-400"
                          >
                            {EGYPT_GOVERNORATES.map(gov => (
                              <option key={gov.id} value={gov.id}>
                                {gov.nameAr} ({gov.cdnLatencyMs}ms)
                              </option>
                            ))}
                          </select>
                        ) : (
                          <input
                            type="text"
                            placeholder="المدينة"
                            className="px-2.5 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs"
                          />
                        )}
                      </div>
                    </div>

                    {/* Egyptian Payment Badges Highlights */}
                    <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5">
                      <div className="text-[11px] font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5 text-amber-500" />
                        <span>طرق الدفع المعتمدة في مصر والعالم:</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        <span className="px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-600 dark:text-purple-400 text-[10px] font-bold border border-purple-500/20">
                          ⚡ إنستا باي InstaPay
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[10px] font-bold border border-amber-500/20">
                          🟡 فوري Fawry
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px] font-bold border border-blue-500/20">
                          🔵 أمان Aman
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold border border-emerald-500/20">
                          💳 بطاقات ميزة Meeza
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold border border-indigo-500/20">
                          🏦 بنك الأهلي / CIB
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-red-500/10 text-red-600 dark:text-red-400 text-[10px] font-bold border border-red-500/20">
                          📱 فودافون كاش
                        </span>
                      </div>
                    </div>

                    {/* Coupon Box */}
                    <form onSubmit={handleApplyCoupon} className="pt-1 flex gap-2">
                      <div className="relative flex-1">
                        <Tag className="w-4 h-4 text-slate-400 absolute left-3 rtl:left-auto rtl:right-3 top-3" />
                        <input
                          type="text"
                          value={couponCode}
                          onChange={e => setCouponCode(e.target.value)}
                          placeholder="كوبون الخصم (جرب GIS2026 أو EGYPT)..."
                          className="w-full px-9 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-800 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <button
                        type="submit"
                        className="px-3 py-2 bg-slate-800 hover:bg-slate-900 dark:bg-slate-700 dark:hover:bg-slate-600 text-white rounded-lg text-xs font-bold transition-colors"
                      >
                        تطبيق
                      </button>
                    </form>

                    {discountPercent > 0 && (
                      <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 text-xs flex justify-between font-bold">
                        <span>تم تطبيق خصم الكوبون ({discountPercent}%)</span>
                        <span>-{formatPrice(discountUSD)}</span>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}

            {/* STEP 2: PAYMENT METHOD SELECTION */}
            {step === 'payment_select' && (
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 text-xs text-blue-900 dark:text-blue-200 flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block">جميع طرق الدفع الرسمية في مصر مفعلة:</span>
                    <span>اختر وسيلة الدفع المناسبة لك لإتمام عملية الاشتراك وتفعيل السيرفر فوراً.</span>
                  </div>
                </div>

                <div className="space-y-2.5">
                  {PAYMENT_METHODS.map(method => (
                    <div
                      key={method.id}
                      onClick={() => handleSelectMethodAndProceed(method.id)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        selectedPaymentMethod === method.id
                          ? 'border-blue-500 bg-blue-50/70 dark:bg-blue-950/50 shadow-sm ring-2 ring-blue-400/40'
                          : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-black text-xs text-white shadow-xs bg-slate-900">
                          {method.iconType === 'instapay' && <span className="text-purple-300">⚡ IPN</span>}
                          {method.iconType === 'fawry' && <span className="text-amber-400">🟡 Fawry</span>}
                          {method.iconType === 'aman' && <span className="text-blue-400">🔵 Aman</span>}
                          {method.iconType === 'meeza' && <span className="text-emerald-400">💳 Meeza</span>}
                          {method.iconType === 'bank' && <Landmark className="w-5 h-5 text-indigo-400" />}
                          {method.iconType === 'wallet' && <Smartphone className="w-5 h-5 text-red-400" />}
                          {method.iconType === 'card' && <CreditCard className="w-5 h-5 text-sky-400" />}
                        </div>
                        <div className="space-y-0.5 text-start">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                              {method.nameAr}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                            {method.descriptionAr}
                          </p>
                          <span className="inline-block text-[10px] font-bold text-blue-600 dark:text-blue-400">
                            {method.badge}
                          </span>
                        </div>
                      </div>
                      <div className="shrink-0 text-slate-400">
                        <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 3: PAYMENT DETAILS & ACTION */}
            {step === 'payment_process' && (
              <div className="space-y-4">
                {/* Method Summary Header */}
                <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white border border-slate-700 shadow-md space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-300">طريقة الدفع المختارة:</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-[10px]">
                      تفعيل مؤتمت 100%
                    </span>
                  </div>
                  <div className="text-base font-extrabold text-white flex items-center gap-2">
                    <span>{activePayment.nameAr}</span>
                  </div>
                  <div className="pt-2 border-t border-slate-700 flex justify-between items-center text-xs">
                    <span className="text-slate-400">المبلغ المطلوب سداده:</span>
                    <div className="text-start">
                      <span className="text-emerald-400 font-black text-sm">{formatPrice(totalUSD)}</span>
                      {currentCurrency !== 'EGP' && (
                        <span className="text-slate-300 text-[11px] block">
                          (يعادل تقريباً {totalInEGP.toFixed(2)} ج.م مصري)
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Specific Screen for InstaPay */}
                {selectedPaymentMethod === 'instapay' && (
                  <div className="p-4 rounded-2xl bg-purple-50/60 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900/60 space-y-3.5 text-xs">
                    <div className="flex items-center gap-2 font-bold text-purple-950 dark:text-purple-200">
                      <Zap className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                      <span>بيانات التحويل الفوري عبر تطبيق إنستا باي (InstaPay):</span>
                    </div>

                    {/* IPA Address */}
                    <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-purple-100 dark:border-purple-900/40 space-y-1">
                      <div className="text-[11px] text-slate-500">عنوان الدفع اللحظي (IPA / Payment Address):</div>
                      <div className="flex items-center justify-between gap-2 font-mono font-bold text-sm text-purple-700 dark:text-purple-300">
                        <span>gis.egypt@instapay</span>
                        <button
                          onClick={() => handleCopy('gis.egypt@instapay', 'ipa')}
                          className="px-2 py-1 rounded-md bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300 text-xs flex items-center gap-1 hover:bg-purple-200"
                        >
                          {copiedField === 'ipa' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedField === 'ipa' ? 'تم النسخ' : 'نسخ'}</span>
                        </button>
                      </div>
                    </div>

                    {/* Phone for InstaPay */}
                    <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-purple-100 dark:border-purple-900/40 space-y-1">
                      <div className="text-[11px] text-slate-500">أو التحويل عبر رقم الهاتف المسجل:</div>
                      <div className="flex items-center justify-between gap-2 font-mono font-bold text-sm text-slate-800 dark:text-slate-200">
                        <span>+20 100 234 5678</span>
                        <button
                          onClick={() => handleCopy('+201002345678', 'phone')}
                          className="px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs flex items-center gap-1 hover:bg-slate-200"
                        >
                          {copiedField === 'phone' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedField === 'phone' ? 'تم النسخ' : 'نسخ'}</span>
                        </button>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-700 dark:text-slate-300">
                        رقم العملية في إنستا باي (Transaction Ref):
                      </label>
                      <input
                        type="text"
                        value={clientTxReference}
                        onChange={e => setClientTxReference(e.target.value)}
                        placeholder="أدخل الرقم المرجعي للتحويل (مثال: IPN-8472910)"
                        className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
                      />
                    </div>
                  </div>
                )}

                {/* Specific Screen for Fawry */}
                {selectedPaymentMethod === 'fawry' && (
                  <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 space-y-3.5 text-xs">
                    <div className="flex items-center gap-2 font-bold text-amber-950 dark:text-amber-200">
                      <span className="text-base">🟡</span>
                      <span>سداد فاتورة الاستضافة عبر منافذ فوري (Fawry Pay):</span>
                    </div>

                    <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-amber-200 dark:border-amber-900/40 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-slate-500">كود خدمة فوري (Service Code):</span>
                        <span className="font-mono font-bold text-slate-900 dark:text-white">788 (GIS Cloud)</span>
                      </div>
                      <div className="flex justify-between items-center pt-1 border-t border-slate-100 dark:border-slate-700">
                        <span className="text-slate-500">الرقم المرجعي لسداد الفاتورة:</span>
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono font-extrabold text-amber-600 dark:text-amber-400 text-sm">
                            984 512 870
                          </span>
                          <button
                            onClick={() => handleCopy('984512870', 'fawry_code')}
                            className="p-1 rounded bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300"
                          >
                            <Copy className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <div className="text-[10px] text-slate-400">صلاحية كود السداد: 48 ساعة من تاريخ الطلب</div>
                    </div>

                    <div className="space-y-1 text-[11px] text-slate-600 dark:text-slate-300">
                      <div>1. توجه لأي منفذ أو كشك به ماكينة فوري.</div>
                      <div>2. اطلب دفع "خدمات تكنولوجيا GIS" بكود الخدمة 788.</div>
                      <div>3. أعطِ التاجر الرقم المرجعي 984512870 وسدد المبلغ.</div>
                    </div>
                  </div>
                )}

                {/* Specific Screen for Aman */}
                {selectedPaymentMethod === 'aman' && (
                  <div className="p-4 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/60 space-y-3.5 text-xs">
                    <div className="flex items-center gap-2 font-bold text-blue-950 dark:text-blue-200">
                      <span className="text-base">🔵</span>
                      <span>سداد فاتورة الاستضافة عبر منافذ وفروع أمان (Aman):</span>
                    </div>

                    <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-blue-200 dark:border-blue-900/40 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-slate-500">كود تاجر أمان (Merchant Code):</span>
                        <span className="font-mono font-bold text-slate-900 dark:text-white">AMN-GIS-410</span>
                      </div>
                      <div className="flex justify-between items-center pt-1 border-t border-slate-100 dark:border-slate-700">
                        <span className="text-slate-500">رقم الفاتورة الإلكتروني:</span>
                        <span className="font-mono font-extrabold text-blue-600 dark:text-blue-400 text-sm">
                          88320491
                        </span>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      يمكن السداد من خلال أكثر من 120,000 نقطة بيع لشبكة أمان بجميع محافظات الجمهورية.
                    </p>
                  </div>
                )}

                {/* Specific Screen for Meeza Card */}
                {selectedPaymentMethod === 'meeza' && (
                  <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/60 space-y-3 text-xs">
                    <div className="flex items-center gap-2 font-bold text-emerald-950 dark:text-emerald-200">
                      <CreditCard className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      <span>دفع مباشر ببطاقة ميزة الوطنية (Meeza Card):</span>
                    </div>

                    <div className="space-y-2">
                      <div>
                        <label className="text-slate-700 dark:text-slate-300 font-bold block mb-1">
                          الاسم المدون على بطاقة ميزة:
                        </label>
                        <input
                          type="text"
                          value={cardHolder}
                          onChange={e => setCardHolder(e.target.value)}
                          placeholder="الاسم ثلاثي كما يظهر في البطاقة"
                          className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
                        />
                      </div>

                      <div>
                        <label className="text-slate-700 dark:text-slate-300 font-bold block mb-1">
                          رقم بطاقة ميزة (16 رقماً):
                        </label>
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={e => setCardNumber(e.target.value)}
                          placeholder="5078 •••• •••• ••••"
                          maxLength={19}
                          className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-mono"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-slate-700 dark:text-slate-300 font-bold block mb-1">
                            تاريخ الانتهاء:
                          </label>
                          <input
                            type="text"
                            value={cardExpiry}
                            onChange={e => setCardExpiry(e.target.value)}
                            placeholder="MM / YY"
                            maxLength={5}
                            className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-mono"
                          />
                        </div>
                        <div>
                          <label className="text-slate-700 dark:text-slate-300 font-bold block mb-1">
                            الرمز السري (CVV):
                          </label>
                          <input
                            type="password"
                            value={cardCvv}
                            onChange={e => setCardCvv(e.target.value)}
                            placeholder="•••"
                            maxLength={4}
                            className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-mono"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Specific Screen for Bank Transfer */}
                {selectedPaymentMethod === 'bank_transfer' && (
                  <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/60 space-y-3 text-xs">
                    <div className="flex items-center gap-2 font-bold text-indigo-950 dark:text-indigo-200">
                      <Landmark className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                      <span>الحسابات البنكية الرسمية المعتمدة (تحويل محلي ودولي):</span>
                    </div>

                    {/* NBE */}
                    <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-indigo-100 dark:border-indigo-900/40 space-y-1.5">
                      <div className="font-bold text-slate-800 dark:text-slate-200 flex justify-between">
                        <span>🏦 البنك الأهلي المصري (NBE)</span>
                        <span className="text-[10px] text-emerald-600 font-mono">حساب جاري رسمي</span>
                      </div>
                      <div className="text-[11px] text-slate-500">
                        اسم المستفيد: شركة خدمات الإنترنت العالمية (GIS Egypt)
                      </div>
                      <div className="flex justify-between items-center text-xs font-mono font-bold">
                        <span>رقم الحساب: 1004589201994</span>
                        <button
                          onClick={() => handleCopy('1004589201994', 'nbe_acc')}
                          className="p-1 rounded bg-slate-100 dark:bg-slate-700"
                        >
                          <Copy className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono">
                        IBAN: EG3800020001004589201994000
                      </div>
                    </div>

                    {/* CIB */}
                    <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-indigo-100 dark:border-indigo-900/40 space-y-1.5">
                      <div className="font-bold text-slate-800 dark:text-slate-200 flex justify-between">
                        <span>🏦 البنك التجاري الدولي (CIB)</span>
                        <span className="text-[10px] text-blue-600 font-mono">SWIFT: CIBEGCAXXX</span>
                      </div>
                      <div className="flex justify-between items-center text-xs font-mono font-bold">
                        <span>رقم الحساب: 10004928172</span>
                        <button
                          onClick={() => handleCopy('10004928172', 'cib_acc')}
                          className="p-1 rounded bg-slate-100 dark:bg-slate-700"
                        >
                          <Copy className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Specific Screen for Mobile Wallets (Vodafone Cash, etc.) */}
                {selectedPaymentMethod === 'vodafone_cash' && (
                  <div className="p-4 rounded-2xl bg-red-50/60 dark:bg-red-950/30 border border-red-200 dark:border-red-900/60 space-y-3 text-xs">
                    <div className="flex items-center gap-2 font-bold text-red-950 dark:text-red-200">
                      <Smartphone className="w-4 h-4 text-red-600 dark:text-red-400" />
                      <span>التحويل عبر محافظ الهاتف (فودافون كاش / أورنج / اتصالات / وي):</span>
                    </div>

                    <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-red-100 dark:border-red-900/40 space-y-1">
                      <div className="text-[11px] text-slate-500">رقم المحفظة المعتمد للتحويل:</div>
                      <div className="flex items-center justify-between gap-2 font-mono font-bold text-sm text-red-600 dark:text-red-400">
                        <span>0100 234 5678</span>
                        <button
                          onClick={() => handleCopy('01002345678', 'voda')}
                          className="px-2 py-1 rounded-md bg-red-100 dark:bg-red-900/60 text-red-700 dark:text-red-300 text-xs flex items-center gap-1"
                        >
                          {copiedField === 'voda' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedField === 'voda' ? 'تم النسخ' : 'نسخ'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Specific Screen for Credit Cards (Visa / Mastercard) */}
                {selectedPaymentMethod === 'credit_card' && (
                  <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-3 text-xs">
                    <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                      <CreditCard className="w-4 h-4 text-blue-600" />
                      <span>بطاقات فيزا وماستركارد (Visa / MasterCard):</span>
                    </div>

                    <div className="space-y-2">
                      <div>
                        <label className="text-slate-700 dark:text-slate-300 font-bold block mb-1">
                          رقم البطاقة:
                        </label>
                        <input
                          type="text"
                          placeholder="4111 •••• •••• ••••"
                          maxLength={19}
                          className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-mono"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-slate-700 dark:text-slate-300 font-bold block mb-1">
                            تاريخ الانتهاء:
                          </label>
                          <input
                            type="text"
                            placeholder="MM / YY"
                            className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-mono"
                          />
                        </div>
                        <div>
                          <label className="text-slate-700 dark:text-slate-300 font-bold block mb-1">
                            الرمز السري (CVV):
                          </label>
                          <input
                            type="password"
                            placeholder="•••"
                            maxLength={4}
                            className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-mono"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* STEP 4: COMPLETED ORDER CONFIRMATION */}
            {step === 'completed' && (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="font-extrabold text-xl text-slate-900 dark:text-white">
                  تم استلام طلبك وتفعيله بنجاح! 🎉
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                  تم ربط الخدمة وتجهيز العقد السحابية لموقعك، وتم إرسال بيانات لوحة التحكم وفاتورة الدفع عبر البريد الإلكتروني.
                </p>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-xs space-y-2.5 text-start shadow-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">رقم الفاتورة والطلب:</span>
                    <span className="font-mono font-bold text-blue-600 dark:text-blue-400">{orderTicket}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">طريقة السداد:</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{activePayment.nameAr}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">المحافظة / النطاق:</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      {selectedCountry === 'EG' && activeGov ? `${activeGov.nameAr} (مصر 🇪🇬)` : 'نطاق دولي'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">المبلغ المسدد:</span>
                    <span className="font-bold text-emerald-600 text-sm">{formatPrice(totalUSD)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">حالة الخادم:</span>
                    <span className="text-emerald-600 font-bold flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span>مفعل وجاهز للعمل (Live Operational)</span>
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleResetOrder}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition-colors shadow-sm"
                >
                  العودة للمتجر
                </button>
              </div>
            )}

          </div>

          {/* Footer calculation & Action Buttons */}
          {step !== 'completed' && cartItems.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/60 space-y-3">
              <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                <div className="flex justify-between">
                  <span>المجموع الفرعي:</span>
                  <span>{formatPrice(subtotalUSD)}</span>
                </div>
                {discountPercent > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>الخصم المطبق ({discountPercent}%):</span>
                    <span>-{formatPrice(discountUSD)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm sm:text-base font-extrabold text-slate-900 dark:text-white pt-2 border-t border-slate-200 dark:border-slate-700">
                  <span>المجموع النهائي:</span>
                  <div className="text-end">
                    <span className="text-blue-600 dark:text-blue-400">{formatPrice(totalUSD)}</span>
                    {currentCurrency !== 'EGP' && (
                      <span className="text-[11px] font-normal text-slate-400 block">
                        ≈ {totalInEGP.toFixed(2)} ج.م
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {step === 'cart' && (
                <button
                  onClick={handleProceedToPayment}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>متابعة لاختيار طريقة الدفع (إنستا باي، فوري، ميزة...)</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </button>
              )}

              {step === 'payment_select' && (
                <button
                  onClick={() => handleSelectMethodAndProceed(selectedPaymentMethod)}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <span>متابعة الدفع عبر {activePayment.nameAr}</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </button>
              )}

              {step === 'payment_process' && (
                <button
                  onClick={handleConfirmFinalPayment}
                  className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold rounded-xl text-xs sm:text-sm shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>تأكيد السداد وتفعيل السيرفر فوراً ⚡</span>
                </button>
              )}

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>دفع معتمد ومشفر 256-Bit TLS مع تفعيل فوري وضمان استرجاع 30 يوماً</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
