import express from 'express';
import { scanIpWithVirusTotal } from '../controllers/scanIpController.js';

const router = express.Router();

router.post('/', scanIpWithVirusTotal);

export default router;
