import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000; 

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Set Cross-Origin Headers for SharedArrayBuffer support
app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  next();
});

// Serve the game folder as static files
app.use(express.static(path.join(__dirname, 'games')));

const games = ['goGame', 'grrGame', 'racingGame', 'railrushGame', 'snakeGame','spaceShotter']

// Serve index.html of all the games
games.forEach((game) => {
  app.get(`/${game}`, (req, res) => {
    res.sendFile(path.join(__dirname, 'games', `${game}`, 'index.html'));
  })
})

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
