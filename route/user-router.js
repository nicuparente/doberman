'use strict';

const { Router } = require('express');
const jsonParser = require('body-parser').json();
const User = require('../model/user.js');
const userRouter = module.exports = new Router();

userRouter.post('/api/user', jsonParser, (req, res, next) => {
  User.create(req.body)
    .then(token => res.send(token))
    .catch(next);
});

userRouter.get('/api/user/:id', (req, res, next) => {
  User.findById(req.params.id)
    .then(user => {
      res.json(user);
    })
    .catch(next);
});

userRouter.get('/api/user', (req, res, next) => {
  User.find({})
    .then(user => {
      res.json(user);
    })
    .catch(next);
});