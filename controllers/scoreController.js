export const sendScore = async (req, res) => {
  const { score } = req.body;
  console.log('the score is:', score);
  req.io.emit('game_end', { score });
  return res.json({ score });
};