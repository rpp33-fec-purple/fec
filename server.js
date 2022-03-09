const express = require('express');
const bodyParser = require('body-parser');
const port = 3000;
const axios = require('axios');
const config = require('./config.js');
require('dotenv').config();


var app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname + '/client/dist'));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/*', (req, res) => {
  var path = req.originalUrl;
  // console.log('PATH ->', path);
  return axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp${path}`, {
    headers: {
      'Authorization': config.TOKEN
      //
    }
  })
    .then(response => {
      // console.log('response from API', response.data);
      res.status(200).json(response.data);
    })
    .catch(error => {
      // console.log('error from api request', error);
      res.status(500).end();
    })
});


app.post('/reviews', (req, res) => {
  var params = {};
  console.log(req.body);
  params.product_id = parseInt(req.body.product_id);
  params.rating = parseInt(req.body.rating);
  params.summary = req.body.summary
  params.body = req.body.body;
  params.recommend = (req.body.recommend === 'true');
  params.name = req.body.name;
  params.email = req.body.email;
  if (req.body.photos.length) {
    params.photos = req.body.photos;
  } else {
    params.photos = [];
  }
  let characteristics = {};
  for (var key in req.body.characteristics) {
    characteristics[key] = parseInt(req.body.characteristics[key]);
  }
  params.characteristics = characteristics;
  console.log(params);

  axios.post(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews`, params, {
    headers: {
      'Authorization': config.TOKEN
    }
  })
  .then(response => {
    console.log("RESPONSE FROM REVIEW POST API: ", response.data);
    res.status(200).json('');
  })
  .catch(error => {
    console.log('ERROR FROM REVIEWS API POST REQUEST: ', error);
    res.status(500);
 })

})

app.post('/*', (req, res) => {
  var url = req.url;
  var path = req.originalUrl;
  console.log('PATH ->', path);
  console.log('REQUEST BODY', req.body)

  var params = {};

  for (var key in req.body) {
    var objKey = key.toString();
    if (objKey.indexOf('_id') !== -1) {
      params[key] = parseInt(req.body[key])
    } else {
      params[key] = req.body[key]
    }
  }
  return axios.post(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp${path}`, params, {
    headers: {
      'Authorization': config.TOKEN
    }
  })
    .then(response => {
      console.log('response from POST API', response.data);
      res.status(200).json('');
    })
    .catch(error => {
       console.log('error from api POST request', error);
       res.status(500);
    })
});


app.put('/*', (req, res) => {
  var path = req.originalUrl;
  console.log('PUT PATH', path);

  var params = {};

  for (var key in req.body) {
    var objKey = key.toString();
    if (objKey.indexOf('_id') !== -1) {
      params[key] = parseInt(req.body[key])
    } else {
      params[key] = req.body[key]
    }
  }

  return axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp${path}`, params, {
    headers: {
      'Authorization': config.TOKEN
    }
  })
  .then(response => {
    console.log('response from PUT API', response.data);
    res.status(200).json('');
  })
  .catch(error => {
     console.log('error from api PUT request', error);
     res.status(500);
  })
})


app.listen(port, () => {
  console.log(`FEC App listening on http://localhost:${port}`);
});
