export const sendScore = async(score, gameName) => {
  const SELF_BASE_URL = 'http://localhost:3003';
  // const SELF_BASE_URL = 'https://play2helpgamesserver.onrender.com'
  const subUri ='api/sendScoreToDB'
  
  try {
    // ensure the score has at most 4 decimal places
    let formattedScore = score;
    if (score !== null && score !== undefined) {
      const n = Number(score);
      if (Number.isFinite(n)) {
        formattedScore = Number(n.toFixed(4));
      } else {
        formattedScore = n;
      }
    }

    await fetch(`${SELF_BASE_URL}/${subUri}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ score: formattedScore, gameName }),
    });
  } catch (error) {
    console.error('Failed to send score:', error);
  }
}