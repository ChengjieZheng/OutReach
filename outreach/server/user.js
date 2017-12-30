const express = require('express')
const utils = require('utility')
const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')

Router.get('/list', function(req,res){
  // User.remove({},function(err,doc){})
  User.find({}, function(err, doc){
    return res.json(doc)
  })
})

Router.post('/login', function(req, res){
  console.log("user login info: ", req.body);
  const {user,pwd} = req.body;
  User.findOne({user,pwd:md5Pwd(pwd)},{'pwd':0},function(err, doc){//not return pwd
    if (!doc) {
      return res.json({code:1, msg: 'username or password is not currect'})
    }
    return res.json({code:0,data:doc})
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
    User.create({user, type, pwd:md5Pwd(pwd)}, function(err,doc){
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

function md5Pwd(pwd) {
  const salt = 'welcome_to_OutReach_kdiejf892k$';
  return utils.md5(utils.md5(pwd+salt));
}



module.exports = Router