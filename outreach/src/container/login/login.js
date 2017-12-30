import React from 'react';
import Logo from '../../component/logo/logo';
import {List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile';

class Login extends React.Component{
  constructor(props){
    super(props);
    this.register = this.register.bind(this);
  }

  register(e){
    console.log(this.props);
    this.props.history.push('/register');
  }

  render(){
    return (
      <div>
        <Logo/>
        <WingBlank>
          {/* use List to display all the input */}
          <List>
            <WhiteSpace />
            <InputItem>username</InputItem>
            <WhiteSpace />
            <InputItem>password</InputItem>
          </List>
          <WhiteSpace />
          <WhiteSpace />
          <Button type="primary">Login</Button>
          <WhiteSpace />
          <Button type="primary" onClick={this.register}>Register</Button>
        </WingBlank>
      </div>
        
    )
  }
}

export default Login