import axios from "axios";

export const sendScoreFromGameEngine = async (req, res) => {
  const { score } = req.body;
  console.log('the score is', score)
  return res.json({ message: 'Score sent successfully' });
};


export const sendScoreToDB = async (req, res) => {
  const { score, accessToken } = req.body;
  console.log('the accessToken in the sendScoreToDB is', accessToken);
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