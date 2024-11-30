import express from 'express';
import { sendScore } from '../controllers/scoreController.js'; 

const router = express.Router();

router.post('/sendScore', sendScore);

export default router;