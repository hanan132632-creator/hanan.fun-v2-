export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Content-Type", "application/json; charset=utf-8");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  return res.status(200).json({
    status: "ok",
    service: "Global Internet Services (GIS Network) API Gateway",
    domain: "hanan.fun",
    version: "2026.1",
    endpoints: {
      health: "/api/health",
      contact: "/api/contact",
      diagnosticsSpeed: "/api/diagnostics/speed-test",
      assistant: "/api/gemini/assistant",
      adsTxt: "/api/ads-txt"
    },
    timestamp: new Date().toISOString()
  });
}
