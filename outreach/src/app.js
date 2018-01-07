import React from 'react'
import Login from './container/login/login';
import Register from './container/register/register';
import AuthRoute from './component/authroute/authroute';
import BossInfo from './container/bossinfo/bossinfo';
import GeniusInfo from './container/geniusinfo/geniusinfo';
import Dashboard from './component/dashboard/dashboard';
import Chat from './component/chat/chat'
import {Route, Switch} from 'react-router-dom';
import './index.css';
class App extends React.Component{
  constructor(props){
    super(props)
    this.state={
      hasError:false
    }
  }
  componentDidCatch(err, info) {
    console.log(err, info)
    this.setState({
      hasError: true
    })
  }
    render(){
      return this.state.hasError
      ?
      <img src={require('./component/img/error.jpg')} alt="ERROR"/>
      :
      (
          <div>
            {/* //just check the route is currect or not */}
            <AuthRoute></AuthRoute>
            {/* //switch只要命中其他就不管了, 即，如果没有switch, dashboard也会跟着一起显示，但是如果有switch只显示一个。另，输入其他不认识的url，会跳转到Dashboard，适合做404，即dashboard里面写404*/}
            <Switch>
              <Route path='/bossinfo' component={BossInfo}></Route>
              <Route path='/geniusinfo' component={GeniusInfo}></Route>
              <Route path='/login' component={Login}></Route>
              <Route path='/register' component={Register}></Route>
              <Route path='/chat/:user' component={Chat}></Route>
              {/* 登入成功后，所有页面归Dashboard管理 */}
              <Route component={Dashboard}></Route>
            </Switch>
          </div>
        
      )
    }
}

export default App