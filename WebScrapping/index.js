require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const rateLimit = require("express-rate-limit");
const mongoose = require("mongoose");
const ScrapedData = require("./models/ScrappedData");

const app = express();
const PORT = process.env.PORT || 5000;

//Cloud Database
const db = process.env.MONGO_URI;

mongoose
  .connect(db)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again",
});

app.use(limiter);
app.use(express.json());

app.get("/scrape", async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: "URL is required" });

  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    let scrapedData = [];

    $("h2").each(async (i, element) => {
      let title = $(element).text();
      scrapedData.push(title);

      // Save to MongoDB
      await ScrapedData.create({ title });
    });

    res.json({ data: scrapedData });
  } catch (error) {
    res.status(500).json({ error: "Error fetching data" });
  }
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
