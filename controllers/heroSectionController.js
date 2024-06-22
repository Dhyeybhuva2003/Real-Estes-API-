const HeroSection = require("../models/heroSectionModel");
const { uploadImage } = require("../config/cloudinary");

// Controller to create a new hero section item
exports.createHeroSectionItem = async (req, res) => {
  try {
    if (!req.files || !req.files.media) {
      return res.status(400).json({ message: "No media file uploaded" });
    }

    const uploadResult = await uploadImage(req.files.media);
    const mediaUrl = uploadResult.url; // Extract the URL from the upload result

    const heroSectionItem = new HeroSection({
      media: mediaUrl,
      title: req.body.title || "Staring",
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

    if (req.files && req.files.media) {
      const uploadResult = await uploadImage(req.files.media);
      updateData.media = uploadResult.url; // Extract the URL from the upload result
    }

    if (req.body.title) {
      updateData.title = req.body.title;
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
