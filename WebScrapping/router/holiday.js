const express = require("express");
const router = express.Router();
const Holiday = require("../models/HolidaySchema");
const scrapeHolidays = require("../scrapper/holidayScrapper");

router.get("/", async (req, res) => {
  const holidays = await Holiday.find();
  res.json(holidays);
});

router.get("/:country", async (req, res) => {
  const holidays = await Holiday.find({ country: req.params.country });
  res.json(holidays);
  // res.send("Searching for holidays in the country")
});

router.get("/scrape/:country", async (req, res) => {
  const country = req.params.country;
  try {
    await scrapeHolidays(country);
    res.json({ message: "Scraping completed!" });
  } catch (error) {
    res.status(500).json({ error: "Scraping failed." });
  }
});

router.delete("/deleteAll", async (req, res) => {
  try {
    await Holiday.deleteMany();
    res.json({ message: "All records are deleted" });
  } catch (error) {
    res.status(500).json({ error: "Unable to delete all" });
  }
});

router.delete("/deleteByCountry/:country", async (req, res) => {
  try {
    const country = await req.params.country
    await Holiday.deleteMany({country});
    res.json({ message: `${country}'s holiday records are deleted` });
  } catch (error) {
    res.status(500).json({ error: "Unable to delete all" });
  }
});

module.exports = router;
