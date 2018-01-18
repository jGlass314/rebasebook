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

const passport = require('passport') 
const LocalStrategy = require('passport-local').Strategy;
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));


  // app.use(express.cookieParser());
  // app.use(express.session({ secret: 'keyboard cat' }));

//serve static pages
app.use(express.static(__dirname + '/../client/dist'));
app.use('/:username', express.static(__dirname + '/../client/dist'));

//handle /api endpoints
app.use('/api', api);

app.post('/login',
  passport.authenticate('local'),
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.redirect('/api/' + req.user.username);
});

let port = process.env.PORT || 3000;

server.listen(port, function() {
  console.log(`listening on port ${port}`);
});


