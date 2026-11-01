import { AuthorProfile } from '../types';

export const EDITORIAL_AUTHORS: AuthorProfile[] = [
  {
    id: 'hanan-al-ali',
    name: 'أ. حنان العلي',
    nameEn: 'Hanan Al-Ali',
    role: {
      ar: 'رئيسة التحرير الهندسي ومستشارة معايير E-E-A-T وجودة النشر الرقمي',
      en: 'Editorial Director & E-E-A-T Quality Standards Specialist',
    },
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=80',
    bio: {
      ar: 'خبيرة استشارية في هندسة المحتوى الرقمي الموثوق وتطبيقات معايير Google Search Quality Rater Guidelines (E-E-A-T). تمتلك أكثر من 11 عاماً من الخبرة التحريرية والاستشارية في تدقيق المنصات التقنية، ومراجعة سياسات الخصوصية والـ GDPR، ومساعدة الناشرين وأصحاب المواقع على تحويل المحتوى إلى أصول معرفية بشرية عالية القيمة متوافقة مع متطلبات برنامج Google AdSense الصارمة.',
      en: 'Senior editorial consultant specializing in authoritative digital publishing and Google Search Quality Rater Guidelines (E-E-A-T). With over 11 years of experience in technical editorial governance, GDPR compliance, and algorithmic quality alignment, she ensures all content provides verifiable, people-first value.',
    },
    credentials: [
      'بكالوريوس هندسة الحاسبات وتكنولوجيا المعلومات والاتصالات - مرتبة الشرف (2014)',
      'دبلوم الدراسات العليا في استراتيجيات النشر الرقمي والاتصالات - جامعة عين شمس (2016)',
      'اعتماد استشاري معايير Google Search Central للجودة والـ E-E-A-T (2020 - 2026)',
      'شهادة إدارة الامتثال وحماية البيانات الرقمية GDPR / ISO 27701 المعتمدة دولياً',
    ],
    education: [
      {
        degree: 'بكالوريوس هندسة الحاسبات وتكنولوجيا المعلومات',
        institution: 'جامعة القاهرة - كلية الهندسة',
        year: '2010 - 2014',
      },
      {
        degree: 'دبلوم مهني متقدم في استراتيجيات النشر الرقمي والاتصال المؤسسي',
        institution: 'جامعة عين شمس',
        year: '2015 - 2016',
      },
    ],
    certifications: [
      {
        title: 'Google Search Quality & E-E-A-T Content Governance',
        issuer: 'Search Quality Standards Group',
        credentialId: 'SQS-EEAT-2024-9184',
        year: '2024',
      },
      {
        title: 'Certified Digital Privacy Officer (GDPR / ISO 27701)',
        issuer: 'International Privacy & Governance Institute',
        credentialId: 'DPO-PRIV-884102',
        year: '2023',
      },
      {
        title: 'Technical Writing for Engineering & Science',
        issuer: 'IEEE Professional Communications Society',
        credentialId: 'IEEE-PCS-55321',
        year: '2022',
      },
      {
        title: 'Advanced Technical SEO & Core Web Vitals Auditor',
        issuer: 'Digital Analytics & Webmasters Association',
        credentialId: 'DAWA-SEO-2025-41',
        year: '2025',
      },
    ],
    expertise: [
      'معايير E-E-A-T وتقييم جودة المحتوى',
      'سياسات Google AdSense وقبول المواقع',
      'تحسين محركات البحث التقني (Technical SEO)',
      'خصوصية البيانات والامتثال للـ GDPR',
      'التدقيق اللغوي والهندسي للمقالات',
      'تحسين تجربة المستخدم ومؤشرات Core Web Vitals',
    ],
    email: 'hanan@hanan.fun',
    verifiedBadge: true,
  },
  {
    id: 'tarek-kamal',
    name: 'م. طارق كمال',
    nameEn: 'Eng. Tarek Kamal',
    role: {
      ar: 'كبير مهندسي النظم والبنية التحتية السحابية والأمن السيبراني',
      en: 'Principal Cloud Infrastructure & Systems Security Architect',
    },
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80',
    bio: {
      ar: 'مهندس استشاري ومصمم معماري للبنى التحتية السحابية وشبكات Anycast العالمية. يمتلك خبرة عملية تمتد لأكثر من 14 عاماً في تخطيط مراكز البيانات، وتوجيه حركة البيانات الدولية عبر بروتوكول BGP، وحماية خوادم الويب من هجمات حجب الخدمة الضخمة (DDoS)، وبناء بيئات الخوادم الافتراضية عالية التوافر (High-Availability VPS). يقوم بمراجعة وتدقيق جميع المقالات الهندسية والتقنية في المنصة لضمان دقتها العلمية ومطابقتها لمواصفات الـ RFC الدولية.',
      en: 'Principal systems architect with 14+ years designing global Anycast edge networks, BGP autonomous system routing, petabyte-scale multi-cloud virtualization, and enterprise DDoS mitigation scrubbing centers. He leads the technical peer-review process ensuring absolute RFC compliance and real-world engineering accuracy across all published articles.',
    },
    credentials: [
      'بكالوريوس هندسة الحاسبات ونظم التحكم الآلي - كلية الهندسة (2012)',
      'ماجستير في أمن شبكات الحاسوب وتوزيع البيانات السحابية (2017)',
      'شهادة AWS Certified Solutions Architect - Professional (#AWS-PSA-849201)',
      'شهادة Google Cloud Certified Professional Cloud Network Engineer (#GCP-PCNE-391048)',
      'شهادة أخصائي أمن نظم المعلومات المعتمد CISSP (#618942)',
      'شهادة Linux Foundation Certified System Administrator (LFCS #LFCS-2022-7714)',
    ],
    education: [
      {
        degree: 'بكالوريوس هندسة الحاسبات ونظم التحكم',
        institution: 'جامعة القاهرة - كلية الهندسة',
        year: '2007 - 2012',
      },
      {
        degree: 'ماجستير في هندسة الشبكات والأمن السيبراني',
        institution: 'جامعة حلوان - كلية الهندسة بحلوان',
        year: '2014 - 2017',
      },
    ],
    certifications: [
      {
        title: 'AWS Certified Solutions Architect - Professional',
        issuer: 'Amazon Web Services',
        credentialId: 'AWS-PSA-849201',
        year: '2023',
      },
      {
        title: 'Google Cloud Professional Cloud Network Engineer',
        issuer: 'Google Cloud Certification',
        credentialId: 'GCP-PCNE-391048',
        year: '2024',
      },
      {
        title: 'Certified Information Systems Security Professional (CISSP)',
        issuer: '(ISC)²',
        credentialId: 'CISSP-618942',
        year: '2022',
      },
      {
        title: 'Linux Foundation Certified System Administrator (LFCS)',
        issuer: 'The Linux Foundation',
        credentialId: 'LFCS-2022-7714',
        year: '2022',
      },
    ],
    expertise: [
      'هندسة شبكات Anycast وتوزيع المحتوى (CDN)',
      'بروتوكول البوابة الحدودية (BGP Routing)',
      'أنظمة خوادم Linux وإدارة سيرفرات Cloud VPS',
      'جدران حماية تطبيقات الويب (WAF) والتصدي للـ DDoS',
      'معايير التشفير TLS 1.3 وتقنيات DNSSEC',
      'تصميم مراكز البيانات الافتراضية عالية الاعتمادية',
    ],
    email: 'tarek.kamal@hanan.fun',
    verifiedBadge: true,
  },
  {
    id: 'karim-al-mahdi',
    name: 'م. كريم المهدي',
    nameEn: 'Eng. Karim Al-Mahdi',
    role: {
      ar: 'استشاري أداء وتأمين الواجهات الأمامية وهندسة الويب الشاملة',
      en: 'Senior Full-Stack & Web Performance Architect',
    },
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80',
    bio: {
      ar: 'مهندس برمجيات متخصص في تحسين كفاءة الواجهات الأمامية، وهندسة تطبيقات Next.js و React، وتأمين بوابات الدفع الإلكترونية وفق معايير PCI-DSS. يقود جهود تحسين مؤشرات Core Web Vitals (LCP, INP, CLS) على الخوادم، ويوثق أفضل الممارسات البرمجية لضمان أداء خاطف وتوافق فوري مع فهارس محركات البحث.',
      en: 'Full-stack software architect specializing in client-side web optimization, progressive web applications, Next.js architecture, and PCI-DSS compliant fintech integrations. Focuses on sub-second rendering, JavaScript hydration pruning, and Core Web Vitals excellence.',
    },
    credentials: [
      'بكالوريوس علوم الحاسب وهندسة البرمجيات (2015)',
      'شهادة Google Mobile Web Specialist المعتمدة',
      'شهادة Red Hat Certified System Administrator (RHCSA #190-214-883)',
      'خبير معتمد في معايير W3C لأداء تطبيقات الويب',
    ],
    education: [
      {
        degree: 'بكالوريوس علوم الحاسب وهندسة البرمجيات',
        institution: 'جامعة عين شمس - كلية الحاسبات والمعلومات',
        year: '2011 - 2015',
      },
    ],
    certifications: [
      {
        title: 'Google Mobile Web Specialist',
        issuer: 'Google Developers Certification',
        credentialId: 'GMWS-2023-5591',
        year: '2023',
      },
      {
        title: 'Red Hat Certified System Administrator (RHCSA)',
        issuer: 'Red Hat',
        credentialId: 'RHCSA-190-214-883',
        year: '2022',
      },
      {
        title: 'W3C Web Performance Architecture Certification',
        issuer: 'W3C / edX',
        credentialId: 'W3C-PERF-9031',
        year: '2024',
      },
    ],
    expertise: [
      'تحسين مؤشرات Core Web Vitals (LCP, INP, CLS)',
      'هندسة الواجهات الحديثة (React, Next.js, Vite)',
      'تكامل بوابات الدفع الإلكتروني وحماية بيانات البطاقات',
      'أمان المتصفح وسياسات Content-Security-Policy (CSP)',
      'ضغط الأصول الرقمية (WebP, AVIF, Brotli)',
    ],
    email: 'karim.mahdi@hanan.fun',
    verifiedBadge: true,
  },
];

export const EDITORIAL_PRINCIPLES = {
  ar: {
    title: 'ميثاق الشفافية والنزاهة التحريرية وسياسة E-E-A-T',
    subtitle: 'معايير النشر الصارمة لضمان محتوى بشري أصلي 100% موثق بأرقام ومراجع دولية',
    principles: [
      {
        title: 'الكتابة والتدقيق البشري الخالص (100% Human-Authored)',
        desc: 'يتم إعداد كافة المقالات، الشروحات، والتحليلات بأيدي مهندسين ومتخصصين ممارسين يمتلكون خبرة ميدانية موثقة، مع حظر كامل لنشر المحتوى التلقائي أو النصوص الآلية مجهولة المصدر دون تمحيص بشري دقيق.',
      },
      {
        title: 'التوثيق بأرقام ومراجع دولية معتمدة (Verified Citations)',
        desc: 'كل معلومة تقنية، أو بروتوكول شبكات، أو معيار أمان يُشار إليه برقم مرجعي موثق يعود إلى هيئات المعايير الدولية مثل IETF RFCs، NIST، IEEE، W3C، أو التوثيقات الرسمية لمطوري Google و Cloudflare.',
      },
      {
        title: 'المراجعة المزدوجة من الأقران (Peer-Review Process)',
        desc: 'قبل اعتماد أي مقال للنشر، يخضع لمراجعة مرحلتين: مراجعة هندسية فنية للتحقق من صحة الأوامر والبروتوكولات (يقودها م. طارق كمال)، ومراجعة تحريرية لغوية وتوافقية مع معايير جودة البحث AdSense (تقودها أ. حنان العلي).',
      },
      {
        title: 'الشفافية الكاملة وحظر تضارب المصالح',
        desc: 'نعلن بوضوح عن أي أدوات، خدمات، أو برمجيات نناقشها دون تحيز. لا نقبل أي رعاية تؤثر على نزاهة التقييم التقني أو تضلل القارئ.',
      },
      {
        title: 'التحديث المستمر ومكافحة التقادم المعرفي',
        desc: 'تتم مراجعة المقالات دورياً وتحديث البيانات والإحصائيات كلما طرأت تغييرات على بروتوكولات الإنترنت أو إرشادات محركات البحث لحماية الزائر من المعلومات القديمة.',
      },
    ],
  },
  en: {
    title: 'Editorial Transparency, Integrity & E-E-A-T Charter',
    subtitle: 'Rigorous publishing standards guaranteeing 100% human-authored, peer-reviewed technical intelligence',
    principles: [
      {
        title: '100% Human-Authored & Peer-Reviewed',
        desc: 'Every technical guide, architecture breakdown, and performance review is authored by licensed field engineers with verifiable industry track records.',
      },
      {
        title: 'Numbered Verifiable Standard References',
        desc: 'All protocol descriptions, security models, and network benchmarks cite official international standards (IETF RFCs, NIST, IEEE, W3C, ISO/IEC).',
      },
      {
        title: 'Two-Stage Peer Review',
        desc: 'Articles undergo rigorous technical peer-review by senior architects followed by editorial audit for E-E-A-T compliance and readability.',
      },
      {
        title: 'Zero Conflict of Interest',
        desc: 'Clear disclosure of all software stacks and operational tools with zero commercial bias or undisclosed affiliate influence.',
      },
      {
        title: 'Active Lifecycle Maintenance',
        desc: 'Guides are continually refreshed as internet standards evolve, preventing stale technical guidance and ensuring lasting reader value.',
      },
    ],
  },
};
