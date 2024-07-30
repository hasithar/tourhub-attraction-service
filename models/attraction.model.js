const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// define location schema
const locationSchema = new Schema(
  {
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    province: {
      type: String,
      required: false,
    },
    postalCode: {
      type: String,
      required: false,
    },
    country: {
      type: String,
      required: true,
    },
    coordinates: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
  },
  { _id: false }
);

// define contact details schema
const contactDetailsSchema = new Schema(
  {
    phone: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
    },
    website: {
      type: String,
      required: false,
    },
  },
  { _id: false }
);

// define contacts schema
const contactSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: false },
    phone: { type: String, required: false },
    role: { type: String, required: true },
    remarks: { type: String },
  },
  { _id: false }
);

// define attraction schema
const attractionSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "AttractionType",
      required: true,
    },
    description: {
      type: String,
    },
    images: [String],
    location: locationSchema,
    contactDetails: contactDetailsSchema,
    contacts: [contactSchema],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// create 2dsphere index on the location.coordinates for geospatial queries
attractionSchema.index({ "location.coordinates": "2dsphere" });

// create attraction model
const Attraction = mongoose.model("Attraction", attractionSchema);

module.exports = Attraction;
