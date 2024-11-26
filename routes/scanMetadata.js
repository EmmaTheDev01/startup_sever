import express from 'express';
import { scanMetadata } from '../controllers/scanMetadataController.js';

const router = express.Router();

router.post('/', scanMetadata);

export default router;
