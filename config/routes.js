const express = require('express');
const axios = require('axios');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const db = require('../database/dbConfig');
const server = express();

server.use(express.json());
server.use(cors());
const { authenticate } = require('./middlewares');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

function register(req, res) {
  // implement user registration
  const cred = req.body;
  const hash = bcrypt.hashSync(creds.password, 3);
  creds.password = hash;
  db('users')
  .insert(creds)
  .then((ids) => {
    res.status(200).json(ids);
  })
  .catch(err => res.status(400).json({ message: 'unable to register', ids}))
}

function login(req, res) {
  // implement user login
  const creds = req.body;
  db('users')
  .where({ username: creds.username })
  .first()
  .then(user => {
    if(user && bcrypt.compareSync(creds.password, user.password)){
      const token = generateToken(user);
      res.status(200).json({ message: 'login successful', token})
    } else {
      res.status(401).json({ message: 'login failed'})
    }
  })
  .catch(err => res.send(err));
}

function getJokes(req, res) {
  axios
    .get(
      'https://safe-falls-22549.herokuapp.com/random_ten'
    )
    .then(response => {
      res.status(200).json(response.data);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
