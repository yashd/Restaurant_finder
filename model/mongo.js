
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/test');


var playerSchema = new mongoose.Schema({
  name: String,
  id: Number,
  team: String,
  country: String
});


var player=module.exports=mongoose.model('players', playerSchema);
