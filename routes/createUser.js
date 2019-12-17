const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const User = require('../models/user.model');
require('dotenv').config();

// @route   POST /user
// @desc    Register new user
// @access  Public

// List all the users
router.route('/all').get((req, res) => {
  User.find()
    .then(info => res.json(info))
    .catch(err => res.status(400).json('Error: ' + err));
});

// New register
router.post('/', (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  // Simple validation
  if (!username || !email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  // Check for existing user
  User.findOne({ email }).then(user => {
    if (user) return res.status(400).json({ msg: 'User already exists' });

    const newUser = new User({
      username,
      email,
      password,
    });

    // create salt & hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then(user => {
          jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
            if (err) throw err;
            res.json({
              token,
              user: {
                id: user.id,
                email: user.email,
                username: user.username,
              },
            });
          });
        });
      });
    });
  });
});

// @route   GET /auth/user
// @desc    get user data
// @access  Private
router.get('/user', auth, (req, res) => {
  User.findById(req.user.id)
    .select('-password')
    .then(user => res.json(user));
});

// Entering the data for the first time
router.route('/:id').post(auth, (req, res) => {
  User.findByIdAndUpdate(req.params.id)
    .then(info => {
      info.phone = req.body.phone;
      info.picture = req.body.picture;
      info.country = req.body.country;
      info.city = req.body.city;
      info.website = req.body.website;
      info.education = req.body.education;
      info.workExperience = req.body.workExperience;
      info.skill = req.body.skill;
      info.certificate = req.body.certificate;
      info.language = req.body.language;
      info.project = req.body.project;
      info
        .save()
        .then(() => res.json('Added successfully!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

// Entering Github data
router.route('/github/:id').post(auth, (req, res) => {
  User.findByIdAndUpdate(req.params.id)
    .then(info => {
      info.gitHub = req.body.gitHub;
      info
        .save()
        .then(() => res.json('Added successfully!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

// updating the data
router.route('/update/:id').put(auth, (req, res) => {
  User.findByIdAndUpdate(req.params.id)
    .then(info => {
      info.phone = req.body.phone;
      info.picture = req.body.picture;
      info.country = req.body.country;
      info.city = req.body.city;
      info.website = req.body.website;
      info.education = req.body.education;
      info.workExperience = req.body.workExperience;
      info.skill = req.body.skill;
      info.certificate = req.body.certificate;
      info.language = req.body.language;
      info.gitHub = req.body.gitHub;
      info.project = req.body.project;
      info
        .save()
        .then(() => res.json('Added successfully!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

// Getting specified data by ID
router.route('/:id').get((req, res) => {
  User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
