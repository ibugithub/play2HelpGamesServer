import { sendScore } from "./sendScoreToGameServer";
const socket = io();
socket.on('setAccessToken', (accessToken) => {
  console.log('The accessToken is:', accessToken.accessToken);
  localStorage.setItem('accessToken', accessToken.accessToken);
});

socket.on('sendScoreFromGameEngine', (score) => {
  console.log('score from gameEngine called and The score is:', score);
  sendScore(score.score);
});

const sendPageLoaded = () => {
  const SELF_BASE_URL = 'http://localhost:3003';
  // const SELF_BASE_URL = 'https://play2helpgamesserver.onrender.com';
  const subUri = 'api/pageLoaded';
  const url = `${SELF_BASE_URL}/${subUri}`;
  
  fetch(url, {
    method: 'GET',
  })
    .then((response) => response.json())
    .then((data) => console.log('Data received from server:', data))
    .catch((error) => console.error('Error:', error));
};


window.onload = () => {
  console.log('All resources finished loading!');
  sendPageLoaded();
};
