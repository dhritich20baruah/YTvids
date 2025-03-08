const axios = require("axios");
const cheerio = require("cheerio");
const Holiday = require("../models/HolidaySchema");

// Month Mapping Object
const monthMap = {
  जनवरी: "January",
  फरवरी: "February",
  मार्च: "March",
  अप्रैल: "April",
  मई: "May",
  जून: "June",
  जुलाई: "July",
  अगस्त: "August",
  सितंबर: "September",
  अक्टूबर: "October",
  नवंबर: "November",
  दिसंबर: "December",
};

async function scrapeHolidays(country) {
  try {
    // const url = `https://en.wikipedia.org/wiki/Public_holidays_in_${country}`;
    const url = "https://www.timeanddate.com/holidays/norfolk-island/2025";
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
      const rawDate = $(element).find("th.nw").text().trim(); // Extract Date
      const name = $(element).find("td:nth-child(3) a").text().trim(); // Extract Name
      const details = $(element).find("td:nth-child(5)").text().trim();
      let type = "";
      // Extract Type
      if (!details) {
        type = $(element).find("td:nth-child(4)").text().trim();
      } else {
        type =
          $(element).find("td:nth-child(4)").text().trim() +
          " ( " +
          details +
          " )";
      }
      if (!rawDate || !name) return; // Skip empty rows

      // Split date into parts (e.g., "1 Jan" → ["1", "Jan"])
      const dateParts = rawDate.split(" ");
      const day = dateParts[0]; // Extract day (e.g., "1")
      const monthShort = dateParts[1]; // Extract short month (e.g., "Jan")

      // Convert short month to full name
      const fullMonth = monthMap[monthShort] || monthShort; // Default to same if not found

      // Format Date as "January 1"
      const formattedDate = `${fullMonth} ${day}`;

      holidays.push({ country, date: formattedDate, name, type: type });
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
