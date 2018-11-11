const bodyparser = require('body-parser');
// const expressValidator = require('express-validator');
var {check, validationResult} = require('express-validator/check');
const bcrypt = require('bcrypt');
const User = require('./models/User');
const Post = require('./models/Post');

// general structure goes
// 1. validation functions
// 2. actual function, e.g. register, login, etc..
// 3. the route, e.g. app.post(etc.etc.etc...)

// route stuff goes here
module.exports = function(app) {
  const regValidation = [
    // .withMessage() sends message to res.email.msg
    check('email')
      .not()
      .isEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Email should be an email address'),
    check('firstname')
      .not()
      .isEmpty()
      .withMessage('First name is required')
      .isLength({min: 2})
      .withMessage('Name should be at least 2 letters')
      .matches(/^([A-z]|\s)+$/)
      .withMessage('Name cannot have numbers'),
    check('lastname')
      .not()
      .isEmpty()
      .withMessage('Last name is required')
      .isLength({min: 2})
      .withMessage('Last name should be at least 2 letters'),
    check('username')
      .not()
      .isEmpty()
      .withMessage('Username is required')
      .isLength({min: 2})
      .withMessage('Username should be at least 2 letters'),
    check('password')
      .not()
      .isEmpty()
      .withMessage('Password is required')
      .isLength({min: 6})
      .withMessage('Password should be at least 6 characters'),
    check(
      'passwordconf',
      'Password confirmation  is required or should be the same as password'
    ).custom(function(value, {req}) {
      if (value !== req.body.password) {
        throw new Error("Password don't match");
      }
      return value;
    }),
    check('email').custom(value => {
      return User.findOne({email: value}).then(function(user) {
        if (user) {
          throw new Error('This email is already in use');
        }
      });
    }),
  ];

  function register(req, res) {
    // validator function, log errors
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.send({errors: errors.mapped()});
    }

    // success
    var user = new User(req.body);
    user.password = user.hashPassword(user.password); // bcrypt password, fn from User.js

    user
      .save()
      .then(user => {
        return res.json(user);
      })
      .catch(err => res.send(err));
  }
  app.post('/api/register', regValidation, register);
  app.get('/', (req, res) => res.json('asdefgh'));
  //-------------------------------------------------
  const logValidation = [
    check('email')
      .not()
      .isEmpty()
      .withMessage('Email is required'),
    check('password')
      .not()
      .isEmpty()
      .withMessage('Password is required'),
  ];
  function loginUser(req, res) {
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.send({errors: errors.mapped()});
    }
    User.findOne({
      email: req.body.email,
    })
      .then(function(user) {
        if (!user) {
          return res.send({error: true, message: 'User does not exist!'});
        }

        // 1st param is user password sent to api
        // 2nd param is user password in db
        if (!user.comparePassword(req.body.password, user.password)) {
          return res.send({error: true, message: 'Wrong password!'});
        }
        req.session.user = user;
        req.session.isLoggedIn = true;
        return res.send({message: 'You are signed in'});
        res.send(user);
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  app.post('/api/login', logValidation, loginUser);
  //------------------------------------------------

  function isLoggedIn(req, res) {
    if (req.session.isLoggedIn) {
      res.send(true);
      console.log(true);
    } else {
      res.send(false);
      console.log(false);
    }
  }
  app.get('/api/isloggedin', isLoggedIn);

  //------------------------------------------------
  // post validation

  const postValidation = [
    check('post')
      .not()
      .isEmpty()
      .withMessage('Please write something.'),
  ];

  function addPost(req, res) {
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
      // console.log(errors.mapped());
      return res.send({errors: errors.mapped()});
    }
    var post = new Post(req.body);
    if (req.session.user) {
      post.user = req.session.user._id;
      post
        .save()
        .then(post => {
          res.json(post);
        })
        .catch(error => {
          res.json(error);
        });
    } else {
      return res.send({error: 'You are not logged in!'});
    }
  }
  app.post('/api/addpost', postValidation, addPost);
  //------------------------------------------------
  // upvote
  app.post('/api/postupvote/:id', isLoggedIn, (req, res) => {
    // find post by ID in database
    Post.findById(req.params.id).then(function(post) {
      post.vote = post.vote + 1; // increase vote property - see Post Model to see vote property in there
      post.save().then(function(post) {
        res.send(post);
      });
    });
  });

  //------------------------------------------------------
  function showPosts(req, res) {
    Post.find()
      .populate('user', ['username', 'email'])
      .sort({vote: 'desc'})
      .then(post => {
        res.json(post);
      })
      .catch(error => {
        res.json(error);
      });
  }
  app.get('/api/showposts', isLoggedIn, showPosts);

  app.get('/api/logout', (req, res) => {
    req.session.destroy();
    res.send({message: 'Logged out!'});
  });
};
