import Scan from "../models/Scan.js";
import axios from "axios";

const VIRUSTOTAL_API_KEY = process.env.VIRUSTOTAL_API_KEY;

// Function to scan a URL with VirusTotal
const scanUrlWithVirusTotal = async (url) => {
  try {
    // First, encode the URL to base64
    const encodedUrl = Buffer.from(url).toString("base64");

    // Submit URL for scanning
    const response = await axios.post(
      `https://www.virustotal.com/api/v3/urls`,
      `url=${url}`,
      {
        headers: {
          "x-apikey": VIRUSTOTAL_API_KEY,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    // Retrieve scan results using the scan_id
    const scanId = response.data.data.id;
    const result = await axios.get(
      `https://www.virustotal.com/api/v3/analyses/${scanId}`,
      {
        headers: {
          "x-apikey": VIRUSTOTAL_API_KEY,
        },
      }
    );

    return result.data;
  } catch (error) {
    console.error("Error with VirusTotal URL scan:", error);
    throw new Error("VirusTotal URL scan failed");
  }
};

// Function to scan an IP with VirusTotal
const scanIpWithVirusTotal = async (ip) => {
  try {
    // Get IP address scan result
    const response = await axios.get(
      `https://www.virustotal.com/api/v3/ip_addresses/${ip}`,
      {
        headers: {
          "x-apikey": VIRUSTOTAL_API_KEY,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error with VirusTotal IP scan:", error);
    throw new Error("VirusTotal IP scan failed");
  }
};

// Create a new scan with URL or IP integration
export const createScan = async (req, res) => {
  const { url, ip } = req.body;

  if (!url && !ip) {
    return res.status(400).json({
      success: false,
      message: "URL or IP is required",
    });
  }

  try {
    let scanResult;

    if (url) {
      scanResult = await scanUrlWithVirusTotal(url);
    } else if (ip) {
      scanResult = await scanIpWithVirusTotal(ip);
    }

    // Check if scan results indicate a clean status
    const isClean =
      scanResult.data.attributes.last_analysis_stats.malicious === 0;

    if (isClean) {
      const newScan = new Scan(req.body);
      const savedScan = await newScan.save();
      res.status(200).json({
        success: true,
        message: "Scan saved successfully",
        data: savedScan,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Malicious content detected. Scan not saved.",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Scan not saved, try again",
    });
  }
};

// Delete a scan
export const deleteScan = async (req, res) => {
  const id = req.params.id;
  try {
    await Scan.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Scan deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to delete scan",
    });
  }
};

// Find a specific scan
export const findScan = async (req, res) => {
  const id = req.params.id;
  try {
    const findSingleScan = await Scan.findById(id);
    res.status(200).json({
      success: true,
      message: "Scan details found",
      data: findSingleScan,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Cannot find the scan",
    });
  }
};

// Find all scans with pagination
export const findAllScans = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  try {
    const allScans = await Scan.find({})
      .skip(page * 8)
      .limit(8);
    const count = await Scan.countDocuments({});
    res.status(200).json({
      success: true,
      count,
      message: "All scans available",
      data: allScans,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "No scans available",
    });
  }
};

// Get featured scans
export const getFeaturedScans = async (req, res) => {
  try {
    const featuredScans = await Scan.find({ featured: true }).limit(8);
    if (featuredScans.length > 0) {
      res.status(200).json({
        success: true,
        message: "Featured scans",
        data: featuredScans,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No scans available",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "An error occurred",
    });
  }
};

// Get scan counts
export const getScanCounts = async (req, res) => {
  try {
    const scanCount = await Scan.estimatedDocumentCount();
    res.status(200).json({
      success: true,
      message: "Scan count retrieved",
      data: scanCount,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Failed to retrieve scan count",
    });
  }
};
