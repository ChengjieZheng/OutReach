// const express = require('express');
import express from 'express';
// const userRouter = require('./user')
import userRouter from './user'
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const utils = require('utility')
const model = require('./model')
const Chat = model.getModel('chat')
const app = express()
const path = require('path')

//import javascript and css file
import staticPath from '../build/asset-manifest.json'

// work with express socket 和 http 关联
const server = require('http').Server(app)


//deal with css
import csshook from 'css-modules-require-hook/preset';
import assethook from 'asset-require-hook'
assethook({
  extensions:['png','jpg']
})
//Front End, React SSR
import React from 'react'
import { renderToString, renderToStaticMarkup, renderToNodeStream } from 'react-dom/server';
import {createStore, applyMiddleware, compose} from 'redux'//处理中间件
import thunk from 'redux-thunk' //引入thunk中间件
import { Provider } from 'react-redux';
// we dont have BrowserRouter in server side, so we use StaticRouter instead
import {StaticRouter} from 'react-router-dom';
import reducers from '../src/reducer';
import App from '../src/app';

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
      console.log("use for recvmsg: ", doc._doc)
      io.emit('recvmsg', Object.assign({}, doc._doc))
    })
  })
})

//开启中间件
app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user', userRouter)

app.use(function(req, res, next) {
  if(req.url.startsWith('/user/') || req.url.startsWith('/static/')){
    return next()
  }

  const store = createStore(reducers,compose(
    applyMiddleware(thunk),
    // window.devToolsExtension?window.devToolsExtension():f=>f
  ))

  //user for renderToString
  // let context={}
  // const markup = renderToString(
  //   (<Provider store={store}>
  //     <StaticRouter 
  //       location={req.url}
  //       context={context}
  //     >
  //       <App></App>
  //     </StaticRouter>
  //   </Provider>)
  // )

  // use for renderToNodeStream

  res.write(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta name="theme-color" content="#000000">
        <link href="https://fonts.googleapis.com/css?family=PT+Sans" rel="stylesheet">
        <title>React App</title>
        <link rel="stylesheet" href="/${staticPath['main.css']}">
        <meta name='keywords' content='React, Redux, OutReach, outreach, job search'>
        <meta name='discription' content='outreach'>
        <style type="text/css">
          *{
            padding: 0px;
            margin: 0px;
            font-family: 'PT Sans', sans-serif;
          }
        </style>
      </head>
      <body>
        <noscript>
          You need to enable JavaScript to run this app.
        </noscript>
        <div id="root">
  `)


  let context={}
  const markupStream = renderToNodeStream(
    (<Provider store={store}>
      <StaticRouter 
        location={req.url}
        context={context}
      >
        <App></App>
      </StaticRouter>
    </Provider>)
  )

  markupStream.pipe(res, {end:false})
  markupStream.on('end',()=>{
    res.write(`
        </div>
        <script src="/${staticPath['main.js']}"></script>  
      </body>
    </html>
    `)
    res.end()
  })
  // about SEO
//   const obj = {
//     '/msg':'React message list',
//     '/boss':'React boss list',
//   }
//  <meta name='discription' content='${obj[req.url]}'>


  // const pageHtml = `
  // <!DOCTYPE html>
  //   <html lang="en">
  //     <head>
  //       <meta charset="utf-8">
  //       <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  //       <meta name="theme-color" content="#000000">
  //       <link href="https://fonts.googleapis.com/css?family=PT+Sans" rel="stylesheet">
  //       <title>React App</title>
  //       <link rel="stylesheet" href="/${staticPath['main.css']}">
  //       <meta name='keywords' content='React, Redux, OutReach, outreach, job search'>
  //       <meta name='discription' content='outreach'>
  //       <style type="text/css">
  //         *{
  //           padding: 0px;
  //           margin: 0px;
  //           font-family: 'PT Sans', sans-serif;
  //         }
  //       </style>
  //     </head>
  //     <body>
  //       <noscript>
  //         You need to enable JavaScript to run this app.
  //       </noscript>
  //       <div id="root">${markup}</div>
  //     <script src="/${staticPath['main.js']}"></script>  
  //   </body>
  // </html>
  // `




  // res.send(pageHtml)
  // return res.sendFile(path.resolve('build/index.html'))
})

app.use('/', express.static(path.resolve('build')))

server.listen(9093, function(){
  console.log("Server is working on 9093")
})
