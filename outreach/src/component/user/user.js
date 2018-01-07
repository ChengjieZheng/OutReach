import React from 'react'
import { connect } from 'react-redux'
import { Result, List, WhiteSpace, Modal } from 'antd-mobile'
import browserCookies from 'browser-cookies'
import { logoutSubmit } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'
@connect(
  state=>state.user,
  { logoutSubmit }
)

class User extends React.Component{
  constructor(props){
    super(props)
    this.logout = this.logout.bind(this);
  }

  logout(){
    // browserCookies.erase('userid')
    // 强制刷新页面
    //window.location.href = window.location.href;

    const alert = Modal.alert
    alert('Log out', 'Do you want to log out？？？', [
      { text: 'Cancle', onPress: () => console.log('cancel')},
      { text: 'Ok', onPress: () => {
        browserCookies.erase('userid');
        this.props.logoutSubmit()
      }}
    ])
  }

  render(){
    const props = this.props;
    const Item = List.Item;
    const Brief = Item.Brief
    // if we can not get user information, we can return null first
    return props.user ? (
      <div>
        <Result 
          img = {<img src={require(`../img/${this.props.avatar}.jpg`)} style={{width:60}} alt=""/>}
          title={this.props.user}
          message={props.type === 'boss' ? props.company : null}
        />
        <List renderHeader={()=>'Overview'}>
          <Item
            multipleLine
          >
            {props.title}
            {props.desc.split('\n').map(v=>(<Brief key={v}>{v}</Brief>))}
            {props.money ? <Brief>Sarlay: {props.money}</Brief> : null}
          </Item>
        </List>
        <WhiteSpace></WhiteSpace>
        <List>
          <Item onClick={this.logout}>Log Out</Item>
        </List>
      </div>
    )
    :
    (<Redirect to={this.props.redirectTo} />)
  }
}
export default User