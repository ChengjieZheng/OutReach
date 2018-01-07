const express = require('express')
const utils = require('utility')
const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')
const Chat = model.getModel('chat')
const _filter = {'pwd':0, '__v': 0}

// Chat.remove({}, function(err, doc){})

Router.get('/list', function(req,res){
  // User.remove({},function(err,doc){})
  const {type} = req.query;
  User.find({type}, function(err, doc){
    return res.json({code:0, data:doc})
  })
})

Router.get('/getmsglist', function(req,res){
  const user = req.cookies.userid;
  // 如果想要同时查询多个字段，可以使用：{'$or':[{from:user,to:user}]}
  User.find({},function(err,userdoc){
    const users = {}
    userdoc.forEach(v=>{
      users[v._id] = {name:v.user, avatar:v.avatar}
    })
    Chat.find({'$or':[{from:user},{to:user}]}, function(err, doc) {
      if(!err) {
        let data = {code:0, msgs: doc, users:users};
        return res.json(data)
      }
    })
  })
})

Router.post('/update', function(req,res) {
  const {userid} = req.cookies;
  if(!userid) {
    return res.json({code:1})
  }
  const body = req.body;
  User.findByIdAndUpdate(userid, body, function(err, doc) {
    const data = Object.assign({},{
      user: doc.user,
      type: doc.type
    }, body)
    return res.json({code:0, data})
  })
})

Router.post('/readmsg', function(req, res){
  const userid = req.cookies.userid;
  const {from} = req.body;
  Chat.update(
    {from,to:userid}, 
    {'$set':{read: true}}, 
    //修改多行
    {'multi': true},
    function(err,doc){
    if (!err){
      return res.json({code:0, num: doc.nModified});
    } 
    return res.json({code:1, message:'faile to update'})
  })
})


Router.post('/login', function(req, res){
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