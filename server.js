const express = require('express');
const bodyParser = require('body-parser');
const port = 3000;

var app = express();
app.use(bodyParser.json());

app.use(express.static(__dirname + '/client/dist'));
app.listen(port, () => {
  console.log(`FEC App listening on http://localhost:${port}`);
});