
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/test');




var playerSchema = new mongoose.Schema({
  name: String,
  id: Number,
  team: String,
  country: String
});


var userSchema=new mongoose.Schema({
    name: String ,
    email: String,
    password: String
});




module.exports.user= mongoose.model('users',userSchema);
module.exports.player=mongoose.model('players', playerSchema);


