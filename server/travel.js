const express = require("express");
const unirest = require("unirest");
// require("dotenv").config();

const router = express.Router();

router.post("/travel", async (req, res) => {
  console.log("here")
  let allAirports;
  unirest.get("https://cometari-airportsfinder-v1.p.rapidapi.com/api/airports/by-radius?radius=150&lng=139.727880&lat=35.658187")
    .header("X-RapidAPI-Host", "cometari-airportsfinder-v1.p.rapidapi.com")
    .header("X-RapidAPI-Key", process.env.AIRPORT_API_KEY)
    .end(result => {
      const allAirports = result.body;
      const mainAirports = allAirports
        .filter(airport => airport.themes.length > 0)
        .map(({ code, city, name }) => ({ code, city, name }));
      res.json(mainAirports);
    });

});

module.exports = router;