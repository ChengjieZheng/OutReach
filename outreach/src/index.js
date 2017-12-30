import React from 'react';
import ReactDom from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux'//处理中间件
import thunk from 'redux-thunk' //引入thunk中间件
import { Provider } from 'react-redux';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import reducers from './reducer';
import Login from './container/login/login';
import Register from './container/register/register';
import './config';
//store中存储所有人的状态，在里面都有所有人的记录（state），当需要改变的时候，需要告诉专员（dispatch）需要什么action
const store = createStore(reducers, compose(
  applyMiddleware(thunk),
  window.devToolsExtension?window.devToolsExtension():f=>f
))    

console.log("store: ", store.getState())

ReactDom.render(
  (<Provider store={store}>
    <BrowserRouter>
      <div>
        <Route path='/login' component={Login}></Route>
        <Route path='/register' component={Register}></Route>
      </div>
    </BrowserRouter>
  </Provider>), 
  document.getElementById('root')
);


