const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

// Load .env file from the project root
dotenv.config({ path: path.join(__dirname, "./../../../.env") });

// Load .env file from service root
// dotenv.config();

const attractionTypeSeeder = require("./attractionType.seeder");
const attractionSeeder = require("./attraction.seeder");

// db connection
const dbName =
  process.env.NODE_ENV === "test"
    ? process.env.DB_TESTING
    : process.env.NODE_ENV === "production"
    ? process.env.DB_PRODUCTION
    : process.env.DB_DEVELOPMENT;

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_CONNECTION_STRING}/${dbName}?retryWrites=true&w=majority&appName=${process.env.DB_APP_NAME}`
  )
  .then(() => {
    console.log("Connected to the databse");
    runSeeders();
  })
  .catch(() => console.log("Error connecting to the database"));

// run seeders
const runSeeders = async () => {
  try {
    // run attraction type seeder
    await attractionTypeSeeder();
    console.log("Attraction types seeded successfully");

    // run attractions seeder
    await attractionSeeder();
    console.log("Attractions seeded successfully");

    // close db connection
    mongoose.connection.close();
    console.log("DB seeding completed and connection closed");
  } catch (error) {
    console.error("Error during seeding:", error);
    mongoose.connection.close();
  }
};
