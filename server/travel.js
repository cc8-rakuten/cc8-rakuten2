const express = require("express");
const unirest = require("unirest");
const axios = require("axios");
// require("dotenv").config();
const moment = require("moment");

Date.prototype.addDays = function(days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

const router = express.Router();

router.post("/travel", async (req, res) => {
  let sourceIP = req.headers["x-forwarded-for"];
  console.log("entering");
  const radius = "150";
  let fromCity, toCity, pictureURL;
  toCity = req.body.destination.name + ", " + req.body.destination.country;
  const imgSearch = req.body.destination.name;
  console.log(imgSearch);
  if (sourceIP.indexOf("127.") > -1) {
    sourceIP = "121.1.253.218";
  }

  const initialRequests = [
    axios({
      method: "GET",
      url: `https://moocher-io-ip-geolocation-v1.p.rapidapi.com/${sourceIP}`,
      headers: {
        "X-RapidAPI-Host": "moocher-io-ip-geolocation-v1.p.rapidapi.com",
        "X-RapidAPI-Key": process.env.AIRPORT_API_KEY
      }
    }),
    axios({
      method: "GET",
      url: `https://api.unsplash.com/search/photos?query=${imgSearch}&client_id=${process.env.UNSPLASH_API_KEY}`,
      // method: "GET",
      // url: `https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI?autoCorrect=false&pageNumber=1&pageSize=10&q=${imgSearch}&safeSearch=true`,
      // headers: {
      //   "X-RapidAPI-Host": "contextualwebsearch-websearch-v1.p.rapidapi.com",
      //   "X-RapidAPI-Key": process.env.AIRPORT_API_KEY
      // }
    })
  ];

  await Promise.all(initialRequests)
    .then(results => {
      console.log("entering processing of geoloc");
      let imgResult = results[1];
      let randImage = Math.floor(Math.random() * 10)
      console.log(randImage, imgResult.data.results.length);
      pictureURL = imgResult.data.results[randImage].urls.regular;
      console.log(pictureURL);
      let result = results[0];
      const fromLng = result.data.ip.longitude;
      const fromLat = result.data.ip.latitude;
      // console.log(result.data);
      fromCity = result.data.ip.city + ", " + result.data.ip.region;
      const fromAirport = axios({
        method: "GET",
        url: `https://cometari-airportsfinder-v1.p.rapidapi.com/api/airports/by-radius?radius=${radius}&lng=${fromLng}&lat=${fromLat}`,
        headers: {
          "X-RapidAPI-Host": "cometari-airportsfinder-v1.p.rapidapi.com",
          "X-RapidAPI-Key": process.env.AIRPORT_API_KEY
        }
      });
      const toLng = req.body.destination.longitude;
      const toLat = req.body.destination.latitude;
      const toAirport = axios({
        method: "GET",
        url: `https://cometari-airportsfinder-v1.p.rapidapi.com/api/airports/by-radius?radius=${radius}&lng=${toLng}&lat=${toLat}`,
        headers: {
          "X-RapidAPI-Host": "cometari-airportsfinder-v1.p.rapidapi.com",
          "X-RapidAPI-Key": process.env.AIRPORT_API_KEY
        }
      });
      return Promise.all([fromAirport, toAirport]);
    })
    .then(result => {
      const fromToAirports = result.map(airports => {
        const allAirports = airports.data;
        return allAirports
          .filter(airport => airport.themes.length > 0)
          .map(airport => airport.code)[0];
      });
      const response = {
        from: fromCity,
        to: toCity,
        fromAirport: fromToAirports[0],
        toAirport: fromToAirports[1],
        pictureURL
      };
      res.json(response);
    })
    .catch(err => {
      console.log(err);
      res.status(400);
    });
});

router.post("/flights", async (req, res) => {
  const fromAirport = req.body.fromAirport;
  const toAirport = req.body.toAirport;
  const goingDate = req.body.date;
  const returnDate = moment(new Date(goingDate).addDays(7)).format(
    "YYYY-MM-DD"
  );

  const goingFlight = axios({
    method: "GET",
    url: `https://apidojo-kayak-v1.p.rapidapi.com/flights/create-session?origin1=${fromAirport}&destination1=${toAirport}&departdate1=${goingDate}&cabin=e&currency=USD&adults=1&bags=0`,
    headers: {
      "X-RapidAPI-Host": "apidojo-kayak-v1.p.rapidapi.com",
      "X-RapidAPI-Key": process.env.AIRPORT_API_KEY
    }
  });
  const returnFlight = axios({
    method: "GET",
    url: `https://apidojo-kayak-v1.p.rapidapi.com/flights/create-session?origin1=${toAirport}&destination1=${fromAirport}&departdate1=${returnDate}&cabin=e&currency=USD&adults=1&bags=0`,
    headers: {
      "X-RapidAPI-Host": "apidojo-kayak-v1.p.rapidapi.com",
      "X-RapidAPI-Key": process.env.AIRPORT_API_KEY
    }
  });

  Promise.all([goingFlight, returnFlight])

    .then(flights => {
      console.log("entering processing of flight search sessions");
      return Promise.all(
        flights.map(flight => {
          return axios({
            method: "GET",
            url: `https://apidojo-kayak-v1.p.rapidapi.com/flights/poll?searchid=${
              flight.data.searchid
            }&currency=USD&bags=0`,
            headers: {
              "X-RapidAPI-Host": "apidojo-kayak-v1.p.rapidapi.com",
              "X-RapidAPI-Key": process.env.AIRPORT_API_KEY
            }
          });
        })
      );
    })
    .then(flights => {
      const resultFlights = flights.map(flight => {
        return flight.data.tripset.reduce(
          (a, b) => {
            if (a.lowTotal < b.lowTotal) {
              return a;
            } else {
              return b;
            }
          },
          { lowTotal: 9999999 }
        );
      });
      const price = resultFlights[0].lowTotal + resultFlights[1].lowTotal;
      res.json({
        price
      });
    })
    .catch(err => {
      console.log(err);
      res.status(400);
    });
});

module.exports = router;
