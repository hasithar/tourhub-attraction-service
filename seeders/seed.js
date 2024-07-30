const mongoose = require("mongoose");
require("dotenv").config();

const attractionTypeSeeder = require("./attractionType.seeder");
const attractionSeeder = require("./attraction.seeder");

// db connection
const dbName =
  process.env.NODE_ENV === "test"
    ? process.env.dbTesting
    : process.env.NODE_ENV === "production"
    ? process.env.dbProduction
    : process.env.dbDevelopment;

mongoose
  .connect(
    `mongodb+srv://${process.env.connectionString}/${dbName}?retryWrites=true&w=majority&appName=${process.env.appName}`
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
