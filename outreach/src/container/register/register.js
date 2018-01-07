import React from 'react';
import Logo from '../../component/logo/logo';
import {List, InputItem, Radio, WhiteSpace, Button} from 'antd-mobile';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {register} from '../../redux/user.redux';
import outreachForm from '../../component/outreach-form/outreach-form'
import './register.css';
@outreachForm
@connect(
  state=>state.user,
  {register}
)

class Register extends React.Component{    
  constructor(props){
    super(props);
    // this.state = {
    //   user: '',
    //   pwd: '',
    //   repeatpwd: '',
    //   type: 'genius'//or boss
    // }
    this.handleRegister = this.handleRegister.bind(this);
  }

  componentDidMount() {
    this.props.handleChange('type', 'genius')
  }

  handleRegister(){
    this.props.register(this.props.state)
  }

  // handleChange(key, val) {
  //   this.setState({[key]: val});
  // }




  render(){
    const RadioItem = Radio.RadioItem
    return (
      <div>
        {this.props.redirectTo? <Redirect to={this.props.redirectTo} /> : null}
        <Logo/>
        <List>
          <WhiteSpace />
          <InputItem 
            onChange={v=>this.props.handleChange('user', v)}
          >username</InputItem>
          <WhiteSpace />
          <InputItem 
            type='password'
            onChange={v=>this.props.handleChange('pwd', v)}
          >password</InputItem>
          <WhiteSpace />
          <InputItem 
            type='password'
            onChange={v=>this.props.handleChange('repeatpwd', v)}
          >password</InputItem>
          <WhiteSpace />
          <RadioItem 
            checked={this.props.state.type === 'genius'}
            onChange={()=>this.props.handleChange('type','genius')}
          >
            Genius
          </RadioItem>
          <WhiteSpace />
          <RadioItem 
            checked={this.props.state.type === 'boss'}
            onChange={()=>this.props.handleChange('type','boss')}
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