const Attraction = require("./../models/attraction.model");
const AttractionType = require("./../models/attractionType.model");

// sample data
const attractions = async (attractionTypes) => [
  {
    name: "Sigiriya Rock Fortress",
    description: "A historical and archaeological site in Sri Lanka.",
    location: {
      address: "Sigiriya",
      city: "Dambulla",
      province: "Central",
      country: "Sri Lanka",
      coordinates: {
        type: "Point",
        coordinates: [80.74513, 7.95681],
      },
    },
    category: attractionTypes.find((type) => type.name === "Historical")._id,
    images: [
      "https://example.com/sigiriya1.jpg",
      "https://example.com/sigiriya2.jpg",
    ],
    contactDetails: {
      phone: "+94 123 456 789",
      email: "info@sigiriya.lk",
      website: "https://www.sigiriya.lk",
    },
  },
  {
    name: "Yala National Park",
    description: "A large wildlife park in Sri Lanka.",
    location: {
      address: "Yala",
      city: "Hambanthota",
      province: "South",
      country: "Sri Lanka",
      coordinates: {
        type: "Point",
        coordinates: [81.49927, 6.36144],
      },
    },
    category: attractionTypes.find((type) => type.name === "Natural")._id,
    images: ["https://example.com/yala1.jpg", "https://example.com/yala2.jpg"],
    contactDetails: {
      phone: "+94 987 654 321",
      email: "info@yala.lk",
      website: "https://www.yala.lk",
    },
  },
  {
    name: "National Museum of Colombo",
    description: "The largest museum in Sri Lanka.",
    location: {
      address: "Sir Marcus Fernando Mawatha, Colombo 00700",
      city: "Colombo",
      province: "Western",
      country: "Sri Lanka",
      coordinates: {
        type: "Point",
        coordinates: [79.86124, 6.92708],
      },
    },
    category: attractionTypes.find((type) => type.name === "Museum")._id,
    images: [
      "https://example.com/museum1.jpg",
      "https://example.com/museum2.jpg",
    ],
    contactDetails: {
      phone: "+94 112 345 678",
      email: "info@nationalmuseum.lk",
      website: "https://www.nationalmuseum.lk",
    },
  },
  {
    name: "Leisure World Water Park",
    description: "A popular amusement park in Sri Lanka.",
    location: {
      address: "Leisure World Water Park",
      city: "Hanwella",
      province: "Western",
      country: "Sri Lanka",
      coordinates: {
        type: "Point",
        coordinates: [80.04259, 6.90879],
      },
    },
    category: attractionTypes.find((type) => type.name === "Amusement Park")
      ._id,
    images: [
      "https://example.com/leisureworld1.jpg",
      "https://example.com/leisureworld2.jpg",
    ],
    contactDetails: {
      phone: "+94 112 345 987",
      email: "info@leisureworld.lk",
      website: "https://www.leisureworld.lk",
    },
  },
  {
    name: "Nelum Pokuna Mahinda Rajapaksa Theatre",
    description: "A performing arts centre in Colombo.",
    location: {
      address: "110 Ananda Coomaraswamy Mawatha, Colombo 00700",
      city: "Hanwella",
      province: "Western",
      country: "Sri Lanka",
      coordinates: {
        type: "Point",
        coordinates: [79.86407, 6.91474],
      },
    },
    category: attractionTypes.find((type) => type.name === "Cultural")._id,
    images: [
      "https://example.com/nelumpokuna1.jpg",
      "https://example.com/nelumpokuna2.jpg",
    ],
    contactDetails: {
      phone: "+94 112 788 899",
      email: "info@nelumpokuna.lk",
      website: "https://www.nelumpokuna.lk",
    },
  },
];

// seed data
const seedAttractions = async () => {
  // delete existing
  await Attraction.deleteMany({});

  // get attraction types
  const attractionTypes = await AttractionType.find();

  // build data with references
  const attractionWithReferences = await attractions(attractionTypes);

  // insert new
  await Attraction.insertMany(attractionWithReferences);
};

module.exports = seedAttractions;
