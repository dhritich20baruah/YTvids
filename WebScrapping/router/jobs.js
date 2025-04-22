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

router.post("/addJob", async (req, res) => {
  try {
    const { title, lastDate, postNum, description, category, advLink, applyLink } = req.body;

    // Validate required fields
    if (!title || !lastDate || !postNum || !description || !category || !advLink || !applyLink) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newJob = new Job({
      title,
      lastDate,
      Post: postNum,
      description,
      category,
      advLink,
      applyLink
    });

    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (error) {
    console.error("Error saving job:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
