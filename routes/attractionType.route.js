var express = require("express");
var router = express.Router();
const {
  getAllAttractionTypes,
  getAttractionType,
  createAttractionType,
  updateAttractionType,
  deleteAttractionType,
} = require("../controllers/attractionType.controller");

// get all items
router.get("/", getAllAttractionTypes);

// get single item
router.get("/:id", getAttractionType);

// create item
router.post("/", createAttractionType);

// update item
router.patch("/:id", updateAttractionType);

// delete item
router.delete("/:id", deleteAttractionType);

module.exports = router;
