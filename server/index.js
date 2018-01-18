const express = require('express');
let app = express();
const server = require('http').Server(app);
const chat = require('./chat').attach(server);
const bodyParser = require('body-parser');
const morgan = require('morgan');
const db = require('../database-posgtres/index.js');
const api = require('./api');
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//serve static pages
app.use(express.static(__dirname + '/../client/dist'));
app.use('/:username', express.static(__dirname + '/../client/dist'));

//handle /api endpoints
app.use('/api', api);


let port = 3000;

server.listen(process.env.PORT || port, function() {
  console.log(`listening on port ${port}`);
});


