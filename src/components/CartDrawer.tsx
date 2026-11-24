import React, { useState } from 'react';
import {
  X,
  Trash2,
  ShoppingBag,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Mail,
  Send,
  Loader2,
  ExternalLink,
  FileCheck2,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Language, Currency, CartItem } from '../types';
import { TRANSLATIONS, CURRENCIES } from '../locales/translations';
import { buildPayPalCheckoutUrl } from '../data/digitalProducts';
import { isInsideAndroidApp } from '../utils/appEnvironment';

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
  const isAr = currentLang === 'ar';
  const [step, setStep] = useState<'cart' | 'checkout' | 'completed'>('cart');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [projectDomain, setProjectDomain] = useState('');
  const [deliveryPreference, setDeliveryPreference] = useState<'email_invoice' | 'direct_coordination'>('email_invoice');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [orderTicket, setOrderTicket] = useState('');
  const [submittedSummary, setSubmittedSummary] = useState('');
  const isAndroidApp = isInsideAndroidApp();

  if (!isOpen) return null;

  const currentCurrObj = CURRENCIES.find(c => c.code === currentCurrency) || CURRENCIES[0];

  const getItemTotalUSD = (item: CartItem) => {
    if (item.service.period === 'one-time') {
      return item.service.basePriceUSD * item.quantity;
    }
    const multiplier = item.billingCycle === 'annually' ? 12 * 0.8 : 1;
    return item.service.basePriceUSD * item.quantity * multiplier;
  };

  const totalUSD = cartItems.reduce((acc, item) => acc + getItemTotalUSD(item), 0);

  const formatPrice = (usd: number) => {
    if (usd === 0) return isAr ? 'استشارة مجانية' : 'Free Quote';
    const converted = usd * currentCurrObj.rate;
    return `${currentCurrObj.symbol} ${converted.toFixed(2)}`;
  };

  const buildOrderSummaryText = () => {
    const lines = cartItems.map((item, idx) => {
      const title = item.service.name[currentLang] || item.service.name.en;
      const cycleText =
        item.service.period === 'one-time'
          ? isAr ? 'منتج/خدمة لمرة واحدة' : 'One-time'
          : item.billingCycle === 'annually'
          ? isAr ? 'اشتراك سنوي' : 'Annual'
          : isAr ? 'اشتراك شهري' : 'Monthly';
      return `${idx + 1}. ${title} (${cycleText}) — ${formatPrice(getItemTotalUSD(item))}`;
    });
    return lines.join('\n');
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerEmail.trim() || cartItems.length === 0) return;

    setSubmitting(true);
    setSubmitError(null);

    const summary = buildOrderSummaryText();
    const fullMessage = [
      `تفاصيل الطلب / Order Summary:`,
      summary,
      `الإجمالي / Total: ${formatPrice(totalUSD)}`,
      projectDomain.trim() ? `الموقع أو المشروع / Domain: ${projectDomain.trim()}` : '',
      `طريقة المتابعة المفضلة: ${
        deliveryPreference === 'email_invoice'
          ? 'استلام رابط الدفع والتحميل عبر البريد الإلكتروني'
          : 'التنسيق المباشر وتحديد وسيلة السداد عبر الدعم'
      }`,
      notes.trim() ? `ملاحظات إضافية / Notes: ${notes.trim()}` : '',
    ]
      .filter(Boolean)
      .join('\n\n');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: customerName.trim(),
          email: customerEmail.trim(),
          phone: customerPhone.trim(),
          subject: `[Store Order] ${cartItems.length} item(s) - ${formatPrice(totalUSD)}`,
          message: fullMessage,
        }),
      });
      const data = await res.json();
      setOrderTicket(data.ticketId || `GIS-ORD-${Math.floor(100000 + Math.random() * 900000)}`);
      setSubmittedSummary(fullMessage);
      setStep('completed');
      try {
        confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
      } catch {}
    } catch {
      setSubmitError(
        isAr
          ? 'تعذر الإرسال التلقائي حالياً. يمكنك إرسال الطلب مباشرة بالضغط على زر البريد أدناه.'
          : 'Automatic submission unavailable. Please send your order directly via email below.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    onClearCart();
    setStep('cart');
    setCustomerName('');
    setCustomerEmail('');
    setCustomerPhone('');
    setProjectDomain('');
    setNotes('');
    setSubmitError(null);
    onClose();
  };

  const mailtoHref = `mailto:support@hanan.fun?subject=${encodeURIComponent(
    `طلب جديد من المتجر (${orderTicket || 'GIS Store'})`
  )}&body=${encodeURIComponent(
    `${submittedSummary || buildOrderSummaryText()}\n\nالاسم: ${customerName}\nالبريد: ${customerEmail}\nالهاتف: ${customerPhone || '-'}`
  )}`;

  const paypalOrderTitle =
    cartItems.length === 1
      ? `${cartItems[0].service.name.en} (${orderTicket || 'GIS'})`
      : `GIS Store Order (${cartItems.length} items) - ${orderTicket || 'GIS'}`;
  const paypalCheckoutHref =
    !isAndroidApp && totalUSD > 0 ? buildPayPalCheckoutUrl(paypalOrderTitle, totalUSD) : '';

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
      />

      <div className="absolute inset-y-0 right-0 rtl:right-auto rtl:left-0 max-w-full flex">
        <div className="w-screen max-w-lg bg-white dark:bg-slate-900 shadow-2xl border-l rtl:border-l-0 rtl:border-r border-slate-200 dark:border-slate-800 flex flex-col">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/70 dark:bg-slate-800/40">
            <div className="flex items-center gap-2.5">
              {step === 'checkout' && (
                <button
                  onClick={() => setStep('cart')}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  aria-label={isAr ? 'الرجوع' : 'Back'}
                >
                  <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
                </button>
              )}
              <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                  {step === 'cart' && (isAr ? 'سلة المنتجات والخدمات' : 'Order Cart')}
                  {step === 'checkout' && (isAr ? 'تأكيد بيانات الطلب والاستلام' : 'Order & Delivery Details')}
                  {step === 'completed' && (isAr ? 'تم تسجيل طلبك بنجاح' : 'Order Request Recorded')}
                </h3>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  {step === 'cart' && `${cartItems.length} ${isAr ? 'عنصر' : 'item(s)'}`}
                  {step === 'checkout' && (isAr ? 'التوصيل الرقمي عبر البريد الإلكتروني الرسمي' : 'Digital fulfillment via official email')}
                  {step === 'completed' && (isAr ? 'المرجع جاهز للمتابعة الفورية' : 'Ready for direct follow-up')}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label={isAr ? 'إغلاق' : 'Close'}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {step === 'cart' && (
              <>
                {cartItems.length === 0 ? (
                  <div className="text-center py-16 text-slate-400 space-y-3">
                    <ShoppingBag className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-600" />
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-300">{t.cart_empty}</p>
                    <p className="text-xs text-slate-400">
                      {isAr
                        ? 'أضف أي دليل رقمي أو باقة خدمة من المتجر لبدء الطلب.'
                        : 'Add any digital kit or technical service from the store to begin.'}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {cartItems.map(item => (
                      <div
                        key={`${item.service.id}-${item.billingCycle}`}
                        className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 flex items-start justify-between gap-3"
                      >
                        <div className="space-y-1">
                          <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                            {item.service.name[currentLang] || item.service.name.en}
                          </div>
                          <div className="text-[11px] text-slate-500 dark:text-slate-400">
                            {item.service.period === 'one-time'
                              ? isAr
                                ? 'منتج رقمي — دفعة واحدة'
                                : 'Digital product · One-time'
                              : item.billingCycle === 'annually'
                              ? isAr
                                ? 'فوترة سنوية (شاملة خصم 20%)'
                                : 'Annual billing (20% off)'
                              : isAr
                              ? 'فوترة شهرية'
                              : 'Monthly billing'}
                          </div>
                          <div className="font-bold text-blue-600 dark:text-blue-400 text-sm tabular-nums pt-0.5">
                            {formatPrice(getItemTotalUSD(item))}
                          </div>
                        </div>
                        <button
                          onClick={() => onRemoveItem(item.service.id)}
                          className="text-slate-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                          aria-label={isAr ? 'حذف' : 'Remove'}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {step === 'checkout' && (
              <form id="gis-order-form" onSubmit={handleSubmitOrder} className="space-y-4">
                <div className="p-3.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 text-xs text-blue-900 dark:text-blue-200 flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    {isAndroidApp
                      ? isAr
                        ? 'هذا النموذج لتسجيل طلبات الخدمات والاستشارات والتواصل المباشر مع الفريق الفني عبر support@hanan.fun.'
                        : 'Submit service inquiries here for direct coordination with our engineering team via support@hanan.fun.'
                      : isAr
                      ? 'لا نطلب إدخال بيانات بطاقات بنكية داخل الموقع. بعد تأكيد بياناتك، يظهر لك زر الدفع الآمن عبر PayPal مباشرة وإرسال تأكيد الطلب إلى support@hanan.fun.'
                      : 'We never collect raw card numbers on-site. After confirming your details, you can pay securely via PayPal and send your confirmation to support@hanan.fun.'}
                  </p>
                </div>

                <div className="space-y-1.5 text-xs">
                  <label className="font-bold text-slate-700 dark:text-slate-300 block">
                    {isAr ? 'الاسم الكامل *' : 'Full Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={e => setCustomerName(e.target.value)}
                    placeholder={isAr ? 'اكتب اسمك الكامل' : 'Your full name'}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="space-y-1.5 text-xs">
                  <label className="font-bold text-slate-700 dark:text-slate-300 block">
                    {isAr ? 'البريد الإلكتروني لاستلام الملفات والفاتورة *' : 'Delivery Email Address *'}
                  </label>
                  <input
                    type="email"
                    required
                    value={customerEmail}
                    onChange={e => setCustomerEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5 text-xs">
                    <label className="font-bold text-slate-700 dark:text-slate-300 block">
                      {isAr ? 'رقم الهاتف / واتساب (اختياري)' : 'Phone / WhatsApp (Optional)'}
                    </label>
                    <input
                      type="tel"
                      value={customerPhone}
                      onChange={e => setCustomerPhone(e.target.value)}
                      placeholder="+20 1X XXXX XXXX"
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-1.5 text-xs">
                    <label className="font-bold text-slate-700 dark:text-slate-300 block">
                      {isAr ? 'رابط موقعك (اختياري)' : 'Website URL (Optional)'}
                    </label>
                    <input
                      type="text"
                      value={projectDomain}
                      onChange={e => setProjectDomain(e.target.value)}
                      placeholder="https://example.com"
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <span className="font-bold text-slate-700 dark:text-slate-300 block">
                    {isAr ? 'تفضيل إتمام الدفع والتسليم' : 'Preferred Payment & Delivery'}
                  </span>
                  <div className="grid grid-cols-1 gap-2">
                    <button
                      type="button"
                      onClick={() => setDeliveryPreference('email_invoice')}
                      className={`p-3 rounded-xl border text-start transition-colors ${
                        deliveryPreference === 'email_invoice'
                          ? 'border-blue-600 bg-blue-50/70 dark:bg-blue-950/40 text-slate-900 dark:text-white'
                          : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      <div className="font-bold">
                        {isAndroidApp
                          ? isAr
                            ? 'استلام تفاصيل الخدمة والعرض عبر البريد الإلكتروني'
                            : 'Receive Service Proposal & Details via Email'
                          : isAr
                          ? 'الدفع الإلكتروني عبر PayPal (فوري وآمن)'
                          : 'Online Payment via PayPal (Instant & Secure)'}
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeliveryPreference('direct_coordination')}
                      className={`p-3 rounded-xl border text-start transition-colors ${
                        deliveryPreference === 'direct_coordination'
                          ? 'border-blue-600 bg-blue-50/70 dark:bg-blue-950/40 text-slate-900 dark:text-white'
                          : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      <div className="font-bold">
                        {isAr ? 'التنسيق المباشر مع فريق العمل لاختيار وسيلة التحويل' : 'Direct Support Coordination for Bank / Local Transfer'}
                      </div>
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs">
                  <label className="font-bold text-slate-700 dark:text-slate-300 block">
                    {isAr ? 'ملاحظات إضافية' : 'Additional Notes'}
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    placeholder={isAr ? 'أي تفاصيل أو متطلبات خاصة بالطلب...' : 'Any extra details for your order...'}
                    className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                {submitError && (
                  <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-800 dark:text-amber-300 space-y-2">
                    <p>{submitError}</p>
                    <a
                      href={mailtoHref}
                      className="inline-flex items-center gap-1.5 font-bold underline"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>{isAr ? 'إرسال الطلب عبر البريد support@hanan.fun' : 'Send via Email (support@hanan.fun)'}</span>
                    </a>
                  </div>
                )}
              </form>
            )}

            {step === 'completed' && (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h4 className="font-extrabold text-xl text-slate-900 dark:text-white">
                  {isAr ? 'تم تسجيل طلبك بنجاح' : 'Order Request Submitted'}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {isAr
                    ? 'لإتمام التفعيل واستلام رابط التحميل بأسرع وقت، يمكنك أيضاً إرسال نسخة من تفاصيل الطلب مباشرة إلى بريدنا الرسمي.'
                    : 'To receive your payment link and digital download faster, you can also send a direct copy to our support inbox below.'}
                </p>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-xs space-y-2 text-start">
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">{isAr ? 'رقم المرجع:' : 'Order Ref:'}</span>
                    <span className="font-mono font-bold text-blue-600 dark:text-blue-400">{orderTicket}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">{isAr ? 'البريد المسجل:' : 'Email:'}</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{customerEmail}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">{isAr ? 'الإجمالي التقديري:' : 'Total:'}</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">{formatPrice(totalUSD)}</span>
                  </div>
                </div>

                {paypalCheckoutHref && (
                  <a
                    href={paypalCheckoutHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-4 bg-[#0070ba] hover:bg-[#005ea6] text-white font-bold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-colors"
                  >
                    <span>
                      {isAr
                        ? `إتمام الدفع الآن عبر PayPal ($${totalUSD.toFixed(2)})`
                        : `Pay Now with PayPal ($${totalUSD.toFixed(2)})`}
                    </span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}

                <a
                  href={mailtoHref}
                  className="w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-bold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>{isAr ? 'إرسال تأكيد الطلب إلى support@hanan.fun' : 'Send Confirmation to support@hanan.fun'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={handleResetAndClose}
                  className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-xl text-xs transition-colors"
                >
                  {isAr ? 'العودة إلى المتجر وإفراغ السلة' : 'Return to Store & Clear Cart'}
                </button>
              </div>
            )}
          </div>

          {/* Footer */}
          {step !== 'completed' && cartItems.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/60 space-y-3">
              <div className="flex justify-between items-center text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">
                <span>{isAr ? 'المجموع التقديري:' : 'Estimated Total:'}</span>
                <span className="text-blue-600 dark:text-blue-400 tabular-nums">{formatPrice(totalUSD)}</span>
              </div>

              {step === 'cart' && (
                <button
                  onClick={() => setStep('checkout')}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs sm:text-sm shadow-sm transition-colors flex items-center justify-center gap-2"
                >
                  <FileCheck2 className="w-4 h-4" />
                  <span>{isAr ? 'متابعة لتأكيد بيانات الطلب' : 'Proceed to Order Details'}</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </button>
              )}

              {step === 'checkout' && (
                <button
                  type="submit"
                  form="gis-order-form"
                  disabled={submitting}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs sm:text-sm shadow-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>{isAr ? 'جاري تسجيل الطلب...' : 'Submitting order...'}</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>{isAr ? 'تأكيد وإرسال الطلب الآن' : 'Submit Order Request'}</span>
                    </>
                  )}
                </button>
              )}

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>
                  {isAr
                    ? 'تواصل مباشر وموثق عبر support@hanan.fun'
                    : 'Direct verified fulfillment via support@hanan.fun'}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
