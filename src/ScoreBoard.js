const scoreboard = async () => {
  const information = await fetch("https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/:id/scores/");
  const info = await information.json();
  const names = info.result;

  return names;
};

scoreboard();

export default scoreboard;

// const submit = async (name, score) => {
//   try {
//     const result = await fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/:id/scores/`, {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         user: name,
//         score: Number(score),
//       }),
//     });

//     return result.json();
//   } catch (error) {
//     return error.json();
//   }
// };

// const ScoreList = async () => {
//   try {
//     const scores = await fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/:id/scores/`, {
//       method: "GET",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//     });
//     return scores.json();
//   } catch (error) {
//     return error.json();
//   }
// };

// ScoreList();

// async function getKey() {
//   try {
//     const response = await fetch("https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/", {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         name: "Endless Game",
//       }),
//     });
//     return response;
//   } catch (error) {
//     return error;
//   }
// }
