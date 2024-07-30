const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// define attraction type schema
const attractionTypeSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    description: String,
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

attractionTypeSchema.index({ name: 1 }, { unique: true });

const AttractionType = mongoose.model("AttractionType", attractionTypeSchema);

module.exports = AttractionType;
