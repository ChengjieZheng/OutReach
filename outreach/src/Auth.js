import React from 'react';
import {connect} from 'react-redux'
import { login } from './Auth.redux'
import { Redirect } from 'react-router-dom'

//两个reducers 每个reducers都有一个state
//用combineReducers合并
@connect(
  state=>state.auth,
  {login}
)

class Auth extends React.Component{
  constructor(props) {
    super(props)
  }
  render(){
    return (
      <div>
        {this.props.isAuth ? <Redirect to='/dashboard'></Redirect> : null}
        <h2>Hello Auth! Please login!</h2>
        <button onClick={this.props.login}>login</button>
      </div>
    )
  }
}

export default Auth;