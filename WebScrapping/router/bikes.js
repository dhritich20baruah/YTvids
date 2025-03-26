const express = require("express");
const router = express.Router();
const Bikes = require("../models/BikeModel");
const bikeScrapper = require("../scrapper/BikeScrapper");

router.get("/", async (req, res) => {
    res.send("Bike Scrapper is running");
})

module.exports = router;