const express = require('express')
const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')

Router.get('/list', function(req,res){
  User.find({}, function(err, doc){
    return res.json(doc)
  })
})

Router.post('/register', function(req,res){
  console.log("user regist info: ", req.body)
  const {user, pwd, type} = req.body
  //if user already registed, return message to client:"username is already there"
  User.findOne({user:user}, function(err,doc){
    if (doc) {
      return res.json({code:1, msg: '用户名重复'})
    }
    //if username is not there, create one
    User.create({user,pwd,type}, function(err,doc){
      if(err) {
        return res.json({code:1, msg:'无法保存用户'})
      }
      return res.json({code:0})
    })
  })
})

Router.get('/info', function(req,res) {
  //用户有没有cookie之类的校验
  return res.json({code:1});
})

module.exports = Router