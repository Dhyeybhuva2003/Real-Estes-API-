const express = require("express");
const router = express.Router();
const heroSectionController = require("../controllers/heroSectionController");

// Route to create a new hero section item
router.post("/", heroSectionController.createHeroSectionItem);

// Route to get all hero section items
router.get("/", heroSectionController.getHeroSectionItems);

// Route to get a single hero section item by its ID
router.get("/:id", heroSectionController.getHeroSectionItemById);

// Route to update a hero section item by its ID
router.put("/:id", heroSectionController.updateHeroSectionItem);

// Route to delete a hero section item by its ID
router.delete("/:id", heroSectionController.deleteHeroSectionItem);

module.exports = router;
