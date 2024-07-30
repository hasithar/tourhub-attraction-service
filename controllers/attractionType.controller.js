const AttractionType = require("../models/attractionType.model");

/* get all items
 *--------------------------------------------- */
const getAllAttractionTypes = async (req, res) => {
  try {
    const attractionTypes = await AttractionType.find({});
    res.status(200).json(attractionTypes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* get single item
 *--------------------------------------------- */
const getAttractionType = async (req, res) => {
  try {
    const { id } = req.params;
    const attractionType = await AttractionType.findById(id);
    if (!attractionType) {
      return res.status(404).json({ message: "Attraction Type not found." });
    }
    res.status(200).json(attractionType);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* create item
 *--------------------------------------------- */
const createAttractionType = async (req, res) => {
  try {
    const attractionType = await AttractionType.create(req.body);
    res.status(200).json(attractionType);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* update item
 *--------------------------------------------- */
const updateAttractionType = async (req, res) => {
  try {
    const { id } = req.params;
    const attractionType = await AttractionType.findByIdAndUpdate(id, req.body);
    if (!attractionType) {
      return res.status(404).json({ message: "Attraction Type not found." });
    }
    const updatedAttractionType = await AttractionType.findById(id);
    res.status(200).json(updatedAttractionType);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* delete item
 *--------------------------------------------- */
const deleteAttractionType = async (req, res) => {
  try {
    const { id } = req.params;
    const attractionType = await AttractionType.findByIdAndDelete(id);
    if (!attractionType) {
      return res.status(404).json({ message: "Attraction Type not found." });
    }
    res.status(200).json({ message: "Attraction Type deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllAttractionTypes,
  getAttractionType,
  createAttractionType,
  updateAttractionType,
  deleteAttractionType,
};
