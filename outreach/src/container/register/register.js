import React from 'react';
import Logo from '../../component/logo/logo';
import {List, InputItem, Radio, WingBlank, WhiteSpace, Button} from 'antd-mobile';

class Register extends React.Component{    
  constructor(props){
    super(props);
    this.state = {
      type: 'genius'//or boss
    }
    this.register = this.register.bind(this);
  }

  register(){
    console.log("hello")
  }


  render(){
    const RadioItem = Radio.RadioItem
    return (
      <div>
        <Logo/>
        <List>
          <WhiteSpace />
          <InputItem>username</InputItem>
          <WhiteSpace />
          <InputItem>password</InputItem>
          <WhiteSpace />
          <InputItem>password</InputItem>
          <WhiteSpace />
          <RadioItem checked={this.state.type === 'genius'}>
            Genius
          </RadioItem>
          <WhiteSpace />
          <RadioItem checked={this.state.type === 'boss'}>
            Boss
          </RadioItem>  
        </List>
        <WhiteSpace />
        <Button type="primary" onClick={this.register}>Register</Button>
      </div>
    )
  }
}

export default Register