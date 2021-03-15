const savingyou = (score) => {
  const bestScoreText = localStorage.getItem('bestScore');
  const bestScore = bestScoreText && parseInt(bestScoreText, 10);

  if (!bestScore || score > bestScore) {
    localStorage.setItem('bestScore', score);
  }
};

export default savingyou;
