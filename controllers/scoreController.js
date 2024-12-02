import axios from "axios";

export const pageLoaded = async (req, res) => { 
  req.io.emit('game_page_loaded');
};

export const setAccessTokenTolocal = async (req, res) => {
  const authHeader = req.headers['authorization']; 
  if(!authHeader) {
    return res.status(401).json({ message: 'No accessToken found' });
  }
  const accessToken = authHeader.split(' ')[1];
  req.io.emit('setAccessToken', { accessToken });
  return res.json({ accessToken });
}

export const sendScoreFromGameEngine = async (req, res) => {
  const { score } = req.body;
  console.log('the score is', score)
  req.io.emit('sendScoreFromGameEngine', { score });
  return res.json({ message: 'Score sent successfully' });
};


export const sendScoreToDB = async (req, res) => {
  console.log('I am in the sendScoreToDB function')
  const { score } = req.body;
  const accessToken = req.headers['authorization']?.split(' ')[1];
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


export const test = async (req, res) => { 
  console.log('I am in the test function')
  console.log('the headers are', req.headers)
  return res.json({ message: 'Test successful' });
}

export const testFromGame = async (req, res) => { 
  console.log('I am in the test From game function')
  console.log('the headers are', req.headers)
  return res.json({ message: 'Test successful' });
}