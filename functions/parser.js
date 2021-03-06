const cheerio = require("cheerio");

const getReviews = async (data) => {
  const $ = await cheerio.load(data);

  const reviews = [];

  $(".apphub_CardTextContent").each((i, el) => {
    var review = $(el)
      .text()
      .substring(40)
      .replace("Product received for free", "")
      .trimStart();
    reviews.push(review);
  });

  return reviews;
};
const removePunctuation = (review) => {
  const regex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;
  const newReview = review.replace(regex, " ");

  return newReview.replace("\t", "");
};

const toLowerCase = (review) => {
  return review.toLowerCase();
};

const stripStopWords = (review) => {
  const stopWords = [
    "i",
    "m",
    "me",
    "my",
    "myself",
    "we",
    "our",
    "ours",
    "ourselves",
    "you",
    "your",
    "yours",
    "yourself",
    "yourselves",
    "he",
    "him",
    "his",
    "himself",
    "she",
    "her",
    "hers",
    "herself",
    "it",
    "its",
    "itself",
    "they",
    "them",
    "their",
    "theirs",
    "themselves",
    "what",
    "which",
    "who",
    "whom",
    "this",
    "that",
    "these",
    "those",
    "am",
    "is",
    "are",
    "was",
    "were",
    "be",
    "been",
    "being",
    "have",
    "has",
    "had",
    "having",
    "do",
    "does",
    "did",
    "doing",
    "a",
    "an",
    "the",
    "and",
    "but",
    "if",
    "or",
    "because",
    "as",
    "until",
    "while",
    "of",
    "at",
    "by",
    "for",
    "with",
    "about",
    "against",
    "between",
    "into",
    "through",
    "during",
    "before",
    "after",
    "above",
    "below",
    "to",
    "from",
    "up",
    "down",
    "in",
    "out",
    "on",
    "off",
    "over",
    "under",
    "again",
    "further",
    "then",
    "once",
    "here",
    "there",
    "when",
    "where",
    "why",
    "how",
    "all",
    "any",
    "both",
    "each",
    "few",
    "more",
    "most",
    "other",
    "some",
    "such",
    "no",
    "nor",
    "not",
    "only",
    "own",
    "same",
    "so",
    "than",
    "too",
    "very",
    "s",
    "t",
    "can",
    "will",
    "just",
    "don",
    "should",
    "now",
    "ve",
  ];
  const arr = [];
  const words = review.split(" ");
  for (let i = 0; i < words.length; ++i) {
    if (!words[i]) {
      continue;
    }
    if (/\d/.test(words[i])) {
      continue;
    }
    if (!stopWords.includes(words[i])) {
      arr.push(words[i]);
    }
  }
  return arr;
};

const transformMap = (map) => {
  const newMap = [];
  for (let [key, value] of Object.entries(map)) {
    newMap.push({
      text: key,
      size: value,
    });
  }
  return newMap;
};

const transformWords = (reviews) => {
  const map = {};
  for (let i = 0; i < reviews.length; ++i) {
    for (let j = 0; j < reviews[i].length; ++j) {
      if (reviews[i][j].length <= 1) {
        continue;
      }
      if (!map[reviews[i][j]]) {
        map[reviews[i][j]] = 0;
      }
      map[reviews[i][j]] += 1;
    }
  }
  console.log(map[" "]);
  return map;
};

const parseReviews = (reviews) => {
  const result = reviews.map((review) => {
    return stripStopWords(removePunctuation(toLowerCase(review)));
  });
  console.log(result);
  return transformMap(transformWords(result));
};

module.exports = { parseReviews, getReviews };
