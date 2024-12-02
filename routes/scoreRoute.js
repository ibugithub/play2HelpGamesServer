import express from 'express';
import { sendScoreToDB, setAccessTokenTolocal, pageLoaded, sendScoreFromGameEngine, test, testFromGame } from '../controllers/scoreController.js'; 

const router = express.Router();

router.post('/sendScore', sendScoreToDB);
router.post('/setAccessToken', setAccessTokenTolocal);
router.post('/sendScoreFromGameEngine', sendScoreFromGameEngine);
router.get('/pageLoaded', pageLoaded);
router.post('/test', test);
router.post('/testFromGame', testFromGame);

export default router;