import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 3000;
export const GAME_SERVER_URL = process.env.GAME_SERVER_URL;
export const ALLOWED_FRONTEND = process.env.ALLOWED_FRONTEND
  ? process.env.ALLOWED_FRONTEND.split(',').map(url => url.trim())
  : [];

