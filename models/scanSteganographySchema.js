import mongoose from 'mongoose';

const scanSteganographySchema = new mongoose.Schema(
  {
    filePath: {
      type: String,
      required: true,
    },
    scanResult: {
      type: String, // Storing findings as text
    },
    scanType: {
      type: String,
      default: 'steganography',
    },
    scanStatus: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending',
    },
    isClean: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('ScanSteganography', scanSteganographySchema);
