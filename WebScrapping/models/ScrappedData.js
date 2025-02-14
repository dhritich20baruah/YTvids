const mongoose = require('mongoose')

const ScrapedDataSchema = new mongoose.Schema({
    title: String,
    dateScraped: { type: Date, default: Date.now }
  });

module.exports = mongoose.model('ScrapedData', ScrapedDataSchema);