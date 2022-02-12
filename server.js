const express = require('express');
const bodyParser = require('body-parser');
const port = 3000;
const axios = require('axios');

var app = express();
app.use(bodyParser.json());

app.use(express.static(__dirname + '/client/dist'));


app.get('/*', (req, res) => {
  var url = req.url
  console.log(url);
  res.end();
});

app.post('/*', (req, res) => {
  var url = req.url;
});


app.listen(port, () => {
  console.log(`FEC App listening on http://localhost:${port}`);
});