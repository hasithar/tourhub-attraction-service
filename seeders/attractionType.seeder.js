const AttractionType = require("../models/attractionType.model");

// sample data
const accommodationTypes = [
  {
    name: "Historical",
    description: "Sites with significant historical importance.",
  },
  {
    name: "Natural",
    description: "Natural attractions such as parks, mountains, and lakes.",
  },
  {
    name: "Museum",
    description: "Museums showcasing art, history, or science exhibits.",
  },
  {
    name: "Amusement Park",
    description: "Parks with various rides and entertainment options.",
  },
  {
    name: "Cultural",
    description:
      "Places of cultural significance, including theaters and cultural centers.",
  },
];

// seed data
const seedAttractionTypes = async () => {
  // delete existing
  await AttractionType.deleteMany({});
  // insert new
  await AttractionType.insertMany(accommodationTypes);
};

module.exports = seedAttractionTypes;
