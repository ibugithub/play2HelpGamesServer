export const sendScore = async(score) => {
  const urlParams = new URLSearchParams(window.location.search);
  const sessionId =  urlParams.get('sessionId');
  // const SELF_BASE_URL = 'http://localhost:3003';
  console.log('the session id is', sessionId)
  const SELF_BASE_URL = 'https://play2helpgamesserver.onrender.com'
  const subUri ='api/sendScoreToDB'
  try {
    await fetch(`${SELF_BASE_URL}/${subUri}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ score, sessionId }),
    });
  } catch (error) {
    console.error('Failed to send score:', error);
  }
}