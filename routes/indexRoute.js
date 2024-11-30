import express from 'express'; 
import scoreRoutes from './scoreRoute.js' 

const router = express.Router();

const games = ['goGame', 'grrGame', 'racingGame', 'railrushGame', 'snakeGame','spaceShotter']

games.forEach((game) => {
  router.get(`/${game}`, (req, res) => {
    res.sendFile(path.join(__dirname, 'games', `${game}`, 'index.html'));
  })
})
router.use('/api', scoreRoutes);

export default router;