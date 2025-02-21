const axios = require("axios");
const cheerio = require("cheerio");
const Holiday = require("../models/HolidaySchema");

async function scrapeHolidays(country) {
  try {
    // const url = `https://en.wikipedia.org/wiki/Public_holidays_in_${country}`;
    const url = "http://127.0.0.1:5500/index.html"
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    let holidays = [];

    // $("table.wikitable tbody tr").each((index, element) => {
    //   const columns = $(element).find("td");

    //   if (columns.length < 2) return; // Skip rows with missing columns

    //   const date = $(columns[0]).text().trim();

    //   // const holidayName = $(columns[1]).text().trim()

    //   // Extract holiday name flexibly
    //   let holidayName = "";
      
    //   if (columns.length === 2) {
    //     holidayName = $(columns[1]).text().trim(); // Single Name (India)
    //   } else if (columns.length > 2) {
    //     holidayName =
    //       $(columns[1]).text().trim() +
    //       " (" +
    //       $(columns[2]).text().trim() +
    //       ")"; // Local + English Name (Iceland)
    //   }

    //   if (country && holidayName && date) {
    //     holidays.push({ country: country, date, name: holidayName, type: "public" });
    //   }
    // });

    // $("div.Holiday ul li").each((index, element) => {
    //   const text = $(element).text().trim();
      
    //   // Split date and holiday name
    //   const match = text.match(/^([\w\s\d–-]+):\s*(.+)$/);
    //   if (match) {
    //     holidays.push({
    //       country: country,
    //       date: match[1].trim(),
    //       name: match[2].trim(),
    //       type: "Public"
    //     });
    //   }
    // });

    $("#holidays-table tbody tr").each((index, element) => {
      const date = $(element).find("th.nw").text().trim();
      const name = $(element).find("td:nth-child(2) a").text().trim();
      let type = ""
      let details = $(element).find("td:nth-child(4)").text().trim();
      if (details){
        type = $(element).find("td:nth-child(3)").text().trim() + " ( " + details + " )";
      } else {
        type = $(element).find("td:nth-child(3)").text().trim()
      }

      if (date && name && type) {
        holidays.push({country: country, date, name, type });
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
