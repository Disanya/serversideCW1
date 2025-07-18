const fetch = require("node-fetch");
const db = require("../db/database");

//retrieving the country details from the restcountries.com using the name of the country with a selected apikey by the user
exports.getCountry = async (req, res) => {
  const { name } = req.query;
  const apiKey = req.apiKey;

  try {
    const response = await fetch(`https://restcountries.com/v3.1/name/${name}`);
    const data = await response.json();
    if (!data || !data[0])
      return res.status(404).json({ error: "Country not found" });
    db.run(
      `UPDATE api_keys SET usage_count = usage_count + 1, last_used = CURRENT_TIMESTAMP WHERE key = ?`,
      [apiKey]
    );

    const country = data[0];
    const result = {
      name: country.name.common,
      capital: country.capital ? country.capital[0] : "N/A",
      currency: Object.values(country.currencies || {})[0]?.name || "N/A",
      languages: Object.values(country.languages || {}).join(", "),
      flag: country.flags?.svg || "",
    };

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Error fetching country info" });
  }
};
