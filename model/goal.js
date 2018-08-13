'use strict';

const mongoose = require('mongoose');
const User = require('./user.js');

const houndSchema = mongoose.Schema({
  date: {type:Date},
  actualStartTime:{type:Date},
  snoozeCount:{type:Number},
  taskCompleted: {type:Boolean, required: true},
  energyLevel: {type: Number, min: 1, max: 10},
  notes: {type: String},
  completionRating: {type:Number, min:1, max: 5},
});


const goalSchema = mongoose.Schema({
  name: {type:String, required:true, minlength:1},
  endDate: {type:Date},
  userId:{type: mongoose.Schema.Types.ObjectId, ref: 'user', required:true},
  timeSlots:[
    {
      dayOfTheWeek: {type:String, enum :['MON','TUE','WED','THU','FRI','SAT','SUN'], required:true},
      startTimeMinutes:{type:Number, required:true, min:0, max: 1440},
      endTimeMinutes:{type:Number, required:true, min:0, max: 1440},
    },
  ],
  hounds: [houndSchema],
});

goalSchema.pre('save', function(next){
  if(this.userId){
    User.findById(this.userId)
      .then(user => {
        console.log(`found user = ${user}`);
        let setGoals = new Set(user.goals);
        setGoals.add({_id: this._id,name: this.name});
        user.goals = Array.from(setGoals);
        return user.save();
      })
      .then(() => next())
      .catch(() => next(new Error('cannot create goal because user does not exist')));
  }
  next();
});
module.exports = mongoose.model('goal', goalSchema);
