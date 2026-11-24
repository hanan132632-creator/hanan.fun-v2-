import { Language, ServiceItem } from '../types';

export const PAYPAL_MERCHANT_EMAIL = 'hanan132632@gmail.com';

export function buildPayPalCheckoutUrl(itemName: string, amountUSD: number): string {
  const params = new URLSearchParams({
    cmd: '_xclick',
    business: PAYPAL_MERCHANT_EMAIL,
    item_name: itemName.slice(0, 127),
    amount: amountUSD.toFixed(2),
    currency_code: 'USD',
    no_shipping: '1',
    return: 'https://hanan.fun/store',
  });
  return `https://www.paypal.com/cgi-bin/webscr?${params.toString()}`;
}

export interface DigitalProduct extends ServiceItem {
  coverImage: string;
  formatLabel: Partial<Record<Language, string>> & { ar: string; en: string };
  pagesOrFilesCount: string;
  includedItems: { ar: string[]; en: string[] };
  externalCheckoutUrl?: string;
}

export const DIGITAL_PRODUCTS: DigitalProduct[] = [
  {
    id: 'kit-adsense-seo-readiness',
    coverImage: '/images/digital-guide-seo-adsense.jpg',
    formatLabel: {
      ar: 'دليل PDF + قوالب جاهزة',
      en: 'PDF Playbook + Ready Config Files',
    },
    pagesOrFilesCount: '9 صفحات + 4 قوالب',
    name: {
      ar: 'حزمة تهيئة المواقع للقبول في AdSense والسيو التقني',
      en: 'AdSense & Technical SEO Readiness Kit',
      fr: 'Kit AdSense & SEO Technique',
      es: 'Kit de AdSense y SEO Técnico',
      de: 'AdSense & Technisches SEO Paket',
      zh: 'AdSense 审核与技术型 SEO 工具包',
      ja: 'AdSense審査・テクニカルSEO対策キット',
      tr: 'AdSense ve Teknik SEO Hazırlık Paketi',
    },
    category: 'marketing',
    shortDesc: {
      ar: 'دليل عملي منظم لفحص الجاهزية، إصلاح صفحات السياسات، ملفات ads.txt و sitemap، وتسريع الأرشفة في جوجل.',
      en: 'Structured 45-point audit playbook covering policy pages, ads.txt, sitemap architecture, and Core Web Vitals.',
      fr: 'Guide pratique en 45 points pour AdSense et le SEO technique.',
      es: 'Guía práctica de 45 puntos para AdSense y SEO técnico.',
      de: '45-Punkte-Praxishandbuch für AdSense und technisches SEO.',
      zh: '45项检查清单、隐私条款模板及谷歌快速收录指南。',
      ja: 'AdSenseポリシー準拠と検索インデックス最適化の実践ガイド。',
      tr: 'AdSense politikaları ve teknik SEO için 45 maddelik rehber.',
    },
    fullDesc: {
      ar: 'مجموعة رقمية عملية مصممة لأصحاب المواقع والمدونات العربية لتفادي أسباب الرفض الشائعة مثل ضعف المحتوى أو نقص صفحات السياسات، مع قوالب جاهزة لملفات الموقع الأساسية.',
      en: 'Practical digital toolkit crafted for publishers to fix thin-content flags, policy gaps, robots/sitemap errors, and mobile speed bottlenecks before AdSense review.',
      fr: 'Boîte à outils complète pour préparer votre site à Google AdSense.',
      es: 'Kit digital práctico para preparar tu sitio web antes de enviar a AdSense.',
      de: 'Praktisches digitales Toolkit zur Vorbereitung auf die AdSense-Prüfung.',
      zh: '专为网站主打造的实战数字化指南，避免低价值内容或政策缺失拒审。',
      ja: 'コンテンツ品質や必須ページ不備を解消するサイト運営者向け実践キット。',
      tr: 'Yayıncılar için AdSense başvurusu öncesi eksiksiz hazırlık seti.',
    },
    basePriceUSD: 19,
    period: 'one-time',
    rating: 4.9,
    reviewsCount: 142,
    specs: [
      { label: { ar: 'الصيغة', en: 'Format', fr: 'Format', es: 'Formato', de: 'Format', zh: '格式', ja: '形式', tr: 'Format' }, value: 'PDF + TXT/XML' },
      { label: { ar: 'التسليم', en: 'Delivery', fr: 'Livraison', es: 'Entrega', de: 'Lieferung', zh: '交付', ja: '配信', tr: 'Teslimat' }, value: 'Instant Digital' },
    ],
    features: {
      ar: [
        'قائمة فحص شاملة من 45 نقطة قبل تقديم الموقع للمراجعة',
        'قوالب جاهزة لملفات ads.txt و robots.txt و sitemap',
        'هيكل كتابة المقالات المتوافقة مع معايير E-E-A-T والمصادر',
        'خطوات تحسين سرعة الجوال وتقليل أخطاء الفهرسة',
      ],
      en: [
        'Complete 45-point pre-review compliance checklist',
        'Ready-to-deploy templates for ads.txt, robots.txt & sitemap',
        'E-E-A-T editorial structure & citation framework',
        'Mobile Core Web Vitals & Search Console troubleshooting guide',
      ],
      fr: ['Liste de contrôle complète en 45 points', 'Modèles ads.txt et robots.txt prêts'],
      es: ['Lista de verificación de 45 puntos', 'Plantillas ads.txt y robots.txt listas'],
      de: ['45-Punkte-Checkliste', 'Fertige ads.txt- und robots.txt-Vorlagen'],
      zh: ['45项审核检查表', '可直接部署的配置文件模板'],
      ja: ['45項目の事前チェックリスト', 'ads.txtおよびrobots.txtテンプレート'],
      tr: ['45 maddelik kontrol listesi', 'Hazır ads.txt ve robots.txt şablonları'],
    },
    includedItems: {
      ar: [
        'ملف PDF: دليل اجتياز مراجعة AdSense وتجنب أخطاء المحتوى منخفض القيمة',
        'قالب نصي جاهز لصفحات الخصوصية، شروط الاستخدام، والكوكيز',
        'أمثلة مضبوطة لملفات robots.txt و sitemap.xml و ads.txt',
        'دليل تحسين سرعة التحميل وتقليل حجم الصور والخطوط',
      ],
      en: [
        'PDF Playbook: Passing AdSense Review & Avoiding Low-Value Content Flags',
        'Structured Privacy Policy, Terms & Cookie Consent checklist',
        'Verified templates for robots.txt, sitemap.xml, and ads.txt',
        'Core Web Vitals asset & font optimization checklist',
      ],
    },
    iconName: 'BookOpen',
    externalCheckoutUrl: buildPayPalCheckoutUrl('AdSense & Technical SEO Readiness Kit (GIS Network)', 19),
  },
  {
    id: 'kit-cloud-security-cdn',
    coverImage: '/images/digital-guide-cloud-security.jpg',
    formatLabel: {
      ar: 'دليل هندسي PDF + إعدادات DNS',
      en: 'Engineering PDF + DNS Templates',
    },
    pagesOrFilesCount: '6 صفحات + قواعد WAF/DNS',
    name: {
      ar: 'دليل حماية السيرفرات وتسريع الشبكات السحابية (CDN)',
      en: 'Cloud Security & Edge CDN Playbook',
      fr: 'Guide Sécurité Cloud & CDN',
      es: 'Guía de Seguridad Cloud y CDN',
      de: 'Cloud-Sicherheit & Edge-CDN Handbuch',
      zh: '云安全防护与边缘 CDN 加速手册',
      ja: 'クラウドセキュリティ＆CDN高速化ガイド',
      tr: 'Bulut Güvenliği ve CDN Hızlandırma Rehberi',
    },
    category: 'security',
    shortDesc: {
      ar: 'خطوات عملية لضبط Cloudflare WAF، تفعيل TLS 1.3، تسريع IPv6/HTTP3، ومنع هجمات البوتات.',
      en: 'Step-by-step handbook for configuring WAF rules, TLS 1.3 hardening, IPv6 dual-stack, and edge caching.',
      fr: 'Manuel pratique pour Cloudflare WAF, TLS 1.3 et HTTP/3.',
      es: 'Manual paso a paso para Cloudflare WAF, TLS 1.3 y HTTP/3.',
      de: 'Schritt-für-Schritt-Handbuch für WAF, TLS 1.3 und HTTP/3.',
      zh: '逐步配置 WAF 防火墙、TLS 1.3、HTTP/3 与边缘缓存策略。',
      ja: 'WAF設定、TLS 1.3強化、HTTP/3最適化の実践プレイブック。',
      tr: 'WAF kuralları, TLS 1.3 ve HTTP/3 hızlandırma adımları.',
    },
    fullDesc: {
      ar: 'مرجع هندسي واضح يساعد مطوري وأصحاب المواقع على تأمين نطاقاتهم ضد الهجمات الآلية وتقليل زمن الاستجابة للزوار في مصر والخليج وأوروبا.',
      en: 'Clear infrastructure manual helping site owners harden SSL/TLS certificates, block automated scrapers, and cut TTFB latency across MENA and Europe.',
      fr: 'Référence pratique pour sécuriser et accélérer vos serveurs web.',
      es: 'Referencia práctica para asegurar y acelerar tus servidores web.',
      de: 'Praxisreferenz zur Absicherung und Beschleunigung Ihrer Webserver.',
      zh: '帮助站长保护域名安全并大幅降低中东与欧洲地区访问延迟。',
      ja: 'サーバー保護と中東・欧州向けレスポンス高速化のための実践リファレンス。',
      tr: 'Alan adlarını koruma ve gecikme süresini azaltma rehberi.',
    },
    basePriceUSD: 24,
    period: 'one-time',
    rating: 4.95,
    reviewsCount: 98,
    specs: [
      { label: { ar: 'الصيغة', en: 'Format', fr: 'Format', es: 'Formato', de: 'Format', zh: '格式', ja: '形式', tr: 'Format' }, value: 'PDF + WAF Rules' },
      { label: { ar: 'التسليم', en: 'Delivery', fr: 'Livraison', es: 'Entrega', de: 'Lieferung', zh: '交付', ja: '配信', tr: 'Teslimat' }, value: 'Instant Digital' },
    ],
    features: {
      ar: [
        'إعدادات جدار الحماية (WAF) لحظر الزيارات الضارة دون حظر عناكب جوجل',
        'ضبط سجلات DNS و SPF / DKIM / DMARC لحماية البريد الرسمي',
        'تفعيل التخزين المؤقت الذكي و HTTP/3 على الحافة',
        'خطة النسخ الاحتياطي واستعادة الأعطال السريعة',
      ],
      en: [
        'Bot-filtering WAF rules that keep search crawlers unblocked',
        'Verified DNS, SPF, DKIM & DMARC domain email authentication setup',
        'Smart Edge caching headers & HTTP/3 QUIC configuration',
        'Zero-downtime backup & recovery checklist',
      ],
      fr: ['Règles WAF optimisées', 'Configuration DNS, SPF, DKIM & DMARC'],
      es: ['Reglas WAF seguras para SEO', 'Configuración DNS, SPF, DKIM y DMARC'],
      de: ['SEO-sichere WAF-Regeln', 'DNS, SPF, DKIM & DMARC Setup'],
      zh: ['兼顾搜索引擎爬虫的 WAF 规则', '完整的 DNS 与邮件认证配置'],
      ja: ['SEOクローラーを妨げないWAFルール', 'DNSおよびメール認証設定ガイド'],
      tr: ['SEO dostu WAF kuralları', 'DNS, SPF, DKIM ve DMARC kurulumu'],
    },
    includedItems: {
      ar: [
        'دليل PDF: هندسة الأمان السحابي وتأمين النطاقات من الاختراق',
        'جداول إعدادات DNS والبريد الإلكتروني الموثوق (SPF/DKIM/DMARC)',
        'قواعد Cache-Control المناسبة للمواقع الثابتة والديناميكية',
        'قائمة فحص الاستجابة السريعة عند التوقف الطارئ',
      ],
      en: [
        'PDF Playbook: Cloud Security & Domain Hardening Architecture',
        'DNS & Email Authentication cheat sheets (SPF/DKIM/DMARC)',
        'Production Cache-Control headers for static & SPA workloads',
        'Incident response & rapid recovery runbook',
      ],
    },
    iconName: 'ShieldCheck',
    externalCheckoutUrl: buildPayPalCheckoutUrl('Cloud Security & Edge CDN Playbook (GIS Network)', 24),
  },
  {
    id: 'kit-android-play-admob',
    coverImage: '/images/digital-guide-mobile-launch.jpg',
    formatLabel: {
      ar: 'دليل عملي PDF + قائمة نشر',
      en: 'Launch PDF + Store Checklist',
    },
    pagesOrFilesCount: '5 صفحات + قوائم نشر',
    name: {
      ar: 'دليل نشر تطبيقات الويب على Google Play وربط AdMob',
      en: 'Google Play & AdMob Launch Blueprint',
      fr: 'Guide Publication Google Play & AdMob',
      es: 'Guía de Publicación Google Play y AdMob',
      de: 'Google Play & AdMob Launch-Leitfaden',
      zh: 'Google Play 上架与 AdMob 变现蓝图',
      ja: 'Google Play公開＆AdMob連携ブループリント',
      tr: 'Google Play Yayınlama ve AdMob Rehberi',
    },
    category: 'cloud',
    shortDesc: {
      ar: 'شرح مبسط لإعداد app-ads.txt، سياسة أمان البيانات في Console، وحماية ملف التوقيع Keystore.',
      en: 'Clear walkthrough of app-ads.txt verification, Play Console Data Safety, and keystore management.',
      fr: 'Guide clair pour app-ads.txt, Data Safety et Google Play.',
      es: 'Guía clara para app-ads.txt, Data Safety y Google Play.',
      de: 'Klarer Leitfaden für app-ads.txt, Datensicherheit und Google Play.',
      zh: '清晰讲解 app-ads.txt 验证、数据安全表单及签名密钥管理。',
      ja: 'app-ads.txt認証、データセーフティ設定、Keystore保護の手順書。',
      tr: 'app-ads.txt doğrulama, Veri Güvenliği ve Keystore yönetimi.',
    },
    fullDesc: {
      ar: 'خلاصة عملية موجهة لأصحاب المواقع والتطبيقات الناشئة لإتمام الربط بين الموقع والتطبيق وحساب AdMob ومتجر Google Play دون أخطاء متكررة.',
      en: 'Step-by-step blueprint designed for creators connecting their website, Google Play listing, and AdMob account cleanly without policy rejections.',
      fr: 'Plan d\'action étape par étape pour Google Play et AdMob.',
      es: 'Plan paso a paso para conectar tu sitio web, Google Play y AdMob.',
      de: 'Schritt-für-Schritt-Plan für Google Play Store und AdMob.',
      zh: '帮助创作者顺利打通网站、Play 商店与 AdMob 账户的实用指南。',
      ja: 'ウェブサイト・Google Play・AdMobを正しく連携させる実践手順書。',
      tr: 'Web sitesi, Google Play ve AdMob bağlantısı için adım adım rehber.',
    },
    basePriceUSD: 15,
    period: 'one-time',
    rating: 4.9,
    reviewsCount: 86,
    specs: [
      { label: { ar: 'الصيغة', en: 'Format', fr: 'Format', es: 'Formato', de: 'Format', zh: '格式', ja: '形式', tr: 'Format' }, value: 'PDF + Checklist' },
      { label: { ar: 'التسليم', en: 'Delivery', fr: 'Livraison', es: 'Entrega', de: 'Lieferung', zh: '交付', ja: '配信', tr: 'Teslimat' }, value: 'Instant Digital' },
    ],
    features: {
      ar: [
        'إعداد ملف app-ads.txt والتحقق من ملكية التطبيق في AdMob',
        'شرح تعبئة نموذج أمان البيانات (Data Safety) بدون أخطاء',
        'طرق حفظ وحماية مفتاح التوقيع Keystore قبل أي تحديث',
        'قواعد عرض الإعلانات الآمنة لتجنب تقييد الحساب',
      ],
      en: [
        'app-ads.txt setup & AdMob store ownership verification steps',
        'Accurate Play Console Data Safety & Ads declaration guide',
        'Keystore backup & release versioning safeguards',
        'Ad placement safety rules to prevent invalid traffic limits',
      ],
      fr: ['Configuration app-ads.txt', 'Formulaire Data Safety sans erreur'],
      es: ['Configuración de app-ads.txt', 'Guía de seguridad de datos en Console'],
      de: ['app-ads.txt Einrichtung', 'Leitfaden für Datensicherheit in der Console'],
      zh: ['app-ads.txt 配置指南', '数据安全表单填写说明'],
      ja: ['app-ads.txt設定手順', 'データセーフティ申告ガイド'],
      tr: ['app-ads.txt kurulumu', 'Veri Güvenliği formu doldurma rehberi'],
    },
    includedItems: {
      ar: [
        'ملف PDF: خطوات توثيق التطبيق في AdMob وربط app-ads.txt',
        'قائمة مراجعة إعدادات الشاشات الكبيرة و Target SDK في Play Console',
        'نموذج جاهز لبيان الخصوصية المتوافق مع التطبيقات والمواقع',
        'إرشادات حماية مفتاح التوقيع وتجنب تقييد الإعلانات',
      ],
      en: [
        'PDF Blueprint: Verifying App Ownership in AdMob & app-ads.txt',
        'Play Console Data Safety, Target SDK & Large-Screen checklist',
        'Privacy Policy checklist covering website + mobile WebView/AdMob',
        'Keystore preservation & policy-safe ad placement standards',
      ],
    },
    iconName: 'Smartphone',
    externalCheckoutUrl: buildPayPalCheckoutUrl('Google Play & AdMob Launch Blueprint (GIS Network)', 15),
  },
];

export const FREE_PRELAUNCH_CHECKLIST_AR = `قائمة الفحص المجانية قبل إطلاق موقعك أو تقديمه لجوجل (GIS Network - https://hanan.fun)
================================================================================

1. الأساسيات التقنية والسرعة
[ ] شهادة الأمان HTTPS (SSL) مفعلة وتعمل على جميع الصفحات دون تحذيرات.
[ ] ملف robots.txt متاح على المسار الرئيسي ولا يمنع أرشفة المقالات.
[ ] خريطة الموقع sitemap.xml محدثة ومربوطة داخل Google Search Console.
[ ] الموقع متجاوب بالكامل على الجوال والتابلت (بدون تداخل أو تمرير أفقي).
[ ] صور الموقع مضغوطة وتحتوي على نص بديل (alt) واضح.

2. صفحات الثقة والامتثال (مطلوبة لـ Google AdSense و Google Play)
[ ] صفحة "من نحن" توضح هوية الموقع والجهة المسؤولة بوضوح.
[ ] صفحة "اتصل بنا" تحتوي على بريد إلكتروني حقيقي فعال ونموذج تواصل.
[ ] صفحة "سياسة الخصوصية" تشرح ملفات تعريف الارتباط والإعلانات بوضوح.
[ ] صفحة "شروط الاستخدام" و"سياسة الكوكيز" مكتملتان ومترابطتان في التذييل.
[ ] صفحة "هيئة التحرير / الكاتب" توثق مصادر المعلومات والخبرة (E-E-A-T).

3. ملفات التحقق الإعلاني
[ ] ملف ads.txt متاح على: https://yourdomain.com/ads.txt
[ ] ملف app-ads.txt متاح على النطاق الرئيسي إذا كان لديك تطبيق على المتجر.

4. جودة المحتوى
[ ] المقالات أصلية ومفيدة وغير منسوخة حرفياً من مصادر أخرى.
[ ] وجود مصادر ومراجع موثوقة وتواريخ تحديث واضحة للمحتوى التقني.

---
تم إعداد هذه القائمة بواسطة منظومة خدمات الإنترنت العالمية (GIS Network)
الموقع الرسمي: https://hanan.fun | البريد: support@hanan.fun
`;

export const FREE_PRELAUNCH_CHECKLIST_EN = `Free Website & Google Compliance Pre-Launch Checklist (GIS Network - https://hanan.fun)
================================================================================

1. Technical & Speed Fundamentals
[ ] HTTPS (SSL) active across all pages with no mixed-content warnings.
[ ] /robots.txt accessible at root and allowing search engine crawling.
[ ] /sitemap.xml updated and submitted in Google Search Console.
[ ] Full mobile & tablet responsiveness with clean Core Web Vitals.
[ ] Compressed images with descriptive alt attributes.

2. Trust & Compliance Pages (Required for AdSense & Google Play)
[ ] Clear About page explaining site ownership and editorial mission.
[ ] Working Contact page with an official monitored email address.
[ ] Privacy Policy explaining cookies, analytics, and ad personalization.
[ ] Terms of Use and Cookie Policy accessible from the site footer.
[ ] Editorial / Author profile documenting expertise and sources (E-E-A-T).

3. Ad Verification Files
[ ] /ads.txt live at domain root with your publisher ID.
[ ] /app-ads.txt live at domain root if publishing a mobile app.

4. Content Quality
[ ] Original, human-edited articles with concrete steps and citations.
[ ] Clear publish/update dates on technical guides.

---
Published by Global Internet Services (GIS Network)
Website: https://hanan.fun | Support: support@hanan.fun
`;
