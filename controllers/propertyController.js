const Property = require("../models/propertyModel");
const { uploadImage, uploadPDF } = require("../config/cloudinary");
require("dotenv").config();

// Create a new property
exports.createProperty = async (req, res) => {
  try {
    if (!req.files || !req.files.images || !req.files.brochure) {
      return res.status(400).json({ message: "Images and brochure file are required" });
    }

    // Upload multiple images
    const imageUploads = req.files.images.map(file => uploadImage(file, process.env.FOLDER_IMAGES));
    const uploadedImages = await Promise.all(imageUploads);

    // Upload brochure PDF
    const uploadedBrochure = await uploadPDF(req.files.brochure, process.env.FOLDER_BROCHURES);

    const propertyData = {
      images: uploadedImages.map(img => img.secure_url),
      name: req.body.name,
      location: req.body.location,
      startingPrice: req.body.startingPrice,
      propertyType: req.body.propertyType,
      bhk: req.body.bhk,
      sqft: req.body.sqft,
      description: req.body.description,
      brochure: uploadedBrochure.secure_url,
      address: req.body.address,
      cityArea: req.body.cityArea,
      price: req.body.price,
      propertySize: req.body.propertySize,
      segment: req.body.segment,
      categoryType: req.body.categoryType,
      passionStatus: req.body.passionStatus,
      searchBudget: req.body.searchBudget,
      features: req.body.features ? req.body.features.split(',') : [],
    };

    const newProperty = new Property(propertyData);
    await newProperty.save();

    res.status(201).json(newProperty);
  } catch (err) {
    res.status(400).json({ message: "Error creating property: " + err.message });
  }
};

// Get all properties
exports.getProperties = async (req, res) => {
  try {
    const properties = await Property.find();
    res.status(200).json(properties);
  } catch (err) {
    res.status(500).json({ message: "Error fetching properties: " + err.message });
  }
};

// Get a single property by ID
exports.getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.status(200).json(property);
  } catch (err) {
    res.status(500).json({ message: "Error fetching property: " + err.message });
  }
};

// Update a property by ID
exports.updateProperty = async (req, res) => {
  try {
    let updateData = {};

    // Handle image updates
    if (req.files && req.files.images) {
      const imageUploads = req.files.images.map(file => uploadImage(file, process.env.FOLDER_IMAGES));
      const uploadedImages = await Promise.all(imageUploads);
      updateData.images = uploadedImages.map(img => img.secure_url);
    }

    // Handle brochure update
    if (req.files && req.files.brochure) {
      const uploadedBrochure = await uploadPDF(req.files.brochure, process.env.FOLDER_BROCHURES);
      updateData.brochure = uploadedBrochure.secure_url;
    }

    // Handle other fields
    const fields = [
      "name", "location", "startingPrice", "propertyType", "bhk", "sqft",
      "description", "address", "cityArea", "price", "propertySize",
      "segment", "categoryType", "passionStatus", "searchBudget"
    ];

    fields.forEach(field => {
      if (req.body[field]) {
        updateData[field] = req.body[field];
      }
    });

    if (req.body.features) {
      updateData.features = req.body.features.split(',');
    }

    const property = await Property.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.status(200).json(property);
  } catch (err) {
    res.status(400).json({ message: "Error updating property: " + err.message });
  }
};

// Delete a property by ID
exports.deleteProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.status(200).json({ message: "Property deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting property: " + err.message });
  }
};

// Search properties


exports.searchProperties = async (req, res) => {
  try {
    const body = {};

    Object.keys(req.body).forEach(key => {
      if (req.body[key]) {
        switch (key) {
          case 'sqft':
            // Convert to number for the sqft field
            body[key] = Number(req.body[key]);
            break;
          case 'features':
            // Search within array fields
            body[key] = { $in: req.body[key].split(',').map(feature => new RegExp(feature, 'i')) };
            break;
          default:
            // Case-insensitive search for string fields
            body[key] = new RegExp(req.body[key], 'i');
        }
      }
    });

    const properties = await Property.find(body);
    res.status(200).json(properties);
  } catch (err) {
    res.status(500).json({ message: "Error searching properties: " + err.message });
  }
};
