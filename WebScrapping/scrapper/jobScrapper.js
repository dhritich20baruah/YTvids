const axios = require("axios");
const cheerio = require("cheerio");
const Job = require("../models/JobSchema");

async function scrapeJobs(job){
    try {
        const url = ""
        const {data} = await axios.get(url);
        const $ = cheerio.load(data);

        let jobs = [];

        $("").each((index, element) => {
            
        })

        if (jobs.length === 0){
            console.log("No jobs found. The page structure might have changed.");
            return;
        }

        await Job.insertMany(jobs);
        console.log("Jobs saved to DB successfully! 🎉")
    } catch (error) {
       console.error("Error scraping jobs:", error.message); 
    }
}

module.exports = scrapeJobs;