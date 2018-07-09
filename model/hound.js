'use strict';

const mongoose = require('mongoose');

const houndSchema = mongoose.Schema({
  date: {type:Date},
  task_completed: {type:Boolean, required: true},
  goal: {type: mongoose.Schema.Types.ObjectId, required: true, ref:'goal'},
  energy_level: {type: Number, min: 1, max: 10},
  notes: {type: String},
  completion_rating: {type:Number, min:1, max: 3},
});

module.exports = mongoose.model('hound', houndSchema);
