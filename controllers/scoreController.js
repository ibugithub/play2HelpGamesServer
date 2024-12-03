import axios from "axios";

export const sendScoreToDB = async (req, res) => {
  console.log('I am in the sendScoreToDB');
  const referer = req.get('Referer');
  console.log('the req is', req);
  console.log('the referer is', referer);
  const url = new URL(referer);
  const accessToken = url.searchParams.get('to');
  console.log('the body is', req.body);
  const { score, gameName } = req.body;
  console.log('the gameName is', gameName);
  console.log('the score is', score);
  console.log('the accessToken in the sendScoreToDB is', accessToken);
  if (accessToken && accessToken !== 'null') { 
    const subUri = 'api/games/submitScore/';
    const url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/${subUri}`;
    axios.post(url, { score: score, game: gameName }, { headers: { Authorization: `Bearer ${accessToken}` } });
  }
  else {
    console.log("No access token found in local storage");
  }
  return res.json({ message: 'Score sent successfully' });
};