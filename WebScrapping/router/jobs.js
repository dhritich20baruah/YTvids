const express = require("express");
const router = express.Router();
const Job = require("../models/JobSchema");
const scrapeJobs = require("../scrapper/jobScrapper");

router.get("/scrape/:job", async (req, res) => {
  const job = req.params.job;
  try {
    await scrapeJobs(job);
    res.json({ message: "Scrapping complete!" });
  } catch (error) {
    res.status(500).json({ error: "Scrapping failed" });
  }
});

router.get("/fetchAll", async (req, res) => {
    const allJobs = await Job.find();
    res.json(allJobs);
})

module.exports = router;
