import React from 'react';
import {connect} from 'react-redux'
import { login,getUserData} from './Auth.redux'
import { Redirect } from 'react-router-dom'
import axios from 'axios';

//两个reducers 每个reducers都有一个state
//用combineReducers合并
@connect(
  state=>state.auth,
  {login, getUserData}
)

class Auth extends React.Component{

  // constructor(props) {
  //   super(props);
  //   this.state={
  //     data:{},
  //   }
  // }

  componentDidMount() {
    this.props.getUserData();
  }

  render(){
    return (
      <div>
        <h2>My name is: {this.props.user}, 年龄: {this.props.age}</h2>
        {this.props.isAuth ? <Redirect to='/dashboard'></Redirect> : null}
        <h2>Hello Auth! Please login!</h2>
        <button onClick={this.props.login}>login</button>
      </div>
    )
  }
}

export default Auth;