export const sendScore = async(score, gameName) => {
  // const SELF_BASE_URL = 'http://localhost:3003';
  const SELF_BASE_URL = 'https://play2helpgamesserver.onrender.com'
  const subUri ='api/sendScoreToDB'
  try {
    await fetch(`${SELF_BASE_URL}/${subUri}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ score, gameName }),
    });
  } catch (error) {
    console.error('Failed to send score:', error);
  }
}