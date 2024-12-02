const getAccessToken = () => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    return accessToken;
  }
  return null;
}

export const sendScore = async(score) => {
  console.log('I am in the sendScore function')
  const SELF_BASE_URL = 'http://localhost:3003';
  // const SELF_BASE_URL = 'https://play2helpgamesserver.onrender.com'
  const subUri ='api/testFromGame'
  const accessToken = getAccessToken();
  try {
    await fetch(`${SELF_BASE_URL}/${subUri}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ score }),
    });
  } catch (error) {
    console.error('Failed to send score:', error);
  }
}