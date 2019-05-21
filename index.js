const express = require("express");
const app = express();
require("dotenv").config();

//app.use(express.static("public"));

app.get("/", (req, res) => res.send("Yeet"));
app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`)
);
