import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  CheckCircle2, 
  ArrowRight, 
  CreditCard, 
  ShieldCheck,
  Tag
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Language, Currency, CartItem } from '../types';
import { TRANSLATIONS, CURRENCIES } from '../locales/translations';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  currentLang: Language;
  currentCurrency: Currency;
}

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
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderTicket, setOrderTicket] = useState('');

  if (!isOpen) return null;

  const currentCurrObj = CURRENCIES.find(c => c.code === currentCurrency) || CURRENCIES[0];

  const subtotalUSD = cartItems.reduce((acc, item) => {
    const multiplier = item.billingCycle === 'annually' ? 12 * 0.8 : 1;
    return acc + item.service.basePriceUSD * item.quantity * multiplier;
  }, 0);

  const discountUSD = subtotalUSD * (discountPercent / 100);
  const totalUSD = Math.max(0, subtotalUSD - discountUSD);

  const formatPrice = (usd: number) => {
    const converted = usd * currentCurrObj.rate;
    return `${currentCurrObj.symbol} ${converted.toFixed(2)}`;
  };

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.toUpperCase() === 'GIS2026' || couponCode.toUpperCase() === 'ADSENSE') {
      setDiscountPercent(15);
    } else {
      alert('كوبون غير صالح. جرب "GIS2026" للحصول على خصم 15%');
    }
  };

  const handleCheckout = () => {
    const ticket = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
    setOrderTicket(ticket);
    setOrderComplete(true);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // safe fallback
    }
  };

  const handleResetOrder = () => {
    onClearCart();
    setOrderComplete(false);
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
        <div className="w-screen max-w-md bg-white dark:bg-slate-900 shadow-2xl border-l rtl:border-l-0 rtl:border-r border-slate-200 dark:border-slate-800 flex flex-col">
          {/* Header */}
          <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                سلة المشتريات والخدمات
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-5">
            {orderComplete ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="font-extrabold text-xl text-slate-900 dark:text-white">
                  تم استلام طلبك بنجاح!
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  {t.order_success}
                </p>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-500">رقم الفاتورة / الطلب:</span>
                    <span className="font-bold text-blue-600 dark:text-blue-400">{orderTicket}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">المبلغ المدفوع:</span>
                    <span className="font-bold">{formatPrice(totalUSD)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">حالة التفعيل:</span>
                    <span className="text-emerald-600 font-bold">تجهيز فوري (Instant Provision)</span>
                  </div>
                </div>
                <button
                  onClick={handleResetOrder}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition-colors shadow-sm"
                >
                  العودة للمتجر
                </button>
              </div>
            ) : cartItems.length === 0 ? (
              <div className="text-center py-16 text-slate-400 space-y-3">
                <ShoppingBag className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-600" />
                <p className="text-sm">{t.cart_empty}</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map(item => (
                  <div 
                    key={item.service.id}
                    className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 flex items-start justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <div className="font-bold text-sm text-slate-900 dark:text-white">
                        {item.service.name[currentLang] || item.service.name.en}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        دورة الفوترة: {item.billingCycle === 'annually' ? 'سنوي (خصم 20%)' : 'شهري'}
                      </div>
                      <div className="font-bold text-blue-600 dark:text-blue-400 text-sm pt-1">
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

                {/* Coupon Box */}
                <form onSubmit={handleApplyCoupon} className="pt-2 flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-4 h-4 text-slate-400 absolute left-3 rtl:left-auto rtl:right-3 top-3" />
                    <input
                      type="text"
                      value={couponCode}
                      onChange={e => setCouponCode(e.target.value)}
                      placeholder="كوبون الخصم (جرب GIS2026)..."
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
          </div>

          {/* Footer calculation */}
          {!orderComplete && cartItems.length > 0 && (
            <div className="p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 space-y-4">
              <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                <div className="flex justify-between">
                  <span>المجموع الفرعي:</span>
                  <span>{formatPrice(subtotalUSD)}</span>
                </div>
                {discountPercent > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>الخصم المطبق:</span>
                    <span>-{formatPrice(discountUSD)}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-extrabold text-slate-900 dark:text-white pt-2 border-t border-slate-200 dark:border-slate-700">
                  <span>{t.cart_total}:</span>
                  <span className="text-blue-600 dark:text-blue-400">{formatPrice(totalUSD)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <CreditCard className="w-4 h-4" />
                <span>{t.btn_checkout}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>تشفير آمن 256-Bit TLS وضمان استرجاع 30 يوماً</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
