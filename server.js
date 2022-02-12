const express = require('express');
const bodyParser = require('body-parser');
const port = 3000;
const axios = require('axios');
const config = require('./config.js');


var app = express();
app.use(bodyParser.json());

app.use(express.static(__dirname + '/client/dist'));


app.get('/*', (req, res) => {
  var url = req.url; // ex: '/products'
  console.log('REQUEST -', req);
  return axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp${url}`, {
    headers: {
      'Authorization': config.TOKEN
    }
  })
    .then(response => {
      // console.log('response from API', response.data);
      res.status(200).json('');
    })
    .catch(error => {
      // console.log('error from api request', error)
    })
});

app.post('/*', (req, res) => {
  var url = req.url;
});



app.listen(port, () => {
  console.log(`FEC App listening on http://localhost:${port}`);
});

//