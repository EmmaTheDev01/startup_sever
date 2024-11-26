import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.js";
import scanRoute from './routes/scans.js'; // This can still be used for general scan routes if required
import messageRoute from "./routes/messages.js";
import scanMetadataRoute from './routes/scanMetadata.js'; // Import new routes for metadata scan
import scanSteganographyRoute from './routes/scanSteganography.js'; // Import new routes for steganography scan
import scanIpRoute from './routes/scanIp.js'; // Import new routes for IP scan
import scanPortRoute from './routes/scanPort.js'; // Import new routes for port scan
import scanVulnerabilityRoute from './routes/scanVulnerability.js'; // Import new routes for vulnerability scan
import scanMalwareRoute from './routes/scanMalware.js'; // Import new routes for malware scan

const app = express();
const port = process.env.PORT || 8000;

const corsOptions = {
  origin: true,
  Credentials: true,
};

// Database connection
mongoose.set("strictQuery", false);
const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB database connected");
  } catch (err) {
    console.log("MongoDB database connection failed");
  }
};

// Middlewares
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

// Routes
app.use("/api/v1/auth", authRoute);
app.use('/api/v1/scan', scanRoute); // Existing scan route (can be used for general scanning)
app.use("/api/v1/chatbot", messageRoute);

// New scan routes
app.use("/api/v1/scan/metadata", scanMetadataRoute); // Route for metadata scanning
app.use("/api/v1/scan/steganography", scanSteganographyRoute); // Route for steganography scanning
app.use("/api/v1/scan/ip", scanIpRoute); // Route for IP scanning
app.use("/api/v1/scan/port", scanPortRoute); // Route for port scanning
app.use("/api/v1/scan/vulnerability", scanVulnerabilityRoute); // Route for vulnerability scanning
app.use("/api/v1/scan/malware", scanMalwareRoute); // Route for malware scanning

// Start the server
app.listen(port, () => {
  connection();
  console.log("Server Listening to port ", port);
});
