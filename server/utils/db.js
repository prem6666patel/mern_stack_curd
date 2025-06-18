const mongoose = require("mongoose");

//const URL = "mongodb://127.0.0.1:27017/mern_admin";

//mongoose.connect();

//URL = "mongodb+srv://prempatel24122005:prem24122005patel@sampledatabase.apfrn4a.mongodb.net/mern_admin?retryWrites=true&w=majority&appName=sampleDatabase"

const connectDB = async () => {
  try {
    URL = process.env.URL;
    console.log("connecting to : ", URL);
    await mongoose.connect(URL);
    console.log("connection successfully");
  } catch (error) {
    console.error("database connection failed");
    process.exit(0);
  }
};

module.exports = connectDB;
