import React from 'react';
import ReactDom from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux'//处理中间件
import thunk from 'redux-thunk' //引入thunk中间件
import { Provider } from 'react-redux';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import reducers from './reducer';
import Login from './container/login/login';
import Register from './container/register/register';
import AuthRoute from './component/authroute/authroute';
import BossInfo from './container/bossinfo/bossinfo';
import GeniusInfo from './container/geniusinfo/geniusinfo';
import Dashboard from './component/dashboard/dashboard';
import './config';
import './index.css';
//store中存储所有人的状态，在里面都有所有人的记录（state），当需要改变的时候，需要告诉专员（dispatch）需要什么action
const store = createStore(reducers, compose(
  applyMiddleware(thunk),
  window.devToolsExtension?window.devToolsExtension():f=>f
))


// function Boss() {
//   return <h1>BOSS page</h1>
// }

// function Dashboard() {
//   return <h1>dash board</h1>
// }

// console.log("store: ", store.getState())

// boss genius me msg 4 pages

ReactDom.render(
  (<Provider store={store}>
    <BrowserRouter>
      <div>
        {/* //just check the route is currect or not */}
        <AuthRoute></AuthRoute>
        {/* //switch只要命中其他就不管了, 即，如果没有switch, dashboard也会跟着一起显示，但是如果有switch只显示一个。另，输入其他不认识的url，会跳转到Dashboard，适合做404，即dashboard里面写404*/}
        <Switch>
          <Route path='/bossinfo' component={BossInfo}></Route>
          <Route path='/geniusinfo' component={GeniusInfo}></Route>
          <Route path='/login' component={Login}></Route>
          <Route path='/register' component={Register}></Route>
          {/* 登入成功后，所有页面归Dashboard管理 */}
          <Route component={Dashboard}></Route>
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>), 
  document.getElementById('root')
);


