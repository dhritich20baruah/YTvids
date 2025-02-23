const express = require("express");
const router = express.Router();
const Holiday = require("../models/HolidaySchema");
const scrapeHolidays = require("../scrapper/holidayScrapper");

router.get("/", async (req, res) => {
  const holidays = await Holiday.find();
  res.json(holidays);
});

router.get("/searchByCountry/:country", async (req, res) => {
  const holidays = await Holiday.find({ country: req.params.country });
  res.json(holidays);
});

router.get("/searchByDate/:date", async (req, res) => {
  const holidays = await Holiday.find({ date: req.params.date });
  res.json(holidays);
});

router.get("/searchByHoliday/:holiday", async (req, res) => {
  const holidays = await Holiday.find({ name: req.params.holiday });
  res.json(holidays);
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

router.post("/AddHoliday", async(req, res) => {
  try {
    const { country, date, name } = req.body;

    if (!country || !date || !name) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newHoliday = new Holiday({ country, date, name, type: "public" });
    await newHoliday.save();

    res.status(201).json({ message: "Holiday saved successfully", holiday: newHoliday });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
})

router.put("/updateMany", async (req, res) => {
  try {
    const { holidays } = req.body; // Array of holiday updates
    console.log(holidays)
    const bulkOps = holidays.map((holiday) => ({
      updateOne: {
        filter: { _id: holiday._id },
        update: { $set: {date: holiday.date, name: holiday.name, type: holiday.type } },
      },
    }));

    await Holiday.bulkWrite(bulkOps);
    res.json({ message: "Holidays updated successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
