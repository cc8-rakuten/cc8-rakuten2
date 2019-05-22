const express = require("express");
const unirest = require("unirest");
const axios = require("axios");
// require("dotenv").config();

const router = express.Router();

router.post("/travel", async (req, res) => {
<<<<<<< HEAD
  const date = req.body.date;
  const destination = req.body.destination;
  const radius = "150";
  const lng = "139.727880";
  const lat = "35.658187";
  const response = await axios({
    method: "GET",
    url: `https://cometari-airportsfinder-v1.p.rapidapi.com/api/airports/by-radius?radius=${radius}&lng=${lng}&lat=${lat}`,
    headers: {
      "X-RapidAPI-Host": "cometari-airportsfinder-v1.p.rapidapi.com",
      "X-RapidAPI-Key": process.env.AIRPORT_API_KEY
    }
  })
    .then((result) => {
      const allAirports = result.data;
      const mainAirports = allAirports
        .filter((airport) => airport.themes.length > 0)
=======
  console.log("here")
  let allAirports;
  unirest.get("https://cometari-airportsfinder-v1.p.rapidapi.com/api/airports/by-radius?radius=150&lng=139.727880&lat=35.658187")
    .header("X-RapidAPI-Host", "cometari-airportsfinder-v1.p.rapidapi.com")
    .header("X-RapidAPI-Key", process.env.AIRPORT_API_KEY)
    .end(result => {
      const allAirports = result.body;
      const mainAirports = allAirports
        .filter(airport => airport.themes.length > 0)
>>>>>>> 72ccacf5285f601e36f4e0b6403bf7081a645817
        .map(({ code, city, name }) => ({ code, city, name }));
      res.json(mainAirports);
    })
    .catch(() => res.status(400));
});

module.exports = router;
