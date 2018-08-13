'use strict';

const { Router } = require('express');

const Goal = require('../model/goal.js');
const goalRouter = module.exports = new Router();
const bodyParser = require('body-parser').json();

goalRouter.get('/api/goal/:id', (req, res, next) => {
  console.log('Hit GET Goal Route');
  Goal.findById(req.params.id)
    .then(goal => res.json(goal))
    .catch(next);
});

goalRouter.get('/api/goal', (req, res, next) => {
  Goal.find({})
    .then(goals => {
      res.json(goals);
    })
    .catch(next);
});

goalRouter.post('/api/goal', bodyParser, (req, res, next) => {
  console.log('Hit POST Goal Route');
  console.log(req.body);
  new Goal({
    userId: req.body.userId,
    name: req.body.name,
    endDate: req.body.endDate,
    timeSlots: req.body.timeSlots,
  })
    .save()
    .then(goal => res.json(goal))
    .catch(next);
});

goalRouter.put('/api/goal/:id', bodyParser, (req, res, next) => {
  console.log('Hit PUT Goal Route');
  console.log(req.body);

  let options = {
    runValidators: true,
    new: true,
  };

  if (req.body.addHoundCard) {

    Goal.findByIdAndUpdate(req.params.id, { $push: { hounds: req.body.hound }, options })
      .then(goal => res.json(goal))
      .catch(next);
  }
});

goalRouter.delete('/api/goal/:id', (req, res, next) => {
  console.log('Hit DELETE Goal Route');
  Goal.findById(req.params.id)
    .then(goal => goal.remove())
    .then(() => res.sendStatus(204))
    .catch(next);
});