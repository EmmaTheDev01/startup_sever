import express from 'express';
import { scanPorts } from '../controllers/scanPortController.js';

const router = express.Router();

router.post('/', scanPorts);

export default router;
