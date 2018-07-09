'use strict';

const mongoose = require('mongoose');

const goalSchema = mongoose.Schema({
  name: {type:String, required:true, unique:true, minlength:1},
  end_date: {type:Date},
  time_per_week: {type:Number, required:true},
  mon_hours:[Number],
  tue_hours:[Number],
  wed_hours:[Number],
  thu_hours:[Number],
  fri_hours:[Number],
  sat_hours:[Number],
  sun_hours:[Number],
  hound: [{type: mongoose.Schema.Types.ObjectId, ref: 'hound'}],
});

module.exports = mongoose.model('goal', goalSchema);
