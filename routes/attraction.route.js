var express = require("express");
var router = express.Router();
const {
  getAllAttractions,
  getAttraction,
  createAttraction,
  updateAttraction,
  deleteAttraction,
} = require("../controllers/attraction.controller");

// get all items
router.get("/", getAllAttractions);

// get single item
router.get("/:id", getAttraction);

// create item
router.post("/", createAttraction);

// update item
router.patch("/:id", updateAttraction);

// delete item
router.delete("/:id", deleteAttraction);

module.exports = router;
