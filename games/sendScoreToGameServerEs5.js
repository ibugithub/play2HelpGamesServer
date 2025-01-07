function sendScore(score, gameName) {
  // var SELF_BASE_URL = 'http://localhost:3003';
  var SELF_BASE_URL = 'https://play2help-game-server-dot-opendoorsaccelerator.df.r.appspot.com'
  var subUri = 'api/sendScoreToDB';
  var url = SELF_BASE_URL + '/' + subUri;

  fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ score: score, gameName: gameName }),
  })
    .then(function (response) {
      // Handle the response if needed
      console.log('Score sent successfully:', response);
    })
    .catch(function (error) {
      console.error('Failed to send score:', error);
    });
}
