const express = require('express');
const bodyParser = require('body-parser');
const port = 3000;
const axios = require('axios');
const config = require('./config.js');


var app = express();
app.use(bodyParser.json());

app.use(express.static(__dirname + '/client/dist'));


app.get('/*', (req, res) => {
  var path = req.originalUrl;
  console.log('PATH ->', path);
  return axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp${path}`, {
    headers: {
      'Authorization': config.TOKEN
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

// app.post('/*', (req, res) => {
//   var url = req.url;
//   var path = req.originalUrl;
//   console.log('PATH ->', path);
//   return axios.post(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp${path}`, {
//     headers: {
//       'Authorization': config.TOKEN
//     },

//   })
//     .then(response => {
//       console.log('response from API', response.data);
//       res.status(200).json('');
//     })
//     .catch(error => {
//        console.log('error from api request', error);
//        res.status(500);
//     })
// });

app.listen(port, () => {
  console.log(`FEC App listening on http://localhost:${port}`);
});

//