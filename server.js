import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io'
import path from 'path';
import { fileURLToPath } from 'url';
import { PORT } from './config/env.js';
import cors from 'cors';
import { setHeaders } from './middlewares/headers.js';
import routes from './routes/indexRoute.js';
import { ALLOWED_FRONTEND } from './config/env.js';

const app = express();
const server = createServer(app);

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware to parse JSON bodies
app.use(express.json());

// Configure CORS to allow requests from multiple origins
app.use(cors({
  origin: ALLOWED_FRONTEND,
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true,
}));

// Middleware to set Cross-Origin Headers
app.use(setHeaders);

// Log the origin of incoming requests
app.use((req, res, next) => {
  next();
});

// Serve the game folder as static files
app.use(express.static(path.join(__dirname, 'games')));

app.use(routes);

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
