import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

export const sendScoreFromGameEngine = async (req, res) => {
  const { score } = req.body;
  console.log('the score is', score)
  return res.json({ message: 'Score sent successfully' });
};


export const sendScoreToDB = async (req, res) => {
  const { score, sessionId } = req.body;
  const accessToken = req.session[sessionId];
  console.log('the session in the sendScoreToDB is', req.session);
  if (accessToken && accessToken !== 'null') { 
    const subUri = 'api/games/submitScore/';
    const url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/${subUri}`;
    axios.post(url, { score: score }, { headers: { Authorization: `Bearer ${accessToken}` } });
  }
  else {
    console.log("No access token found in local storage");
  }
  return res.json({ message: 'Score sent successfully' });
};



export const storeAccessToken = async (req, res) => { 
  const accessToken = req.headers['authorization']?.split(' ')[1];
  const sessionId = uuidv4(); 
  req.session[sessionId] = accessToken;
  console.log('the session in storeAccessToken is', req.session);
  return res.json({ message: 'Access Token stored successfully', sessionId: sessionId });
};
