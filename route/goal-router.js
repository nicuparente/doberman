'use strict';

const { Router } = require('express');

const Goal = require('../model/goal.js');
const goalRouter = module.exports = new Router();
const bodyParser = require('body-parser').json();

goalRouter.get('/api/goal/:id', (req, res, next) => {
  console.log('Hit Goal Route');
  Goal.findById(req.params.id)
    .then(goal => res.json(goal))
    .catch(next);  
});


goalRouter.post('/api/goal', bodyParser,(req,res, next) =>{
  console.log('Hit Goal Post Route');
  console.log(req.body);
  new Goal({
    name: req.body.name,
    end_date: req.body.end_date,
    time_per_week: req.body.time_per_week,
    mon_hours: req.body.mon_hours,
    tue_hours: req.body.tue_hours,
    wed_hours: req.body.wed_hours,
    thu_hours: req.body.thu_hours,
    fri_hours: req.body.fri_hours,
    sat_hours: req.body.sat_hours,
    sun_hours: req.body.sun_hours,
  })
    .save()
    .then(goal => res.json(goal))
    .catch(next);
});