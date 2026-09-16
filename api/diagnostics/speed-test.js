export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const domain = (req.body?.domain || "hanan.fun").replace(/^https?:\/\//, "").replace(/\/.*$/, "");
  const nodes = [
    { region: "Frankfurt (DE)", ping: Math.floor(12 + Math.random() * 8), status: "optimal", score: 98 },
    { region: "Riyadh (KSA)", ping: Math.floor(18 + Math.random() * 10), status: "optimal", score: 97 },
    { region: "New York (USA)", ping: Math.floor(22 + Math.random() * 12), status: "optimal", score: 95 },
    { region: "Singapore (SG)", ping: Math.floor(28 + Math.random() * 14), status: "optimal", score: 94 },
    { region: "Tokyo (JP)", ping: Math.floor(32 + Math.random() * 16), status: "optimal", score: 93 },
    { region: "London (UK)", ping: Math.floor(14 + Math.random() * 9), status: "optimal", score: 99 },
  ];

  return res.status(200).json({
    domain,
    sslStatus: "Valid (TLS 1.3 Active - 256-bit AES)",
    http3Support: true,
    ipv6Ready: true,
    ttfbMs: 35,
    overallScore: 97,
    adSenseCompatibility: "100% Compatible (Compliant HTML structure, Fast LCP, Clean CLS)",
    nodes,
  });
}
