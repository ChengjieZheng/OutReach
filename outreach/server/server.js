const express = require('express');
const userRouter = require('./user')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const utils = require('utility')
const model = require('./model')
const Chat = model.getModel('chat')
const app = express()

// work with express socket 和 http 关联
const server = require('http').Server(app)



// socket.io
//io 是全局请求
const io = require('socket.io')(server)
io.on('connection', function(socket){
  //socket是当前链接请求
  socket.on('sendmsg', function(data){
    // io.emit('recvmsg',data)
    const {from, to, msg} = data;
    const chatid = [from,to].sort().join('_')
    Chat.create({chatid, from, to, content:msg}, function(err, doc) {
      io.emit('recvmsg', Object.assign({}, doc._doc))
    })
  })
})



//开启中间件
app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user', userRouter)

server.listen(9093, function(){
  console.log("Server is working on 9093")
})
