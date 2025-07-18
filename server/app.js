const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const apiKeyRoutes = require("./routes/apiKeyRoutes");
const countryRoutes = require("./routes/countryRoutes");

const app = express();
app.use(cors());
app.use(bodyParser.json());

//routing apis
app.use("/api", authRoutes);
app.use("/api", apiKeyRoutes);
app.use("/api", countryRoutes);

module.exports = app;
