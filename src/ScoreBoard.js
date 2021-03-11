const scoreboard = async () => {
  const information = await fetch("https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/:id/scores/");
  const info = await information.json();
  // console.log(info);
  // console.log(info.result);
  const names = info.result;

  // console.log(names);
  return names;
  // console.log(info.result[1]);
  // let bucket = "";
  // for (let i = 0; i < names.length; i++) {
  //   bucket = names[i];
  //   // console.log(bucket);
  //   // console.log(names[i]);
  //   // console.log(bucket.user, bucket.score);
  // }
  // return bucket;
};

scoreboard();

export default scoreboard;
// export default scoreboard;

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
