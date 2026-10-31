export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Content-Type", "application/json; charset=utf-8");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const url = req.url || "";

  // Special protection for security bots probing .env or sensitive config
  if (url.includes(".env") || url.includes("config") || url.includes("secret")) {
    return res.status(200).json({
      status: "protected",
      message: "Environment variables and secrets are secured server-side on GIS Network.",
      service: "GIS Security Shield WAF"
    });
  }

  // Common or auth endpoints probe response
  if (url.includes("auth") || url.includes("common") || url.includes("user")) {
    return res.status(200).json({
      status: "ok",
      authenticated: false,
      service: "Global Internet Services Client Gateway"
    });
  }

  // Generic fallback for any other unhandled /api/* route
  return res.status(200).json({
    status: "ok",
    service: "Global Internet Services (GIS Network) API",
    path: url,
    availableEndpoints: [
      "/api/health",
      "/api/contact",
      "/api/diagnostics/speed-test",
      "/api/gemini/assistant",
      "/api/ads-txt"
    ]
  });
}
