import React from 'react';
import Logo from '../../component/logo/logo';
import {List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {login, registerPage} from '../../redux/user.redux';
import outreachForm from '../../component/outreach-form/outreach-form'
// 属性代理
// function newHello(Comp) {
//   class WrapComp extends React.Component{
//     render(){
//       return (
//         <div>
//           <Comp />
//           <h2>hahdkfjkfjdfj</h2>
//         </div>
//       )
//     }
//   }
//   return WrapComp
// }
// @newHello === Hello = newHello(Hello)
// class Hello extends React.Component{
//   render(){
//     return (
//       <h5>Hello, I am the origianal component</h5>
//     )
//   }
// }
//叫反向继承，作用：代码复用，逻辑抽象
// function newHello(Comp){
//   class WrapComp extends Comp{
//     componentDidMount() {
//       console.log("new life cicle")
//     }
//     render() {
//       return (
//         <Comp {...this.props} />
//       )
//     }
//   }
// }

@outreachForm
@connect(
  state => state.user,
  {login, registerPage}
)

class Login extends React.Component{
  constructor(props){
    super(props);
    this.register = this.register.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  register(){
    // this.props.history.push('/register');
    this.props.registerPage()

  }

  handleLogin(){
    this.props.login(this.props.state);
  }

  render(){
    return (
      <div>
      {(this.props.redirectTo && this.props.redirectTo !== '/login') ? <Redirect to={this.props.redirectTo} /> : null}
        <Logo/>
        <WingBlank>
          {/* use List to display all the input */}
          <List>
            <WhiteSpace />
            <InputItem 
              onChange={v=>this.props.handleChange('user',v)}
            >username</InputItem>
            <WhiteSpace />
            <InputItem
              onChange={v=>this.props.handleChange('pwd',v)}
              type='password'
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