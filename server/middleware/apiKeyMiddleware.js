const db = require("../db/database");

//apikey middleware
module.exports = (req, res, next) => {
  const key = req.query.apikey;
  if (!key) return res.status(400).json({ error: "API key required" });

  db.get(`SELECT * FROM api_keys WHERE key = ?`, [key], (err, apiKey) => {
    if (err || !apiKey)
      return res.status(401).json({ error: "Invalid API key" });
    req.apiKey = key;
    next();
  });
};
