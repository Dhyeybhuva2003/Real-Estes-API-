const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const { connectCloudinary } = require("./config/cloudinary");

// import routes
const contactRoutes = require("./routes/contactRoutes");
const galleryRoutes = require("./routes/galleryRoutes");
const PropertyforRoutes = require("./routes/PropertyforRoutes");
const ProjectTypeRoutes = require("./routes/ProjectTypeRoutes");
const AreaTypeRoutes = require("./routes/AreaTypeRoutes");
const BedroomsRoutes = require("./routes/BedroomsRoutes");
const PossessionStatusRoutes = require("./routes/PossessionStatusRoutes");
const CategoryTypeRoutes = require("./routes/CategoryTypeRoutes");
const BudgetRoutes = require("./routes/BudgetRoutes");
const OtherFeaturesRoutes = require("./routes/OtherFeaturesRoutes");
const AreasqRoutes = require("./routes/AreasqRoutes");
const propertyRoutes = require("./routes/propertyRoutes");
const heroSectionRoute = require("./routes/heroSectionRoutes")

// Connect to Cloudinary
connectCloudinary();

// Load environment variables from .env file
dotenv.config();

// Connect to the database
connectDB();

// Create an instance of express
const app = express();

// Middleware to enable CORS
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to handle file uploads
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// Use routes
app.use("/contacts", contactRoutes);
app.use("/gallery", galleryRoutes);
app.use("/Propertyfor", PropertyforRoutes);
app.use("/ProjectType", ProjectTypeRoutes);
app.use("/AreaTypeRoutes", AreaTypeRoutes);
app.use("/Bedrooms", BedroomsRoutes);
app.use("/PossessionStatus", PossessionStatusRoutes);
app.use("/CategoryType", CategoryTypeRoutes);
app.use("/Budget", BudgetRoutes);
app.use("/OtherFeatures", OtherFeaturesRoutes);
app.use("/Areasq", AreasqRoutes);
app.use("/property", propertyRoutes);
app.use("/heroSection",heroSectionRoute)

// Set the server port
const PORT = process.env.PORT || 9001;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
