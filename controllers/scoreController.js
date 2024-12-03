import axios from "axios";

export const sendScoreToDB = async (req, res) => {
  const referer = req.get('Referer');
  const url = new URL(referer);
  const accessToken = url.searchParams.get('to');
  const { score, gameName } = req.body;
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