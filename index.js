const express = require("express");
const app = express();
const expressip = require("express-ip");
require("dotenv").config();

//app.use(express.static("public"));
app.use(expressip().getIpInfoMiddleware);

app.get("/", (req, res) => {
  res.send(req.ipInfo.city);
});
app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`)
);
