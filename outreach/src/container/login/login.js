import React from 'react';
import Logo from '../../component/logo/logo';
import {List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {login} from '../../redux/user.redux';

@connect(
  state => state.user,
  {login}
)

class Login extends React.Component{
  constructor(props){
    super(props);
    this.state={
      user: '',
      pwd: '',
    }
    this.register = this.register.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  register(e){
    console.log(this.props);
    this.props.history.push('/register');
  }

  handleLogin(){
    this.props.login(this.state);
  }

  handleChange(key, value) {
    this.setState({[key]: value});
  }

  render(){
    return (
      <div>
      {this.props.redirectTo? <Redirect to={this.props.redirectTo} /> : null}
        <Logo/>
        <WingBlank>
          {/* use List to display all the input */}
          <List>
            <WhiteSpace />
            <InputItem 
              onChange={(v)=>this.handleChange('user',v)}
            >username</InputItem>
            <WhiteSpace />
            <InputItem
              onChange={(v)=>this.handleChange('pwd',v)}
            >password</InputItem>
            <WhiteSpace />
            {this.props.msg? <p className="error-msg">{this.props.msg}</p>:null}
          </List>
          <WhiteSpace />
          <WhiteSpace />
          <Button type="primary" onClick={this.handleLogin}>Login</Button>
          <WhiteSpace />
          <Button type="primary" onClick={this.register}>Register</Button>

        </WingBlank>
      </div>
        
    )
  }
}

export default Login