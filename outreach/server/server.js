const express = require('express');
const userRouter = require('./user')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const utils = require('utility')
const app = express()

//开启中间件
app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user', userRouter)

app.listen(9093, function(){
  console.log("Server is working on 9093")
})
