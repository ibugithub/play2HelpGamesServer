function sendScore(score, gameName) {
  // var GAME_SERVER_URL = 'http://localhost:3003';
  var GAME_SERVER_URL = 'https://play2gamesserver.onrender.com';
  var subUri = 'api/sendScoreToDB';
  var url = GAME_SERVER_URL + '/' + subUri;
  var formattedScore = score;
  if (score !== null && score !== undefined) {
    var n = Number(score);
    if (isFinite(n)) {
      formattedScore = parseFloat(n.toFixed(4));
    } else {
      formattedScore = n; 
    }
  }

  fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ score: formattedScore, gameName: gameName }),
  })
    .then(function (response) {
      console.log('Score sent successfully:', response);
    })
    .catch(function (error) {
      console.error('Failed to send score:', error);
    });
}
