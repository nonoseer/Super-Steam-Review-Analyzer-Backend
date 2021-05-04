const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const app = express()

const getReviews = async function(gameTitle) {
  var editedTitle = gameTitle.split(" ").join("+");

  const searchURL = `https://store.steampowered.com/search/?term=${editedTitle}`

  console.log(searchURL)

  const searchRES = await axios.get(searchURL)
  // console.log(searchRES)
  return searchRES
}
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS')
  next()
})


app.get('/:title', async function (req, res) {
  var gameTitle = req.params.title;
  var editedTitle = gameTitle.split(" ").join("+");

  const searchURL = `https://store.steampowered.com/search/?term=${editedTitle}`

  console.log(searchURL)

  const {data} = await axios.get(searchURL)

  // var html = await getReviews(gameTitle)
  // console.log(html)
  const $ = cheerio.load(data)
  var webLink = '';
  $('div #search_resultsRows').first().find('a').first().each((i, link) => {
    webLink = link.attribs.href;

  });
  const regex = /app\/\d*/
  const matched = webLink.match(regex)
  console.log(matched)
  res.data = matched
})

app.listen(5000)
module.exports = app