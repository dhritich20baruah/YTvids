const Holiday = require("../models/HolidaySchema");

const countryAliases = {
 "USA": ["America", "United_States", "US", "United_States_Of_America"],
};

// Function to update all documents
const updateAliases = async () => {
    try {
        const holidays = await Holiday.find(); // Get all records

        for (let holiday of holidays) {
            const country = holiday.country;

            // Check if the country has aliases
            if (countryAliases[country]) {
                await Holiday.updateOne(
                    { _id: holiday._id },
                    { $set: { aliases: countryAliases[country] } }
                );
                console.log(`Updated: ${country}`);
            }
        }

        console.log("✅ All aliases updated successfully!");
    } catch (error) {
        console.error("Error updating aliases:", error);
    }
};

// Run the update function
module.exports = updateAliases


// "USA": ["America", "United_States", "US"],
// "United_Kingdom": ["UK", "Great_Britain", "Britain"],
// "Germany": ["Deutschland"],
// "Russia": ["Russian_Federation"],
// "South Korea": ["Republic_Of_Korea", "Korea"],
// "United_Arab_Emirates": ["UAE"],
// "China": ["People's_Republic_Of_China"],