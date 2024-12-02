import express from 'express';
import { sendScoreToDB,  sendScoreFromGameEngine, storeAccessToken} from '../controllers/scoreController.js'; 

const router = express.Router();

router.post('/sendScoreToDB', sendScoreToDB);
router.post('/sendScoreFromGameEngine', sendScoreFromGameEngine);
router.post('/storeAccessToken', storeAccessToken);
export default router;