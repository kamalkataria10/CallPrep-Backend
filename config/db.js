const mongoose = require("mongoose");
const mongoURI = "mongodb://localhost:27017/myDatabase";

const connectToMongoDB = () => {
  mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Connected to MongoDB");
};

module.exports = connectToMongoDB;
