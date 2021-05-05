const removePunctuation = (review) => {
  const regex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;
  const newReview = review.replace(regex, "");
  return newReview;
};

const toLowerCase = (review) => {
  return review.toLowerCase();
};

const stripStopWords = (review) => {
  const stopWords = [
    "i",
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
  ];
  const arr = [];
  const words = review.split(" ");
  for (let i = 0; i < words.length; ++i) {
    if (!stopWords.includes(words[i])) {
      console.log(words[i]);
      arr.push(words[i]);
    }
  }
  return words;
};

const transformWords = (reviews) => {
  const map = {};
  for (let i = 0; i < reviews.length; ++i) {
    for (let j = 0; j < reviews[i].length; ++j) {
      if (!map[reviews[i][j]]) {
        map[reviews[i][j]] = 0;
      }
      map[reviews[i][j]] += 1;
    }
  }
  return map;
};

const parseReviews = (reviews) => {
  const result = reviews.map((review) => {
    return stripStopWords(removePunctuation(toLowerCase(review)));
  });
  console.log(result);
  return transformWords(result);
};

module.exports = parseReviews;
