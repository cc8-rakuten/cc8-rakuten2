const express = require("express");
const app = express();
//const expressip = require("express-ip");
require("dotenv").config();

// console.log(process.env)

const travel = require("./travel");

const port = process.env.PORT || 3000;

app.use(express.static("dist"));
//app.use(expressip().getIpInfoMiddleware);

app.use("/api", express.json(), express.urlencoded({ extended: true }), travel);
app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`)
);
