const mongoose = require('mongoose');

const DB_URL = 'mongodb://127.0.0.1:27017/outReach'
mongoose.connect(DB_URL)
mongoose.connection.on('connected', function(){
  console.log('mongo connect success');
})

const User = mongoose.model('user', new mongoose.Schema({
  user:{type:String, require:true},
  age:{type:Number,require:true}
}))