const HeroSection = require("../models/heroSectionModel");
const { uploadMedia } = require("../config/cloudinary");

// Controller to create a new hero section item
exports.createHeroSectionItem = async (req, res) => {
  try {
    // Check if the media file is present
    if (!req.files || !req.files.media) {
      return res.status(400).json({ message: "No media file uploaded" });
    }

    const mediaUrl = await uploadMedia(req.files.media);

    // Create the hero section item
    const heroSectionItem = new HeroSection({
      media: mediaUrl,
      title: req.body.title || "Staring", // Default to "Staring" if title is not provided
    });

    await heroSectionItem.save();

    res.status(201).json(heroSectionItem);
  } catch (err) {
    res.status(400).json({ message: "Error creating hero section item: " + err.message });
  }
};

// Controller to get all hero section items
exports.getHeroSectionItems = async (req, res) => {
  try {
    const heroSectionItems = await HeroSection.find();
    res.status(200).json(heroSectionItems);
  } catch (err) {
    res.status(500).json({ message: "Error fetching hero section items: " + err.message });
  }
};

// Controller to get a single hero section item by its ID
exports.getHeroSectionItemById = async (req, res) => {
  try {
    const heroSectionItem = await HeroSection.findById(req.params.id);
    if (!heroSectionItem) {
      return res.status(404).json({ message: "Hero section item not found" });
    }
    res.status(200).json(heroSectionItem);
  } catch (err) {
    res.status(500).json({ message: "Error fetching hero section item: " + err.message });
  }
};

// Controller to update a hero section item by its ID
exports.updateHeroSectionItem = async (req, res) => {
  try {
    let updateData = {};

    // Check if an image file is present and upload it to Cloudinary
    if (req.files && req.files.media) {
      const mediaUrl = await uploadMedia(req.files.media);
      updateData.media = mediaUrl;
    }

    // Check if the title field is present
    if (req.body.title) {
      updateData.title = req.body.title;
    } else {
      return res.status(400).json({ message: "Title is required" });
    }

    const heroSectionItem = await HeroSection.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    if (!heroSectionItem) {
      return res.status(404).json({ message: "Hero section item not found" });
    }

    res.status(200).json(heroSectionItem);
  } catch (err) {
    res.status(400).json({ message: "Error updating hero section item: " + err.message });
  }
};

// Controller to delete a hero section item by its ID
exports.deleteHeroSectionItem = async (req, res) => {
  try {
    const heroSectionItem = await HeroSection.findByIdAndDelete(req.params.id);
    if (!heroSectionItem) {
      return res.status(404).json({ message: "Hero section item not found" });
    }
    res.status(200).json({ message: "Hero section item deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting hero section item: " + err.message });
  }
};
