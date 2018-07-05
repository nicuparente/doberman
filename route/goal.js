'use strict';

const { Router } = require('express');

const goalRouter = module.exports = new Router();

goalRouter.get('/api/goal', (req, res, next) => {
  console.log('Hit Goal Route');
  res.send('<h1>Standard Goal Derp</h1>');
});