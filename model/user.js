
const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
  userName: {type:String, required:true},
  email: {type:String, required:true},
  goals:[
    {
      _id: {type: mongoose.Schema.Types.ObjectId, ref: 'goal', required:true},
      name: {type:String, required:true},
    },
  ],
});


module.exports = mongoose.model('user', userSchema);
