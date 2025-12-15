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
const io = new Server(server, {
  cors: {
    origin: ALLOWED_FRONTEND,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  }
});

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
  const origin = req.get('origin') || req.get('referer') || 'Direct access';
  console.log(`Request from: ${origin} - ${req.method} ${req.path}`);
  next();
});

// Serve the game folder as static files
app.use(express.static(path.join(__dirname, 'games')));


app.use((req, res, next) => {
  req.io = io;
  next();
})
app.use(routes);

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
