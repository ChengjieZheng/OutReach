import React from 'react';
import Logo from '../../component/logo/logo';
import {List, InputItem, Radio, WhiteSpace, Button} from 'antd-mobile';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {register} from '../../redux/user.redux';
import './register.css';

@connect(
  state=>state.user,
  {register}
)

class Register extends React.Component{    
  constructor(props){
    super(props);
    this.state = {
      user: '',
      pwd: '',
      repeatpwd: '',
      type: 'genius'//or boss
    }
    this.handleRegister = this.handleRegister.bind(this);
  }

  handleRegister(){
    this.props.register(this.state)
  }

  handleChange(key, val) {
    this.setState({[key]: val});
  }


  render(){
    const RadioItem = Radio.RadioItem
    return (
      <div>
        {this.props.redirectTo? <Redirect to={this.props.redirectTo} /> : null}
        <Logo/>
        <List>
          <WhiteSpace />
          <InputItem 
            onChange={v=>this.handleChange('user', v)}
          >username</InputItem>
          <WhiteSpace />
          <InputItem 
            type='password'
            onChange={v=>this.handleChange('pwd', v)}
          >password</InputItem>
          <WhiteSpace />
          <InputItem 
            type='password'
            onChange={v=>this.handleChange('repeatpwd', v)}
          >password</InputItem>
          <WhiteSpace />
          <RadioItem 
            checked={this.state.type === 'genius'}
            onChange={()=>this.handleChange('type','genius')}
          >
            Genius
          </RadioItem>
          <WhiteSpace />
          <RadioItem 
            checked={this.state.type === 'boss'}
            onChange={()=>this.handleChange('type','boss')}
          >
            Boss
          </RadioItem>
          <WhiteSpace />
          {this.props.msg? <p className="error-msg">{this.props.msg}</p>:null}
        </List>
        <WhiteSpace />
        <Button type="primary" onClick={this.handleRegister}>Register</Button>
      </div>
    )
  }
}

export default Register