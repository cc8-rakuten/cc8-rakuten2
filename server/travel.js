const express = require("express");
const unirest = require("unirest");
const axios = require("axios");
// require("dotenv").config();

const router = express.Router();

router.post("/travel", async (req, res) => {
  console.log(req.headers);
  res.json(req.headers["x-forwarded-for"]);
  const date = req.body.date;
  const destination = req.body.destination;
  const radius = "150";
  const lng = req.body.source.lng;
  const lat = req.body.source.lat;
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
        .map(({ code, city, name }) => ({ code, city, name }));
      // res.json(mainAirports);
    })
    .catch(() => res.status(400));
});

module.exports = router;
