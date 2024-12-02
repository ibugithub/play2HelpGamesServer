import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io'
import path from 'path';
import { fileURLToPath } from 'url';
import { PORT } from './config/env.js';
import cors from 'cors';
import { setHeaders } from './middlewares/headers.js';
import routes from './routes/indexRoute.js';
import { FRONTEND_BASE_URL } from './config/env.js';
import session from 'express-session';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: FRONTEND_BASE_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  }
});

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware to parse JSON bodies
app.use(express.json());

// Configure CORS to allow requests from http://localhost:3000
app.use(cors({
  origin: FRONTEND_BASE_URL,
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true,
}));

// Middleware to set Cross-Origin Headers
app.use(setHeaders);

// Serve the game folder as static files
app.use(express.static(path.join(__dirname, 'games')));

// Configuration of session middleware
app.use(session({
  secret: '%%play2helpSecretSession%%',
  resave: false,
  saveUninitialized: true,
  cookie: { 
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: 60 * 60 * 1000 * 20
  },
}));

app.use((req, res, next) => {
  req.io = io;
  next();
})
app.use(routes);

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
