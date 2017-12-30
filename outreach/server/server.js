const express = require('express');
const userRouter = require('./user')

const app = express()

//开启中间件
app.use('/user', userRouter)

app.listen(9093, function(){
  console.log("Server is working on 9093")
})
