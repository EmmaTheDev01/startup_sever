import express from 'express';
import {
  createScan,
  deleteScan,
  findScan,
  findAllScans,
  getFeaturedScans,
  getScanCounts
} from '../controllers/scanController.js'; // Adjust the path if necessary

const router = express.Router();

// Create a new scan
router.post("/", createScan);

// Delete a scan
router.delete("/:id", deleteScan);

// Find a specific scan
router.get("/:id", findScan);

// Find all scans with pagination
router.get("/", findAllScans);

// Get featured scans
router.get("/featured", getFeaturedScans);

// Get scan counts
router.get("/count", getScanCounts);

export default router;
