const scoreboard = async () => {
  const information = await fetch("https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/:id/scores/");
  const info = await information.json();
  console.log(info);
  //   return info;
};

scoreboard();
