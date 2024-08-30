import mongoose from "mongoose";

const scanSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      trim: true,
      required: false, // Optional: only used if scanning a URL
    },
    ip: {
      type: String,
      trim: true,
      required: false, // Optional: only used if scanning an IP
    },
    scanStatus: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending',
    },
    lastScanDate: {
      type: Date,
    },
    scanResult: {
      type: Map,
      of: mongoose.Schema.Types.Mixed, // Allows for a flexible structure for scan results
    },
    isClean: {
      type: Boolean,
      default: true, // Indicates if the scan result is clean
    },
    featured: {
      type: Boolean,
      default: false, // Used to mark scans as featured
    },
  },
  { timestamps: true }
);

export default mongoose.model("Scan", scanSchema);
