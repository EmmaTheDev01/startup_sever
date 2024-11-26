import mongoose from 'mongoose';

const scanMetadataSchema = new mongoose.Schema(
  {
    filePath: {
      type: String,
      required: true,
    },
    scanResult: {
      type: Map,
      of: mongoose.Schema.Types.Mixed, // Store metadata as a flexible structure
    },
    scanType: {
      type: String,
      default: 'metadata',
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

export default mongoose.model('ScanMetadata', scanMetadataSchema);
