const express = require('express');
const bodyParser = require('body-parser');
const port = 3000;
const axios = require('axios');
const config = require('./config.js');


var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

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

// app.post('/reviews', (req, res) => {
//   var url = req.url;
//   var path = req.originalUrl;
//   console.log('PATH ->', path);
//   console.log('REQUEST BODY', req.body)
//   console.log('WERE IN HERE')
//   var bodyObject = {
//     body: req.body.body,
//     name: req.body.name,
//     email: req.body.email,
//     product_id: parseInt(req.body.product_id)
//   }
//   // return axios.post(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp${path}`, bodyObject, {
//   //   headers: {
//   //     'Authorization': config.TOKEN
//   //   }
//   // })
//   //   .then(response => {
//   //     console.log('response from POST API', response.data);
//   //     res.status(200).json('');
//   //   })
//   //   .catch(error => {
//   //      console.log('error from api POST request', error);
//   //      res.status(500);
//   //   })
// });


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
