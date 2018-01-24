const express = require('express');
const bodyParser = require('body-parser');
const Promise = require('bluebird');
const request = Promise.promisify(require('request'));
const api = require('./config.js');
const axios = require('axios');
const Clarifai = require('clarifai');
const query = require('./query.js');
const db = require('../database/schema.js');
const _ = require('underscore');

const app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.post('/search', (req, res) => {
  let data = req.body;
  query.apiQuery(data, res);
});

app.post('/clarifai', (req, res) => {
  console.log(req.body);
  let imageUrl = req.body.url;
  const clarifai = new Clarifai.App({
    apiKey: api.clarifai_key
  });

  clarifai.models
  .predict(Clarifai.FOOD_MODEL, imageUrl)
  .then((response, error) => {
    if (error) {
      console.log('HERE', error);
    } else {
      return response;
    }
  })
  .then(result => {
    return result.outputs[0].data.concepts.map(item => {
      return item.name;
    });
  })
  .then(imageText => {
    res.send(imageText);
  });
});

app.post('/favorite', (req, res) => {
  let saved = JSON.stringify(req.body.pair);
  let bool = JSON.parse(req.body.favorite);
  if (!bool) {
    let promise = Promise.resolve(saved);
    promise.then((pairing) => {
      var recipe = new db.Favorite({ finalRecipe: pairing });
      recipe.save();
    }).then(() => {
      res.send('yes it was created!');
    });
  } else {
    db.Favorite.remove({ finalRecipe: saved }, (err, results) => {
      if (err) {
        console.log('remove failed');
      } else {
        res.send('favorite removed');
      }
    });
  }
});

// app.get('/images', (req, res) => {
//   let images = db.Image.find().then(results => {
//     console.log('images: ', results);
//     res.send(results);
//   });
// })

app.post('/saveImage', (req, res) => {
  let data = req.body
  new db.Image({url: data.url, caption: data.item}).save()
})

app.listen(process.env.PORT || 3000, function() {
  console.log('Connection established.  Listening on port 3000!');
});
