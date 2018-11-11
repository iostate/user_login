const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const controller = require('./controller');
require('dotenv').config();

const app = express();

app.use(bodyparser.json());

mongoose.connect(
  `mongodb://${process.env.MONGODB_USERPASS}@ds157493.mlab.com:57493/loginreg`
);
app.use(
  cors({
    // adds session property to req, like this: req.session
    origin: ['http://localhost:3000'],
    methods: ['GET', 'HEAD', 'POST', 'DELETE', 'PUT', 'PATCH', 'OPTIONS'],
    credentials: true, //allow setting of cookies
  })
);

app.use(
  session({
    secret: 'whatevergoeshere',
    saveUninitialized: true,
    resave: true,
    cookie: {maxAge: 60000 * 30},
  })
);

controller(app);

app.listen(8000, () => console.log('Listening on port 8000...'));
