const express = require('express');
const mongoose = require('mongoose');
const app = express()

const DB_URL = 'mongodb://127.0.0.1:27017'
mongoose.connect(DB_URL)
mongoose.connection.on('connected', function(){
  console.log('mongo connect success');
})

const User = mongoose.model('user', new mongoose.Schema({
  user:{type:String, require:true},
  age:{type:Number,require:true}
}))

User.create({
  user:'Frank',
  age:'65'
}, function(err, data) {
  if(!err) {
    console.log(data);
  } else {
    console.log(err);
  }
})

app.get('/', function(req, res) {
  res.send("<h1>Hello World!</h1>")
})

app.get('/data', function(req, res){
    User.findOne({user:'Frank'}, function(err,data){
      res.json(data);
    })
})

app.listen(9093, function(){
  console.log("Server is working on 9093")
})
