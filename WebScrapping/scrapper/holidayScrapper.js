const axios = require("axios");
const cheerio = require("cheerio");
const Holiday = require("../models/HolidaySchema");

async function scrapeHolidays(country) {
  try {
    const url = `https://en.wikipedia.org/wiki/Public_holidays_in_${country}`;
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    let holidays = [];

    $("table.wikitable tbody tr").each((index, element) => {
      const columns = $(element).find("td");

      if (columns.length < 3) return; // Skip rows with missing columns

      const date = $(columns[0]).text().trim();
      // Extract holiday name flexibly
      let holidayName = "";
      if (columns.length === 3) {
        holidayName = $(columns[1]).text().trim(); // Single Name (India)
      } else if (columns.length > 3) {
        holidayName =
          $(columns[1]).text().trim() +
          " (" +
          $(columns[2]).text().trim() +
          ")"; // Local + English Name (Iceland)
      }

      if (country && holidayName && date) {
        holidays.push({ country: country, date, name: holidayName, type: "public" });
      }
    });

    if (holidays.length === 0) {
      console.log("No holidays found. The page structure might have changed.");
      return;
    }

    // Save data to MongoDB
    await Holiday.insertMany(holidays);
    console.log("Holidays saved to DB successfully! 🎉");
  } catch (error) {
    console.error("Error scraping holidays:", error.message);
  }
}

module.exports = scrapeHolidays;
