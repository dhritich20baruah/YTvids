const axios = require("axios");
const cheerio = require("cheerio");
const Job = require("../models/JobSchema");

async function scrapeJobs(job) {
  try {
    const url = `https://www.assamcareer.com/2021/03/assam-agricultural-university.html`;
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const jobInfo = {};

    const postBody = $("#PostBody");

    const headingText = postBody.find("b").first().text().trim();
    const [title, lastDateLine] = headingText.split("Last Date:");
    jobInfo.title = title.trim();
    jobInfo.lastDate = lastDateLine?.trim();

    // Extract Total Posts
    const bodyText = postBody.text();
    const postsMatch = bodyText.match(
      /(\d+)\s+Agricultural Development Officer Posts/
    );
    jobInfo.totalPosts = postsMatch ? parseInt(postsMatch[1]) : null;

    // Extract Department Link
    jobInfo.departmentLink = postBody.find("a[href*='asrb.html']").attr("href");

    // Extract Vacancies by Category
    const vacancyMatch = {
      UR: /UR:\s*(\d+)/,
      OBC: /OBC\/ MOBC:\s*(\d+)/,
      SC: /SC:\s*(\d+)/,
      STP: /STP:\s*(\d+)/,
      STH: /STH:\s*(\d+)/,
    };
    jobInfo.vacancies = {};
    for (let [category, regex] of Object.entries(vacancyMatch)) {
      const match = bodyText.match(regex);
      jobInfo.vacancies[category] = match ? parseInt(match[1]) : 0;
    }

    // Extract Pay Scale
    const payMatch = bodyText.match(
      /Pay Band - 4,\s*Rs ([\d,]+)\/- to Rs\. ([\d,]+)\/-.*GP: Rs ([\d,]+)/
    );
    if (payMatch) {
      jobInfo.payScale = {
        from: payMatch[1],
        to: payMatch[2],
        gradePay: payMatch[3],
      };
    }

    // Extract Important Dates
    const startDateMatch = bodyText.match(
      /Starting date.*?:\s*(\d{1,2}\w{2} .*?\d{4})/i
    );
    const endDateMatch = bodyText.match(
      /Last date.*?:\s*(\d{1,2}\w{2} .*?\d{4})/i
    );
    jobInfo.dates = {
      start: startDateMatch ? startDateMatch[1] : null,
      end: endDateMatch ? endDateMatch[1] : null,
    };

    if (jobInfo.length === 0) {
      console.log("No jobs found. The page structure might have changed.");
      return;
    }

    // await Job.insertMany(jobInfo);
    console.log(jobInfo)
    console.log("Jobs saved to DB successfully! 🎉");
  } catch (error) {
    console.error("Error scraping jobs:", error.message);
  }
}

module.exports = scrapeJobs;
