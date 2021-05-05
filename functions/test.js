const parseReviews = require("./parser");

const testReviews = [
  "Hello, I just wanted to say that this game is a flaming pile of TRASH",
  "you suck",
  "omg, i have never played a better game",
];

console.log(parseReviews(testReviews));
