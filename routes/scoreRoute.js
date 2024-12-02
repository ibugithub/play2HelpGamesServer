import express from 'express';
import { sendScoreToDB,  sendScoreFromGameEngine} from '../controllers/scoreController.js'; 

const router = express.Router();

router.post('/sendScoreToDB', sendScoreToDB);
router.post('/sendScoreFromGameEngine', sendScoreFromGameEngine);
export default router;