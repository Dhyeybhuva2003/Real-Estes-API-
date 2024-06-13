const cloudinary = require("cloudinary").v2;
require("dotenv").config();

module.exports.connectCloudinary = () => {
    try {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });
        console.log("Cloudinary connected successfully");
    } catch (error) {
        console.error("Cloudinary connection error: ", error.message);
    }
};

module.exports.uploadImage = async (file, folder, height) => {
    try {
        const options = {
            folder,
            resource_type: "auto"
        };
        
        if (height) {
            options.height = height;
        }
        
        const result = await cloudinary.uploader.upload(file.tempFilePath, options);
        return result;
    } catch (error) {
        console.error("Image upload error: ", error.message);
        throw error;
    }
};
