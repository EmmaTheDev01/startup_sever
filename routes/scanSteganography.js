import express from 'express';
import { scanSteganography } from '../controllers/scanSteganographyController.js';

const router = express.Router();

router.post('/', scanSteganography);

export default router;
