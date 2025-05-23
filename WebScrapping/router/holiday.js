const express = require("express");
const router = express.Router();
const Holiday = require("../models/HolidaySchema");
const scrapeHolidays = require("../scrapper/holidayScrapper");
const updateAliases = require("../scrapper/updateAliases");

router.get("/", async (req, res) => {
  const holidays = await Holiday.find();
  res.json(holidays);
});

//Fetch All Countries
router.get("/fetchAllCountries", async (req, res) => {
  try {
    const countries = await Holiday.distinct("country");
    res.json({ success: true, countries });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
})

//Fetch All Holidays
router.get("/fetchAllHolidays", async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; // Get page and limit from query params

    const holidays = await Holiday.aggregate([
      { $group: { _id: "$name" } }, // Get distinct holiday names
      { $sort: { _id: 1 } }, // Sort alphabetically
      { $skip: (parseInt(page) - 1) * parseInt(limit) }, // Apply pagination
      { $limit: parseInt(limit) }, // Limit results
    ]);

    res.json({ success: true, holidays: holidays.map((h) => h._id) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Fetch By Country
router.get("/fetchByCountry/:country", async (req, res) => {
  try {
    const country = req.params.country;
    const formattedCountry = country.replace(/ /g, "_");
    const holidays = await Holiday.find({
      $or: [
        { country: { $regex: `^${formattedCountry}$`, $options: "i" } },
        { aliases: { $regex: `^${formattedCountry}$`, $options: "i" } },
      ],
    });
    res.json(holidays);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Fetch By Date
router.get("/fetchByDate/:date", async (req, res) => {
  try {
    const holidays = await Holiday.find({ date: req.params.date });
    res.json(holidays);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Fetch By Holiday
router.get("/fetchByHoliday/:holiday", async (req, res) => {
  try {
    const holidays = await Holiday.find({ name: req.params.holiday });
    res.json(holidays);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Fetch By Type
router.get("/fetchByType/:type", async (req, res) => {
  try {
    const holidays = await Holiday.find({ type: req.params.type });
    res.json(holidays);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Fetch By Month
router.get("/fetchByMonth/:month", async (req, res) => {
  try {
    const { month } = req.params;
    const holidays = await Holiday.find({
      date: { $regex: `^${month}`, $options: "i" },
    });
    res.json(holidays);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Fetch By Month and Country
router.get("/fetchByCountryAndMonth/:country/:month", async (req, res) => {
  try {
    let { country, month } = req.params;

    const formattedCountry = country.replace(/ /g, "_");
   
    const holidays = await Holiday.find({
      $or: [
        { country: { $regex: `^${formattedCountry}$`, $options: "i" } },
        { aliases: { $regex: `^${formattedCountry}$`, $options: "i" } },
      ],
      date: { $regex: `^${month}`, $options: "i" },
    });

    res.json(holidays);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Fetch By Year and Country
router.get("/fetchByCountryAndYear/:country/:year", async (req, res) => {
  try {
    let { country, year } = req.params;

    const formattedCountry = country.replace(/ /g, "_");

    const holidays = await Holiday.find({
      $or: [
        { country: { $regex: `^${formattedCountry}$`, $options: "i" } },
        { aliases: { $regex: `^${formattedCountry}$`, $options: "i" } },
      ],
      year: year,
    });

    res.json(holidays);
  } catch (error) {
    res.status(500).json({ error: "Server error in fetching holidays" });
  }
});

//Scrape Holidays
router.get("/scrape/:country", async (req, res) => {
  const country = req.params.country;
  try {
    await scrapeHolidays(country);
    res.json({ message: "Scraping completed!" });
  } catch (error) {
    res.status(500).json({ error: "Scraping failed." });
  }
});

//Delete By Country
router.delete("/deleteByCountry/:country", async (req, res) => {
  try {
    const country = await req.params.country;
    await Holiday.deleteMany({ country });
    res.json({ message: `${country}'s holiday records are deleted` });
  } catch (error) {
    res.status(500).json({ error: "Unable to delete all" });
  }
});

//Add Holiday
router.post("/AddHoliday", async (req, res) => {
  try {
    const { country, date, name } = req.body;

    if (!country || !date || !name) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newHoliday = new Holiday({ country, date, name, type: "public" });
    await newHoliday.save();

    res
      .status(201)
      .json({ message: "Holiday saved successfully", holiday: newHoliday });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

//Update Many
router.put("/updateMany", async (req, res) => {
  try {
    const { holidays } = req.body; // Array of holiday updates
    console.log(holidays);
    const bulkOps = holidays.map((holiday) => ({
      updateOne: {
        filter: { _id: holiday._id },
        update: {
          $set: { date: holiday.date, name: holiday.name, type: holiday.type },
        },
      },
    }));

    await Holiday.bulkWrite(bulkOps);
    res.json({ message: "Holidays updated successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/addAliases", async (req, res) => {
  try {
    await updateAliases();
    res.json({ message: "aliases updated!" });
  } catch (error) {
    res.status(500).json({ error: "Update failed." });
  }
});

router.post("/addYear", async (req, res) => {
  try {
    const  result = await Holiday.updateMany({}, {$set: {year: 2025}});
    console.log(`${result.modifiedCount} documents updated.`)
    res.json({ 
      message: "Year Added Successfully",
      updatedCount: result.modifiedCount 
    });
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ error: "Update failed." });
  }
})

module.exports = router;
