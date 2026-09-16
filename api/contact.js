export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const ticketId = "GIS-" + Math.floor(100000 + Math.random() * 900000);
  return res.status(200).json({
    success: true,
    ticketId,
    message: "Message received successfully. Our global support team will respond within 2-4 hours.",
    receivedAt: new Date().toISOString(),
  });
}
