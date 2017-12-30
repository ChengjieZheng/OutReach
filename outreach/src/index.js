import React from 'react';
import ReactDom from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux'//处理中间件
import { counter } from './index.redux'
import thunk from 'redux-thunk' //引入thunk中间件
import { Provider } from 'react-redux';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import Auth from './Auth';
import Dashboard from './Dashboard'; 
import reducers from './reducer';

// const store = createStore(counter, applyMiddleware(thunk))
const store = createStore(reducers, compose(
  applyMiddleware(thunk),
  window.devToolsExtension?window.devToolsExtension():f=>f
))

console.log("store: ", store.getState())

ReactDom.render(
  (<Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact component={Auth}></Route>
        <Route path="/dashboard" component={Dashboard}></Route>
        <Redirect to="/dashboard"></Redirect>
      </Switch>
    </BrowserRouter>
  </Provider>), 
  document.getElementById('root'));


