export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const { language = "ar" } = req.body || {};
  const fallbacks = {
    ar: "مرحباً بك في منصة خدمات الإنترنت العالمية! نحن نقدم خدمات الاستضافة السحابية المتقدمة وحماية DDoS وتسجيل النطاقات وتسريع المحتوى CDN.",
    en: "Welcome to Global Internet Services! We provide enterprise cloud hosting, DDoS mitigation, global domain registration, and high-performance CDN.",
  };

  return res.status(200).json({
    reply: fallbacks[language] || fallbacks.ar,
    model: "gis-edge-knowledge",
  });
}
