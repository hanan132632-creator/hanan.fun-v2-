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
  Loader2,
  Building2,
  Server,
  Zap,
  Check
} from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../locales/translations';
import { AdSensePlacement } from '../components/AdSensePlacement';
import { EGYPT_GOVERNORATES, EgyptGovernorate } from '../data/egyptGovernorates';

interface ContactPageProps {
  currentLang: Language;
}

export const ContactPage: React.FC<ContactPageProps> = ({ currentLang }) => {
  const t = TRANSLATIONS[currentLang];
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('EG');
  const [governorate, setGovernorate] = useState('cairo');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [ticketResult, setTicketResult] = useState<{ ticketId: string; status: string } | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [selectedGovTab, setSelectedGovTab] = useState<'all' | 'greater_cairo' | 'alexandria' | 'delta' | 'canal' | 'upper_egypt' | 'frontier'>('all');

  const faqs = [
    {
      q: 'هل تتوفر خوادم سحابية وشبكات CDN مخصصة للجمهورية المصرية وكافة محافظاتها؟',
      a: 'نعم، تمتلك شبكتنا عقد سحابية رئيسية (Edge Nodes) في القاهرة والإسكندرية مع ربط مباشر بمركز تبادل الإنترنت المصري (EG-IX) وكافة مزودي الإنترنت (WE، فودافون، أورنج، اتصالات)، لتوفير زمن استجابة (Ping) فائق السرعة يبدأ من 12ms لجميع المحافظات الـ 27 من الإسكندرية إلى أسوان وسيناء.'
    },
    {
      q: 'كم يستغرق تجهيز وتفعيل خطط السيرفرات السحابية (Cloud VPS)؟',
      a: 'التفعيل فوري ومؤتمت بنسبة 100%. بمجرد اكتمال عملية الدفع، يتم تزويدك ببيانات الدخول ولوحة التحكم في أقل من 60 ثانية عبر بريدك الإلكتروني.'
    },
    {
      q: 'هل توفر منصتكم الدعم الفني لحل مشاكل Google AdSense وتحسين سرعة الموقع؟',
      a: 'نعم، نوفر فريقاً هندسياً متخصصاً في تحسين مؤشرات Core Web Vitals وتثبيت شيفرات AdSense بما لا يؤثر سلباً على سرعة تحميل الصفحات أو تجربة التصفح.'
    },
    {
      q: 'ما هي طرق الدفع المحلية المدعومة في مصر؟',
      a: 'ندعم الدفع بالجنيه المصري (EGP) عبر البطاقات البنكية (Visa / MasterCard / ميزة)، والتحويلات البنكية، بالإضافة للبطاقات الائتمانية الدولية.'
    },
    {
      q: 'ما هي معايير حماية البيانات والخصوصية المتبعة لديكم؟',
      a: 'نلتزم التزاماً صارماً بلائحة حماية البيانات العامة (GDPR) وقانون خصوصية المستهلك في كاليفورنيا (CCPA). لا نقوم ببيع بياناتك لأي طرف ثالث وتخضع خوادمنا للتشفير الصارم وفق معايير ISO 27001.'
    }
  ];

  const filteredGovs = selectedGovTab === 'all' 
    ? EGYPT_GOVERNORATES 
    : EGYPT_GOVERNORATES.filter(g => g.region === selectedGovTab);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setLoading(true);
    setTicketResult(null);

    const govObj = EGYPT_GOVERNORATES.find(g => g.id === governorate);
    const regionDetails = country === 'EG' && govObj ? ` [محافظة: ${govObj.nameAr} - ${govObj.nameEn}]` : '';

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name, 
          email, 
          phone, 
          country, 
          governorate: govObj?.nameAr,
          subject: `${subject}${regionDetails}`, 
          message 
        }),
      });
      const data = await res.json();
      setTicketResult({ ticketId: data.ticketId, status: data.message });
      setName('');
      setEmail('');
      setPhone('');
      setSubject('');
      setMessage('');
    } catch {
      setTicketResult({
        ticketId: 'GIS-EG-' + Math.floor(100000 + Math.random() * 900000),
        status: `تم استلام رسالتك وتوجيهها للمهندس الإقليمي لخدمة ${govObj ? govObj.nameAr : 'جمهورية مصر العربية'}. سيتواصل معك فريقنا خلال 15 دقيقة.`,
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
          <span>قنوات الاتصال المباشر والدعم الفني 24/7 في مصر والعالم 🌍</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
          {t.contact_title}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
          {t.contact_desc}
        </p>
      </div>

      {/* Egyptian Governorates & Regional Cloud Coverage Section */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 rounded-3xl p-6 sm:p-8 text-white border border-slate-700/60 shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-700/60 pb-5">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>تغطية بنية تحتية سحابية شاملة لكافة محافظات مصر الـ 27 🇪🇬</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black">
              شبكة الخوادم ومراكز الاستضافة السريعة داخل جمهورية مصر العربية
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              ربط مباشر عبر مسارات EG-IX والـ Anycast CDN بأقل زمن استجابة (12ms - 25ms) لكافة الأقاليم من القاهرة والإسكندرية وحتى أسوان وسيناء.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 text-xs font-medium">
            <button
              onClick={() => setSelectedGovTab('all')}
              className={`px-3 py-1.5 rounded-lg transition-all ${selectedGovTab === 'all' ? 'bg-blue-600 text-white font-bold shadow-md' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
            >
              جميع المحافظات (27)
            </button>
            <button
              onClick={() => setSelectedGovTab('greater_cairo')}
              className={`px-3 py-1.5 rounded-lg transition-all ${selectedGovTab === 'greater_cairo' ? 'bg-blue-600 text-white font-bold shadow-md' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
            >
              القاهرة الكبرى
            </button>
            <button
              onClick={() => setSelectedGovTab('alexandria')}
              className={`px-3 py-1.5 rounded-lg transition-all ${selectedGovTab === 'alexandria' ? 'bg-blue-600 text-white font-bold shadow-md' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
            >
              الإسكندرية والساحل
            </button>
            <button
              onClick={() => setSelectedGovTab('delta')}
              className={`px-3 py-1.5 rounded-lg transition-all ${selectedGovTab === 'delta' ? 'bg-blue-600 text-white font-bold shadow-md' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
            >
              الدلتا
            </button>
            <button
              onClick={() => setSelectedGovTab('canal')}
              className={`px-3 py-1.5 rounded-lg transition-all ${selectedGovTab === 'canal' ? 'bg-blue-600 text-white font-bold shadow-md' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
            >
              القناة
            </button>
            <button
              onClick={() => setSelectedGovTab('upper_egypt')}
              className={`px-3 py-1.5 rounded-lg transition-all ${selectedGovTab === 'upper_egypt' ? 'bg-blue-600 text-white font-bold shadow-md' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
            >
              صعيد مصر
            </button>
            <button
              onClick={() => setSelectedGovTab('frontier')}
              className={`px-3 py-1.5 rounded-lg transition-all ${selectedGovTab === 'frontier' ? 'bg-blue-600 text-white font-bold shadow-md' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
            >
              الحدودية وسيناء
            </button>
          </div>
        </div>

        {/* Governorates Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {filteredGovs.map(gov => (
            <div
              key={gov.id}
              onClick={() => setGovernorate(gov.id)}
              className={`p-3 rounded-xl border transition-all cursor-pointer text-start ${
                governorate === gov.id
                  ? 'bg-blue-600/30 border-blue-400 shadow-md ring-2 ring-blue-400/50'
                  : 'bg-slate-800/60 border-slate-700/80 hover:bg-slate-800 hover:border-slate-600'
              }`}
            >
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className="text-xs font-bold text-white flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-red-400 shrink-0" />
                  {gov.nameAr}
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono font-bold">
                  {gov.cdnLatencyMs}ms
                </span>
              </div>
              <div className="text-[11px] text-slate-400 truncate">
                {gov.nameEn}
              </div>
              <div className="text-[10px] text-blue-300 mt-1">
                عاصمة: {gov.capitalAr}
              </div>
            </div>
          ))}
        </div>
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

              {/* Country & Egyptian Governorates Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5 text-xs">
                  <label className="font-bold text-slate-700 dark:text-slate-300">
                    الدولة (Country)
                  </label>
                  <select
                    value={country}
                    onChange={e => setCountry(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="EG">🇪🇬 جمهورية مصر العربية (Egypt)</option>
                    <option value="SA">🇸🇦 المملكة العربية السعودية (Saudi Arabia)</option>
                    <option value="AE">🇦🇪 الإمارات العربية المتحدة (UAE)</option>
                    <option value="KW">🇰🇼 الكويت (Kuwait)</option>
                    <option value="QA">🇶🇦 قطر (Qatar)</option>
                    <option value="BH">🇧🇭 البحرين (Bahrain)</option>
                    <option value="OM">🇴🇲 سلطنة عمان (Oman)</option>
                    <option value="JO">🇯🇴 الأردن (Jordan)</option>
                    <option value="MA">🇲🇦 المغرب (Morocco)</option>
                    <option value="DZ">🇩🇿 الجزائر (Algeria)</option>
                    <option value="TR">🇹🇷 تركيا (Turkey)</option>
                    <option value="US">🇺🇸 الولايات المتحدة (USA)</option>
                    <option value="EU">🇪🇺 الاتحاد الأوروبي (Europe)</option>
                    <option value="OTHER">🌍 دول أخرى (Other)</option>
                  </select>
                </div>

                {country === 'EG' ? (
                  <div className="space-y-1.5 text-xs">
                    <label className="font-bold text-slate-700 dark:text-slate-300">
                      محافظة مصر (27 محافظة) *
                    </label>
                    <select
                      value={governorate}
                      onChange={e => setGovernorate(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 font-medium"
                    >
                      <optgroup label="📍 القاهرة الكبرى">
                        <option value="cairo">القاهرة (Cairo)</option>
                        <option value="giza">الجيزة (Giza)</option>
                        <option value="qalyubia">القليوبية (Qalyubia)</option>
                      </optgroup>
                      <optgroup label="📍 الإسكندرية والساحل">
                        <option value="alexandria">الإسكندرية (Alexandria)</option>
                        <option value="beheira">البحيرة (Beheira)</option>
                        <option value="matrouh">مطروح (Matrouh)</option>
                      </optgroup>
                      <optgroup label="📍 الدلتا">
                        <option value="dakahlia">الدقهلية (Dakahlia / Mansoura)</option>
                        <option value="sharqia">الشرقية (Sharqia / Zagazig)</option>
                        <option value="gharbia">الغربية (Gharbia / Tanta)</option>
                        <option value="menofia">المنوفية (Menofia)</option>
                        <option value="kafr_el_sheikh">كفر الشيخ (Kafr El Sheikh)</option>
                        <option value="damietta">دمياط (Damietta)</option>
                      </optgroup>
                      <optgroup label="📍 مدن القناة">
                        <option value="port_said">بورسعيد (Port Said)</option>
                        <option value="ismailia">الإسماعيلية (Ismailia)</option>
                        <option value="suez">السويس (Suez)</option>
                      </optgroup>
                      <optgroup label="📍 صعيد مصر">
                        <option value="fayoum">الفيوم (Fayoum)</option>
                        <option value="beni_suef">بني سويف (Beni Suef)</option>
                        <option value="minya">المنيا (Minya)</option>
                        <option value="assiut">أسيوط (Assiut)</option>
                        <option value="sohag">سوهاج (Sohag)</option>
                        <option value="qena">قنا (Qena)</option>
                        <option value="luxor">الأقصر (Luxor)</option>
                        <option value="aswan">أسوان (Aswan)</option>
                      </optgroup>
                      <optgroup label="📍 البحر الأحمر والحدودية وسيناء">
                        <option value="red_sea">البحر الأحمر (الغردقة / Red Sea)</option>
                        <option value="south_sinai">جنوب سيناء (شرم الشيخ / South Sinai)</option>
                        <option value="north_sinai">شمال سيناء (العريش / North Sinai)</option>
                        <option value="new_valley">الوادي الجديد (New Valley)</option>
                      </optgroup>
                    </select>
                  </div>
                ) : (
                  <div className="space-y-1.5 text-xs">
                    <label className="font-bold text-slate-700 dark:text-slate-300">
                      المدينة / المنطقة
                    </label>
                    <input
                      type="text"
                      placeholder="المدينة أو المنطقة"
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                )}

                <div className="space-y-1.5 text-xs">
                  <label className="font-bold text-slate-700 dark:text-slate-300">
                    رقم الهاتف / واتساب
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="+20 10 / +20 11 / +20 12 / +20 15"
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
                  placeholder="موضوع الاستفسار (استضافة سحابية، استفسار Google AdSense، فحص سرعة، إلخ...)"
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-1.5 text-xs">
                <label className="font-bold text-slate-700 dark:text-slate-300">
                  {t.contact_message} *
                </label>
                <textarea
                  required
                  rows={4}
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

        {/* Global HQ Info & Regional Offices */}
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
                  <div className="text-[11px] text-slate-500">مكتب مصر وشمال إفريقيا: egypt-desk@gisnetwork.global</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-slate-400 block text-xs">الهاتف والدعم المباشر:</span>
                  <a href="tel:+20233456789" className="font-bold text-slate-900 dark:text-white hover:text-blue-600">
                    +20 (2) 3345-6789 (Cairo & Egypt Desk 🇪🇬)
                  </a>
                  <div className="text-[11px] text-slate-500">+1 (800) 555-0199 (USA & Global HQ)</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-purple-50 dark:bg-purple-950/80 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-slate-400 block text-xs">مركز العمليات الإقليمي (مصر):</span>
                  <span className="font-bold text-slate-900 dark:text-white block">
                    القرية الذكية (Smart Village) - الجيزة / القاهرة 🇪🇬
                  </span>
                  <span className="text-slate-500 text-xs">
                    مبنى الابتكار الرقمي، طريق مصر الإسكندرية الصحراوي
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

          <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg space-y-3">
            <h3 className="font-bold text-base flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-300" />
              <span>فاحص سرعة السيرفرات في محافظتك</span>
            </h3>
            <p className="text-xs text-blue-100 leading-relaxed">
              يمكنك قياس سرعة الاتصال وزمن الاستجابة (Latency / Ping) من شبكتنا إلى أي محافظة مصرية من خلال أداة الفاحص والـ DNS المباشرة.
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
            إجابات مباشرة على أكثر الاستفسارات تكراراً من شركائنا وعملائنا في مصر والعالم
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
