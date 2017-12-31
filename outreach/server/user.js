const express = require('express')
const utils = require('utility')
const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')
const _filter = {'pwd':0, '__v': 0}

Router.get('/list', function(req,res){
  // User.remove({},function(err,doc){})
  User.find({}, function(err, doc){
    return res.json(doc)
  })
})

Router.post('/login', function(req, res){
  console.log("user login info: ", req.body);
  const {user,pwd} = req.body;
  User.findOne({user,pwd:md5Pwd(pwd)},_filter,function(err, doc){//not return pwd
    if (!doc) {
      return res.json({code:1, msg: 'username or password is not currect'})
    }
    res.cookie('userid', doc._id)
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
    //create方法不能发挥生成后的ID，所有我们改用Save方法
    const userModel = new User({user, type, pwd:md5Pwd(pwd)})
    userModel.save(function(err, doc) {
      if(err) {
        return res.json({code:1, msg: 'back-end error'})
      }
      const {user, type, _id} = doc;
      res.cookie('userid', _id)
      return res.json({code:0, data:{user, type, _id}})
    })
    //if username is not there, create one
    // User.create({user, type, pwd:md5Pwd(pwd)}, function(err,doc){
    //   if(err) {
    //     return res.json({code:1, msg:'无法保存用户'})
    //   }
    //   return res.json({code:0})
    // })
  })
})

Router.get('/info', function(req,res) {
  const {userid} = req.cookies;
  if(!userid) {
    return res.json({code:1});
  }
  User.findOne({_id:userid}, _filter,function(err,doc){
    if (err) {
      return res.json({code:1, msg:'back-end error'})
    }
    if (doc) {
      return res.json({code:0, data: doc})
    }
  })
  //用户有没有cookie之类的校验
  
})

function md5Pwd(pwd) {
  const salt = 'welcome_to_OutReach_kdiejf892k$';
  return utils.md5(utils.md5(pwd+salt));
}



module.exports = Router