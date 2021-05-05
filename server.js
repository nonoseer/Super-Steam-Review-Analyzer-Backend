const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const app = express()

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
  const { data } = await axios.get(searchURL)
  const $ = cheerio.load(data)
  var webLink = '';

  $('div #search_resultsRows').first().find('a').first().each((i, link) => {
    webLink = link.attribs.href;
  });

  const regex = /app\/\d*/
  const matched = webLink.match(regex).toString()
  const reviewsURL = `https://steamcommunity.com/${matched}/reviews/?browsefilter=toprated&snr=1_5_100010_`
  const reviewsHtml = await axios.get(reviewsURL).then(res => res.data);
  res.send(reviewsHtml)
})

app.listen(5000)
module.exports = app