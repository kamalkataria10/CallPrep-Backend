const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;
const connectToMongo = require("./config/db.js");
connectToMongo();
app.use(bodyParser.json());

const calculatePercentage = require("./utils/percentage.js");
const calculateOverallPercentage = require("./utils/overallPercentage.js");
console.log(calculateOverallPercentage);
console.log(calculatePercentage);

app.use("", require("./routes/studentRoutes.js"));
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
