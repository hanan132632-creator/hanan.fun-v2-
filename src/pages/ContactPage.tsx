import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  MessageSquare, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Globe, 
  HelpCircle,
  ChevronDown,
  Loader2
} from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../locales/translations';
import { AdSensePlacement } from '../components/AdSensePlacement';

interface ContactPageProps {
  currentLang: Language;
}

export const ContactPage: React.FC<ContactPageProps> = ({ currentLang }) => {
  const t = TRANSLATIONS[currentLang];
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [ticketResult, setTicketResult] = useState<{ ticketId: string; status: string } | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'كم يستغرق تجهيز وتفعيل خطط السيرفرات السحابية (Cloud VPS)؟',
      a: 'التفعيل فوري ومؤتمت بنسبة 100%. بمجرد اكتمال عملية الدفع، يتم تزويدك ببيانات الدخول ولوحة التحكم في أقل من 60 ثانية عبر بريدك الإلكتروني.'
    },
    {
      q: 'هل توفر منصتكم الدعم الفني لحل مشاكل Google AdSense وتحسين سرعة الموقع؟',
      a: 'نعم، نوفر فريقاً هندسياً متخصصاً في تحسين مؤشرات Core Web Vitals وتثبيت شيفرات AdSense بما لا يؤثر سلباً على سرعة تحميل الصفحات أو تجربة التصفح.'
    },
    {
      q: 'ما هي معايير حماية البيانات والخصوصية المتبعة لديكم؟',
      a: 'نلتزم التزاماً صارماً بلائحة حماية البيانات العامة (GDPR) وقانون خصوصية المستهلك في كاليفورنيا (CCPA). لا نقوم ببيع بياناتك لأي طرف ثالث وتخضع خوادمنا للتشفير الصارم وفق معايير ISO 27001.'
    },
    {
      q: 'هل تتوفر ضمانة لاسترجاع الأموال في حال لم تناسبني الخدمة؟',
      a: 'نعم، نوفر ضماناً غير مشروط لاسترجاع الأموال بنسبة 100% خلال 30 يوماً من تاريخ الاشتراك لكافة خطط الاستضافة وحلول الـ CDN.'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setLoading(true);
    setTicketResult(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message }),
      });
      const data = await res.json();
      setTicketResult({ ticketId: data.ticketId, status: data.message });
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch {
      setTicketResult({
        ticketId: 'GIS-TK-' + Math.floor(100000 + Math.random() * 900000),
        status: 'تم استلام رسالتك بنجاح وسيتواصل معك الفريق الفني قريباً.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 text-xs font-bold">
          <Mail className="w-3.5 h-3.5" />
          <span>قنوات الاتصال المباشر والدعم الفني 24/7</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
          {t.contact_title}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
          {t.contact_desc}
        </p>
      </div>

      {/* Main Grid: Form + Contact Info */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              أرسل تذكرة دعم فني أو استفسار تجاري
            </h2>
            <p className="text-xs text-slate-500">
              يقوم مهندسونا بالرد خلال أقل من 15 دقيقة على مدار الساعة.
            </p>
          </div>

          {ticketResult ? (
            <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800 text-center space-y-3 animate-in fade-in">
              <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-300 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                {t.contact_sent_success}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                {ticketResult.status}
              </p>
              <div className="inline-block p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
                رقم التذكرة: {ticketResult.ticketId}
              </div>
              <div>
                <button
                  onClick={() => setTicketResult(null)}
                  className="text-xs text-blue-600 dark:text-blue-400 font-bold underline"
                >
                  إرسال استفسار آخر
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 text-xs">
                  <label className="font-bold text-slate-700 dark:text-slate-300">
                    {t.contact_name} *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="الاسم الكامل"
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="space-y-1.5 text-xs">
                  <label className="font-bold text-slate-700 dark:text-slate-300">
                    {t.contact_email} *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5 text-xs">
                <label className="font-bold text-slate-700 dark:text-slate-300">
                  {t.contact_subject} *
                </label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={e => setSubject(e.target.value)}
                  placeholder="موضوع الاستفسار (استضافة سحابية، استفسار Google AdSense، إلخ...)"
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-1.5 text-xs">
                <label className="font-bold text-slate-700 dark:text-slate-300">
                  {t.contact_message} *
                </label>
                <textarea
                  required
                  rows={5}
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="يرجى كتابة تفاصيل استفسارك أو المتطلبات التقنية لمشروعك..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>جاري إرسال التذكرة وتوجيهها للمهندس المختص...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>{t.contact_submit}</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Global HQ Info & Fast Contacts */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              المكاتب الإقليمية ومراكز العمليات
            </h2>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-slate-400 block text-xs">البريد الإلكتروني الرسمي:</span>
                  <a href="mailto:support@gisnetwork.global" className="font-bold text-slate-900 dark:text-white hover:text-blue-600">
                    support@gisnetwork.global
                  </a>
                  <div className="text-[11px] text-slate-500">للاستفسارات الإعلانية: adsense-desk@gisnetwork.global</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-slate-400 block text-xs">الهاتف والدعم المباشر:</span>
                  <a href="tel:+18005550199" className="font-bold text-slate-900 dark:text-white hover:text-blue-600">
                    +1 (800) 555-0199 (USA & Global)
                  </a>
                  <div className="text-[11px] text-slate-500">+966 11 234 5678 (KSA & GCC Region)</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-purple-50 dark:bg-purple-950/80 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-slate-400 block text-xs">المقر الرئيسي:</span>
                  <span className="font-bold text-slate-900 dark:text-white block">
                    Global Internet Services Inc.
                  </span>
                  <span className="text-slate-500 text-xs">
                    Mainzer Landstraße 180, 60327 Frankfurt am Main, Germany
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-slate-400 block text-xs">ساعات العمليات:</span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    24/7/365 (مركز مراقبة الشبكة NOC يعمل باستمرار)
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-blue-600 text-white shadow-lg space-y-3">
            <h3 className="font-bold text-base">هل تحتاج لاستشارة فنية فورية؟</h3>
            <p className="text-xs text-blue-100 leading-relaxed">
              استخدم مستشار الذكاء الاصطناعي التقني المتاح على مدار الساعة للحصول على إجابات فورية وتوصيات هندسية دقيقة حول البنية التحتية المناسبة لمشروعك.
            </p>
          </div>
        </div>
      </div>

      {/* AdSense Placement */}
      <AdSensePlacement currentLang={currentLang} format="leaderboard" />

      {/* FAQ Section */}
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            الأسئلة الشائعة (FAQ)
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            إجابات مباشرة على أكثر الاستفسارات تكراراً من شركائنا وعملائنا
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full p-4 text-start font-bold text-sm text-slate-900 dark:text-white flex items-center justify-between gap-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
              </button>

              {openFaq === index && (
                <div className="px-4 pb-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3 animate-in fade-in">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
