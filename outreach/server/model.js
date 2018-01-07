const mongoose = require('mongoose');

const DB_URL = 'mongodb://127.0.0.1:27017/outReach-chat'
mongoose.connect(DB_URL)
mongoose.connection.on('connected', function(){
  console.log('mongo connect success');
})

const models = {
  user: { 
    'user':{'type': String, 'require': true},
    'pwd': {'type':String, 'require': true},
    'type': {'type': String, 'require': true},
    //head photo
    'avatar': {'type': String},
    //个人简介或者职位简介
    'desc':{'type': String},
    //职位
    'title': {'type': String},
    //for boss:
    'company': {'type': String},
    'money': {'type': String},
  },
  chat: {
    //每一次聊天唯一的标识
    'chatid':{'type': String, 'require': true},
    'from' :{'type': String, 'require': true},
    'to' :{'type': String, 'require': true},
    'read':{'type': Boolean, 'default':false},
    'content':{'type': String, 'require': true, 'default':''},
    'create_time':{'type':Number, 'default': Date.now},
  }
}

for(let m in models) {
  mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
  getModel: function(name) {
    return mongoose.model(name)
  }
}