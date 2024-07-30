const Attraction = require("../models/attraction.model");

/* get all items
 *--------------------------------------------- */
const getAllAttractions = async (req, res) => {
  try {
    const attractions = await Attraction.find({});
    res.status(200).json(attractions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* get single item
 *--------------------------------------------- */
const getAttraction = async (req, res) => {
  try {
    const { id } = req.params;
    const attraction = await Attraction.findById(id);
    if (!attraction) {
      return res.status(404).json({ message: "Attraction not found." });
    }
    res.status(200).json(attraction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* create item
 *--------------------------------------------- */
const createAttraction = async (req, res) => {
  try {
    const attraction = await Attraction.create(req.body);
    res.status(200).json(attraction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* update item
 *--------------------------------------------- */
const updateAttraction = async (req, res) => {
  try {
    const { id } = req.params;
    const attraction = await Attraction.findByIdAndUpdate(id, req.body);
    if (!attraction) {
      return res.status(404).json({ message: "Attraction not found." });
    }
    const updatedAttraction = await Attraction.findById(id);
    res.status(200).json(updatedAttraction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* delete item
 *--------------------------------------------- */
const deleteAttraction = async (req, res) => {
  try {
    const { id } = req.params;
    const attraction = await Attraction.findByIdAndDelete(id);
    if (!attraction) {
      return res.status(404).json({ message: "Attraction not found." });
    }
    res.status(200).json({ message: "Attraction deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllAttractions,
  getAttraction,
  createAttraction,
  updateAttraction,
  deleteAttraction,
};
