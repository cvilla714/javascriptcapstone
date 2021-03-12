const scoreboard = async () => {
  const information = await fetch("https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/:id/scores/");
  const info = await information.json();
  const names = info.result;
  return names;
};

scoreboard();

export default scoreboard;
